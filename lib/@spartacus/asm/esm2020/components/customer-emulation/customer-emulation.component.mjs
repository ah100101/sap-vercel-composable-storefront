/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../services/asm-component.service";
import * as i2 from "@spartacus/user/account/root";
import * as i3 from "@angular/common";
import * as i4 from "../asm-bind-cart/asm-bind-cart.component";
import * as i5 from "@spartacus/core";
export class CustomerEmulationComponent {
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
CustomerEmulationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CustomerEmulationComponent, deps: [{ token: i1.AsmComponentService }, { token: i2.UserAccountFacade }], target: i0.ɵɵFactoryTarget.Component });
CustomerEmulationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: CustomerEmulationComponent, selector: "cx-customer-emulation", ngImport: i0, template: "<ng-container *ngIf=\"isCustomerEmulationSessionInProgress$ | async\">\n  <div class=\"cx-asm-customerInfo\">\n    <label class=\"cx-asm-name\">{{ customer?.name }}</label>\n    <label class=\"cx-asm-uid\">{{ customer?.uid }}</label>\n  </div>\n  <cx-asm-bind-cart></cx-asm-bind-cart>\n  <button formcontrolname=\"logoutCustomer\" (click)=\"logoutCustomer()\">\n    {{ 'asm.endSession' | cxTranslate }}\n  </button>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i4.AsmBindCartComponent, selector: "cx-asm-bind-cart" }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i5.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CustomerEmulationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-customer-emulation', template: "<ng-container *ngIf=\"isCustomerEmulationSessionInProgress$ | async\">\n  <div class=\"cx-asm-customerInfo\">\n    <label class=\"cx-asm-name\">{{ customer?.name }}</label>\n    <label class=\"cx-asm-uid\">{{ customer?.uid }}</label>\n  </div>\n  <cx-asm-bind-cart></cx-asm-bind-cart>\n  <button formcontrolname=\"logoutCustomer\" (click)=\"logoutCustomer()\">\n    {{ 'asm.endSession' | cxTranslate }}\n  </button>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AsmComponentService }, { type: i2.UserAccountFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZW11bGF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9jdXN0b21lci1lbXVsYXRpb24vY3VzdG9tZXItZW11bGF0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9jdXN0b21lci1lbXVsYXRpb24vY3VzdG9tZXItZW11bGF0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUc3RCxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7Ozs7O0FBT2hELE1BQU0sT0FBTywwQkFBMEI7SUFLckMsWUFDWSxtQkFBd0MsRUFDeEMsaUJBQW9DO1FBRHBDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUp0QyxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFLekMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzlDLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxxQ0FBcUM7WUFDeEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG9DQUFvQyxFQUFFLENBQUM7SUFDcEUsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7O3VIQTVCVSwwQkFBMEI7MkdBQTFCLDBCQUEwQiw2RENoQnZDLG9iQVVBOzJGRE1hLDBCQUEwQjtrQkFKdEMsU0FBUzsrQkFDRSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFVzZXJBY2NvdW50RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL2FjY291bnQvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFzbUNvbXBvbmVudFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hc20tY29tcG9uZW50LnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1jdXN0b21lci1lbXVsYXRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vY3VzdG9tZXItZW11bGF0aW9uLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJFbXVsYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGN1c3RvbWVyOiBVc2VyO1xuICBpc0N1c3RvbWVyRW11bGF0aW9uU2Vzc2lvbkluUHJvZ3Jlc3MkOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhc21Db21wb25lbnRTZXJ2aWNlOiBBc21Db21wb25lbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VyQWNjb3VudEZhY2FkZTogVXNlckFjY291bnRGYWNhZGVcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMudXNlckFjY291bnRGYWNhZGUuZ2V0KCkuc3Vic2NyaWJlKCh1c2VyKSA9PiB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgdGhpcy5jdXN0b21lciA9IHVzZXI7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLmlzQ3VzdG9tZXJFbXVsYXRpb25TZXNzaW9uSW5Qcm9ncmVzcyQgPVxuICAgICAgdGhpcy5hc21Db21wb25lbnRTZXJ2aWNlLmlzQ3VzdG9tZXJFbXVsYXRpb25TZXNzaW9uSW5Qcm9ncmVzcygpO1xuICB9XG5cbiAgbG9nb3V0Q3VzdG9tZXIoKSB7XG4gICAgdGhpcy5hc21Db21wb25lbnRTZXJ2aWNlLmxvZ291dEN1c3RvbWVyKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiaXNDdXN0b21lckVtdWxhdGlvblNlc3Npb25JblByb2dyZXNzJCB8IGFzeW5jXCI+XG4gIDxkaXYgY2xhc3M9XCJjeC1hc20tY3VzdG9tZXJJbmZvXCI+XG4gICAgPGxhYmVsIGNsYXNzPVwiY3gtYXNtLW5hbWVcIj57eyBjdXN0b21lcj8ubmFtZSB9fTwvbGFiZWw+XG4gICAgPGxhYmVsIGNsYXNzPVwiY3gtYXNtLXVpZFwiPnt7IGN1c3RvbWVyPy51aWQgfX08L2xhYmVsPlxuICA8L2Rpdj5cbiAgPGN4LWFzbS1iaW5kLWNhcnQ+PC9jeC1hc20tYmluZC1jYXJ0PlxuICA8YnV0dG9uIGZvcm1jb250cm9sbmFtZT1cImxvZ291dEN1c3RvbWVyXCIgKGNsaWNrKT1cImxvZ291dEN1c3RvbWVyKClcIj5cbiAgICB7eyAnYXNtLmVuZFNlc3Npb24nIHwgY3hUcmFuc2xhdGUgfX1cbiAgPC9idXR0b24+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==