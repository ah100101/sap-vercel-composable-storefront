import { Injectable } from '@angular/core';
import { combineLatest, defer, EMPTY, queueScheduler, Subject, Subscription, using, } from 'rxjs';
import { filter, map, observeOn, pairwise, shareReplay, skipWhile, switchMap, take, tap, withLatestFrom, } from 'rxjs/operators';
import { GlobalMessageType } from '../../../global-message/models/global-message.model';
import * as i0 from "@angular/core";
import * as i1 from "../facade/auth.service";
import * as i2 from "./auth-storage.service";
import * as i3 from "./oauth-lib-wrapper.service";
import * as i4 from "../../../routing/facade/routing.service";
import * as i5 from "../../../occ/services/occ-endpoints.service";
import * as i6 from "../../../global-message/facade/global-message.service";
import * as i7 from "./auth-redirect.service";
/**
 * Extendable service for `AuthInterceptor`.
 */
export class AuthHttpHeaderService {
    constructor(authService, authStorageService, oAuthLibWrapperService, routingService, occEndpoints, globalMessageService, authRedirectService) {
        this.authService = authService;
        this.authStorageService = authStorageService;
        this.oAuthLibWrapperService = oAuthLibWrapperService;
        this.routingService = routingService;
        this.occEndpoints = occEndpoints;
        this.globalMessageService = globalMessageService;
        this.authRedirectService = authRedirectService;
        /**
         * Starts the refresh of the access token
         */
        this.refreshTokenTrigger$ = new Subject();
        /**
         * Internal token streams which reads the latest from the storage.
         * Emits the token or `undefined`
         */
        this.token$ = this.authStorageService
            .getToken()
            .pipe(map((token) => (token?.access_token ? token : undefined)));
        /**
         * Compares the previous and the new token in order to stop the refresh or logout processes
         */
        this.stopProgress$ = this.token$.pipe(
        // Keeps the previous and the new token
        pairwise(), tap(([oldToken, newToken]) => {
            // if we got the new token we know that either the refresh or logout finished
            if (oldToken?.access_token !== newToken?.access_token) {
                this.authService.setLogoutProgress(false);
                this.authService.setRefreshProgress(false);
            }
        }));
        /**
         * Refreshes the token only if currently there's no refresh nor logout in progress.
         * If the refresh token is not present, it triggers the logout process
         */
        this.refreshToken$ = this.refreshTokenTrigger$.pipe(withLatestFrom(this.authService.refreshInProgress$, this.authService.logoutInProgress$), filter(([, refreshInProgress, logoutInProgress]) => !refreshInProgress && !logoutInProgress), tap(([token]) => {
            if (token?.refresh_token) {
                this.oAuthLibWrapperService.refreshToken();
                this.authService.setRefreshProgress(true);
            }
            else {
                this.handleExpiredRefreshToken();
            }
        }));
        /**
         * Kicks of the process by listening to the new token and refresh token processes.
         * This token should be used when retrying the failed http request.
         */
        this.tokenToRetryRequest$ = using(() => this.refreshToken$.subscribe(), () => this.getStableToken()).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
        this.subscriptions = new Subscription();
        // We need to have stopProgress$ stream active for the whole time,
        // so when the logout finishes we finish it's process.
        // It could happen when retryToken$ is not active.
        this.subscriptions.add(this.stopProgress$.subscribe());
    }
    /**
     * Checks if request should be handled by this service (if it's OCC call).
     */
    shouldCatchError(request) {
        return this.isOccUrl(request.url);
    }
    shouldAddAuthorizationHeader(request) {
        const hasAuthorizationHeader = !!this.getAuthorizationHeader(request);
        const isOccUrl = this.isOccUrl(request.url);
        return !hasAuthorizationHeader && isOccUrl;
    }
    /**
     * Adds `Authorization` header for OCC calls.
     */
    alterRequest(request, token) {
        const hasAuthorizationHeader = !!this.getAuthorizationHeader(request);
        const isBaseSitesRequest = this.isBaseSitesRequest(request);
        const isOccUrl = this.isOccUrl(request.url);
        if (!hasAuthorizationHeader && isOccUrl && !isBaseSitesRequest) {
            return request.clone({
                setHeaders: {
                    ...this.createAuthorizationHeader(token),
                },
            });
        }
        return request;
    }
    isOccUrl(url) {
        return url.includes(this.occEndpoints.getBaseUrl());
    }
    isBaseSitesRequest(request) {
        return request.url.includes(this.occEndpoints.getRawEndpointValue('baseSites'));
    }
    getAuthorizationHeader(request) {
        const rawValue = request.headers.get('Authorization');
        return rawValue;
    }
    createAuthorizationHeader(token) {
        if (token?.access_token) {
            return {
                Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
            };
        }
        let currentToken;
        this.authStorageService
            .getToken()
            .subscribe((authToken) => (currentToken = authToken))
            .unsubscribe();
        if (currentToken?.access_token) {
            return {
                Authorization: `${currentToken.token_type || 'Bearer'} ${currentToken.access_token}`,
            };
        }
        return {};
    }
    /**
     * Refreshes access_token and then retries the call with the new token.
     */
    handleExpiredAccessToken(request, next, initialToken) {
        return this.getValidToken(initialToken).pipe(switchMap((token) => 
        // we break the stream with EMPTY when we don't have the token. This prevents sending the requests with `Authorization: bearer undefined` header
        token
            ? next.handle(this.createNewRequestWithNewToken(request, token))
            : EMPTY));
    }
    /**
     * Logout user, redirected to login page and informs about expired session.
     */
    handleExpiredRefreshToken() {
        // There might be 2 cases:
        // 1. when user is already on some page (router is stable) and performs an UI action
        // that triggers http call (i.e. button click to save data in backend)
        // 2. when user is navigating to some page and a route guard triggers the http call
        // (i.e. guard loading cms page data)
        //
        // In the second case, we want to remember the anticipated url before we navigate to
        // the login page, so we can redirect back to that URL after user authenticates.
        this.authRedirectService.saveCurrentNavigationUrl();
        // Logout user
        // TODO(#9638): Use logout route when it will support passing redirect url
        this.authService.coreLogout().finally(() => {
            this.routingService.go({ cxRoute: 'login' });
            this.globalMessageService.add({
                key: 'httpHandlers.sessionExpired',
            }, GlobalMessageType.MSG_TYPE_ERROR);
        });
    }
    /**
     * Emits the token or `undefined` only when the refresh or the logout processes are finished.
     */
    getStableToken() {
        return combineLatest([
            this.token$,
            this.authService.refreshInProgress$,
            this.authService.logoutInProgress$,
        ]).pipe(observeOn(queueScheduler), filter(([_, refreshInProgress, logoutInProgress]) => !refreshInProgress && !logoutInProgress), switchMap(() => this.token$));
    }
    /**
     * Returns a valid access token.
     * It will attempt to refresh it if the current one expired; emits after the new one is retrieved.
     */
    getValidToken(requestToken) {
        return defer(() => {
            // flag to only refresh token only on first emission
            let refreshTriggered = false;
            return this.tokenToRetryRequest$.pipe(tap((token) => {
                // we want to refresh the access token only when it is old.
                // this is a guard for the case when there are multiple parallel http calls
                if (token?.access_token === requestToken?.access_token &&
                    !refreshTriggered) {
                    this.refreshTokenTrigger$.next(token);
                }
                refreshTriggered = true;
            }), skipWhile((token) => token?.access_token === requestToken?.access_token), take(1));
        });
    }
    createNewRequestWithNewToken(request, token) {
        request = request.clone({
            setHeaders: {
                Authorization: `${token.token_type || 'Bearer'} ${token.access_token}`,
            },
        });
        return request;
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
AuthHttpHeaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AuthHttpHeaderService, deps: [{ token: i1.AuthService }, { token: i2.AuthStorageService }, { token: i3.OAuthLibWrapperService }, { token: i4.RoutingService }, { token: i5.OccEndpointsService }, { token: i6.GlobalMessageService }, { token: i7.AuthRedirectService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthHttpHeaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AuthHttpHeaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AuthHttpHeaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i2.AuthStorageService }, { type: i3.OAuthLibWrapperService }, { type: i4.RoutingService }, { type: i5.OccEndpointsService }, { type: i6.GlobalMessageService }, { type: i7.AuthRedirectService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1odHRwLWhlYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvYXV0aC91c2VyLWF1dGgvc2VydmljZXMvYXV0aC1odHRwLWhlYWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUNMLGFBQWEsRUFDYixLQUFLLEVBQ0wsS0FBSyxFQUVMLGNBQWMsRUFDZCxPQUFPLEVBQ1AsWUFBWSxFQUNaLEtBQUssR0FDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxNQUFNLEVBQ04sR0FBRyxFQUNILFNBQVMsRUFDVCxRQUFRLEVBQ1IsV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsSUFBSSxFQUNKLEdBQUcsRUFDSCxjQUFjLEdBQ2YsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQzs7Ozs7Ozs7O0FBU3hGOztHQUVHO0FBSUgsTUFBTSxPQUFPLHFCQUFxQjtJQStEaEMsWUFDWSxXQUF3QixFQUN4QixrQkFBc0MsRUFDdEMsc0JBQThDLEVBQzlDLGNBQThCLEVBQzlCLFlBQWlDLEVBQ2pDLG9CQUEwQyxFQUMxQyxtQkFBd0M7UUFOeEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBckVwRDs7V0FFRztRQUNPLHlCQUFvQixHQUFHLElBQUksT0FBTyxF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LEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxZQUFZLEtBQUssWUFBWSxFQUFFLFlBQVksQ0FDOUQsRUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1IsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVTLDRCQUE0QixDQUNwQyxPQUF5QixFQUN6QixLQUFnQjtRQUVoQixPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN0QixVQUFVLEVBQUU7Z0JBQ1YsYUFBYSxFQUFFLEdBQUcsS0FBSyxDQUFDLFVBQVUsSUFBSSxRQUFRLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRTthQUN2RTtTQUNGLENBQUMsQ0FBQztRQUNILE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOztrSEFsUVUscUJBQXFCO3NIQUFyQixxQkFBcUIsY0FGcEIsTUFBTTsyRkFFUCxxQkFBcUI7a0JBSGpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cFJlcXVlc3QgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIGNvbWJpbmVMYXRlc3QsXG4gIGRlZmVyLFxuICBFTVBUWSxcbiAgT2JzZXJ2YWJsZSxcbiAgcXVldWVTY2hlZHVsZXIsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmlwdGlvbixcbiAgdXNpbmcsXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZmlsdGVyLFxuICBtYXAsXG4gIG9ic2VydmVPbixcbiAgcGFpcndpc2UsXG4gIHNoYXJlUmVwbGF5LFxuICBza2lwV2hpbGUsXG4gIHN3aXRjaE1hcCxcbiAgdGFrZSxcbiAgdGFwLFxuICB3aXRoTGF0ZXN0RnJvbSxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgR2xvYmFsTWVzc2FnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9nbG9iYWwtbWVzc2FnZS9mYWNhZGUvZ2xvYmFsLW1lc3NhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBHbG9iYWxNZXNzYWdlVHlwZSB9IGZyb20gJy4uLy4uLy4uL2dsb2JhbC1tZXNzYWdlL21vZGVscy9nbG9iYWwtbWVzc2FnZS5tb2RlbCc7XG5pbXBvcnQgeyBPY2NFbmRwb2ludHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vb2NjL3NlcnZpY2VzL29jYy1lbmRwb2ludHMuc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0aW5nU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3JvdXRpbmcvZmFjYWRlL3JvdXRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL2ZhY2FkZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFRva2VuIH0gZnJvbSAnLi4vbW9kZWxzL2F1dGgtdG9rZW4ubW9kZWwnO1xuaW1wb3J0IHsgQXV0aFJlZGlyZWN0U2VydmljZSB9IGZyb20gJy4vYXV0aC1yZWRpcmVjdC5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vYXV0aC1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgT0F1dGhMaWJXcmFwcGVyU2VydmljZSB9IGZyb20gJy4vb2F1dGgtbGliLXdyYXBwZXIuc2VydmljZSc7XG5cbi8qKlxuICogRXh0ZW5kYWJsZSBzZXJ2aWNlIGZvciBgQXV0aEludGVyY2VwdG9yYC5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEF1dGhIdHRwSGVhZGVyU2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBTdGFydHMgdGhlIHJlZnJlc2ggb2YgdGhlIGFjY2VzcyB0b2tlblxuICAgKi9cbiAgcHJvdGVjdGVkIHJlZnJlc2hUb2tlblRyaWdnZXIkID0gbmV3IFN1YmplY3Q8QXV0aFRva2VuPigpO1xuXG4gIC8qKlxuICAgKiBJbnRlcm5hbCB0b2tlbiBzdHJlYW1zIHdoaWNoIHJlYWRzIHRoZSBsYXRlc3QgZnJvbSB0aGUgc3RvcmFnZS5cbiAgICogRW1pdHMgdGhlIHRva2VuIG9yIGB1bmRlZmluZWRgXG4gICAqL1xuICBwcm90ZWN0ZWQgdG9rZW4kOiBPYnNlcnZhYmxlPEF1dGhUb2tlbiB8IHVuZGVmaW5lZD4gPSB0aGlzLmF1dGhTdG9yYWdlU2VydmljZVxuICAgIC5nZXRUb2tlbigpXG4gICAgLnBpcGUobWFwKCh0b2tlbikgPT4gKHRva2VuPy5hY2Nlc3NfdG9rZW4gPyB0b2tlbiA6IHVuZGVmaW5lZCkpKTtcblxuICAvKipcbiAgICogQ29tcGFyZXMgdGhlIHByZXZpb3VzIGFuZCB0aGUgbmV3IHRva2VuIGluIG9yZGVyIHRvIHN0b3AgdGhlIHJlZnJlc2ggb3IgbG9nb3V0IHByb2Nlc3Nlc1xuICAgKi9cbiAgcHJvdGVjdGVkIHN0b3BQcm9ncmVzcyQgPSB0aGlzLnRva2VuJC5waXBlKFxuICAgIC8vIEtlZXBzIHRoZSBwcmV2aW91cyBhbmQgdGhlIG5ldyB0b2tlblxuICAgIHBhaXJ3aXNlKCksXG4gICAgdGFwKChbb2xkVG9rZW4sIG5ld1Rva2VuXSkgPT4ge1xuICAgICAgLy8gaWYgd2UgZ290IHRoZSBuZXcgdG9rZW4gd2Uga25vdyB0aGF0IGVpdGhlciB0aGUgcmVmcmVzaCBvciBsb2dvdXQgZmluaXNoZWRcbiAgICAgIGlmIChvbGRUb2tlbj8uYWNjZXNzX3Rva2VuICE9PSBuZXdUb2tlbj8uYWNjZXNzX3Rva2VuKSB7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uuc2V0TG9nb3V0UHJvZ3Jlc3MoZmFsc2UpO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnNldFJlZnJlc2hQcm9ncmVzcyhmYWxzZSk7XG4gICAgICB9XG4gICAgfSlcbiAgKTtcblxuICAvKipcbiAgICogUmVmcmVzaGVzIHRoZSB0b2tlbiBvbmx5IGlmIGN1cnJlbnRseSB0aGVyZSdzIG5vIHJlZnJlc2ggbm9yIGxvZ291dCBpbiBwcm9ncmVzcy5cbiAgICogSWYgdGhlIHJlZnJlc2ggdG9rZW4gaXMgbm90IHByZXNlbnQsIGl0IHRyaWdnZXJzIHRoZSBsb2dvdXQgcHJvY2Vzc1xuICAgKi9cbiAgcHJvdGVjdGVkIHJlZnJlc2hUb2tlbiQgPSB0aGlzLnJlZnJlc2hUb2tlblRyaWdnZXIkLnBpcGUoXG4gICAgd2l0aExhdGVzdEZyb20oXG4gICAgICB0aGlzLmF1dGhTZXJ2aWNlLnJlZnJlc2hJblByb2dyZXNzJCxcbiAgICAgIHRoaXMuYXV0aFNlcnZpY2UubG9nb3V0SW5Qcm9ncmVzcyRcbiAgICApLFxuICAgIGZpbHRlcihcbiAgICAgIChbLCByZWZyZXNoSW5Qcm9ncmVzcywgbG9nb3V0SW5Qcm9ncmVzc10pID0+XG4gICAgICAgICFyZWZyZXNoSW5Qcm9ncmVzcyAmJiAhbG9nb3V0SW5Qcm9ncmVzc1xuICAgICksXG4gICAgdGFwKChbdG9rZW5dKSA9PiB7XG4gICAgICBpZiAodG9rZW4/LnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgICAgdGhpcy5vQXV0aExpYldyYXBwZXJTZXJ2aWNlLnJlZnJlc2hUb2tlbigpO1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLnNldFJlZnJlc2hQcm9ncmVzcyh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaGFuZGxlRXhwaXJlZFJlZnJlc2hUb2tlbigpO1xuICAgICAgfVxuICAgIH0pXG4gICk7XG5cbiAgLyoqXG4gICAqIEtpY2tzIG9mIHRoZSBwcm9jZXNzIGJ5IGxpc3RlbmluZyB0byB0aGUgbmV3IHRva2VuIGFuZCByZWZyZXNoIHRva2VuIHByb2Nlc3Nlcy5cbiAgICogVGhpcyB0b2tlbiBzaG91bGQgYmUgdXNlZCB3aGVuIHJldHJ5aW5nIHRoZSBmYWlsZWQgaHR0cCByZXF1ZXN0LlxuICAgKi9cbiAgcHJvdGVjdGVkIHRva2VuVG9SZXRyeVJlcXVlc3QkID0gdXNpbmcoXG4gICAgKCkgPT4gdGhpcy5yZWZyZXNoVG9rZW4kLnN1YnNjcmliZSgpLFxuICAgICgpID0+IHRoaXMuZ2V0U3RhYmxlVG9rZW4oKVxuICApLnBpcGUoc2hhcmVSZXBsYXkoeyByZWZDb3VudDogdHJ1ZSwgYnVmZmVyU2l6ZTogMSB9KSk7XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbnMgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFN0b3JhZ2VTZXJ2aWNlOiBBdXRoU3RvcmFnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIG9BdXRoTGliV3JhcHBlclNlcnZpY2U6IE9BdXRoTGliV3JhcHBlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF1dGhSZWRpcmVjdFNlcnZpY2U6IEF1dGhSZWRpcmVjdFNlcnZpY2VcbiAgKSB7XG4gICAgLy8gV2UgbmVlZCB0byBoYXZlIHN0b3BQcm9ncmVzcyQgc3RyZWFtIGFjdGl2ZSBmb3IgdGhlIHdob2xlIHRpbWUsXG4gICAgLy8gc28gd2hlbiB0aGUgbG9nb3V0IGZpbmlzaGVzIHdlIGZpbmlzaCBpdCdzIHByb2Nlc3MuXG4gICAgLy8gSXQgY291bGQgaGFwcGVuIHdoZW4gcmV0cnlUb2tlbiQgaXMgbm90IGFjdGl2ZS5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKHRoaXMuc3RvcFByb2dyZXNzJC5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHJlcXVlc3Qgc2hvdWxkIGJlIGhhbmRsZWQgYnkgdGhpcyBzZXJ2aWNlIChpZiBpdCdzIE9DQyBjYWxsKS5cbiAgICovXG4gIHB1YmxpYyBzaG91bGRDYXRjaEVycm9yKHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc09jY1VybChyZXF1ZXN0LnVybCk7XG4gIH1cblxuICBwdWJsaWMgc2hvdWxkQWRkQXV0aG9yaXphdGlvbkhlYWRlcihyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogYm9vbGVhbiB7XG4gICAgY29uc3QgaGFzQXV0aG9yaXphdGlvbkhlYWRlciA9ICEhdGhpcy5nZXRBdXRob3JpemF0aW9uSGVhZGVyKHJlcXVlc3QpO1xuICAgIGNvbnN0IGlzT2NjVXJsID0gdGhpcy5pc09jY1VybChyZXF1ZXN0LnVybCk7XG4gICAgcmV0dXJuICFoYXNBdXRob3JpemF0aW9uSGVhZGVyICYmIGlzT2NjVXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYEF1dGhvcml6YXRpb25gIGhlYWRlciBmb3IgT0NDIGNhbGxzLlxuICAgKi9cbiAgcHVibGljIGFsdGVyUmVxdWVzdChcbiAgICByZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+LFxuICAgIHRva2VuPzogQXV0aFRva2VuXG4gICk6IEh0dHBSZXF1ZXN0PGFueT4ge1xuICAgIGNvbnN0IGhhc0F1dGhvcml6YXRpb25IZWFkZXIgPSAhIXRoaXMuZ2V0QXV0aG9yaXphdGlvbkhlYWRlcihyZXF1ZXN0KTtcbiAgICBjb25zdCBpc0Jhc2VTaXRlc1JlcXVlc3QgPSB0aGlzLmlzQmFzZVNpdGVzUmVxdWVzdChyZXF1ZXN0KTtcbiAgICBjb25zdCBpc09jY1VybCA9IHRoaXMuaXNPY2NVcmwocmVxdWVzdC51cmwpO1xuICAgIGlmICghaGFzQXV0aG9yaXphdGlvbkhlYWRlciAmJiBpc09jY1VybCAmJiAhaXNCYXNlU2l0ZXNSZXF1ZXN0KSB7XG4gICAgICByZXR1cm4gcmVxdWVzdC5jbG9uZSh7XG4gICAgICAgIHNldEhlYWRlcnM6IHtcbiAgICAgICAgICAuLi50aGlzLmNyZWF0ZUF1dGhvcml6YXRpb25IZWFkZXIodG9rZW4pLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzT2NjVXJsKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHVybC5pbmNsdWRlcyh0aGlzLm9jY0VuZHBvaW50cy5nZXRCYXNlVXJsKCkpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzQmFzZVNpdGVzUmVxdWVzdChyZXF1ZXN0OiBIdHRwUmVxdWVzdDxhbnk+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJlcXVlc3QudXJsLmluY2x1ZGVzKFxuICAgICAgdGhpcy5vY2NFbmRwb2ludHMuZ2V0UmF3RW5kcG9pbnRWYWx1ZSgnYmFzZVNpdGVzJylcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEF1dGhvcml6YXRpb25IZWFkZXIocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55Pik6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IHJhd1ZhbHVlID0gcmVxdWVzdC5oZWFkZXJzLmdldCgnQXV0aG9yaXphdGlvbicpO1xuICAgIHJldHVybiByYXdWYWx1ZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjcmVhdGVBdXRob3JpemF0aW9uSGVhZGVyKFxuICAgIHRva2VuPzogQXV0aFRva2VuXG4gICk6IHsgQXV0aG9yaXphdGlvbjogc3RyaW5nIH0gfCB7fSB7XG4gICAgaWYgKHRva2VuPy5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGAke3Rva2VuLnRva2VuX3R5cGUgfHwgJ0JlYXJlcid9ICR7dG9rZW4uYWNjZXNzX3Rva2VufWAsXG4gICAgICB9O1xuICAgIH1cbiAgICBsZXQgY3VycmVudFRva2VuOiBBdXRoVG9rZW4gfCB1bmRlZmluZWQ7XG4gICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2VcbiAgICAgIC5nZXRUb2tlbigpXG4gICAgICAuc3Vic2NyaWJlKChhdXRoVG9rZW4pID0+IChjdXJyZW50VG9rZW4gPSBhdXRoVG9rZW4pKVxuICAgICAgLnVuc3Vic2NyaWJlKCk7XG5cbiAgICBpZiAoY3VycmVudFRva2VuPy5hY2Nlc3NfdG9rZW4pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246IGAke2N1cnJlbnRUb2tlbi50b2tlbl90eXBlIHx8ICdCZWFyZXInfSAke1xuICAgICAgICAgIGN1cnJlbnRUb2tlbi5hY2Nlc3NfdG9rZW5cbiAgICAgICAgfWAsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICAvKipcbiAgICogUmVmcmVzaGVzIGFjY2Vzc190b2tlbiBhbmQgdGhlbiByZXRyaWVzIHRoZSBjYWxsIHdpdGggdGhlIG5ldyB0b2tlbi5cbiAgICovXG4gIHB1YmxpYyBoYW5kbGVFeHBpcmVkQWNjZXNzVG9rZW4oXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICBuZXh0OiBIdHRwSGFuZGxlcixcbiAgICBpbml0aWFsVG9rZW46IEF1dGhUb2tlbiB8IHVuZGVmaW5lZFxuICApOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxBdXRoVG9rZW4+PiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VmFsaWRUb2tlbihpbml0aWFsVG9rZW4pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKHRva2VuKSA9PlxuICAgICAgICAvLyB3ZSBicmVhayB0aGUgc3RyZWFtIHdpdGggRU1QVFkgd2hlbiB3ZSBkb24ndCBoYXZlIHRoZSB0b2tlbi4gVGhpcyBwcmV2ZW50cyBzZW5kaW5nIHRoZSByZXF1ZXN0cyB3aXRoIGBBdXRob3JpemF0aW9uOiBiZWFyZXIgdW5kZWZpbmVkYCBoZWFkZXJcbiAgICAgICAgdG9rZW5cbiAgICAgICAgICA/IG5leHQuaGFuZGxlKHRoaXMuY3JlYXRlTmV3UmVxdWVzdFdpdGhOZXdUb2tlbihyZXF1ZXN0LCB0b2tlbikpXG4gICAgICAgICAgOiBFTVBUWVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTG9nb3V0IHVzZXIsIHJlZGlyZWN0ZWQgdG8gbG9naW4gcGFnZSBhbmQgaW5mb3JtcyBhYm91dCBleHBpcmVkIHNlc3Npb24uXG4gICAqL1xuICBwdWJsaWMgaGFuZGxlRXhwaXJlZFJlZnJlc2hUb2tlbigpOiB2b2lkIHtcbiAgICAvLyBUaGVyZSBtaWdodCBiZSAyIGNhc2VzOlxuICAgIC8vIDEuIHdoZW4gdXNlciBpcyBhbHJlYWR5IG9uIHNvbWUgcGFnZSAocm91dGVyIGlzIHN0YWJsZSkgYW5kIHBlcmZvcm1zIGFuIFVJIGFjdGlvblxuICAgIC8vIHRoYXQgdHJpZ2dlcnMgaHR0cCBjYWxsIChpLmUuIGJ1dHRvbiBjbGljayB0byBzYXZlIGRhdGEgaW4gYmFja2VuZClcbiAgICAvLyAyLiB3aGVuIHVzZXIgaXMgbmF2aWdhdGluZyB0byBzb21lIHBhZ2UgYW5kIGEgcm91dGUgZ3VhcmQgdHJpZ2dlcnMgdGhlIGh0dHAgY2FsbFxuICAgIC8vIChpLmUuIGd1YXJkIGxvYWRpbmcgY21zIHBhZ2UgZGF0YSlcbiAgICAvL1xuICAgIC8vIEluIHRoZSBzZWNvbmQgY2FzZSwgd2Ugd2FudCB0byByZW1lbWJlciB0aGUgYW50aWNpcGF0ZWQgdXJsIGJlZm9yZSB3ZSBuYXZpZ2F0ZSB0b1xuICAgIC8vIHRoZSBsb2dpbiBwYWdlLCBzbyB3ZSBjYW4gcmVkaXJlY3QgYmFjayB0byB0aGF0IFVSTCBhZnRlciB1c2VyIGF1dGhlbnRpY2F0ZXMuXG4gICAgdGhpcy5hdXRoUmVkaXJlY3RTZXJ2aWNlLnNhdmVDdXJyZW50TmF2aWdhdGlvblVybCgpO1xuXG4gICAgLy8gTG9nb3V0IHVzZXJcbiAgICAvLyBUT0RPKCM5NjM4KTogVXNlIGxvZ291dCByb3V0ZSB3aGVuIGl0IHdpbGwgc3VwcG9ydCBwYXNzaW5nIHJlZGlyZWN0IHVybFxuICAgIHRoaXMuYXV0aFNlcnZpY2UuY29yZUxvZ291dCgpLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgdGhpcy5yb3V0aW5nU2VydmljZS5nbyh7IGN4Um91dGU6ICdsb2dpbicgfSk7XG5cbiAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICB7XG4gICAgICAgICAga2V5OiAnaHR0cEhhbmRsZXJzLnNlc3Npb25FeHBpcmVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdHMgdGhlIHRva2VuIG9yIGB1bmRlZmluZWRgIG9ubHkgd2hlbiB0aGUgcmVmcmVzaCBvciB0aGUgbG9nb3V0IHByb2Nlc3NlcyBhcmUgZmluaXNoZWQuXG4gICAqL1xuICBnZXRTdGFibGVUb2tlbigpOiBPYnNlcnZhYmxlPEF1dGhUb2tlbiB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMudG9rZW4kLFxuICAgICAgdGhpcy5hdXRoU2VydmljZS5yZWZyZXNoSW5Qcm9ncmVzcyQsXG4gICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dEluUHJvZ3Jlc3MkLFxuICAgIF0pLnBpcGUoXG4gICAgICBvYnNlcnZlT24ocXVldWVTY2hlZHVsZXIpLFxuICAgICAgZmlsdGVyKFxuICAgICAgICAoW18sIHJlZnJlc2hJblByb2dyZXNzLCBsb2dvdXRJblByb2dyZXNzXSkgPT5cbiAgICAgICAgICAhcmVmcmVzaEluUHJvZ3Jlc3MgJiYgIWxvZ291dEluUHJvZ3Jlc3NcbiAgICAgICksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy50b2tlbiQpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgdmFsaWQgYWNjZXNzIHRva2VuLlxuICAgKiBJdCB3aWxsIGF0dGVtcHQgdG8gcmVmcmVzaCBpdCBpZiB0aGUgY3VycmVudCBvbmUgZXhwaXJlZDsgZW1pdHMgYWZ0ZXIgdGhlIG5ldyBvbmUgaXMgcmV0cmlldmVkLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFZhbGlkVG9rZW4oXG4gICAgcmVxdWVzdFRva2VuOiBBdXRoVG9rZW4gfCB1bmRlZmluZWRcbiAgKTogT2JzZXJ2YWJsZTxBdXRoVG9rZW4gfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gZGVmZXIoKCkgPT4ge1xuICAgICAgLy8gZmxhZyB0byBvbmx5IHJlZnJlc2ggdG9rZW4gb25seSBvbiBmaXJzdCBlbWlzc2lvblxuICAgICAgbGV0IHJlZnJlc2hUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0aGlzLnRva2VuVG9SZXRyeVJlcXVlc3QkLnBpcGUoXG4gICAgICAgIHRhcCgodG9rZW4pID0+IHtcbiAgICAgICAgICAvLyB3ZSB3YW50IHRvIHJlZnJlc2ggdGhlIGFjY2VzcyB0b2tlbiBvbmx5IHdoZW4gaXQgaXMgb2xkLlxuICAgICAgICAgIC8vIHRoaXMgaXMgYSBndWFyZCBmb3IgdGhlIGNhc2Ugd2hlbiB0aGVyZSBhcmUgbXVsdGlwbGUgcGFyYWxsZWwgaHR0cCBjYWxsc1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRva2VuPy5hY2Nlc3NfdG9rZW4gPT09IHJlcXVlc3RUb2tlbj8uYWNjZXNzX3Rva2VuICYmXG4gICAgICAgICAgICAhcmVmcmVzaFRyaWdnZXJlZFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoVG9rZW5UcmlnZ2VyJC5uZXh0KHRva2VuKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVmcmVzaFRyaWdnZXJlZCA9IHRydWU7XG4gICAgICAgIH0pLFxuICAgICAgICBza2lwV2hpbGUoXG4gICAgICAgICAgKHRva2VuKSA9PiB0b2tlbj8uYWNjZXNzX3Rva2VuID09PSByZXF1ZXN0VG9rZW4/LmFjY2Vzc190b2tlblxuICAgICAgICApLFxuICAgICAgICB0YWtlKDEpXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZU5ld1JlcXVlc3RXaXRoTmV3VG9rZW4oXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PixcbiAgICB0b2tlbjogQXV0aFRva2VuXG4gICk6IEh0dHBSZXF1ZXN0PGFueT4ge1xuICAgIHJlcXVlc3QgPSByZXF1ZXN0LmNsb25lKHtcbiAgICAgIHNldEhlYWRlcnM6IHtcbiAgICAgICAgQXV0aG9yaXphdGlvbjogYCR7dG9rZW4udG9rZW5fdHlwZSB8fCAnQmVhcmVyJ30gJHt0b2tlbi5hY2Nlc3NfdG9rZW59YCxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19