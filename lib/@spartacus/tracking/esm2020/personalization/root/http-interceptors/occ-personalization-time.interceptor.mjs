/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpResponse, } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../config/personalization-config";
import * as i2 from "@spartacus/core";
export class OccPersonalizationTimeInterceptor {
    constructor(config, occEndpoints, winRef) {
        this.config = config;
        this.occEndpoints = occEndpoints;
        this.winRef = winRef;
        this.enabled = false;
        this.PERSONALIZATION_TIME_KEY = 'personalization-time';
        if (this.winRef.isBrowser()) {
            this.enabled =
                (this.winRef.localStorage && this.config.personalization?.enabled) ||
                    false;
            if (this.enabled) {
                if (!this.config.personalization?.httpHeaderName && isDevMode()) {
                    console.warn(`There is no httpHeaderName configured in Personalization`);
                }
                this.requestHeader =
                    this.config.personalization?.httpHeaderName?.timestamp.toLowerCase();
                this.timestamp = this.winRef.localStorage?.getItem(this.PERSONALIZATION_TIME_KEY);
            }
            else if (this.winRef.localStorage?.getItem(this.PERSONALIZATION_TIME_KEY)) {
                this.winRef.localStorage.removeItem(this.PERSONALIZATION_TIME_KEY);
            }
        }
    }
    intercept(request, next) {
        if (!this.enabled) {
            return next.handle(request);
        }
        if (this.requestHeader &&
            this.timestamp &&
            request.url.includes(this.occEndpoints.getBaseUrl())) {
            request = request.clone({
                setHeaders: {
                    [this.requestHeader]: this.timestamp,
                },
            });
        }
        return next.handle(request).pipe(tap((event) => {
            if (event instanceof HttpResponse &&
                this.requestHeader &&
                event.headers.keys().includes(this.requestHeader)) {
                const receivedTimestamp = event.headers.get(this.requestHeader);
                if (this.timestamp !== receivedTimestamp) {
                    this.timestamp = receivedTimestamp;
                    if (this.timestamp) {
                        this.winRef.localStorage?.setItem(this.PERSONALIZATION_TIME_KEY, this.timestamp);
                    }
                }
            }
        }));
    }
}
OccPersonalizationTimeInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccPersonalizationTimeInterceptor, deps: [{ token: i1.PersonalizationConfig }, { token: i2.OccEndpointsService }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
OccPersonalizationTimeInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccPersonalizationTimeInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccPersonalizationTimeInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.PersonalizationConfig }, { type: i2.OccEndpointsService }, { type: i2.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXBlcnNvbmFsaXphdGlvbi10aW1lLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3RyYWNraW5nL3BlcnNvbmFsaXphdGlvbi9yb290L2h0dHAtaW50ZXJjZXB0b3JzL29jYy1wZXJzb25hbGl6YXRpb24tdGltZS5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUtMLFlBQVksR0FDYixNQUFNLHNCQUFzQixDQUFDO0FBQzlCLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3RELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUlyQyxNQUFNLE9BQU8saUNBQWlDO0lBTTVDLFlBQ1UsTUFBNkIsRUFDN0IsWUFBaUMsRUFDakMsTUFBaUI7UUFGakIsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFDN0IsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFObkIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNMLDZCQUF3QixHQUFHLHNCQUFzQixDQUFDO1FBT25FLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUMzQixJQUFJLENBQUMsT0FBTztnQkFDVixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQztvQkFDbEUsS0FBSyxDQUFDO1lBRVIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsY0FBYyxJQUFJLFNBQVMsRUFBRSxFQUFFO29CQUMvRCxPQUFPLENBQUMsSUFBSSxDQUNWLDBEQUEwRCxDQUMzRCxDQUFDO2lCQUNIO2dCQUNELElBQUksQ0FBQyxhQUFhO29CQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxjQUFjLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN2RSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FDaEQsSUFBSSxDQUFDLHdCQUF3QixDQUM5QixDQUFDO2FBQ0g7aUJBQU0sSUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLHdCQUF3QixDQUFDLEVBQ2hFO2dCQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQzthQUNwRTtTQUNGO0lBQ0gsQ0FBQztJQUVELFNBQVMsQ0FDUCxPQUF5QixFQUN6QixJQUFpQjtRQUVqQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0I7UUFFRCxJQUNFLElBQUksQ0FBQyxhQUFhO1lBQ2xCLElBQUksQ0FBQyxTQUFTO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUNwRDtZQUNBLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUN0QixVQUFVLEVBQUU7b0JBQ1YsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVM7aUJBQ3JDO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUM5QixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNaLElBQ0UsS0FBSyxZQUFZLFlBQVk7Z0JBQzdCLElBQUksQ0FBQyxhQUFhO2dCQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQ2pEO2dCQUNBLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssaUJBQWlCLEVBQUU7b0JBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUM7b0JBQ25DLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTt3QkFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUMvQixJQUFJLENBQUMsd0JBQXdCLEVBQzdCLElBQUksQ0FBQyxTQUFTLENBQ2YsQ0FBQztxQkFDSDtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OzhIQTNFVSxpQ0FBaUM7a0lBQWpDLGlDQUFpQyxjQURwQixNQUFNOzJGQUNuQixpQ0FBaUM7a0JBRDdDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgSHR0cEV2ZW50LFxuICBIdHRwSGFuZGxlcixcbiAgSHR0cEludGVyY2VwdG9yLFxuICBIdHRwUmVxdWVzdCxcbiAgSHR0cFJlc3BvbnNlLFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9jY0VuZHBvaW50c1NlcnZpY2UsIFdpbmRvd1JlZiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQZXJzb25hbGl6YXRpb25Db25maWcgfSBmcm9tICcuLi9jb25maWcvcGVyc29uYWxpemF0aW9uLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT2NjUGVyc29uYWxpemF0aW9uVGltZUludGVyY2VwdG9yIGltcGxlbWVudHMgSHR0cEludGVyY2VwdG9yIHtcbiAgcHJpdmF0ZSB0aW1lc3RhbXA/OiBzdHJpbmcgfCBudWxsO1xuICBwcml2YXRlIHJlcXVlc3RIZWFkZXI/OiBzdHJpbmc7XG4gIHByaXZhdGUgZW5hYmxlZCA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgUEVSU09OQUxJWkFUSU9OX1RJTUVfS0VZID0gJ3BlcnNvbmFsaXphdGlvbi10aW1lJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvbmZpZzogUGVyc29uYWxpemF0aW9uQ29uZmlnLFxuICAgIHByaXZhdGUgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICAgIHByaXZhdGUgd2luUmVmOiBXaW5kb3dSZWZcbiAgKSB7XG4gICAgaWYgKHRoaXMud2luUmVmLmlzQnJvd3NlcigpKSB7XG4gICAgICB0aGlzLmVuYWJsZWQgPVxuICAgICAgICAodGhpcy53aW5SZWYubG9jYWxTdG9yYWdlICYmIHRoaXMuY29uZmlnLnBlcnNvbmFsaXphdGlvbj8uZW5hYmxlZCkgfHxcbiAgICAgICAgZmFsc2U7XG5cbiAgICAgIGlmICh0aGlzLmVuYWJsZWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5wZXJzb25hbGl6YXRpb24/Lmh0dHBIZWFkZXJOYW1lICYmIGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgYFRoZXJlIGlzIG5vIGh0dHBIZWFkZXJOYW1lIGNvbmZpZ3VyZWQgaW4gUGVyc29uYWxpemF0aW9uYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXF1ZXN0SGVhZGVyID1cbiAgICAgICAgICB0aGlzLmNvbmZpZy5wZXJzb25hbGl6YXRpb24/Lmh0dHBIZWFkZXJOYW1lPy50aW1lc3RhbXAudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdGhpcy50aW1lc3RhbXAgPSB0aGlzLndpblJlZi5sb2NhbFN0b3JhZ2U/LmdldEl0ZW0oXG4gICAgICAgICAgdGhpcy5QRVJTT05BTElaQVRJT05fVElNRV9LRVlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZT8uZ2V0SXRlbSh0aGlzLlBFUlNPTkFMSVpBVElPTl9USU1FX0tFWSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLndpblJlZi5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLlBFUlNPTkFMSVpBVElPTl9USU1FX0tFWSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW50ZXJjZXB0KFxuICAgIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgbmV4dDogSHR0cEhhbmRsZXJcbiAgKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdCk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5yZXF1ZXN0SGVhZGVyICYmXG4gICAgICB0aGlzLnRpbWVzdGFtcCAmJlxuICAgICAgcmVxdWVzdC51cmwuaW5jbHVkZXModGhpcy5vY2NFbmRwb2ludHMuZ2V0QmFzZVVybCgpKVxuICAgICkge1xuICAgICAgcmVxdWVzdCA9IHJlcXVlc3QuY2xvbmUoe1xuICAgICAgICBzZXRIZWFkZXJzOiB7XG4gICAgICAgICAgW3RoaXMucmVxdWVzdEhlYWRlcl06IHRoaXMudGltZXN0YW1wLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcXVlc3QpLnBpcGUoXG4gICAgICB0YXAoKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSAmJlxuICAgICAgICAgIHRoaXMucmVxdWVzdEhlYWRlciAmJlxuICAgICAgICAgIGV2ZW50LmhlYWRlcnMua2V5cygpLmluY2x1ZGVzKHRoaXMucmVxdWVzdEhlYWRlcilcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgcmVjZWl2ZWRUaW1lc3RhbXAgPSBldmVudC5oZWFkZXJzLmdldCh0aGlzLnJlcXVlc3RIZWFkZXIpO1xuICAgICAgICAgIGlmICh0aGlzLnRpbWVzdGFtcCAhPT0gcmVjZWl2ZWRUaW1lc3RhbXApIHtcbiAgICAgICAgICAgIHRoaXMudGltZXN0YW1wID0gcmVjZWl2ZWRUaW1lc3RhbXA7XG4gICAgICAgICAgICBpZiAodGhpcy50aW1lc3RhbXApIHtcbiAgICAgICAgICAgICAgdGhpcy53aW5SZWYubG9jYWxTdG9yYWdlPy5zZXRJdGVtKFxuICAgICAgICAgICAgICAgIHRoaXMuUEVSU09OQUxJWkFUSU9OX1RJTUVfS0VZLFxuICAgICAgICAgICAgICAgIHRoaXMudGltZXN0YW1wXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cblxuLy8gQ0hFQ0sgU09OQVJcbiJdfQ==