/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpErrorResponse, HttpEventType, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NEVER, of, TimeoutError } from 'rxjs';
import { catchError, startWith, switchMap, timeout } from 'rxjs/operators';
import { HTTP_TIMEOUT_CONFIG } from './http-timeout.config';
import * as i0 from "@angular/core";
import * as i1 from "../../window/window-ref";
import * as i2 from "../../occ/config/occ-config";
/**
 * It throws an error when a request takes longer than the specified time.
 */
export class HttpTimeoutInterceptor {
    constructor(windowRef, config) {
        this.windowRef = windowRef;
        this.config = config;
    }
    /**
     * It throws an error when a request takes longer than the specified time.
     *
     * It starts counting time for timeout only after the request is sent.
     */
    intercept(request, next) {
        const timeoutValue = this.getTimeoutValue(request);
        if (typeof timeoutValue === 'undefined') {
            return next.handle(request);
        }
        return next.handle(request).pipe(switchMap((event) => {
            // When event `HttpEventType.Sent` happens, let's start counting time for timeout.
            // But when event `HttpEventType.Response` is received, `switchMap` will unsubscribe from the following timeout observable.
            if (event.type === HttpEventType.Sent) {
                return NEVER.pipe(startWith(event), timeout(timeoutValue));
            }
            return of(event);
        }), catchError((error) => {
            throw this.convertTimeoutToHttpErrorResponse({
                error,
                request,
                timeoutValue,
            });
        }));
    }
    /**
     * Returns the configured timeout value for the given request.
     *
     * The timeout can be configured specifically for a certain request
     * via HttpContextToken `HTTP_TIMEOUT_CONFIG`. When it's not available,
     * the value is taken from the global config `config.backend.timeout`.
     *
     * Depending on the platform (browser or server), the configured timeout value can be different.
     */
    getTimeoutValue(request) {
        const localTimeoutConfig = request.context.get(HTTP_TIMEOUT_CONFIG);
        const globalTimeoutConfig = this.config?.backend?.timeout;
        const timeoutConfig = localTimeoutConfig ?? globalTimeoutConfig ?? {};
        return this.windowRef.isBrowser()
            ? timeoutConfig?.browser
            : timeoutConfig?.server;
    }
    /**
     * It converts an RxJs `TimeoutError` (caused by the `timeout()` operator),
     * to a manually crafted `HttpErrorResponse` object.
     *
     * If the error is not an RxJs `TimeoutError`, it just returns the original error.
     */
    convertTimeoutToHttpErrorResponse({ error, request, timeoutValue, }) {
        if (error instanceof TimeoutError) {
            // create a new Error here, to record the current stacktrace (which is not present in RxJs TimeoutError)
            const cxHttpTimeoutError = this.buildError(request, timeoutValue);
            return new HttpErrorResponse({
                url: request.url,
                error: cxHttpTimeoutError,
            });
        }
        return error;
    }
    buildError(request, timeoutValue) {
        const message = `Request to URL '${request.url}' exceeded expected time of ${timeoutValue}ms and was aborted.`;
        // If an HTTP call times out, it is considered an unexpected error.
        // To assist with troubleshooting, the error is logged to the console.
        console.warn(message);
        return new Error(message);
    }
}
HttpTimeoutInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: HttpTimeoutInterceptor, deps: [{ token: i1.WindowRef }, { token: i2.OccConfig }], target: i0.ɵɵFactoryTarget.Injectable });
HttpTimeoutInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: HttpTimeoutInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: HttpTimeoutInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }, { type: i2.OccConfig }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC10aW1lb3V0LmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvaHR0cC9odHRwLXRpbWVvdXQvaHR0cC10aW1lb3V0LmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsaUJBQWlCLEVBRWpCLGFBQWEsR0FJZCxNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLEtBQUssRUFBYyxFQUFFLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQUU1RDs7R0FFRztBQUVILE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFBc0IsU0FBb0IsRUFBWSxNQUFpQjtRQUFqRCxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBVztJQUFHLENBQUM7SUFFM0U7Ozs7T0FJRztJQUNILFNBQVMsQ0FDUCxPQUE2QixFQUM3QixJQUFpQjtRQUVqQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELElBQUksT0FBTyxZQUFZLEtBQUssV0FBVyxFQUFFO1lBQ3ZDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3QjtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQzlCLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2xCLGtGQUFrRjtZQUNsRiwySEFBMkg7WUFDM0gsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLGFBQWEsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3JDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7YUFDNUQ7WUFDRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsRUFDRixVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQixNQUFNLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQztnQkFDM0MsS0FBSztnQkFDTCxPQUFPO2dCQUNQLFlBQVk7YUFDYixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7OztPQVFHO0lBQ08sZUFBZSxDQUFDLE9BQTZCO1FBQ3JELE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNwRSxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQztRQUMxRCxNQUFNLGFBQWEsR0FBRyxrQkFBa0IsSUFBSSxtQkFBbUIsSUFBSSxFQUFFLENBQUM7UUFDdEUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRTtZQUMvQixDQUFDLENBQUMsYUFBYSxFQUFFLE9BQU87WUFDeEIsQ0FBQyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ08saUNBQWlDLENBQUMsRUFDMUMsS0FBSyxFQUNMLE9BQU8sRUFDUCxZQUFZLEdBS2I7UUFDQyxJQUFJLEtBQUssWUFBWSxZQUFZLEVBQUU7WUFDakMsd0dBQXdHO1lBQ3hHLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFbEUsT0FBTyxJQUFJLGlCQUFpQixDQUFDO2dCQUMzQixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7Z0JBQ2hCLEtBQUssRUFBRSxrQkFBa0I7YUFDMUIsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFUyxVQUFVLENBQ2xCLE9BQTZCLEVBQzdCLFlBQW9CO1FBRXBCLE1BQU0sT0FBTyxHQUFHLG1CQUFtQixPQUFPLENBQUMsR0FBRywrQkFBK0IsWUFBWSxxQkFBcUIsQ0FBQztRQUUvRyxtRUFBbUU7UUFDbkUsc0VBQXNFO1FBQ3RFLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFdEIsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM1QixDQUFDOzttSEE1RlUsc0JBQXNCO3VIQUF0QixzQkFBc0IsY0FEVCxNQUFNOzJGQUNuQixzQkFBc0I7a0JBRGxDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgSHR0cEVycm9yUmVzcG9uc2UsXG4gIEh0dHBFdmVudCxcbiAgSHR0cEV2ZW50VHlwZSxcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cFJlcXVlc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5FVkVSLCBPYnNlcnZhYmxlLCBvZiwgVGltZW91dEVycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGltZW91dCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9jY0NvbmZpZyB9IGZyb20gJy4uLy4uL29jYy9jb25maWcvb2NjLWNvbmZpZyc7XG5pbXBvcnQgeyBXaW5kb3dSZWYgfSBmcm9tICcuLi8uLi93aW5kb3cvd2luZG93LXJlZic7XG5pbXBvcnQgeyBIVFRQX1RJTUVPVVRfQ09ORklHIH0gZnJvbSAnLi9odHRwLXRpbWVvdXQuY29uZmlnJztcblxuLyoqXG4gKiBJdCB0aHJvd3MgYW4gZXJyb3Igd2hlbiBhIHJlcXVlc3QgdGFrZXMgbG9uZ2VyIHRoYW4gdGhlIHNwZWNpZmllZCB0aW1lLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEh0dHBUaW1lb3V0SW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgd2luZG93UmVmOiBXaW5kb3dSZWYsIHByb3RlY3RlZCBjb25maWc6IE9jY0NvbmZpZykge31cblxuICAvKipcbiAgICogSXQgdGhyb3dzIGFuIGVycm9yIHdoZW4gYSByZXF1ZXN0IHRha2VzIGxvbmdlciB0aGFuIHRoZSBzcGVjaWZpZWQgdGltZS5cbiAgICpcbiAgICogSXQgc3RhcnRzIGNvdW50aW5nIHRpbWUgZm9yIHRpbWVvdXQgb25seSBhZnRlciB0aGUgcmVxdWVzdCBpcyBzZW50LlxuICAgKi9cbiAgaW50ZXJjZXB0KFxuICAgIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PHVua25vd24+LFxuICAgIG5leHQ6IEh0dHBIYW5kbGVyXG4gICk6IE9ic2VydmFibGU8SHR0cEV2ZW50PHVua25vd24+PiB7XG4gICAgY29uc3QgdGltZW91dFZhbHVlID0gdGhpcy5nZXRUaW1lb3V0VmFsdWUocmVxdWVzdCk7XG4gICAgaWYgKHR5cGVvZiB0aW1lb3V0VmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGV2ZW50KSA9PiB7XG4gICAgICAgIC8vIFdoZW4gZXZlbnQgYEh0dHBFdmVudFR5cGUuU2VudGAgaGFwcGVucywgbGV0J3Mgc3RhcnQgY291bnRpbmcgdGltZSBmb3IgdGltZW91dC5cbiAgICAgICAgLy8gQnV0IHdoZW4gZXZlbnQgYEh0dHBFdmVudFR5cGUuUmVzcG9uc2VgIGlzIHJlY2VpdmVkLCBgc3dpdGNoTWFwYCB3aWxsIHVuc3Vic2NyaWJlIGZyb20gdGhlIGZvbGxvd2luZyB0aW1lb3V0IG9ic2VydmFibGUuXG4gICAgICAgIGlmIChldmVudC50eXBlID09PSBIdHRwRXZlbnRUeXBlLlNlbnQpIHtcbiAgICAgICAgICByZXR1cm4gTkVWRVIucGlwZShzdGFydFdpdGgoZXZlbnQpLCB0aW1lb3V0KHRpbWVvdXRWYWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvZihldmVudCk7XG4gICAgICB9KSxcbiAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB7XG4gICAgICAgIHRocm93IHRoaXMuY29udmVydFRpbWVvdXRUb0h0dHBFcnJvclJlc3BvbnNlKHtcbiAgICAgICAgICBlcnJvcixcbiAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICAgIHRpbWVvdXRWYWx1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY29uZmlndXJlZCB0aW1lb3V0IHZhbHVlIGZvciB0aGUgZ2l2ZW4gcmVxdWVzdC5cbiAgICpcbiAgICogVGhlIHRpbWVvdXQgY2FuIGJlIGNvbmZpZ3VyZWQgc3BlY2lmaWNhbGx5IGZvciBhIGNlcnRhaW4gcmVxdWVzdFxuICAgKiB2aWEgSHR0cENvbnRleHRUb2tlbiBgSFRUUF9USU1FT1VUX0NPTkZJR2AuIFdoZW4gaXQncyBub3QgYXZhaWxhYmxlLFxuICAgKiB0aGUgdmFsdWUgaXMgdGFrZW4gZnJvbSB0aGUgZ2xvYmFsIGNvbmZpZyBgY29uZmlnLmJhY2tlbmQudGltZW91dGAuXG4gICAqXG4gICAqIERlcGVuZGluZyBvbiB0aGUgcGxhdGZvcm0gKGJyb3dzZXIgb3Igc2VydmVyKSwgdGhlIGNvbmZpZ3VyZWQgdGltZW91dCB2YWx1ZSBjYW4gYmUgZGlmZmVyZW50LlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFRpbWVvdXRWYWx1ZShyZXF1ZXN0OiBIdHRwUmVxdWVzdDx1bmtub3duPik6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgbG9jYWxUaW1lb3V0Q29uZmlnID0gcmVxdWVzdC5jb250ZXh0LmdldChIVFRQX1RJTUVPVVRfQ09ORklHKTtcbiAgICBjb25zdCBnbG9iYWxUaW1lb3V0Q29uZmlnID0gdGhpcy5jb25maWc/LmJhY2tlbmQ/LnRpbWVvdXQ7XG4gICAgY29uc3QgdGltZW91dENvbmZpZyA9IGxvY2FsVGltZW91dENvbmZpZyA/PyBnbG9iYWxUaW1lb3V0Q29uZmlnID8/IHt9O1xuICAgIHJldHVybiB0aGlzLndpbmRvd1JlZi5pc0Jyb3dzZXIoKVxuICAgICAgPyB0aW1lb3V0Q29uZmlnPy5icm93c2VyXG4gICAgICA6IHRpbWVvdXRDb25maWc/LnNlcnZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdCBjb252ZXJ0cyBhbiBSeEpzIGBUaW1lb3V0RXJyb3JgIChjYXVzZWQgYnkgdGhlIGB0aW1lb3V0KClgIG9wZXJhdG9yKSxcbiAgICogdG8gYSBtYW51YWxseSBjcmFmdGVkIGBIdHRwRXJyb3JSZXNwb25zZWAgb2JqZWN0LlxuICAgKlxuICAgKiBJZiB0aGUgZXJyb3IgaXMgbm90IGFuIFJ4SnMgYFRpbWVvdXRFcnJvcmAsIGl0IGp1c3QgcmV0dXJucyB0aGUgb3JpZ2luYWwgZXJyb3IuXG4gICAqL1xuICBwcm90ZWN0ZWQgY29udmVydFRpbWVvdXRUb0h0dHBFcnJvclJlc3BvbnNlKHtcbiAgICBlcnJvcixcbiAgICByZXF1ZXN0LFxuICAgIHRpbWVvdXRWYWx1ZSxcbiAgfToge1xuICAgIGVycm9yOiB1bmtub3duO1xuICAgIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PHVua25vd24+O1xuICAgIHRpbWVvdXRWYWx1ZTogbnVtYmVyO1xuICB9KTogdW5rbm93biB8IEh0dHBFcnJvclJlc3BvbnNlIHtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBUaW1lb3V0RXJyb3IpIHtcbiAgICAgIC8vIGNyZWF0ZSBhIG5ldyBFcnJvciBoZXJlLCB0byByZWNvcmQgdGhlIGN1cnJlbnQgc3RhY2t0cmFjZSAod2hpY2ggaXMgbm90IHByZXNlbnQgaW4gUnhKcyBUaW1lb3V0RXJyb3IpXG4gICAgICBjb25zdCBjeEh0dHBUaW1lb3V0RXJyb3IgPSB0aGlzLmJ1aWxkRXJyb3IocmVxdWVzdCwgdGltZW91dFZhbHVlKTtcblxuICAgICAgcmV0dXJuIG5ldyBIdHRwRXJyb3JSZXNwb25zZSh7XG4gICAgICAgIHVybDogcmVxdWVzdC51cmwsXG4gICAgICAgIGVycm9yOiBjeEh0dHBUaW1lb3V0RXJyb3IsXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGVycm9yO1xuICB9XG5cbiAgcHJvdGVjdGVkIGJ1aWxkRXJyb3IoXG4gICAgcmVxdWVzdDogSHR0cFJlcXVlc3Q8dW5rbm93bj4sXG4gICAgdGltZW91dFZhbHVlOiBudW1iZXJcbiAgKTogRXJyb3Ige1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBgUmVxdWVzdCB0byBVUkwgJyR7cmVxdWVzdC51cmx9JyBleGNlZWRlZCBleHBlY3RlZCB0aW1lIG9mICR7dGltZW91dFZhbHVlfW1zIGFuZCB3YXMgYWJvcnRlZC5gO1xuXG4gICAgLy8gSWYgYW4gSFRUUCBjYWxsIHRpbWVzIG91dCwgaXQgaXMgY29uc2lkZXJlZCBhbiB1bmV4cGVjdGVkIGVycm9yLlxuICAgIC8vIFRvIGFzc2lzdCB3aXRoIHRyb3VibGVzaG9vdGluZywgdGhlIGVycm9yIGlzIGxvZ2dlZCB0byB0aGUgY29uc29sZS5cbiAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG5cbiAgICByZXR1cm4gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICB9XG59XG4iXX0=