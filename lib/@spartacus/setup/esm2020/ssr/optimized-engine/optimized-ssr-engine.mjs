/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import * as fs from 'fs';
import { getRequestUrl } from '../express-utils/express-request-url';
import { RenderingCache } from './rendering-cache';
import { defaultSsrOptimizationOptions, RenderingStrategy, } from './ssr-optimization-options';
/**
 * Returns the full url for the given SSR Request.
 */
export const getDefaultRenderKey = getRequestUrl;
/**
 * The rendered pages are kept in memory to be served on next request. If the `cache` is set to `false`, the
 * response is evicted as soon as the first successful response is successfully returned.
 */
export class OptimizedSsrEngine {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW1pemVkLXNzci1lbmdpbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9jb3JlLWxpYnMvc2V0dXAvc3NyL29wdGltaXplZC1lbmdpbmUvb3B0aW1pemVkLXNzci1lbmdpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUlILE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDO0FBRXpCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUNMLDZCQUE2QixFQUM3QixpQkFBaUIsR0FFbEIsTUFBTSw0QkFBNEIsQ0FBQztBQUVwQzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLG1CQUFtQixHQUFHLGFBQWEsQ0FBQztBQWFqRDs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sa0JBQWtCO0lBaUI3QixJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsWUFDWSxhQUFzQyxFQUN0QyxVQUFtQztRQURuQyxrQkFBYSxHQUFiLGFBQWEsQ0FBeUI7UUFDdEMsZUFBVSxHQUFWLFVBQVUsQ0FBeUI7UUF0QnJDLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUN2QixtQkFBYyxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RCxrQkFBYSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBRWxEOzs7Ozs7Ozs7V0FTRztRQUNLLG9CQUFlLEdBQUcsSUFBSSxHQUFHLEVBQTJCLENBQUM7UUFVM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVO1lBQzFCLENBQUMsQ0FBQztnQkFDRSxHQUFHLDZCQUE2QjtnQkFDaEMsZ0NBQWdDO2dCQUNoQyxHQUFHLFVBQVU7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QyxHQUFHLENBQ04sZ0JBQWdCLE9BQU8sRUFBRSxXQUFXLDJEQUEyRCxFQUMvRixLQUFLLENBQ04sQ0FBQztRQUNKLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLGFBQWEsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLHdCQUF3QjtRQUV4RSxJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixPQUFPLEVBQUUsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUUxQixJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDbEQsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUNyQixtRUFBbUU7Z0JBQ25FLElBQUksQ0FBQyxHQUFHLENBQ04sZ0JBQWdCLE9BQU8sQ0FBQyxXQUFXLHlFQUF5RSxFQUM1RyxLQUFLLENBQ04sQ0FBQztnQkFDRixPQUFPO2FBQ1I7WUFDRCxZQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUUvQixJQUFJLENBQUMsR0FBRyxDQUFDLHdCQUF3QixPQUFPLEVBQUUsV0FBVyxHQUFHLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUUxQixjQUFjLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuLyogd2VicGFja0lnbm9yZTogdHJ1ZSAqL1xuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IE5nRXhwcmVzc0VuZ2luZUluc3RhbmNlIH0gZnJvbSAnLi4vZW5naW5lLWRlY29yYXRvci9uZy1leHByZXNzLWVuZ2luZS1kZWNvcmF0b3InO1xuaW1wb3J0IHsgZ2V0UmVxdWVzdFVybCB9IGZyb20gJy4uL2V4cHJlc3MtdXRpbHMvZXhwcmVzcy1yZXF1ZXN0LXVybCc7XG5pbXBvcnQgeyBSZW5kZXJpbmdDYWNoZSB9IGZyb20gJy4vcmVuZGVyaW5nLWNhY2hlJztcbmltcG9ydCB7XG4gIGRlZmF1bHRTc3JPcHRpbWl6YXRpb25PcHRpb25zLFxuICBSZW5kZXJpbmdTdHJhdGVneSxcbiAgU3NyT3B0aW1pemF0aW9uT3B0aW9ucyxcbn0gZnJvbSAnLi9zc3Itb3B0aW1pemF0aW9uLW9wdGlvbnMnO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZ1bGwgdXJsIGZvciB0aGUgZ2l2ZW4gU1NSIFJlcXVlc3QuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXREZWZhdWx0UmVuZGVyS2V5ID0gZ2V0UmVxdWVzdFVybDtcblxuZXhwb3J0IHR5cGUgU3NyQ2FsbGJhY2tGbiA9IChcbiAgLyoqXG4gICAqIEVycm9yIHRoYXQgbWlnaHQndmUgb2NjdXJyZWQgd2hpbGUgcmVuZGVyaW5nLlxuICAgKi9cbiAgZXJyPzogRXJyb3IgfCBudWxsIHwgdW5kZWZpbmVkLFxuICAvKipcbiAgICogSFRNTCByZXNwb25zZS5cbiAgICovXG4gIGh0bWw/OiBzdHJpbmcgfCB1bmRlZmluZWRcbikgPT4gdm9pZDtcblxuLyoqXG4gKiBUaGUgcmVuZGVyZWQgcGFnZXMgYXJlIGtlcHQgaW4gbWVtb3J5IHRvIGJlIHNlcnZlZCBvbiBuZXh0IHJlcXVlc3QuIElmIHRoZSBgY2FjaGVgIGlzIHNldCB0byBgZmFsc2VgLCB0aGVcbiAqIHJlc3BvbnNlIGlzIGV2aWN0ZWQgYXMgc29vbiBhcyB0aGUgZmlyc3Qgc3VjY2Vzc2Z1bCByZXNwb25zZSBpcyBzdWNjZXNzZnVsbHkgcmV0dXJuZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBPcHRpbWl6ZWRTc3JFbmdpbmUge1xuICBwcm90ZWN0ZWQgY3VycmVudENvbmN1cnJlbmN5ID0gMDtcbiAgcHJvdGVjdGVkIHJlbmRlcmluZ0NhY2hlID0gbmV3IFJlbmRlcmluZ0NhY2hlKHRoaXMuc3NyT3B0aW9ucyk7XG4gIHByaXZhdGUgdGVtcGxhdGVDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIGNvbmZpZyBgcmV1c2VDdXJyZW50UmVuZGVyaW5nYCBpcyBlbmFibGVkLCB3ZSB3YW50IHBlcmZvcm1cbiAgICogb25seSBvbmUgcmVuZGVyIGZvciBvbmUgcmVuZGVyaW5nIGtleSBhbmQgcmV1c2UgdGhlIGh0bWwgcmVzdWx0XG4gICAqIGZvciBhbGwgdGhlIHBlbmRpbmcgcmVxdWVzdHMgZm9yIHRoZSBzYW1lIHJlbmRlcmluZyBrZXkuXG4gICAqIFRoZXJlZm9yZSB3ZSBuZWVkIHRvIHN0b3JlIHRoZSBjYWxsYmFja3MgZm9yIGFsbCB0aGUgcGVuZGluZyByZXF1ZXN0c1xuICAgKiBhbmQgaW52b2tlIHRoZW0gd2l0aCB0aGUgaHRtbCBhZnRlciB0aGUgcmVuZGVyIGNvbXBsZXRlcy5cbiAgICpcbiAgICogVGhpcyBNYXAgc2hvdWxkIGJlIHVzZWQgb25seSB3aGVuIGByZXVzZUN1cnJlbnRSZW5kZXJpbmdgIGNvbmZpZyBpcyBlbmFibGVkLlxuICAgKiBJdCdzIGluZGV4ZWQgYnkgdGhlIHJlbmRlcmluZyBrZXlzLlxuICAgKi9cbiAgcHJpdmF0ZSByZW5kZXJDYWxsYmFja3MgPSBuZXcgTWFwPHN0cmluZywgU3NyQ2FsbGJhY2tGbltdPigpO1xuXG4gIGdldCBlbmdpbmVJbnN0YW5jZSgpOiBOZ0V4cHJlc3NFbmdpbmVJbnN0YW5jZSB7XG4gICAgcmV0dXJuIHRoaXMucmVuZGVyUmVzcG9uc2UuYmluZCh0aGlzKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBleHByZXNzRW5naW5lOiBOZ0V4cHJlc3NFbmdpbmVJbnN0YW5jZSxcbiAgICBwcm90ZWN0ZWQgc3NyT3B0aW9ucz86IFNzck9wdGltaXphdGlvbk9wdGlvbnNcbiAgKSB7XG4gICAgdGhpcy5zc3JPcHRpb25zID0gc3NyT3B0aW9uc1xuICAgICAgPyB7XG4gICAgICAgICAgLi4uZGVmYXVsdFNzck9wdGltaXphdGlvbk9wdGlvbnMsXG4gICAgICAgICAgLy8gb3ZlcnJpZGVzIHRoZSBkZWZhdWx0IG9wdGlvbnNcbiAgICAgICAgICAuLi5zc3JPcHRpb25zLFxuICAgICAgICB9XG4gICAgICA6IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxvZ09wdGlvbnMoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsb2dPcHRpb25zKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zc3JPcHRpb25zKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVwbGFjZXIgPSAoX2tleTogc3RyaW5nLCB2YWx1ZTogdW5rbm93bik6IHVua25vd24gPT4ge1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RyaW5naWZpZWRPcHRpb25zID0gSlNPTi5zdHJpbmdpZnkodGhpcy5zc3JPcHRpb25zLCByZXBsYWNlciwgMik7XG4gICAgdGhpcy5sb2coXG4gICAgICBgW3NwYXJ0YWN1c10gU1NSIG9wdGltaXphdGlvbiBlbmdpbmUgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZm9sbG93aW5nIG9wdGlvbnM6ICR7c3RyaW5naWZpZWRPcHRpb25zfWAsXG4gICAgICBmYWxzZVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogV2hlbiBTU1IgcGFnZSBjYW4gbm90IGJlIHJldHVybmVkIGluIHRpbWUsIHdlJ3JlIHJldHVybmluZyBpbmRleC5odG1sIG9mXG4gICAqIHRoZSBDU1IgYXBwbGljYXRpb24uXG4gICAqIFRoZSBDU1IgYXBwbGljYXRpb24gaXMgcmV0dXJuZWQgd2l0aCB0aGUgXCJDYWNoZS1Db250cm9sOiBuby1zdG9yZVwiIHJlc3BvbnNlLWhlYWRlci4gVGhpcyBub3RpZmllcyBleHRlcm5hbCBjYWNoZSBzeXN0ZW1zIHRvIG5vdCB1c2UgdGhlIENTUiBhcHBsaWNhdGlvbiBmb3IgdGhlIHN1YnNlcXVlbnQgcmVxdWVzdC5cbiAgICovXG4gIHByb3RlY3RlZCBmYWxsYmFja1RvQ3NyKFxuICAgIHJlc3BvbnNlOiBSZXNwb25zZSxcbiAgICBmaWxlUGF0aDogc3RyaW5nLFxuICAgIGNhbGxiYWNrOiBTc3JDYWxsYmFja0ZuXG4gICk6IHZvaWQge1xuICAgIHJlc3BvbnNlLnNldCgnQ2FjaGUtQ29udHJvbCcsICduby1zdG9yZScpO1xuICAgIGNhbGxiYWNrKHVuZGVmaW5lZCwgdGhpcy5nZXREb2N1bWVudChmaWxlUGF0aCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFJlbmRlcmluZ0tleShyZXF1ZXN0OiBSZXF1ZXN0KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zc3JPcHRpb25zPy5yZW5kZXJLZXlSZXNvbHZlclxuICAgICAgPyB0aGlzLnNzck9wdGlvbnMucmVuZGVyS2V5UmVzb2x2ZXIocmVxdWVzdClcbiAgICAgIDogZ2V0RGVmYXVsdFJlbmRlcktleShyZXF1ZXN0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRSZW5kZXJpbmdTdHJhdGVneShyZXF1ZXN0OiBSZXF1ZXN0KTogUmVuZGVyaW5nU3RyYXRlZ3kge1xuICAgIHJldHVybiB0aGlzLnNzck9wdGlvbnM/LnJlbmRlcmluZ1N0cmF0ZWd5UmVzb2x2ZXJcbiAgICAgID8gdGhpcy5zc3JPcHRpb25zLnJlbmRlcmluZ1N0cmF0ZWd5UmVzb2x2ZXIocmVxdWVzdClcbiAgICAgIDogUmVuZGVyaW5nU3RyYXRlZ3kuREVGQVVMVDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuIHJldHVybnMgdHJ1ZSwgdGhlIHNlcnZlciBzaWRlIHJlbmRlcmluZyBzaG91bGQgYmUgcGVyZm9ybWVkLlxuICAgKiBXaGVuIHJldHVybnMgZmFsc2UsIHRoZSBDU1IgZmFsbGJhY2sgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgKlxuICAgKiBXZSBzaG91bGQgbm90IHJlbmRlciwgd2hlbiB0aGVyZSBpcyBhbHJlYWR5XG4gICAqIGEgcGVuZGluZyByZW5kZXJpbmcgZm9yIHRoZSBzYW1lIHJlbmRlcmluZyBrZXlcbiAgICogKHVubGVzcyB0aGUgYHJldXNlQ3VycmVudFJlbmRlcmluZ2AgY29uZmlnIG9wdGlvbiBpcyBlbmFibGVkKVxuICAgKiBPUiB3aGVuIHRoZSBjb25jdXJyZW5jeSBsaW1pdCBpcyBleGNlZWRlZC5cbiAgICovXG4gIHByb3RlY3RlZCBzaG91bGRSZW5kZXIocmVxdWVzdDogUmVxdWVzdCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHJlbmRlcmluZ0tleSA9IHRoaXMuZ2V0UmVuZGVyaW5nS2V5KHJlcXVlc3QpO1xuICAgIGNvbnN0IGNvbmN1cnJlbmN5TGltaXRFeGNlZWRlZCA9XG4gICAgICB0aGlzLmlzQ29uY3VycmVuY3lMaW1pdEV4Y2VlZGVkKHJlbmRlcmluZ0tleSk7XG4gICAgY29uc3QgZmFsbEJhY2sgPVxuICAgICAgdGhpcy5yZW5kZXJpbmdDYWNoZS5pc1JlbmRlcmluZyhyZW5kZXJpbmdLZXkpICYmXG4gICAgICAhdGhpcy5zc3JPcHRpb25zPy5yZXVzZUN1cnJlbnRSZW5kZXJpbmc7XG5cbiAgICBpZiAoZmFsbEJhY2spIHtcbiAgICAgIHRoaXMubG9nKGBDU1IgZmFsbGJhY2s6IHJlbmRlcmluZyBpbiBwcm9ncmVzcyAoJHtyZXF1ZXN0Py5vcmlnaW5hbFVybH0pYCk7XG4gICAgfSBlbHNlIGlmIChjb25jdXJyZW5jeUxpbWl0RXhjZWVkZWQpIHtcbiAgICAgIHRoaXMubG9nKFxuICAgICAgICBgQ1NSIGZhbGxiYWNrOiBDb25jdXJyZW5jeSBsaW1pdCBleGNlZWRlZCAoJHt0aGlzLnNzck9wdGlvbnM/LmNvbmN1cnJlbmN5fSlgXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAoIWZhbGxCYWNrICYmXG4gICAgICAgICFjb25jdXJyZW5jeUxpbWl0RXhjZWVkZWQgJiZcbiAgICAgICAgdGhpcy5nZXRSZW5kZXJpbmdTdHJhdGVneShyZXF1ZXN0KSAhPT0gUmVuZGVyaW5nU3RyYXRlZ3kuQUxXQVlTX0NTUikgfHxcbiAgICAgIHRoaXMuZ2V0UmVuZGVyaW5nU3RyYXRlZ3kocmVxdWVzdCkgPT09IFJlbmRlcmluZ1N0cmF0ZWd5LkFMV0FZU19TU1JcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBmb3IgdGhlIGNvbmN1cnJlbmN5IGxpbWl0XG4gICAqXG4gICAqIEByZXR1cm5zIHRydWUgaWYgcmVuZGVyaW5nIHRoaXMgcmVxdWVzdCB3b3VsZCBleGNlZWQgdGhlIGNvbmN1cnJlbmN5IGxpbWl0XG4gICAqL1xuICBwcml2YXRlIGlzQ29uY3VycmVuY3lMaW1pdEV4Y2VlZGVkKHJlbmRlcmluZ0tleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy8gSWYgd2UgY2FuIHJldXNlIGEgcGVuZGluZyByZW5kZXIgZm9yIHRoaXMgcmVxdWVzdCwgd2UgZG9uJ3QgdGFrZSB1cCBhIG5ldyBjb25jdXJyZW5jeSBzbG90LlxuICAgIC8vIEluIHRoYXQgY2FzZSB3ZSBkb24ndCBleGNlZWQgdGhlIGNvbmN1cnJlbmN5IGxpbWl0IGV2ZW4gaWYgdGhlIGBjdXJyZW50Q29uY3VycmVuY3lgXG4gICAgLy8gYWxyZWFkeSByZWFjaGVzIHRoZSBsaW1pdC5cbiAgICBpZiAoXG4gICAgICB0aGlzLnNzck9wdGlvbnM/LnJldXNlQ3VycmVudFJlbmRlcmluZyAmJlxuICAgICAgdGhpcy5yZW5kZXJpbmdDYWNoZS5pc1JlbmRlcmluZyhyZW5kZXJpbmdLZXkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuc3NyT3B0aW9ucz8uY29uY3VycmVuY3lcbiAgICAgID8gdGhpcy5jdXJyZW50Q29uY3VycmVuY3kgPj0gdGhpcy5zc3JPcHRpb25zLmNvbmN1cnJlbmN5XG4gICAgICA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSwgd2hlbiB0aGUgYHRpbWVvdXRgIG9wdGlvbiBoYXMgYmVlbiBjb25maWd1cmVkIHRvIG5vbi16ZXJvIHZhbHVlIE9SXG4gICAqIHdoZW4gdGhlIHJlbmRlcmluZyBzdHJhdGVneSBmb3IgdGhlIGdpdmVuIHJlcXVlc3QgaXMgQUxXQVlTX1NTUi5cbiAgICogT3RoZXJ3aXNlLCBpdCByZXR1cm5zIGZhbHNlLlxuICAgKi9cbiAgcHJvdGVjdGVkIHNob3VsZFRpbWVvdXQocmVxdWVzdDogUmVxdWVzdCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAhIXRoaXMuc3NyT3B0aW9ucz8udGltZW91dCB8fFxuICAgICAgdGhpcy5nZXRSZW5kZXJpbmdTdHJhdGVneShyZXF1ZXN0KSA9PT0gUmVuZGVyaW5nU3RyYXRlZ3kuQUxXQVlTX1NTUlxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdGltZW91dCB2YWx1ZS5cbiAgICpcbiAgICogSW4gY2FzZSBvZiB0aGUgcmVuZGVyaW5nIHN0cmF0ZWd5IEFMV0FZU19TU1IsIGl0IHJldHVybnMgdGhlIGNvbmZpZyBgZm9yY2VkU3NyVGltZW91dGAuXG4gICAqIE90aGVyd2lzZSwgaXQgcmV0dXJucyB0aGUgY29uZmlnIGB0aW1lb3V0YC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRUaW1lb3V0KHJlcXVlc3Q6IFJlcXVlc3QpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmdldFJlbmRlcmluZ1N0cmF0ZWd5KHJlcXVlc3QpID09PSBSZW5kZXJpbmdTdHJhdGVneS5BTFdBWVNfU1NSXG4gICAgICA/IHRoaXMuc3NyT3B0aW9ucz8uZm9yY2VkU3NyVGltZW91dCA/PyA2MDAwMFxuICAgICAgOiB0aGlzLnNzck9wdGlvbnM/LnRpbWVvdXQgPz8gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJZiB0aGVyZSBpcyBhbiBhdmFpbGFibGUgY2FjaGVkIHJlc3BvbnNlIGZvciB0aGlzIHJlbmRlcmluZyBrZXksXG4gICAqIGl0IGludm9rZXMgdGhlIGdpdmVuIHJlbmRlciBjYWxsYmFjayB3aXRoIHRoZSByZXNwb25zZSBhbmQgcmV0dXJucyB0cnVlLlxuICAgKlxuICAgKiBPdGhlcndpc2UsIGl0IHJldHVybnMgZmFsc2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgcmV0dXJuQ2FjaGVkUmVuZGVyKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgY2FsbGJhY2s6IFNzckNhbGxiYWNrRm5cbiAgKTogYm9vbGVhbiB7XG4gICAgY29uc3Qga2V5ID0gdGhpcy5nZXRSZW5kZXJpbmdLZXkocmVxdWVzdCk7XG5cbiAgICBpZiAodGhpcy5yZW5kZXJpbmdDYWNoZS5pc1JlYWR5KGtleSkpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICBjb25zdCBjYWNoZWQgPSB0aGlzLnJlbmRlcmluZ0NhY2hlLmdldChrZXkpITtcbiAgICAgIGNhbGxiYWNrKGNhY2hlZC5lcnIsIGNhY2hlZC5odG1sKTtcblxuICAgICAgaWYgKCF0aGlzLnNzck9wdGlvbnM/LmNhY2hlKSB7XG4gICAgICAgIC8vIHdlIGRyb3AgY2FjaGVkIHJlbmRlcmluZyBpZiBjYWNoaW5nIGlzIGRpc2FibGVkXG4gICAgICAgIHRoaXMucmVuZGVyaW5nQ2FjaGUuY2xlYXIoa2V5KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgcmVxdWVzdCBhbmQgaW52b2tlcyB0aGUgZ2l2ZW4gYGNhbGxiYWNrYCB3aXRoIHRoZSByZXN1bHQgaHRtbCAvIGVycm9yLlxuICAgKlxuICAgKiBUaGUgcmVzdWx0IG1pZ2h0IGJlIGV0aGVyOlxuICAgKiAtIGEgQ1NSIGZhbGxiYWNrIHdpdGggYSBiYXNpYyBgaW5kZXguaHRtbGAgY29udGVudFxuICAgKiAtIGEgcmVzdWx0IHJlbmRlcmVkIGJ5IHRoZSBvcmlnaW5hbCBBbmd1bGFyIFVuaXZlcnNhbCBleHByZXNzIGVuZ2luZVxuICAgKiAtIGEgcmVzdWx0IGZyb20gdGhlIGluLW1lbW9yeSBjYWNoZSAod2hpY2ggd2FzIHByZXZpb3VzbHkgcmVuZGVyZWQgYnkgQW5ndWxhciBVbml2ZXJzYWwgZXhwcmVzcyBlbmdpbmUpLlxuICAgKi9cbiAgcHJvdGVjdGVkIHJlbmRlclJlc3BvbnNlKFxuICAgIGZpbGVQYXRoOiBzdHJpbmcsXG4gICAgb3B0aW9uczogYW55LFxuICAgIGNhbGxiYWNrOiBTc3JDYWxsYmFja0ZuXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHJlcXVlc3Q6IFJlcXVlc3QgPSBvcHRpb25zLnJlcTtcbiAgICBjb25zdCByZXNwb25zZTogUmVzcG9uc2UgPSBvcHRpb25zLnJlcyB8fCBvcHRpb25zLnJlcS5yZXM7XG5cbiAgICBpZiAodGhpcy5yZXR1cm5DYWNoZWRSZW5kZXIocmVxdWVzdCwgY2FsbGJhY2spKSB7XG4gICAgICB0aGlzLmxvZyhgUmVuZGVyIGZyb20gY2FjaGUgKCR7cmVxdWVzdD8ub3JpZ2luYWxVcmx9KWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuc2hvdWxkUmVuZGVyKHJlcXVlc3QpKSB7XG4gICAgICB0aGlzLmZhbGxiYWNrVG9Dc3IocmVzcG9uc2UsIGZpbGVQYXRoLCBjYWxsYmFjayk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHJlcXVlc3RUaW1lb3V0OiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IHVuZGVmaW5lZDtcbiAgICBpZiAodGhpcy5zaG91bGRUaW1lb3V0KHJlcXVlc3QpKSB7XG4gICAgICAvLyBlc3RhYmxpc2ggdGltZW91dCBmb3IgcmVuZGVyaW5nXG4gICAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KHJlcXVlc3QpO1xuICAgICAgcmVxdWVzdFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmVxdWVzdFRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuZmFsbGJhY2tUb0NzcihyZXNwb25zZSwgZmlsZVBhdGgsIGNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgYFNTUiByZW5kZXJpbmcgZXhjZWVkZWQgdGltZW91dCAke3RpbWVvdXR9LCBmYWxsYmFja2luZyB0byBDU1IgZm9yICR7cmVxdWVzdD8ub3JpZ2luYWxVcmx9YCxcbiAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgfSwgdGltZW91dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEhlcmUgd2UgcmVzcG9uZCB3aXRoIHRoZSBmYWxsYmFjayB0byBDU1IsIGJ1dCB3ZSBkb24ndCBgcmV0dXJuYC5cbiAgICAgIC8vIFdlIGxldCB0aGUgYWN0dWFsIHJlbmRlcmluZyB0YXNrIHRvIGhhcHBlbiBpbiB0aGUgYmFja2dyb3VuZFxuICAgICAgLy8gdG8gZXZlbnR1YWxseSBzdG9yZSB0aGUgcmVuZGVyZWQgcmVzdWx0IGluIHRoZSBjYWNoZS5cbiAgICAgIHRoaXMuZmFsbGJhY2tUb0NzcihyZXNwb25zZSwgZmlsZVBhdGgsIGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBjb25zdCByZW5kZXJpbmdLZXkgPSB0aGlzLmdldFJlbmRlcmluZ0tleShyZXF1ZXN0KTtcbiAgICBjb25zdCByZW5kZXJDYWxsYmFjazogU3NyQ2FsbGJhY2tGbiA9IChlcnIsIGh0bWwpOiB2b2lkID0+IHtcbiAgICAgIGlmIChyZXF1ZXN0VGltZW91dCkge1xuICAgICAgICAvLyBpZiByZXF1ZXN0IGlzIHN0aWxsIHdhaXRpbmcgZm9yIHJlbmRlciwgcmV0dXJuIGl0XG4gICAgICAgIGNsZWFyVGltZW91dChyZXF1ZXN0VGltZW91dCk7XG4gICAgICAgIGNhbGxiYWNrKGVyciwgaHRtbCk7XG5cbiAgICAgICAgdGhpcy5sb2coXG4gICAgICAgICAgYFJlcXVlc3QgaXMgcmVzb2x2ZWQgd2l0aCB0aGUgU1NSIHJlbmRlcmluZyByZXN1bHQgKCR7cmVxdWVzdD8ub3JpZ2luYWxVcmx9KWBcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBzdG9yZSB0aGUgcmVuZGVyIG9ubHkgaWYgY2FjaGluZyBpcyBlbmFibGVkXG4gICAgICAgIGlmICh0aGlzLnNzck9wdGlvbnM/LmNhY2hlKSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJpbmdDYWNoZS5zdG9yZShyZW5kZXJpbmdLZXksIGVyciwgaHRtbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJpbmdDYWNoZS5jbGVhcihyZW5kZXJpbmdLZXkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzdG9yZSB0aGUgcmVuZGVyIGZvciBmdXR1cmUgdXNlXG4gICAgICAgIHRoaXMucmVuZGVyaW5nQ2FjaGUuc3RvcmUocmVuZGVyaW5nS2V5LCBlcnIsIGh0bWwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmhhbmRsZVJlbmRlcih7XG4gICAgICBmaWxlUGF0aCxcbiAgICAgIG9wdGlvbnMsXG4gICAgICByZW5kZXJDYWxsYmFjayxcbiAgICAgIHJlcXVlc3QsXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbG9nKG1lc3NhZ2U6IHN0cmluZywgZGVidWcgPSB0cnVlKTogdm9pZCB7XG4gICAgaWYgKCFkZWJ1ZyB8fCB0aGlzLnNzck9wdGlvbnM/LmRlYnVnKSB7XG4gICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICAvKiogUmV0cmlldmUgdGhlIGRvY3VtZW50IGZyb20gdGhlIGNhY2hlIG9yIHRoZSBmaWxlc3lzdGVtICovXG4gIHByb3RlY3RlZCBnZXREb2N1bWVudChmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBsZXQgZG9jID0gdGhpcy50ZW1wbGF0ZUNhY2hlLmdldChmaWxlUGF0aCk7XG5cbiAgICBpZiAoIWRvYykge1xuICAgICAgZG9jID0gZnMucmVhZEZpbGVTeW5jKGZpbGVQYXRoLCAndXRmLTgnKTtcbiAgICAgIHRoaXMudGVtcGxhdGVDYWNoZS5zZXQoZmlsZVBhdGgsIGRvYyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvYztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxlZ2F0ZXMgdGhlIHJlbmRlciB0byB0aGUgb3JpZ2luYWwgX0FuZ3VsYXIgVW5pdmVyc2FsIGV4cHJlc3MgZW5naW5lXy5cbiAgICpcbiAgICogSW4gY2FzZSB3aGVuIHRoZSBjb25maWcgYHJldXNlQ3VycmVudFJlbmRlcmluZ2AgaXMgZW5hYmxlZCBhbmQgKippZiB0aGVyZSBpcyBhbHJlYWR5IGEgcGVuZGluZ1xuICAgKiByZW5kZXIgdGFzayBmb3IgdGhlIHNhbWUgcmVuZGVyaW5nIGtleSoqLCBpdCBkb2Vzbid0IGRlbGVnYXRlIGEgbmV3IHJlbmRlciB0byBBbmd1bGFyIFVuaXZlcnNhbC5cbiAgICogSW5zdGVhZCwgaXQgd2FpdHMgZm9yIHRoZSBjdXJyZW50IHJlbmRlcmluZyB0byBjb21wbGV0ZSBhbmQgdGhlbiByZXVzZSB0aGUgcmVzdWx0IGZvciBhbGwgd2FpdGluZyByZXF1ZXN0cy5cbiAgICovXG4gIHByaXZhdGUgaGFuZGxlUmVuZGVyKHtcbiAgICBmaWxlUGF0aCxcbiAgICBvcHRpb25zLFxuICAgIHJlbmRlckNhbGxiYWNrLFxuICAgIHJlcXVlc3QsXG4gIH06IHtcbiAgICBmaWxlUGF0aDogc3RyaW5nO1xuICAgIG9wdGlvbnM6IGFueTtcbiAgICByZW5kZXJDYWxsYmFjazogU3NyQ2FsbGJhY2tGbjtcbiAgICByZXF1ZXN0OiBSZXF1ZXN0O1xuICB9KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnNzck9wdGlvbnM/LnJldXNlQ3VycmVudFJlbmRlcmluZykge1xuICAgICAgdGhpcy5zdGFydFJlbmRlcih7XG4gICAgICAgIGZpbGVQYXRoLFxuICAgICAgICBvcHRpb25zLFxuICAgICAgICByZW5kZXJDYWxsYmFjayxcbiAgICAgICAgcmVxdWVzdCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlcmluZ0tleSA9IHRoaXMuZ2V0UmVuZGVyaW5nS2V5KHJlcXVlc3QpO1xuICAgIGlmICghdGhpcy5yZW5kZXJDYWxsYmFja3MuaGFzKHJlbmRlcmluZ0tleSkpIHtcbiAgICAgIHRoaXMucmVuZGVyQ2FsbGJhY2tzLnNldChyZW5kZXJpbmdLZXksIFtdKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJDYWxsYmFja3MuZ2V0KHJlbmRlcmluZ0tleSk/LnB1c2gocmVuZGVyQ2FsbGJhY2spO1xuXG4gICAgaWYgKCF0aGlzLnJlbmRlcmluZ0NhY2hlLmlzUmVuZGVyaW5nKHJlbmRlcmluZ0tleSkpIHtcbiAgICAgIHRoaXMuc3RhcnRSZW5kZXIoe1xuICAgICAgICBmaWxlUGF0aCxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgcmVuZGVyQ2FsbGJhY2s6IChlcnIsIGh0bWwpID0+IHtcbiAgICAgICAgICAvLyBTaGFyZSB0aGUgcmVzdWx0IG9mIHRoZSByZW5kZXIgd2l0aCBhbGwgYXdhaXRpbmcgcmVxdWVzdHMgZm9yIHRoZSBzYW1lIGtleTpcblxuICAgICAgICAgIC8vIE5vdGU6IHdlIGFjY2VzcyB0aGUgTWFwIGF0IHRoZSBtb21lbnQgb2YgdGhlIHJlbmRlciBmaW5pc2hlZCAoZG9uJ3Qgc3RvcmUgdmFsdWUgaW4gYSBsb2NhbCB2YXJpYWJsZSksXG4gICAgICAgICAgLy8gICAgICAgYmVjYXVzZSBpbiB0aGUgbWVhbnRpbWUgc29tZXRoaW5nIG1pZ2h0IGhhdmUgZGVsZXRlZCB0aGUgdmFsdWUgKGkuZS4gd2hlbiBgbWF4UmVuZGVyVGltZWAgcGFzc2VkKS5cbiAgICAgICAgICB0aGlzLnJlbmRlckNhbGxiYWNrc1xuICAgICAgICAgICAgLmdldChyZW5kZXJpbmdLZXkpXG4gICAgICAgICAgICA/LmZvckVhY2goKGNiKSA9PiBjYihlcnIsIGh0bWwpKTsgLy8gcGFzcyB0aGUgc2hhcmVkIHJlc3VsdCB0byBhbGwgd2FpdGluZyByZW5kZXJpbmcgY2FsbGJhY2tzXG4gICAgICAgICAgdGhpcy5yZW5kZXJDYWxsYmFja3MuZGVsZXRlKHJlbmRlcmluZ0tleSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmxvZyhcbiAgICAgIGBSZXF1ZXN0IGlzIHdhaXRpbmcgZm9yIHRoZSBTU1IgcmVuZGVyaW5nIHRvIGNvbXBsZXRlICgke3JlcXVlc3Q/Lm9yaWdpbmFsVXJsfSlgXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxlZ2F0ZXMgdGhlIHJlbmRlciB0byB0aGUgb3JpZ2luYWwgX0FuZ3VsYXIgVW5pdmVyc2FsIGV4cHJlc3MgZW5naW5lXy5cbiAgICpcbiAgICogVGhlcmUgaXMgbm8gd2F5IHRvIGFib3J0IHRoZSBydW5uaW5nIHJlbmRlciBvZiBBbmd1bGFyIFVuaXZlcnNhbC5cbiAgICogU28gaWYgdGhlIHJlbmRlciBkb2Vzbid0IGNvbXBsZXRlIGluIHRoZSBjb25maWd1cmVkIGBtYXhSZW5kZXJUaW1lYCxcbiAgICogd2UganVzdCBjb25zaWRlciB0aGUgcmVuZGVyIHRhc2sgYXMgaGFuZ2luZyAobm90ZTogaXQncyBhIHBvdGVudGlhbCBtZW1vcnkgbGVhayEpLlxuICAgKiBMYXRlciBvbiwgZXZlbiBpZiB0aGUgcmVuZGVyIGNvbXBsZXRlcyBzb21ld2hlbiBpbiB0aGUgZnV0dXJlLCB3ZSB3aWxsIGlnbm9yZVxuICAgKiBpdHMgcmVzdWx0LlxuICAgKi9cbiAgcHJpdmF0ZSBzdGFydFJlbmRlcih7XG4gICAgZmlsZVBhdGgsXG4gICAgb3B0aW9ucyxcbiAgICByZW5kZXJDYWxsYmFjayxcbiAgICByZXF1ZXN0LFxuICB9OiB7XG4gICAgZmlsZVBhdGg6IHN0cmluZztcbiAgICBvcHRpb25zOiBhbnk7XG4gICAgcmVuZGVyQ2FsbGJhY2s6IFNzckNhbGxiYWNrRm47XG4gICAgcmVxdWVzdDogUmVxdWVzdDtcbiAgfSk6IHZvaWQge1xuICAgIGNvbnN0IHJlbmRlcmluZ0tleSA9IHRoaXMuZ2V0UmVuZGVyaW5nS2V5KHJlcXVlc3QpO1xuXG4gICAgLy8gU2V0dGluZyB0aGUgdGltZW91dCBmb3IgaGFuZ2luZyByZW5kZXJzIHRoYXQgbWlnaHQgbm90IGV2ZXIgZmluaXNoIGR1ZSB0byB2YXJpb3VzIHJlYXNvbnMuXG4gICAgLy8gQWZ0ZXIgdGhlIGNvbmZpZ3VyZWQgYG1heFJlbmRlclRpbWVgIHBhc3Nlcywgd2UgY29uc2lkZXIgdGhlIHJlbmRlcmluZyB0YXNrIGFzIGhhbmdpbmcsXG4gICAgLy8gYW5kIHJlbGVhc2UgdGhlIGNvbmN1cnJlbmN5IHNsb3QgYW5kIGZvcmdldCBhbGwgY2FsbGJhY2tzIHdhaXRpbmcgZm9yIHRoZSByZW5kZXIncyByZXN1bHQuXG4gICAgbGV0IG1heFJlbmRlclRpbWVvdXQ6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgdW5kZWZpbmVkID1cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlbmRlcmluZ0NhY2hlLmNsZWFyKHJlbmRlcmluZ0tleSk7XG4gICAgICAgIG1heFJlbmRlclRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuY3VycmVudENvbmN1cnJlbmN5LS07XG4gICAgICAgIGlmICh0aGlzLnNzck9wdGlvbnM/LnJldXNlQ3VycmVudFJlbmRlcmluZykge1xuICAgICAgICAgIHRoaXMucmVuZGVyQ2FsbGJhY2tzLmRlbGV0ZShyZW5kZXJpbmdLZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nKFxuICAgICAgICAgIGBSZW5kZXJpbmcgb2YgJHtyZXF1ZXN0Py5vcmlnaW5hbFVybH0gd2FzIG5vdCBhYmxlIHRvIGNvbXBsZXRlLiBUaGlzIG1pZ2h0IGNhdXNlIG1lbW9yeSBsZWFrcyFgLFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICB9LCB0aGlzLnNzck9wdGlvbnM/Lm1heFJlbmRlclRpbWUgPz8gMzAwMDAwKTsgLy8gMzAwMDAwbXMgPT0gNSBtaW51dGVzXG5cbiAgICB0aGlzLmxvZyhgUmVuZGVyaW5nIHN0YXJ0ZWQgKCR7cmVxdWVzdD8ub3JpZ2luYWxVcmx9KWApO1xuICAgIHRoaXMucmVuZGVyaW5nQ2FjaGUuc2V0QXNSZW5kZXJpbmcocmVuZGVyaW5nS2V5KTtcbiAgICB0aGlzLmN1cnJlbnRDb25jdXJyZW5jeSsrO1xuXG4gICAgdGhpcy5leHByZXNzRW5naW5lKGZpbGVQYXRoLCBvcHRpb25zLCAoZXJyLCBodG1sKSA9PiB7XG4gICAgICBpZiAoIW1heFJlbmRlclRpbWVvdXQpIHtcbiAgICAgICAgLy8gaWdub3JlIHRoaXMgcmVuZGVyJ3MgcmVzdWx0IGJlY2F1c2UgaXQgZXhjZWVkZWQgbWF4UmVuZGVyVGltZW91dFxuICAgICAgICB0aGlzLmxvZyhcbiAgICAgICAgICBgUmVuZGVyaW5nIG9mICR7cmVxdWVzdC5vcmlnaW5hbFVybH0gY29tcGxldGVkIGFmdGVyIHRoZSBzcGVjaWZpZWQgbWF4UmVuZGVyVGltZSwgdGhlcmVmb3JlIGl0IHdhcyBpZ25vcmVkLmAsXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY2xlYXJUaW1lb3V0KG1heFJlbmRlclRpbWVvdXQpO1xuXG4gICAgICB0aGlzLmxvZyhgUmVuZGVyaW5nIGNvbXBsZXRlZCAoJHtyZXF1ZXN0Py5vcmlnaW5hbFVybH0pYCk7XG4gICAgICB0aGlzLmN1cnJlbnRDb25jdXJyZW5jeS0tO1xuXG4gICAgICByZW5kZXJDYWxsYmFjayhlcnIsIGh0bWwpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=