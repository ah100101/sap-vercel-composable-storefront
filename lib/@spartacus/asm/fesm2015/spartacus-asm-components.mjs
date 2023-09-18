import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, ViewChild, Injectable, EventEmitter, Input, Output, ViewChildren, Pipe, HostBinding, NgModule } from '@angular/core';
import * as i1 from '@spartacus/storefront';
import { DirectionMode, ICON_TYPE, BREAKPOINT, DIALOG_TYPE, FormErrorsModule, IconModule, SpinnerModule, PasswordVisibilityToggleModule, KeyboardFocusModule, NgSelectA11yModule, SortingModule } from '@spartacus/storefront';
import * as i1$1 from '@spartacus/core';
import { GlobalMessageType, OCC_CART_ID_CURRENT, I18nModule, provideDefaultConfig } from '@spartacus/core';
import * as i1$2 from '@angular/forms';
import { FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BehaviorSubject, Subscription, combineLatest, iif, defer, EMPTY, of, NEVER } from 'rxjs';
import { map, shareReplay, take, filter, tap, concatMap, finalize, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import * as i2 from '@spartacus/cart/base/root';
import * as i2$1 from '@spartacus/asm/root';
import { ASM_ENABLED_LOCAL_STORAGE_KEY, CustomerListColumnActionType } from '@spartacus/asm/root';
import * as i5 from '@spartacus/cart/saved-cart/root';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i6 from '@ng-select/ng-select';
import { NgSelectModule } from '@ng-select/ng-select';
import * as i2$2 from '@spartacus/asm/core';
import * as i2$3 from '@spartacus/user/account/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var BIND_CART_DIALOG_ACTION;
(function (BIND_CART_DIALOG_ACTION) {
    BIND_CART_DIALOG_ACTION["CANCEL"] = "CANCEL";
    BIND_CART_DIALOG_ACTION["REPLACE"] = "REPLACE";
})(BIND_CART_DIALOG_ACTION || (BIND_CART_DIALOG_ACTION = {}));
class AsmBindCartDialogComponent {
    constructor(launchDialogService) {
        this.launchDialogService = launchDialogService;
        this.BIND_CART_ACTION = BIND_CART_DIALOG_ACTION;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: true,
            focusOnEscape: true,
        };
    }
    closeModal(reason) {
        this.launchDialogService.closeDialog(reason);
    }
}
AsmBindCartDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmBindCartDialogComponent, deps: [{ token: i1.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
AsmBindCartDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: AsmBindCartDialogComponent, selector: "cx-asm-bind-cart-dialog", ngImport: i0, template: "<div\n  class=\"cx-asm-bind-cart-dialog cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal(BIND_CART_ACTION.CANCEL)\"\n>\n  <div class=\"cx-modal-content\">\n    <!-- Modal Header -->\n    <div class=\"cx-dialog-header modal-header\">\n      <h2 id=\"asm-bind-cart-dialog-title\" class=\"title modal-title\">\n        {{ 'asm.bindCart.dialog.title' | cxTranslate }}\n      </h2>\n    </div>\n\n    <!-- Modal Body -->\n    <div class=\"cx-dialog-body modal-body\">\n      <div class=\"cx-dialog-row\">\n        <div class=\"cx-dialog-item\">\n          {{ 'asm.bindCart.dialog.body' | cxTranslate }}\n        </div>\n      </div>\n    </div>\n\n    <!-- Modal Footer -->\n    <div class=\"cx-dialog-footer modal-footer\">\n      <button\n        (click)=\"closeModal(BIND_CART_ACTION.REPLACE)\"\n        [attr.aria-label]=\"'asm.bindCart.dialog.actions.replace' | cxTranslate\"\n        class=\"btn btn-primary\"\n        type=\"button\"\n      >\n        {{ 'asm.bindCart.dialog.actions.replace' | cxTranslate }}\n      </button>\n\n      <button\n        (click)=\"closeModal(BIND_CART_ACTION.CANCEL)\"\n        [attr.aria-label]=\"'common.cancel' | cxTranslate\"\n        class=\"btn btn-secondary\"\n        type=\"button\"\n      >\n        {{ 'common.cancel' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmBindCartDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-bind-cart-dialog', template: "<div\n  class=\"cx-asm-bind-cart-dialog cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal(BIND_CART_ACTION.CANCEL)\"\n>\n  <div class=\"cx-modal-content\">\n    <!-- Modal Header -->\n    <div class=\"cx-dialog-header modal-header\">\n      <h2 id=\"asm-bind-cart-dialog-title\" class=\"title modal-title\">\n        {{ 'asm.bindCart.dialog.title' | cxTranslate }}\n      </h2>\n    </div>\n\n    <!-- Modal Body -->\n    <div class=\"cx-dialog-body modal-body\">\n      <div class=\"cx-dialog-row\">\n        <div class=\"cx-dialog-item\">\n          {{ 'asm.bindCart.dialog.body' | cxTranslate }}\n        </div>\n      </div>\n    </div>\n\n    <!-- Modal Footer -->\n    <div class=\"cx-dialog-footer modal-footer\">\n      <button\n        (click)=\"closeModal(BIND_CART_ACTION.REPLACE)\"\n        [attr.aria-label]=\"'asm.bindCart.dialog.actions.replace' | cxTranslate\"\n        class=\"btn btn-primary\"\n        type=\"button\"\n      >\n        {{ 'asm.bindCart.dialog.actions.replace' | cxTranslate }}\n      </button>\n\n      <button\n        (click)=\"closeModal(BIND_CART_ACTION.CANCEL)\"\n        [attr.aria-label]=\"'common.cancel' | cxTranslate\"\n        class=\"btn btn-secondary\"\n        type=\"button\"\n      >\n        {{ 'common.cancel' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DotSpinnerComponent {
}
DotSpinnerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: DotSpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DotSpinnerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: DotSpinnerComponent, selector: "cx-dot-spinner", ngImport: i0, template: "<div></div>\n<div></div>\n<div></div>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: DotSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-dot-spinner', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div></div>\n<div></div>\n<div></div>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmBindCartComponent {
    constructor(globalMessageService, activeCartFacade, multiCartFacade, asmBindCartFacade, launchDialogService, savedCartFacade) {
        this.globalMessageService = globalMessageService;
        this.activeCartFacade = activeCartFacade;
        this.multiCartFacade = multiCartFacade;
        this.asmBindCartFacade = asmBindCartFacade;
        this.launchDialogService = launchDialogService;
        this.savedCartFacade = savedCartFacade;
        this.activeCartValidator = (control) => {
            if (control.value === this.activeCartId) {
                return { activeCartError: true };
            }
            return null;
        };
        this.cartId = new FormControl('', [
            Validators.required,
            Validators.minLength(1),
            this.activeCartValidator,
        ]);
        this.loading$ = new BehaviorSubject(false);
        this.valid$ = this.cartId.statusChanges.pipe(map((status) => status === 'VALID'), shareReplay(1));
        this.activeCartId = '';
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.activeCartFacade.getActiveCartId().subscribe((response) => {
            this.activeCartId = response !== null && response !== void 0 ? response : '';
            this.cartId.setValue(this.activeCartId);
        }));
    }
    resetInput() {
        if (!this.cartId.value) {
            this.cartId.setValue(this.activeCartId);
        }
    }
    /**
     * Bind the input cart number to the customer
     */
    bindCartToCustomer() {
        const anonymousCartId = this.cartId.value;
        const subscription = combineLatest([
            this.loading$.asObservable(),
            this.valid$,
        ])
            .pipe(take(1), filter(([loading, valid]) => !loading && valid), tap(() => this.loading$.next(true)), concatMap(() => this.activeCartFacade.getActive().pipe(map((cart) => { var _a; return (_a = cart.deliveryItemsQuantity) !== null && _a !== void 0 ? _a : 0; }), take(1))), concatMap((cartItemCount) => iif(() => Boolean(this.activeCartId && cartItemCount), this.openDialog(this.activeCartId, anonymousCartId), this.simpleBindCart(anonymousCartId))), finalize(() => this.loading$.next(false)))
            .subscribe(() => {
            this.globalMessageService.add({ key: 'asm.bindCart.success' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }, (error) => {
            var _a, _b;
            this.globalMessageService.add((_b = (_a = error.details) === null || _a === void 0 ? void 0 : _a[0].message) !== null && _b !== void 0 ? _b : '', GlobalMessageType.MSG_TYPE_ERROR);
        });
        this.subscription.add(subscription);
    }
    clearText() {
        this.cartId.setValue('');
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * Binds cart on subscription and reloads cart
     */
    simpleBindCart(anonymousCartId) {
        return defer(() => this.asmBindCartFacade.bindCart(anonymousCartId)).pipe(tap(() => this.multiCartFacade.reloadCart(OCC_CART_ID_CURRENT)));
    }
    /**
     * Opens dialog and passes non-cancel result to select action
     */
    openDialog(activeCartId, anonymousCartId) {
        return defer(() => {
            this.launchDialogService.openDialogAndSubscribe("ASM_BIND_CART" /* LAUNCH_CALLER.ASM_BIND_CART */, this.bindToCartElemRef);
            return this.launchDialogService.dialogClose.pipe(filter((result) => Boolean(result)), take(1));
        }).pipe(filter((dialogResult) => Boolean(dialogResult)), concatMap((dialogResult) => {
            return this.selectBindAction(activeCartId, anonymousCartId, dialogResult);
        }));
    }
    selectBindAction(activeCartId, anonymousCartId, action) {
        switch (action) {
            case BIND_CART_DIALOG_ACTION.REPLACE:
                return this.replaceCart(activeCartId, anonymousCartId);
            case BIND_CART_DIALOG_ACTION.CANCEL:
            default:
                return EMPTY;
        }
    }
    replaceCart(previousActiveCartId, anonymousCartId) {
        return this.simpleBindCart(anonymousCartId).pipe(tap(() => {
            this.savedCartFacade.saveCart({
                cartId: previousActiveCartId,
                saveCartName: previousActiveCartId,
                // TODO(#12660): Remove default value once backend is updated
                saveCartDescription: '-',
            });
        }));
    }
}
AsmBindCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmBindCartComponent, deps: [{ token: i1$1.GlobalMessageService }, { token: i2.ActiveCartFacade }, { token: i2.MultiCartFacade }, { token: i2$1.AsmBindCartFacade }, { token: i1.LaunchDialogService }, { token: i5.SavedCartFacade }], target: i0.ɵɵFactoryTarget.Component });
AsmBindCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: AsmBindCartComponent, selector: "cx-asm-bind-cart", viewQueries: [{ propertyName: "bindToCartElemRef", first: true, predicate: ["bindToCart"], descendants: true }], ngImport: i0, template: "<form (submit)=\"bindCartToCustomer()\">\n  <label for=\"cartNumber\">{{ 'asm.bindCart.cartNumber' | cxTranslate }} </label>\n  <div\n    role=\"search\"\n    [attr.aria-label]=\"'asm.bindCart.assignCartId' | cxTranslate\"\n    class=\"cx-asm-assignCart\"\n    [class.active]=\"valid$ | async\"\n    (click)=\"cartIdElement.focus()\"\n  >\n    <input\n      autocomplete=\"off\"\n      #cartIdElement\n      formcontrolname=\"cartNumber\"\n      [formControl]=\"cartId\"\n      (keydown.enter)=\"bindCartToCustomer()\"\n      (blur)=\"resetInput()\"\n      [attr.aria-label]=\"'asm.bindCart.enterCartId' | cxTranslate\"\n    />\n    <button\n      class=\"cx-asm-reset\"\n      [attr.aria-label]=\"'asm.bindCart.resetCartId' | cxTranslate\"\n      [class.visible]=\"cartId.value?.length > 0\"\n      (click)=\"clearText()\"\n    >\n      <cx-icon class=\"cx-icon fas fa-times-circle\"></cx-icon>\n    </button>\n  </div>\n  <button\n    #bindToCart\n    class=\"cx-asm-bindCartToCustomer\"\n    [disabled]=\"!(valid$ | async)\"\n    type=\"submit\"\n    [class.cx-asm-active]=\"valid$ | async\"\n    [class.cx-bind-loading]=\"loading$ | async\"\n  >\n    <span [attr.aria-hidden]=\"loading$ | async\">\n      {{ 'asm.bindCart.bindCartToCustomer' | cxTranslate }}\n    </span>\n    <cx-dot-spinner\n      [attr.aria-hidden]=\"!(loading$ | async)\"\n      [attr.aria-label]=\"'common.loading' | cxTranslate\"\n    ></cx-dot-spinner>\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i1$2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1$2.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: DotSpinnerComponent, selector: "cx-dot-spinner" }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmBindCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-bind-cart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form (submit)=\"bindCartToCustomer()\">\n  <label for=\"cartNumber\">{{ 'asm.bindCart.cartNumber' | cxTranslate }} </label>\n  <div\n    role=\"search\"\n    [attr.aria-label]=\"'asm.bindCart.assignCartId' | cxTranslate\"\n    class=\"cx-asm-assignCart\"\n    [class.active]=\"valid$ | async\"\n    (click)=\"cartIdElement.focus()\"\n  >\n    <input\n      autocomplete=\"off\"\n      #cartIdElement\n      formcontrolname=\"cartNumber\"\n      [formControl]=\"cartId\"\n      (keydown.enter)=\"bindCartToCustomer()\"\n      (blur)=\"resetInput()\"\n      [attr.aria-label]=\"'asm.bindCart.enterCartId' | cxTranslate\"\n    />\n    <button\n      class=\"cx-asm-reset\"\n      [attr.aria-label]=\"'asm.bindCart.resetCartId' | cxTranslate\"\n      [class.visible]=\"cartId.value?.length > 0\"\n      (click)=\"clearText()\"\n    >\n      <cx-icon class=\"cx-icon fas fa-times-circle\"></cx-icon>\n    </button>\n  </div>\n  <button\n    #bindToCart\n    class=\"cx-asm-bindCartToCustomer\"\n    [disabled]=\"!(valid$ | async)\"\n    type=\"submit\"\n    [class.cx-asm-active]=\"valid$ | async\"\n    [class.cx-bind-loading]=\"loading$ | async\"\n  >\n    <span [attr.aria-hidden]=\"loading$ | async\">\n      {{ 'asm.bindCart.bindCartToCustomer' | cxTranslate }}\n    </span>\n    <cx-dot-spinner\n      [attr.aria-hidden]=\"!(loading$ | async)\"\n      [attr.aria-label]=\"'common.loading' | cxTranslate\"\n    ></cx-dot-spinner>\n  </button>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.GlobalMessageService }, { type: i2.ActiveCartFacade }, { type: i2.MultiCartFacade }, { type: i2$1.AsmBindCartFacade }, { type: i1.LaunchDialogService }, { type: i5.SavedCartFacade }]; }, propDecorators: { bindToCartElemRef: [{
                type: ViewChild,
                args: ['bindToCart']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmComponentService {
    constructor(authService, csAgentAuthService, winRef) {
        this.authService = authService;
        this.csAgentAuthService = csAgentAuthService;
        this.winRef = winRef;
    }
    logoutCustomerSupportAgentAndCustomer() {
        this.csAgentAuthService.logoutCustomerSupportAgent();
    }
    logoutCustomer() {
        this.authService.logout();
    }
    isCustomerEmulationSessionInProgress() {
        return this.csAgentAuthService.isCustomerEmulated();
    }
    /**
     * We're currently only removing the persisted storage in the browser
     * to ensure the ASM experience isn't loaded on the next visit. There are a few
     * optimizations we could think of:
     * - drop the `asm` parameter from the URL, in case it's still there
     * - remove the generated UI from the DOM (outlets currently do not support this)
     */
    unload() {
        if (this.winRef.localStorage) {
            this.winRef.localStorage.removeItem(ASM_ENABLED_LOCAL_STORAGE_KEY);
        }
    }
}
AsmComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmComponentService, deps: [{ token: i1$1.AuthService }, { token: i2$1.CsAgentAuthService }, { token: i1$1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
AsmComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.AuthService }, { type: i2$1.CsAgentAuthService }, { type: i1$1.WindowRef }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CSAgentLoginFormComponent {
    constructor(fb) {
        this.fb = fb;
        this.csAgentTokenLoading = false;
        this.submitEvent = new EventEmitter();
    }
    ngOnInit() {
        this.csAgentLoginForm = this.fb.group({
            userId: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }
    onSubmit() {
        var _a, _b;
        if (this.csAgentLoginForm.valid) {
            this.submitEvent.emit({
                userId: (_a = this.csAgentLoginForm.get('userId')) === null || _a === void 0 ? void 0 : _a.value,
                password: (_b = this.csAgentLoginForm.get('password')) === null || _b === void 0 ? void 0 : _b.value,
            });
        }
        else {
            this.csAgentLoginForm.markAllAsTouched();
        }
    }
}
CSAgentLoginFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CSAgentLoginFormComponent, deps: [{ token: i1$2.UntypedFormBuilder }], target: i0.ɵɵFactoryTarget.Component });
CSAgentLoginFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: CSAgentLoginFormComponent, selector: "cx-csagent-login-form", inputs: { csAgentTokenLoading: "csAgentTokenLoading" }, outputs: { submitEvent: "submitEvent" }, ngImport: i0, template: "<form\n  (ngSubmit)=\"onSubmit()\"\n  [formGroup]=\"csAgentLoginForm\"\n  *ngIf=\"!csAgentTokenLoading\"\n>\n  <label>\n    <input\n      required=\"true\"\n      type=\"text\"\n      formControlName=\"userId\"\n      placeholder=\"{{ 'asm.loginForm.userId.label' | cxTranslate }}\"\n      [attr.aria-label]=\"'asm.loginForm.userId.label' | cxTranslate\"\n    />\n    <cx-form-errors [control]=\"csAgentLoginForm.get('userId')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <input\n      required=\"true\"\n      type=\"password\"\n      placeholder=\"{{ 'asm.loginForm.password.label' | cxTranslate }}\"\n      formControlName=\"password\"\n      [attr.aria-label]=\"'asm.loginForm.password.label' | cxTranslate\"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors\n      [control]=\"csAgentLoginForm.get('password')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\">\n    {{ 'asm.loginForm.submit' | cxTranslate }}\n  </button>\n</form>\n\n<cx-dot-spinner\n  *ngIf=\"csAgentTokenLoading\"\n  aria-hidden=\"false\"\n  [attr.aria-label]=\"'common.loading' | cxTranslate\"\n></cx-dot-spinner>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "directive", type: i1.PasswordVisibilityToggleDirective, selector: "[cxPasswordVisibilitySwitch][type=\"password\"]" }, { kind: "component", type: DotSpinnerComponent, selector: "cx-dot-spinner" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CSAgentLoginFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-csagent-login-form', template: "<form\n  (ngSubmit)=\"onSubmit()\"\n  [formGroup]=\"csAgentLoginForm\"\n  *ngIf=\"!csAgentTokenLoading\"\n>\n  <label>\n    <input\n      required=\"true\"\n      type=\"text\"\n      formControlName=\"userId\"\n      placeholder=\"{{ 'asm.loginForm.userId.label' | cxTranslate }}\"\n      [attr.aria-label]=\"'asm.loginForm.userId.label' | cxTranslate\"\n    />\n    <cx-form-errors [control]=\"csAgentLoginForm.get('userId')\"></cx-form-errors>\n  </label>\n\n  <label>\n    <input\n      required=\"true\"\n      type=\"password\"\n      placeholder=\"{{ 'asm.loginForm.password.label' | cxTranslate }}\"\n      formControlName=\"password\"\n      [attr.aria-label]=\"'asm.loginForm.password.label' | cxTranslate\"\n      cxPasswordVisibilitySwitch\n    />\n    <cx-form-errors\n      [control]=\"csAgentLoginForm.get('password')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\">\n    {{ 'asm.loginForm.submit' | cxTranslate }}\n  </button>\n</form>\n\n<cx-dot-spinner\n  *ngIf=\"csAgentTokenLoading\"\n  aria-hidden=\"false\"\n  [attr.aria-label]=\"'common.loading' | cxTranslate\"\n></cx-dot-spinner>\n" }]
        }], ctorParameters: function () { return [{ type: i1$2.UntypedFormBuilder }]; }, propDecorators: { csAgentTokenLoading: [{
                type: Input
            }], submitEvent: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerSelectionComponent {
    constructor(fb, asmService, config, directionService) {
        this.fb = fb;
        this.asmService = asmService;
        this.config = config;
        this.directionService = directionService;
        this.subscription = new Subscription();
        this.submitEvent = new EventEmitter();
        this.activeFocusedButtonIndex = -1;
    }
    ngOnInit() {
        this.customerSelectionForm = this.fb.group({
            searchTerm: ['', Validators.required],
        });
        this.asmService.customerSearchReset();
        this.searchResultsLoading$ =
            this.asmService.getCustomerSearchResultsLoading();
        this.searchResults = this.asmService.getCustomerSearchResults();
        this.subscription.add(this.customerSelectionForm.controls.searchTerm.valueChanges
            .pipe(debounceTime(300))
            .subscribe((searchTermValue) => {
            this.handleSearchTerm(searchTermValue);
        }));
    }
    handleSearchTerm(searchTermValue) {
        var _a, _b;
        if (!!this.selectedCustomer &&
            searchTermValue !== this.selectedCustomer.name) {
            this.selectedCustomer = undefined;
        }
        if (Boolean(this.selectedCustomer)) {
            return;
        }
        this.asmService.customerSearchReset();
        this.activeFocusedButtonIndex = -1;
        if (searchTermValue.trim().length >= 3) {
            this.asmService.customerSearch({
                query: searchTermValue,
                pageSize: (_b = (_a = this.config.asm) === null || _a === void 0 ? void 0 : _a.customerSearch) === null || _b === void 0 ? void 0 : _b.maxResults,
            });
        }
    }
    selectCustomerFromList(event, customer) {
        this.selectedCustomer = customer;
        this.customerSelectionForm.controls.searchTerm.setValue(this.selectedCustomer.name);
        this.asmService.customerSearchReset();
        this.searchTerm.nativeElement.focus();
        event.preventDefault();
        event.stopPropagation();
    }
    onSubmit() {
        if (this.customerSelectionForm.valid && !!this.selectedCustomer) {
            this.submitEvent.emit({ customerId: this.selectedCustomer.customerId });
        }
        else {
            this.customerSelectionForm.markAllAsTouched();
        }
    }
    onDocumentClick(event) {
        if (Boolean(this.resultList)) {
            if (this.resultList.nativeElement.contains(event.target) ||
                this.searchTerm.nativeElement.contains(event.target)) {
                return;
            }
            else {
                this.asmService.customerSearchReset();
            }
        }
    }
    closeResults(event) {
        this.asmService.customerSearchReset();
        this.searchTerm.nativeElement.focus();
        event.preventDefault();
        event.stopPropagation();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.asmService.customerSearchReset();
    }
    /**
     * set focus to the first searched item
     * @param event keyboard event
     */
    focusFirstItem(event) {
        event.preventDefault();
        this.activeFocusedButtonIndex = 0;
        this.updateItemIndex(this.activeFocusedButtonIndex);
    }
    /**
     * set mouse cursor to the end of search text
     * @param event keyboard event
     */
    setSelectionEnd(event) {
        var _a;
        event.preventDefault();
        if ((_a = this.searchTerm.nativeElement.value) === null || _a === void 0 ? void 0 : _a.length) {
            const selectionStart = this.searchTerm.nativeElement.value.length;
            this.searchTerm.nativeElement.selectionStart = selectionStart;
            this.searchTerm.nativeElement.selectionEnd = selectionStart;
        }
    }
    /**
     * set focus on previous searh result item.  If no previous item then go to end of item.
     * @param event keyboard event
     */
    focusPreviousChild(event) {
        event.preventDefault();
        this.activeFocusedButtonIndex--;
        if (this.activeFocusedButtonIndex < 0) {
            this.activeFocusedButtonIndex = this.searchResultItems.length - 1;
        }
        this.updateItemIndex(this.activeFocusedButtonIndex);
    }
    /**
     * set focus on next searh result item.  if no next item then go to the first item
     * @param event keyboard event
     */
    focusNextChild(event) {
        event.preventDefault();
        this.activeFocusedButtonIndex++;
        if (this.activeFocusedButtonIndex > this.searchResultItems.length - 1) {
            this.activeFocusedButtonIndex = 0;
        }
        this.updateItemIndex(this.activeFocusedButtonIndex);
    }
    /**
     * set focus to input search text
     * @param event keyboard event
     */
    focusInputText(event) {
        var _a;
        event.preventDefault();
        this.activeFocusedButtonIndex = -1;
        this.searchTerm.nativeElement.focus();
        if ((_a = this.searchTerm.nativeElement.value) === null || _a === void 0 ? void 0 : _a.length) {
            let selectionPos = this.searchTerm.nativeElement.selectionEnd;
            const searchTermLength = this.searchTerm.nativeElement.value.length;
            if (this.isBackNavigation(event)) {
                selectionPos = selectionPos <= 0 ? 0 : selectionPos - 1;
            }
            else if (this.isForwardsNavigation(event)) {
                selectionPos =
                    selectionPos >= searchTermLength
                        ? searchTermLength
                        : selectionPos + 1;
            }
            else if (event.code === 'Home') {
                selectionPos = 0;
            }
            else if (event.code === 'End') {
                selectionPos = searchTermLength;
            }
            this.searchTerm.nativeElement.selectionStart = selectionPos;
            this.searchTerm.nativeElement.selectionEnd = selectionPos;
        }
    }
    /**
     * set focus to selected item
     * @param {number} selectedIndex - current selected item index
     */
    updateItemIndex(selectedIndex) {
        var _a, _b;
        (_b = (_a = this.searchResultItems.toArray()) === null || _a === void 0 ? void 0 : _a[selectedIndex]) === null || _b === void 0 ? void 0 : _b.nativeElement.focus();
    }
    /**
     * Verifies whether the user navigates into a subgroup of the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates into the subgroup, otherwise 'false'.
     * @protected
     */
    isForwardsNavigation(event) {
        return ((event.code === 'ArrowRight' && this.isLTRDirection()) ||
            (event.code === 'ArrowLeft' && this.isRTLDirection()));
    }
    /**
     * Verifies whether the user navigates from a subgroup back to the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
     * @protected
     */
    isBackNavigation(event) {
        return ((event.code === 'ArrowLeft' && this.isLTRDirection()) ||
            (event.code === 'ArrowRight' && this.isRTLDirection()));
    }
    isLTRDirection() {
        return this.directionService.getDirection() === DirectionMode.LTR;
    }
    isRTLDirection() {
        return this.directionService.getDirection() === DirectionMode.RTL;
    }
}
CustomerSelectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CustomerSelectionComponent, deps: [{ token: i1$2.UntypedFormBuilder }, { token: i2$2.AsmService }, { token: i2$1.AsmConfig }, { token: i1.DirectionService }], target: i0.ɵɵFactoryTarget.Component });
CustomerSelectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: CustomerSelectionComponent, selector: "cx-customer-selection", outputs: { submitEvent: "submitEvent" }, host: { listeners: { "document:click": "onDocumentClick($event)" } }, viewQueries: [{ propertyName: "resultList", first: true, predicate: ["resultList"], descendants: true }, { propertyName: "searchTerm", first: true, predicate: ["searchTerm"], descendants: true }, { propertyName: "searchResultItems", predicate: ["searchResultItem"], descendants: true }], ngImport: i0, template: "<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"customerSelectionForm\">\n  <label>\n    <input\n      required=\"true\"\n      #searchTerm\n      type=\"text\"\n      formControlName=\"searchTerm\"\n      [attr.aria-label]=\"'asm.customerSearch.searchTerm.label' | cxTranslate\"\n      placeholder=\"{{ 'asm.customerSearch.searchTerm.label' | cxTranslate }}\"\n      (keydown.arrowdown)=\"focusFirstItem($event)\"\n      (keydown.end)=\"setSelectionEnd($event)\"\n    />\n    <cx-form-errors\n      [control]=\"customerSelectionForm.get('searchTerm')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\" [class.active]=\"selectedCustomer\">\n    {{ 'asm.customerSearch.submit' | cxTranslate }}\n  </button>\n</form>\n\n<div *ngIf=\"searchResults | async as results\" class=\"asm-results\" #resultList>\n  <button\n    #searchResultItem\n    *ngFor=\"let result of results.entries; let i = index\"\n    [tabindex]=\"activeFocusedButtonIndex === i ? 0 : -1\"\n    [attr.aria-selected]=\"activeFocusedButtonIndex === i\"\n    [class.active]=\"activeFocusedButtonIndex === i\"\n    (keydown.arrowup)=\"focusPreviousChild($event)\"\n    (keydown.arrowdown)=\"focusNextChild($event)\"\n    (keydown.arrowright)=\"focusInputText($event)\"\n    (keydown.arrowleft)=\"focusInputText($event)\"\n    (keydown.enter)=\"selectCustomerFromList($event, result)\"\n    (keydown.escape)=\"closeResults($event)\"\n    (keydown.home)=\"focusInputText($event)\"\n    (keydown.end)=\"focusInputText($event)\"\n    (click)=\"selectCustomerFromList($event, result)\"\n  >\n    <span class=\"result-name\">{{ result.name }}</span>\n    <span class=\"result-id\">{{ result.uid }}</span>\n  </button>\n  <button\n    #searchResultItem\n    (click)=\"closeResults($event)\"\n    (keydown.enter)=\"closeResults($event)\"\n    (keydown.escape)=\"closeResults($event)\"\n    (keydown.arrowright)=\"focusInputText($event)\"\n    (keydown.arrowleft)=\"focusInputText($event)\"\n    (keydown.home)=\"focusInputText($event)\"\n    (keydown.end)=\"focusInputText($event)\"\n    [class.active]=\"activeFocusedButtonIndex === 0\"\n    [attr.aria-selected]=\"activeFocusedButtonIndex === 0\"\n    *ngIf=\"\n      !(searchResultsLoading$ | async) &&\n      searchTerm.value.length >= 3 &&\n      !!results.entries &&\n      results.entries.length <= 0\n    \"\n  >\n    {{ 'asm.customerSearch.noMatch' | cxTranslate }}\n  </button>\n</div>\n\n<div class=\"asm-results\" *ngIf=\"searchResultsLoading$ | async\">\n  <cx-dot-spinner\n    aria-hidden=\"false\"\n    [attr.aria-label]=\"'common.loading' | cxTranslate\"\n  ></cx-dot-spinner>\n</div>\n", dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1$2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1$2.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i1$2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1$2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: DotSpinnerComponent, selector: "cx-dot-spinner" }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CustomerSelectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-selection', host: {
                        '(document:click)': 'onDocumentClick($event)',
                    }, template: "<form (ngSubmit)=\"onSubmit()\" [formGroup]=\"customerSelectionForm\">\n  <label>\n    <input\n      required=\"true\"\n      #searchTerm\n      type=\"text\"\n      formControlName=\"searchTerm\"\n      [attr.aria-label]=\"'asm.customerSearch.searchTerm.label' | cxTranslate\"\n      placeholder=\"{{ 'asm.customerSearch.searchTerm.label' | cxTranslate }}\"\n      (keydown.arrowdown)=\"focusFirstItem($event)\"\n      (keydown.end)=\"setSelectionEnd($event)\"\n    />\n    <cx-form-errors\n      [control]=\"customerSelectionForm.get('searchTerm')\"\n    ></cx-form-errors>\n  </label>\n  <button type=\"submit\" [class.active]=\"selectedCustomer\">\n    {{ 'asm.customerSearch.submit' | cxTranslate }}\n  </button>\n</form>\n\n<div *ngIf=\"searchResults | async as results\" class=\"asm-results\" #resultList>\n  <button\n    #searchResultItem\n    *ngFor=\"let result of results.entries; let i = index\"\n    [tabindex]=\"activeFocusedButtonIndex === i ? 0 : -1\"\n    [attr.aria-selected]=\"activeFocusedButtonIndex === i\"\n    [class.active]=\"activeFocusedButtonIndex === i\"\n    (keydown.arrowup)=\"focusPreviousChild($event)\"\n    (keydown.arrowdown)=\"focusNextChild($event)\"\n    (keydown.arrowright)=\"focusInputText($event)\"\n    (keydown.arrowleft)=\"focusInputText($event)\"\n    (keydown.enter)=\"selectCustomerFromList($event, result)\"\n    (keydown.escape)=\"closeResults($event)\"\n    (keydown.home)=\"focusInputText($event)\"\n    (keydown.end)=\"focusInputText($event)\"\n    (click)=\"selectCustomerFromList($event, result)\"\n  >\n    <span class=\"result-name\">{{ result.name }}</span>\n    <span class=\"result-id\">{{ result.uid }}</span>\n  </button>\n  <button\n    #searchResultItem\n    (click)=\"closeResults($event)\"\n    (keydown.enter)=\"closeResults($event)\"\n    (keydown.escape)=\"closeResults($event)\"\n    (keydown.arrowright)=\"focusInputText($event)\"\n    (keydown.arrowleft)=\"focusInputText($event)\"\n    (keydown.home)=\"focusInputText($event)\"\n    (keydown.end)=\"focusInputText($event)\"\n    [class.active]=\"activeFocusedButtonIndex === 0\"\n    [attr.aria-selected]=\"activeFocusedButtonIndex === 0\"\n    *ngIf=\"\n      !(searchResultsLoading$ | async) &&\n      searchTerm.value.length >= 3 &&\n      !!results.entries &&\n      results.entries.length <= 0\n    \"\n  >\n    {{ 'asm.customerSearch.noMatch' | cxTranslate }}\n  </button>\n</div>\n\n<div class=\"asm-results\" *ngIf=\"searchResultsLoading$ | async\">\n  <cx-dot-spinner\n    aria-hidden=\"false\"\n    [attr.aria-label]=\"'common.loading' | cxTranslate\"\n  ></cx-dot-spinner>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1$2.UntypedFormBuilder }, { type: i2$2.AsmService }, { type: i2$1.AsmConfig }, { type: i1.DirectionService }]; }, propDecorators: { submitEvent: [{
                type: Output
            }], resultList: [{
                type: ViewChild,
                args: ['resultList']
            }], searchTerm: [{
                type: ViewChild,
                args: ['searchTerm']
            }], searchResultItems: [{
                type: ViewChildren,
                args: ['searchResultItem']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class FormatTimerPipe {
    transform(totalSeconds) {
        if (totalSeconds < 0) {
            totalSeconds = 0;
        }
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        let zeroPaddedMinutes;
        if (minutes < 10) {
            zeroPaddedMinutes = ('00' + minutes).slice(-2);
        }
        else {
            zeroPaddedMinutes = minutes + '';
        }
        const zeroPaddedSeconds = ('00' + seconds).slice(-2);
        return `${zeroPaddedMinutes}:${zeroPaddedSeconds}`;
    }
}
FormatTimerPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: FormatTimerPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
FormatTimerPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: FormatTimerPipe, name: "formatTimer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: FormatTimerPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'formatTimer',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmSessionTimerComponent {
    constructor(config, asmComponentService, routingService, changeDetectorRef, userIdService) {
        this.config = config;
        this.asmComponentService = asmComponentService;
        this.routingService = routingService;
        this.changeDetectorRef = changeDetectorRef;
        this.userIdService = userIdService;
        this.subscriptions = new Subscription();
        this.maxStartDelayInSeconds = 60000;
    }
    ngOnInit() {
        this.timeLeft = this.getTimerStartDelayInSeconds();
        this.interval = setInterval(() => {
            if (this.timeLeft > 0) {
                this.timeLeft--;
            }
            else {
                clearInterval(this.interval);
                this.asmComponentService.logoutCustomerSupportAgentAndCustomer();
            }
            this.changeDetectorRef.markForCheck();
        }, 1000);
        this.resetOnNavigate();
        this.resetOnCustomerSessionChange();
    }
    resetOnNavigate() {
        this.subscriptions.add(this.routingService.isNavigating().subscribe((isNavigating) => {
            if (isNavigating) {
                this.resetTimer();
            }
        }));
    }
    resetOnCustomerSessionChange() {
        this.subscriptions.add(this.userIdService
            .getUserId()
            .pipe(distinctUntilChanged())
            .subscribe(() => this.resetTimer()));
    }
    resetTimer() {
        if (this.timeLeft > 0) {
            this.timeLeft = this.getTimerStartDelayInSeconds();
        }
    }
    getTimerStartDelayInSeconds() {
        var _a, _b;
        if (((_b = (_a = this.config.asm) === null || _a === void 0 ? void 0 : _a.agentSessionTimer) === null || _b === void 0 ? void 0 : _b.startingDelayInSeconds) === undefined) {
            return 600;
        }
        if (this.config.asm.agentSessionTimer.startingDelayInSeconds >
            this.maxStartDelayInSeconds) {
            return this.maxStartDelayInSeconds;
        }
        else {
            return this.config.asm.agentSessionTimer.startingDelayInSeconds;
        }
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}
AsmSessionTimerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmSessionTimerComponent, deps: [{ token: i2$1.AsmConfig }, { token: AsmComponentService }, { token: i1$1.RoutingService }, { token: i0.ChangeDetectorRef }, { token: i1$1.UserIdService }], target: i0.ɵɵFactoryTarget.Component });
AsmSessionTimerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: AsmSessionTimerComponent, selector: "cx-asm-session-timer", ngImport: i0, template: "<span class=\"label\">{{ 'asm.agentSessionTimer.label' | cxTranslate }}:</span>\n<span class=\"time\"\n  >{{ timeLeft | formatTimer }}\n  {{ 'asm.agentSessionTimer.minutes' | cxTranslate }}</span\n>\n<button\n  class=\"reset\"\n  title=\"{{ 'asm.agentSessionTimer.reset' | cxTranslate }}\"\n  (click)=\"resetTimer()\"\n></button>\n", dependencies: [{ kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: FormatTimerPipe, name: "formatTimer" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmSessionTimerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-session-timer', template: "<span class=\"label\">{{ 'asm.agentSessionTimer.label' | cxTranslate }}:</span>\n<span class=\"time\"\n  >{{ timeLeft | formatTimer }}\n  {{ 'asm.agentSessionTimer.minutes' | cxTranslate }}</span\n>\n<button\n  class=\"reset\"\n  title=\"{{ 'asm.agentSessionTimer.reset' | cxTranslate }}\"\n  (click)=\"resetTimer()\"\n></button>\n" }]
        }], ctorParameters: function () { return [{ type: i2$1.AsmConfig }, { type: AsmComponentService }, { type: i1$1.RoutingService }, { type: i0.ChangeDetectorRef }, { type: i1$1.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerEmulationComponent {
    constructor(asmComponentService, userAccountFacade) {
        this.asmComponentService = asmComponentService;
        this.userAccountFacade = userAccountFacade;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.userAccountFacade.get().subscribe((user) => {
            if (user) {
                this.customer = user;
            }
        }));
        this.isCustomerEmulationSessionInProgress$ =
            this.asmComponentService.isCustomerEmulationSessionInProgress();
    }
    logoutCustomer() {
        this.asmComponentService.logoutCustomer();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CustomerEmulationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CustomerEmulationComponent, deps: [{ token: AsmComponentService }, { token: i2$3.UserAccountFacade }], target: i0.ɵɵFactoryTarget.Component });
CustomerEmulationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: CustomerEmulationComponent, selector: "cx-customer-emulation", ngImport: i0, template: "<ng-container *ngIf=\"isCustomerEmulationSessionInProgress$ | async\">\n  <div class=\"cx-asm-customerInfo\">\n    <label class=\"cx-asm-name\">{{ customer?.name }}</label>\n    <label class=\"cx-asm-uid\">{{ customer?.uid }}</label>\n  </div>\n  <cx-asm-bind-cart></cx-asm-bind-cart>\n  <button formcontrolname=\"logoutCustomer\" (click)=\"logoutCustomer()\">\n    {{ 'asm.endSession' | cxTranslate }}\n  </button>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: AsmBindCartComponent, selector: "cx-asm-bind-cart" }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CustomerEmulationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-emulation', template: "<ng-container *ngIf=\"isCustomerEmulationSessionInProgress$ | async\">\n  <div class=\"cx-asm-customerInfo\">\n    <label class=\"cx-asm-name\">{{ customer?.name }}</label>\n    <label class=\"cx-asm-uid\">{{ customer?.uid }}</label>\n  </div>\n  <cx-asm-bind-cart></cx-asm-bind-cart>\n  <button formcontrolname=\"logoutCustomer\" (click)=\"logoutCustomer()\">\n    {{ 'asm.endSession' | cxTranslate }}\n  </button>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: AsmComponentService }, { type: i2$3.UserAccountFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmToggleUiComponent {
    constructor(asmService) {
        this.asmService = asmService;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.asmService.getAsmUiState().subscribe((uiState) => {
            this.isCollapsed =
                uiState.collapsed === undefined ? false : uiState.collapsed;
        }));
    }
    toggleUi() {
        this.asmService.updateAsmUiState({ collapsed: !this.isCollapsed });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmToggleUiComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmToggleUiComponent, deps: [{ token: i2$2.AsmService }], target: i0.ɵɵFactoryTarget.Component });
AsmToggleUiComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: AsmToggleUiComponent, selector: "cx-asm-toggle-ui", ngImport: i0, template: "<a class=\"toggleUi\" (click)=\"toggleUi()\" tabindex=\"0\" role=\"button\">\n  <span [ngClass]=\"!isCollapsed ? 'collapseIcon' : 'expandIcon'\"></span>\n  <span *ngIf=\"!isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.collapse' | cxTranslate }}\n  </span>\n  <span *ngIf=\"isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.expand' | cxTranslate }}\n  </span>\n</a>\n", dependencies: [{ kind: "directive", type: i4.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmToggleUiComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-toggle-ui', template: "<a class=\"toggleUi\" (click)=\"toggleUi()\" tabindex=\"0\" role=\"button\">\n  <span [ngClass]=\"!isCollapsed ? 'collapseIcon' : 'expandIcon'\"></span>\n  <span *ngIf=\"!isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.collapse' | cxTranslate }}\n  </span>\n  <span *ngIf=\"isCollapsed\" class=\"label\">\n    {{ 'asm.toggleUi.expand' | cxTranslate }}\n  </span>\n</a>\n" }]
        }], ctorParameters: function () { return [{ type: i2$2.AsmService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmMainUiComponent {
    constructor(authService, csAgentAuthService, asmComponentService, globalMessageService, routingService, asmService, userAccountFacade, launchDialogService) {
        this.authService = authService;
        this.csAgentAuthService = csAgentAuthService;
        this.asmComponentService = asmComponentService;
        this.globalMessageService = globalMessageService;
        this.routingService = routingService;
        this.asmService = asmService;
        this.userAccountFacade = userAccountFacade;
        this.launchDialogService = launchDialogService;
        this.iconTypes = ICON_TYPE;
        this.disabled = false;
        this.startingCustomerSession = false;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.customerSupportAgentLoggedIn$ = this.csAgentAuthService
            .isCustomerSupportAgentLoggedIn()
            .pipe(distinctUntilChanged(), tap((loggedIn) => {
            if (!loggedIn) {
                this.closeModal();
            }
        }));
        this.csAgentTokenLoading$ =
            this.csAgentAuthService.getCustomerSupportAgentTokenLoading();
        this.customer$ = this.authService.isUserLoggedIn().pipe(switchMap((isLoggedIn) => {
            if (isLoggedIn) {
                this.handleCustomerSessionStartRedirection();
                return this.userAccountFacade.get();
            }
            else {
                return of(undefined);
            }
        }));
        this.isCollapsed$ = this.asmService
            .getAsmUiState()
            .pipe(map((uiState) => uiState.collapsed === undefined ? false : uiState.collapsed));
        this.subscription.add(this.launchDialogService.dialogClose
            .pipe(filter((result) => Boolean(result)))
            .subscribe((result) => {
            if (result.selectedUser) {
                this.startCustomerEmulationSession(result.selectedUser);
                if (result.actionType === CustomerListColumnActionType.ORDER_HISTORY) {
                    this.routingService.go({ cxRoute: 'orders' });
                }
            }
        }));
    }
    handleCustomerSessionStartRedirection() {
        this.asmComponentService
            .isCustomerEmulationSessionInProgress()
            .pipe(take(1))
            .subscribe((isCustomerEmulated) => {
            if (this.startingCustomerSession && isCustomerEmulated) {
                this.startingCustomerSession = false;
                this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
                this.routingService.go('/');
            }
        });
    }
    loginCustomerSupportAgent({ userId, password, }) {
        this.csAgentAuthService.authorizeCustomerSupportAgent(userId, password);
    }
    logout() {
        this.asmComponentService.logoutCustomerSupportAgentAndCustomer();
    }
    startCustomerEmulationSession({ customerId }) {
        if (customerId) {
            this.csAgentAuthService.startCustomerEmulationSession(customerId);
            this.startingCustomerSession = true;
        }
        else {
            this.globalMessageService.add({ key: 'asm.error.noCustomerId' }, GlobalMessageType.MSG_TYPE_ERROR);
        }
    }
    hideUi() {
        this.disabled = true;
        this.asmComponentService.unload();
    }
    showCustomList() {
        this.launchDialogService.openDialogAndSubscribe("ASM_CUSTOMER_LIST" /* LAUNCH_CALLER.ASM_CUSTOMER_LIST */, this.element);
    }
    closeModal() {
        this.launchDialogService.closeDialog('logout');
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
AsmMainUiComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmMainUiComponent, deps: [{ token: i1$1.AuthService }, { token: i2$1.CsAgentAuthService }, { token: AsmComponentService }, { token: i1$1.GlobalMessageService }, { token: i1$1.RoutingService }, { token: i2$2.AsmService }, { token: i2$3.UserAccountFacade }, { token: i1.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
AsmMainUiComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: AsmMainUiComponent, selector: "cx-asm-main-ui", host: { properties: { "class.hidden": "this.disabled" } }, viewQueries: [{ propertyName: "element", first: true, predicate: ["customerListLink"], descendants: true }], ngImport: i0, template: "<div class=\"asm-bar\">\n  <div class=\"asm-bar-branding\">\n    <img\n      class=\"logo\"\n      src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAAwCAYAAADuFn/PAAAAAXNSR0IArs4c6QAAD7RJREFUeAHtW3twVGcVP7t795V30rwJBBJeASq01NJgnZa2otTW2nHAqrRak+rUKfgYZ/xDW5lRR2e0/mGtAadqq6WjUAdNa4udqVZaEdtCKQ2FQEh5JSQh5Lnvp7/ft9lkd9l7swkhwMiZ3N27937fd8533ufcG9P1L/VE5SpMOwdMmk0iocDzWjAUnnbk/9cITSYx2xwS9Xs3Wzs7NmqhcOT/mh/Tunkw32SzScjr2Vy2v3XDa5tWhbRI5KoHmi4hmGx2ifi8mz8UmvHI9k2VyvVokasWMC38N8HtRHyezUejex5pXbdu1O9r5qsCuLgCUD4fmu/1bq5sbd9wdNMY84lYM10VwMUTAJlvtUnU491c0XZc+fxUZFo0Mn4QjiJMMFREcKJG4xxrC/7ETCQ854+JAtbBny5Mak3d1ab3BsKtCrhhuJ2K9lNpmU+KYAHpWRAFa4K4x7t5NouU5WhS4rRIvt0idotJ3MGIDPgj0usNSZ8vLMOBiIQhJQukoZkpHGOJcGXLiPD0WBNStOmvQ8ETAjp7iN0d++RelBLhBFsAnVQe/fXHZk7wDEuarXaJBrxNFe2nNzLb0VsBMWA0HoyO8WNDDnDxIzOy5ONzcuX6MqdU5VhxLZlYWoUvFJEud0iODQZkb5dXHa19PnEFw2LDBi0QRqqac14BBPnz2yul0GEZxZt68vzhQXm6pS+Gl9xLANL4uUWFsm5hPmiIjiPu2EQqSY8nJCeHAnK4zy+tOLrdQXXTClqVLFLwJKDM7BSLmMD8iN/btCRn3obtm+adz+CElTTlW0YuEDe1qR6M//oNJXJDRVbC0PNPqYFZVrPUFNjU8bHqHGUF3NxLx4ZkZ/uQdLnOF34Acad+To6srDRe/7ML8+T5Q/3KEpNFD5lijVKnWa4tdpxPWIZXeiGM/3S65Y/vD8hbnR6lLBdkEdR8DZrv9zUtyT+wYfu6+YbMJ5mjQZjMZ1H20HXF8s0VZWKjjU4C6IIWgyk8PlqVLY0vnhDGkMTVNJjA3bV5464+t9AhS4vtsqfDBWuiKY0Bk4dIhq5nbFbyWXGWJnfPzZc1NRT0gDy+p1uG/WHlmpJHZvALG6TmR/2epoOFBzccTEg1jWabTXBBpkhYgoGQNCy9Rr6zsnzSzE9ERKZvazknAX9IzFhf4QGuMFofNXmarKjMThye9pwWtqYmV6Jwc2R4fI3Rb/qyKQDGgvsWF8ovVlcJSEOPJsaTUTzkkdGBRMZstorA7SwqXLRBMmQ+STczC/IHwnA3TvlGfdkUbCe2xBsnhmVna79YTQi3YB7x8AhA0LfPzpNsW7JG6yG+BWOLHWYJgwHxNUa/KeUphPqZOfKt+nKlJIk0j+Ib2UPyb8QfMD/q8zYV9/Ru3L7ONK7bSSTZHIUZm6FJDdeXIrsZnynMdBh4jfbuR1B8YnenhBCIVZZFV4GDuLLh2j4xLz+RBsPzylyrspYAlIRrJB1TZAGJBHxmUZFcV5YFRUmDLxU/fpP5aC80Fff1GWY7iTgSzzWa26wCu6yA9I3g7VPDsu1Ar3zQ75MAGEwNLnBoUgtfv2JmriybkSM5SFcJO1p65Z3Tw2JnPgqtiUMIgluGsXUlzviljL7vnF8gLx86h7UShnNdIy3A0NeODcrrHwwqn56LrKv2GtA6K0+K4Pv1wAoF+STw7T05lBy4kibQ8lhkMdvxNZUMD06K+VxSC0NLawtto8xLwjPyYx+Y2bCtVVwjAYrpGvdOBXzlcFSeguVUF9rlzroiuXlOgfzmv2fEwgFwG4kQhitag80xUE8EbgLTZsISOgb9Y3MhzPEE8NapIdmyu0McyNRIDjOcmVC2x1ZXy621BbokLK/KEZQ8CPLJ9I9OwDpm9POR7fzqYPXyjTJBtzO6Dk4QH8MosPQ1goND4DSDNFCKDT4dHk99O8xRRSjKaTnR65Ff7jolX37ufTnT78UYBE1oafygT2Uhd9vcwkT8GZ3noVa4tSY/5tIS1jQBrxFYIWdkqurIAkMdoL2jzyvf/1u7dA8HdKdW5FmlCHEnFozH9qASAfDCYtLYz2+qe7P9gphPAhADEBipTQZwIzTwJ3fVSmm2VTy+kARgNeyiqkDFbzDFooQioh7w4PfovZFxDL7U5Mp8W1pMrLppYXqwBtbFuJ2MF2ptAFEwK4kO0MWkoGPAK/s7hnVnMhZmw30m4eI+aEZgPtzOr+pqTmzYvj25saa7oMENiDIq3UN+gyGxW5+6tkRurM6XHe/2yIstZ6XtrEcJTgOxTOPoluIVbypb+JvK+slF1+jiae/1yuvH+qVx5Yy0Y66tzJX5xVnScsYlrFpZA5AfRkCGcVwEljoKoDOMaz5UxXqgIQ7Aa6lxo1Mxj3l+OOD73eEFKze2rKvX1xa9hdNcx1aicqjLJb0ufZOMzyvPs8nDH62SPzculWceWAJmVUkNAlsAgdwFywhCS0LQstTDz0BfZJebEB/0YM8HA7Jjf7eqpNONYWF4x4JC8QVDav0g8LCvYwS8z3GJ9NDaEY9lfql+Fc4kg/sJJ8wNm20S9nu3+sKBr12Iz0+l10wtOQ2fTa3OFBjUbpqdL9/9xBz5y1eXyVNfWCy0EA0bc6Pw4oZJfPzwwWXdPr9IcrhzHdjV1icHod20LD1YXVes1qCgufZ4AmDKTOFTQUgDafPg+PwNFbIAqaYeuOEKe90B5XIUHgseIwa9W/3RYOPxTat8evMmc121o+m/m/51QlaBSdVFE0sRnVaLmse5LZ0ueeK14/IShKk6nbQvCDiLqd3iYl36uuAC950cFK8/KK9DEAvK0lfJc0uyZHlVrvzzyLmY+xnHAvIg8CpYrQM0ZiGAVF+TJXdDUe6+ttSwC9ra7ZJ+eASVraG3A5+/1VLqbmjfeOf4vlp3l+lvQAAoxHDvNLKDh7e+J1vWf0hmogczGVhSmSNbPr9EnvnPafnB344iINP8o3Lj7AJZDB+uB3va+6V70KcC+T9bz0nDyplpny8wzty1pFRePXQ2IwE8WD9DPgdtN2EiBWBFvMoEXnm/V/xwddnOLHY1n9OGfQ1tP5x65pMW1PgIRjiYYew/MSj3bdkrfz/YkwmdumO+WF8lP753IVLQqEod74LWscDRg1cP9ap+jxWMOgBL6BjQt/JVC4qkIgfv1JBurG8E1PyCLKvkI83OlPknoYgvvtslDjzDDQe8W8H8L7c9cXGYT9qRa2ETPJAZ2OEyTvS65StPvysP//6AvH18wGh/hvfWLq+QtcvLhW5g9aIS3bH96Mf/tw09IygAApL0DvlkdxuqXh0oy7PLzaglmNbGzEBn4CQuM2b86IUjctYFrxD0bTU5LI0Xk/kk0RxhMEs4GCbplnbs7ZC1T74lX9jytvzpzQ45Y6CVentdf1OVrIHLmGkQV/a098mpc24xgfmKDmj2Ky3GFnjX0jIIi3pjbAF6dKW7zjrksR2Hpfm9PtEi/q3RLG3KA246vBrdRCrQWTjgL1kJ/gPM4FGe75Dl8OV3LC6VW5CNVBSMHycWVuTKN1fXpi6f9Jsuh81Atq0JVIAPetwyhEedeToV+sraIvSgnOhank+7WmSCH0eRhv8Ymr8TzwSQ7zxr7rc9dPzxqc129Egy1Xz9paRd8Eeqt+Y1lVNjwzwvRz/l08tnyCNgbhH88YUAU8O2brd0IhX24zlzCVzMbGQ7FLDR06nvbTsodvitR++tmxT6QU9QDqEafuGdTmned0b6fSaxg/mRwa6Hjj/9oH4QmhQ2/UnnWQALFWYbDFpxQfCb+QMrRAqgH02xJ3celdOIF5sbl+NhRHykPiK9O9l2TZbOyleH3ph019fADe05qh8rOOeNw72y+0gv6I7thSnxOaSXp895YGUelfmxTnA4nGKPBrfCrTW2P/3glKea6eiPX9Ms8P9xYMq4/iOzlAvY09qrLttIfDr+QiLtnUMqflM40w3LqgtQNxh3A954v0cebz4szpE2OWnkXpiWMsdnC8XuQLaDgBs1WxoudsBNxyNYQEwAZP6c0hx5dO0SVUTthGlu//cJOXC8X4bx8JouSAkCJsAZOXgW8NAdtcoq0i18sa9lA//NC/WLO+Jnzygbb3Kkvs2haIMgzKhwI0g1oxbrJWE+6dAs9CmAIPzvA7fORsESaxfcc2OVfOrDVXKsa1gOnhyQDrSbB1Ce0y+XoVBbsaBEFs3M/MlWDMvUfjoSNDvdyrRM7i++x8QxJjI/6Hs2rFkveqqZiDf1XFkAU7B55Tny6fpZSfep8XORyfC4IoEtWFp4BBsZAb4wpv45Iuh/1uvvY8CdVp8fpyP+rbH4iSIQrV81B2kfnuxPA/AlgJ9tf0/KUR8sqi6U8kInyn6rCvpMAs6hGDuJVHQ/CrL7bquRuZXjv8KSjmy0/tWTOfV0bmSAcjsh/7OewMC0Zjvp6OM1ja+J1MGVrL1ljt6YKb/ehuD93KvHVJfSjnaB06aJNvLWHRXWj86lF+mpF4IqRTo6WQHwAQULPB4EExtrYL7X6Wg8/utLq/lxpppZUfrQ+37tnTNq4/Ebk/lmoH793TOKeUbzd2EM35jIBvMZcfxgthvxhYfXizYwqmEnnkjxIf+/W7rQqoox0GjNdPdoASw0eZjRzxf4fG+H45L6/FQ6zVS8M2dd8u0nd8v9P/yH/H7nETnd40odZ/ib7NmHfPurP90lbx7uESdyeyPYtb8TjwbBHAiMLpDtcAoifvAa7/Hd0kNoVUyUnjhu9b4n10fANQX8f3BndTa2vXzxGmtxvBP5Nl33pW1KvUCnejWR2laEarQOvnnZvGKpm10olXgUWJhrFxs0lsCxLk9AulG9toBBb0Cj6a/d3qCsva1W5lTQZ6tl1fjEj0Fo+XOvHAUuMHksNiYOSTpnS/tOJAcLZvFhfvo1kyYk/Njd0i1vHxlAbAltc3VlP3C5MZ+kmq574E/n7YquhO+JsuPLgsWJjiaDZLylywk+uI1hMJzpKythK1wGGcrfRi6DYyjIDHgfYyUGBrDmZP6XzWZHO0NCzR6LfX3rb+/Rfwofw3RJPrV4gErErlwBKmDlE3AjDAYMBn1J3V8ykk+9NPaRCTQL/KmXeg16/6Nj1UkGH1iT/48AZBkMHhvCt5Qj4UCzW3NctswntRr5lgmo/DmVBzGeZzJ9WseQ+eFgoNkz5Frf2vzZy1Lz4wxBDM5QAvEZl/m32cJUE8y3kfkNlzXzyUr1XtBlztOMyVNuJ+Rvdg571u+7Apg/IoCM93dZD+S7mnA7f/W4PPdfKcwfEcCV74KU26HPd3vvvxLcTqImX4pWfiL+Cz7nf6ZEI8G/ut3eK8Lnp254pAOTevnK+G0yI4RFQvtzQ9r6vc0NEyvfL5Mt/g8XIbTVhsig+gAAAABJRU5ErkJggg==\"\n      width=\"48\"\n      height=\"24\"\n      alt=\"{{ 'asm.mainLogoLabel' | cxTranslate }}\"\n    />\n\n    <div class=\"asm-title\">\n      {{ 'asm.mainTitle' | cxTranslate }}\n    </div>\n  </div>\n  <div class=\"asm-bar-actions\">\n    <div\n      class=\"cx-asm-customer-list\"\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n    >\n      <a\n        #customerListLink\n        tabindex=\"0\"\n        role=\"button\"\n        class=\"cx-asm-customer-list-link\"\n        (click)=\"showCustomList()\"\n      >\n        <cx-icon [type]=\"iconTypes.USER_FRIENDS\"></cx-icon>\n        <span>{{ 'asm.customers' | cxTranslate }}</span></a\n      >\n    </div>\n\n    <cx-asm-toggle-ui></cx-asm-toggle-ui>\n\n    <cx-asm-session-timer\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n    ></cx-asm-session-timer>\n\n    <button\n      class=\"close\"\n      title=\"{{ 'asm.hideUi' | cxTranslate }}\"\n      *ngIf=\"\n        !(customerSupportAgentLoggedIn$ | async) &&\n        !(csAgentTokenLoading$ | async)\n      \"\n      (click)=\"hideUi()\"\n    ></button>\n\n    <button\n      class=\"logout\"\n      title=\"{{ 'asm.logout' | cxTranslate }}\"\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n      (click)=\"logout()\"\n    ></button>\n  </div>\n</div>\n\n<ng-container *ngIf=\"!(isCollapsed$ | async) as notCollapsed\">\n  <ng-container\n    *ngIf=\"customerSupportAgentLoggedIn$ | async; else showLoginForm\"\n  >\n    <ng-container *ngIf=\"customer$ | async; else showCustomerSelection\">\n      <cx-customer-emulation *ngIf=\"notCollapsed\"></cx-customer-emulation>\n    </ng-container>\n    <ng-template #showCustomerSelection>\n      <cx-customer-selection\n        *ngIf=\"notCollapsed\"\n        (submitEvent)=\"startCustomerEmulationSession($event)\"\n      ></cx-customer-selection>\n    </ng-template>\n  </ng-container>\n\n  <ng-template #showLoginForm>\n    <cx-csagent-login-form\n      *ngIf=\"notCollapsed\"\n      (submitEvent)=\"loginCustomerSupportAgent($event)\"\n      [csAgentTokenLoading]=\"csAgentTokenLoading$ | async\"\n    ></cx-csagent-login-form>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: CSAgentLoginFormComponent, selector: "cx-csagent-login-form", inputs: ["csAgentTokenLoading"], outputs: ["submitEvent"] }, { kind: "component", type: CustomerSelectionComponent, selector: "cx-customer-selection", outputs: ["submitEvent"] }, { kind: "component", type: AsmSessionTimerComponent, selector: "cx-asm-session-timer" }, { kind: "component", type: CustomerEmulationComponent, selector: "cx-customer-emulation" }, { kind: "component", type: AsmToggleUiComponent, selector: "cx-asm-toggle-ui" }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmMainUiComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-main-ui', template: "<div class=\"asm-bar\">\n  <div class=\"asm-bar-branding\">\n    <img\n      class=\"logo\"\n      src=\"data:image/png;base64,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\"\n      width=\"48\"\n      height=\"24\"\n      alt=\"{{ 'asm.mainLogoLabel' | cxTranslate }}\"\n    />\n\n    <div class=\"asm-title\">\n      {{ 'asm.mainTitle' | cxTranslate }}\n    </div>\n  </div>\n  <div class=\"asm-bar-actions\">\n    <div\n      class=\"cx-asm-customer-list\"\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n    >\n      <a\n        #customerListLink\n        tabindex=\"0\"\n        role=\"button\"\n        class=\"cx-asm-customer-list-link\"\n        (click)=\"showCustomList()\"\n      >\n        <cx-icon [type]=\"iconTypes.USER_FRIENDS\"></cx-icon>\n        <span>{{ 'asm.customers' | cxTranslate }}</span></a\n      >\n    </div>\n\n    <cx-asm-toggle-ui></cx-asm-toggle-ui>\n\n    <cx-asm-session-timer\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n    ></cx-asm-session-timer>\n\n    <button\n      class=\"close\"\n      title=\"{{ 'asm.hideUi' | cxTranslate }}\"\n      *ngIf=\"\n        !(customerSupportAgentLoggedIn$ | async) &&\n        !(csAgentTokenLoading$ | async)\n      \"\n      (click)=\"hideUi()\"\n    ></button>\n\n    <button\n      class=\"logout\"\n      title=\"{{ 'asm.logout' | cxTranslate }}\"\n      *ngIf=\"customerSupportAgentLoggedIn$ | async\"\n      (click)=\"logout()\"\n    ></button>\n  </div>\n</div>\n\n<ng-container *ngIf=\"!(isCollapsed$ | async) as notCollapsed\">\n  <ng-container\n    *ngIf=\"customerSupportAgentLoggedIn$ | async; else showLoginForm\"\n  >\n    <ng-container *ngIf=\"customer$ | async; else showCustomerSelection\">\n      <cx-customer-emulation *ngIf=\"notCollapsed\"></cx-customer-emulation>\n    </ng-container>\n    <ng-template #showCustomerSelection>\n      <cx-customer-selection\n        *ngIf=\"notCollapsed\"\n        (submitEvent)=\"startCustomerEmulationSession($event)\"\n      ></cx-customer-selection>\n    </ng-template>\n  </ng-container>\n\n  <ng-template #showLoginForm>\n    <cx-csagent-login-form\n      *ngIf=\"notCollapsed\"\n      (submitEvent)=\"loginCustomerSupportAgent($event)\"\n      [csAgentTokenLoading]=\"csAgentTokenLoading$ | async\"\n    ></cx-csagent-login-form>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.AuthService }, { type: i2$1.CsAgentAuthService }, { type: AsmComponentService }, { type: i1$1.GlobalMessageService }, { type: i1$1.RoutingService }, { type: i2$2.AsmService }, { type: i2$3.UserAccountFacade }, { type: i1.LaunchDialogService }]; }, propDecorators: { disabled: [{
                type: HostBinding,
                args: ['class.hidden']
            }], element: [{
                type: ViewChild,
                args: ['customerListLink']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CustomerListComponent {
    constructor(launchDialogService, breakpointService, asmConfig, translation, asmCustomerListFacade) {
        this.launchDialogService = launchDialogService;
        this.breakpointService = breakpointService;
        this.asmConfig = asmConfig;
        this.translation = translation;
        this.asmCustomerListFacade = asmCustomerListFacade;
        this.DEFAULT_PAGE_SIZE = 5;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'customer-list-selector',
            focusOnEscape: true,
        };
        this.iconTypes = ICON_TYPE;
        this.BREAKPOINT = BREAKPOINT;
        this.currentPage = 0;
        this.maxPage = 0;
        this.loaded = false;
        this.listsError = false;
        this.listsEmpty = false;
        this.teardown = new Subscription();
        this.breakpoint$ = this.getBreakpoint();
    }
    ngOnInit() {
        var _a, _b, _c, _d, _e, _f;
        this.pageSize =
            (_c = (_b = (_a = this.asmConfig.asm) === null || _a === void 0 ? void 0 : _a.customerList) === null || _b === void 0 ? void 0 : _b.pageSize) !== null && _c !== void 0 ? _c : this.DEFAULT_PAGE_SIZE;
        this.customerListConfig = (_e = (_d = this.asmConfig) === null || _d === void 0 ? void 0 : _d.asm) === null || _e === void 0 ? void 0 : _e.customerList;
        this.customerListsPage$ =
            (_f = this.asmCustomerListFacade.getCustomerListsState().pipe(tap((state) => (this.listsError = !!state.error)), map((state) => {
                var _a, _b;
                if (((_b = (_a = state === null || state === void 0 ? void 0 : state.data) === null || _a === void 0 ? void 0 : _a.userGroups) === null || _b === void 0 ? void 0 : _b.length) === 0) {
                    this.listsEmpty = true;
                    return undefined;
                }
                else {
                    return state.data;
                }
            }), distinctUntilChanged(), tap((result) => {
                var _a, _b;
                // set the first value of this.customerListsPage$ to be selected
                if (!this.selectedUserGroupId) {
                    this.selectedUserGroupId = (_b = (_a = result === null || result === void 0 ? void 0 : result.userGroups) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.uid;
                    this.sorts = null;
                    this.fetchCustomers();
                }
            }))) !== null && _f !== void 0 ? _f : NEVER;
        this.customerSearchLoading$ = this.asmCustomerListFacade
            .getCustomerListCustomersSearchResultsLoading()
            .pipe(tap((loading) => (this.loaded = !loading)));
        this.teardown.add(this.customerSearchLoading$.subscribe());
        this.teardown.add(() => this.asmCustomerListFacade.customerListCustomersSearchReset());
        this.customerSearchError$ =
            this.asmCustomerListFacade.getCustomerListCustomersSearchResultsError();
        this.customerSearchPage$ = this.asmCustomerListFacade
            .getCustomerListCustomersSearchResults()
            .pipe(tap((result) => {
            var _a, _b, _c;
            if (result === null || result === void 0 ? void 0 : result.sorts) {
                this.sorts = result.sorts;
                this.sortCode = (_a = result.pagination) === null || _a === void 0 ? void 0 : _a.sort;
            }
            if ((result === null || result === void 0 ? void 0 : result.entries.length) < this.pageSize) {
                this.maxPage = (_c = (_b = result.pagination) === null || _b === void 0 ? void 0 : _b.currentPage) !== null && _c !== void 0 ? _c : 0;
            }
            else {
                this.maxPage = this.currentPage + 1;
            }
        }));
    }
    ngOnDestroy() {
        this.teardown.unsubscribe();
    }
    fetchCustomers() {
        if (this.selectedUserGroupId) {
            const options = {
                customerListId: this.selectedUserGroupId,
                pageSize: this.pageSize,
                currentPage: this.currentPage,
            };
            if (this.sortCode) {
                options.sort = this.sortCode;
            }
            this.asmCustomerListFacade.customerListCustomersSearchReset();
            this.asmCustomerListFacade.customerListCustomersSearch(options);
        }
    }
    onChangeCustomerGroup() {
        this.currentPage = 0;
        this.sorts = null;
        this.sortCode = '';
        this.fetchCustomers();
    }
    getGroupName(customerListsPage, id) {
        var _a, _b, _c;
        return ((_c = (_b = (_a = customerListsPage === null || customerListsPage === void 0 ? void 0 : customerListsPage.userGroups) === null || _a === void 0 ? void 0 : _a.find((userGroup) => userGroup.uid === id)) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : '');
    }
    getBadgeText(customerEntry) {
        var _a, _b, _c, _d;
        return (((_b = (_a = customerEntry.firstName) === null || _a === void 0 ? void 0 : _a.charAt(0)) !== null && _b !== void 0 ? _b : '') +
            ((_d = (_c = customerEntry.lastName) === null || _c === void 0 ? void 0 : _c.charAt(0)) !== null && _d !== void 0 ? _d : ''));
    }
    startColumnAction(customerEntry, action) {
        this.selectedCustomer = customerEntry;
        const closeValue = {
            actionType: action,
            selectedUser: customerEntry,
        };
        this.closeModal(closeValue);
    }
    changeSortCode(sortCode) {
        this.sortCode = sortCode;
        this.fetchCustomers();
    }
    goToNextPage() {
        if (this.currentPage >= this.maxPage) {
            this.currentPage = this.maxPage;
        }
        else {
            if (this.loaded) {
                this.currentPage++;
                this.fetchCustomers();
            }
        }
    }
    goToPreviousPage() {
        if (this.currentPage <= 0) {
            this.currentPage = 0;
        }
        else {
            if (this.loaded) {
                this.currentPage--;
                this.fetchCustomers();
            }
        }
    }
    closeModal(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    getSortLabels() {
        return combineLatest([
            this.translation.translate('asm.customerList.tableSort.byNameAsc'),
            this.translation.translate('asm.customerList.tableSort.byNameDesc'),
            this.translation.translate('asm.customerList.tableSort.byDateAsc'),
            this.translation.translate('asm.customerList.tableSort.byDateDesc'),
            this.translation.translate('asm.customerList.tableSort.byOrderDateAsc'),
            this.translation.translate('asm.customerList.tableSort.byOrderDateDesc'),
        ]).pipe(map(([textByNameAsc, textByNameDesc, textByOrderDateAsc, textByOrderDateDesc, textByDateAsc, textByDateDesc,]) => {
            return {
                byNameAsc: textByNameAsc,
                byNameDesc: textByNameDesc,
                byOrderDateAsc: textByOrderDateAsc,
                byOrderDateDesc: textByOrderDateDesc,
                byDateAsc: textByDateAsc,
                byDateDesc: textByDateDesc,
            };
        }));
    }
    getBreakpoint() {
        return this.breakpointService.breakpoint$.pipe(map((breakpoint) => {
            if (breakpoint === BREAKPOINT.lg || breakpoint === BREAKPOINT.xl) {
                breakpoint = BREAKPOINT.md;
            }
            return breakpoint;
        }));
    }
}
CustomerListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CustomerListComponent, deps: [{ token: i1.LaunchDialogService }, { token: i1.BreakpointService }, { token: i2$1.AsmConfig }, { token: i1$1.TranslationService }, { token: i2$1.AsmCustomerListFacade }], target: i0.ɵɵFactoryTarget.Component });
CustomerListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: CustomerListComponent, selector: "cx-customer-list", ngImport: i0, template: "<div\n  class=\"cx-asm-customer-list cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal('Escape clicked')\"\n>\n  <div class=\"cx-modal-content\">\n    <!-- Modal Header -->\n    <ng-container>\n      <div class=\"cx-dialog-header modal-header\">\n        <h2 id=\"asm-customer-list-title\" class=\"title modal-title\">\n          {{ 'asm.customerList.title' | cxTranslate }}\n        </h2>\n        <div id=\"asm-customer-list-desc\" class=\"cx-visually-hidden\">\n          {{ 'asm.customerList.description' | cxTranslate }}\n        </div>\n        <ng-template *ngTemplateOutlet=\"closeButton\"></ng-template>\n      </div>\n      <div\n        class=\"cx-dialog-sub-header modal-header\"\n        [class.tablet-mobile]=\"(breakpoint$ | async) !== BREAKPOINT.md\"\n        *ngIf=\"customerListsPage$ | async as customerListsPage\"\n      >\n        <ng-template\n          *ngTemplateOutlet=\"\n            groupSelector;\n            context: { customerListsPage: customerListsPage }\n          \"\n        ></ng-template>\n        <div\n          class=\"cx-header-actions\"\n          [class.mobile]=\"(breakpoint$ | async) === BREAKPOINT.xs\"\n        >\n          <ng-template *ngTemplateOutlet=\"sort\"></ng-template>\n          <ng-template *ngTemplateOutlet=\"pagination\"></ng-template>\n        </div>\n      </div>\n      <!-- Modal Body -->\n      <div class=\"cx-dialog-body modal-body\">\n        <div class=\"cx-dialog-row\">\n          <div class=\"cx-dialog-item\">\n            <div *ngIf=\"listsEmpty\" class=\"cx-error-state\">\n              {{ 'asm.customerList.noLists' | cxTranslate }}\n            </div>\n            <div *ngIf=\"listsError\" class=\"cx-error-state\">\n              {{ 'asm.customerList.listsError' | cxTranslate }}\n            </div>\n            <div *ngIf=\"customerSearchError$ | async\" class=\"cx-error-state\">\n              {{ 'generalErrors.pageFailure' | cxTranslate }}\n            </div>\n            <cx-spinner *ngIf=\"customerSearchLoading$ | async\"></cx-spinner>\n            <div *ngIf=\"customerSearchPage$ | async as customerSearchPage\">\n              <table id=\"asm-cusomer-list-table\" role=\"table\" class=\"table\">\n                <caption class=\"cx-visually-hidden\">\n                  {{\n                    'asm.customerList.title' | cxTranslate\n                  }}\n                </caption>\n                <thead *ngIf=\"(breakpoint$ | async) === BREAKPOINT.md\">\n                  <tr role=\"row\">\n                    <th\n                      role=\"columnheader\"\n                      class=\"cx-avatar-cell\"\n                      *ngIf=\"customerListConfig?.showAvatar\"\n                    >\n                      <span class=\"cx-visually-hidden\">\n                        {{\n                          'asm.customerList.tableHeader.customer' | cxTranslate\n                        }}\n                      </span>\n                    </th>\n                    <th\n                      role=\"columnheader\"\n                      *ngFor=\"let column of customerListConfig?.columns\"\n                    >\n                      <span *ngIf=\"column.headerLocalizationKey\">{{\n                        column.headerLocalizationKey | cxTranslate\n                      }}</span>\n                    </th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr\n                    role=\"row\"\n                    *ngFor=\"let customerEntry of customerSearchPage?.entries\"\n                  >\n                    <td\n                      role=\"cell\"\n                      *ngIf=\"customerListConfig?.showAvatar\"\n                      class=\"cx-avatar-cell\"\n                    >\n                      <div class=\"cx-avatar\">\n                        {{ getBadgeText(customerEntry) }}\n                      </div>\n                    </td>\n                    <!-- multi columns if desktop -->\n                    <ng-container\n                      *ngIf=\"(breakpoint$ | async) === BREAKPOINT.md\"\n                    >\n                      <td\n                        role=\"cell\"\n                        *ngFor=\"let column of customerListConfig?.columns\"\n                      >\n                        <ng-template\n                          *ngTemplateOutlet=\"\n                            cell;\n                            context: {\n                              customerEntry: customerEntry,\n                              column: column,\n                              showHeader: false\n                            }\n                          \"\n                        ></ng-template>\n                      </td>\n                    </ng-container>\n                    <!-- two column if tablet -->\n                    <ng-container\n                      *ngIf=\"(breakpoint$ | async) === BREAKPOINT.sm\"\n                    >\n                      <td role=\"cell\" class=\"cx-multi-cell\">\n                        <ng-container\n                          *ngFor=\"\n                            let column of customerListConfig?.columns;\n                            let even = even\n                          \"\n                        >\n                          <ng-container *ngIf=\"even\">\n                            <ng-template\n                              *ngTemplateOutlet=\"\n                                cell;\n                                context: {\n                                  customerEntry: customerEntry,\n                                  column: column,\n                                  showHeader: true\n                                }\n                              \"\n                            ></ng-template>\n                          </ng-container>\n                        </ng-container>\n                      </td>\n                      <td role=\"cell\" class=\"cx-multi-cell\">\n                        <ng-container\n                          *ngFor=\"\n                            let column of customerListConfig?.columns;\n                            let odd = odd\n                          \"\n                        >\n                          <ng-container *ngIf=\"odd\">\n                            <ng-template\n                              *ngTemplateOutlet=\"\n                                cell;\n                                context: {\n                                  customerEntry: customerEntry,\n                                  column: column,\n                                  showHeader: true\n                                }\n                              \"\n                            ></ng-template>\n                          </ng-container>\n                        </ng-container>\n                      </td>\n                    </ng-container>\n                    <!-- one column if mobile -->\n                    <td\n                      role=\"cell\"\n                      class=\"cx-multi-cell\"\n                      *ngIf=\"(breakpoint$ | async) === BREAKPOINT.xs\"\n                    >\n                      <ng-container\n                        *ngFor=\"let column of customerListConfig?.columns\"\n                      >\n                        <ng-template\n                          *ngTemplateOutlet=\"\n                            cell;\n                            context: {\n                              customerEntry: customerEntry,\n                              column: column,\n                              showHeader: true\n                            }\n                          \"\n                        ></ng-template>\n                      </ng-container>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n              <div\n                class=\"cx-empty-state\"\n                *ngIf=\"!customerSearchPage?.entries.length\"\n              >\n                {{ 'asm.customerList.noCustomers' | cxTranslate }}\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </ng-container>\n  </div>\n</div>\n\n<ng-template\n  #cell\n  let-customerEntry=\"customerEntry\"\n  let-column=\"column\"\n  let-showHeader=\"showHeader\"\n>\n  <div class=\"cx-cell-container\">\n    <span class=\"cx-header-text\" *ngIf=\"showHeader\">\n      {{ column.headerLocalizationKey | cxTranslate }}\n    </span>\n\n    <ng-container *ngIf=\"!column.actionType\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          cellContent;\n          context: { column: column, customerEntry: customerEntry }\n        \"\n      ></ng-container>\n    </ng-container>\n\n    <button\n      *ngIf=\"column.actionType\"\n      (click)=\"startColumnAction(customerEntry, column.actionType)\"\n      class=\"btn btn-link cx-action-link cx-btn-cell\"\n      [attr.title]=\"\n        column.icon\n          ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n            | cxTranslate)\n          : undefined\n      \"\n      [attr.aria-label]=\"\n        column.icon\n          ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n            | cxTranslate)\n          : undefined\n      \"\n    >\n      <ng-container\n        *ngTemplateOutlet=\"\n          cellContent;\n          context: { column: column, customerEntry: customerEntry }\n        \"\n      ></ng-container>\n    </button>\n  </div>\n</ng-template>\n<ng-template #cellContent let-customerEntry=\"customerEntry\" let-column=\"column\">\n  <span *ngIf=\"!column.icon\">{{\n    column.renderer?.(customerEntry) || ''\n  }}</span>\n  <cx-icon\n    *ngIf=\"column.icon\"\n    [attr.title]=\"\n      !column.actionType\n        ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n          | cxTranslate)\n        : undefined\n    \"\n    [class.cx-action-color]=\"column.actionType\"\n    [type]=\"column.icon.symbol\"\n    [attr.aria-label]=\"\n      !column.actionType\n        ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n          | cxTranslate)\n        : undefined\n    \"\n  ></cx-icon>\n</ng-template>\n\n<ng-template #sort>\n  <label>\n    <span class=\"cx-visually-hidden\">{{\n      'asm.customerList.tableSort.sortBy' | cxTranslate\n    }}</span>\n    <cx-sorting\n      class=\"sort-selector\"\n      [sortOptions]=\"sorts\"\n      [sortLabels]=\"getSortLabels() | async\"\n      (sortListEvent)=\"changeSortCode($event)\"\n      [selectedOption]=\"sortCode\"\n      placeholder=\"{{ 'asm.customerList.tableSort.sortBy' | cxTranslate }}\"\n      [cxNgSelectA11y]=\"{\n        ariaLabel: sortCode,\n        ariaControls: 'asm-cusomer-list-table'\n      }\"\n    ></cx-sorting>\n  </label>\n</ng-template>\n\n<ng-template #pagination>\n  <div class=\"cx-pagination-buttons\">\n    <div>\n      {{\n        'asm.customerList.page.page' | cxTranslate: { count: currentPage + 1 }\n      }}\n    </div>\n    <button\n      *ngIf=\"maxPage > 0\"\n      (click)=\"goToPreviousPage()\"\n      class=\"btn btn-link cx-action-link cx-btn-previous\"\n      [disabled]=\"currentPage === 0 || !loaded\"\n    >\n      <cx-icon class=\"previous\" [type]=\"iconTypes.CARET_LEFT\"></cx-icon\n      ><span>{{ 'asm.customerList.page.previous' | cxTranslate }}</span>\n    </button>\n    <button\n      *ngIf=\"maxPage > 0\"\n      (click)=\"goToNextPage()\"\n      class=\"btn btn-link cx-action-link cx-btn-next\"\n      [disabled]=\"currentPage === maxPage || !loaded\"\n    >\n      <span>{{ 'asm.customerList.page.next' | cxTranslate }}</span\n      ><cx-icon class=\"next\" [type]=\"iconTypes.CARET_RIGHT\"></cx-icon>\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #groupSelector let-customerListsPage=\"customerListsPage\">\n  <label>\n    <span class=\"cx-visually-hidden\">{{\n      'asm.customerList.title' | cxTranslate\n    }}</span>\n    <ng-select\n      class=\"customer-list-selector\"\n      [searchable]=\"false\"\n      [clearable]=\"false\"\n      (change)=\"onChangeCustomerGroup()\"\n      [tabIndex]=\"0\"\n      [(ngModel)]=\"selectedUserGroupId\"\n      [items]=\"customerListsPage?.userGroups\"\n      bindLabel=\"name\"\n      bindValue=\"uid\"\n      [cxNgSelectA11y]=\"{\n        ariaLabel: getGroupName(customerListsPage, selectedUserGroupId),\n        ariaControls: 'asm-cusomer-list-table'\n      }\"\n    >\n    </ng-select>\n  </label>\n</ng-template>\n\n<ng-template #closeButton>\n  <button\n    type=\"button\"\n    class=\"close\"\n    attr.aria-label=\"{{ 'common.close' | cxTranslate }}\"\n    (click)=\"closeModal('Cross click')\"\n  >\n    <span aria-hidden=\"true\">\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </span>\n  </button>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1$2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i6.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "directive", type: i1$2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "component", type: i1.SpinnerComponent, selector: "cx-spinner" }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i1.NgSelectA11yDirective, selector: "[cxNgSelectA11y]", inputs: ["cxNgSelectA11y"] }, { kind: "component", type: i1.SortingComponent, selector: "cx-sorting", inputs: ["sortOptions", "ariaControls", "ariaLabel", "selectedOption", "placeholder", "sortLabels"], outputs: ["sortListEvent"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CustomerListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-list', template: "<div\n  class=\"cx-asm-customer-list cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal('Escape clicked')\"\n>\n  <div class=\"cx-modal-content\">\n    <!-- Modal Header -->\n    <ng-container>\n      <div class=\"cx-dialog-header modal-header\">\n        <h2 id=\"asm-customer-list-title\" class=\"title modal-title\">\n          {{ 'asm.customerList.title' | cxTranslate }}\n        </h2>\n        <div id=\"asm-customer-list-desc\" class=\"cx-visually-hidden\">\n          {{ 'asm.customerList.description' | cxTranslate }}\n        </div>\n        <ng-template *ngTemplateOutlet=\"closeButton\"></ng-template>\n      </div>\n      <div\n        class=\"cx-dialog-sub-header modal-header\"\n        [class.tablet-mobile]=\"(breakpoint$ | async) !== BREAKPOINT.md\"\n        *ngIf=\"customerListsPage$ | async as customerListsPage\"\n      >\n        <ng-template\n          *ngTemplateOutlet=\"\n            groupSelector;\n            context: { customerListsPage: customerListsPage }\n          \"\n        ></ng-template>\n        <div\n          class=\"cx-header-actions\"\n          [class.mobile]=\"(breakpoint$ | async) === BREAKPOINT.xs\"\n        >\n          <ng-template *ngTemplateOutlet=\"sort\"></ng-template>\n          <ng-template *ngTemplateOutlet=\"pagination\"></ng-template>\n        </div>\n      </div>\n      <!-- Modal Body -->\n      <div class=\"cx-dialog-body modal-body\">\n        <div class=\"cx-dialog-row\">\n          <div class=\"cx-dialog-item\">\n            <div *ngIf=\"listsEmpty\" class=\"cx-error-state\">\n              {{ 'asm.customerList.noLists' | cxTranslate }}\n            </div>\n            <div *ngIf=\"listsError\" class=\"cx-error-state\">\n              {{ 'asm.customerList.listsError' | cxTranslate }}\n            </div>\n            <div *ngIf=\"customerSearchError$ | async\" class=\"cx-error-state\">\n              {{ 'generalErrors.pageFailure' | cxTranslate }}\n            </div>\n            <cx-spinner *ngIf=\"customerSearchLoading$ | async\"></cx-spinner>\n            <div *ngIf=\"customerSearchPage$ | async as customerSearchPage\">\n              <table id=\"asm-cusomer-list-table\" role=\"table\" class=\"table\">\n                <caption class=\"cx-visually-hidden\">\n                  {{\n                    'asm.customerList.title' | cxTranslate\n                  }}\n                </caption>\n                <thead *ngIf=\"(breakpoint$ | async) === BREAKPOINT.md\">\n                  <tr role=\"row\">\n                    <th\n                      role=\"columnheader\"\n                      class=\"cx-avatar-cell\"\n                      *ngIf=\"customerListConfig?.showAvatar\"\n                    >\n                      <span class=\"cx-visually-hidden\">\n                        {{\n                          'asm.customerList.tableHeader.customer' | cxTranslate\n                        }}\n                      </span>\n                    </th>\n                    <th\n                      role=\"columnheader\"\n                      *ngFor=\"let column of customerListConfig?.columns\"\n                    >\n                      <span *ngIf=\"column.headerLocalizationKey\">{{\n                        column.headerLocalizationKey | cxTranslate\n                      }}</span>\n                    </th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr\n                    role=\"row\"\n                    *ngFor=\"let customerEntry of customerSearchPage?.entries\"\n                  >\n                    <td\n                      role=\"cell\"\n                      *ngIf=\"customerListConfig?.showAvatar\"\n                      class=\"cx-avatar-cell\"\n                    >\n                      <div class=\"cx-avatar\">\n                        {{ getBadgeText(customerEntry) }}\n                      </div>\n                    </td>\n                    <!-- multi columns if desktop -->\n                    <ng-container\n                      *ngIf=\"(breakpoint$ | async) === BREAKPOINT.md\"\n                    >\n                      <td\n                        role=\"cell\"\n                        *ngFor=\"let column of customerListConfig?.columns\"\n                      >\n                        <ng-template\n                          *ngTemplateOutlet=\"\n                            cell;\n                            context: {\n                              customerEntry: customerEntry,\n                              column: column,\n                              showHeader: false\n                            }\n                          \"\n                        ></ng-template>\n                      </td>\n                    </ng-container>\n                    <!-- two column if tablet -->\n                    <ng-container\n                      *ngIf=\"(breakpoint$ | async) === BREAKPOINT.sm\"\n                    >\n                      <td role=\"cell\" class=\"cx-multi-cell\">\n                        <ng-container\n                          *ngFor=\"\n                            let column of customerListConfig?.columns;\n                            let even = even\n                          \"\n                        >\n                          <ng-container *ngIf=\"even\">\n                            <ng-template\n                              *ngTemplateOutlet=\"\n                                cell;\n                                context: {\n                                  customerEntry: customerEntry,\n                                  column: column,\n                                  showHeader: true\n                                }\n                              \"\n                            ></ng-template>\n                          </ng-container>\n                        </ng-container>\n                      </td>\n                      <td role=\"cell\" class=\"cx-multi-cell\">\n                        <ng-container\n                          *ngFor=\"\n                            let column of customerListConfig?.columns;\n                            let odd = odd\n                          \"\n                        >\n                          <ng-container *ngIf=\"odd\">\n                            <ng-template\n                              *ngTemplateOutlet=\"\n                                cell;\n                                context: {\n                                  customerEntry: customerEntry,\n                                  column: column,\n                                  showHeader: true\n                                }\n                              \"\n                            ></ng-template>\n                          </ng-container>\n                        </ng-container>\n                      </td>\n                    </ng-container>\n                    <!-- one column if mobile -->\n                    <td\n                      role=\"cell\"\n                      class=\"cx-multi-cell\"\n                      *ngIf=\"(breakpoint$ | async) === BREAKPOINT.xs\"\n                    >\n                      <ng-container\n                        *ngFor=\"let column of customerListConfig?.columns\"\n                      >\n                        <ng-template\n                          *ngTemplateOutlet=\"\n                            cell;\n                            context: {\n                              customerEntry: customerEntry,\n                              column: column,\n                              showHeader: true\n                            }\n                          \"\n                        ></ng-template>\n                      </ng-container>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n              <div\n                class=\"cx-empty-state\"\n                *ngIf=\"!customerSearchPage?.entries.length\"\n              >\n                {{ 'asm.customerList.noCustomers' | cxTranslate }}\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </ng-container>\n  </div>\n</div>\n\n<ng-template\n  #cell\n  let-customerEntry=\"customerEntry\"\n  let-column=\"column\"\n  let-showHeader=\"showHeader\"\n>\n  <div class=\"cx-cell-container\">\n    <span class=\"cx-header-text\" *ngIf=\"showHeader\">\n      {{ column.headerLocalizationKey | cxTranslate }}\n    </span>\n\n    <ng-container *ngIf=\"!column.actionType\">\n      <ng-container\n        *ngTemplateOutlet=\"\n          cellContent;\n          context: { column: column, customerEntry: customerEntry }\n        \"\n      ></ng-container>\n    </ng-container>\n\n    <button\n      *ngIf=\"column.actionType\"\n      (click)=\"startColumnAction(customerEntry, column.actionType)\"\n      class=\"btn btn-link cx-action-link cx-btn-cell\"\n      [attr.title]=\"\n        column.icon\n          ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n            | cxTranslate)\n          : undefined\n      \"\n      [attr.aria-label]=\"\n        column.icon\n          ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n            | cxTranslate)\n          : undefined\n      \"\n    >\n      <ng-container\n        *ngTemplateOutlet=\"\n          cellContent;\n          context: { column: column, customerEntry: customerEntry }\n        \"\n      ></ng-container>\n    </button>\n  </div>\n</ng-template>\n<ng-template #cellContent let-customerEntry=\"customerEntry\" let-column=\"column\">\n  <span *ngIf=\"!column.icon\">{{\n    column.renderer?.(customerEntry) || ''\n  }}</span>\n  <cx-icon\n    *ngIf=\"column.icon\"\n    [attr.title]=\"\n      !column.actionType\n        ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n          | cxTranslate)\n        : undefined\n    \"\n    [class.cx-action-color]=\"column.actionType\"\n    [type]=\"column.icon.symbol\"\n    [attr.aria-label]=\"\n      !column.actionType\n        ? (column.icon.captionLocalizationKey ?? column.headerLocalizationKey\n          | cxTranslate)\n        : undefined\n    \"\n  ></cx-icon>\n</ng-template>\n\n<ng-template #sort>\n  <label>\n    <span class=\"cx-visually-hidden\">{{\n      'asm.customerList.tableSort.sortBy' | cxTranslate\n    }}</span>\n    <cx-sorting\n      class=\"sort-selector\"\n      [sortOptions]=\"sorts\"\n      [sortLabels]=\"getSortLabels() | async\"\n      (sortListEvent)=\"changeSortCode($event)\"\n      [selectedOption]=\"sortCode\"\n      placeholder=\"{{ 'asm.customerList.tableSort.sortBy' | cxTranslate }}\"\n      [cxNgSelectA11y]=\"{\n        ariaLabel: sortCode,\n        ariaControls: 'asm-cusomer-list-table'\n      }\"\n    ></cx-sorting>\n  </label>\n</ng-template>\n\n<ng-template #pagination>\n  <div class=\"cx-pagination-buttons\">\n    <div>\n      {{\n        'asm.customerList.page.page' | cxTranslate: { count: currentPage + 1 }\n      }}\n    </div>\n    <button\n      *ngIf=\"maxPage > 0\"\n      (click)=\"goToPreviousPage()\"\n      class=\"btn btn-link cx-action-link cx-btn-previous\"\n      [disabled]=\"currentPage === 0 || !loaded\"\n    >\n      <cx-icon class=\"previous\" [type]=\"iconTypes.CARET_LEFT\"></cx-icon\n      ><span>{{ 'asm.customerList.page.previous' | cxTranslate }}</span>\n    </button>\n    <button\n      *ngIf=\"maxPage > 0\"\n      (click)=\"goToNextPage()\"\n      class=\"btn btn-link cx-action-link cx-btn-next\"\n      [disabled]=\"currentPage === maxPage || !loaded\"\n    >\n      <span>{{ 'asm.customerList.page.next' | cxTranslate }}</span\n      ><cx-icon class=\"next\" [type]=\"iconTypes.CARET_RIGHT\"></cx-icon>\n    </button>\n  </div>\n</ng-template>\n\n<ng-template #groupSelector let-customerListsPage=\"customerListsPage\">\n  <label>\n    <span class=\"cx-visually-hidden\">{{\n      'asm.customerList.title' | cxTranslate\n    }}</span>\n    <ng-select\n      class=\"customer-list-selector\"\n      [searchable]=\"false\"\n      [clearable]=\"false\"\n      (change)=\"onChangeCustomerGroup()\"\n      [tabIndex]=\"0\"\n      [(ngModel)]=\"selectedUserGroupId\"\n      [items]=\"customerListsPage?.userGroups\"\n      bindLabel=\"name\"\n      bindValue=\"uid\"\n      [cxNgSelectA11y]=\"{\n        ariaLabel: getGroupName(customerListsPage, selectedUserGroupId),\n        ariaControls: 'asm-cusomer-list-table'\n      }\"\n    >\n    </ng-select>\n  </label>\n</ng-template>\n\n<ng-template #closeButton>\n  <button\n    type=\"button\"\n    class=\"close\"\n    attr.aria-label=\"{{ 'common.close' | cxTranslate }}\"\n    (click)=\"closeModal('Cross click')\"\n  >\n    <span aria-hidden=\"true\">\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </span>\n  </button>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.LaunchDialogService }, { type: i1.BreakpointService }, { type: i2$1.AsmConfig }, { type: i1$1.TranslationService }, { type: i2$1.AsmCustomerListFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultCustomerListLayoutConfig = {
    launch: {
        ASM_CUSTOMER_LIST: {
            inlineRoot: true,
            component: CustomerListComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultAsmLayoutConfig = {
    launch: {
        ASM: {
            outlet: 'cx-storefront',
            component: AsmMainUiComponent,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultBindCartLayoutConfig = {
    launch: {
        ["ASM_BIND_CART" /* LAUNCH_CALLER.ASM_BIND_CART */]: {
            inlineRoot: true,
            component: AsmBindCartDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmComponentsModule {
}
AsmComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: AsmComponentsModule, declarations: [AsmBindCartDialogComponent,
        AsmMainUiComponent,
        CSAgentLoginFormComponent,
        CustomerListComponent,
        CustomerSelectionComponent,
        AsmSessionTimerComponent,
        FormatTimerPipe,
        CustomerEmulationComponent,
        AsmToggleUiComponent,
        AsmBindCartComponent,
        DotSpinnerComponent], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        FormErrorsModule,
        IconModule,
        NgSelectModule,
        FormsModule,
        SpinnerModule,
        PasswordVisibilityToggleModule,
        KeyboardFocusModule,
        NgSelectA11yModule,
        SortingModule], exports: [AsmBindCartDialogComponent,
        AsmMainUiComponent,
        CSAgentLoginFormComponent,
        CustomerListComponent,
        CustomerSelectionComponent,
        AsmSessionTimerComponent,
        FormatTimerPipe,
        CustomerEmulationComponent,
        AsmToggleUiComponent,
        AsmBindCartComponent,
        DotSpinnerComponent] });
AsmComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmComponentsModule, providers: [
        provideDefaultConfig(defaultAsmLayoutConfig),
        provideDefaultConfig(defaultBindCartLayoutConfig),
        provideDefaultConfig(defaultCustomerListLayoutConfig),
    ], imports: [CommonModule,
        ReactiveFormsModule,
        I18nModule,
        FormErrorsModule,
        IconModule,
        NgSelectModule,
        FormsModule,
        SpinnerModule,
        PasswordVisibilityToggleModule,
        KeyboardFocusModule,
        NgSelectA11yModule,
        SortingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ReactiveFormsModule,
                        I18nModule,
                        FormErrorsModule,
                        IconModule,
                        NgSelectModule,
                        FormsModule,
                        SpinnerModule,
                        PasswordVisibilityToggleModule,
                        KeyboardFocusModule,
                        NgSelectA11yModule,
                        SortingModule,
                    ],
                    declarations: [
                        AsmBindCartDialogComponent,
                        AsmMainUiComponent,
                        CSAgentLoginFormComponent,
                        CustomerListComponent,
                        CustomerSelectionComponent,
                        AsmSessionTimerComponent,
                        FormatTimerPipe,
                        CustomerEmulationComponent,
                        AsmToggleUiComponent,
                        AsmBindCartComponent,
                        DotSpinnerComponent,
                    ],
                    exports: [
                        AsmBindCartDialogComponent,
                        AsmMainUiComponent,
                        CSAgentLoginFormComponent,
                        CustomerListComponent,
                        CustomerSelectionComponent,
                        AsmSessionTimerComponent,
                        FormatTimerPipe,
                        CustomerEmulationComponent,
                        AsmToggleUiComponent,
                        AsmBindCartComponent,
                        DotSpinnerComponent,
                    ],
                    providers: [
                        provideDefaultConfig(defaultAsmLayoutConfig),
                        provideDefaultConfig(defaultBindCartLayoutConfig),
                        provideDefaultConfig(defaultCustomerListLayoutConfig),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AsmBindCartComponent, AsmBindCartDialogComponent, AsmComponentService, AsmComponentsModule, AsmMainUiComponent, AsmSessionTimerComponent, AsmToggleUiComponent, BIND_CART_DIALOG_ACTION, CSAgentLoginFormComponent, CustomerEmulationComponent, CustomerListComponent, CustomerSelectionComponent, DotSpinnerComponent, FormatTimerPipe };
//# sourceMappingURL=spartacus-asm-components.mjs.map
