/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { getLastValueSync, GlobalMessageType, } from '@spartacus/core';
import { getAddressNumbers } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/checkout/base/root";
import * as i3 from "@angular/router";
import * as i4 from "@spartacus/cart/base/root";
import * as i5 from "../services/checkout-step.service";
import * as i6 from "@angular/common";
import * as i7 from "@spartacus/storefront";
export class CheckoutDeliveryAddressComponent {
    get isGuestCheckout() {
        return !!getLastValueSync(this.activeCartFacade.isGuestCart());
    }
    get backBtnText() {
        return this.checkoutStepService.getBackBntText(this.activatedRoute);
    }
    get selectedAddress$() {
        return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(filter((state) => !state.loading), map((state) => state.data), distinctUntilChanged((prev, curr) => prev?.id === curr?.id));
    }
    constructor(userAddressService, checkoutDeliveryAddressFacade, activatedRoute, translationService, activeCartFacade, checkoutStepService, checkoutDeliveryModesFacade, globalMessageService) {
        this.userAddressService = userAddressService;
        this.checkoutDeliveryAddressFacade = checkoutDeliveryAddressFacade;
        this.activatedRoute = activatedRoute;
        this.translationService = translationService;
        this.activeCartFacade = activeCartFacade;
        this.checkoutStepService = checkoutStepService;
        this.checkoutDeliveryModesFacade = checkoutDeliveryModesFacade;
        this.globalMessageService = globalMessageService;
        this.busy$ = new BehaviorSubject(false);
        this.addressFormOpened = false;
        this.doneAutoSelect = false;
    }
    ngOnInit() {
        this.loadAddresses();
        this.cards$ = this.createCards();
        this.isUpdating$ = this.createIsUpdating();
    }
    getCardContent(address, selected, textDefaultDeliveryAddress, textShipToThisAddress, textSelected, textPhone, textMobile) {
        let region = '';
        if (address.region && address.region.isocode) {
            region = address.region.isocode + ', ';
        }
        /**
         * TODO: (#CXSPA-53) Remove feature config check in 6.0
         */
        const numbers = getAddressNumbers(address, textPhone, textMobile);
        return {
            role: 'region',
            title: address.defaultAddress ? textDefaultDeliveryAddress : '',
            textBold: address.firstName + ' ' + address.lastName,
            text: [
                address.line1,
                address.line2,
                address.town + ', ' + region + address.country?.isocode,
                address.postalCode,
                numbers,
            ],
            actions: [{ name: textShipToThisAddress, event: 'send' }],
            header: selected && selected.id === address.id ? textSelected : '',
            label: address.defaultAddress
                ? 'addressBook.defaultDeliveryAddress'
                : 'addressBook.additionalDeliveryAddress',
        };
    }
    selectAddress(address) {
        if (address?.id === getLastValueSync(this.selectedAddress$)?.id) {
            return;
        }
        this.globalMessageService.add({
            key: 'checkoutAddress.deliveryAddressSelected',
        }, GlobalMessageType.MSG_TYPE_INFO);
        this.setAddress(address);
    }
    addAddress(address) {
        if (!address) {
            return;
        }
        this.busy$.next(true);
        this.doneAutoSelect = true;
        this.checkoutDeliveryAddressFacade
            .createAndSetAddress(address)
            .pipe(switchMap(() => this.checkoutDeliveryModesFacade.clearCheckoutDeliveryMode()))
            .subscribe({
            complete: () => {
                // we don't call onSuccess here, because it can cause a spinner flickering
                this.next();
            },
            error: () => {
                this.onError();
                this.doneAutoSelect = false;
            },
        });
    }
    showNewAddressForm() {
        this.addressFormOpened = true;
    }
    hideNewAddressForm(goPrevious = false) {
        this.addressFormOpened = false;
        if (goPrevious) {
            this.back();
        }
    }
    next() {
        this.checkoutStepService.next(this.activatedRoute);
    }
    back() {
        this.checkoutStepService.back(this.activatedRoute);
    }
    loadAddresses() {
        if (!this.isGuestCheckout) {
            this.userAddressService.loadAddresses();
        }
    }
    createCards() {
        const addresses$ = combineLatest([
            this.getSupportedAddresses(),
            this.selectedAddress$,
        ]);
        const translations$ = combineLatest([
            this.translationService.translate('checkoutAddress.defaultDeliveryAddress'),
            this.translationService.translate('checkoutAddress.shipToThisAddress'),
            this.translationService.translate('addressCard.selected'),
            this.translationService.translate('addressCard.phoneNumber'),
            this.translationService.translate('addressCard.mobileNumber'),
        ]);
        return combineLatest([addresses$, translations$]).pipe(tap(([[addresses, selected]]) => this.selectDefaultAddress(addresses, selected)), map(([[addresses, selected], [textDefault, textShipTo, textSelected, textPhone, textMobile],]) => addresses?.map((address) => ({
            address,
            card: this.getCardContent(address, selected, textDefault, textShipTo, textSelected, textPhone, textMobile),
        }))));
    }
    selectDefaultAddress(addresses, selected) {
        if (!this.doneAutoSelect &&
            addresses?.length &&
            (!selected || Object.keys(selected).length === 0)) {
            selected = addresses.find((address) => address.defaultAddress);
            if (selected) {
                this.setAddress(selected);
            }
            this.doneAutoSelect = true;
        }
    }
    getSupportedAddresses() {
        return this.userAddressService.getAddresses();
    }
    createIsUpdating() {
        return combineLatest([
            this.busy$,
            this.userAddressService.getAddressesLoading(),
            this.getAddressLoading(),
        ]).pipe(map(([busy, userAddressLoading, deliveryAddressLoading]) => busy || userAddressLoading || deliveryAddressLoading), distinctUntilChanged());
    }
    getAddressLoading() {
        return this.checkoutDeliveryAddressFacade.getDeliveryAddressState().pipe(map((state) => state.loading), distinctUntilChanged());
    }
    setAddress(address) {
        this.busy$.next(true);
        this.checkoutDeliveryAddressFacade
            .setDeliveryAddress(address)
            .pipe(switchMap(() => this.checkoutDeliveryModesFacade.clearCheckoutDeliveryMode()))
            .subscribe({
            complete: () => {
                this.onSuccess();
            },
            error: () => {
                this.onError();
            },
        });
    }
    onSuccess() {
        this.busy$.next(false);
    }
    onError() {
        this.busy$.next(false);
    }
}
CheckoutDeliveryAddressComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CheckoutDeliveryAddressComponent, deps: [{ token: i1.UserAddressService }, { token: i2.CheckoutDeliveryAddressFacade }, { token: i3.ActivatedRoute }, { token: i1.TranslationService }, { token: i4.ActiveCartFacade }, { token: i5.CheckoutStepService }, { token: i2.CheckoutDeliveryModesFacade }, { token: i1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Component });
CheckoutDeliveryAddressComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: CheckoutDeliveryAddressComponent, selector: "cx-delivery-address", ngImport: i0, template: "<h2 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n  {{ 'checkoutAddress.shippingAddress' | cxTranslate }}\n</h2>\n\n<ng-container *ngIf=\"cards$ | async as cards\">\n  <ng-container *ngIf=\"!(isUpdating$ | async); else loading\">\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <ng-container\n      *ngIf=\"\n        cards?.length && !addressFormOpened;\n        then showExistingAddresses;\n        else newAddressForm\n      \"\n    >\n    </ng-container>\n\n    <ng-template #showExistingAddresses>\n      <p class=\"cx-checkout-text\">\n        {{ 'checkoutAddress.selectYourDeliveryAddress' | cxTranslate }}\n      </p>\n      <div class=\"cx-checkout-btns row\">\n        <div class=\"col-sm-12 col-md-12 col-lg-6\">\n          <button\n            class=\"btn btn-block btn-secondary\"\n            (click)=\"showNewAddressForm()\"\n          >\n            {{ 'checkoutAddress.addNewAddress' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-body row\">\n        <div\n          class=\"cx-delivery-address-card col-md-12 col-lg-6\"\n          *ngFor=\"let card of cards; let i = index\"\n        >\n          <div\n            class=\"cx-delivery-address-card-inner\"\n            (click)=\"selectAddress(card.address)\"\n          >\n            <cx-card\n              [border]=\"true\"\n              [index]=\"i\"\n              [fitToContainer]=\"true\"\n              [content]=\"card.card\"\n              (sendCard)=\"selectAddress(card.address)\"\n            ></cx-card>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-btns row\">\n        <div class=\"col-md-12 col-lg-6\">\n          <button class=\"cx-btn btn btn-block btn-secondary\" (click)=\"back()\">\n            {{ backBtnText | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"col-md-12 col-lg-6\">\n          <button\n            class=\"cx-btn btn btn-block btn-primary\"\n            [disabled]=\"!(selectedAddress$ | async)?.id\"\n            (click)=\"next()\"\n          >\n            {{ 'common.continue' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </ng-template>\n\n    <ng-template #newAddressForm>\n      <cx-address-form\n        *ngIf=\"cards.length; else initialAddressForm\"\n        [showTitleCode]=\"true\"\n        (backToAddress)=\"hideNewAddressForm(false)\"\n        (submitAddress)=\"addAddress($event)\"\n      ></cx-address-form>\n      <ng-template #initialAddressForm>\n        <cx-address-form\n          [showTitleCode]=\"true\"\n          [setAsDefaultField]=\"!isGuestCheckout\"\n          cancelBtnLabel=\"{{ backBtnText | cxTranslate }}\"\n          (backToAddress)=\"hideNewAddressForm(true)\"\n          (submitAddress)=\"addAddress($event)\"\n        ></cx-address-form>\n      </ng-template>\n    </ng-template>\n  </ng-container>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i7.AddressFormComponent, selector: "cx-address-form", inputs: ["addressData", "actionBtnLabel", "cancelBtnLabel", "setAsDefaultField", "showTitleCode", "showCancelBtn"], outputs: ["submitAddress", "backToAddress"] }, { kind: "component", type: i7.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "component", type: i7.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CheckoutDeliveryAddressComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-delivery-address', changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 class=\"cx-checkout-title d-none d-lg-block d-xl-block\">\n  {{ 'checkoutAddress.shippingAddress' | cxTranslate }}\n</h2>\n\n<ng-container *ngIf=\"cards$ | async as cards\">\n  <ng-container *ngIf=\"!(isUpdating$ | async); else loading\">\n    <div role=\"status\" [attr.aria-label]=\"'common.loaded' | cxTranslate\"></div>\n    <ng-container\n      *ngIf=\"\n        cards?.length && !addressFormOpened;\n        then showExistingAddresses;\n        else newAddressForm\n      \"\n    >\n    </ng-container>\n\n    <ng-template #showExistingAddresses>\n      <p class=\"cx-checkout-text\">\n        {{ 'checkoutAddress.selectYourDeliveryAddress' | cxTranslate }}\n      </p>\n      <div class=\"cx-checkout-btns row\">\n        <div class=\"col-sm-12 col-md-12 col-lg-6\">\n          <button\n            class=\"btn btn-block btn-secondary\"\n            (click)=\"showNewAddressForm()\"\n          >\n            {{ 'checkoutAddress.addNewAddress' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-body row\">\n        <div\n          class=\"cx-delivery-address-card col-md-12 col-lg-6\"\n          *ngFor=\"let card of cards; let i = index\"\n        >\n          <div\n            class=\"cx-delivery-address-card-inner\"\n            (click)=\"selectAddress(card.address)\"\n          >\n            <cx-card\n              [border]=\"true\"\n              [index]=\"i\"\n              [fitToContainer]=\"true\"\n              [content]=\"card.card\"\n              (sendCard)=\"selectAddress(card.address)\"\n            ></cx-card>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"cx-checkout-btns row\">\n        <div class=\"col-md-12 col-lg-6\">\n          <button class=\"cx-btn btn btn-block btn-secondary\" (click)=\"back()\">\n            {{ backBtnText | cxTranslate }}\n          </button>\n        </div>\n        <div class=\"col-md-12 col-lg-6\">\n          <button\n            class=\"cx-btn btn btn-block btn-primary\"\n            [disabled]=\"!(selectedAddress$ | async)?.id\"\n            (click)=\"next()\"\n          >\n            {{ 'common.continue' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </ng-template>\n\n    <ng-template #newAddressForm>\n      <cx-address-form\n        *ngIf=\"cards.length; else initialAddressForm\"\n        [showTitleCode]=\"true\"\n        (backToAddress)=\"hideNewAddressForm(false)\"\n        (submitAddress)=\"addAddress($event)\"\n      ></cx-address-form>\n      <ng-template #initialAddressForm>\n        <cx-address-form\n          [showTitleCode]=\"true\"\n          [setAsDefaultField]=\"!isGuestCheckout\"\n          cancelBtnLabel=\"{{ backBtnText | cxTranslate }}\"\n          (backToAddress)=\"hideNewAddressForm(true)\"\n          (submitAddress)=\"addAddress($event)\"\n        ></cx-address-form>\n      </ng-template>\n    </ng-template>\n  </ng-container>\n</ng-container>\n\n<ng-template #loading>\n  <div class=\"cx-spinner\">\n    <cx-spinner></cx-spinner>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.UserAddressService }, { type: i2.CheckoutDeliveryAddressFacade }, { type: i3.ActivatedRoute }, { type: i1.TranslationService }, { type: i4.ActiveCartFacade }, { type: i5.CheckoutStepService }, { type: i2.CheckoutDeliveryModesFacade }, { type: i1.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb21wb25lbnRzL2NoZWNrb3V0LWRlbGl2ZXJ5LWFkZHJlc3MvY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYmFzZS9jb21wb25lbnRzL2NoZWNrb3V0LWRlbGl2ZXJ5LWFkZHJlc3MvY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQU8zRSxPQUFPLEVBRUwsZ0JBQWdCLEVBRWhCLGlCQUFpQixHQUdsQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBUSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ2xFLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLEdBQUcsRUFDSCxTQUFTLEVBQ1QsR0FBRyxHQUNKLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7OztBQWF4QixNQUFNLE9BQU8sZ0NBQWdDO0lBUzNDLElBQUksZUFBZTtRQUNqQixPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsSUFB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Q2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7NkhBL1BVLGdDQUFnQztpSEFBaEMsZ0NBQWdDLDJEQzFDN0MsbWdHQThGQTsyRkRwRGEsZ0NBQWdDO2tCQUw1QyxTQUFTOytCQUNFLHFCQUFxQixtQkFFZCx1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBY3RpdmVDYXJ0RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSxcbiAgQ2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NoZWNrb3V0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQge1xuICBBZGRyZXNzLFxuICBnZXRMYXN0VmFsdWVTeW5jLFxuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIFRyYW5zbGF0aW9uU2VydmljZSxcbiAgVXNlckFkZHJlc3NTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ2FyZCwgZ2V0QWRkcmVzc051bWJlcnMgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHN3aXRjaE1hcCxcbiAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDaGVja291dFN0ZXBTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY2hlY2tvdXQtc3RlcC5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBDYXJkV2l0aEFkZHJlc3Mge1xuICBjYXJkOiBDYXJkO1xuICBhZGRyZXNzOiBBZGRyZXNzO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1kZWxpdmVyeS1hZGRyZXNzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NoZWNrb3V0LWRlbGl2ZXJ5LWFkZHJlc3MuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwcm90ZWN0ZWQgYnVzeSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBjYXJkcyQ6IE9ic2VydmFibGU8Q2FyZFdpdGhBZGRyZXNzW10+O1xuICBpc1VwZGF0aW5nJDogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICBhZGRyZXNzRm9ybU9wZW5lZCA9IGZhbHNlO1xuICBkb25lQXV0b1NlbGVjdCA9IGZhbHNlO1xuXG4gIGdldCBpc0d1ZXN0Q2hlY2tvdXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhZ2V0TGFzdFZhbHVlU3luYyh0aGlzLmFjdGl2ZUNhcnRGYWNhZGUuaXNHdWVzdENhcnQoKSk7XG4gIH1cblxuICBnZXQgYmFja0J0blRleHQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jaGVja291dFN0ZXBTZXJ2aWNlLmdldEJhY2tCbnRUZXh0KHRoaXMuYWN0aXZhdGVkUm91dGUpO1xuICB9XG5cbiAgZ2V0IHNlbGVjdGVkQWRkcmVzcyQoKTogT2JzZXJ2YWJsZTxBZGRyZXNzIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tvdXREZWxpdmVyeUFkZHJlc3NGYWNhZGUuZ2V0RGVsaXZlcnlBZGRyZXNzU3RhdGUoKS5waXBlKFxuICAgICAgZmlsdGVyKChzdGF0ZSkgPT4gIXN0YXRlLmxvYWRpbmcpLFxuICAgICAgbWFwKChzdGF0ZSkgPT4gc3RhdGUuZGF0YSksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgocHJldiwgY3VycikgPT4gcHJldj8uaWQgPT09IGN1cnI/LmlkKVxuICAgICk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgdXNlckFkZHJlc3NTZXJ2aWNlOiBVc2VyQWRkcmVzc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRmFjYWRlOiBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByb3RlY3RlZCB0cmFuc2xhdGlvblNlcnZpY2U6IFRyYW5zbGF0aW9uU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYWN0aXZlQ2FydEZhY2FkZTogQWN0aXZlQ2FydEZhY2FkZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXRTdGVwU2VydmljZTogQ2hlY2tvdXRTdGVwU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlOiBDaGVja291dERlbGl2ZXJ5TW9kZXNGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGdsb2JhbE1lc3NhZ2VTZXJ2aWNlOiBHbG9iYWxNZXNzYWdlU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5sb2FkQWRkcmVzc2VzKCk7XG5cbiAgICB0aGlzLmNhcmRzJCA9IHRoaXMuY3JlYXRlQ2FyZHMoKTtcbiAgICB0aGlzLmlzVXBkYXRpbmckID0gdGhpcy5jcmVhdGVJc1VwZGF0aW5nKCk7XG4gIH1cblxuICBnZXRDYXJkQ29udGVudChcbiAgICBhZGRyZXNzOiBBZGRyZXNzLFxuICAgIHNlbGVjdGVkOiBhbnksXG4gICAgdGV4dERlZmF1bHREZWxpdmVyeUFkZHJlc3M6IHN0cmluZyxcbiAgICB0ZXh0U2hpcFRvVGhpc0FkZHJlc3M6IHN0cmluZyxcbiAgICB0ZXh0U2VsZWN0ZWQ6IHN0cmluZyxcbiAgICB0ZXh0UGhvbmU6IHN0cmluZyxcbiAgICB0ZXh0TW9iaWxlOiBzdHJpbmdcbiAgKTogQ2FyZCB7XG4gICAgbGV0IHJlZ2lvbiA9ICcnO1xuICAgIGlmIChhZGRyZXNzLnJlZ2lvbiAmJiBhZGRyZXNzLnJlZ2lvbi5pc29jb2RlKSB7XG4gICAgICByZWdpb24gPSBhZGRyZXNzLnJlZ2lvbi5pc29jb2RlICsgJywgJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUT0RPOiAoI0NYU1BBLTUzKSBSZW1vdmUgZmVhdHVyZSBjb25maWcgY2hlY2sgaW4gNi4wXG4gICAgICovXG4gICAgY29uc3QgbnVtYmVycyA9IGdldEFkZHJlc3NOdW1iZXJzKGFkZHJlc3MsIHRleHRQaG9uZSwgdGV4dE1vYmlsZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcm9sZTogJ3JlZ2lvbicsXG4gICAgICB0aXRsZTogYWRkcmVzcy5kZWZhdWx0QWRkcmVzcyA/IHRleHREZWZhdWx0RGVsaXZlcnlBZGRyZXNzIDogJycsXG4gICAgICB0ZXh0Qm9sZDogYWRkcmVzcy5maXJzdE5hbWUgKyAnICcgKyBhZGRyZXNzLmxhc3ROYW1lLFxuICAgICAgdGV4dDogW1xuICAgICAgICBhZGRyZXNzLmxpbmUxLFxuICAgICAgICBhZGRyZXNzLmxpbmUyLFxuICAgICAgICBhZGRyZXNzLnRvd24gKyAnLCAnICsgcmVnaW9uICsgYWRkcmVzcy5jb3VudHJ5Py5pc29jb2RlLFxuICAgICAgICBhZGRyZXNzLnBvc3RhbENvZGUsXG4gICAgICAgIG51bWJlcnMsXG4gICAgICBdLFxuICAgICAgYWN0aW9uczogW3sgbmFtZTogdGV4dFNoaXBUb1RoaXNBZGRyZXNzLCBldmVudDogJ3NlbmQnIH1dLFxuICAgICAgaGVhZGVyOiBzZWxlY3RlZCAmJiBzZWxlY3RlZC5pZCA9PT0gYWRkcmVzcy5pZCA/IHRleHRTZWxlY3RlZCA6ICcnLFxuICAgICAgbGFiZWw6IGFkZHJlc3MuZGVmYXVsdEFkZHJlc3NcbiAgICAgICAgPyAnYWRkcmVzc0Jvb2suZGVmYXVsdERlbGl2ZXJ5QWRkcmVzcydcbiAgICAgICAgOiAnYWRkcmVzc0Jvb2suYWRkaXRpb25hbERlbGl2ZXJ5QWRkcmVzcycsXG4gICAgfSBhcyBDYXJkO1xuICB9XG5cbiAgc2VsZWN0QWRkcmVzcyhhZGRyZXNzOiBBZGRyZXNzKTogdm9pZCB7XG4gICAgaWYgKGFkZHJlc3M/LmlkID09PSBnZXRMYXN0VmFsdWVTeW5jKHRoaXMuc2VsZWN0ZWRBZGRyZXNzJCk/LmlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICB7XG4gICAgICAgIGtleTogJ2NoZWNrb3V0QWRkcmVzcy5kZWxpdmVyeUFkZHJlc3NTZWxlY3RlZCcsXG4gICAgICB9LFxuICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfSU5GT1xuICAgICk7XG5cbiAgICB0aGlzLnNldEFkZHJlc3MoYWRkcmVzcyk7XG4gIH1cblxuICBhZGRBZGRyZXNzKGFkZHJlc3M6IEFkZHJlc3MgfCB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICBpZiAoIWFkZHJlc3MpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmJ1c3kkLm5leHQodHJ1ZSk7XG4gICAgdGhpcy5kb25lQXV0b1NlbGVjdCA9IHRydWU7XG5cbiAgICB0aGlzLmNoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRmFjYWRlXG4gICAgICAuY3JlYXRlQW5kU2V0QWRkcmVzcyhhZGRyZXNzKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgIHRoaXMuY2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlLmNsZWFyQ2hlY2tvdXREZWxpdmVyeU1vZGUoKVxuICAgICAgICApXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICAvLyB3ZSBkb24ndCBjYWxsIG9uU3VjY2VzcyBoZXJlLCBiZWNhdXNlIGl0IGNhbiBjYXVzZSBhIHNwaW5uZXIgZmxpY2tlcmluZ1xuICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICAgIHRoaXMub25FcnJvcigpO1xuICAgICAgICAgIHRoaXMuZG9uZUF1dG9TZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICB9XG5cbiAgc2hvd05ld0FkZHJlc3NGb3JtKCk6IHZvaWQge1xuICAgIHRoaXMuYWRkcmVzc0Zvcm1PcGVuZWQgPSB0cnVlO1xuICB9XG5cbiAgaGlkZU5ld0FkZHJlc3NGb3JtKGdvUHJldmlvdXM6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMuYWRkcmVzc0Zvcm1PcGVuZWQgPSBmYWxzZTtcbiAgICBpZiAoZ29QcmV2aW91cykge1xuICAgICAgdGhpcy5iYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgbmV4dCgpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrb3V0U3RlcFNlcnZpY2UubmV4dCh0aGlzLmFjdGl2YXRlZFJvdXRlKTtcbiAgfVxuXG4gIGJhY2soKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja291dFN0ZXBTZXJ2aWNlLmJhY2sodGhpcy5hY3RpdmF0ZWRSb3V0ZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgbG9hZEFkZHJlc3NlcygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNHdWVzdENoZWNrb3V0KSB7XG4gICAgICB0aGlzLnVzZXJBZGRyZXNzU2VydmljZS5sb2FkQWRkcmVzc2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGNyZWF0ZUNhcmRzKCk6IE9ic2VydmFibGU8Q2FyZFdpdGhBZGRyZXNzW10+IHtcbiAgICBjb25zdCBhZGRyZXNzZXMkID0gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLmdldFN1cHBvcnRlZEFkZHJlc3NlcygpLFxuICAgICAgdGhpcy5zZWxlY3RlZEFkZHJlc3MkLFxuICAgIF0pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9ucyQgPSBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZShcbiAgICAgICAgJ2NoZWNrb3V0QWRkcmVzcy5kZWZhdWx0RGVsaXZlcnlBZGRyZXNzJ1xuICAgICAgKSxcbiAgICAgIHRoaXMudHJhbnNsYXRpb25TZXJ2aWNlLnRyYW5zbGF0ZSgnY2hlY2tvdXRBZGRyZXNzLnNoaXBUb1RoaXNBZGRyZXNzJyksXG4gICAgICB0aGlzLnRyYW5zbGF0aW9uU2VydmljZS50cmFuc2xhdGUoJ2FkZHJlc3NDYXJkLnNlbGVjdGVkJyksXG4gICAgICB0aGlzLnRyYW5zbGF0aW9uU2VydmljZS50cmFuc2xhdGUoJ2FkZHJlc3NDYXJkLnBob25lTnVtYmVyJyksXG4gICAgICB0aGlzLnRyYW5zbGF0aW9uU2VydmljZS50cmFuc2xhdGUoJ2FkZHJlc3NDYXJkLm1vYmlsZU51bWJlcicpLFxuICAgIF0pO1xuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW2FkZHJlc3NlcyQsIHRyYW5zbGF0aW9ucyRdKS5waXBlKFxuICAgICAgdGFwKChbW2FkZHJlc3Nlcywgc2VsZWN0ZWRdXSkgPT5cbiAgICAgICAgdGhpcy5zZWxlY3REZWZhdWx0QWRkcmVzcyhhZGRyZXNzZXMsIHNlbGVjdGVkKVxuICAgICAgKSxcbiAgICAgIG1hcChcbiAgICAgICAgKFtcbiAgICAgICAgICBbYWRkcmVzc2VzLCBzZWxlY3RlZF0sXG4gICAgICAgICAgW3RleHREZWZhdWx0LCB0ZXh0U2hpcFRvLCB0ZXh0U2VsZWN0ZWQsIHRleHRQaG9uZSwgdGV4dE1vYmlsZV0sXG4gICAgICAgIF0pID0+XG4gICAgICAgICAgYWRkcmVzc2VzPy5tYXAoKGFkZHJlc3MpID0+ICh7XG4gICAgICAgICAgICBhZGRyZXNzLFxuICAgICAgICAgICAgY2FyZDogdGhpcy5nZXRDYXJkQ29udGVudChcbiAgICAgICAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgICAgICAgc2VsZWN0ZWQsXG4gICAgICAgICAgICAgIHRleHREZWZhdWx0LFxuICAgICAgICAgICAgICB0ZXh0U2hpcFRvLFxuICAgICAgICAgICAgICB0ZXh0U2VsZWN0ZWQsXG4gICAgICAgICAgICAgIHRleHRQaG9uZSxcbiAgICAgICAgICAgICAgdGV4dE1vYmlsZVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNlbGVjdERlZmF1bHRBZGRyZXNzKFxuICAgIGFkZHJlc3NlczogQWRkcmVzc1tdLFxuICAgIHNlbGVjdGVkOiBBZGRyZXNzIHwgdW5kZWZpbmVkXG4gICk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgICF0aGlzLmRvbmVBdXRvU2VsZWN0ICYmXG4gICAgICBhZGRyZXNzZXM/Lmxlbmd0aCAmJlxuICAgICAgKCFzZWxlY3RlZCB8fCBPYmplY3Qua2V5cyhzZWxlY3RlZCkubGVuZ3RoID09PSAwKVxuICAgICkge1xuICAgICAgc2VsZWN0ZWQgPSBhZGRyZXNzZXMuZmluZCgoYWRkcmVzcykgPT4gYWRkcmVzcy5kZWZhdWx0QWRkcmVzcyk7XG4gICAgICBpZiAoc2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zZXRBZGRyZXNzKHNlbGVjdGVkKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZG9uZUF1dG9TZWxlY3QgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRTdXBwb3J0ZWRBZGRyZXNzZXMoKTogT2JzZXJ2YWJsZTxBZGRyZXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy51c2VyQWRkcmVzc1NlcnZpY2UuZ2V0QWRkcmVzc2VzKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3JlYXRlSXNVcGRhdGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLmJ1c3kkLFxuICAgICAgdGhpcy51c2VyQWRkcmVzc1NlcnZpY2UuZ2V0QWRkcmVzc2VzTG9hZGluZygpLFxuICAgICAgdGhpcy5nZXRBZGRyZXNzTG9hZGluZygpLFxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChbYnVzeSwgdXNlckFkZHJlc3NMb2FkaW5nLCBkZWxpdmVyeUFkZHJlc3NMb2FkaW5nXSkgPT5cbiAgICAgICAgICBidXN5IHx8IHVzZXJBZGRyZXNzTG9hZGluZyB8fCBkZWxpdmVyeUFkZHJlc3NMb2FkaW5nXG4gICAgICApLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0QWRkcmVzc0xvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuY2hlY2tvdXREZWxpdmVyeUFkZHJlc3NGYWNhZGUuZ2V0RGVsaXZlcnlBZGRyZXNzU3RhdGUoKS5waXBlKFxuICAgICAgbWFwKChzdGF0ZSkgPT4gc3RhdGUubG9hZGluZyksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXRBZGRyZXNzKGFkZHJlc3M6IEFkZHJlc3MpOiB2b2lkIHtcbiAgICB0aGlzLmJ1c3kkLm5leHQodHJ1ZSk7XG4gICAgdGhpcy5jaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZVxuICAgICAgLnNldERlbGl2ZXJ5QWRkcmVzcyhhZGRyZXNzKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PlxuICAgICAgICAgIHRoaXMuY2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlLmNsZWFyQ2hlY2tvdXREZWxpdmVyeU1vZGUoKVxuICAgICAgICApXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLm9uU3VjY2VzcygpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICAgIHRoaXMub25FcnJvcigpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25TdWNjZXNzKCk6IHZvaWQge1xuICAgIHRoaXMuYnVzeSQubmV4dChmYWxzZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb25FcnJvcigpOiB2b2lkIHtcbiAgICB0aGlzLmJ1c3kkLm5leHQoZmFsc2UpO1xuICB9XG59XG4iLCI8aDIgY2xhc3M9XCJjeC1jaGVja291dC10aXRsZSBkLW5vbmUgZC1sZy1ibG9jayBkLXhsLWJsb2NrXCI+XG4gIHt7ICdjaGVja291dEFkZHJlc3Muc2hpcHBpbmdBZGRyZXNzJyB8IGN4VHJhbnNsYXRlIH19XG48L2gyPlxuXG48bmctY29udGFpbmVyICpuZ0lmPVwiY2FyZHMkIHwgYXN5bmMgYXMgY2FyZHNcIj5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiEoaXNVcGRhdGluZyQgfCBhc3luYyk7IGVsc2UgbG9hZGluZ1wiPlxuICAgIDxkaXYgcm9sZT1cInN0YXR1c1wiIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2NvbW1vbi5sb2FkZWQnIHwgY3hUcmFuc2xhdGVcIj48L2Rpdj5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAqbmdJZj1cIlxuICAgICAgICBjYXJkcz8ubGVuZ3RoICYmICFhZGRyZXNzRm9ybU9wZW5lZDtcbiAgICAgICAgdGhlbiBzaG93RXhpc3RpbmdBZGRyZXNzZXM7XG4gICAgICAgIGVsc2UgbmV3QWRkcmVzc0Zvcm1cbiAgICAgIFwiXG4gICAgPlxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPG5nLXRlbXBsYXRlICNzaG93RXhpc3RpbmdBZGRyZXNzZXM+XG4gICAgICA8cCBjbGFzcz1cImN4LWNoZWNrb3V0LXRleHRcIj5cbiAgICAgICAge3sgJ2NoZWNrb3V0QWRkcmVzcy5zZWxlY3RZb3VyRGVsaXZlcnlBZGRyZXNzJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgICA8L3A+XG4gICAgICA8ZGl2IGNsYXNzPVwiY3gtY2hlY2tvdXQtYnRucyByb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1zbS0xMiBjb2wtbWQtMTIgY29sLWxnLTZcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLXNlY29uZGFyeVwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2hvd05ld0FkZHJlc3NGb3JtKClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt7ICdjaGVja291dEFkZHJlc3MuYWRkTmV3QWRkcmVzcycgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiY3gtY2hlY2tvdXQtYm9keSByb3dcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzPVwiY3gtZGVsaXZlcnktYWRkcmVzcy1jYXJkIGNvbC1tZC0xMiBjb2wtbGctNlwiXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNhcmQgb2YgY2FyZHM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJjeC1kZWxpdmVyeS1hZGRyZXNzLWNhcmQtaW5uZXJcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdEFkZHJlc3MoY2FyZC5hZGRyZXNzKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGN4LWNhcmRcbiAgICAgICAgICAgICAgW2JvcmRlcl09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgW2luZGV4XT1cImlcIlxuICAgICAgICAgICAgICBbZml0VG9Db250YWluZXJdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgIFtjb250ZW50XT1cImNhcmQuY2FyZFwiXG4gICAgICAgICAgICAgIChzZW5kQ2FyZCk9XCJzZWxlY3RBZGRyZXNzKGNhcmQuYWRkcmVzcylcIlxuICAgICAgICAgICAgPjwvY3gtY2FyZD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImN4LWNoZWNrb3V0LWJ0bnMgcm93XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgY29sLWxnLTZcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiY3gtYnRuIGJ0biBidG4tYmxvY2sgYnRuLXNlY29uZGFyeVwiIChjbGljayk9XCJiYWNrKClcIj5cbiAgICAgICAgICAgIHt7IGJhY2tCdG5UZXh0IHwgY3hUcmFuc2xhdGUgfX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtMTIgY29sLWxnLTZcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBjbGFzcz1cImN4LWJ0biBidG4gYnRuLWJsb2NrIGJ0bi1wcmltYXJ5XCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhKHNlbGVjdGVkQWRkcmVzcyQgfCBhc3luYyk/LmlkXCJcbiAgICAgICAgICAgIChjbGljayk9XCJuZXh0KClcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt7ICdjb21tb24uY29udGludWUnIHwgY3hUcmFuc2xhdGUgfX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgPG5nLXRlbXBsYXRlICNuZXdBZGRyZXNzRm9ybT5cbiAgICAgIDxjeC1hZGRyZXNzLWZvcm1cbiAgICAgICAgKm5nSWY9XCJjYXJkcy5sZW5ndGg7IGVsc2UgaW5pdGlhbEFkZHJlc3NGb3JtXCJcbiAgICAgICAgW3Nob3dUaXRsZUNvZGVdPVwidHJ1ZVwiXG4gICAgICAgIChiYWNrVG9BZGRyZXNzKT1cImhpZGVOZXdBZGRyZXNzRm9ybShmYWxzZSlcIlxuICAgICAgICAoc3VibWl0QWRkcmVzcyk9XCJhZGRBZGRyZXNzKCRldmVudClcIlxuICAgICAgPjwvY3gtYWRkcmVzcy1mb3JtPlxuICAgICAgPG5nLXRlbXBsYXRlICNpbml0aWFsQWRkcmVzc0Zvcm0+XG4gICAgICAgIDxjeC1hZGRyZXNzLWZvcm1cbiAgICAgICAgICBbc2hvd1RpdGxlQ29kZV09XCJ0cnVlXCJcbiAgICAgICAgICBbc2V0QXNEZWZhdWx0RmllbGRdPVwiIWlzR3Vlc3RDaGVja291dFwiXG4gICAgICAgICAgY2FuY2VsQnRuTGFiZWw9XCJ7eyBiYWNrQnRuVGV4dCB8IGN4VHJhbnNsYXRlIH19XCJcbiAgICAgICAgICAoYmFja1RvQWRkcmVzcyk9XCJoaWRlTmV3QWRkcmVzc0Zvcm0odHJ1ZSlcIlxuICAgICAgICAgIChzdWJtaXRBZGRyZXNzKT1cImFkZEFkZHJlc3MoJGV2ZW50KVwiXG4gICAgICAgID48L2N4LWFkZHJlc3MtZm9ybT5cbiAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbiAgPC9uZy1jb250YWluZXI+XG48L25nLWNvbnRhaW5lcj5cblxuPG5nLXRlbXBsYXRlICNsb2FkaW5nPlxuICA8ZGl2IGNsYXNzPVwiY3gtc3Bpbm5lclwiPlxuICAgIDxjeC1zcGlubmVyPjwvY3gtc3Bpbm5lcj5cbiAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuIl19