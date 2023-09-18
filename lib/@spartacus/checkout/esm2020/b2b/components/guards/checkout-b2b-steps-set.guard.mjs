/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import { CheckoutStepsSetGuard, } from '@spartacus/checkout/base/components';
import { combineLatest, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/checkout/base/components";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/checkout/base/root";
import * as i4 from "@angular/router";
import * as i5 from "@spartacus/checkout/b2b/root";
import * as i6 from "@spartacus/cart/base/root";
export class CheckoutB2BStepsSetGuard extends CheckoutStepsSetGuard {
    constructor(checkoutStepService, routingConfigService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, checkoutDeliveryModesFacade, router, checkoutPaymentTypeFacade, checkoutCostCenterFacade, activeCartFacade) {
        super(checkoutStepService, routingConfigService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, checkoutDeliveryModesFacade, router, activeCartFacade);
        this.checkoutStepService = checkoutStepService;
        this.routingConfigService = routingConfigService;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.checkoutPaymentFacade = checkoutPaymentFacade;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.router = router;
        this.checkoutPaymentTypeFacade = checkoutPaymentTypeFacade;
        this.checkoutCostCenterFacade = checkoutCostCenterFacade;
        this.activeCartFacade = activeCartFacade;
    }
    canActivate(route) {
        let currentIndex = -1;
        const currentRouteUrl = '/' + route.url.join('/');
        // check whether the previous step is set
        return combineLatest([
            this.checkoutStepService.steps$,
            this.checkoutPaymentTypeFacade.isAccountPayment(),
        ]).pipe(tap(([, isAccount]) => {
            this.checkoutStepService.disableEnableStep("paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */, isAccount);
        }), take(1), switchMap(([steps, isAccount]) => {
            currentIndex = steps.findIndex((step) => {
                const stepRouteUrl = `/${this.routingConfigService.getRouteConfig(step.routeName)?.paths?.[0]}`;
                return stepRouteUrl === currentRouteUrl;
            });
            // get current step
            let currentStep;
            if (currentIndex >= 0) {
                currentStep = steps[currentIndex];
            }
            if (Boolean(currentStep)) {
                return this.isB2BStepSet(steps[currentIndex - 1], isAccount);
            }
            else {
                if (isDevMode()) {
                    console.warn(`Missing step with route '${currentRouteUrl}' in checkout configuration or this step is disabled.`);
                }
                return of(this.getUrl('checkout'));
            }
        }));
    }
    isB2BStepSet(step, isAccountPayment) {
        if (step && !step.disabled) {
            switch (step.type[0]) {
                case "paymentType" /* CheckoutStepType.PAYMENT_TYPE */: {
                    return this.isPaymentTypeSet(step);
                }
                case "deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */: {
                    return this.isDeliveryAddressAndCostCenterSet(step, isAccountPayment);
                }
                case "deliveryMode" /* CheckoutStepType.DELIVERY_MODE */: {
                    return this.isDeliveryModeSet(step);
                }
                case "paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */: {
                    return this.isPaymentDetailsSet(step);
                }
                case "reviewOrder" /* CheckoutStepType.REVIEW_ORDER */: {
                    break;
                }
            }
        }
        return of(true);
    }
    isPaymentTypeSet(step) {
        return this.checkoutPaymentTypeFacade.getSelectedPaymentTypeState().pipe(filter((state) => !state.loading), map((state) => state.data), map((paymentType) => {
            if (paymentType) {
                return true;
            }
            else {
                return this.getUrl(step.routeName);
            }
        }));
    }
    isDeliveryAddressAndCostCenterSet(step, isAccountPayment) {
        return combineLatest([
            this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(filter((state) => !state.loading), map((state) => state.data)),
            this.checkoutCostCenterFacade.getCostCenterState().pipe(filter((state) => !state.loading), map((state) => state.data)),
        ]).pipe(map(([deliveryAddress, costCenter]) => {
            if (isAccountPayment) {
                if (deliveryAddress &&
                    Object.keys(deliveryAddress).length &&
                    !!costCenter) {
                    return true;
                }
                else {
                    return this.getUrl(step.routeName);
                }
            }
            else {
                if (deliveryAddress &&
                    Object.keys(deliveryAddress).length &&
                    costCenter === undefined) {
                    return true;
                }
                else {
                    return this.getUrl(step.routeName);
                }
            }
        }));
    }
}
CheckoutB2BStepsSetGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CheckoutB2BStepsSetGuard, deps: [{ token: i1.CheckoutStepService }, { token: i2.RoutingConfigService }, { token: i3.CheckoutDeliveryAddressFacade }, { token: i3.CheckoutPaymentFacade }, { token: i3.CheckoutDeliveryModesFacade }, { token: i4.Router }, { token: i5.CheckoutPaymentTypeFacade }, { token: i5.CheckoutCostCenterFacade }, { token: i6.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutB2BStepsSetGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CheckoutB2BStepsSetGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CheckoutB2BStepsSetGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CheckoutStepService }, { type: i2.RoutingConfigService }, { type: i3.CheckoutDeliveryAddressFacade }, { type: i3.CheckoutPaymentFacade }, { type: i3.CheckoutDeliveryModesFacade }, { type: i4.Router }, { type: i5.CheckoutPaymentTypeFacade }, { type: i5.CheckoutCostCenterFacade }, { type: i6.ActiveCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtYjJiLXN0ZXBzLXNldC5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iMmIvY29tcG9uZW50cy9ndWFyZHMvY2hlY2tvdXQtYjJiLXN0ZXBzLXNldC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFZdEQsT0FBTyxFQUVMLHFCQUFxQixHQUN0QixNQUFNLHFDQUFxQyxDQUFDO0FBUzdDLE9BQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7O0FBS25FLE1BQU0sT0FBTyx3QkFDWCxTQUFRLHFCQUFxQjtJQUc3QixZQUNZLG1CQUF3QyxFQUN4QyxvQkFBMEMsRUFDMUMsNkJBQTRELEVBQzVELHFCQUE0QyxFQUM1QywyQkFBd0QsRUFDeEQsTUFBYyxFQUNkLHlCQUFvRCxFQUNwRCx3QkFBa0QsRUFDbEQsZ0JBQWtDO1FBRTVDLEtBQUssQ0FDSCxtQkFBbUIsRUFDbkIsb0JBQW9CLEVBQ3BCLDZCQUE2QixFQUM3QixxQkFBcUIsRUFDckIsMkJBQTJCLEVBQzNCLE1BQU0sRUFDTixnQkFBZ0IsQ0FDakIsQ0FBQztRQWxCUSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsa0NBQTZCLEdBQTdCLDZCQUE2QixDQUErQjtRQUM1RCwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLGdDQUEyQixHQUEzQiwyQkFBMkIsQ0FBNkI7UUFDeEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtR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LElBQ0UsZUFBZTtvQkFDZixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU07b0JBQ25DLENBQUMsQ0FBQyxVQUFVLEVBQ1o7b0JBQ0EsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU07b0JBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDcEM7YUFDRjtpQkFBTTtnQkFDTCxJQUNFLGVBQWU7b0JBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNO29CQUNuQyxVQUFVLEtBQUssU0FBUyxFQUN4QjtvQkFDQSxPQUFPLElBQUksQ0FBQztpQkFDYjtxQkFBTTtvQkFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUNwQzthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7O3FIQXBKVSx3QkFBd0I7eUhBQXhCLHdCQUF3QixjQUZ2QixNQUFNOzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsXG4gIENhbkFjdGl2YXRlLFxuICBSb3V0ZXIsXG4gIFVybFRyZWUsXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBY3RpdmVDYXJ0RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBDaGVja291dENvc3RDZW50ZXJGYWNhZGUsXG4gIENoZWNrb3V0UGF5bWVudFR5cGVGYWNhZGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYjJiL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ2hlY2tvdXRTdGVwU2VydmljZSxcbiAgQ2hlY2tvdXRTdGVwc1NldEd1YXJkLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2UvY29tcG9uZW50cyc7XG5pbXBvcnQge1xuICBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSxcbiAgQ2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlLFxuICBDaGVja291dFBheW1lbnRGYWNhZGUsXG4gIENoZWNrb3V0U3RlcCxcbiAgQ2hlY2tvdXRTdGVwVHlwZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jaGVja291dC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgUm91dGluZ0NvbmZpZ1NlcnZpY2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAsIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0QjJCU3RlcHNTZXRHdWFyZFxuICBleHRlbmRzIENoZWNrb3V0U3RlcHNTZXRHdWFyZFxuICBpbXBsZW1lbnRzIENhbkFjdGl2YXRlXG57XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjaGVja291dFN0ZXBTZXJ2aWNlOiBDaGVja291dFN0ZXBTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nQ29uZmlnU2VydmljZTogUm91dGluZ0NvbmZpZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRmFjYWRlOiBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXRQYXltZW50RmFjYWRlOiBDaGVja291dFBheW1lbnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0RGVsaXZlcnlNb2Rlc0ZhY2FkZTogQ2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlLFxuICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXRQYXltZW50VHlwZUZhY2FkZTogQ2hlY2tvdXRQYXltZW50VHlwZUZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXRDb3N0Q2VudGVyRmFjYWRlOiBDaGVja291dENvc3RDZW50ZXJGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRGYWNhZGU6IEFjdGl2ZUNhcnRGYWNhZGVcbiAgKSB7XG4gICAgc3VwZXIoXG4gICAgICBjaGVja291dFN0ZXBTZXJ2aWNlLFxuICAgICAgcm91dGluZ0NvbmZpZ1NlcnZpY2UsXG4gICAgICBjaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSxcbiAgICAgIGNoZWNrb3V0UGF5bWVudEZhY2FkZSxcbiAgICAgIGNoZWNrb3V0RGVsaXZlcnlNb2Rlc0ZhY2FkZSxcbiAgICAgIHJvdXRlcixcbiAgICAgIGFjdGl2ZUNhcnRGYWNhZGVcbiAgICApO1xuICB9XG5cbiAgY2FuQWN0aXZhdGUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgbGV0IGN1cnJlbnRJbmRleCA9IC0xO1xuICAgIGNvbnN0IGN1cnJlbnRSb3V0ZVVybCA9ICcvJyArIHJvdXRlLnVybC5qb2luKCcvJyk7XG5cbiAgICAvLyBjaGVjayB3aGV0aGVyIHRoZSBwcmV2aW91cyBzdGVwIGlzIHNldFxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMuY2hlY2tvdXRTdGVwU2VydmljZS5zdGVwcyQsXG4gICAgICB0aGlzLmNoZWNrb3V0UGF5bWVudFR5cGVGYWNhZGUuaXNBY2NvdW50UGF5bWVudCgpLFxuICAgIF0pLnBpcGUoXG4gICAgICB0YXAoKFssIGlzQWNjb3VudF0pID0+IHtcbiAgICAgICAgdGhpcy5jaGVja291dFN0ZXBTZXJ2aWNlLmRpc2FibGVFbmFibGVTdGVwKFxuICAgICAgICAgIENoZWNrb3V0U3RlcFR5cGUuUEFZTUVOVF9ERVRBSUxTLFxuICAgICAgICAgIGlzQWNjb3VudFxuICAgICAgICApO1xuICAgICAgfSksXG4gICAgICB0YWtlKDEpLFxuICAgICAgc3dpdGNoTWFwKChbc3RlcHMsIGlzQWNjb3VudF0pID0+IHtcbiAgICAgICAgY3VycmVudEluZGV4ID0gc3RlcHMuZmluZEluZGV4KChzdGVwKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RlcFJvdXRlVXJsID0gYC8ke1xuICAgICAgICAgICAgdGhpcy5yb3V0aW5nQ29uZmlnU2VydmljZS5nZXRSb3V0ZUNvbmZpZyhzdGVwLnJvdXRlTmFtZSk/LnBhdGhzPy5bMF1cbiAgICAgICAgICB9YDtcbiAgICAgICAgICByZXR1cm4gc3RlcFJvdXRlVXJsID09PSBjdXJyZW50Um91dGVVcmw7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBnZXQgY3VycmVudCBzdGVwXG4gICAgICAgIGxldCBjdXJyZW50U3RlcDtcbiAgICAgICAgaWYgKGN1cnJlbnRJbmRleCA+PSAwKSB7XG4gICAgICAgICAgY3VycmVudFN0ZXAgPSBzdGVwc1tjdXJyZW50SW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChCb29sZWFuKGN1cnJlbnRTdGVwKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmlzQjJCU3RlcFNldChzdGVwc1tjdXJyZW50SW5kZXggLSAxXSwgaXNBY2NvdW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYE1pc3Npbmcgc3RlcCB3aXRoIHJvdXRlICcke2N1cnJlbnRSb3V0ZVVybH0nIGluIGNoZWNrb3V0IGNvbmZpZ3VyYXRpb24gb3IgdGhpcyBzdGVwIGlzIGRpc2FibGVkLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBvZih0aGlzLmdldFVybCgnY2hlY2tvdXQnKSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpc0IyQlN0ZXBTZXQoXG4gICAgc3RlcDogQ2hlY2tvdXRTdGVwLFxuICAgIGlzQWNjb3VudFBheW1lbnQ6IGJvb2xlYW5cbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgVXJsVHJlZT4ge1xuICAgIGlmIChzdGVwICYmICFzdGVwLmRpc2FibGVkKSB7XG4gICAgICBzd2l0Y2ggKHN0ZXAudHlwZVswXSkge1xuICAgICAgICBjYXNlIENoZWNrb3V0U3RlcFR5cGUuUEFZTUVOVF9UWVBFOiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaXNQYXltZW50VHlwZVNldChzdGVwKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoZWNrb3V0U3RlcFR5cGUuREVMSVZFUllfQUREUkVTUzoge1xuICAgICAgICAgIHJldHVybiB0aGlzLmlzRGVsaXZlcnlBZGRyZXNzQW5kQ29zdENlbnRlclNldChzdGVwLCBpc0FjY291bnRQYXltZW50KTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoZWNrb3V0U3RlcFR5cGUuREVMSVZFUllfTU9ERToge1xuICAgICAgICAgIHJldHVybiB0aGlzLmlzRGVsaXZlcnlNb2RlU2V0KHN0ZXApO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hlY2tvdXRTdGVwVHlwZS5QQVlNRU5UX0RFVEFJTFM6IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pc1BheW1lbnREZXRhaWxzU2V0KHN0ZXApO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hlY2tvdXRTdGVwVHlwZS5SRVZJRVdfT1JERVI6IHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2YodHJ1ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNQYXltZW50VHlwZVNldChcbiAgICBzdGVwOiBDaGVja291dFN0ZXBcbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuIHwgVXJsVHJlZT4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrb3V0UGF5bWVudFR5cGVGYWNhZGUuZ2V0U2VsZWN0ZWRQYXltZW50VHlwZVN0YXRlKCkucGlwZShcbiAgICAgIGZpbHRlcigoc3RhdGUpID0+ICFzdGF0ZS5sb2FkaW5nKSxcbiAgICAgIG1hcCgoc3RhdGUpID0+IHN0YXRlLmRhdGEpLFxuICAgICAgbWFwKChwYXltZW50VHlwZSkgPT4ge1xuICAgICAgICBpZiAocGF5bWVudFR5cGUpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVcmwoc3RlcC5yb3V0ZU5hbWUpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNEZWxpdmVyeUFkZHJlc3NBbmRDb3N0Q2VudGVyU2V0KFxuICAgIHN0ZXA6IENoZWNrb3V0U3RlcCxcbiAgICBpc0FjY291bnRQYXltZW50OiBib29sZWFuXG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLmNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRmFjYWRlLmdldERlbGl2ZXJ5QWRkcmVzc1N0YXRlKCkucGlwZShcbiAgICAgICAgZmlsdGVyKChzdGF0ZSkgPT4gIXN0YXRlLmxvYWRpbmcpLFxuICAgICAgICBtYXAoKHN0YXRlKSA9PiBzdGF0ZS5kYXRhKVxuICAgICAgKSxcbiAgICAgIHRoaXMuY2hlY2tvdXRDb3N0Q2VudGVyRmFjYWRlLmdldENvc3RDZW50ZXJTdGF0ZSgpLnBpcGUoXG4gICAgICAgIGZpbHRlcigoc3RhdGUpID0+ICFzdGF0ZS5sb2FkaW5nKSxcbiAgICAgICAgbWFwKChzdGF0ZSkgPT4gc3RhdGUuZGF0YSlcbiAgICAgICksXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW2RlbGl2ZXJ5QWRkcmVzcywgY29zdENlbnRlcl0pID0+IHtcbiAgICAgICAgaWYgKGlzQWNjb3VudFBheW1lbnQpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBkZWxpdmVyeUFkZHJlc3MgJiZcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRlbGl2ZXJ5QWRkcmVzcykubGVuZ3RoICYmXG4gICAgICAgICAgICAhIWNvc3RDZW50ZXJcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVcmwoc3RlcC5yb3V0ZU5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBkZWxpdmVyeUFkZHJlc3MgJiZcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGRlbGl2ZXJ5QWRkcmVzcykubGVuZ3RoICYmXG4gICAgICAgICAgICBjb3N0Q2VudGVyID09PSB1bmRlZmluZWRcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVcmwoc3RlcC5yb3V0ZU5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG59XG4iXX0=