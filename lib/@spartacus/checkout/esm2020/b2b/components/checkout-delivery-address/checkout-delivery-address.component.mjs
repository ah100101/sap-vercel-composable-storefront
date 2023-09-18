/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { CheckoutDeliveryAddressComponent, } from '@spartacus/checkout/base/components';
import { combineLatest, of, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/checkout/base/root";
import * as i3 from "@angular/router";
import * as i4 from "@spartacus/cart/base/root";
import * as i5 from "@spartacus/checkout/base/components";
import * as i6 from "@spartacus/checkout/b2b/root";
import * as i7 from "@angular/common";
import * as i8 from "@spartacus/storefront";
export class B2BCheckoutDeliveryAddressComponent extends CheckoutDeliveryAddressComponent {
    constructor(userAddressService, checkoutDeliveryAddressFacade, activatedRoute, translationService, activeCartFacade, checkoutStepService, checkoutDeliveryModesFacade, globalMessageService, checkoutCostCenterFacade, checkoutPaymentTypeFacade, userCostCenterService) {
        super(userAddressService, checkoutDeliveryAddressFacade, activatedRoute, translationService, activeCartFacade, checkoutStepService, checkoutDeliveryModesFacade, globalMessageService);
        this.userAddressService = userAddressService;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.activatedRoute = activatedRoute;
        this.translationService = translationService;
        this.activeCartFacade = activeCartFacade;
        this.checkoutStepService = checkoutStepService;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.globalMessageService = globalMessageService;
        this.checkoutCostCenterFacade = checkoutCostCenterFacade;
        this.checkoutPaymentTypeFacade = checkoutPaymentTypeFacade;
        this.userCostCenterService = userCostCenterService;
        this.subscriptions = new Subscription();
        this.isAccountPayment$ = this.checkoutPaymentTypeFacade
            .isAccountPayment()
            .pipe(distinctUntilChanged());
        this.costCenterAddresses$ = this.checkoutCostCenterFacade.getCostCenterState().pipe(filter((state) => !state.loading), map((state) => state.data), distinctUntilChanged((prev, curr) => prev?.code === curr?.code), switchMap((costCenter) => {
            this.doneAutoSelect = false;
            return costCenter?.code
                ? this.userCostCenterService.getCostCenterAddresses(costCenter.code)
                : of([]);
        }));
        this.creditCardAddressLoading$ = super.getAddressLoading();
        this.accountAddressLoading$ = combineLatest([
            this.creditCardAddressLoading$,
            this.checkoutCostCenterFacade
                .getCostCenterState()
                .pipe(map((state) => state.loading)),
        ]).pipe(map(([creditCardAddressLoading, costCenterLoading]) => creditCardAddressLoading || costCenterLoading), distinctUntilChanged());
        this.isAccountPayment = false;
    }
    ngOnInit() {
        this.subscriptions.add(this.isAccountPayment$.subscribe((isAccount) => (this.isAccountPayment = isAccount)));
        super.ngOnInit();
    }
    loadAddresses() {
        if (!this.isAccountPayment) {
            super.loadAddresses();
        }
        // else: do nothing, as we don't need to load user addresses for account payment
    }
    getAddressLoading() {
        return this.isAccountPayment$.pipe(switchMap((isAccountPayment) => isAccountPayment
            ? this.accountAddressLoading$
            : this.creditCardAddressLoading$));
    }
    getSupportedAddresses() {
        return this.isAccountPayment$.pipe(switchMap((isAccountPayment) => isAccountPayment
            ? this.costCenterAddresses$
            : super.getSupportedAddresses()));
    }
    selectDefaultAddress(addresses, selected) {
        if (!this.doneAutoSelect &&
            addresses?.length &&
            (!selected || Object.keys(selected).length === 0)) {
            if (this.isAccountPayment) {
                if (addresses.length === 1) {
                    this.setAddress(addresses[0]);
                }
            }
            else {
                super.selectDefaultAddress(addresses, selected);
            }
            this.doneAutoSelect = true;
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
B2BCheckoutDeliveryAddressComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: B2BCheckoutDeliveryAddressComponent, deps: [{ token: i1.UserAddressService }, { token: i2.CheckoutDeliveryAddressFacade }, { token: i3.ActivatedRoute }, { token: i1.TranslationService }, { token: i4.ActiveCartFacade }, { token: i5.CheckoutStepService }, { token: i2.CheckoutDeliveryModesFacade }, { token: i1.GlobalMessageService }, { token: i6.CheckoutCostCenterFacade }, { token: i6.CheckoutPaymentTypeFacade }, { token: i1.UserCostCenterService }], target: i0.ɵɵFactoryTarget.Component });
B2BCheckoutDeliveryAddressComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: B2BCheckoutDeliveryAddressComponent, selector: "cx-delivery-address", usesInheritance: true, ngImport: i0, template: "<h2 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n  {{ 'checkoutAddress.shippingAddress' | cxTranslate }}\n</h2>\n\n<ng-container *ngIf=\"cards$ | async as cards\">\n  <ng-container *ngIf=\"!(isUpdating$ | async); else loading\">\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <ng-container\n      *ngIf=\"\n        isAccountPayment || (cards?.length && !addressFormOpened);\n        then showExistingAddresses;\n        else newAddressForm\n      \"\n    >\n    </ng-container>\n\n    <ng-template #showExistingAddresses>\n      <p class=\"cx-checkout-text\">\n        {{ 'checkoutAddress.selectYourDeliveryAddress' | cxTranslate }}\n      </p>\n      <div class=\"cx-checkout-btns row\" *ngIf=\"!isAccountPayment\">\n        <div class=\"col-sm-12 col-md-12 col-lg-6\">\n          <button\n            class=\"btn btn-block btn-secondary\"\n            (click)=\"showNewAddressForm()\"\n          >\n            {{ 'checkoutAddress.addNewAddress' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-body row\">\n        <div\n          class=\"cx-delivery-address-card col-md-12 col-lg-6\"\n          *ngFor=\"let card of cards; let i = index\"\n        >\n          <div\n            class=\"cx-delivery-address-card-inner\"\n            (click)=\"selectAddress(card.address)\"\n          >\n            <cx-card\n              [border]=\"true\"\n              [index]=\"i\"\n              [fitToContainer]=\"true\"\n              [content]=\"card.card\"\n              (sendCard)=\"selectAddress(card.address)\"\n            ></cx-card>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-btns row\">\n        <div class=\"col-md-12 col-lg-6\">\n          <button class=\"cx-btn btn btn-block btn-secondary\" (click)=\"back()\">\n            {{ backBtnText | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"col-md-12 col-lg-6\">\n          <button\n            class=\"cx-btn btn btn-block btn-primary\"\n            [disabled]=\"!(selectedAddress$ | async)?.id\"\n            (click)=\"next()\"\n          >\n            {{ 'common.continue' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </ng-template>\n\n    <ng-template #newAddressForm>\n      <cx-address-form\n        *ngIf=\"cards.length; else initialAddressForm\"\n        [showTitleCode]=\"true\"\n        (backToAddress)=\"hideNewAddressForm(false)\"\n        (submitAddress)=\"addAddress($event)\"\n      ></cx-address-form>\n      <ng-template #initialAddressForm>\n        <cx-address-form\n          [showTitleCode]=\"true\"\n          [setAsDefaultField]=\"!isGuestCheckout\"\n          cancelBtnLabel=\"{{ backBtnText | cxTranslate }}\"\n          (backToAddress)=\"hideNewAddressForm(true)\"\n          (submitAddress)=\"addAddress($event)\"\n        ></cx-address-form>\n      </ng-template>\n    </ng-template>\n  </ng-container>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i7.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i7.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i8.AddressFormComponent, selector: "cx-address-form", inputs: ["addressData", "actionBtnLabel", "cancelBtnLabel", "setAsDefaultField", "showTitleCode", "showCancelBtn"], outputs: ["submitAddress", "backToAddress"] }, { kind: "component", type: i8.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "component", type: i8.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i7.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: B2BCheckoutDeliveryAddressComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-delivery-address', changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n  {{ 'checkoutAddress.shippingAddress' | cxTranslate }}\n</h2>\n\n<ng-container *ngIf=\"cards$ | async as cards\">\n  <ng-container *ngIf=\"!(isUpdating$ | async); else loading\">\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <ng-container\n      *ngIf=\"\n        isAccountPayment || (cards?.length && !addressFormOpened);\n        then showExistingAddresses;\n        else newAddressForm\n      \"\n    >\n    </ng-container>\n\n    <ng-template #showExistingAddresses>\n      <p class=\"cx-checkout-text\">\n        {{ 'checkoutAddress.selectYourDeliveryAddress' | cxTranslate }}\n      </p>\n      <div class=\"cx-checkout-btns row\" *ngIf=\"!isAccountPayment\">\n        <div class=\"col-sm-12 col-md-12 col-lg-6\">\n          <button\n            class=\"btn btn-block btn-secondary\"\n            (click)=\"showNewAddressForm()\"\n          >\n            {{ 'checkoutAddress.addNewAddress' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-body row\">\n        <div\n          class=\"cx-delivery-address-card col-md-12 col-lg-6\"\n          *ngFor=\"let card of cards; let i = index\"\n        >\n          <div\n            class=\"cx-delivery-address-card-inner\"\n            (click)=\"selectAddress(card.address)\"\n          >\n            <cx-card\n              [border]=\"true\"\n              [index]=\"i\"\n              [fitToContainer]=\"true\"\n              [content]=\"card.card\"\n              (sendCard)=\"selectAddress(card.address)\"\n            ></cx-card>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-btns row\">\n        <div class=\"col-md-12 col-lg-6\">\n          <button class=\"cx-btn btn btn-block btn-secondary\" (click)=\"back()\">\n            {{ backBtnText | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"col-md-12 col-lg-6\">\n          <button\n            class=\"cx-btn btn btn-block btn-primary\"\n            [disabled]=\"!(selectedAddress$ | async)?.id\"\n            (click)=\"next()\"\n          >\n            {{ 'common.continue' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </ng-template>\n\n    <ng-template #newAddressForm>\n      <cx-address-form\n        *ngIf=\"cards.length; else initialAddressForm\"\n        [showTitleCode]=\"true\"\n        (backToAddress)=\"hideNewAddressForm(false)\"\n        (submitAddress)=\"addAddress($event)\"\n      ></cx-address-form>\n      <ng-template #initialAddressForm>\n        <cx-address-form\n          [showTitleCode]=\"true\"\n          [setAsDefaultField]=\"!isGuestCheckout\"\n          cancelBtnLabel=\"{{ backBtnText | cxTranslate }}\"\n          (backToAddress)=\"hideNewAddressForm(true)\"\n          (submitAddress)=\"addAddress($event)\"\n        ></cx-address-form>\n      </ng-template>\n    </ng-template>\n  </ng-container>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.UserAddressService }, { type: i2.CheckoutDeliveryAddressFacade }, { type: i3.ActivatedRoute }, { type: i1.TranslationService }, { type: i4.ActiveCartFacade }, { type: i5.CheckoutStepService }, { type: i2.CheckoutDeliveryModesFacade }, { type: i1.GlobalMessageService }, { type: i6.CheckoutCostCenterFacade }, { type: i6.CheckoutPaymentTypeFacade }, { type: i1.UserCostCenterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYjJiL2NvbXBvbmVudHMvY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy9jaGVja291dC1kZWxpdmVyeS1hZGRyZXNzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iMmIvY29tcG9uZW50cy9jaGVja291dC1kZWxpdmVyeS1hZGRyZXNzL2NoZWNrb3V0LWRlbGl2ZXJ5LWFkZHJlc3MuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxHQUdWLE1BQU0sZUFBZSxDQUFDO0FBT3ZCLE9BQU8sRUFDTCxnQ0FBZ0MsR0FFakMsTUFBTSxxQ0FBcUMsQ0FBQztBQWE3QyxPQUFPLEVBQUUsYUFBYSxFQUFjLEVBQUUsRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7Ozs7QUFZOUUsTUFBTSxPQUFPLG1DQUNYLFNBQVEsZ0NBQWdDO0lBeUN4QyxZQUNZLGtCQUFzQyxFQUN0Qyw2QkFBNEQsRUFDNUQsY0FBOEIsRUFDOUIsa0JBQXNDLEVBQ3RDLGdCQUFrQyxFQUNsQyxtQkFBd0MsRUFDeEMsMkJBQXdELEVBQ3hELG9CQUEwQyxFQUMxQyx3QkFBa0QsRUFDbEQseUJBQW9ELEVBQ3BELHFCQUE0QztRQUV0RCxLQUFLLENBQ0gsa0JBQWtCLEVBQ2xCLDZCQUE2QixFQUM3QixjQUFjLEVBQ2Qsa0JBQWtCLEVBQ2xCLGdCQUFnQixFQUNoQixtQkFBbUIsRUFDbkIsMkJBQTJCLEVBQzNC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QyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQWN0aXZlQ2FydEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ2hlY2tvdXRDb3N0Q2VudGVyRmFjYWRlLFxuICBDaGVja291dFBheW1lbnRUeXBlRmFjYWRlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2IyYi9yb290JztcbmltcG9ydCB7XG4gIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQ29tcG9uZW50LFxuICBDaGVja291dFN0ZXBTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2UvY29tcG9uZW50cyc7XG5pbXBvcnQge1xuICBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSxcbiAgQ2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBBZGRyZXNzLFxuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgVHJhbnNsYXRpb25TZXJ2aWNlLFxuICBVc2VyQWRkcmVzc1NlcnZpY2UsXG4gIFVzZXJDb3N0Q2VudGVyU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENhcmQgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FyZFdpdGhBZGRyZXNzIHtcbiAgY2FyZDogQ2FyZDtcbiAgYWRkcmVzczogQWRkcmVzcztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtZGVsaXZlcnktYWRkcmVzcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9jaGVja291dC1kZWxpdmVyeS1hZGRyZXNzLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEIyQkNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQ29tcG9uZW50XG4gIGV4dGVuZHMgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDb21wb25lbnRcbiAgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxue1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBwcm90ZWN0ZWQgaXNBY2NvdW50UGF5bWVudCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPVxuICAgIHRoaXMuY2hlY2tvdXRQYXltZW50VHlwZUZhY2FkZVxuICAgICAgLmlzQWNjb3VudFBheW1lbnQoKVxuICAgICAgLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSk7XG5cbiAgcHJvdGVjdGVkIGNvc3RDZW50ZXJBZGRyZXNzZXMkOiBPYnNlcnZhYmxlPEFkZHJlc3NbXT4gPVxuICAgIHRoaXMuY2hlY2tvdXRDb3N0Q2VudGVyRmFjYWRlLmdldENvc3RDZW50ZXJTdGF0ZSgpLnBpcGUoXG4gICAgICBmaWx0ZXIoKHN0YXRlKSA9PiAhc3RhdGUubG9hZGluZyksXG4gICAgICBtYXAoKHN0YXRlKSA9PiBzdGF0ZS5kYXRhKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKChwcmV2LCBjdXJyKSA9PiBwcmV2Py5jb2RlID09PSBjdXJyPy5jb2RlKSxcbiAgICAgIHN3aXRjaE1hcCgoY29zdENlbnRlcikgPT4ge1xuICAgICAgICB0aGlzLmRvbmVBdXRvU2VsZWN0ID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBjb3N0Q2VudGVyPy5jb2RlXG4gICAgICAgICAgPyB0aGlzLnVzZXJDb3N0Q2VudGVyU2VydmljZS5nZXRDb3N0Q2VudGVyQWRkcmVzc2VzKGNvc3RDZW50ZXIuY29kZSlcbiAgICAgICAgICA6IG9mKFtdKTtcbiAgICAgIH0pXG4gICAgKTtcblxuICBwcm90ZWN0ZWQgY3JlZGl0Q2FyZEFkZHJlc3NMb2FkaW5nJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9XG4gICAgc3VwZXIuZ2V0QWRkcmVzc0xvYWRpbmcoKTtcblxuICBwcm90ZWN0ZWQgYWNjb3VudEFkZHJlc3NMb2FkaW5nJDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IGNvbWJpbmVMYXRlc3QoW1xuICAgIHRoaXMuY3JlZGl0Q2FyZEFkZHJlc3NMb2FkaW5nJCxcbiAgICB0aGlzLmNoZWNrb3V0Q29zdENlbnRlckZhY2FkZVxuICAgICAgLmdldENvc3RDZW50ZXJTdGF0ZSgpXG4gICAgICAucGlwZShtYXAoKHN0YXRlKSA9PiBzdGF0ZS5sb2FkaW5nKSksXG4gIF0pLnBpcGUoXG4gICAgbWFwKFxuICAgICAgKFtjcmVkaXRDYXJkQWRkcmVzc0xvYWRpbmcsIGNvc3RDZW50ZXJMb2FkaW5nXSkgPT5cbiAgICAgICAgY3JlZGl0Q2FyZEFkZHJlc3NMb2FkaW5nIHx8IGNvc3RDZW50ZXJMb2FkaW5nXG4gICAgKSxcbiAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICk7XG5cbiAgaXNBY2NvdW50UGF5bWVudCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCB1c2VyQWRkcmVzc1NlcnZpY2U6IFVzZXJBZGRyZXNzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXREZWxpdmVyeUFkZHJlc3NGYWNhZGU6IENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRmFjYWRlLFxuICAgIHByb3RlY3RlZCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJvdGVjdGVkIHRyYW5zbGF0aW9uU2VydmljZTogVHJhbnNsYXRpb25TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0RmFjYWRlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCBjaGVja291dFN0ZXBTZXJ2aWNlOiBDaGVja291dFN0ZXBTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjaGVja291dERlbGl2ZXJ5TW9kZXNGYWNhZGU6IENoZWNrb3V0RGVsaXZlcnlNb2Rlc0ZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjaGVja291dENvc3RDZW50ZXJGYWNhZGU6IENoZWNrb3V0Q29zdENlbnRlckZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXRQYXltZW50VHlwZUZhY2FkZTogQ2hlY2tvdXRQYXltZW50VHlwZUZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgdXNlckNvc3RDZW50ZXJTZXJ2aWNlOiBVc2VyQ29zdENlbnRlclNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoXG4gICAgICB1c2VyQWRkcmVzc1NlcnZpY2UsXG4gICAgICBjaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSxcbiAgICAgIGFjdGl2YXRlZFJvdXRlLFxuICAgICAgdHJhbnNsYXRpb25TZXJ2aWNlLFxuICAgICAgYWN0aXZlQ2FydEZhY2FkZSxcbiAgICAgIGNoZWNrb3V0U3RlcFNlcnZpY2UsXG4gICAgICBjaGVja291dERlbGl2ZXJ5TW9kZXNGYWNhZGUsXG4gICAgICBnbG9iYWxNZXNzYWdlU2VydmljZVxuICAgICk7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5pc0FjY291bnRQYXltZW50JC5zdWJzY3JpYmUoXG4gICAgICAgIChpc0FjY291bnQpID0+ICh0aGlzLmlzQWNjb3VudFBheW1lbnQgPSBpc0FjY291bnQpXG4gICAgICApXG4gICAgKTtcblxuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbG9hZEFkZHJlc3NlcygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNBY2NvdW50UGF5bWVudCkge1xuICAgICAgc3VwZXIubG9hZEFkZHJlc3NlcygpO1xuICAgIH1cbiAgICAvLyBlbHNlOiBkbyBub3RoaW5nLCBhcyB3ZSBkb24ndCBuZWVkIHRvIGxvYWQgdXNlciBhZGRyZXNzZXMgZm9yIGFjY291bnQgcGF5bWVudFxuICB9XG5cbiAgcHJvdGVjdGVkIGdldEFkZHJlc3NMb2FkaW5nKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmlzQWNjb3VudFBheW1lbnQkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGlzQWNjb3VudFBheW1lbnQpID0+XG4gICAgICAgIGlzQWNjb3VudFBheW1lbnRcbiAgICAgICAgICA/IHRoaXMuYWNjb3VudEFkZHJlc3NMb2FkaW5nJFxuICAgICAgICAgIDogdGhpcy5jcmVkaXRDYXJkQWRkcmVzc0xvYWRpbmckXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTdXBwb3J0ZWRBZGRyZXNzZXMoKTogT2JzZXJ2YWJsZTxBZGRyZXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5pc0FjY291bnRQYXltZW50JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKChpc0FjY291bnRQYXltZW50KSA9PlxuICAgICAgICBpc0FjY291bnRQYXltZW50XG4gICAgICAgICAgPyB0aGlzLmNvc3RDZW50ZXJBZGRyZXNzZXMkXG4gICAgICAgICAgOiBzdXBlci5nZXRTdXBwb3J0ZWRBZGRyZXNzZXMoKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2VsZWN0RGVmYXVsdEFkZHJlc3MoXG4gICAgYWRkcmVzc2VzOiBBZGRyZXNzW10sXG4gICAgc2VsZWN0ZWQ6IEFkZHJlc3MgfCB1bmRlZmluZWRcbiAgKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMuZG9uZUF1dG9TZWxlY3QgJiZcbiAgICAgIGFkZHJlc3Nlcz8ubGVuZ3RoICYmXG4gICAgICAoIXNlbGVjdGVkIHx8IE9iamVjdC5rZXlzKHNlbGVjdGVkKS5sZW5ndGggPT09IDApXG4gICAgKSB7XG4gICAgICBpZiAodGhpcy5pc0FjY291bnRQYXltZW50KSB7XG4gICAgICAgIGlmIChhZGRyZXNzZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgdGhpcy5zZXRBZGRyZXNzKGFkZHJlc3Nlc1swXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1cGVyLnNlbGVjdERlZmF1bHRBZGRyZXNzKGFkZHJlc3Nlcywgc2VsZWN0ZWQpO1xuICAgICAgfVxuICAgICAgdGhpcy5kb25lQXV0b1NlbGVjdCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxoMiBjbGFzcz1cImN4LWNoZWNrb3V0LXRpdGxlIGQtbm9uZSBkLWxnLWJsb2NrIGQteGwtYmxvY2tcIj5cbiAge3sgJ2NoZWNrb3V0QWRkcmVzcy5zaGlwcGluZ0FkZHJlc3MnIHwgY3hUcmFuc2xhdGUgfX1cbjwvaDI+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJjYXJkcyQgfCBhc3luYyBhcyBjYXJkc1wiPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiIShpc1VwZGF0aW5nJCB8IGFzeW5jKTsgZWxzZSBsb2FkaW5nXCI+XG4gICAgPGRpdiByb2xlPVwic3RhdHVzXCIgW2F0dHIuYXJpYS1sYWJlbF09XCInY29tbW9uLmxvYWRlZCcgfCBjeFRyYW5zbGF0ZVwiPjwvZGl2PlxuICAgIDxuZy1jb250YWluZXJcbiAgICAgICpuZ0lmPVwiXG4gICAgICAgIGlzQWNjb3VudFBheW1lbnQgfHwgKGNhcmRzPy5sZW5ndGggJiYgIWFkZHJlc3NGb3JtT3BlbmVkKTtcbiAgICAgICAgdGhlbiBzaG93RXhpc3RpbmdBZGRyZXNzZXM7XG4gICAgICAgIGVsc2UgbmV3QWRkcmVzc0Zvcm1cbiAgICAgIFwiXG4gICAgPlxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPG5nLXRlbXBsYXRlICNzaG93RXhpc3RpbmdBZGRyZXNzZXM+XG4gICAgICA8cCBjbGFzcz1cImN4LWNoZWNrb3V0LXRleHRcIj5cbiAgICAgICAge3sgJ2NoZWNrb3V0QWRkcmVzcy5zZWxlY3RZb3VyRGVsaXZlcnlBZGRyZXNzJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgICA8L3A+XG4gICAgICA8ZGl2IGNsYXNzPVwiY3gtY2hlY2tvdXQtYnRucyByb3dcIiAqbmdJZj1cIiFpc0FjY291bnRQYXltZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtc20tMTIgY29sLW1kLTEyIGNvbC1sZy02XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1zZWNvbmRhcnlcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNob3dOZXdBZGRyZXNzRm9ybSgpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyAnY2hlY2tvdXRBZGRyZXNzLmFkZE5ld0FkZHJlc3MnIHwgY3hUcmFuc2xhdGUgfX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImN4LWNoZWNrb3V0LWJvZHkgcm93XCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzcz1cImN4LWRlbGl2ZXJ5LWFkZHJlc3MtY2FyZCBjb2wtbWQtMTIgY29sLWxnLTZcIlxuICAgICAgICAgICpuZ0Zvcj1cImxldCBjYXJkIG9mIGNhcmRzOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiY3gtZGVsaXZlcnktYWRkcmVzcy1jYXJkLWlubmVyXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RBZGRyZXNzKGNhcmQuYWRkcmVzcylcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxjeC1jYXJkXG4gICAgICAgICAgICAgIFtib3JkZXJdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIFtpbmRleF09XCJpXCJcbiAgICAgICAgICAgICAgW2ZpdFRvQ29udGFpbmVyXT1cInRydWVcIlxuICAgICAgICAgICAgICBbY29udGVudF09XCJjYXJkLmNhcmRcIlxuICAgICAgICAgICAgICAoc2VuZENhcmQpPVwic2VsZWN0QWRkcmVzcyhjYXJkLmFkZHJlc3MpXCJcbiAgICAgICAgICAgID48L2N4LWNhcmQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjeC1jaGVja291dC1idG5zIHJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIGNvbC1sZy02XCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImN4LWJ0biBidG4gYnRuLWJsb2NrIGJ0bi1zZWNvbmRhcnlcIiAoY2xpY2spPVwiYmFjaygpXCI+XG4gICAgICAgICAgICB7eyBiYWNrQnRuVGV4dCB8IGN4VHJhbnNsYXRlIH19XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTEyIGNvbC1sZy02XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3M9XCJjeC1idG4gYnRuIGJ0bi1ibG9jayBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiIShzZWxlY3RlZEFkZHJlc3MkIHwgYXN5bmMpPy5pZFwiXG4gICAgICAgICAgICAoY2xpY2spPVwibmV4dCgpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7eyAnY29tbW9uLmNvbnRpbnVlJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgIDxuZy10ZW1wbGF0ZSAjbmV3QWRkcmVzc0Zvcm0+XG4gICAgICA8Y3gtYWRkcmVzcy1mb3JtXG4gICAgICAgICpuZ0lmPVwiY2FyZHMubGVuZ3RoOyBlbHNlIGluaXRpYWxBZGRyZXNzRm9ybVwiXG4gICAgICAgIFtzaG93VGl0bGVDb2RlXT1cInRydWVcIlxuICAgICAgICAoYmFja1RvQWRkcmVzcyk9XCJoaWRlTmV3QWRkcmVzc0Zvcm0oZmFsc2UpXCJcbiAgICAgICAgKHN1Ym1pdEFkZHJlc3MpPVwiYWRkQWRkcmVzcygkZXZlbnQpXCJcbiAgICAgID48L2N4LWFkZHJlc3MtZm9ybT5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjaW5pdGlhbEFkZHJlc3NGb3JtPlxuICAgICAgICA8Y3gtYWRkcmVzcy1mb3JtXG4gICAgICAgICAgW3Nob3dUaXRsZUNvZGVdPVwidHJ1ZVwiXG4gICAgICAgICAgW3NldEFzRGVmYXVsdEZpZWxkXT1cIiFpc0d1ZXN0Q2hlY2tvdXRcIlxuICAgICAgICAgIGNhbmNlbEJ0bkxhYmVsPVwie3sgYmFja0J0blRleHQgfCBjeFRyYW5zbGF0ZSB9fVwiXG4gICAgICAgICAgKGJhY2tUb0FkZHJlc3MpPVwiaGlkZU5ld0FkZHJlc3NGb3JtKHRydWUpXCJcbiAgICAgICAgICAoc3VibWl0QWRkcmVzcyk9XCJhZGRBZGRyZXNzKCRldmVudClcIlxuICAgICAgICA+PC9jeC1hZGRyZXNzLWZvcm0+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIDwvbmctY29udGFpbmVyPlxuPC9uZy1jb250YWluZXI+XG5cbjxuZy10ZW1wbGF0ZSAjbG9hZGluZz5cbiAgPGRpdiBjbGFzcz1cImN4LXNwaW5uZXJcIj5cbiAgICA8Y3gtc3Bpbm5lcj48L2N4LXNwaW5uZXI+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==