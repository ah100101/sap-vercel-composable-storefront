/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { DaysOfWeek, ORDER_TYPE, recurrencePeriod, } from '@spartacus/order/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../services/checkout-replenishment-form.service";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/storefront";
import * as i4 from "@spartacus/core";
export class CheckoutScheduleReplenishmentOrderComponent {
    constructor(checkoutReplenishmentFormService) {
        this.checkoutReplenishmentFormService = checkoutReplenishmentFormService;
        this.subscription = new Subscription();
        this.iconTypes = ICON_TYPE;
        this.orderTypes = ORDER_TYPE;
        this.daysOfWeek = Object.values(DaysOfWeek);
        this.recurrencePeriodType = Object.values(recurrencePeriod);
        this.selectedOrderType$ = this.checkoutReplenishmentFormService.getOrderType();
        this.isMonthly = false;
        this.isWeekly = false;
        this.currentDaysOfWeek = [];
    }
    ngOnInit() {
        this.subscription.add(this.checkoutReplenishmentFormService
            .getScheduleReplenishmentFormData()
            .subscribe((data) => {
            this.scheduleReplenishmentFormData = data;
        }));
        this.initConfig();
    }
    changeOrderType(orderType) {
        this.checkoutReplenishmentFormService.setOrderType(orderType);
    }
    changeNumberOfDays(nDays) {
        this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
            ...this.scheduleReplenishmentFormData,
            numberOfDays: nDays,
        });
    }
    changeNumberOfWeeks(nWeeks) {
        this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
            ...this.scheduleReplenishmentFormData,
            numberOfWeeks: nWeeks,
        });
    }
    changeRecurrencePeriodType(type) {
        this.isWeekly = type === recurrencePeriod.WEEKLY;
        this.isMonthly = type === recurrencePeriod.MONTHLY;
        this.numberOfDays = this.isMonthly
            ? this.createNumberStringArray(31)
            : this.createNumberStringArray(30);
        this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
            ...this.scheduleReplenishmentFormData,
            recurrencePeriod: type,
        });
    }
    changeDayOfTheMonth(dayOfMonth) {
        this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
            ...this.scheduleReplenishmentFormData,
            nthDayOfMonth: dayOfMonth,
        });
    }
    changeReplenishmentStartDate(date) {
        if (Boolean(date)) {
            this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
                ...this.scheduleReplenishmentFormData,
                replenishmentStartDate: date,
            });
        }
    }
    changeRepeatDays(day, isChecked) {
        if (isChecked) {
            this.currentDaysOfWeek = [...this.currentDaysOfWeek];
            this.currentDaysOfWeek.push(day);
            this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
                ...this.scheduleReplenishmentFormData,
                daysOfWeek: this.currentDaysOfWeek,
            });
        }
        else {
            const foundDay = this.currentDaysOfWeek.find((data) => day === data);
            if (!foundDay) {
                return;
            }
            const index = this.currentDaysOfWeek.indexOf(foundDay);
            this.currentDaysOfWeek.splice(index, 1);
            this.checkoutReplenishmentFormService.setScheduleReplenishmentFormData({
                ...this.scheduleReplenishmentFormData,
                daysOfWeek: this.currentDaysOfWeek,
            });
        }
    }
    hasDaysOfWeekChecked(day) {
        return this.currentDaysOfWeek.includes(day);
    }
    initConfig() {
        this.isMonthly =
            this.scheduleReplenishmentFormData.recurrencePeriod ===
                recurrencePeriod.MONTHLY;
        this.isWeekly =
            this.scheduleReplenishmentFormData.recurrencePeriod ===
                recurrencePeriod.WEEKLY;
        this.currentDaysOfWeek = [
            ...(this.scheduleReplenishmentFormData.daysOfWeek ?? []),
        ];
        this.numberOfDays = this.isMonthly
            ? this.createNumberStringArray(31)
            : this.createNumberStringArray(30);
        this.numberOfWeeks = this.createNumberStringArray(12);
        this.currentDate =
            this.scheduleReplenishmentFormData.replenishmentStartDate;
    }
    createNumberStringArray(n) {
        return Array(n)
            .fill(0)
            .map((_, y) => (y + 1).toString());
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CheckoutScheduleReplenishmentOrderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CheckoutScheduleReplenishmentOrderComponent, deps: [{ token: i1.CheckoutReplenishmentFormService }], target: i0.ɵɵFactoryTarget.Component });
CheckoutScheduleReplenishmentOrderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: CheckoutScheduleReplenishmentOrderComponent, selector: "cx-schedule-replenishment-order", ngImport: i0, template: "<div class=\"cx-order-type-card\">\n  <div class=\"cx-label-container\">\n    <h5 class=\"cx-order-replenishment-header\">\n      {{ 'checkoutScheduledReplenishment.autoReplenishOrder' | cxTranslate }}\n    </h5>\n    <cx-icon [type]=\"iconTypes.CLOCK\"></cx-icon>\n  </div>\n  <div\n    class=\"cx-order-type-container form-check\"\n    *ngFor=\"let type of orderTypes | keyvalue\"\n  >\n    <input\n      id=\"orderType-{{ type.value }}\"\n      class=\"scaled-input form-check-input\"\n      role=\"radio\"\n      type=\"radio\"\n      formControlName=\"orderType\"\n      aria-checked=\"true\"\n      (change)=\"changeOrderType(type.value)\"\n      [value]=\"type.value\"\n      [checked]=\"type.value === (selectedOrderType$ | async)\"\n    />\n    <label\n      class=\"order-type-label form-check-label form-radio-label\"\n      for=\"orderType-{{ type.value }}\"\n    >\n      <div class=\"order-type\">\n        {{\n          'checkoutScheduledReplenishment.orderType_' + type?.value\n            | cxTranslate\n        }}\n      </div>\n    </label>\n  </div>\n  <ng-container\n    *ngIf=\"\n      scheduleReplenishmentFormData &&\n      (selectedOrderType$ | async) === orderTypes.SCHEDULE_REPLENISHMENT_ORDER\n    \"\n  >\n    <div class=\"cx-replenishment-form-data-container\">\n      <div *ngIf=\"!isMonthly\" class=\"cx-days\">\n        <span class=\"form-data-label\">{{\n          'checkoutScheduledReplenishment.every' | cxTranslate\n        }}</span>\n        <ng-container *ngIf=\"isWeekly; else isDaily\">\n          <select\n            class=\"form-control\"\n            (change)=\"changeNumberOfWeeks($event.target.value)\"\n          >\n            <option\n              *ngFor=\"let nWeeks of numberOfWeeks\"\n              [value]=\"nWeeks\"\n              [selected]=\"\n                nWeeks === scheduleReplenishmentFormData.numberOfWeeks\n              \"\n            >\n              {{ nWeeks }}\n            </option>\n          </select>\n        </ng-container>\n        <ng-template #isDaily>\n          <select\n            class=\"form-control\"\n            (change)=\"changeNumberOfDays($event.target.value)\"\n          >\n            <option\n              *ngFor=\"let nDays of numberOfDays\"\n              [value]=\"nDays\"\n              [selected]=\"nDays === scheduleReplenishmentFormData.numberOfDays\"\n            >\n              {{ nDays }}\n            </option>\n          </select>\n        </ng-template>\n      </div>\n      <div class=\"cx-month\">\n        <span *ngIf=\"isMonthly\" class=\"form-data-label\">{{\n          'checkoutScheduledReplenishment.every' | cxTranslate\n        }}</span>\n        <select\n          class=\"form-control\"\n          (change)=\"changeRecurrencePeriodType($event.target.value)\"\n        >\n          <option\n            *ngFor=\"let type of recurrencePeriodType\"\n            [value]=\"type\"\n            [selected]=\"type === scheduleReplenishmentFormData.recurrencePeriod\"\n          >\n            {{\n              'checkoutScheduledReplenishment.recurrencePeriodType_' + type\n                | cxTranslate\n            }}\n          </option>\n        </select>\n      </div>\n      <div *ngIf=\"isMonthly\" class=\"cx-dayMonth\">\n        <span class=\"form-data-label\">{{\n          'checkoutScheduledReplenishment.dayOfMonth' | cxTranslate\n        }}</span>\n        <div class=\"cx-day-of-month\">\n          <select\n            class=\"form-control\"\n            (change)=\"changeDayOfTheMonth($event.target.value)\"\n          >\n            <option\n              *ngFor=\"let nDays of numberOfDays\"\n              [value]=\"nDays\"\n              [selected]=\"nDays === scheduleReplenishmentFormData.nthDayOfMonth\"\n            >\n              {{ nDays }}\n            </option>\n          </select>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"cx-replenishment-form-data-container\">\n      <span class=\"form-data-label\">{{\n        'checkoutScheduledReplenishment.startOn' | cxTranslate\n      }}</span>\n      <div class=\"cx-replenishment-date\">\n        <input\n          type=\"date\"\n          placeholder=\"yyyy-mm-dd\"\n          [value]=\"currentDate\"\n          (change)=\"changeReplenishmentStartDate($event.target.value)\"\n        />\n      </div>\n    </div>\n\n    <div\n      *ngIf=\"isWeekly\"\n      class=\"cx-replenishment-form-data-container cx-repeat-days-container\"\n    >\n      <span class=\"cx-repeat-days form-data-label\">{{\n        'checkoutScheduledReplenishment.repeatOnDays' | cxTranslate\n      }}</span>\n      <div *ngFor=\"let day of daysOfWeek\" class=\"form-check\">\n        <label for=\"day-{{ day }}\" class=\"cx-week-day\">{{\n          day | titlecase\n        }}</label\n        ><input\n          id=\"day-{{ day }}\"\n          type=\"checkbox\"\n          class=\"form-check-input\"\n          [checked]=\"hasDaysOfWeekChecked(day)\"\n          (change)=\"changeRepeatDays(day, $event.target.checked)\"\n        />\n      </div>\n    </div>\n  </ng-container>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TitleCasePipe, name: "titlecase" }, { kind: "pipe", type: i2.KeyValuePipe, name: "keyvalue" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CheckoutScheduleReplenishmentOrderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-schedule-replenishment-order', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-order-type-card\">\n  <div class=\"cx-label-container\">\n    <h5 class=\"cx-order-replenishment-header\">\n      {{ 'checkoutScheduledReplenishment.autoReplenishOrder' | cxTranslate }}\n    </h5>\n    <cx-icon [type]=\"iconTypes.CLOCK\"></cx-icon>\n  </div>\n  <div\n    class=\"cx-order-type-container form-check\"\n    *ngFor=\"let type of orderTypes | keyvalue\"\n  >\n    <input\n      id=\"orderType-{{ type.value }}\"\n      class=\"scaled-input form-check-input\"\n      role=\"radio\"\n      type=\"radio\"\n      formControlName=\"orderType\"\n      aria-checked=\"true\"\n      (change)=\"changeOrderType(type.value)\"\n      [value]=\"type.value\"\n      [checked]=\"type.value === (selectedOrderType$ | async)\"\n    />\n    <label\n      class=\"order-type-label form-check-label form-radio-label\"\n      for=\"orderType-{{ type.value }}\"\n    >\n      <div class=\"order-type\">\n        {{\n          'checkoutScheduledReplenishment.orderType_' + type?.value\n            | cxTranslate\n        }}\n      </div>\n    </label>\n  </div>\n  <ng-container\n    *ngIf=\"\n      scheduleReplenishmentFormData &&\n      (selectedOrderType$ | async) === orderTypes.SCHEDULE_REPLENISHMENT_ORDER\n    \"\n  >\n    <div class=\"cx-replenishment-form-data-container\">\n      <div *ngIf=\"!isMonthly\" class=\"cx-days\">\n        <span class=\"form-data-label\">{{\n          'checkoutScheduledReplenishment.every' | cxTranslate\n        }}</span>\n        <ng-container *ngIf=\"isWeekly; else isDaily\">\n          <select\n            class=\"form-control\"\n            (change)=\"changeNumberOfWeeks($event.target.value)\"\n          >\n            <option\n              *ngFor=\"let nWeeks of numberOfWeeks\"\n              [value]=\"nWeeks\"\n              [selected]=\"\n                nWeeks === scheduleReplenishmentFormData.numberOfWeeks\n              \"\n            >\n              {{ nWeeks }}\n            </option>\n          </select>\n        </ng-container>\n        <ng-template #isDaily>\n          <select\n            class=\"form-control\"\n            (change)=\"changeNumberOfDays($event.target.value)\"\n          >\n            <option\n              *ngFor=\"let nDays of numberOfDays\"\n              [value]=\"nDays\"\n              [selected]=\"nDays === scheduleReplenishmentFormData.numberOfDays\"\n            >\n              {{ nDays }}\n            </option>\n          </select>\n        </ng-template>\n      </div>\n      <div class=\"cx-month\">\n        <span *ngIf=\"isMonthly\" class=\"form-data-label\">{{\n          'checkoutScheduledReplenishment.every' | cxTranslate\n        }}</span>\n        <select\n          class=\"form-control\"\n          (change)=\"changeRecurrencePeriodType($event.target.value)\"\n        >\n          <option\n            *ngFor=\"let type of recurrencePeriodType\"\n            [value]=\"type\"\n            [selected]=\"type === scheduleReplenishmentFormData.recurrencePeriod\"\n          >\n            {{\n              'checkoutScheduledReplenishment.recurrencePeriodType_' + type\n                | cxTranslate\n            }}\n          </option>\n        </select>\n      </div>\n      <div *ngIf=\"isMonthly\" class=\"cx-dayMonth\">\n        <span class=\"form-data-label\">{{\n          'checkoutScheduledReplenishment.dayOfMonth' | cxTranslate\n        }}</span>\n        <div class=\"cx-day-of-month\">\n          <select\n            class=\"form-control\"\n            (change)=\"changeDayOfTheMonth($event.target.value)\"\n          >\n            <option\n              *ngFor=\"let nDays of numberOfDays\"\n              [value]=\"nDays\"\n              [selected]=\"nDays === scheduleReplenishmentFormData.nthDayOfMonth\"\n            >\n              {{ nDays }}\n            </option>\n          </select>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"cx-replenishment-form-data-container\">\n      <span class=\"form-data-label\">{{\n        'checkoutScheduledReplenishment.startOn' | cxTranslate\n      }}</span>\n      <div class=\"cx-replenishment-date\">\n        <input\n          type=\"date\"\n          placeholder=\"yyyy-mm-dd\"\n          [value]=\"currentDate\"\n          (change)=\"changeReplenishmentStartDate($event.target.value)\"\n        />\n      </div>\n    </div>\n\n    <div\n      *ngIf=\"isWeekly\"\n      class=\"cx-replenishment-form-data-container cx-repeat-days-container\"\n    >\n      <span class=\"cx-repeat-days form-data-label\">{{\n        'checkoutScheduledReplenishment.repeatOnDays' | cxTranslate\n      }}</span>\n      <div *ngFor=\"let day of daysOfWeek\" class=\"form-check\">\n        <label for=\"day-{{ day }}\" class=\"cx-week-day\">{{\n          day | titlecase\n        }}</label\n        ><input\n          id=\"day-{{ day }}\"\n          type=\"checkbox\"\n          class=\"form-check-input\"\n          [checked]=\"hasDaysOfWeekChecked(day)\"\n          (change)=\"changeRepeatDays(day, $event.target.checked)\"\n        />\n      </div>\n    </div>\n  </ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CheckoutReplenishmentFormService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtc2NoZWR1bGUtcmVwbGVuaXNobWVudC1vcmRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvc2NoZWR1bGVkLXJlcGxlbmlzaG1lbnQvY29tcG9uZW50cy9jaGVja291dC1zY2hlZHVsZS1yZXBsZW5pc2htZW50LW9yZGVyL2NoZWNrb3V0LXNjaGVkdWxlLXJlcGxlbmlzaG1lbnQtb3JkZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L3NjaGVkdWxlZC1yZXBsZW5pc2htZW50L2NvbXBvbmVudHMvY2hlY2tvdXQtc2NoZWR1bGUtcmVwbGVuaXNobWVudC1vcmRlci9jaGVja291dC1zY2hlZHVsZS1yZXBsZW5pc2htZW50LW9yZGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsR0FHVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsVUFBVSxFQUNWLFVBQVUsRUFDVixnQkFBZ0IsR0FFakIsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxFQUFjLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQzs7Ozs7O0FBUWhELE1BQU0sT0FBTywyQ0FBMkM7SUFxQnRELFlBQ1ksZ0NBQWtFO1FBQWxFLHFDQUFnQyxHQUFoQyxnQ0FBZ0MsQ0FBa0M7UUFuQnBFLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU1QyxjQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLGVBQVUsR0FBRyxVQUFVLENBQUM7UUFDeEIsZUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMseUJBQW9CLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXZELHVCQUFrQixHQUNoQixJQUFJLENBQUMsZ0NBQWdDLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFdkQsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBQzFCLHNCQUFpQixHQUFpQixFQUFFLENBQUM7SUFRbEMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLGdDQUFnQzthQUNsQyxnQ0FBZ0MsRUFBRTthQUNsQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNsQixJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUNMLENBQUM7UUFFRixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELGVBQWUsQ0FBQyxTQUFxQjtRQUNuQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxLQUFhO1FBQzlCLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxnQ0FBZ0MsQ0FBQztZQUNyRSxHQUFHLElBQUksQ0FBQyw2QkFBNkI7WUFDckMsWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1CQUFtQixDQUFDLE1BQWM7UUFDaEMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLGdDQUFnQyxDQUFDO1lBQ3JFLEdBQUcsSUFBSSxDQUFDLDZCQUE2QjtZQUNyQyxhQUFhLEVBQUUsTUFBTTtTQUN0QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsMEJBQTBCLENBQUMsSUFBWTtRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksS0FBSyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEtBQUssZ0JBQWdCLENBQUMsT0FBTyxDQUFDO1FBRW5ELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVM7WUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUM7WUFDbEMsQ0FBQyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsZ0NBQWdDLENBQUM7WUFDckUsR0FBRyxJQUFJLENBQUMsNkJBQTZCO1lBQ3JDLGdCQUFnQixFQUFFLElBQUk7U0FDdkIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1CQUFtQixDQUFDLFVBQWtCO1FBQ3BDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxnQ0FBZ0MsQ0FBQztZQUNyRSxHQUFHLElBQUksQ0FBQyw2QkFBNkI7WUFDckMsYUFBYSxFQUFFLFVBQVU7U0FDMUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDRCQUE0QixDQUFDLElBQVk7UUFDdkMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLGdDQUFnQyxDQUFDO2dCQUNyRSxHQUFHLElBQUksQ0FBQyw2QkFBNkI7Z0JBQ3JDLHNCQUFzQixFQUFFLElBQUk7YUFDN0IsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsR0FBZSxFQUFFLFNBQWtCO1FBQ2xELElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUVyRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWpDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxnQ0FBZ0MsQ0FBQztnQkFDckUsR0FBRyxJQUFJLENBQUMsNkJBQTZCO2dCQUNyQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjthQUNuQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO1lBRXJFLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2IsT0FBTzthQUNSO1lBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUV4QyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsZ0NBQWdDLENBQUM7Z0JBQ3JFLEdBQUcsSUFBSSxDQUFDLDZCQUE2QjtnQkFDckMsVUFBVSxFQUFFLElBQUksQ0FBQyxpQkFBaUI7YUFDbkMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsR0FBZTtRQUNsQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVPLFVBQVU7UUFDaEIsSUFBSSxDQUFDLFNBQVM7WUFDWixJQUFJLENBQUMsNkJBQTZCLENBQUMsZ0JBQWdCO2dCQUNuRCxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7UUFFM0IsSUFBSSxDQUFDLFFBQVE7WUFDWCxJQUFJLENBQUMsNkJBQTZCLENBQUMsZ0JBQWdCO2dCQUNuRCxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7UUFFMUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHO1lBQ3ZCLEdBQUcsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztTQUN6RCxDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUztZQUNoQyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQztZQUNsQyxDQUFDLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXRELElBQUksQ0FBQyxXQUFXO1lBQ2QsSUFBSSxDQUFDLDZCQUE2QixDQUFDLHNCQUFzQixDQUFDO0lBQzlELENBQUM7SUFFTyx1QkFBdUIsQ0FBQyxDQUFTO1FBQ3ZDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNaLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDUCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzt3SUFuSlUsMkNBQTJDOzRIQUEzQywyQ0FBMkMsdUVDM0J4RCxrOUpBeUpBOzJGRDlIYSwyQ0FBMkM7a0JBTHZELFNBQVM7K0JBQ0UsaUNBQWlDLG1CQUUxQix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgRGF5c09mV2VlayxcbiAgT1JERVJfVFlQRSxcbiAgcmVjdXJyZW5jZVBlcmlvZCxcbiAgU2NoZWR1bGVSZXBsZW5pc2htZW50Rm9ybSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IElDT05fVFlQRSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENoZWNrb3V0UmVwbGVuaXNobWVudEZvcm1TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY2hlY2tvdXQtcmVwbGVuaXNobWVudC1mb3JtLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1zY2hlZHVsZS1yZXBsZW5pc2htZW50LW9yZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NoZWNrb3V0LXNjaGVkdWxlLXJlcGxlbmlzaG1lbnQtb3JkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRTY2hlZHVsZVJlcGxlbmlzaG1lbnRPcmRlckNvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XG57XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgaWNvblR5cGVzID0gSUNPTl9UWVBFO1xuICBvcmRlclR5cGVzID0gT1JERVJfVFlQRTtcbiAgZGF5c09mV2VlayA9IE9iamVjdC52YWx1ZXMoRGF5c09mV2Vlayk7XG4gIHJlY3VycmVuY2VQZXJpb2RUeXBlID0gT2JqZWN0LnZhbHVlcyhyZWN1cnJlbmNlUGVyaW9kKTtcblxuICBzZWxlY3RlZE9yZGVyVHlwZSQ6IE9ic2VydmFibGU8T1JERVJfVFlQRT4gPVxuICAgIHRoaXMuY2hlY2tvdXRSZXBsZW5pc2htZW50Rm9ybVNlcnZpY2UuZ2V0T3JkZXJUeXBlKCk7XG5cbiAgaXNNb250aGx5OiBCb29sZWFuID0gZmFsc2U7XG4gIGlzV2Vla2x5OiBCb29sZWFuID0gZmFsc2U7XG4gIGN1cnJlbnREYXlzT2ZXZWVrOiBEYXlzT2ZXZWVrW10gPSBbXTtcbiAgbnVtYmVyT2ZEYXlzOiBzdHJpbmdbXTtcbiAgbnVtYmVyT2ZXZWVrczogc3RyaW5nW107XG4gIGN1cnJlbnREYXRlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm1EYXRhOiBTY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjaGVja291dFJlcGxlbmlzaG1lbnRGb3JtU2VydmljZTogQ2hlY2tvdXRSZXBsZW5pc2htZW50Rm9ybVNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuY2hlY2tvdXRSZXBsZW5pc2htZW50Rm9ybVNlcnZpY2VcbiAgICAgICAgLmdldFNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm1EYXRhKClcbiAgICAgICAgLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgIHRoaXMuc2NoZWR1bGVSZXBsZW5pc2htZW50Rm9ybURhdGEgPSBkYXRhO1xuICAgICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLmluaXRDb25maWcoKTtcbiAgfVxuXG4gIGNoYW5nZU9yZGVyVHlwZShvcmRlclR5cGU6IE9SREVSX1RZUEUpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrb3V0UmVwbGVuaXNobWVudEZvcm1TZXJ2aWNlLnNldE9yZGVyVHlwZShvcmRlclR5cGUpO1xuICB9XG5cbiAgY2hhbmdlTnVtYmVyT2ZEYXlzKG5EYXlzOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrb3V0UmVwbGVuaXNobWVudEZvcm1TZXJ2aWNlLnNldFNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm1EYXRhKHtcbiAgICAgIC4uLnRoaXMuc2NoZWR1bGVSZXBsZW5pc2htZW50Rm9ybURhdGEsXG4gICAgICBudW1iZXJPZkRheXM6IG5EYXlzLFxuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlTnVtYmVyT2ZXZWVrcyhuV2Vla3M6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tvdXRSZXBsZW5pc2htZW50Rm9ybVNlcnZpY2Uuc2V0U2NoZWR1bGVSZXBsZW5pc2htZW50Rm9ybURhdGEoe1xuICAgICAgLi4udGhpcy5zY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtRGF0YSxcbiAgICAgIG51bWJlck9mV2Vla3M6IG5XZWVrcyxcbiAgICB9KTtcbiAgfVxuXG4gIGNoYW5nZVJlY3VycmVuY2VQZXJpb2RUeXBlKHR5cGU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuaXNXZWVrbHkgPSB0eXBlID09PSByZWN1cnJlbmNlUGVyaW9kLldFRUtMWTtcbiAgICB0aGlzLmlzTW9udGhseSA9IHR5cGUgPT09IHJlY3VycmVuY2VQZXJpb2QuTU9OVEhMWTtcblxuICAgIHRoaXMubnVtYmVyT2ZEYXlzID0gdGhpcy5pc01vbnRobHlcbiAgICAgID8gdGhpcy5jcmVhdGVOdW1iZXJTdHJpbmdBcnJheSgzMSlcbiAgICAgIDogdGhpcy5jcmVhdGVOdW1iZXJTdHJpbmdBcnJheSgzMCk7XG5cbiAgICB0aGlzLmNoZWNrb3V0UmVwbGVuaXNobWVudEZvcm1TZXJ2aWNlLnNldFNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm1EYXRhKHtcbiAgICAgIC4uLnRoaXMuc2NoZWR1bGVSZXBsZW5pc2htZW50Rm9ybURhdGEsXG4gICAgICByZWN1cnJlbmNlUGVyaW9kOiB0eXBlLFxuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlRGF5T2ZUaGVNb250aChkYXlPZk1vbnRoOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmNoZWNrb3V0UmVwbGVuaXNobWVudEZvcm1TZXJ2aWNlLnNldFNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm1EYXRhKHtcbiAgICAgIC4uLnRoaXMuc2NoZWR1bGVSZXBsZW5pc2htZW50Rm9ybURhdGEsXG4gICAgICBudGhEYXlPZk1vbnRoOiBkYXlPZk1vbnRoLFxuICAgIH0pO1xuICB9XG5cbiAgY2hhbmdlUmVwbGVuaXNobWVudFN0YXJ0RGF0ZShkYXRlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoQm9vbGVhbihkYXRlKSkge1xuICAgICAgdGhpcy5jaGVja291dFJlcGxlbmlzaG1lbnRGb3JtU2VydmljZS5zZXRTY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtRGF0YSh7XG4gICAgICAgIC4uLnRoaXMuc2NoZWR1bGVSZXBsZW5pc2htZW50Rm9ybURhdGEsXG4gICAgICAgIHJlcGxlbmlzaG1lbnRTdGFydERhdGU6IGRhdGUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VSZXBlYXREYXlzKGRheTogRGF5c09mV2VlaywgaXNDaGVja2VkOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKGlzQ2hlY2tlZCkge1xuICAgICAgdGhpcy5jdXJyZW50RGF5c09mV2VlayA9IFsuLi50aGlzLmN1cnJlbnREYXlzT2ZXZWVrXTtcblxuICAgICAgdGhpcy5jdXJyZW50RGF5c09mV2Vlay5wdXNoKGRheSk7XG5cbiAgICAgIHRoaXMuY2hlY2tvdXRSZXBsZW5pc2htZW50Rm9ybVNlcnZpY2Uuc2V0U2NoZWR1bGVSZXBsZW5pc2htZW50Rm9ybURhdGEoe1xuICAgICAgICAuLi50aGlzLnNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm1EYXRhLFxuICAgICAgICBkYXlzT2ZXZWVrOiB0aGlzLmN1cnJlbnREYXlzT2ZXZWVrLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZvdW5kRGF5ID0gdGhpcy5jdXJyZW50RGF5c09mV2Vlay5maW5kKChkYXRhKSA9PiBkYXkgPT09IGRhdGEpO1xuXG4gICAgICBpZiAoIWZvdW5kRGF5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmN1cnJlbnREYXlzT2ZXZWVrLmluZGV4T2YoZm91bmREYXkpO1xuICAgICAgdGhpcy5jdXJyZW50RGF5c09mV2Vlay5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICB0aGlzLmNoZWNrb3V0UmVwbGVuaXNobWVudEZvcm1TZXJ2aWNlLnNldFNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm1EYXRhKHtcbiAgICAgICAgLi4udGhpcy5zY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtRGF0YSxcbiAgICAgICAgZGF5c09mV2VlazogdGhpcy5jdXJyZW50RGF5c09mV2VlayxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhc0RheXNPZldlZWtDaGVja2VkKGRheTogRGF5c09mV2Vlayk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnREYXlzT2ZXZWVrLmluY2x1ZGVzKGRheSk7XG4gIH1cblxuICBwcml2YXRlIGluaXRDb25maWcoKTogdm9pZCB7XG4gICAgdGhpcy5pc01vbnRobHkgPVxuICAgICAgdGhpcy5zY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtRGF0YS5yZWN1cnJlbmNlUGVyaW9kID09PVxuICAgICAgcmVjdXJyZW5jZVBlcmlvZC5NT05USExZO1xuXG4gICAgdGhpcy5pc1dlZWtseSA9XG4gICAgICB0aGlzLnNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm1EYXRhLnJlY3VycmVuY2VQZXJpb2QgPT09XG4gICAgICByZWN1cnJlbmNlUGVyaW9kLldFRUtMWTtcblxuICAgIHRoaXMuY3VycmVudERheXNPZldlZWsgPSBbXG4gICAgICAuLi4odGhpcy5zY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtRGF0YS5kYXlzT2ZXZWVrID8/IFtdKSxcbiAgICBdO1xuXG4gICAgdGhpcy5udW1iZXJPZkRheXMgPSB0aGlzLmlzTW9udGhseVxuICAgICAgPyB0aGlzLmNyZWF0ZU51bWJlclN0cmluZ0FycmF5KDMxKVxuICAgICAgOiB0aGlzLmNyZWF0ZU51bWJlclN0cmluZ0FycmF5KDMwKTtcblxuICAgIHRoaXMubnVtYmVyT2ZXZWVrcyA9IHRoaXMuY3JlYXRlTnVtYmVyU3RyaW5nQXJyYXkoMTIpO1xuXG4gICAgdGhpcy5jdXJyZW50RGF0ZSA9XG4gICAgICB0aGlzLnNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm1EYXRhLnJlcGxlbmlzaG1lbnRTdGFydERhdGU7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU51bWJlclN0cmluZ0FycmF5KG46IG51bWJlcik6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gQXJyYXkobilcbiAgICAgIC5maWxsKDApXG4gICAgICAubWFwKChfLCB5KSA9PiAoeSArIDEpLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImN4LW9yZGVyLXR5cGUtY2FyZFwiPlxuICA8ZGl2IGNsYXNzPVwiY3gtbGFiZWwtY29udGFpbmVyXCI+XG4gICAgPGg1IGNsYXNzPVwiY3gtb3JkZXItcmVwbGVuaXNobWVudC1oZWFkZXJcIj5cbiAgICAgIHt7ICdjaGVja291dFNjaGVkdWxlZFJlcGxlbmlzaG1lbnQuYXV0b1JlcGxlbmlzaE9yZGVyJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgPC9oNT5cbiAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZXMuQ0xPQ0tcIj48L2N4LWljb24+XG4gIDwvZGl2PlxuICA8ZGl2XG4gICAgY2xhc3M9XCJjeC1vcmRlci10eXBlLWNvbnRhaW5lciBmb3JtLWNoZWNrXCJcbiAgICAqbmdGb3I9XCJsZXQgdHlwZSBvZiBvcmRlclR5cGVzIHwga2V5dmFsdWVcIlxuICA+XG4gICAgPGlucHV0XG4gICAgICBpZD1cIm9yZGVyVHlwZS17eyB0eXBlLnZhbHVlIH19XCJcbiAgICAgIGNsYXNzPVwic2NhbGVkLWlucHV0IGZvcm0tY2hlY2staW5wdXRcIlxuICAgICAgcm9sZT1cInJhZGlvXCJcbiAgICAgIHR5cGU9XCJyYWRpb1wiXG4gICAgICBmb3JtQ29udHJvbE5hbWU9XCJvcmRlclR5cGVcIlxuICAgICAgYXJpYS1jaGVja2VkPVwidHJ1ZVwiXG4gICAgICAoY2hhbmdlKT1cImNoYW5nZU9yZGVyVHlwZSh0eXBlLnZhbHVlKVwiXG4gICAgICBbdmFsdWVdPVwidHlwZS52YWx1ZVwiXG4gICAgICBbY2hlY2tlZF09XCJ0eXBlLnZhbHVlID09PSAoc2VsZWN0ZWRPcmRlclR5cGUkIHwgYXN5bmMpXCJcbiAgICAvPlxuICAgIDxsYWJlbFxuICAgICAgY2xhc3M9XCJvcmRlci10eXBlLWxhYmVsIGZvcm0tY2hlY2stbGFiZWwgZm9ybS1yYWRpby1sYWJlbFwiXG4gICAgICBmb3I9XCJvcmRlclR5cGUte3sgdHlwZS52YWx1ZSB9fVwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzcz1cIm9yZGVyLXR5cGVcIj5cbiAgICAgICAge3tcbiAgICAgICAgICAnY2hlY2tvdXRTY2hlZHVsZWRSZXBsZW5pc2htZW50Lm9yZGVyVHlwZV8nICsgdHlwZT8udmFsdWVcbiAgICAgICAgICAgIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvbGFiZWw+XG4gIDwvZGl2PlxuICA8bmctY29udGFpbmVyXG4gICAgKm5nSWY9XCJcbiAgICAgIHNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm1EYXRhICYmXG4gICAgICAoc2VsZWN0ZWRPcmRlclR5cGUkIHwgYXN5bmMpID09PSBvcmRlclR5cGVzLlNDSEVEVUxFX1JFUExFTklTSE1FTlRfT1JERVJcbiAgICBcIlxuICA+XG4gICAgPGRpdiBjbGFzcz1cImN4LXJlcGxlbmlzaG1lbnQtZm9ybS1kYXRhLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiAqbmdJZj1cIiFpc01vbnRobHlcIiBjbGFzcz1cImN4LWRheXNcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmb3JtLWRhdGEtbGFiZWxcIj57e1xuICAgICAgICAgICdjaGVja291dFNjaGVkdWxlZFJlcGxlbmlzaG1lbnQuZXZlcnknIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgfX08L3NwYW4+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1dlZWtseTsgZWxzZSBpc0RhaWx5XCI+XG4gICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgKGNoYW5nZSk9XCJjaGFuZ2VOdW1iZXJPZldlZWtzKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8b3B0aW9uXG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBuV2Vla3Mgb2YgbnVtYmVyT2ZXZWVrc1wiXG4gICAgICAgICAgICAgIFt2YWx1ZV09XCJuV2Vla3NcIlxuICAgICAgICAgICAgICBbc2VsZWN0ZWRdPVwiXG4gICAgICAgICAgICAgICAgbldlZWtzID09PSBzY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtRGF0YS5udW1iZXJPZldlZWtzXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt7IG5XZWVrcyB9fVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI2lzRGFpbHk+XG4gICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgKGNoYW5nZSk9XCJjaGFuZ2VOdW1iZXJPZkRheXMoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxvcHRpb25cbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG5EYXlzIG9mIG51bWJlck9mRGF5c1wiXG4gICAgICAgICAgICAgIFt2YWx1ZV09XCJuRGF5c1wiXG4gICAgICAgICAgICAgIFtzZWxlY3RlZF09XCJuRGF5cyA9PT0gc2NoZWR1bGVSZXBsZW5pc2htZW50Rm9ybURhdGEubnVtYmVyT2ZEYXlzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3sgbkRheXMgfX1cbiAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiY3gtbW9udGhcIj5cbiAgICAgICAgPHNwYW4gKm5nSWY9XCJpc01vbnRobHlcIiBjbGFzcz1cImZvcm0tZGF0YS1sYWJlbFwiPnt7XG4gICAgICAgICAgJ2NoZWNrb3V0U2NoZWR1bGVkUmVwbGVuaXNobWVudC5ldmVyeScgfCBjeFRyYW5zbGF0ZVxuICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAoY2hhbmdlKT1cImNoYW5nZVJlY3VycmVuY2VQZXJpb2RUeXBlKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxvcHRpb25cbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCB0eXBlIG9mIHJlY3VycmVuY2VQZXJpb2RUeXBlXCJcbiAgICAgICAgICAgIFt2YWx1ZV09XCJ0eXBlXCJcbiAgICAgICAgICAgIFtzZWxlY3RlZF09XCJ0eXBlID09PSBzY2hlZHVsZVJlcGxlbmlzaG1lbnRGb3JtRGF0YS5yZWN1cnJlbmNlUGVyaW9kXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICB7e1xuICAgICAgICAgICAgICAnY2hlY2tvdXRTY2hlZHVsZWRSZXBsZW5pc2htZW50LnJlY3VycmVuY2VQZXJpb2RUeXBlXycgKyB0eXBlXG4gICAgICAgICAgICAgICAgfCBjeFRyYW5zbGF0ZVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgKm5nSWY9XCJpc01vbnRobHlcIiBjbGFzcz1cImN4LWRheU1vbnRoXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZm9ybS1kYXRhLWxhYmVsXCI+e3tcbiAgICAgICAgICAnY2hlY2tvdXRTY2hlZHVsZWRSZXBsZW5pc2htZW50LmRheU9mTW9udGgnIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgfX08L3NwYW4+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjeC1kYXktb2YtbW9udGhcIj5cbiAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAoY2hhbmdlKT1cImNoYW5nZURheU9mVGhlTW9udGgoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxvcHRpb25cbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG5EYXlzIG9mIG51bWJlck9mRGF5c1wiXG4gICAgICAgICAgICAgIFt2YWx1ZV09XCJuRGF5c1wiXG4gICAgICAgICAgICAgIFtzZWxlY3RlZF09XCJuRGF5cyA9PT0gc2NoZWR1bGVSZXBsZW5pc2htZW50Rm9ybURhdGEubnRoRGF5T2ZNb250aFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt7IG5EYXlzIH19XG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJjeC1yZXBsZW5pc2htZW50LWZvcm0tZGF0YS1jb250YWluZXJcIj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZm9ybS1kYXRhLWxhYmVsXCI+e3tcbiAgICAgICAgJ2NoZWNrb3V0U2NoZWR1bGVkUmVwbGVuaXNobWVudC5zdGFydE9uJyB8IGN4VHJhbnNsYXRlXG4gICAgICB9fTwvc3Bhbj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjeC1yZXBsZW5pc2htZW50LWRhdGVcIj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgdHlwZT1cImRhdGVcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwieXl5eS1tbS1kZFwiXG4gICAgICAgICAgW3ZhbHVlXT1cImN1cnJlbnREYXRlXCJcbiAgICAgICAgICAoY2hhbmdlKT1cImNoYW5nZVJlcGxlbmlzaG1lbnRTdGFydERhdGUoJGV2ZW50LnRhcmdldC52YWx1ZSlcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2XG4gICAgICAqbmdJZj1cImlzV2Vla2x5XCJcbiAgICAgIGNsYXNzPVwiY3gtcmVwbGVuaXNobWVudC1mb3JtLWRhdGEtY29udGFpbmVyIGN4LXJlcGVhdC1kYXlzLWNvbnRhaW5lclwiXG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3M9XCJjeC1yZXBlYXQtZGF5cyBmb3JtLWRhdGEtbGFiZWxcIj57e1xuICAgICAgICAnY2hlY2tvdXRTY2hlZHVsZWRSZXBsZW5pc2htZW50LnJlcGVhdE9uRGF5cycgfCBjeFRyYW5zbGF0ZVxuICAgICAgfX08L3NwYW4+XG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBkYXkgb2YgZGF5c09mV2Vla1wiIGNsYXNzPVwiZm9ybS1jaGVja1wiPlxuICAgICAgICA8bGFiZWwgZm9yPVwiZGF5LXt7IGRheSB9fVwiIGNsYXNzPVwiY3gtd2Vlay1kYXlcIj57e1xuICAgICAgICAgIGRheSB8IHRpdGxlY2FzZVxuICAgICAgICB9fTwvbGFiZWxcbiAgICAgICAgPjxpbnB1dFxuICAgICAgICAgIGlkPVwiZGF5LXt7IGRheSB9fVwiXG4gICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICBjbGFzcz1cImZvcm0tY2hlY2staW5wdXRcIlxuICAgICAgICAgIFtjaGVja2VkXT1cImhhc0RheXNPZldlZWtDaGVja2VkKGRheSlcIlxuICAgICAgICAgIChjaGFuZ2UpPVwiY2hhbmdlUmVwZWF0RGF5cyhkYXksICRldmVudC50YXJnZXQuY2hlY2tlZClcIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+XG4iXX0=