/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { normalizeHttpError, } from '@spartacus/core';
import { REORDER_ORDER_NORMALIZER } from '@spartacus/order/root';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccReorderOrderAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    reorder(orderId, userId) {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http
            .post(this.getReorderOrderEndpoint(orderId, userId), {}, { headers })
            .pipe(catchError((error) => throwError(normalizeHttpError(error))), this.converter.pipeable(REORDER_ORDER_NORMALIZER));
    }
    getReorderOrderEndpoint(orderCode, userId) {
        return this.occEndpoints.buildUrl('reorder', {
            urlParams: {
                userId,
            },
            queryParams: { orderCode },
        });
    }
}
OccReorderOrderAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccReorderOrderAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccReorderOrderAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccReorderOrderAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccReorderOrderAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXJlb3JkZXItb3JkZXIuYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9vY2MvYWRhcHRlcnMvb2NjLXJlb3JkZXItb3JkZXIuYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFjLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUVMLGtCQUFrQixHQUVuQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pFLE9BQU8sRUFBYyxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7O0FBRzVDLE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsWUFDWSxJQUFnQixFQUNoQixZQUFpQyxFQUNqQyxTQUEyQjtRQUYzQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtJQUNwQyxDQUFDO0lBRUosT0FBTyxDQUFDLE9BQWUsRUFBRSxNQUFjO1FBQ3JDLE1BQU0sT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1FBRTFFLE9BQU8sSUFBSSxDQUFDLElBQUk7YUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUNwRSxJQUFJLENBQ0gsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUM1RCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUNsRCxDQUFDO0lBQ04sQ0FBQztJQUVTLHVCQUF1QixDQUFDLFNBQWlCLEVBQUUsTUFBYztRQUNqRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtZQUMzQyxTQUFTLEVBQUU7Z0JBQ1QsTUFBTTthQUNQO1lBQ0QsV0FBVyxFQUFFLEVBQUUsU0FBUyxFQUFFO1NBQzNCLENBQUMsQ0FBQztJQUNMLENBQUM7O21IQXpCVSxzQkFBc0I7dUhBQXRCLHNCQUFzQjsyRkFBdEIsc0JBQXNCO2tCQURsQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXJ0TW9kaWZpY2F0aW9uTGlzdCB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ29udmVydGVyU2VydmljZSxcbiAgbm9ybWFsaXplSHR0cEVycm9yLFxuICBPY2NFbmRwb2ludHNTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUmVvcmRlck9yZGVyQWRhcHRlciB9IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvY29yZSc7XG5pbXBvcnQgeyBSRU9SREVSX09SREVSX05PUk1BTElaRVIgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9jY1Jlb3JkZXJPcmRlckFkYXB0ZXIgaW1wbGVtZW50cyBSZW9yZGVyT3JkZXJBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJvdGVjdGVkIG9jY0VuZHBvaW50czogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyOiBDb252ZXJ0ZXJTZXJ2aWNlXG4gICkge31cblxuICByZW9yZGVyKG9yZGVySWQ6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPENhcnRNb2RpZmljYXRpb25MaXN0PiB7XG4gICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpLnNldCgnQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5wb3N0KHRoaXMuZ2V0UmVvcmRlck9yZGVyRW5kcG9pbnQob3JkZXJJZCwgdXNlcklkKSwge30sIHsgaGVhZGVycyB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB0aHJvd0Vycm9yKG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvcikpKSxcbiAgICAgICAgdGhpcy5jb252ZXJ0ZXIucGlwZWFibGUoUkVPUkRFUl9PUkRFUl9OT1JNQUxJWkVSKVxuICAgICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRSZW9yZGVyT3JkZXJFbmRwb2ludChvcmRlckNvZGU6IHN0cmluZywgdXNlcklkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgncmVvcmRlcicsIHtcbiAgICAgIHVybFBhcmFtczoge1xuICAgICAgICB1c2VySWQsXG4gICAgICB9LFxuICAgICAgcXVlcnlQYXJhbXM6IHsgb3JkZXJDb2RlIH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==