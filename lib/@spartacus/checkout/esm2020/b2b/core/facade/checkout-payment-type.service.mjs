/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { B2BPaymentTypeEnum, CheckoutPaymentTypeSetEvent, CheckoutPaymentTypesQueryReloadEvent, CheckoutPaymentTypesQueryResetEvent, } from '@spartacus/checkout/b2b/root';
import { CommandStrategy, OCC_USER_ID_ANONYMOUS, } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "../connectors/checkout-payment-type/checkout-payment-type.connector";
import * as i4 from "@spartacus/checkout/base/root";
export class CheckoutPaymentTypeService {
    getCheckoutPaymentTypesQueryReloadEvents() {
        return [CheckoutPaymentTypesQueryReloadEvent];
    }
    getCheckoutPaymentTypesQueryResetEvents() {
        return [CheckoutPaymentTypesQueryResetEvent];
    }
    constructor(activeCartFacade, userIdService, queryService, commandService, paymentTypeConnector, eventService, checkoutQueryFacade) {
        this.activeCartFacade = activeCartFacade;
        this.userIdService = userIdService;
        this.queryService = queryService;
        this.commandService = commandService;
        this.paymentTypeConnector = paymentTypeConnector;
        this.eventService = eventService;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.paymentTypesQuery = this.queryService.create(() => this.paymentTypeConnector.getPaymentTypes(), {
            reloadOn: this.getCheckoutPaymentTypesQueryReloadEvents(),
            resetOn: this.getCheckoutPaymentTypesQueryResetEvents(),
        });
        this.setPaymentTypeCommand = this.commandService.create(({ paymentTypeCode, purchaseOrderNumber }) => this.checkoutPreconditions().pipe(switchMap(([userId, cartId]) => this.paymentTypeConnector
            .setPaymentType(userId, cartId, paymentTypeCode, purchaseOrderNumber)
            .pipe(tap(() => this.eventService.dispatch({
            userId,
            cartId,
            paymentTypeCode,
            purchaseOrderNumber,
        }, CheckoutPaymentTypeSetEvent))))), {
            strategy: CommandStrategy.CancelPrevious,
        });
    }
    checkoutPreconditions() {
        return combineLatest([
            this.userIdService.takeUserId(),
            this.activeCartFacade.takeActiveCartId(),
            this.activeCartFacade.isGuestCart(),
        ]).pipe(take(1), map(([userId, cartId, isGuestCart]) => {
            if (!userId ||
                !cartId ||
                (userId === OCC_USER_ID_ANONYMOUS && !isGuestCart)) {
                throw new Error('Checkout conditions not met');
            }
            return [userId, cartId];
        }));
    }
    getPaymentTypesState() {
        return this.paymentTypesQuery.getState();
    }
    getPaymentTypes() {
        return this.getPaymentTypesState().pipe(map((state) => state.data ?? []));
    }
    setPaymentType(paymentTypeCode, purchaseOrderNumber) {
        return this.setPaymentTypeCommand.execute({
            paymentTypeCode,
            purchaseOrderNumber,
        });
    }
    getSelectedPaymentTypeState() {
        return this.checkoutQueryFacade
            .getCheckoutDetailsState()
            .pipe(map((state) => ({ ...state, data: state.data?.paymentType })));
    }
    isAccountPayment() {
        return this.getSelectedPaymentTypeState().pipe(filter((state) => !state.loading), map((state) => state.data?.code === B2BPaymentTypeEnum.ACCOUNT_PAYMENT));
    }
    getPurchaseOrderNumberState() {
        return this.checkoutQueryFacade
            .getCheckoutDetailsState()
            .pipe(map((state) => ({ ...state, data: state.data?.purchaseOrderNumber })));
    }
}
CheckoutPaymentTypeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CheckoutPaymentTypeService, deps: [{ token: i1.ActiveCartFacade }, { token: i2.UserIdService }, { token: i2.QueryService }, { token: i2.CommandService }, { token: i3.CheckoutPaymentTypeConnector }, { token: i2.EventService }, { token: i4.CheckoutQueryFacade }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutPaymentTypeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CheckoutPaymentTypeService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CheckoutPaymentTypeService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.ActiveCartFacade }, { type: i2.UserIdService }, { type: i2.QueryService }, { type: i2.CommandService }, { type: i3.CheckoutPaymentTypeConnector }, { type: i2.EventService }, { type: i4.CheckoutQueryFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtcGF5bWVudC10eXBlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYjJiL2NvcmUvZmFjYWRlL2NoZWNrb3V0LXBheW1lbnQtdHlwZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxrQkFBa0IsRUFFbEIsMkJBQTJCLEVBQzNCLG9DQUFvQyxFQUNwQyxtQ0FBbUMsR0FDcEMsTUFBTSw4QkFBOEIsQ0FBQztBQUV0QyxPQUFPLEVBR0wsZUFBZSxFQUVmLHFCQUFxQixHQU10QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBSW5FLE1BQU0sT0FBTywwQkFBMEI7SUFDM0Isd0NBQXdDO1FBQ2hELE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDUyx1Q0FBdUM7UUFDL0MsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQStDRCxZQUNZLGdCQUFrQyxFQUNsQyxhQUE0QixFQUM1QixZQUEwQixFQUMxQixjQUE4QixFQUM5QixvQkFBa0QsRUFDbEQsWUFBMEIsRUFDMUIsbUJBQXdDO1FBTnhDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBOEI7UUFDbEQsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQXBEMUMsc0JBQWlCLEdBQXlCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUMxRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxFQUFFLEVBQ2pEO1lBQ0UsUUFBUSxFQUFFLElBQUksQ0FBQyx3Q0FBd0MsRUFBRTtZQUN6RCxPQUFPLEVBQUUsSUFBSSxDQUFDLHVDQUF1QyxFQUFFO1NBQ3hELENBQ0YsQ0FBQztRQUVRLDBCQUFxQixHQUczQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FJNUIsQ0FBQyxFQUFFLGVBQWUsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLEVBQUUsQ0FDM0MsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxDQUMvQixTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQzdCLElBQUksQ0FBQyxvQkFBb0I7YUFDdEIsY0FBYyxDQUNiLE1BQU0sRUFDTixNQUFNLEVBQ04sZUFBZSxFQUNmLG1CQUFtQixDQUNwQjthQUNBLElBQUksQ0FDSCxHQUFHLENBQUMsR0FBRyxFQUFFLENBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQ3hCO1lBQ0UsTUFBTTtZQUNOLE1BQU07WUFDTixlQUFlO1lBQ2YsbUJBQW1CO1NBQ3BCLEVBQ0QsMkJBQTJCLENBQzVCLENBQ0YsQ0FDRixDQUNKLENBQ0YsRUFDSDtZQUNFLFFBQVEsRUFBRSxlQUFlLENBQUMsY0FBYztTQUN6QyxDQUNGLENBQUM7SUFVQyxDQUFDO0lBRU0scUJBQXFCO1FBQzdCLE9BQU8sYUFBYSxDQUFDO1lBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFO1NBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQ0wsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFO1lBQ3BDLElBQ0UsQ0FBQyxNQUFNO2dCQUNQLENBQUMsTUFBTTtnQkFDUCxDQUFDLE1BQU0sS0FBSyxxQkFBcUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUNsRDtnQkFDQSxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7YUFDaEQ7WUFDRCxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsb0JBQW9CO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELGNBQWMsQ0FDWixlQUFtQyxFQUNuQyxtQkFBNEI7UUFFNUIsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsT0FBTyxDQUFDO1lBQ3hDLGVBQWU7WUFDZixtQkFBbUI7U0FDcEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDJCQUEyQjtRQUd6QixPQUFPLElBQUksQ0FBQyxtQkFBbUI7YUFDNUIsdUJBQXVCLEVBQUU7YUFDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxPQUFPLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDLElBQUksQ0FDNUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFDakMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksS0FBSyxrQkFBa0IsQ0FBQyxlQUFlLENBQUMsQ0FDeEUsQ0FBQztJQUNKLENBQUM7SUFFRCwyQkFBMkI7UUFDekIsT0FBTyxJQUFJLENBQUMsbUJBQW1CO2FBQzVCLHVCQUF1QixFQUFFO2FBQ3pCLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUMsQ0FDdEUsQ0FBQztJQUNOLENBQUM7O3VIQTFIVSwwQkFBMEI7MkhBQTFCLDBCQUEwQjsyRkFBMUIsMEJBQTBCO2tCQUR0QyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZlQ2FydEZhY2FkZSwgUGF5bWVudFR5cGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIEIyQlBheW1lbnRUeXBlRW51bSxcbiAgQ2hlY2tvdXRQYXltZW50VHlwZUZhY2FkZSxcbiAgQ2hlY2tvdXRQYXltZW50VHlwZVNldEV2ZW50LFxuICBDaGVja291dFBheW1lbnRUeXBlc1F1ZXJ5UmVsb2FkRXZlbnQsXG4gIENoZWNrb3V0UGF5bWVudFR5cGVzUXVlcnlSZXNldEV2ZW50LFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2IyYi9yb290JztcbmltcG9ydCB7IENoZWNrb3V0UXVlcnlGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBDb21tYW5kLFxuICBDb21tYW5kU2VydmljZSxcbiAgQ29tbWFuZFN0cmF0ZWd5LFxuICBFdmVudFNlcnZpY2UsXG4gIE9DQ19VU0VSX0lEX0FOT05ZTU9VUyxcbiAgUXVlcnksXG4gIFF1ZXJ5Tm90aWZpZXIsXG4gIFF1ZXJ5U2VydmljZSxcbiAgUXVlcnlTdGF0ZSxcbiAgVXNlcklkU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAsIHRha2UsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENoZWNrb3V0UGF5bWVudFR5cGVDb25uZWN0b3IgfSBmcm9tICcuLi9jb25uZWN0b3JzL2NoZWNrb3V0LXBheW1lbnQtdHlwZS9jaGVja291dC1wYXltZW50LXR5cGUuY29ubmVjdG9yJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0UGF5bWVudFR5cGVTZXJ2aWNlIGltcGxlbWVudHMgQ2hlY2tvdXRQYXltZW50VHlwZUZhY2FkZSB7XG4gIHByb3RlY3RlZCBnZXRDaGVja291dFBheW1lbnRUeXBlc1F1ZXJ5UmVsb2FkRXZlbnRzKCk6IFF1ZXJ5Tm90aWZpZXJbXSB7XG4gICAgcmV0dXJuIFtDaGVja291dFBheW1lbnRUeXBlc1F1ZXJ5UmVsb2FkRXZlbnRdO1xuICB9XG4gIHByb3RlY3RlZCBnZXRDaGVja291dFBheW1lbnRUeXBlc1F1ZXJ5UmVzZXRFdmVudHMoKTogUXVlcnlOb3RpZmllcltdIHtcbiAgICByZXR1cm4gW0NoZWNrb3V0UGF5bWVudFR5cGVzUXVlcnlSZXNldEV2ZW50XTtcbiAgfVxuXG4gIHByb3RlY3RlZCBwYXltZW50VHlwZXNRdWVyeTogUXVlcnk8UGF5bWVudFR5cGVbXT4gPSB0aGlzLnF1ZXJ5U2VydmljZS5jcmVhdGUoXG4gICAgKCkgPT4gdGhpcy5wYXltZW50VHlwZUNvbm5lY3Rvci5nZXRQYXltZW50VHlwZXMoKSxcbiAgICB7XG4gICAgICByZWxvYWRPbjogdGhpcy5nZXRDaGVja291dFBheW1lbnRUeXBlc1F1ZXJ5UmVsb2FkRXZlbnRzKCksXG4gICAgICByZXNldE9uOiB0aGlzLmdldENoZWNrb3V0UGF5bWVudFR5cGVzUXVlcnlSZXNldEV2ZW50cygpLFxuICAgIH1cbiAgKTtcblxuICBwcm90ZWN0ZWQgc2V0UGF5bWVudFR5cGVDb21tYW5kOiBDb21tYW5kPFxuICAgIHsgcGF5bWVudFR5cGVDb2RlOiBzdHJpbmc7IHB1cmNoYXNlT3JkZXJOdW1iZXI/OiBzdHJpbmcgfSxcbiAgICB1bmtub3duXG4gID4gPSB0aGlzLmNvbW1hbmRTZXJ2aWNlLmNyZWF0ZTx7XG4gICAgcGF5bWVudFR5cGVDb2RlOiBzdHJpbmc7XG4gICAgcHVyY2hhc2VPcmRlck51bWJlcj86IHN0cmluZztcbiAgfT4oXG4gICAgKHsgcGF5bWVudFR5cGVDb2RlLCBwdXJjaGFzZU9yZGVyTnVtYmVyIH0pID0+XG4gICAgICB0aGlzLmNoZWNrb3V0UHJlY29uZGl0aW9ucygpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoW3VzZXJJZCwgY2FydElkXSkgPT5cbiAgICAgICAgICB0aGlzLnBheW1lbnRUeXBlQ29ubmVjdG9yXG4gICAgICAgICAgICAuc2V0UGF5bWVudFR5cGUoXG4gICAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgICAgY2FydElkLFxuICAgICAgICAgICAgICBwYXltZW50VHlwZUNvZGUsXG4gICAgICAgICAgICAgIHB1cmNoYXNlT3JkZXJOdW1iZXJcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICB0YXAoKCkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50U2VydmljZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkLFxuICAgICAgICAgICAgICAgICAgICBjYXJ0SWQsXG4gICAgICAgICAgICAgICAgICAgIHBheW1lbnRUeXBlQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgcHVyY2hhc2VPcmRlck51bWJlcixcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBDaGVja291dFBheW1lbnRUeXBlU2V0RXZlbnRcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICB7XG4gICAgICBzdHJhdGVneTogQ29tbWFuZFN0cmF0ZWd5LkNhbmNlbFByZXZpb3VzLFxuICAgIH1cbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcXVlcnlTZXJ2aWNlOiBRdWVyeVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbW1hbmRTZXJ2aWNlOiBDb21tYW5kU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgcGF5bWVudFR5cGVDb25uZWN0b3I6IENoZWNrb3V0UGF5bWVudFR5cGVDb25uZWN0b3IsXG4gICAgcHJvdGVjdGVkIGV2ZW50U2VydmljZTogRXZlbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjaGVja291dFF1ZXJ5RmFjYWRlOiBDaGVja291dFF1ZXJ5RmFjYWRlXG4gICkge31cblxuICBwcm90ZWN0ZWQgY2hlY2tvdXRQcmVjb25kaXRpb25zKCk6IE9ic2VydmFibGU8W3N0cmluZywgc3RyaW5nXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKCksXG4gICAgICB0aGlzLmFjdGl2ZUNhcnRGYWNhZGUudGFrZUFjdGl2ZUNhcnRJZCgpLFxuICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLmlzR3Vlc3RDYXJ0KCksXG4gICAgXSkucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBtYXAoKFt1c2VySWQsIGNhcnRJZCwgaXNHdWVzdENhcnRdKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhdXNlcklkIHx8XG4gICAgICAgICAgIWNhcnRJZCB8fFxuICAgICAgICAgICh1c2VySWQgPT09IE9DQ19VU0VSX0lEX0FOT05ZTU9VUyAmJiAhaXNHdWVzdENhcnQpXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2hlY2tvdXQgY29uZGl0aW9ucyBub3QgbWV0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt1c2VySWQsIGNhcnRJZF07XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZXRQYXltZW50VHlwZXNTdGF0ZSgpOiBPYnNlcnZhYmxlPFF1ZXJ5U3RhdGU8UGF5bWVudFR5cGVbXSB8IHVuZGVmaW5lZD4+IHtcbiAgICByZXR1cm4gdGhpcy5wYXltZW50VHlwZXNRdWVyeS5nZXRTdGF0ZSgpO1xuICB9XG5cbiAgZ2V0UGF5bWVudFR5cGVzKCk6IE9ic2VydmFibGU8UGF5bWVudFR5cGVbXT4ge1xuICAgIHJldHVybiB0aGlzLmdldFBheW1lbnRUeXBlc1N0YXRlKCkucGlwZShtYXAoKHN0YXRlKSA9PiBzdGF0ZS5kYXRhID8/IFtdKSk7XG4gIH1cblxuICBzZXRQYXltZW50VHlwZShcbiAgICBwYXltZW50VHlwZUNvZGU6IEIyQlBheW1lbnRUeXBlRW51bSxcbiAgICBwdXJjaGFzZU9yZGVyTnVtYmVyPzogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLnNldFBheW1lbnRUeXBlQ29tbWFuZC5leGVjdXRlKHtcbiAgICAgIHBheW1lbnRUeXBlQ29kZSxcbiAgICAgIHB1cmNoYXNlT3JkZXJOdW1iZXIsXG4gICAgfSk7XG4gIH1cblxuICBnZXRTZWxlY3RlZFBheW1lbnRUeXBlU3RhdGUoKTogT2JzZXJ2YWJsZTxcbiAgICBRdWVyeVN0YXRlPFBheW1lbnRUeXBlIHwgdW5kZWZpbmVkPlxuICA+IHtcbiAgICByZXR1cm4gdGhpcy5jaGVja291dFF1ZXJ5RmFjYWRlXG4gICAgICAuZ2V0Q2hlY2tvdXREZXRhaWxzU3RhdGUoKVxuICAgICAgLnBpcGUobWFwKChzdGF0ZSkgPT4gKHsgLi4uc3RhdGUsIGRhdGE6IHN0YXRlLmRhdGE/LnBheW1lbnRUeXBlIH0pKSk7XG4gIH1cblxuICBpc0FjY291bnRQYXltZW50KCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmdldFNlbGVjdGVkUGF5bWVudFR5cGVTdGF0ZSgpLnBpcGUoXG4gICAgICBmaWx0ZXIoKHN0YXRlKSA9PiAhc3RhdGUubG9hZGluZyksXG4gICAgICBtYXAoKHN0YXRlKSA9PiBzdGF0ZS5kYXRhPy5jb2RlID09PSBCMkJQYXltZW50VHlwZUVudW0uQUNDT1VOVF9QQVlNRU5UKVxuICAgICk7XG4gIH1cblxuICBnZXRQdXJjaGFzZU9yZGVyTnVtYmVyU3RhdGUoKTogT2JzZXJ2YWJsZTxRdWVyeVN0YXRlPHN0cmluZyB8IHVuZGVmaW5lZD4+IHtcbiAgICByZXR1cm4gdGhpcy5jaGVja291dFF1ZXJ5RmFjYWRlXG4gICAgICAuZ2V0Q2hlY2tvdXREZXRhaWxzU3RhdGUoKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoc3RhdGUpID0+ICh7IC4uLnN0YXRlLCBkYXRhOiBzdGF0ZS5kYXRhPy5wdXJjaGFzZU9yZGVyTnVtYmVyIH0pKVxuICAgICAgKTtcbiAgfVxufVxuIl19