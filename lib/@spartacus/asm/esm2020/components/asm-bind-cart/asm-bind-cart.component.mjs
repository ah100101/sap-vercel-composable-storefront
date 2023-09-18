/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, ViewChild, } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GlobalMessageType, OCC_CART_ID_CURRENT, } from '@spartacus/core';
import { BehaviorSubject, combineLatest, defer, EMPTY, iif, Subscription, } from 'rxjs';
import { concatMap, filter, finalize, map, shareReplay, take, tap, } from 'rxjs/operators';
import { BIND_CART_DIALOG_ACTION } from '../asm-bind-cart-dialog/asm-bind-cart-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/cart/base/root";
import * as i3 from "@spartacus/asm/root";
import * as i4 from "@spartacus/storefront";
import * as i5 from "@spartacus/cart/saved-cart/root";
import * as i6 from "@angular/forms";
import * as i7 from "../dot-spinner/dot-spinner.component";
import * as i8 from "@angular/common";
export class AsmBindCartComponent {
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
            this.activeCartId = response ?? '';
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
            .pipe(take(1), filter(([loading, valid]) => !loading && valid), tap(() => this.loading$.next(true)), concatMap(() => this.activeCartFacade.getActive().pipe(map((cart) => cart.deliveryItemsQuantity ?? 0), take(1))), concatMap((cartItemCount) => iif(() => Boolean(this.activeCartId && cartItemCount), this.openDialog(this.activeCartId, anonymousCartId), this.simpleBindCart(anonymousCartId))), finalize(() => this.loading$.next(false)))
            .subscribe(() => {
            this.globalMessageService.add({ key: 'asm.bindCart.success' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }, (error) => {
            this.globalMessageService.add(error.details?.[0].message ?? '', GlobalMessageType.MSG_TYPE_ERROR);
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
AsmBindCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmBindCartComponent, deps: [{ token: i1.GlobalMessageService }, { token: i2.ActiveCartFacade }, { token: i2.MultiCartFacade }, { token: i3.AsmBindCartFacade }, { token: i4.LaunchDialogService }, { token: i5.SavedCartFacade }], target: i0.ɵɵFactoryTarget.Component });
AsmBindCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: AsmBindCartComponent, selector: "cx-asm-bind-cart", viewQueries: [{ propertyName: "bindToCartElemRef", first: true, predicate: ["bindToCart"], descendants: true }], ngImport: i0, template: "<form (submit)=\"bindCartToCustomer()\">\n  <label for=\"cartNumber\">{{ 'asm.bindCart.cartNumber' | cxTranslate }} </label>\n  <div\n    role=\"search\"\n    [attr.aria-label]=\"'asm.bindCart.assignCartId' | cxTranslate\"\n    class=\"cx-asm-assignCart\"\n    [class.active]=\"valid$ | async\"\n    (click)=\"cartIdElement.focus()\"\n  >\n    <input\n      autocomplete=\"off\"\n      #cartIdElement\n      formcontrolname=\"cartNumber\"\n      [formControl]=\"cartId\"\n      (keydown.enter)=\"bindCartToCustomer()\"\n      (blur)=\"resetInput()\"\n      [attr.aria-label]=\"'asm.bindCart.enterCartId' | cxTranslate\"\n    />\n    <button\n      class=\"cx-asm-reset\"\n      [attr.aria-label]=\"'asm.bindCart.resetCartId' | cxTranslate\"\n      [class.visible]=\"cartId.value?.length > 0\"\n      (click)=\"clearText()\"\n    >\n      <cx-icon class=\"cx-icon fas fa-times-circle\"></cx-icon>\n    </button>\n  </div>\n  <button\n    #bindToCart\n    class=\"cx-asm-bindCartToCustomer\"\n    [disabled]=\"!(valid$ | async)\"\n    type=\"submit\"\n    [class.cx-asm-active]=\"valid$ | async\"\n    [class.cx-bind-loading]=\"loading$ | async\"\n  >\n    <span [attr.aria-hidden]=\"loading$ | async\">\n      {{ 'asm.bindCart.bindCartToCustomer' | cxTranslate }}\n    </span>\n    <cx-dot-spinner\n      [attr.aria-hidden]=\"!(loading$ | async)\"\n      [attr.aria-label]=\"'common.loading' | cxTranslate\"\n    ></cx-dot-spinner>\n  </button>\n</form>\n", dependencies: [{ kind: "directive", type: i6.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i6.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i6.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i6.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: i4.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i6.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "component", type: i7.DotSpinnerComponent, selector: "cx-dot-spinner" }, { kind: "pipe", type: i8.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmBindCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-bind-cart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<form (submit)=\"bindCartToCustomer()\">\n  <label for=\"cartNumber\">{{ 'asm.bindCart.cartNumber' | cxTranslate }} </label>\n  <div\n    role=\"search\"\n    [attr.aria-label]=\"'asm.bindCart.assignCartId' | cxTranslate\"\n    class=\"cx-asm-assignCart\"\n    [class.active]=\"valid$ | async\"\n    (click)=\"cartIdElement.focus()\"\n  >\n    <input\n      autocomplete=\"off\"\n      #cartIdElement\n      formcontrolname=\"cartNumber\"\n      [formControl]=\"cartId\"\n      (keydown.enter)=\"bindCartToCustomer()\"\n      (blur)=\"resetInput()\"\n      [attr.aria-label]=\"'asm.bindCart.enterCartId' | cxTranslate\"\n    />\n    <button\n      class=\"cx-asm-reset\"\n      [attr.aria-label]=\"'asm.bindCart.resetCartId' | cxTranslate\"\n      [class.visible]=\"cartId.value?.length > 0\"\n      (click)=\"clearText()\"\n    >\n      <cx-icon class=\"cx-icon fas fa-times-circle\"></cx-icon>\n    </button>\n  </div>\n  <button\n    #bindToCart\n    class=\"cx-asm-bindCartToCustomer\"\n    [disabled]=\"!(valid$ | async)\"\n    type=\"submit\"\n    [class.cx-asm-active]=\"valid$ | async\"\n    [class.cx-bind-loading]=\"loading$ | async\"\n  >\n    <span [attr.aria-hidden]=\"loading$ | async\">\n      {{ 'asm.bindCart.bindCartToCustomer' | cxTranslate }}\n    </span>\n    <cx-dot-spinner\n      [attr.aria-hidden]=\"!(loading$ | async)\"\n      [attr.aria-label]=\"'common.loading' | cxTranslate\"\n    ></cx-dot-spinner>\n  </button>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: i1.GlobalMessageService }, { type: i2.ActiveCartFacade }, { type: i2.MultiCartFacade }, { type: i3.AsmBindCartFacade }, { type: i4.LaunchDialogService }, { type: i5.SavedCartFacade }]; }, propDecorators: { bindToCartElemRef: [{
                type: ViewChild,
                args: ['bindToCart']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWJpbmQtY2FydC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2NvbXBvbmVudHMvYXNtLWJpbmQtY2FydC9hc20tYmluZC1jYXJ0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9hc20tYmluZC1jYXJ0L2FzbS1iaW5kLWNhcnQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUlULFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFlLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXRFLE9BQU8sRUFFTCxpQkFBaUIsRUFFakIsbUJBQW1CLEdBQ3BCLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUNMLGVBQWUsRUFDZixhQUFhLEVBQ2IsS0FBSyxFQUNMLEtBQUssRUFDTCxHQUFHLEVBRUgsWUFBWSxHQUNiLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLFNBQVMsRUFDVCxNQUFNLEVBQ04sUUFBUSxFQUNSLEdBQUcsRUFDSCxXQUFXLEVBQ1gsSUFBSSxFQUNKLEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDOzs7Ozs7Ozs7O0FBT2pHLE1BQU0sT0FBTyxvQkFBb0I7SUEyQi9CLFlBQ1ksb0JBQTBDLEVBQzFDLGdCQUFrQyxFQUNsQyxlQUFnQyxFQUNoQyxpQkFBb0MsRUFDcEMsbUJBQXdDLEVBQ3hDLGVBQWdDO1FBTGhDLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQWhDNUMsd0JBQW1CLEdBQWdCLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZDLE9BQU8sRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDbEM7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztRQUVGLFdBQU0sR0FBK0IsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFO1lBQ3ZELFVBQVUsQ0FBQyxRQUFRO1lBQ25CLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxtQkFBbUI7U0FDekIsQ0FBQyxDQUFDO1FBRUgsYUFBUSxHQUE2QixJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoRSxXQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNyQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsRUFDbkMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNmLENBQUM7UUFFRixpQkFBWSxHQUFHLEVBQUUsQ0FBQztRQUlSLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQVN6QyxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDN0QsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLElBQUksRUFBRSxDQUFDO1lBRW5DLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsa0JBQWtCO1FBQ2hCLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1FBRTFDLE1BQU0sWUFBWSxHQUFHLGFBQWEsQ0FBQztZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRTtZQUM1QixJQUFJLENBQUMsTUFBTTtTQUNaLENBQUM7YUFDQyxJQUFJLENBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsRUFDL0MsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ25DLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FDYixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUNwQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLENBQUMsRUFDOUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNSLENBQ0YsRUFDRCxTQUFTLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUMxQixHQUFHLENBQ0QsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksYUFBYSxDQUFDLEVBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxlQUF5QixDQUFDLEVBQzdELElBQUksQ0FBQyxjQUFjLENBQUMsZUFBeUIsQ0FBQyxDQUMvQyxDQUNGLEVBQ0QsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQzFDO2FBQ0EsU0FBUyxDQUNSLEdBQUcsRUFBRTtZQUNILElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCLEVBQUUsR0FBRyxFQUFFLHNCQUFzQixFQUFFLEVBQy9CLGlCQUFpQixDQUFDLHFCQUFxQixDQUN4QyxDQUFDO1FBQ0osQ0FBQyxFQUNELENBQUMsS0FBcUIsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLElBQUksRUFBRSxFQUNoQyxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pDLENBQUM7UUFDSixDQUFDLENBQ0YsQ0FBQztRQUVKLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUNPLGNBQWMsQ0FBQyxlQUF1QjtRQUM5QyxPQUFPLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN2RSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUNoRSxDQUFDO0lBQ0osQ0FBQztJQUVEOztPQUVHO0lBQ08sVUFBVSxDQUFDLFlBQW9CLEVBQUUsZUFBdUI7UUFDaEUsT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxzQkFBc0Isb0RBRTdDLElBQUksQ0FBQyxpQkFBaUIsQ0FDdkIsQ0FBQztZQUNGLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQzlDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQ25DLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDK0IsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ0wsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsRUFDL0MsU0FBUyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQzFCLFlBQVksRUFDWixlQUFlLEVBQ2YsWUFBWSxDQUNiLENBQUM7UUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVTLGdCQUFnQixDQUN4QixZQUFvQixFQUNwQixlQUF1QixFQUN2QixNQUErQjtRQUUvQixRQUFRLE1BQU0sRUFBRTtZQUNkLEtBQUssdUJBQXVCLENBQUMsT0FBTztnQkFDbEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsQ0FBQztZQUV6RCxLQUFLLHVCQUF1QixDQUFDLE1BQU0sQ0FBQztZQUNwQztnQkFDRSxPQUFPLEtBQUssQ0FBQztTQUNoQjtJQUNILENBQUM7SUFFUyxXQUFXLENBQ25CLG9CQUE0QixFQUM1QixlQUF1QjtRQUV2QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUM5QyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ1AsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUM7Z0JBQzVCLE1BQU0sRUFBRSxvQkFBb0I7Z0JBQzVCLFlBQVksRUFBRSxvQkFBb0I7Z0JBQ2xDLDZEQUE2RDtnQkFDN0QsbUJBQW1CLEVBQUUsR0FBRzthQUN6QixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7aUhBMUtVLG9CQUFvQjtxR0FBcEIsb0JBQW9CLHlLQ2xEakMsZzdDQTRDQTsyRkRNYSxvQkFBb0I7a0JBTGhDLFNBQVM7K0JBQ0Usa0JBQWtCLG1CQUVYLHVCQUF1QixDQUFDLE1BQU07d1FBeUJ0QixpQkFBaUI7c0JBQXpDLFNBQVM7dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIFZhbGlkYXRvckZuLCBWYWxpZGF0b3JzIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQXNtQmluZENhcnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2FzbS9yb290JztcbmltcG9ydCB7IEFjdGl2ZUNhcnRGYWNhZGUsIE11bHRpQ2FydEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgU2F2ZWRDYXJ0RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L3NhdmVkLWNhcnQvcm9vdCc7XG5pbXBvcnQge1xuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG4gIEh0dHBFcnJvck1vZGVsLFxuICBPQ0NfQ0FSVF9JRF9DVVJSRU5ULFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgTGF1bmNoRGlhbG9nU2VydmljZSwgTEFVTkNIX0NBTExFUiB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGNvbWJpbmVMYXRlc3QsXG4gIGRlZmVyLFxuICBFTVBUWSxcbiAgaWlmLFxuICBPYnNlcnZhYmxlLFxuICBTdWJzY3JpcHRpb24sXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgY29uY2F0TWFwLFxuICBmaWx0ZXIsXG4gIGZpbmFsaXplLFxuICBtYXAsXG4gIHNoYXJlUmVwbGF5LFxuICB0YWtlLFxuICB0YXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEJJTkRfQ0FSVF9ESUFMT0dfQUNUSU9OIH0gZnJvbSAnLi4vYXNtLWJpbmQtY2FydC1kaWFsb2cvYXNtLWJpbmQtY2FydC1kaWFsb2cuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtYXNtLWJpbmQtY2FydCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9hc20tYmluZC1jYXJ0LmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFzbUJpbmRDYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBhY3RpdmVDYXJ0VmFsaWRhdG9yOiBWYWxpZGF0b3JGbiA9IChjb250cm9sKSA9PiB7XG4gICAgaWYgKGNvbnRyb2wudmFsdWUgPT09IHRoaXMuYWN0aXZlQ2FydElkKSB7XG4gICAgICByZXR1cm4geyBhY3RpdmVDYXJ0RXJyb3I6IHRydWUgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgY2FydElkOiBGb3JtQ29udHJvbDxzdHJpbmcgfCBudWxsPiA9IG5ldyBGb3JtQ29udHJvbCgnJywgW1xuICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoMSksXG4gICAgdGhpcy5hY3RpdmVDYXJ0VmFsaWRhdG9yLFxuICBdKTtcblxuICBsb2FkaW5nJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cbiAgdmFsaWQkID0gdGhpcy5jYXJ0SWQuc3RhdHVzQ2hhbmdlcy5waXBlKFxuICAgIG1hcCgoc3RhdHVzKSA9PiBzdGF0dXMgPT09ICdWQUxJRCcpLFxuICAgIHNoYXJlUmVwbGF5KDEpXG4gICk7XG5cbiAgYWN0aXZlQ2FydElkID0gJyc7XG5cbiAgQFZpZXdDaGlsZCgnYmluZFRvQ2FydCcpIGJpbmRUb0NhcnRFbGVtUmVmOiBFbGVtZW50UmVmPEhUTUxCdXR0b25FbGVtZW50PjtcblxuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRGYWNhZGU6IEFjdGl2ZUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIG11bHRpQ2FydEZhY2FkZTogTXVsdGlDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCBhc21CaW5kQ2FydEZhY2FkZTogQXNtQmluZENhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGxhdW5jaERpYWxvZ1NlcnZpY2U6IExhdW5jaERpYWxvZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHNhdmVkQ2FydEZhY2FkZTogU2F2ZWRDYXJ0RmFjYWRlXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLmFjdGl2ZUNhcnRGYWNhZGUuZ2V0QWN0aXZlQ2FydElkKCkuc3Vic2NyaWJlKChyZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLmFjdGl2ZUNhcnRJZCA9IHJlc3BvbnNlID8/ICcnO1xuXG4gICAgICAgIHRoaXMuY2FydElkLnNldFZhbHVlKHRoaXMuYWN0aXZlQ2FydElkKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHJlc2V0SW5wdXQoKSB7XG4gICAgaWYgKCF0aGlzLmNhcnRJZC52YWx1ZSkge1xuICAgICAgdGhpcy5jYXJ0SWQuc2V0VmFsdWUodGhpcy5hY3RpdmVDYXJ0SWQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIHRoZSBpbnB1dCBjYXJ0IG51bWJlciB0byB0aGUgY3VzdG9tZXJcbiAgICovXG4gIGJpbmRDYXJ0VG9DdXN0b21lcigpIHtcbiAgICBjb25zdCBhbm9ueW1vdXNDYXJ0SWQgPSB0aGlzLmNhcnRJZC52YWx1ZTtcblxuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5sb2FkaW5nJC5hc09ic2VydmFibGUoKSxcbiAgICAgIHRoaXMudmFsaWQkLFxuICAgIF0pXG4gICAgICAucGlwZShcbiAgICAgICAgdGFrZSgxKSxcbiAgICAgICAgZmlsdGVyKChbbG9hZGluZywgdmFsaWRdKSA9PiAhbG9hZGluZyAmJiB2YWxpZCksXG4gICAgICAgIHRhcCgoKSA9PiB0aGlzLmxvYWRpbmckLm5leHQodHJ1ZSkpLFxuICAgICAgICBjb25jYXRNYXAoKCkgPT5cbiAgICAgICAgICB0aGlzLmFjdGl2ZUNhcnRGYWNhZGUuZ2V0QWN0aXZlKCkucGlwZShcbiAgICAgICAgICAgIG1hcCgoY2FydCkgPT4gY2FydC5kZWxpdmVyeUl0ZW1zUXVhbnRpdHkgPz8gMCksXG4gICAgICAgICAgICB0YWtlKDEpXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBjb25jYXRNYXAoKGNhcnRJdGVtQ291bnQpID0+XG4gICAgICAgICAgaWlmKFxuICAgICAgICAgICAgKCkgPT4gQm9vbGVhbih0aGlzLmFjdGl2ZUNhcnRJZCAmJiBjYXJ0SXRlbUNvdW50KSxcbiAgICAgICAgICAgIHRoaXMub3BlbkRpYWxvZyh0aGlzLmFjdGl2ZUNhcnRJZCwgYW5vbnltb3VzQ2FydElkIGFzIHN0cmluZyksXG4gICAgICAgICAgICB0aGlzLnNpbXBsZUJpbmRDYXJ0KGFub255bW91c0NhcnRJZCBhcyBzdHJpbmcpXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBmaW5hbGl6ZSgoKSA9PiB0aGlzLmxvYWRpbmckLm5leHQoZmFsc2UpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZ2xvYmFsTWVzc2FnZVNlcnZpY2UuYWRkKFxuICAgICAgICAgICAgeyBrZXk6ICdhc20uYmluZENhcnQuc3VjY2VzcycgfSxcbiAgICAgICAgICAgIEdsb2JhbE1lc3NhZ2VUeXBlLk1TR19UWVBFX0NPTkZJUk1BVElPTlxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcjogSHR0cEVycm9yTW9kZWwpID0+IHtcbiAgICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgICAgIGVycm9yLmRldGFpbHM/LlswXS5tZXNzYWdlID8/ICcnLFxuICAgICAgICAgICAgR2xvYmFsTWVzc2FnZVR5cGUuTVNHX1RZUEVfRVJST1JcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHN1YnNjcmlwdGlvbik7XG4gIH1cblxuICBjbGVhclRleHQoKSB7XG4gICAgdGhpcy5jYXJ0SWQuc2V0VmFsdWUoJycpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kcyBjYXJ0IG9uIHN1YnNjcmlwdGlvbiBhbmQgcmVsb2FkcyBjYXJ0XG4gICAqL1xuICBwcm90ZWN0ZWQgc2ltcGxlQmluZENhcnQoYW5vbnltb3VzQ2FydElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gZGVmZXIoKCkgPT4gdGhpcy5hc21CaW5kQ2FydEZhY2FkZS5iaW5kQ2FydChhbm9ueW1vdXNDYXJ0SWQpKS5waXBlKFxuICAgICAgdGFwKCgpID0+IHRoaXMubXVsdGlDYXJ0RmFjYWRlLnJlbG9hZENhcnQoT0NDX0NBUlRfSURfQ1VSUkVOVCkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPcGVucyBkaWFsb2cgYW5kIHBhc3NlcyBub24tY2FuY2VsIHJlc3VsdCB0byBzZWxlY3QgYWN0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgb3BlbkRpYWxvZyhhY3RpdmVDYXJ0SWQ6IHN0cmluZywgYW5vbnltb3VzQ2FydElkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZGVmZXIoKCkgPT4ge1xuICAgICAgdGhpcy5sYXVuY2hEaWFsb2dTZXJ2aWNlLm9wZW5EaWFsb2dBbmRTdWJzY3JpYmUoXG4gICAgICAgIExBVU5DSF9DQUxMRVIuQVNNX0JJTkRfQ0FSVCxcbiAgICAgICAgdGhpcy5iaW5kVG9DYXJ0RWxlbVJlZlxuICAgICAgKTtcbiAgICAgIHJldHVybiB0aGlzLmxhdW5jaERpYWxvZ1NlcnZpY2UuZGlhbG9nQ2xvc2UucGlwZShcbiAgICAgICAgZmlsdGVyKChyZXN1bHQpID0+IEJvb2xlYW4ocmVzdWx0KSksXG4gICAgICAgIHRha2UoMSlcbiAgICAgICkgYXMgT2JzZXJ2YWJsZTxCSU5EX0NBUlRfRElBTE9HX0FDVElPTj47XG4gICAgfSkucGlwZShcbiAgICAgIGZpbHRlcigoZGlhbG9nUmVzdWx0KSA9PiBCb29sZWFuKGRpYWxvZ1Jlc3VsdCkpLFxuICAgICAgY29uY2F0TWFwKChkaWFsb2dSZXN1bHQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0QmluZEFjdGlvbihcbiAgICAgICAgICBhY3RpdmVDYXJ0SWQsXG4gICAgICAgICAgYW5vbnltb3VzQ2FydElkLFxuICAgICAgICAgIGRpYWxvZ1Jlc3VsdFxuICAgICAgICApO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNlbGVjdEJpbmRBY3Rpb24oXG4gICAgYWN0aXZlQ2FydElkOiBzdHJpbmcsXG4gICAgYW5vbnltb3VzQ2FydElkOiBzdHJpbmcsXG4gICAgYWN0aW9uOiBCSU5EX0NBUlRfRElBTE9HX0FDVElPTlxuICApOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgY2FzZSBCSU5EX0NBUlRfRElBTE9HX0FDVElPTi5SRVBMQUNFOlxuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlQ2FydChhY3RpdmVDYXJ0SWQsIGFub255bW91c0NhcnRJZCk7XG5cbiAgICAgIGNhc2UgQklORF9DQVJUX0RJQUxPR19BQ1RJT04uQ0FOQ0VMOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCByZXBsYWNlQ2FydChcbiAgICBwcmV2aW91c0FjdGl2ZUNhcnRJZDogc3RyaW5nLFxuICAgIGFub255bW91c0NhcnRJZDogc3RyaW5nXG4gICk6IE9ic2VydmFibGU8dW5rbm93bj4ge1xuICAgIHJldHVybiB0aGlzLnNpbXBsZUJpbmRDYXJ0KGFub255bW91c0NhcnRJZCkucGlwZShcbiAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2F2ZWRDYXJ0RmFjYWRlLnNhdmVDYXJ0KHtcbiAgICAgICAgICBjYXJ0SWQ6IHByZXZpb3VzQWN0aXZlQ2FydElkLFxuICAgICAgICAgIHNhdmVDYXJ0TmFtZTogcHJldmlvdXNBY3RpdmVDYXJ0SWQsXG4gICAgICAgICAgLy8gVE9ETygjMTI2NjApOiBSZW1vdmUgZGVmYXVsdCB2YWx1ZSBvbmNlIGJhY2tlbmQgaXMgdXBkYXRlZFxuICAgICAgICAgIHNhdmVDYXJ0RGVzY3JpcHRpb246ICctJyxcbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiIsIjxmb3JtIChzdWJtaXQpPVwiYmluZENhcnRUb0N1c3RvbWVyKClcIj5cbiAgPGxhYmVsIGZvcj1cImNhcnROdW1iZXJcIj57eyAnYXNtLmJpbmRDYXJ0LmNhcnROdW1iZXInIHwgY3hUcmFuc2xhdGUgfX0gPC9sYWJlbD5cbiAgPGRpdlxuICAgIHJvbGU9XCJzZWFyY2hcIlxuICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2FzbS5iaW5kQ2FydC5hc3NpZ25DYXJ0SWQnIHwgY3hUcmFuc2xhdGVcIlxuICAgIGNsYXNzPVwiY3gtYXNtLWFzc2lnbkNhcnRcIlxuICAgIFtjbGFzcy5hY3RpdmVdPVwidmFsaWQkIHwgYXN5bmNcIlxuICAgIChjbGljayk9XCJjYXJ0SWRFbGVtZW50LmZvY3VzKClcIlxuICA+XG4gICAgPGlucHV0XG4gICAgICBhdXRvY29tcGxldGU9XCJvZmZcIlxuICAgICAgI2NhcnRJZEVsZW1lbnRcbiAgICAgIGZvcm1jb250cm9sbmFtZT1cImNhcnROdW1iZXJcIlxuICAgICAgW2Zvcm1Db250cm9sXT1cImNhcnRJZFwiXG4gICAgICAoa2V5ZG93bi5lbnRlcik9XCJiaW5kQ2FydFRvQ3VzdG9tZXIoKVwiXG4gICAgICAoYmx1cik9XCJyZXNldElucHV0KClcIlxuICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCInYXNtLmJpbmRDYXJ0LmVudGVyQ2FydElkJyB8IGN4VHJhbnNsYXRlXCJcbiAgICAvPlxuICAgIDxidXR0b25cbiAgICAgIGNsYXNzPVwiY3gtYXNtLXJlc2V0XCJcbiAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ2FzbS5iaW5kQ2FydC5yZXNldENhcnRJZCcgfCBjeFRyYW5zbGF0ZVwiXG4gICAgICBbY2xhc3MudmlzaWJsZV09XCJjYXJ0SWQudmFsdWU/Lmxlbmd0aCA+IDBcIlxuICAgICAgKGNsaWNrKT1cImNsZWFyVGV4dCgpXCJcbiAgICA+XG4gICAgICA8Y3gtaWNvbiBjbGFzcz1cImN4LWljb24gZmFzIGZhLXRpbWVzLWNpcmNsZVwiPjwvY3gtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG4gIDxidXR0b25cbiAgICAjYmluZFRvQ2FydFxuICAgIGNsYXNzPVwiY3gtYXNtLWJpbmRDYXJ0VG9DdXN0b21lclwiXG4gICAgW2Rpc2FibGVkXT1cIiEodmFsaWQkIHwgYXN5bmMpXCJcbiAgICB0eXBlPVwic3VibWl0XCJcbiAgICBbY2xhc3MuY3gtYXNtLWFjdGl2ZV09XCJ2YWxpZCQgfCBhc3luY1wiXG4gICAgW2NsYXNzLmN4LWJpbmQtbG9hZGluZ109XCJsb2FkaW5nJCB8IGFzeW5jXCJcbiAgPlxuICAgIDxzcGFuIFthdHRyLmFyaWEtaGlkZGVuXT1cImxvYWRpbmckIHwgYXN5bmNcIj5cbiAgICAgIHt7ICdhc20uYmluZENhcnQuYmluZENhcnRUb0N1c3RvbWVyJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgPC9zcGFuPlxuICAgIDxjeC1kb3Qtc3Bpbm5lclxuICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIShsb2FkaW5nJCB8IGFzeW5jKVwiXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cIidjb21tb24ubG9hZGluZycgfCBjeFRyYW5zbGF0ZVwiXG4gICAgPjwvY3gtZG90LXNwaW5uZXI+XG4gIDwvYnV0dG9uPlxuPC9mb3JtPlxuIl19