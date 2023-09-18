/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../return-request.service";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/core";
export class ReturnRequestTotalsComponent {
    constructor(returnRequestService) {
        this.returnRequestService = returnRequestService;
        this.returnRequest$ = this.returnRequestService.getReturnRequest();
    }
    ngOnDestroy() {
        this.returnRequestService.clearReturnRequest();
    }
}
ReturnRequestTotalsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ReturnRequestTotalsComponent, deps: [{ token: i1.ReturnRequestService }], target: i0.ɵɵFactoryTarget.Component });
ReturnRequestTotalsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: ReturnRequestTotalsComponent, selector: "cx-return-request-totals", ngImport: i0, template: "<ng-container *ngIf=\"returnRequest$ | async as returnRequest\">\n  <div class=\"row justify-content-end\">\n    <div class=\"cx-summary col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <h4>{{ 'returnRequest.summary' | cxTranslate }}</h4>\n      <div class=\"cx-summary-row\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.subtotal' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.subTotal?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.deliveryCode' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.deliveryCost?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-summary-total\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.estimatedRefund' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.totalPrice?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-footnote\">\n        {{ 'returnRequest.note' | cxTranslate }}\n      </div>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ReturnRequestTotalsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-return-request-totals', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"returnRequest$ | async as returnRequest\">\n  <div class=\"row justify-content-end\">\n    <div class=\"cx-summary col-sm-12 col-md-6 col-lg-5 col-xl-4\">\n      <h4>{{ 'returnRequest.summary' | cxTranslate }}</h4>\n      <div class=\"cx-summary-row\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.subtotal' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.subTotal?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.deliveryCode' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.deliveryCost?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-summary-total\">\n        <div class=\"col-6 cx-summary-label\">\n          {{ 'returnRequest.estimatedRefund' | cxTranslate }}\n        </div>\n        <div class=\"col-6 cx-summary-amount\">\n          {{ returnRequest.totalPrice?.formattedValue }}\n        </div>\n      </div>\n      <div class=\"cx-summary-row cx-footnote\">\n        {{ 'returnRequest.note' | cxTranslate }}\n      </div>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.ReturnRequestService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0dXJuLXJlcXVlc3QtdG90YWxzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL3JldHVybi1yZXF1ZXN0LWRldGFpbC9yZXR1cm4tcmVxdWVzdC10b3RhbHMvcmV0dXJuLXJlcXVlc3QtdG90YWxzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL3JldHVybi1yZXF1ZXN0LWRldGFpbC9yZXR1cm4tcmVxdWVzdC10b3RhbHMvcmV0dXJuLXJlcXVlc3QtdG90YWxzLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDOzs7OztBQVU5RSxNQUFNLE9BQU8sNEJBQTRCO0lBQ3ZDLFlBQXNCLG9CQUEwQztRQUExQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBRWhFLG1CQUFjLEdBQ1osSUFBSSxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFIb0IsQ0FBQztJQUtwRSxXQUFXO1FBQ1QsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDakQsQ0FBQzs7eUhBUlUsNEJBQTRCOzZHQUE1Qiw0QkFBNEIsZ0VDaEJ6QywweENBa0NBOzJGRGxCYSw0QkFBNEI7a0JBTHhDLFNBQVM7K0JBQ0UsMEJBQTBCLG1CQUVuQix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXR1cm5SZXF1ZXN0IH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFJldHVyblJlcXVlc3RTZXJ2aWNlIH0gZnJvbSAnLi4vcmV0dXJuLXJlcXVlc3Quc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LXJldHVybi1yZXF1ZXN0LXRvdGFscycsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZXR1cm4tcmVxdWVzdC10b3RhbHMuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUmV0dXJuUmVxdWVzdFRvdGFsc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCByZXR1cm5SZXF1ZXN0U2VydmljZTogUmV0dXJuUmVxdWVzdFNlcnZpY2UpIHt9XG5cbiAgcmV0dXJuUmVxdWVzdCQ6IE9ic2VydmFibGU8UmV0dXJuUmVxdWVzdD4gPVxuICAgIHRoaXMucmV0dXJuUmVxdWVzdFNlcnZpY2UuZ2V0UmV0dXJuUmVxdWVzdCgpO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucmV0dXJuUmVxdWVzdFNlcnZpY2UuY2xlYXJSZXR1cm5SZXF1ZXN0KCk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJyZXR1cm5SZXF1ZXN0JCB8IGFzeW5jIGFzIHJldHVyblJlcXVlc3RcIj5cbiAgPGRpdiBjbGFzcz1cInJvdyBqdXN0aWZ5LWNvbnRlbnQtZW5kXCI+XG4gICAgPGRpdiBjbGFzcz1cImN4LXN1bW1hcnkgY29sLXNtLTEyIGNvbC1tZC02IGNvbC1sZy01IGNvbC14bC00XCI+XG4gICAgICA8aDQ+e3sgJ3JldHVyblJlcXVlc3Quc3VtbWFyeScgfCBjeFRyYW5zbGF0ZSB9fTwvaDQ+XG4gICAgICA8ZGl2IGNsYXNzPVwiY3gtc3VtbWFyeS1yb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC02IGN4LXN1bW1hcnktbGFiZWxcIj5cbiAgICAgICAgICB7eyAncmV0dXJuUmVxdWVzdC5zdWJ0b3RhbCcgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC02IGN4LXN1bW1hcnktYW1vdW50XCI+XG4gICAgICAgICAge3sgcmV0dXJuUmVxdWVzdC5zdWJUb3RhbD8uZm9ybWF0dGVkVmFsdWUgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjeC1zdW1tYXJ5LXJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTYgY3gtc3VtbWFyeS1sYWJlbFwiPlxuICAgICAgICAgIHt7ICdyZXR1cm5SZXF1ZXN0LmRlbGl2ZXJ5Q29kZScgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC02IGN4LXN1bW1hcnktYW1vdW50XCI+XG4gICAgICAgICAge3sgcmV0dXJuUmVxdWVzdC5kZWxpdmVyeUNvc3Q/LmZvcm1hdHRlZFZhbHVlIH19XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY3gtc3VtbWFyeS1yb3cgY3gtc3VtbWFyeS10b3RhbFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTYgY3gtc3VtbWFyeS1sYWJlbFwiPlxuICAgICAgICAgIHt7ICdyZXR1cm5SZXF1ZXN0LmVzdGltYXRlZFJlZnVuZCcgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC02IGN4LXN1bW1hcnktYW1vdW50XCI+XG4gICAgICAgICAge3sgcmV0dXJuUmVxdWVzdC50b3RhbFByaWNlPy5mb3JtYXR0ZWRWYWx1ZSB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImN4LXN1bW1hcnktcm93IGN4LWZvb3Rub3RlXCI+XG4gICAgICAgIHt7ICdyZXR1cm5SZXF1ZXN0Lm5vdGUnIHwgY3hUcmFuc2xhdGUgfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuIl19