import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/auth-http-header.service";
import * as i2 from "../services/auth-config.service";
/**
 * Responsible for catching auth errors and providing `Authorization` header for API calls.
 * Uses AuthHttpHeaderService for request manipulation and error handling. Interceptor only hooks into request send/received events.
 */
export class AuthInterceptor {
    constructor(authHttpHeaderService, authConfigService) {
        this.authHttpHeaderService = authHttpHeaderService;
        this.authConfigService = authConfigService;
    }
    intercept(httpRequest, next) {
        const shouldCatchError = this.authHttpHeaderService.shouldCatchError(httpRequest);
        const shouldAddAuthorizationHeader = this.authHttpHeaderService.shouldAddAuthorizationHeader(httpRequest);
        const token$ = shouldAddAuthorizationHeader
            ? // emits sync, unless there is refresh or logout in progress, in which case it emits async
                this.authHttpHeaderService.getStableToken().pipe(take(1))
            : of(undefined);
        const requestAndToken$ = token$.pipe(map((token) => ({
            token,
            request: this.authHttpHeaderService.alterRequest(httpRequest, token),
        })));
        return requestAndToken$.pipe(switchMap(({ request, token }) => next.handle(request).pipe(catchError((errResponse) => {
            switch (errResponse.status) {
                case 401: // Unauthorized
                    if (this.isExpiredToken(errResponse) && shouldCatchError) {
                        // request failed because of the expired access token
                        // we should get refresh the token and retry the request, or logout if the refresh is missing / expired
                        return this.authHttpHeaderService.handleExpiredAccessToken(request, next, token);
                    }
                    else if (
                    // Refresh the expired token
                    // Check if the OAuth endpoint was called and the error is because the refresh token expired
                    this.errorIsInvalidToken(errResponse)) {
                        this.authHttpHeaderService.handleExpiredRefreshToken();
                        return of();
                    }
                    break;
                case 400: // Bad Request
                    if (this.errorIsInvalidGrant(errResponse) &&
                        request.body.get('grant_type') === 'refresh_token') {
                        this.authHttpHeaderService.handleExpiredRefreshToken();
                    }
                    break;
            }
            return throwError(errResponse);
        }))));
    }
    errorIsInvalidToken(errResponse) {
        return ((errResponse.url?.includes(this.authConfigService.getTokenEndpoint()) &&
            errResponse.error.error === 'invalid_token') ??
            false);
    }
    errorIsInvalidGrant(errResponse) {
        return ((errResponse.url?.includes(this.authConfigService.getTokenEndpoint()) &&
            errResponse.error.error === 'invalid_grant') ??
            false);
    }
    isExpiredToken(resp) {
        return resp.error?.errors?.[0]?.type === 'InvalidTokenError';
    }
}
AuthInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AuthInterceptor, deps: [{ token: i1.AuthHttpHeaderService }, { token: i2.AuthConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AuthInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AuthInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.AuthHttpHeaderService }, { type: i2.AuthConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2F1dGgvdXNlci1hdXRoL2h0dHAtaW50ZXJjZXB0b3JzL2F1dGguaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsRUFBRSxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFJbEU7OztHQUdHO0FBRUgsTUFBTSxPQUFPLGVBQWU7SUFDMUIsWUFDWSxxQkFBNEMsRUFDNUMsaUJBQW9DO1FBRHBDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUM3QyxDQUFDO0lBRUosU0FBUyxDQUNQLFdBQTZCLEVBQzdCLElBQWlCO1FBRWpCLE1BQU0sZ0JBQWdCLEdBQ3BCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRCxNQUFNLDRCQUE0QixHQUNoQyxJQUFJLENBQUMscUJBQXFCLENBQUMsNEJBQTRCLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFdkUsTUFBTSxNQUFNLEdBQUcsNEJBQTRCO1lBQ3pDLENBQUMsQ0FBQywwRkFBMEY7Z0JBQzFGLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEIsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUNsQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDZCxLQUFLO1lBQ0wsT0FBTyxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQztTQUNyRSxDQUFDLENBQUMsQ0FDSixDQUFDO1FBRUYsT0FBTyxnQkFBZ0IsQ0FBQyxJQUFJLENBQzFCLFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3ZCLFVBQVUsQ0FBQyxDQUFDLFdBQWdCLEVBQUUsRUFBRTtZQUM5QixRQUFRLFdBQVcsQ0FBQyxNQUFNLEVBQUU7Z0JBQzFCLEtBQUssR0FBRyxFQUFFLGVBQWU7b0JBQ3ZCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxnQkFBZ0IsRUFBRTt3QkFDeEQscURBQXFEO3dCQUNyRCx1R0FBdUc7d0JBQ3ZHLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLHdCQUF3QixDQUN4RCxPQUFPLEVBQ1AsSUFBSSxFQUNKLEtBQUssQ0FDTixDQUFDO3FCQUNIO3lCQUFNO29CQUNMLDRCQUE0QjtvQkFDNUIsNEZBQTRGO29CQUM1RixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLEVBQ3JDO3dCQUNBLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO3dCQUN2RCxPQUFPLEVBQUUsRUFBa0IsQ0FBQztxQkFDN0I7b0JBQ0QsTUFBTTtnQkFDUixLQUFLLEdBQUcsRUFBRSxjQUFjO29CQUN0QixJQUNFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUM7d0JBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLGVBQWUsRUFDbEQ7d0JBQ0EsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHlCQUF5QixFQUFFLENBQUM7cUJBQ3hEO29CQUNELE1BQU07YUFDVDtZQUNELE9BQU8sVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUNILENBQ0YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVTLG1CQUFtQixDQUFDLFdBQThCO1FBQzFELE9BQU8sQ0FDTCxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ25FLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLGVBQWUsQ0FBQztZQUM5QyxLQUFLLENBQ04sQ0FBQztJQUNKLENBQUM7SUFFUyxtQkFBbUIsQ0FBQyxXQUE4QjtRQUMxRCxPQUFPLENBQ0wsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuRSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxlQUFlLENBQUM7WUFDOUMsS0FBSyxDQUNOLENBQUM7SUFDSixDQUFDO0lBRVMsY0FBYyxDQUFDLElBQXVCO1FBQzlDLE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssbUJBQW1CLENBQUM7SUFDL0QsQ0FBQzs7NEdBbkZVLGVBQWU7Z0hBQWYsZUFBZSxjQURGLE1BQU07MkZBQ25CLGVBQWU7a0JBRDNCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgSHR0cEVycm9yUmVzcG9uc2UsXG4gIEh0dHBFdmVudCxcbiAgSHR0cEhhbmRsZXIsXG4gIEh0dHBJbnRlcmNlcHRvcixcbiAgSHR0cFJlcXVlc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEF1dGhDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXV0aC1jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoSHR0cEhlYWRlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hdXRoLWh0dHAtaGVhZGVyLnNlcnZpY2UnO1xuXG4vKipcbiAqIFJlc3BvbnNpYmxlIGZvciBjYXRjaGluZyBhdXRoIGVycm9ycyBhbmQgcHJvdmlkaW5nIGBBdXRob3JpemF0aW9uYCBoZWFkZXIgZm9yIEFQSSBjYWxscy5cbiAqIFVzZXMgQXV0aEh0dHBIZWFkZXJTZXJ2aWNlIGZvciByZXF1ZXN0IG1hbmlwdWxhdGlvbiBhbmQgZXJyb3IgaGFuZGxpbmcuIEludGVyY2VwdG9yIG9ubHkgaG9va3MgaW50byByZXF1ZXN0IHNlbmQvcmVjZWl2ZWQgZXZlbnRzLlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIEF1dGhJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhdXRoSHR0cEhlYWRlclNlcnZpY2U6IEF1dGhIdHRwSGVhZGVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aENvbmZpZ1NlcnZpY2U6IEF1dGhDb25maWdTZXJ2aWNlXG4gICkge31cblxuICBpbnRlcmNlcHQoXG4gICAgaHR0cFJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgbmV4dDogSHR0cEhhbmRsZXJcbiAgKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGNvbnN0IHNob3VsZENhdGNoRXJyb3IgPVxuICAgICAgdGhpcy5hdXRoSHR0cEhlYWRlclNlcnZpY2Uuc2hvdWxkQ2F0Y2hFcnJvcihodHRwUmVxdWVzdCk7XG4gICAgY29uc3Qgc2hvdWxkQWRkQXV0aG9yaXphdGlvbkhlYWRlciA9XG4gICAgICB0aGlzLmF1dGhIdHRwSGVhZGVyU2VydmljZS5zaG91bGRBZGRBdXRob3JpemF0aW9uSGVhZGVyKGh0dHBSZXF1ZXN0KTtcblxuICAgIGNvbnN0IHRva2VuJCA9IHNob3VsZEFkZEF1dGhvcml6YXRpb25IZWFkZXJcbiAgICAgID8gLy8gZW1pdHMgc3luYywgdW5sZXNzIHRoZXJlIGlzIHJlZnJlc2ggb3IgbG9nb3V0IGluIHByb2dyZXNzLCBpbiB3aGljaCBjYXNlIGl0IGVtaXRzIGFzeW5jXG4gICAgICAgIHRoaXMuYXV0aEh0dHBIZWFkZXJTZXJ2aWNlLmdldFN0YWJsZVRva2VuKCkucGlwZSh0YWtlKDEpKVxuICAgICAgOiBvZih1bmRlZmluZWQpO1xuICAgIGNvbnN0IHJlcXVlc3RBbmRUb2tlbiQgPSB0b2tlbiQucGlwZShcbiAgICAgIG1hcCgodG9rZW4pID0+ICh7XG4gICAgICAgIHRva2VuLFxuICAgICAgICByZXF1ZXN0OiB0aGlzLmF1dGhIdHRwSGVhZGVyU2VydmljZS5hbHRlclJlcXVlc3QoaHR0cFJlcXVlc3QsIHRva2VuKSxcbiAgICAgIH0pKVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVxdWVzdEFuZFRva2VuJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKCh7IHJlcXVlc3QsIHRva2VuIH0pID0+XG4gICAgICAgIG5leHQuaGFuZGxlKHJlcXVlc3QpLnBpcGUoXG4gICAgICAgICAgY2F0Y2hFcnJvcigoZXJyUmVzcG9uc2U6IGFueSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChlcnJSZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgY2FzZSA0MDE6IC8vIFVuYXV0aG9yaXplZFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRXhwaXJlZFRva2VuKGVyclJlc3BvbnNlKSAmJiBzaG91bGRDYXRjaEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAvLyByZXF1ZXN0IGZhaWxlZCBiZWNhdXNlIG9mIHRoZSBleHBpcmVkIGFjY2VzcyB0b2tlblxuICAgICAgICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIGdldCByZWZyZXNoIHRoZSB0b2tlbiBhbmQgcmV0cnkgdGhlIHJlcXVlc3QsIG9yIGxvZ291dCBpZiB0aGUgcmVmcmVzaCBpcyBtaXNzaW5nIC8gZXhwaXJlZFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0aEh0dHBIZWFkZXJTZXJ2aWNlLmhhbmRsZUV4cGlyZWRBY2Nlc3NUb2tlbihcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAgbmV4dCxcbiAgICAgICAgICAgICAgICAgICAgdG9rZW5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgIC8vIFJlZnJlc2ggdGhlIGV4cGlyZWQgdG9rZW5cbiAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBPQXV0aCBlbmRwb2ludCB3YXMgY2FsbGVkIGFuZCB0aGUgZXJyb3IgaXMgYmVjYXVzZSB0aGUgcmVmcmVzaCB0b2tlbiBleHBpcmVkXG4gICAgICAgICAgICAgICAgICB0aGlzLmVycm9ySXNJbnZhbGlkVG9rZW4oZXJyUmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmF1dGhIdHRwSGVhZGVyU2VydmljZS5oYW5kbGVFeHBpcmVkUmVmcmVzaFRva2VuKCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gb2Y8SHR0cEV2ZW50PGFueT4+KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDQwMDogLy8gQmFkIFJlcXVlc3RcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICB0aGlzLmVycm9ySXNJbnZhbGlkR3JhbnQoZXJyUmVzcG9uc2UpICYmXG4gICAgICAgICAgICAgICAgICByZXF1ZXN0LmJvZHkuZ2V0KCdncmFudF90eXBlJykgPT09ICdyZWZyZXNoX3Rva2VuJ1xuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoSHR0cEhlYWRlclNlcnZpY2UuaGFuZGxlRXhwaXJlZFJlZnJlc2hUb2tlbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGVyclJlc3BvbnNlKTtcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBlcnJvcklzSW52YWxpZFRva2VuKGVyclJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAoZXJyUmVzcG9uc2UudXJsPy5pbmNsdWRlcyh0aGlzLmF1dGhDb25maWdTZXJ2aWNlLmdldFRva2VuRW5kcG9pbnQoKSkgJiZcbiAgICAgICAgZXJyUmVzcG9uc2UuZXJyb3IuZXJyb3IgPT09ICdpbnZhbGlkX3Rva2VuJykgPz9cbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBlcnJvcklzSW52YWxpZEdyYW50KGVyclJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAoZXJyUmVzcG9uc2UudXJsPy5pbmNsdWRlcyh0aGlzLmF1dGhDb25maWdTZXJ2aWNlLmdldFRva2VuRW5kcG9pbnQoKSkgJiZcbiAgICAgICAgZXJyUmVzcG9uc2UuZXJyb3IuZXJyb3IgPT09ICdpbnZhbGlkX2dyYW50JykgPz9cbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0V4cGlyZWRUb2tlbihyZXNwOiBIdHRwRXJyb3JSZXNwb25zZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiByZXNwLmVycm9yPy5lcnJvcnM/LlswXT8udHlwZSA9PT0gJ0ludmFsaWRUb2tlbkVycm9yJztcbiAgfVxufVxuIl19