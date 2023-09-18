/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component } from '@angular/core';
import { GlobalMessageType, } from '@spartacus/core';
import { ICON_TYPE } from '../../../cms-components/misc/icon/icon.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@angular/common";
import * as i3 from "../icon/icon.component";
export class GlobalMessageComponent {
    constructor(globalMessageService) {
        this.globalMessageService = globalMessageService;
        this.iconTypes = ICON_TYPE;
        this.messageType = GlobalMessageType;
    }
    ngOnInit() {
        this.messages$ = this.globalMessageService.get();
    }
    clear(type, index) {
        this.globalMessageService.remove(type, index);
    }
}
GlobalMessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: GlobalMessageComponent, deps: [{ token: i1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Component });
GlobalMessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: GlobalMessageComponent, selector: "cx-global-message", ngImport: i0, template: "<div *ngIf=\"messages$ | async as messages\">\n  <div\n    class=\"cx-visually-hidden\"\n    *ngFor=\"let assistiveMsg of messages[messageType.MSG_TYPE_ASSISTIVE]\"\n  >\n    <span>{{ assistiveMsg | cxTranslate }}</span>\n  </div>\n  <div\n    class=\"alert alert-success\"\n    *ngFor=\"\n      let confMsg of messages[messageType.MSG_TYPE_CONFIRMATION];\n      let i = index\n    \"\n  >\n    <span class=\"alert-icon\">\n      <cx-icon [type]=\"iconTypes.SUCCESS\"></cx-icon>\n    </span>\n    <span>{{ confMsg | cxTranslate }}</span>\n    <button\n      class=\"close\"\n      type=\"button\"\n      (click)=\"clear(messageType.MSG_TYPE_CONFIRMATION, i)\"\n    >\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n  <div\n    class=\"alert alert-info\"\n    *ngFor=\"let infoMsg of messages[messageType.MSG_TYPE_INFO]; let i = index\"\n  >\n    <span class=\"alert-icon\">\n      <cx-icon [type]=\"iconTypes.INFO\"></cx-icon>\n    </span>\n    <span>{{ infoMsg | cxTranslate }}</span>\n    <button\n      class=\"close\"\n      type=\"button\"\n      (click)=\"clear(messageType.MSG_TYPE_INFO, i)\"\n    >\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n  <div\n    class=\"alert alert-warning\"\n    *ngFor=\"\n      let infoMsg of messages[messageType.MSG_TYPE_WARNING];\n      let i = index\n    \"\n  >\n    <span class=\"alert-icon\">\n      <cx-icon [type]=\"iconTypes.WARNING\"></cx-icon>\n    </span>\n    <span>{{ infoMsg | cxTranslate }}</span>\n    <button\n      class=\"close\"\n      type=\"button\"\n      (click)=\"clear(messageType.MSG_TYPE_WARNING, i)\"\n    >\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n  <div\n    class=\"alert alert-danger\"\n    *ngFor=\"let errorMsg of messages[messageType.MSG_TYPE_ERROR]; let i = index\"\n  >\n    <span class=\"alert-icon\">\n      <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n    </span>\n    <span>{{ errorMsg | cxTranslate }}</span>\n    <button\n      class=\"close\"\n      type=\"button\"\n      (click)=\"clear(messageType.MSG_TYPE_ERROR, i)\"\n    >\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: GlobalMessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-global-message', template: "<div *ngIf=\"messages$ | async as messages\">\n  <div\n    class=\"cx-visually-hidden\"\n    *ngFor=\"let assistiveMsg of messages[messageType.MSG_TYPE_ASSISTIVE]\"\n  >\n    <span>{{ assistiveMsg | cxTranslate }}</span>\n  </div>\n  <div\n    class=\"alert alert-success\"\n    *ngFor=\"\n      let confMsg of messages[messageType.MSG_TYPE_CONFIRMATION];\n      let i = index\n    \"\n  >\n    <span class=\"alert-icon\">\n      <cx-icon [type]=\"iconTypes.SUCCESS\"></cx-icon>\n    </span>\n    <span>{{ confMsg | cxTranslate }}</span>\n    <button\n      class=\"close\"\n      type=\"button\"\n      (click)=\"clear(messageType.MSG_TYPE_CONFIRMATION, i)\"\n    >\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n  <div\n    class=\"alert alert-info\"\n    *ngFor=\"let infoMsg of messages[messageType.MSG_TYPE_INFO]; let i = index\"\n  >\n    <span class=\"alert-icon\">\n      <cx-icon [type]=\"iconTypes.INFO\"></cx-icon>\n    </span>\n    <span>{{ infoMsg | cxTranslate }}</span>\n    <button\n      class=\"close\"\n      type=\"button\"\n      (click)=\"clear(messageType.MSG_TYPE_INFO, i)\"\n    >\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n  <div\n    class=\"alert alert-warning\"\n    *ngFor=\"\n      let infoMsg of messages[messageType.MSG_TYPE_WARNING];\n      let i = index\n    \"\n  >\n    <span class=\"alert-icon\">\n      <cx-icon [type]=\"iconTypes.WARNING\"></cx-icon>\n    </span>\n    <span>{{ infoMsg | cxTranslate }}</span>\n    <button\n      class=\"close\"\n      type=\"button\"\n      (click)=\"clear(messageType.MSG_TYPE_WARNING, i)\"\n    >\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n  <div\n    class=\"alert alert-danger\"\n    *ngFor=\"let errorMsg of messages[messageType.MSG_TYPE_ERROR]; let i = index\"\n  >\n    <span class=\"alert-icon\">\n      <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n    </span>\n    <span>{{ errorMsg | cxTranslate }}</span>\n    <button\n      class=\"close\"\n      type=\"button\"\n      (click)=\"clear(messageType.MSG_TYPE_ERROR, i)\"\n    >\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </button>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLW1lc3NhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9taXNjL2dsb2JhbC1tZXNzYWdlL2dsb2JhbC1tZXNzYWdlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbWlzYy9nbG9iYWwtbWVzc2FnZS9nbG9iYWwtbWVzc2FnZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBR0wsaUJBQWlCLEdBQ2xCLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOzs7OztBQU16RSxNQUFNLE9BQU8sc0JBQXNCO0lBTWpDLFlBQXNCLG9CQUEwQztRQUExQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBTGhFLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFHdEIsZ0JBQVcsR0FBNkIsaUJBQWlCLENBQUM7SUFFUyxDQUFDO0lBRXBFLFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQXVCLEVBQUUsS0FBYTtRQUMxQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDOzttSEFkVSxzQkFBc0I7dUdBQXRCLHNCQUFzQix5RENuQm5DLHFxRUE4RUE7MkZEM0RhLHNCQUFzQjtrQkFKbEMsU0FBUzsrQkFDRSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgR2xvYmFsTWVzc2FnZUVudGl0aWVzLFxuICBHbG9iYWxNZXNzYWdlU2VydmljZSxcbiAgR2xvYmFsTWVzc2FnZVR5cGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBJQ09OX1RZUEUgfSBmcm9tICcuLi8uLi8uLi9jbXMtY29tcG9uZW50cy9taXNjL2ljb24vaWNvbi5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LWdsb2JhbC1tZXNzYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2dsb2JhbC1tZXNzYWdlLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgR2xvYmFsTWVzc2FnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGljb25UeXBlcyA9IElDT05fVFlQRTtcblxuICBtZXNzYWdlcyQ6IE9ic2VydmFibGU8R2xvYmFsTWVzc2FnZUVudGl0aWVzPjtcbiAgbWVzc2FnZVR5cGU6IHR5cGVvZiBHbG9iYWxNZXNzYWdlVHlwZSA9IEdsb2JhbE1lc3NhZ2VUeXBlO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UpIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5tZXNzYWdlcyQgPSB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmdldCgpO1xuICB9XG5cbiAgY2xlYXIodHlwZTogR2xvYmFsTWVzc2FnZVR5cGUsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLnJlbW92ZSh0eXBlLCBpbmRleCk7XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJtZXNzYWdlcyQgfCBhc3luYyBhcyBtZXNzYWdlc1wiPlxuICA8ZGl2XG4gICAgY2xhc3M9XCJjeC12aXN1YWxseS1oaWRkZW5cIlxuICAgICpuZ0Zvcj1cImxldCBhc3Npc3RpdmVNc2cgb2YgbWVzc2FnZXNbbWVzc2FnZVR5cGUuTVNHX1RZUEVfQVNTSVNUSVZFXVwiXG4gID5cbiAgICA8c3Bhbj57eyBhc3Npc3RpdmVNc2cgfCBjeFRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgPC9kaXY+XG4gIDxkaXZcbiAgICBjbGFzcz1cImFsZXJ0IGFsZXJ0LXN1Y2Nlc3NcIlxuICAgICpuZ0Zvcj1cIlxuICAgICAgbGV0IGNvbmZNc2cgb2YgbWVzc2FnZXNbbWVzc2FnZVR5cGUuTVNHX1RZUEVfQ09ORklSTUFUSU9OXTtcbiAgICAgIGxldCBpID0gaW5kZXhcbiAgICBcIlxuICA+XG4gICAgPHNwYW4gY2xhc3M9XCJhbGVydC1pY29uXCI+XG4gICAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZXMuU1VDQ0VTU1wiPjwvY3gtaWNvbj5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW4+e3sgY29uZk1zZyB8IGN4VHJhbnNsYXRlIH19PC9zcGFuPlxuICAgIDxidXR0b25cbiAgICAgIGNsYXNzPVwiY2xvc2VcIlxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAoY2xpY2spPVwiY2xlYXIobWVzc2FnZVR5cGUuTVNHX1RZUEVfQ09ORklSTUFUSU9OLCBpKVwiXG4gICAgPlxuICAgICAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGVzLkNMT1NFXCI+PC9jeC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgPGRpdlxuICAgIGNsYXNzPVwiYWxlcnQgYWxlcnQtaW5mb1wiXG4gICAgKm5nRm9yPVwibGV0IGluZm9Nc2cgb2YgbWVzc2FnZXNbbWVzc2FnZVR5cGUuTVNHX1RZUEVfSU5GT107IGxldCBpID0gaW5kZXhcIlxuICA+XG4gICAgPHNwYW4gY2xhc3M9XCJhbGVydC1pY29uXCI+XG4gICAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZXMuSU5GT1wiPjwvY3gtaWNvbj5cbiAgICA8L3NwYW4+XG4gICAgPHNwYW4+e3sgaW5mb01zZyB8IGN4VHJhbnNsYXRlIH19PC9zcGFuPlxuICAgIDxidXR0b25cbiAgICAgIGNsYXNzPVwiY2xvc2VcIlxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAoY2xpY2spPVwiY2xlYXIobWVzc2FnZVR5cGUuTVNHX1RZUEVfSU5GTywgaSlcIlxuICAgID5cbiAgICAgIDxjeC1pY29uIFt0eXBlXT1cImljb25UeXBlcy5DTE9TRVwiPjwvY3gtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG4gIDxkaXZcbiAgICBjbGFzcz1cImFsZXJ0IGFsZXJ0LXdhcm5pbmdcIlxuICAgICpuZ0Zvcj1cIlxuICAgICAgbGV0IGluZm9Nc2cgb2YgbWVzc2FnZXNbbWVzc2FnZVR5cGUuTVNHX1RZUEVfV0FSTklOR107XG4gICAgICBsZXQgaSA9IGluZGV4XG4gICAgXCJcbiAgPlxuICAgIDxzcGFuIGNsYXNzPVwiYWxlcnQtaWNvblwiPlxuICAgICAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGVzLldBUk5JTkdcIj48L2N4LWljb24+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuPnt7IGluZm9Nc2cgfCBjeFRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICA8YnV0dG9uXG4gICAgICBjbGFzcz1cImNsb3NlXCJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgKGNsaWNrKT1cImNsZWFyKG1lc3NhZ2VUeXBlLk1TR19UWVBFX1dBUk5JTkcsIGkpXCJcbiAgICA+XG4gICAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZXMuQ0xPU0VcIj48L2N4LWljb24+XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuICA8ZGl2XG4gICAgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIlxuICAgICpuZ0Zvcj1cImxldCBlcnJvck1zZyBvZiBtZXNzYWdlc1ttZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUl07IGxldCBpID0gaW5kZXhcIlxuICA+XG4gICAgPHNwYW4gY2xhc3M9XCJhbGVydC1pY29uXCI+XG4gICAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZXMuRVJST1JcIj48L2N4LWljb24+XG4gICAgPC9zcGFuPlxuICAgIDxzcGFuPnt7IGVycm9yTXNnIHwgY3hUcmFuc2xhdGUgfX08L3NwYW4+XG4gICAgPGJ1dHRvblxuICAgICAgY2xhc3M9XCJjbG9zZVwiXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIChjbGljayk9XCJjbGVhcihtZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUiwgaSlcIlxuICAgID5cbiAgICAgIDxjeC1pY29uIFt0eXBlXT1cImljb25UeXBlcy5DTE9TRVwiPjwvY3gtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==