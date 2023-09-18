/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../order-details.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
import * as i4 from "@spartacus/core";
export class OrderDetailActionsComponent {
    constructor(orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
        this.order$ = this.orderDetailsService.getOrderDetails();
    }
}
OrderDetailActionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderDetailActionsComponent, deps: [{ token: i1.OrderDetailsService }], target: i0.ɵɵFactoryTarget.Component });
OrderDetailActionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: OrderDetailActionsComponent, selector: "cx-order-details-actions", ngImport: i0, template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"cx-nav row\">\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <button\n        [routerLink]=\"{ cxRoute: 'orders' } | cxUrl\"\n        class=\"btn btn-block btn-secondary\"\n      >\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </div>\n\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <a\n        *ngIf=\"order.cancellable\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orderCancel',\n            params: order\n          } | cxUrl\n        \"\n        class=\"btn btn-block btn-secondary\"\n      >\n        {{ 'orderDetails.cancellationAndReturn.cancelAction' | cxTranslate }}\n      </a>\n\n      <a\n        *ngIf=\"order.returnable\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orderReturn',\n            params: order\n          } | cxUrl\n        \"\n        class=\"btn btn-block btn-secondary\"\n      >\n        {{ 'orderDetails.cancellationAndReturn.returnAction' | cxTranslate }}\n      </a>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i4.UrlPipe, name: "cxUrl" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderDetailActionsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-order-details-actions', template: "<ng-container *ngIf=\"order$ | async as order\">\n  <div class=\"cx-nav row\">\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <button\n        [routerLink]=\"{ cxRoute: 'orders' } | cxUrl\"\n        class=\"btn btn-block btn-secondary\"\n      >\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </div>\n\n    <div class=\"col-xs-12 col-md-4 col-lg-3\">\n      <a\n        *ngIf=\"order.cancellable\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orderCancel',\n            params: order\n          } | cxUrl\n        \"\n        class=\"btn btn-block btn-secondary\"\n      >\n        {{ 'orderDetails.cancellationAndReturn.cancelAction' | cxTranslate }}\n      </a>\n\n      <a\n        *ngIf=\"order.returnable\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orderReturn',\n            params: order\n          } | cxUrl\n        \"\n        class=\"btn btn-block btn-secondary\"\n      >\n        {{ 'orderDetails.cancellationAndReturn.returnAction' | cxTranslate }}\n      </a>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OrderDetailsService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGV0YWlsLWFjdGlvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvbXBvbmVudHMvb3JkZXItZGV0YWlscy9vcmRlci1kZXRhaWwtYWN0aW9ucy9vcmRlci1kZXRhaWwtYWN0aW9ucy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9vcmRlci1kZXRhaWxzL29yZGVyLWRldGFpbC1hY3Rpb25zL29yZGVyLWRldGFpbC1hY3Rpb25zLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFRMUMsTUFBTSxPQUFPLDJCQUEyQjtJQUN0QyxZQUFzQixtQkFBd0M7UUFBeEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUU5RCxXQUFNLEdBQW9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUZKLENBQUM7O3dIQUR2RCwyQkFBMkI7NEdBQTNCLDJCQUEyQixnRUNkeEMsdWpDQXdDQTsyRkQxQmEsMkJBQTJCO2tCQUp2QyxTQUFTOytCQUNFLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxzU2VydmljZSB9IGZyb20gJy4uL29yZGVyLWRldGFpbHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW9yZGVyLWRldGFpbHMtYWN0aW9ucycsXG4gIHRlbXBsYXRlVXJsOiAnLi9vcmRlci1kZXRhaWwtYWN0aW9ucy5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyRGV0YWlsQWN0aW9uc0NvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBvcmRlckRldGFpbHNTZXJ2aWNlOiBPcmRlckRldGFpbHNTZXJ2aWNlKSB7fVxuXG4gIG9yZGVyJDogT2JzZXJ2YWJsZTxhbnk+ID0gdGhpcy5vcmRlckRldGFpbHNTZXJ2aWNlLmdldE9yZGVyRGV0YWlscygpO1xufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cIm9yZGVyJCB8IGFzeW5jIGFzIG9yZGVyXCI+XG4gIDxkaXYgY2xhc3M9XCJjeC1uYXYgcm93XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbC14cy0xMiBjb2wtbWQtNCBjb2wtbGctM1wiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBbcm91dGVyTGlua109XCJ7IGN4Um91dGU6ICdvcmRlcnMnIH0gfCBjeFVybFwiXG4gICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tc2Vjb25kYXJ5XCJcbiAgICAgID5cbiAgICAgICAge3sgJ2NvbW1vbi5iYWNrJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJjb2wteHMtMTIgY29sLW1kLTQgY29sLWxnLTNcIj5cbiAgICAgIDxhXG4gICAgICAgICpuZ0lmPVwib3JkZXIuY2FuY2VsbGFibGVcIlxuICAgICAgICBbcm91dGVyTGlua109XCJcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjeFJvdXRlOiAnb3JkZXJDYW5jZWwnLFxuICAgICAgICAgICAgcGFyYW1zOiBvcmRlclxuICAgICAgICAgIH0gfCBjeFVybFxuICAgICAgICBcIlxuICAgICAgICBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLXNlY29uZGFyeVwiXG4gICAgICA+XG4gICAgICAgIHt7ICdvcmRlckRldGFpbHMuY2FuY2VsbGF0aW9uQW5kUmV0dXJuLmNhbmNlbEFjdGlvbicgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgPC9hPlxuXG4gICAgICA8YVxuICAgICAgICAqbmdJZj1cIm9yZGVyLnJldHVybmFibGVcIlxuICAgICAgICBbcm91dGVyTGlua109XCJcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjeFJvdXRlOiAnb3JkZXJSZXR1cm4nLFxuICAgICAgICAgICAgcGFyYW1zOiBvcmRlclxuICAgICAgICAgIH0gfCBjeFVybFxuICAgICAgICBcIlxuICAgICAgICBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLXNlY29uZGFyeVwiXG4gICAgICA+XG4gICAgICAgIHt7ICdvcmRlckRldGFpbHMuY2FuY2VsbGF0aW9uQW5kUmV0dXJuLnJldHVybkFjdGlvbicgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgPC9hPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuIl19