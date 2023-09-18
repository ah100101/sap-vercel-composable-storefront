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
export class OccPersonalizationIdInterceptor {
    constructor(config, occEndpoints, winRef) {
        this.config = config;
        this.occEndpoints = occEndpoints;
        this.winRef = winRef;
        this.enabled = false;
        this.PERSONALIZATION_ID_KEY = 'personalization-id';
        if (this.winRef.isBrowser()) {
            this.enabled =
                (this.winRef.localStorage && this.config.personalization?.enabled) ||
                    false;
            if (this.enabled) {
                if (!this.config.personalization?.httpHeaderName && isDevMode()) {
                    console.warn(`There is no httpHeaderName configured in Personalization`);
                }
                this.requestHeader =
                    this.config.personalization?.httpHeaderName?.id.toLowerCase();
                this.personalizationId = this.winRef.localStorage?.getItem(this.PERSONALIZATION_ID_KEY);
            }
            else if (this.winRef.localStorage?.getItem(this.PERSONALIZATION_ID_KEY)) {
                this.winRef.localStorage.removeItem(this.PERSONALIZATION_ID_KEY);
            }
        }
    }
    intercept(request, next) {
        if (!this.enabled) {
            return next.handle(request);
        }
        if (this.requestHeader &&
            this.personalizationId &&
            request.url.includes(this.occEndpoints.getBaseUrl())) {
            request = request.clone({
                setHeaders: {
                    [this.requestHeader]: this.personalizationId,
                },
            });
        }
        return next.handle(request).pipe(tap((event) => {
            if (event instanceof HttpResponse &&
                this.requestHeader &&
                event.headers.keys().includes(this.requestHeader)) {
                const receivedId = event.headers.get(this.requestHeader);
                if (this.personalizationId !== receivedId) {
                    this.personalizationId = receivedId;
                    if (this.personalizationId) {
                        this.winRef.localStorage?.setItem(this.PERSONALIZATION_ID_KEY, this.personalizationId);
                    }
                }
            }
        }));
    }
}
OccPersonalizationIdInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccPersonalizationIdInterceptor, deps: [{ token: i1.PersonalizationConfig }, { token: i2.OccEndpointsService }, { token: i2.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
OccPersonalizationIdInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccPersonalizationIdInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccPersonalizationIdInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.PersonalizationConfig }, { type: i2.OccEndpointsService }, { type: i2.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXBlcnNvbmFsaXphdGlvbi1pZC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy90cmFja2luZy9wZXJzb25hbGl6YXRpb24vcm9vdC9odHRwLWludGVyY2VwdG9ycy9vY2MtcGVyc29uYWxpemF0aW9uLWlkLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBS0wsWUFBWSxHQUNiLE1BQU0sc0JBQXNCLENBQUM7QUFDOUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHdEQsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBSXJDLE1BQU0sT0FBTywrQkFBK0I7SUFNMUMsWUFDVSxNQUE2QixFQUM3QixZQUFpQyxFQUNqQyxNQUFpQjtRQUZqQixXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUM3QixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQU5uQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ0wsMkJBQXNCLEdBQUcsb0JBQW9CLENBQUM7UUFPL0QsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQyxPQUFPO2dCQUNWLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDO29CQUNsRSxLQUFLLENBQUM7WUFFUixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxjQUFjLElBQUksU0FBUyxFQUFFLEVBQUU7b0JBQy9ELE9BQU8sQ0FBQyxJQUFJLENBQ1YsMERBQTBELENBQzNELENBQUM7aUJBQ0g7Z0JBQ0QsSUFBSSxDQUFDLGFBQWE7b0JBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLGNBQWMsRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ2hFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQ3hELElBQUksQ0FBQyxzQkFBc0IsQ0FDNUIsQ0FBQzthQUNIO2lCQUFNLElBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUM5RDtnQkFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDbEU7U0FDRjtJQUNILENBQUM7SUFFRCxTQUFTLENBQ1AsT0FBeUIsRUFDekIsSUFBaUI7UUFFakIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDakIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdCO1FBRUQsSUFDRSxJQUFJLENBQUMsYUFBYTtZQUNsQixJQUFJLENBQUMsaUJBQWlCO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsRUFDcEQ7WUFDQSxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDdEIsVUFBVSxFQUFFO29CQUNWLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLElBQUksQ0FBQyxpQkFBaUI7aUJBQzdDO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUM5QixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNaLElBQ0UsS0FBSyxZQUFZLFlBQVk7Z0JBQzdCLElBQUksQ0FBQyxhQUFhO2dCQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQ2pEO2dCQUNBLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDekQsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssVUFBVSxFQUFFO29CQUN6QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO29CQUNwQyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTt3QkFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsT0FBTyxDQUMvQixJQUFJLENBQUMsc0JBQXNCLEVBQzNCLElBQUksQ0FBQyxpQkFBaUIsQ0FDdkIsQ0FBQztxQkFDSDtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OzRIQTNFVSwrQkFBK0I7Z0lBQS9CLCtCQUErQixjQURsQixNQUFNOzJGQUNuQiwrQkFBK0I7a0JBRDNDLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgSHR0cEV2ZW50LFxuICBIdHRwSGFuZGxlcixcbiAgSHR0cEludGVyY2VwdG9yLFxuICBIdHRwUmVxdWVzdCxcbiAgSHR0cFJlc3BvbnNlLFxufSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9jY0VuZHBvaW50c1NlcnZpY2UsIFdpbmRvd1JlZiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQZXJzb25hbGl6YXRpb25Db25maWcgfSBmcm9tICcuLi9jb25maWcvcGVyc29uYWxpemF0aW9uLWNvbmZpZyc7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgT2NjUGVyc29uYWxpemF0aW9uSWRJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIHByaXZhdGUgcGVyc29uYWxpemF0aW9uSWQ/OiBzdHJpbmcgfCBudWxsO1xuICBwcml2YXRlIHJlcXVlc3RIZWFkZXI/OiBzdHJpbmc7XG4gIHByaXZhdGUgZW5hYmxlZCA9IGZhbHNlO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgUEVSU09OQUxJWkFUSU9OX0lEX0tFWSA9ICdwZXJzb25hbGl6YXRpb24taWQnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29uZmlnOiBQZXJzb25hbGl6YXRpb25Db25maWcsXG4gICAgcHJpdmF0ZSBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB3aW5SZWY6IFdpbmRvd1JlZlxuICApIHtcbiAgICBpZiAodGhpcy53aW5SZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHRoaXMuZW5hYmxlZCA9XG4gICAgICAgICh0aGlzLndpblJlZi5sb2NhbFN0b3JhZ2UgJiYgdGhpcy5jb25maWcucGVyc29uYWxpemF0aW9uPy5lbmFibGVkKSB8fFxuICAgICAgICBmYWxzZTtcblxuICAgICAgaWYgKHRoaXMuZW5hYmxlZCkge1xuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLnBlcnNvbmFsaXphdGlvbj8uaHR0cEhlYWRlck5hbWUgJiYgaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICBgVGhlcmUgaXMgbm8gaHR0cEhlYWRlck5hbWUgY29uZmlndXJlZCBpbiBQZXJzb25hbGl6YXRpb25gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcXVlc3RIZWFkZXIgPVxuICAgICAgICAgIHRoaXMuY29uZmlnLnBlcnNvbmFsaXphdGlvbj8uaHR0cEhlYWRlck5hbWU/LmlkLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHRoaXMucGVyc29uYWxpemF0aW9uSWQgPSB0aGlzLndpblJlZi5sb2NhbFN0b3JhZ2U/LmdldEl0ZW0oXG4gICAgICAgICAgdGhpcy5QRVJTT05BTElaQVRJT05fSURfS0VZXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICB0aGlzLndpblJlZi5sb2NhbFN0b3JhZ2U/LmdldEl0ZW0odGhpcy5QRVJTT05BTElaQVRJT05fSURfS0VZKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMuUEVSU09OQUxJWkFUSU9OX0lEX0tFWSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW50ZXJjZXB0KFxuICAgIHJlcXVlc3Q6IEh0dHBSZXF1ZXN0PGFueT4sXG4gICAgbmV4dDogSHR0cEhhbmRsZXJcbiAgKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGlmICghdGhpcy5lbmFibGVkKSB7XG4gICAgICByZXR1cm4gbmV4dC5oYW5kbGUocmVxdWVzdCk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgdGhpcy5yZXF1ZXN0SGVhZGVyICYmXG4gICAgICB0aGlzLnBlcnNvbmFsaXphdGlvbklkICYmXG4gICAgICByZXF1ZXN0LnVybC5pbmNsdWRlcyh0aGlzLm9jY0VuZHBvaW50cy5nZXRCYXNlVXJsKCkpXG4gICAgKSB7XG4gICAgICByZXF1ZXN0ID0gcmVxdWVzdC5jbG9uZSh7XG4gICAgICAgIHNldEhlYWRlcnM6IHtcbiAgICAgICAgICBbdGhpcy5yZXF1ZXN0SGVhZGVyXTogdGhpcy5wZXJzb25hbGl6YXRpb25JZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXF1ZXN0KS5waXBlKFxuICAgICAgdGFwKChldmVudCkgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZXZlbnQgaW5zdGFuY2VvZiBIdHRwUmVzcG9uc2UgJiZcbiAgICAgICAgICB0aGlzLnJlcXVlc3RIZWFkZXIgJiZcbiAgICAgICAgICBldmVudC5oZWFkZXJzLmtleXMoKS5pbmNsdWRlcyh0aGlzLnJlcXVlc3RIZWFkZXIpXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IHJlY2VpdmVkSWQgPSBldmVudC5oZWFkZXJzLmdldCh0aGlzLnJlcXVlc3RIZWFkZXIpO1xuICAgICAgICAgIGlmICh0aGlzLnBlcnNvbmFsaXphdGlvbklkICE9PSByZWNlaXZlZElkKSB7XG4gICAgICAgICAgICB0aGlzLnBlcnNvbmFsaXphdGlvbklkID0gcmVjZWl2ZWRJZDtcbiAgICAgICAgICAgIGlmICh0aGlzLnBlcnNvbmFsaXphdGlvbklkKSB7XG4gICAgICAgICAgICAgIHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZT8uc2V0SXRlbShcbiAgICAgICAgICAgICAgICB0aGlzLlBFUlNPTkFMSVpBVElPTl9JRF9LRVksXG4gICAgICAgICAgICAgICAgdGhpcy5wZXJzb25hbGl6YXRpb25JZFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=