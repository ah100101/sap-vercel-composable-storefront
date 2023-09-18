/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/core";
export class LoginRegisterComponent {
    constructor(activatedRoute) {
        this.activatedRoute = activatedRoute;
        this.loginAsGuest = false;
    }
    ngOnInit() {
        this.loginAsGuest = this.activatedRoute.snapshot.queryParams['forced'];
    }
}
LoginRegisterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: LoginRegisterComponent, deps: [{ token: i1.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Component });
LoginRegisterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: LoginRegisterComponent, selector: "cx-login-register", ngImport: i0, template: "<div class=\"register\">\n  <p class=\"cx-section-title\">\n    {{ 'loginForm.dontHaveAccount' | cxTranslate }}\n  </p>\n\n  <ng-container *ngIf=\"!loginAsGuest\">\n    <a\n      [routerLink]=\"{ cxRoute: 'register' } | cxUrl\"\n      class=\"btn btn-block btn-secondary btn-register\"\n      >{{ 'loginForm.register' | cxTranslate }}</a\n    >\n  </ng-container>\n\n  <ng-container *ngIf=\"loginAsGuest\">\n    <a\n      [routerLink]=\"{ cxRoute: 'checkoutLogin' } | cxUrl\"\n      class=\"btn btn-block btn-secondary btn-guest\"\n      >{{ 'loginForm.guestCheckout' | cxTranslate }}</a\n    >\n  </ng-container>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: LoginRegisterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-login-register', template: "<div class=\"register\">\n  <p class=\"cx-section-title\">\n    {{ 'loginForm.dontHaveAccount' | cxTranslate }}\n  </p>\n\n  <ng-container *ngIf=\"!loginAsGuest\">\n    <a\n      [routerLink]=\"{ cxRoute: 'register' } | cxUrl\"\n      class=\"btn btn-block btn-secondary btn-register\"\n      >{{ 'loginForm.register' | cxTranslate }}</a\n    >\n  </ng-container>\n\n  <ng-container *ngIf=\"loginAsGuest\">\n    <a\n      [routerLink]=\"{ cxRoute: 'checkoutLogin' } | cxUrl\"\n      class=\"btn btn-block btn-secondary btn-guest\"\n      >{{ 'loginForm.guestCheckout' | cxTranslate }}</a\n    >\n  </ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ActivatedRoute }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tcmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvYWNjb3VudC9jb21wb25lbnRzL2xvZ2luLXJlZ2lzdGVyL2xvZ2luLXJlZ2lzdGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy91c2VyL2FjY291bnQvY29tcG9uZW50cy9sb2dpbi1yZWdpc3Rlci9sb2dpbi1yZWdpc3Rlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUFPbEQsTUFBTSxPQUFPLHNCQUFzQjtJQUdqQyxZQUFzQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFGcEQsaUJBQVksR0FBRyxLQUFLLENBQUM7SUFFa0MsQ0FBQztJQUV4RCxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekUsQ0FBQzs7bUhBUFUsc0JBQXNCO3VHQUF0QixzQkFBc0IseURDYm5DLGluQkFxQkE7MkZEUmEsc0JBQXNCO2tCQUpsQyxTQUFTOytCQUNFLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWxvZ2luLXJlZ2lzdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLXJlZ2lzdGVyLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgTG9naW5SZWdpc3RlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGxvZ2luQXNHdWVzdCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5sb2dpbkFzR3Vlc3QgPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnNuYXBzaG90LnF1ZXJ5UGFyYW1zWydmb3JjZWQnXTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cInJlZ2lzdGVyXCI+XG4gIDxwIGNsYXNzPVwiY3gtc2VjdGlvbi10aXRsZVwiPlxuICAgIHt7ICdsb2dpbkZvcm0uZG9udEhhdmVBY2NvdW50JyB8IGN4VHJhbnNsYXRlIH19XG4gIDwvcD5cblxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWxvZ2luQXNHdWVzdFwiPlxuICAgIDxhXG4gICAgICBbcm91dGVyTGlua109XCJ7IGN4Um91dGU6ICdyZWdpc3RlcicgfSB8IGN4VXJsXCJcbiAgICAgIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tc2Vjb25kYXJ5IGJ0bi1yZWdpc3RlclwiXG4gICAgICA+e3sgJ2xvZ2luRm9ybS5yZWdpc3RlcicgfCBjeFRyYW5zbGF0ZSB9fTwvYVxuICAgID5cbiAgPC9uZy1jb250YWluZXI+XG5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImxvZ2luQXNHdWVzdFwiPlxuICAgIDxhXG4gICAgICBbcm91dGVyTGlua109XCJ7IGN4Um91dGU6ICdjaGVja291dExvZ2luJyB9IHwgY3hVcmxcIlxuICAgICAgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1zZWNvbmRhcnkgYnRuLWd1ZXN0XCJcbiAgICAgID57eyAnbG9naW5Gb3JtLmd1ZXN0Q2hlY2tvdXQnIHwgY3hUcmFuc2xhdGUgfX08L2FcbiAgICA+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG4iXX0=