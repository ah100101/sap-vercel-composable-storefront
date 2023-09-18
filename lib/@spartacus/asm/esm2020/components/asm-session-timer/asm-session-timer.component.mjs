/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/asm/root";
import * as i2 from "../services/asm-component.service";
import * as i3 from "@spartacus/core";
import * as i4 from "./format-timer.pipe";
export class AsmSessionTimerComponent {
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
        if (this.config.asm?.agentSessionTimer?.startingDelayInSeconds === undefined) {
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
AsmSessionTimerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmSessionTimerComponent, deps: [{ token: i1.AsmConfig }, { token: i2.AsmComponentService }, { token: i3.RoutingService }, { token: i0.ChangeDetectorRef }, { token: i3.UserIdService }], target: i0.ɵɵFactoryTarget.Component });
AsmSessionTimerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: AsmSessionTimerComponent, selector: "cx-asm-session-timer", ngImport: i0, template: "<span class=\"label\">{{ 'asm.agentSessionTimer.label' | cxTranslate }}:</span>\n<span class=\"time\"\n  >{{ timeLeft | formatTimer }}\n  {{ 'asm.agentSessionTimer.minutes' | cxTranslate }}</span\n>\n<button\n  class=\"reset\"\n  title=\"{{ 'asm.agentSessionTimer.reset' | cxTranslate }}\"\n  (click)=\"resetTimer()\"\n></button>\n", dependencies: [{ kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i4.FormatTimerPipe, name: "formatTimer" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmSessionTimerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-session-timer', template: "<span class=\"label\">{{ 'asm.agentSessionTimer.label' | cxTranslate }}:</span>\n<span class=\"time\"\n  >{{ timeLeft | formatTimer }}\n  {{ 'asm.agentSessionTimer.minutes' | cxTranslate }}</span\n>\n<button\n  class=\"reset\"\n  title=\"{{ 'asm.agentSessionTimer.reset' | cxTranslate }}\"\n  (click)=\"resetTimer()\"\n></button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AsmConfig }, { type: i2.AsmComponentService }, { type: i3.RoutingService }, { type: i0.ChangeDetectorRef }, { type: i3.UserIdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLXNlc3Npb24tdGltZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jb21wb25lbnRzL2FzbS1zZXNzaW9uLXRpbWVyL2FzbS1zZXNzaW9uLXRpbWVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29tcG9uZW50cy9hc20tc2Vzc2lvbi10aW1lci9hc20tc2Vzc2lvbi10aW1lci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFxQixTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBR2hGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDcEMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQU90RCxNQUFNLE9BQU8sd0JBQXdCO0lBTW5DLFlBQ1ksTUFBaUIsRUFDakIsbUJBQXdDLEVBQ3hDLGNBQThCLEVBQzlCLGlCQUFvQyxFQUNwQyxhQUE0QjtRQUo1QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFWOUIsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5DLDJCQUFzQixHQUFHLEtBQUssQ0FBQztJQVN0QyxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQy9CLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNqQjtpQkFBTTtnQkFDTCxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsbUJBQW1CLENBQUMscUNBQXFDLEVBQUUsQ0FBQzthQUNsRTtZQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFVCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVTLGVBQWU7UUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDNUQsSUFBSSxZQUFZLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNuQjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRVMsNEJBQTRCO1FBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNwQixJQUFJLENBQUMsYUFBYTthQUNmLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2FBQzVCLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FDdEMsQ0FBQztJQUNKLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztJQUVTLDJCQUEyQjtRQUNuQyxJQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFLHNCQUFzQixLQUFLLFNBQVMsRUFDeEU7WUFDQSxPQUFPLEdBQUcsQ0FBQztTQUNaO1FBQ0QsSUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0I7WUFDeEQsSUFBSSxDQUFDLHNCQUFzQixFQUMzQjtZQUNBLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDO1NBQ3BDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDO1NBQ2pFO0lBQ0gsQ0FBQztJQUNELFdBQVc7UUFDVCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQzs7cUhBM0VVLHdCQUF3Qjt5R0FBeEIsd0JBQXdCLDREQ2pCckMsNlVBVUE7MkZET2Esd0JBQXdCO2tCQUpwQyxTQUFTOytCQUNFLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBc21Db25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2FzbS9yb290JztcbmltcG9ydCB7IFJvdXRpbmdTZXJ2aWNlLCBVc2VySWRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBc21Db21wb25lbnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvYXNtLWNvbXBvbmVudC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtYXNtLXNlc3Npb24tdGltZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vYXNtLXNlc3Npb24tdGltZXIuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBBc21TZXNzaW9uVGltZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb25zID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBwcm90ZWN0ZWQgaW50ZXJ2YWw6IGFueTtcbiAgcHJvdGVjdGVkIG1heFN0YXJ0RGVsYXlJblNlY29uZHMgPSA2MDAwMDtcbiAgdGltZUxlZnQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlnOiBBc21Db25maWcsXG4gICAgcHJvdGVjdGVkIGFzbUNvbXBvbmVudFNlcnZpY2U6IEFzbUNvbXBvbmVudFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmdTZXJ2aWNlOiBSb3V0aW5nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnRpbWVMZWZ0ID0gdGhpcy5nZXRUaW1lclN0YXJ0RGVsYXlJblNlY29uZHMoKTtcbiAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMudGltZUxlZnQgPiAwKSB7XG4gICAgICAgIHRoaXMudGltZUxlZnQtLTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuYXNtQ29tcG9uZW50U2VydmljZS5sb2dvdXRDdXN0b21lclN1cHBvcnRBZ2VudEFuZEN1c3RvbWVyKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0sIDEwMDApO1xuXG4gICAgdGhpcy5yZXNldE9uTmF2aWdhdGUoKTtcbiAgICB0aGlzLnJlc2V0T25DdXN0b21lclNlc3Npb25DaGFuZ2UoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZXNldE9uTmF2aWdhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMucm91dGluZ1NlcnZpY2UuaXNOYXZpZ2F0aW5nKCkuc3Vic2NyaWJlKChpc05hdmlnYXRpbmcpID0+IHtcbiAgICAgICAgaWYgKGlzTmF2aWdhdGluZykge1xuICAgICAgICAgIHRoaXMucmVzZXRUaW1lcigpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVzZXRPbkN1c3RvbWVyU2Vzc2lvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy51c2VySWRTZXJ2aWNlXG4gICAgICAgIC5nZXRVc2VySWQoKVxuICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMucmVzZXRUaW1lcigpKVxuICAgICk7XG4gIH1cblxuICByZXNldFRpbWVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnRpbWVMZWZ0ID4gMCkge1xuICAgICAgdGhpcy50aW1lTGVmdCA9IHRoaXMuZ2V0VGltZXJTdGFydERlbGF5SW5TZWNvbmRzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldFRpbWVyU3RhcnREZWxheUluU2Vjb25kcygpOiBudW1iZXIge1xuICAgIGlmIChcbiAgICAgIHRoaXMuY29uZmlnLmFzbT8uYWdlbnRTZXNzaW9uVGltZXI/LnN0YXJ0aW5nRGVsYXlJblNlY29uZHMgPT09IHVuZGVmaW5lZFxuICAgICkge1xuICAgICAgcmV0dXJuIDYwMDtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5jb25maWcuYXNtLmFnZW50U2Vzc2lvblRpbWVyLnN0YXJ0aW5nRGVsYXlJblNlY29uZHMgPlxuICAgICAgdGhpcy5tYXhTdGFydERlbGF5SW5TZWNvbmRzXG4gICAgKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXhTdGFydERlbGF5SW5TZWNvbmRzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuYXNtLmFnZW50U2Vzc2lvblRpbWVyLnN0YXJ0aW5nRGVsYXlJblNlY29uZHM7XG4gICAgfVxuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLmludGVydmFsKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xuICAgIH1cbiAgfVxufVxuIiwiPHNwYW4gY2xhc3M9XCJsYWJlbFwiPnt7ICdhc20uYWdlbnRTZXNzaW9uVGltZXIubGFiZWwnIHwgY3hUcmFuc2xhdGUgfX06PC9zcGFuPlxuPHNwYW4gY2xhc3M9XCJ0aW1lXCJcbiAgPnt7IHRpbWVMZWZ0IHwgZm9ybWF0VGltZXIgfX1cbiAge3sgJ2FzbS5hZ2VudFNlc3Npb25UaW1lci5taW51dGVzJyB8IGN4VHJhbnNsYXRlIH19PC9zcGFuXG4+XG48YnV0dG9uXG4gIGNsYXNzPVwicmVzZXRcIlxuICB0aXRsZT1cInt7ICdhc20uYWdlbnRTZXNzaW9uVGltZXIucmVzZXQnIHwgY3hUcmFuc2xhdGUgfX1cIlxuICAoY2xpY2spPVwicmVzZXRUaW1lcigpXCJcbj48L2J1dHRvbj5cbiJdfQ==