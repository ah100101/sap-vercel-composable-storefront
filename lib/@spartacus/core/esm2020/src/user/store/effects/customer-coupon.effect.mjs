/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import * as fromCustomerCouponsAction from '../actions/customer-coupon.action';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../connectors/customer-coupon/customer-coupon.connector";
export class CustomerCouponEffects {
    constructor(actions$, customerCouponConnector) {
        this.actions$ = actions$;
        this.customerCouponConnector = customerCouponConnector;
        this.loadCustomerCoupons$ = createEffect(() => this.actions$.pipe(ofType(fromCustomerCouponsAction.LOAD_CUSTOMER_COUPONS), map((action) => action.payload), mergeMap((payload) => {
            return this.customerCouponConnector
                .getCustomerCoupons(payload.userId, payload.pageSize, payload.currentPage, payload.sort)
                .pipe(map((coupons) => {
                return new fromCustomerCouponsAction.LoadCustomerCouponsSuccess(coupons);
            }), catchError((error) => of(new fromCustomerCouponsAction.LoadCustomerCouponsFail(normalizeHttpError(error)))));
        })));
        this.subscribeCustomerCoupon$ = createEffect(() => this.actions$.pipe(ofType(fromCustomerCouponsAction.SUBSCRIBE_CUSTOMER_COUPON), map((action) => action.payload), mergeMap((payload) => {
            return this.customerCouponConnector
                .turnOnNotification(payload.userId, payload.couponCode)
                .pipe(map((data) => {
                return new fromCustomerCouponsAction.SubscribeCustomerCouponSuccess(data);
            }), catchError((error) => of(new fromCustomerCouponsAction.SubscribeCustomerCouponFail(normalizeHttpError(error)))));
        })));
        this.unsubscribeCustomerCoupon$ = createEffect(() => this.actions$.pipe(ofType(fromCustomerCouponsAction.UNSUBSCRIBE_CUSTOMER_COUPON), map((action) => action.payload), mergeMap((payload) => {
            return this.customerCouponConnector
                .turnOffNotification(payload.userId, payload.couponCode)
                .pipe(map(() => {
                return new fromCustomerCouponsAction.UnsubscribeCustomerCouponSuccess(payload.couponCode);
            }), catchError((error) => of(new fromCustomerCouponsAction.UnsubscribeCustomerCouponFail(normalizeHttpError(error)))));
        })));
        this.claimCustomerCoupon$ = createEffect(() => this.actions$.pipe(ofType(fromCustomerCouponsAction.CLAIM_CUSTOMER_COUPON), map((action) => action.payload), mergeMap((payload) => {
            return this.customerCouponConnector
                .claimCustomerCoupon(payload.userId, payload.couponCode)
                .pipe(map((data) => {
                return new fromCustomerCouponsAction.ClaimCustomerCouponSuccess(data);
            }), catchError((error) => of(new fromCustomerCouponsAction.ClaimCustomerCouponFail(normalizeHttpError(error)))));
        })));
    }
}
CustomerCouponEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CustomerCouponEffects, deps: [{ token: i1.Actions }, { token: i2.CustomerCouponConnector }], target: i0.ɵɵFactoryTarget.Injectable });
CustomerCouponEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CustomerCouponEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CustomerCouponEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.CustomerCouponConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItY291cG9uLmVmZmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL3VzZXIvc3RvcmUvZWZmZWN0cy9jdXN0b21lci1jb3Vwb24uZWZmZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBVyxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBYyxFQUFFLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFFeEUsT0FBTyxLQUFLLHlCQUF5QixNQUFNLG1DQUFtQyxDQUFDOzs7O0FBRy9FLE1BQU0sT0FBTyxxQkFBcUI7SUEwSGhDLFlBQ1UsUUFBaUIsRUFDakIsdUJBQWdEO1FBRGhELGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQTNIMUQseUJBQW9CLEdBQ2xCLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2hCLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxxQkFBcUIsQ0FBQyxFQUN2RCxHQUFHLENBQ0QsQ0FBQyxNQUFxRCxFQUFFLEVBQUUsQ0FDeEQsTUFBTSxDQUFDLE9BQU8sQ0FDakIsRUFDRCxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNuQixPQUFPLElBQUksQ0FBQyx1QkFBdUI7aUJBQ2hDLGtCQUFrQixDQUNqQixPQUFPLENBQUMsTUFBTSxFQUNkLE9BQU8sQ0FBQyxRQUFRLEVBQ2hCLE9BQU8sQ0FB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QkFDWCxPQUFPLElBQUkseUJBQXlCLENBQUMsMEJBQTBCLENBQzdELElBQUksQ0FDTCxDQUFDO1lBQ0osQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDbkIsRUFBRSxDQUNBLElBQUkseUJBQXlCLENBQUMsdUJBQXVCLENBQ25ELGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUMxQixDQUNGLENBQ0YsQ0FDRixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQ0gsQ0FDRixDQUFDO0lBS0QsQ0FBQzs7a0hBN0hPLHFCQUFxQjtzSEFBckIscUJBQXFCOzJGQUFyQixxQkFBcUI7a0JBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb25zLCBjcmVhdGVFZmZlY3QsIG9mVHlwZSB9IGZyb20gJ0BuZ3J4L2VmZmVjdHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDdXN0b21lckNvdXBvblNlYXJjaFJlc3VsdCB9IGZyb20gJy4uLy4uLy4uL21vZGVsL2N1c3RvbWVyLWNvdXBvbi5tb2RlbCc7XG5pbXBvcnQgeyBub3JtYWxpemVIdHRwRXJyb3IgfSBmcm9tICcuLi8uLi8uLi91dGlsL25vcm1hbGl6ZS1odHRwLWVycm9yJztcbmltcG9ydCB7IEN1c3RvbWVyQ291cG9uQ29ubmVjdG9yIH0gZnJvbSAnLi4vLi4vY29ubmVjdG9ycy9jdXN0b21lci1jb3Vwb24vY3VzdG9tZXItY291cG9uLmNvbm5lY3Rvcic7XG5pbXBvcnQgKiBhcyBmcm9tQ3VzdG9tZXJDb3Vwb25zQWN0aW9uIGZyb20gJy4uL2FjdGlvbnMvY3VzdG9tZXItY291cG9uLmFjdGlvbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDdXN0b21lckNvdXBvbkVmZmVjdHMge1xuICBsb2FkQ3VzdG9tZXJDb3Vwb25zJDogT2JzZXJ2YWJsZTxmcm9tQ3VzdG9tZXJDb3Vwb25zQWN0aW9uLkN1c3RvbWVyQ291cG9uQWN0aW9uPiA9XG4gICAgY3JlYXRlRWZmZWN0KCgpID0+XG4gICAgICB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gICAgICAgIG9mVHlwZShmcm9tQ3VzdG9tZXJDb3Vwb25zQWN0aW9uLkxPQURfQ1VTVE9NRVJfQ09VUE9OUyksXG4gICAgICAgIG1hcChcbiAgICAgICAgICAoYWN0aW9uOiBmcm9tQ3VzdG9tZXJDb3Vwb25zQWN0aW9uLkxvYWRDdXN0b21lckNvdXBvbnMpID0+XG4gICAgICAgICAgICBhY3Rpb24ucGF5bG9hZFxuICAgICAgICApLFxuICAgICAgICBtZXJnZU1hcCgocGF5bG9hZCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmN1c3RvbWVyQ291cG9uQ29ubmVjdG9yXG4gICAgICAgICAgICAuZ2V0Q3VzdG9tZXJDb3Vwb25zKFxuICAgICAgICAgICAgICBwYXlsb2FkLnVzZXJJZCxcbiAgICAgICAgICAgICAgcGF5bG9hZC5wYWdlU2l6ZSxcbiAgICAgICAgICAgICAgcGF5bG9hZC5jdXJyZW50UGFnZSxcbiAgICAgICAgICAgICAgcGF5bG9hZC5zb3J0XG4gICAgICAgICAgICApXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKChjb3Vwb25zOiBDdXN0b21lckNvdXBvblNlYXJjaFJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgZnJvbUN1c3RvbWVyQ291cG9uc0FjdGlvbi5Mb2FkQ3VzdG9tZXJDb3Vwb25zU3VjY2VzcyhcbiAgICAgICAgICAgICAgICAgIGNvdXBvbnNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+XG4gICAgICAgICAgICAgICAgb2YoXG4gICAgICAgICAgICAgICAgICBuZXcgZnJvbUN1c3RvbWVyQ291cG9uc0FjdGlvbi5Mb2FkQ3VzdG9tZXJDb3Vwb25zRmFpbChcbiAgICAgICAgICAgICAgICAgICAgbm9ybWFsaXplSHR0cEVycm9yKGVycm9yKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuXG4gIHN1YnNjcmliZUN1c3RvbWVyQ291cG9uJDogT2JzZXJ2YWJsZTxmcm9tQ3VzdG9tZXJDb3Vwb25zQWN0aW9uLkN1c3RvbWVyQ291cG9uQWN0aW9uPiA9XG4gICAgY3JlYXRlRWZmZWN0KCgpID0+XG4gICAgICB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gICAgICAgIG9mVHlwZShmcm9tQ3VzdG9tZXJDb3Vwb25zQWN0aW9uLlNVQlNDUklCRV9DVVNUT01FUl9DT1VQT04pLFxuICAgICAgICBtYXAoXG4gICAgICAgICAgKGFjdGlvbjogZnJvbUN1c3RvbWVyQ291cG9uc0FjdGlvbi5TdWJzY3JpYmVDdXN0b21lckNvdXBvbikgPT5cbiAgICAgICAgICAgIGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICksXG4gICAgICAgIG1lcmdlTWFwKChwYXlsb2FkKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tZXJDb3Vwb25Db25uZWN0b3JcbiAgICAgICAgICAgIC50dXJuT25Ob3RpZmljYXRpb24ocGF5bG9hZC51c2VySWQsIHBheWxvYWQuY291cG9uQ29kZSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoKGRhdGE6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgZnJvbUN1c3RvbWVyQ291cG9uc0FjdGlvbi5TdWJzY3JpYmVDdXN0b21lckNvdXBvblN1Y2Nlc3MoXG4gICAgICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PlxuICAgICAgICAgICAgICAgIG9mKFxuICAgICAgICAgICAgICAgICAgbmV3IGZyb21DdXN0b21lckNvdXBvbnNBY3Rpb24uU3Vic2NyaWJlQ3VzdG9tZXJDb3Vwb25GYWlsKFxuICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICk7XG5cbiAgdW5zdWJzY3JpYmVDdXN0b21lckNvdXBvbiQ6IE9ic2VydmFibGU8ZnJvbUN1c3RvbWVyQ291cG9uc0FjdGlvbi5DdXN0b21lckNvdXBvbkFjdGlvbj4gPVxuICAgIGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgICBvZlR5cGUoZnJvbUN1c3RvbWVyQ291cG9uc0FjdGlvbi5VTlNVQlNDUklCRV9DVVNUT01FUl9DT1VQT04pLFxuICAgICAgICBtYXAoXG4gICAgICAgICAgKGFjdGlvbjogZnJvbUN1c3RvbWVyQ291cG9uc0FjdGlvbi5VbnN1YnNjcmliZUN1c3RvbWVyQ291cG9uKSA9PlxuICAgICAgICAgICAgYWN0aW9uLnBheWxvYWRcbiAgICAgICAgKSxcbiAgICAgICAgbWVyZ2VNYXAoKHBheWxvYWQpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jdXN0b21lckNvdXBvbkNvbm5lY3RvclxuICAgICAgICAgICAgLnR1cm5PZmZOb3RpZmljYXRpb24ocGF5bG9hZC51c2VySWQsIHBheWxvYWQuY291cG9uQ29kZSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgZnJvbUN1c3RvbWVyQ291cG9uc0FjdGlvbi5VbnN1YnNjcmliZUN1c3RvbWVyQ291cG9uU3VjY2VzcyhcbiAgICAgICAgICAgICAgICAgIHBheWxvYWQuY291cG9uQ29kZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT5cbiAgICAgICAgICAgICAgICBvZihcbiAgICAgICAgICAgICAgICAgIG5ldyBmcm9tQ3VzdG9tZXJDb3Vwb25zQWN0aW9uLlVuc3Vic2NyaWJlQ3VzdG9tZXJDb3Vwb25GYWlsKFxuICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICk7XG5cbiAgY2xhaW1DdXN0b21lckNvdXBvbiQ6IE9ic2VydmFibGU8ZnJvbUN1c3RvbWVyQ291cG9uc0FjdGlvbi5DdXN0b21lckNvdXBvbkFjdGlvbj4gPVxuICAgIGNyZWF0ZUVmZmVjdCgoKSA9PlxuICAgICAgdGhpcy5hY3Rpb25zJC5waXBlKFxuICAgICAgICBvZlR5cGUoZnJvbUN1c3RvbWVyQ291cG9uc0FjdGlvbi5DTEFJTV9DVVNUT01FUl9DT1VQT04pLFxuICAgICAgICBtYXAoXG4gICAgICAgICAgKGFjdGlvbjogZnJvbUN1c3RvbWVyQ291cG9uc0FjdGlvbi5DbGFpbUN1c3RvbWVyQ291cG9uKSA9PlxuICAgICAgICAgICAgYWN0aW9uLnBheWxvYWRcbiAgICAgICAgKSxcbiAgICAgICAgbWVyZ2VNYXAoKHBheWxvYWQpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jdXN0b21lckNvdXBvbkNvbm5lY3RvclxuICAgICAgICAgICAgLmNsYWltQ3VzdG9tZXJDb3Vwb24ocGF5bG9hZC51c2VySWQsIHBheWxvYWQuY291cG9uQ29kZSlcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICBtYXAoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IGZyb21DdXN0b21lckNvdXBvbnNBY3Rpb24uQ2xhaW1DdXN0b21lckNvdXBvblN1Y2Nlc3MoXG4gICAgICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PlxuICAgICAgICAgICAgICAgIG9mKFxuICAgICAgICAgICAgICAgICAgbmV3IGZyb21DdXN0b21lckNvdXBvbnNBY3Rpb24uQ2xhaW1DdXN0b21lckNvdXBvbkZhaWwoXG4gICAgICAgICAgICAgICAgICAgIG5vcm1hbGl6ZUh0dHBFcnJvcihlcnJvcilcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFjdGlvbnMkOiBBY3Rpb25zLFxuICAgIHByaXZhdGUgY3VzdG9tZXJDb3Vwb25Db25uZWN0b3I6IEN1c3RvbWVyQ291cG9uQ29ubmVjdG9yXG4gICkge31cbn1cbiJdfQ==