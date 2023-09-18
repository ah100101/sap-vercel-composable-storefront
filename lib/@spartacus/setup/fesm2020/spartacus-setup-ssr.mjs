import * as fs from 'fs';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { SERVER_REQUEST_ORIGIN, SERVER_REQUEST_URL } from '@spartacus/core';
import { inject } from '@angular/core';
import { INITIAL_CONFIG } from '@angular/platform-server';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getRequestOrigin(req) {
    // If express is resolving and trusting X-Forwarded-Host, we want to take it
    // into an account to properly generate request origin.
    const trustProxyFn = req.app.get('trust proxy fn');
    let forwardedHost = req.get('X-Forwarded-Host');
    if (forwardedHost && trustProxyFn(req.connection.remoteAddress, 0)) {
        if (forwardedHost.indexOf(',') !== -1) {
            // Note: X-Forwarded-Host is normally only ever a
            //       single value, but this is to be safe.
            forwardedHost = forwardedHost
                .substring(0, forwardedHost.indexOf(','))
                .trimRight();
        }
        return `${req.protocol}://${forwardedHost}`;
    }
    else {
        return `${req.protocol}://${req.get('host')}`;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getRequestUrl(req) {
    return getRequestOrigin(req) + req.originalUrl;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RenderingCache {
    constructor(options) {
        this.options = options;
        this.renders = new Map();
    }
    setAsRendering(key) {
        this.renders.set(key, { rendering: true });
    }
    isRendering(key) {
        return !!this.renders.get(key)?.rendering;
    }
    store(key, err, html) {
        const entry = { err, html };
        if (this.options?.ttl) {
            entry.time = Date.now();
        }
        if (this.options?.cacheSize) {
            this.renders.delete(key);
            if (this.renders.size >= this.options.cacheSize) {
                this.renders.delete(this.renders.keys().next().value);
            }
        }
        this.renders.set(key, entry);
    }
    get(key) {
        return this.renders.get(key);
    }
    clear(key) {
        this.renders.delete(key);
    }
    isReady(key) {
        const entry = this.renders.get(key);
        const isRenderPresent = entry?.html || entry?.err;
        return isRenderPresent && this.isFresh(key);
    }
    isFresh(key) {
        if (!this.options?.ttl) {
            return true;
        }
        return Date.now() - (this.renders.get(key)?.time ?? 0) < this.options?.ttl;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var RenderingStrategy;
(function (RenderingStrategy) {
    RenderingStrategy[RenderingStrategy["ALWAYS_CSR"] = -1] = "ALWAYS_CSR";
    RenderingStrategy[RenderingStrategy["DEFAULT"] = 0] = "DEFAULT";
    RenderingStrategy[RenderingStrategy["ALWAYS_SSR"] = 1] = "ALWAYS_SSR";
})(RenderingStrategy || (RenderingStrategy = {}));
const defaultSsrOptimizationOptions = {
    concurrency: 10,
    timeout: 3000,
    forcedSsrTimeout: 60000,
    maxRenderTime: 300000,
    reuseCurrentRendering: true,
    debug: false,
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Returns the full url for the given SSR Request.
 */
const getDefaultRenderKey = getRequestUrl;
/**
 * The rendered pages are kept in memory to be served on next request. If the `cache` is set to `false`, the
 * response is evicted as soon as the first successful response is successfully returned.
 */
class OptimizedSsrEngine {
    get engineInstance() {
        return this.renderResponse.bind(this);
    }
    constructor(expressEngine, ssrOptions) {
        this.expressEngine = expressEngine;
        this.ssrOptions = ssrOptions;
        this.currentConcurrency = 0;
        this.renderingCache = new RenderingCache(this.ssrOptions);
        this.templateCache = new Map();
        /**
         * When the config `reuseCurrentRendering` is enabled, we want perform
         * only one render for one rendering key and reuse the html result
         * for all the pending requests for the same rendering key.
         * Therefore we need to store the callbacks for all the pending requests
         * and invoke them with the html after the render completes.
         *
         * This Map should be used only when `reuseCurrentRendering` config is enabled.
         * It's indexed by the rendering keys.
         */
        this.renderCallbacks = new Map();
        this.ssrOptions = ssrOptions
            ? {
                ...defaultSsrOptimizationOptions,
                // overrides the default options
                ...ssrOptions,
            }
            : undefined;
        this.logOptions();
    }
    logOptions() {
        if (!this.ssrOptions) {
            return;
        }
        const replacer = (_key, value) => {
            if (typeof value === 'function') {
                return value.toString();
            }
            return value;
        };
        const stringifiedOptions = JSON.stringify(this.ssrOptions, replacer, 2);
        this.log(`[spartacus] SSR optimization engine initialized with the following options: ${stringifiedOptions}`, false);
    }
    /**
     * When SSR page can not be returned in time, we're returning index.html of
     * the CSR application.
     * The CSR application is returned with the "Cache-Control: no-store" response-header. This notifies external cache systems to not use the CSR application for the subsequent request.
     */
    fallbackToCsr(response, filePath, callback) {
        response.set('Cache-Control', 'no-store');
        callback(undefined, this.getDocument(filePath));
    }
    getRenderingKey(request) {
        return this.ssrOptions?.renderKeyResolver
            ? this.ssrOptions.renderKeyResolver(request)
            : getDefaultRenderKey(request);
    }
    getRenderingStrategy(request) {
        return this.ssrOptions?.renderingStrategyResolver
            ? this.ssrOptions.renderingStrategyResolver(request)
            : RenderingStrategy.DEFAULT;
    }
    /**
     * When returns true, the server side rendering should be performed.
     * When returns false, the CSR fallback should be returned.
     *
     * We should not render, when there is already
     * a pending rendering for the same rendering key
     * (unless the `reuseCurrentRendering` config option is enabled)
     * OR when the concurrency limit is exceeded.
     */
    shouldRender(request) {
        const renderingKey = this.getRenderingKey(request);
        const concurrencyLimitExceeded = this.isConcurrencyLimitExceeded(renderingKey);
        const fallBack = this.renderingCache.isRendering(renderingKey) &&
            !this.ssrOptions?.reuseCurrentRendering;
        if (fallBack) {
            this.log(`CSR fallback: rendering in progress (${request?.originalUrl})`);
        }
        else if (concurrencyLimitExceeded) {
            this.log(`CSR fallback: Concurrency limit exceeded (${this.ssrOptions?.concurrency})`);
        }
        return ((!fallBack &&
            !concurrencyLimitExceeded &&
            this.getRenderingStrategy(request) !== RenderingStrategy.ALWAYS_CSR) ||
            this.getRenderingStrategy(request) === RenderingStrategy.ALWAYS_SSR);
    }
    /**
     * Checks for the concurrency limit
     *
     * @returns true if rendering this request would exceed the concurrency limit
     */
    isConcurrencyLimitExceeded(renderingKey) {
        // If we can reuse a pending render for this request, we don't take up a new concurrency slot.
        // In that case we don't exceed the concurrency limit even if the `currentConcurrency`
        // already reaches the limit.
        if (this.ssrOptions?.reuseCurrentRendering &&
            this.renderingCache.isRendering(renderingKey)) {
            return false;
        }
        return this.ssrOptions?.concurrency
            ? this.currentConcurrency >= this.ssrOptions.concurrency
            : false;
    }
    /**
     * Returns true, when the `timeout` option has been configured to non-zero value OR
     * when the rendering strategy for the given request is ALWAYS_SSR.
     * Otherwise, it returns false.
     */
    shouldTimeout(request) {
        return (!!this.ssrOptions?.timeout ||
            this.getRenderingStrategy(request) === RenderingStrategy.ALWAYS_SSR);
    }
    /**
     * Returns the timeout value.
     *
     * In case of the rendering strategy ALWAYS_SSR, it returns the config `forcedSsrTimeout`.
     * Otherwise, it returns the config `timeout`.
     */
    getTimeout(request) {
        return this.getRenderingStrategy(request) === RenderingStrategy.ALWAYS_SSR
            ? this.ssrOptions?.forcedSsrTimeout ?? 60000
            : this.ssrOptions?.timeout ?? 0;
    }
    /**
     * If there is an available cached response for this rendering key,
     * it invokes the given render callback with the response and returns true.
     *
     * Otherwise, it returns false.
     */
    returnCachedRender(request, callback) {
        const key = this.getRenderingKey(request);
        if (this.renderingCache.isReady(key)) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const cached = this.renderingCache.get(key);
            callback(cached.err, cached.html);
            if (!this.ssrOptions?.cache) {
                // we drop cached rendering if caching is disabled
                this.renderingCache.clear(key);
            }
            return true;
        }
        return false;
    }
    /**
     * Handles the request and invokes the given `callback` with the result html / error.
     *
     * The result might be ether:
     * - a CSR fallback with a basic `index.html` content
     * - a result rendered by the original Angular Universal express engine
     * - a result from the in-memory cache (which was previously rendered by Angular Universal express engine).
     */
    renderResponse(filePath, options, callback) {
        const request = options.req;
        const response = options.res || options.req.res;
        if (this.returnCachedRender(request, callback)) {
            this.log(`Render from cache (${request?.originalUrl})`);
            return;
        }
        if (!this.shouldRender(request)) {
            this.fallbackToCsr(response, filePath, callback);
            return;
        }
        let requestTimeout;
        if (this.shouldTimeout(request)) {
            // establish timeout for rendering
            const timeout = this.getTimeout(request);
            requestTimeout = setTimeout(() => {
                requestTimeout = undefined;
                this.fallbackToCsr(response, filePath, callback);
                this.log(`SSR rendering exceeded timeout ${timeout}, fallbacking to CSR for ${request?.originalUrl}`, false);
            }, timeout);
        }
        else {
            // Here we respond with the fallback to CSR, but we don't `return`.
            // We let the actual rendering task to happen in the background
            // to eventually store the rendered result in the cache.
            this.fallbackToCsr(response, filePath, callback);
        }
        const renderingKey = this.getRenderingKey(request);
        const renderCallback = (err, html) => {
            if (requestTimeout) {
                // if request is still waiting for render, return it
                clearTimeout(requestTimeout);
                callback(err, html);
                this.log(`Request is resolved with the SSR rendering result (${request?.originalUrl})`);
                // store the render only if caching is enabled
                if (this.ssrOptions?.cache) {
                    this.renderingCache.store(renderingKey, err, html);
                }
                else {
                    this.renderingCache.clear(renderingKey);
                }
            }
            else {
                // store the render for future use
                this.renderingCache.store(renderingKey, err, html);
            }
        };
        this.handleRender({
            filePath,
            options,
            renderCallback,
            request,
        });
    }
    log(message, debug = true) {
        if (!debug || this.ssrOptions?.debug) {
            console.log(message);
        }
    }
    /** Retrieve the document from the cache or the filesystem */
    getDocument(filePath) {
        let doc = this.templateCache.get(filePath);
        if (!doc) {
            doc = fs.readFileSync(filePath, 'utf-8');
            this.templateCache.set(filePath, doc);
        }
        return doc;
    }
    /**
     * Delegates the render to the original _Angular Universal express engine_.
     *
     * In case when the config `reuseCurrentRendering` is enabled and **if there is already a pending
     * render task for the same rendering key**, it doesn't delegate a new render to Angular Universal.
     * Instead, it waits for the current rendering to complete and then reuse the result for all waiting requests.
     */
    handleRender({ filePath, options, renderCallback, request, }) {
        if (!this.ssrOptions?.reuseCurrentRendering) {
            this.startRender({
                filePath,
                options,
                renderCallback,
                request,
            });
            return;
        }
        const renderingKey = this.getRenderingKey(request);
        if (!this.renderCallbacks.has(renderingKey)) {
            this.renderCallbacks.set(renderingKey, []);
        }
        this.renderCallbacks.get(renderingKey)?.push(renderCallback);
        if (!this.renderingCache.isRendering(renderingKey)) {
            this.startRender({
                filePath,
                options,
                request,
                renderCallback: (err, html) => {
                    // Share the result of the render with all awaiting requests for the same key:
                    // Note: we access the Map at the moment of the render finished (don't store value in a local variable),
                    //       because in the meantime something might have deleted the value (i.e. when `maxRenderTime` passed).
                    this.renderCallbacks
                        .get(renderingKey)
                        ?.forEach((cb) => cb(err, html)); // pass the shared result to all waiting rendering callbacks
                    this.renderCallbacks.delete(renderingKey);
                },
            });
        }
        this.log(`Request is waiting for the SSR rendering to complete (${request?.originalUrl})`);
    }
    /**
     * Delegates the render to the original _Angular Universal express engine_.
     *
     * There is no way to abort the running render of Angular Universal.
     * So if the render doesn't complete in the configured `maxRenderTime`,
     * we just consider the render task as hanging (note: it's a potential memory leak!).
     * Later on, even if the render completes somewhen in the future, we will ignore
     * its result.
     */
    startRender({ filePath, options, renderCallback, request, }) {
        const renderingKey = this.getRenderingKey(request);
        // Setting the timeout for hanging renders that might not ever finish due to various reasons.
        // After the configured `maxRenderTime` passes, we consider the rendering task as hanging,
        // and release the concurrency slot and forget all callbacks waiting for the render's result.
        let maxRenderTimeout = setTimeout(() => {
            this.renderingCache.clear(renderingKey);
            maxRenderTimeout = undefined;
            this.currentConcurrency--;
            if (this.ssrOptions?.reuseCurrentRendering) {
                this.renderCallbacks.delete(renderingKey);
            }
            this.log(`Rendering of ${request?.originalUrl} was not able to complete. This might cause memory leaks!`, false);
        }, this.ssrOptions?.maxRenderTime ?? 300000); // 300000ms == 5 minutes
        this.log(`Rendering started (${request?.originalUrl})`);
        this.renderingCache.setAsRendering(renderingKey);
        this.currentConcurrency++;
        this.expressEngine(filePath, options, (err, html) => {
            if (!maxRenderTimeout) {
                // ignore this render's result because it exceeded maxRenderTimeout
                this.log(`Rendering of ${request.originalUrl} completed after the specified maxRenderTime, therefore it was ignored.`, false);
                return;
            }
            clearTimeout(maxRenderTimeout);
            this.log(`Rendering completed (${request?.originalUrl})`);
            this.currentConcurrency--;
            renderCallback(err, html);
        });
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Returns a factory function which resolves the server request origin.
 */
function serverRequestOriginFactory(options) {
    return () => {
        const serverRequestOrigin = inject(SERVER_REQUEST_ORIGIN, {
            optional: true,
            skipSelf: true,
        });
        // usually prerendering mode, but can be SSR
        if (options?.serverRequestOrigin) {
            return options.serverRequestOrigin;
        }
        // SSR mode, from express engine
        if (serverRequestOrigin) {
            return serverRequestOrigin;
        }
        throw new Error(`The request origin is not set. 
    If you are using the default environment variable, please specify it when initiating the process.
    
    E.g.
    > SERVER_REQUEST_ORIGIN=https://my.domain.com yarn prerender
    > SERVER_REQUEST_ORIGIN=http://localhost:4200 yarn serve:ssr
    
    
    Alternatively, you can pass it as an argument to provideServer
    function, but beware it will be used for server-side rendering as well.
    
    E.g.
    @NgModule({
      // ...
      providers: [
        provideServer({
          serverRequestOrigin: 'https://my.domain.com',
        }),
      ],
    })
    export class AppServerModule {}`);
    };
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Returns a factory function which resolves the server request URL.
 */
function serverRequestUrlFactory(options) {
    return () => {
        const platformConfig = inject(INITIAL_CONFIG);
        const serverRequestOrigin = inject(SERVER_REQUEST_ORIGIN);
        const serverRequestUrl = inject(SERVER_REQUEST_URL, {
            optional: true,
            skipSelf: true,
        });
        // SSR mode
        if (serverRequestUrl) {
            // should override the automatically recognized origin
            if (options?.serverRequestOrigin) {
                return serverRequestUrl.replace(serverRequestOrigin, options.serverRequestOrigin);
            }
            return serverRequestUrl;
        }
        // prerendering mode (no express server)
        return serverRequestOrigin + platformConfig.url;
    };
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Returns the providers used for SSR and pre-rendering processes.
 */
function provideServer(options) {
    return [
        {
            provide: SERVER_REQUEST_ORIGIN,
            useFactory: serverRequestOriginFactory(options),
        },
        {
            provide: SERVER_REQUEST_URL,
            useFactory: serverRequestUrlFactory(options),
        },
    ];
}
/**
 * Returns Spartacus providers to be passed to the Angular express engine (in SSR)
 *
 * @param options
 */
function getServerRequestProviders() {
    return [
        {
            provide: SERVER_REQUEST_ORIGIN,
            useFactory: getRequestOrigin,
            deps: [REQUEST],
        },
        {
            provide: SERVER_REQUEST_URL,
            useFactory: getRequestUrl,
            deps: [REQUEST],
        },
    ];
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The wrapper over the standard ngExpressEngine, that provides tokens for Spartacus
 * @param ngExpressEngine
 */
class NgExpressEngineDecorator {
    /**
     * Returns the higher order ngExpressEngine with provided tokens for Spartacus
     *
     * @param ngExpressEngine
     */
    static get(ngExpressEngine, optimizationOptions) {
        return decorateExpressEngine(ngExpressEngine, optimizationOptions);
    }
}
function decorateExpressEngine(ngExpressEngine, optimizationOptions = defaultSsrOptimizationOptions) {
    return function (setupOptions) {
        const engineInstance = ngExpressEngine({
            ...setupOptions,
            providers: [
                // add spartacus related providers
                ...getServerRequestProviders(),
                ...(setupOptions.providers ?? []),
            ],
        });
        // apply optimization wrapper if optimization options were defined
        return optimizationOptions
            ? new OptimizedSsrEngine(engineInstance, optimizationOptions)
                .engineInstance
            : engineInstance;
    };
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgExpressEngineDecorator, OptimizedSsrEngine, RenderingCache, RenderingStrategy, defaultSsrOptimizationOptions, getDefaultRenderKey, getServerRequestProviders, provideServer };
//# sourceMappingURL=spartacus-setup-ssr.mjs.map
