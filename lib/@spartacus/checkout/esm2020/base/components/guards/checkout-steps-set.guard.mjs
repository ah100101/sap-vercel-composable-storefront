/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import { of } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, take, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/checkout-step.service";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/checkout/base/root";
import * as i4 from "@angular/router";
import * as i5 from "@spartacus/cart/base/root";
export class CheckoutStepsSetGuard {
    constructor(checkoutStepService, routingConfigService, checkoutDeliveryAddressFacade, checkoutPaymentFacade, checkoutDeliveryModesFacade, router, activeCartFacade) {
        this.checkoutStepService = checkoutStepService;
        this.routingConfigService = routingConfigService;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.checkoutPaymentFacade = checkoutPaymentFacade;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.router = router;
        this.activeCartFacade = activeCartFacade;
        this.subscription = this.activeCartFacade
            .hasDeliveryItems()
            .pipe(distinctUntilChanged())
            .subscribe((hasDeliveryItems) => {
            this.checkoutStepService.disableEnableStep("deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */, !hasDeliveryItems);
            this.checkoutStepService.disableEnableStep("deliveryMode" /* CheckoutStepType.DELIVERY_MODE */, !hasDeliveryItems);
            this.setStepNameMultiLine("paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */, hasDeliveryItems);
            this.setStepNameMultiLine("reviewOrder" /* CheckoutStepType.REVIEW_ORDER */, hasDeliveryItems);
        });
    }
    canActivate(route) {
        let currentIndex = -1;
        const currentRouteUrl = '/' + route.url.join('/');
        // check whether the previous step is set
        return this.checkoutStepService.steps$.pipe(take(1), switchMap((steps) => {
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
                return this.isStepSet(steps[currentIndex - 1]);
            }
            else {
                if (isDevMode()) {
                    console.warn(`Missing step with route '${currentRouteUrl}' in checkout configuration or this step is disabled.`);
                }
                return of(this.getUrl('checkout'));
            }
        }));
    }
    isStepSet(step) {
        if (step && !step.disabled) {
            switch (step.type[0]) {
                case "deliveryAddress" /* CheckoutStepType.DELIVERY_ADDRESS */: {
                    return this.isDeliveryAddress(step);
                }
                case "deliveryMode" /* CheckoutStepType.DELIVERY_MODE */: {
                    return this.isDeliveryModeSet(step);
                }
                case "paymentDetails" /* CheckoutStepType.PAYMENT_DETAILS */: {
                    if (this.checkoutStepService.getCheckoutStep("deliveryMode" /* CheckoutStepType.DELIVERY_MODE */)?.disabled) {
                        this.checkoutDeliveryModesFacade.setDeliveryMode('pickup');
                    }
                    return this.isPaymentDetailsSet(step);
                }
                case "reviewOrder" /* CheckoutStepType.REVIEW_ORDER */: {
                    break;
                }
            }
        }
        return of(true);
    }
    isDeliveryAddress(step) {
        return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(filter((state) => !state.loading), map((state) => state.data), map((deliveryAddress) => {
            if (deliveryAddress && Object.keys(deliveryAddress).length) {
                return true;
            }
            else {
                return this.getUrl(step.routeName);
            }
        }));
    }
    isDeliveryModeSet(step) {
        return this.checkoutDeliveryModesFacade.getSelectedDeliveryModeState().pipe(filter((state) => !state.loading), map((state) => state.data), map((mode) => (mode ? true : this.getUrl(step.routeName))));
    }
    isPaymentDetailsSet(step) {
        return this.checkoutPaymentFacade.getPaymentDetailsState().pipe(filter((state) => !state.loading), map((state) => state.data), map((paymentDetails) => paymentDetails && Object.keys(paymentDetails).length !== 0
            ? true
            : this.getUrl(step.routeName)));
    }
    getUrl(routeName) {
        return this.router.parseUrl(this.routingConfigService.getRouteConfig(routeName)?.paths?.[0]);
    }
    setStepNameMultiLine(stepType, value) {
        const step = this.checkoutStepService.getCheckoutStep(stepType);
        if (step) {
            step.nameMultiLine = value;
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CheckoutStepsSetGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CheckoutStepsSetGuard, deps: [{ token: i1.CheckoutStepService }, { token: i2.RoutingConfigService }, { token: i3.CheckoutDeliveryAddressFacade }, { token: i3.CheckoutPaymentFacade }, { token: i3.CheckoutDeliveryModesFacade }, { token: i4.Router }, { token: i5.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutStepsSetGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CheckoutStepsSetGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CheckoutStepsSetGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CheckoutStepService }, { type: i2.RoutingConfigService }, { type: i3.CheckoutDeliveryAddressFacade }, { type: i3.CheckoutPaymentFacade }, { type: i3.CheckoutDeliveryModesFacade }, { type: i4.Router }, { type: i5.ActiveCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtc3RlcHMtc2V0Lmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2UvY29tcG9uZW50cy9ndWFyZHMvY2hlY2tvdXQtc3RlcHMtc2V0Lmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQWdCakUsT0FBTyxFQUFjLEVBQUUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDcEQsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sR0FBRyxFQUNILFNBQVMsRUFDVCxJQUFJLEdBQ0wsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQU14QixNQUFNLE9BQU8scUJBQXFCO0lBR2hDLFlBQ1ksbUJBQXdDLEVBQ3hDLG9CQUEwQyxFQUMxQyw2QkFBNEQsRUFDNUQscUJBQTRDLEVBQzVDLDJCQUF3RCxFQUN4RCxNQUFjLEVBQ2QsZ0JBQWtDO1FBTmxDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUMxQyxrQ0FBNkIsR0FBN0IsNkJBQTZCLENBQStCO1FBQzVELDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFDNUMsZ0NBQTJCLEdBQTNCLDJCQUEyQixDQUE2QjtRQUN4RCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUU1QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0I7YUFDdEMsZ0JBQWdCLEVBQUU7YUFDbEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7YUFDNUIsU0FBUyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLDREQUV4QyxDQUFDLGdCQUFnQixDQUNsQixDQUFDO1lBQ0YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixzREFFeEMsQ0FBQyxnQkFBZ0IsQ0FDbEIsQ0FBQztZQUVGLElBQUksQ0FBQyxvQkFBb0IsMERBRXZCLGdCQUFnQixDQUNqQixDQUFDO1lBQ0YsSUFBSSxDQUFDLG9CQUFvQixvREFFdkIsZ0JBQWdCLENBQ2pCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXLENBQUMsS0FBNkI7UUFDdkMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEIsTUFBTSxlQUFlLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWxELHlDQUF5QztRQUN6QyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUN6QyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbEIsWUFBWSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDdEMsTUFBTSxZQUFZLEdBQUcsSUFDbkIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUNyRSxFQUFFLENBQUM7Z0JBQ0gsT0FBTyxZQUFZLEtBQUssZUFBZSxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsbUJBQW1CO1lBQ25CLElBQUksV0FBVyxDQUFDO1lBQ2hCLElBQUksWUFBWSxJQUFJLENBQUMsRUFBRTtnQkFDckIsV0FBVyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNuQztZQUNELElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUN4QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2hEO2lCQUFNO2dCQUNMLElBQUksU0FBUyxFQUFFLEVBQUU7b0JBQ2YsT0FBTyxDQUFDLElBQUksQ0FDViw0QkFBNEIsZUFBZSx1REFBdUQsQ0FDbkcsQ0FBQztpQkFDSDtnQkFDRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7YUFDcEM7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVTLFNBQVMsQ0FBQyxJQUFrQjtRQUNwQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDMUIsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNwQiw4REFBc0MsQ0FBQyxDQUFDO29CQUN0QyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDckM7Z0JBQ0Qsd0RBQW1DLENBQUMsQ0FBQztvQkFDbkMsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3JDO2dCQUNELDREQUFxQyxDQUFDLENBQUM7b0JBQ3JDLElBQ0UsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUscURBRXZDLEVBQUUsUUFBUSxFQUNYO3dCQUNBLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQzVEO29CQUVELE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN2QztnQkFDRCxzREFBa0MsQ0FBQyxDQUFDO29CQUNsQyxNQUFNO2lCQUNQO2FBQ0Y7U0FDRjtRQUNELE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFUyxpQkFBaUIsQ0FDekIsSUFBa0I7UUFFbEIsT0FBTyxJQUFJLENBQUMsNkJBQTZCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxJQUFJLENBQ3RFLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQ2pDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUMxQixHQUFHLENBQUMsQ0FBQyxlQUFlLEVBQUUsRUFBRTtZQUN0QixJQUFJLGVBQWUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sRUFBRTtnQkFDMUQsT0FBTyxJQUFJLENBQUM7YUFDYjtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFUyxpQkFBaUIsQ0FDekIsSUFBa0I7UUFFbEIsT0FBTyxJQUFJLENBQUMsMkJBQTJCLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxJQUFJLENBQ3pFLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQ2pDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUMxQixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FDM0QsQ0FBQztJQUNKLENBQUM7SUFFUyxtQkFBbUIsQ0FDM0IsSUFBa0I7UUFFbEIsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxJQUFJLENBQzdELE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQ2pDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUMxQixHQUFHLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUNyQixjQUFjLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUN4RCxDQUFDLENBQUMsSUFBSTtZQUNOLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FDaEMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVTLE1BQU0sQ0FBQyxTQUFpQjtRQUNoQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUN6QixJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBVyxDQUMxRSxDQUFDO0lBQ0osQ0FBQztJQUVTLG9CQUFvQixDQUM1QixRQUEwQixFQUMxQixLQUFjO1FBRWQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRSxJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7O2tIQTNKVSxxQkFBcUI7c0hBQXJCLHFCQUFxQixjQUZwQixNQUFNOzJGQUVQLHFCQUFxQjtrQkFIakMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpc0Rldk1vZGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcbiAgQ2FuQWN0aXZhdGUsXG4gIFJvdXRlcixcbiAgVXJsVHJlZSxcbn0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFjdGl2ZUNhcnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRmFjYWRlLFxuICBDaGVja291dERlbGl2ZXJ5TW9kZXNGYWNhZGUsXG4gIENoZWNrb3V0UGF5bWVudEZhY2FkZSxcbiAgQ2hlY2tvdXRTdGVwLFxuICBDaGVja291dFN0ZXBUeXBlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBSb3V0aW5nQ29uZmlnU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHN3aXRjaE1hcCxcbiAgdGFrZSxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2hlY2tvdXRTdGVwU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NoZWNrb3V0LXN0ZXAuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dFN0ZXBzU2V0R3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSwgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjaGVja291dFN0ZXBTZXJ2aWNlOiBDaGVja291dFN0ZXBTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nQ29uZmlnU2VydmljZTogUm91dGluZ0NvbmZpZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRmFjYWRlOiBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXRQYXltZW50RmFjYWRlOiBDaGVja291dFBheW1lbnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0RGVsaXZlcnlNb2Rlc0ZhY2FkZTogQ2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlLFxuICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZVxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuYWN0aXZlQ2FydEZhY2FkZVxuICAgICAgLmhhc0RlbGl2ZXJ5SXRlbXMoKVxuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSlcbiAgICAgIC5zdWJzY3JpYmUoKGhhc0RlbGl2ZXJ5SXRlbXMpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja291dFN0ZXBTZXJ2aWNlLmRpc2FibGVFbmFibGVTdGVwKFxuICAgICAgICAgIENoZWNrb3V0U3RlcFR5cGUuREVMSVZFUllfQUREUkVTUyxcbiAgICAgICAgICAhaGFzRGVsaXZlcnlJdGVtc1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmNoZWNrb3V0U3RlcFNlcnZpY2UuZGlzYWJsZUVuYWJsZVN0ZXAoXG4gICAgICAgICAgQ2hlY2tvdXRTdGVwVHlwZS5ERUxJVkVSWV9NT0RFLFxuICAgICAgICAgICFoYXNEZWxpdmVyeUl0ZW1zXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGVwTmFtZU11bHRpTGluZShcbiAgICAgICAgICBDaGVja291dFN0ZXBUeXBlLlBBWU1FTlRfREVUQUlMUyxcbiAgICAgICAgICBoYXNEZWxpdmVyeUl0ZW1zXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2V0U3RlcE5hbWVNdWx0aUxpbmUoXG4gICAgICAgICAgQ2hlY2tvdXRTdGVwVHlwZS5SRVZJRVdfT1JERVIsXG4gICAgICAgICAgaGFzRGVsaXZlcnlJdGVtc1xuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICBsZXQgY3VycmVudEluZGV4ID0gLTE7XG4gICAgY29uc3QgY3VycmVudFJvdXRlVXJsID0gJy8nICsgcm91dGUudXJsLmpvaW4oJy8nKTtcblxuICAgIC8vIGNoZWNrIHdoZXRoZXIgdGhlIHByZXZpb3VzIHN0ZXAgaXMgc2V0XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tvdXRTdGVwU2VydmljZS5zdGVwcyQucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBzd2l0Y2hNYXAoKHN0ZXBzKSA9PiB7XG4gICAgICAgIGN1cnJlbnRJbmRleCA9IHN0ZXBzLmZpbmRJbmRleCgoc3RlcCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHN0ZXBSb3V0ZVVybCA9IGAvJHtcbiAgICAgICAgICAgIHRoaXMucm91dGluZ0NvbmZpZ1NlcnZpY2UuZ2V0Um91dGVDb25maWcoc3RlcC5yb3V0ZU5hbWUpPy5wYXRocz8uWzBdXG4gICAgICAgICAgfWA7XG4gICAgICAgICAgcmV0dXJuIHN0ZXBSb3V0ZVVybCA9PT0gY3VycmVudFJvdXRlVXJsO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gZ2V0IGN1cnJlbnQgc3RlcFxuICAgICAgICBsZXQgY3VycmVudFN0ZXA7XG4gICAgICAgIGlmIChjdXJyZW50SW5kZXggPj0gMCkge1xuICAgICAgICAgIGN1cnJlbnRTdGVwID0gc3RlcHNbY3VycmVudEluZGV4XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQm9vbGVhbihjdXJyZW50U3RlcCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pc1N0ZXBTZXQoc3RlcHNbY3VycmVudEluZGV4IC0gMV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICBgTWlzc2luZyBzdGVwIHdpdGggcm91dGUgJyR7Y3VycmVudFJvdXRlVXJsfScgaW4gY2hlY2tvdXQgY29uZmlndXJhdGlvbiBvciB0aGlzIHN0ZXAgaXMgZGlzYWJsZWQuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG9mKHRoaXMuZ2V0VXJsKCdjaGVja291dCcpKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzU3RlcFNldChzdGVwOiBDaGVja291dFN0ZXApOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgaWYgKHN0ZXAgJiYgIXN0ZXAuZGlzYWJsZWQpIHtcbiAgICAgIHN3aXRjaCAoc3RlcC50eXBlWzBdKSB7XG4gICAgICAgIGNhc2UgQ2hlY2tvdXRTdGVwVHlwZS5ERUxJVkVSWV9BRERSRVNTOiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaXNEZWxpdmVyeUFkZHJlc3Moc3RlcCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSBDaGVja291dFN0ZXBUeXBlLkRFTElWRVJZX01PREU6IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pc0RlbGl2ZXJ5TW9kZVNldChzdGVwKTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlIENoZWNrb3V0U3RlcFR5cGUuUEFZTUVOVF9ERVRBSUxTOiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5jaGVja291dFN0ZXBTZXJ2aWNlLmdldENoZWNrb3V0U3RlcChcbiAgICAgICAgICAgICAgQ2hlY2tvdXRTdGVwVHlwZS5ERUxJVkVSWV9NT0RFXG4gICAgICAgICAgICApPy5kaXNhYmxlZFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy5jaGVja291dERlbGl2ZXJ5TW9kZXNGYWNhZGUuc2V0RGVsaXZlcnlNb2RlKCdwaWNrdXAnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5pc1BheW1lbnREZXRhaWxzU2V0KHN0ZXApO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgQ2hlY2tvdXRTdGVwVHlwZS5SRVZJRVdfT1JERVI6IHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2YodHJ1ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNEZWxpdmVyeUFkZHJlc3MoXG4gICAgc3RlcDogQ2hlY2tvdXRTdGVwXG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICByZXR1cm4gdGhpcy5jaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZS5nZXREZWxpdmVyeUFkZHJlc3NTdGF0ZSgpLnBpcGUoXG4gICAgICBmaWx0ZXIoKHN0YXRlKSA9PiAhc3RhdGUubG9hZGluZyksXG4gICAgICBtYXAoKHN0YXRlKSA9PiBzdGF0ZS5kYXRhKSxcbiAgICAgIG1hcCgoZGVsaXZlcnlBZGRyZXNzKSA9PiB7XG4gICAgICAgIGlmIChkZWxpdmVyeUFkZHJlc3MgJiYgT2JqZWN0LmtleXMoZGVsaXZlcnlBZGRyZXNzKS5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVcmwoc3RlcC5yb3V0ZU5hbWUpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNEZWxpdmVyeU1vZGVTZXQoXG4gICAgc3RlcDogQ2hlY2tvdXRTdGVwXG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICByZXR1cm4gdGhpcy5jaGVja291dERlbGl2ZXJ5TW9kZXNGYWNhZGUuZ2V0U2VsZWN0ZWREZWxpdmVyeU1vZGVTdGF0ZSgpLnBpcGUoXG4gICAgICBmaWx0ZXIoKHN0YXRlKSA9PiAhc3RhdGUubG9hZGluZyksXG4gICAgICBtYXAoKHN0YXRlKSA9PiBzdGF0ZS5kYXRhKSxcbiAgICAgIG1hcCgobW9kZSkgPT4gKG1vZGUgPyB0cnVlIDogdGhpcy5nZXRVcmwoc3RlcC5yb3V0ZU5hbWUpKSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGlzUGF5bWVudERldGFpbHNTZXQoXG4gICAgc3RlcDogQ2hlY2tvdXRTdGVwXG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICByZXR1cm4gdGhpcy5jaGVja291dFBheW1lbnRGYWNhZGUuZ2V0UGF5bWVudERldGFpbHNTdGF0ZSgpLnBpcGUoXG4gICAgICBmaWx0ZXIoKHN0YXRlKSA9PiAhc3RhdGUubG9hZGluZyksXG4gICAgICBtYXAoKHN0YXRlKSA9PiBzdGF0ZS5kYXRhKSxcbiAgICAgIG1hcCgocGF5bWVudERldGFpbHMpID0+XG4gICAgICAgIHBheW1lbnREZXRhaWxzICYmIE9iamVjdC5rZXlzKHBheW1lbnREZXRhaWxzKS5sZW5ndGggIT09IDBcbiAgICAgICAgICA/IHRydWVcbiAgICAgICAgICA6IHRoaXMuZ2V0VXJsKHN0ZXAucm91dGVOYW1lKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0VXJsKHJvdXRlTmFtZTogc3RyaW5nKTogVXJsVHJlZSB7XG4gICAgcmV0dXJuIHRoaXMucm91dGVyLnBhcnNlVXJsKFxuICAgICAgdGhpcy5yb3V0aW5nQ29uZmlnU2VydmljZS5nZXRSb3V0ZUNvbmZpZyhyb3V0ZU5hbWUpPy5wYXRocz8uWzBdIGFzIHN0cmluZ1xuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0U3RlcE5hbWVNdWx0aUxpbmUoXG4gICAgc3RlcFR5cGU6IENoZWNrb3V0U3RlcFR5cGUsXG4gICAgdmFsdWU6IGJvb2xlYW5cbiAgKTogdm9pZCB7XG4gICAgY29uc3Qgc3RlcCA9IHRoaXMuY2hlY2tvdXRTdGVwU2VydmljZS5nZXRDaGVja291dFN0ZXAoc3RlcFR5cGUpO1xuICAgIGlmIChzdGVwKSB7XG4gICAgICBzdGVwLm5hbWVNdWx0aUxpbmUgPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=