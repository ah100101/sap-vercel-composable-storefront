/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { billingAddressCard, paymentMethodCard, } from '@spartacus/order/root';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../order-details.service";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/storefront";
import * as i4 from "@angular/common";
export class OrderDetailBillingComponent {
    constructor(orderDetailsService, translationService) {
        this.orderDetailsService = orderDetailsService;
        this.translationService = translationService;
        this.order$ = this.orderDetailsService.getOrderDetails();
    }
    getPaymentMethodCard(paymentDetails) {
        return combineLatest([
            this.translationService.translate('paymentForm.payment'),
            this.translationService.translate('paymentCard.expires', {
                month: paymentDetails.expiryMonth,
                year: paymentDetails.expiryYear,
            }),
        ]).pipe(map(([textTitle, textExpires]) => paymentMethodCard(textTitle, textExpires, paymentDetails)));
    }
    getBillingAddressCard(paymentDetails) {
        return combineLatest([
            this.translationService.translate('paymentForm.billingAddress'),
            this.translationService.translate('addressCard.billTo'),
        ]).pipe(map(([billingAddress, billTo]) => billingAddressCard(billingAddress, billTo, paymentDetails)));
    }
}
OrderDetailBillingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderDetailBillingComponent, deps: [{ token: i1.OrderDetailsService }, { token: i2.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
OrderDetailBillingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: OrderDetailBillingComponent, selector: "cx-order-detail-billing", ngImport: i0, template: "<div class=\"cx-order-items\" *ngIf=\"order$ | async as order\">\n  <div class=\"cx-review-summary\" *ngIf=\"order.paymentInfo as paymentDetails\">\n    <div class=\"cx-review-summary-card cx-review-summary-payment-card\">\n      <cx-card\n        [content]=\"getPaymentMethodCard(paymentDetails) | async\"\n      ></cx-card>\n    </div>\n\n    <div class=\"cx-review-summary-card cx-review-summary-payment-card\">\n      <cx-card\n        [content]=\"getBillingAddressCard(paymentDetails) | async\"\n      ></cx-card>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "component", type: i3.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderDetailBillingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-detail-billing', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-order-items\" *ngIf=\"order$ | async as order\">\n  <div class=\"cx-review-summary\" *ngIf=\"order.paymentInfo as paymentDetails\">\n    <div class=\"cx-review-summary-card cx-review-summary-payment-card\">\n      <cx-card\n        [content]=\"getPaymentMethodCard(paymentDetails) | async\"\n      ></cx-card>\n    </div>\n\n    <div class=\"cx-review-summary-card cx-review-summary-payment-card\">\n      <cx-card\n        [content]=\"getBillingAddressCard(paymentDetails) | async\"\n      ></cx-card>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OrderDetailsService }, { type: i2.TranslationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGV0YWlsLWJpbGxpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvbXBvbmVudHMvb3JkZXItZGV0YWlscy9vcmRlci1kZXRhaWwtYmlsbGluZy9vcmRlci1kZXRhaWwtYmlsbGluZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9vcmRlci1kZXRhaWxzL29yZGVyLWRldGFpbC1iaWxsaW5nL29yZGVyLWRldGFpbC1iaWxsaW5nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR25FLE9BQU8sRUFDTCxrQkFBa0IsRUFFbEIsaUJBQWlCLEdBQ2xCLE1BQU0sdUJBQXVCLENBQUM7QUFFL0IsT0FBTyxFQUFFLGFBQWEsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQVFyQyxNQUFNLE9BQU8sMkJBQTJCO0lBSXRDLFlBQ1ksbUJBQXdDLEVBQ3hDLGtCQUFzQztRQUR0Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFMbEQsV0FBTSxHQUNKLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUsxQyxDQUFDO0lBRUosb0JBQW9CLENBQUMsY0FBOEI7UUFDakQsT0FBTyxhQUFhLENBQUM7WUFDbkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQztZQUN4RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFFO2dCQUN2RCxLQUFLLEVBQUUsY0FBYyxDQUFDLFdBQVc7Z0JBQ2pDLElBQUksRUFBRSxjQUFjLENBQUMsVUFBVTthQUNoQyxDQUFDO1NBQ0gsQ0FBQyxDQUFDLElBQUksQ0FDTCxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFLENBQy9CLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQzFELENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxjQUE4QjtRQUNsRCxPQUFPLGFBQWEsQ0FBQztZQUNuQixJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLDRCQUE0QixDQUFDO1lBQy9ELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUM7U0FDeEQsQ0FBQyxDQUFDLElBQUksQ0FDTCxHQUFHLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQy9CLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsY0FBYyxDQUFDLENBQzNELENBQ0YsQ0FBQztJQUNKLENBQUM7O3dIQWhDVSwyQkFBMkI7NEdBQTNCLDJCQUEyQiwrREN4QnhDLHdpQkFlQTsyRkRTYSwyQkFBMkI7a0JBTHZDLFNBQVM7K0JBQ0UseUJBQXlCLG1CQUVsQix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGF5bWVudERldGFpbHMgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IFRyYW5zbGF0aW9uU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBiaWxsaW5nQWRkcmVzc0NhcmQsXG4gIE9yZGVyLFxuICBwYXltZW50TWV0aG9kQ2FyZCxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IENhcmQgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxzU2VydmljZSB9IGZyb20gJy4uL29yZGVyLWRldGFpbHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZGVyLWRldGFpbC1iaWxsaW5nJyxcbiAgdGVtcGxhdGVVcmw6ICcuL29yZGVyLWRldGFpbC1iaWxsaW5nLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyRGV0YWlsQmlsbGluZ0NvbXBvbmVudCB7XG4gIG9yZGVyJDogT2JzZXJ2YWJsZTxPcmRlciB8IHVuZGVmaW5lZD4gPVxuICAgIHRoaXMub3JkZXJEZXRhaWxzU2VydmljZS5nZXRPcmRlckRldGFpbHMoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgb3JkZXJEZXRhaWxzU2VydmljZTogT3JkZXJEZXRhaWxzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgdHJhbnNsYXRpb25TZXJ2aWNlOiBUcmFuc2xhdGlvblNlcnZpY2VcbiAgKSB7fVxuXG4gIGdldFBheW1lbnRNZXRob2RDYXJkKHBheW1lbnREZXRhaWxzOiBQYXltZW50RGV0YWlscyk6IE9ic2VydmFibGU8Q2FyZD4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZSgncGF5bWVudEZvcm0ucGF5bWVudCcpLFxuICAgICAgdGhpcy50cmFuc2xhdGlvblNlcnZpY2UudHJhbnNsYXRlKCdwYXltZW50Q2FyZC5leHBpcmVzJywge1xuICAgICAgICBtb250aDogcGF5bWVudERldGFpbHMuZXhwaXJ5TW9udGgsXG4gICAgICAgIHllYXI6IHBheW1lbnREZXRhaWxzLmV4cGlyeVllYXIsXG4gICAgICB9KSxcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKChbdGV4dFRpdGxlLCB0ZXh0RXhwaXJlc10pID0+XG4gICAgICAgIHBheW1lbnRNZXRob2RDYXJkKHRleHRUaXRsZSwgdGV4dEV4cGlyZXMsIHBheW1lbnREZXRhaWxzKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBnZXRCaWxsaW5nQWRkcmVzc0NhcmQocGF5bWVudERldGFpbHM6IFBheW1lbnREZXRhaWxzKTogT2JzZXJ2YWJsZTxDYXJkPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy50cmFuc2xhdGlvblNlcnZpY2UudHJhbnNsYXRlKCdwYXltZW50Rm9ybS5iaWxsaW5nQWRkcmVzcycpLFxuICAgICAgdGhpcy50cmFuc2xhdGlvblNlcnZpY2UudHJhbnNsYXRlKCdhZGRyZXNzQ2FyZC5iaWxsVG8nKSxcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKChbYmlsbGluZ0FkZHJlc3MsIGJpbGxUb10pID0+XG4gICAgICAgIGJpbGxpbmdBZGRyZXNzQ2FyZChiaWxsaW5nQWRkcmVzcywgYmlsbFRvLCBwYXltZW50RGV0YWlscylcbiAgICAgIClcbiAgICApO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY3gtb3JkZXItaXRlbXNcIiAqbmdJZj1cIm9yZGVyJCB8IGFzeW5jIGFzIG9yZGVyXCI+XG4gIDxkaXYgY2xhc3M9XCJjeC1yZXZpZXctc3VtbWFyeVwiICpuZ0lmPVwib3JkZXIucGF5bWVudEluZm8gYXMgcGF5bWVudERldGFpbHNcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY3gtcmV2aWV3LXN1bW1hcnktY2FyZCBjeC1yZXZpZXctc3VtbWFyeS1wYXltZW50LWNhcmRcIj5cbiAgICAgIDxjeC1jYXJkXG4gICAgICAgIFtjb250ZW50XT1cImdldFBheW1lbnRNZXRob2RDYXJkKHBheW1lbnREZXRhaWxzKSB8IGFzeW5jXCJcbiAgICAgID48L2N4LWNhcmQ+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwiY3gtcmV2aWV3LXN1bW1hcnktY2FyZCBjeC1yZXZpZXctc3VtbWFyeS1wYXltZW50LWNhcmRcIj5cbiAgICAgIDxjeC1jYXJkXG4gICAgICAgIFtjb250ZW50XT1cImdldEJpbGxpbmdBZGRyZXNzQ2FyZChwYXltZW50RGV0YWlscykgfCBhc3luY1wiXG4gICAgICA+PC9jeC1jYXJkPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19