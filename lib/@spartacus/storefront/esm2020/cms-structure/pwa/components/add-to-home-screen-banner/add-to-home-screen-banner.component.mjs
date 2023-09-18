/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component } from '@angular/core';
import { AddToHomeScreenComponent } from '../add-to-home-screen.component';
import * as i0 from "@angular/core";
import * as i1 from "../../services/add-to-home-screen.service";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/core";
export class AddToHomeScreenBannerComponent extends AddToHomeScreenComponent {
    constructor(addToHomeScreenService) {
        super(addToHomeScreenService);
        this.addToHomeScreenService = addToHomeScreenService;
    }
}
AddToHomeScreenBannerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AddToHomeScreenBannerComponent, deps: [{ token: i1.AddToHomeScreenService }], target: i0.ɵɵFactoryTarget.Component });
AddToHomeScreenBannerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: AddToHomeScreenBannerComponent, selector: "cx-add-to-home-screen-banner", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"canPrompt$ | async\">\n  <div class=\"cx-add-to-home-screen-banner\">\n    <div class=\"cx-add-to-home-screen-banner-inner\">\n      <p>\n        {{ 'pwa.addToHomeScreenDescription' | cxTranslate }}\n      </p>\n      <ul>\n        <li>{{ 'pwa.noInstallationNeeded' | cxTranslate }}</li>\n        <li>{{ 'pwa.fastAccessToApplication' | cxTranslate }}</li>\n      </ul>\n      <button (click)=\"prompt()\" class=\"btn btn-primary\">\n        {{ 'pwa.addToHomeScreen' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AddToHomeScreenBannerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-add-to-home-screen-banner', template: "<div *ngIf=\"canPrompt$ | async\">\n  <div class=\"cx-add-to-home-screen-banner\">\n    <div class=\"cx-add-to-home-screen-banner-inner\">\n      <p>\n        {{ 'pwa.addToHomeScreenDescription' | cxTranslate }}\n      </p>\n      <ul>\n        <li>{{ 'pwa.noInstallationNeeded' | cxTranslate }}</li>\n        <li>{{ 'pwa.fastAccessToApplication' | cxTranslate }}</li>\n      </ul>\n      <button (click)=\"prompt()\" class=\"btn btn-primary\">\n        {{ 'pwa.addToHomeScreen' | cxTranslate }}\n      </button>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AddToHomeScreenService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXRvLWhvbWUtc2NyZWVuLWJhbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvcHdhL2NvbXBvbmVudHMvYWRkLXRvLWhvbWUtc2NyZWVuLWJhbm5lci9hZGQtdG8taG9tZS1zY3JlZW4tYmFubmVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9wd2EvY29tcG9uZW50cy9hZGQtdG8taG9tZS1zY3JlZW4tYmFubmVyL2FkZC10by1ob21lLXNjcmVlbi1iYW5uZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7O0FBTTNFLE1BQU0sT0FBTyw4QkFBK0IsU0FBUSx3QkFBd0I7SUFDMUUsWUFBc0Isc0JBQThDO1FBQ2xFLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRFYsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF3QjtJQUVwRSxDQUFDOzsySEFIVSw4QkFBOEI7K0dBQTlCLDhCQUE4QiwyRkNkM0Msa2lCQWdCQTsyRkRGYSw4QkFBOEI7a0JBSjFDLFNBQVM7K0JBQ0UsOEJBQThCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBZGRUb0hvbWVTY3JlZW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYWRkLXRvLWhvbWUtc2NyZWVuLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWRkVG9Ib21lU2NyZWVuQ29tcG9uZW50IH0gZnJvbSAnLi4vYWRkLXRvLWhvbWUtc2NyZWVuLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWFkZC10by1ob21lLXNjcmVlbi1iYW5uZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vYWRkLXRvLWhvbWUtc2NyZWVuLWJhbm5lci5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEFkZFRvSG9tZVNjcmVlbkJhbm5lckNvbXBvbmVudCBleHRlbmRzIEFkZFRvSG9tZVNjcmVlbkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBhZGRUb0hvbWVTY3JlZW5TZXJ2aWNlOiBBZGRUb0hvbWVTY3JlZW5TZXJ2aWNlKSB7XG4gICAgc3VwZXIoYWRkVG9Ib21lU2NyZWVuU2VydmljZSk7XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJjYW5Qcm9tcHQkIHwgYXN5bmNcIj5cbiAgPGRpdiBjbGFzcz1cImN4LWFkZC10by1ob21lLXNjcmVlbi1iYW5uZXJcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY3gtYWRkLXRvLWhvbWUtc2NyZWVuLWJhbm5lci1pbm5lclwiPlxuICAgICAgPHA+XG4gICAgICAgIHt7ICdwd2EuYWRkVG9Ib21lU2NyZWVuRGVzY3JpcHRpb24nIHwgY3hUcmFuc2xhdGUgfX1cbiAgICAgIDwvcD5cbiAgICAgIDx1bD5cbiAgICAgICAgPGxpPnt7ICdwd2Eubm9JbnN0YWxsYXRpb25OZWVkZWQnIHwgY3hUcmFuc2xhdGUgfX08L2xpPlxuICAgICAgICA8bGk+e3sgJ3B3YS5mYXN0QWNjZXNzVG9BcHBsaWNhdGlvbicgfCBjeFRyYW5zbGF0ZSB9fTwvbGk+XG4gICAgICA8L3VsPlxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwicHJvbXB0KClcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPlxuICAgICAgICB7eyAncHdhLmFkZFRvSG9tZVNjcmVlbicgfCBjeFRyYW5zbGF0ZSB9fVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=