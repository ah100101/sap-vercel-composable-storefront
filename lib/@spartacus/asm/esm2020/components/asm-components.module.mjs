/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { FormErrorsModule, IconModule, KeyboardFocusModule, NgSelectA11yModule, PasswordVisibilityToggleModule, SortingModule, SpinnerModule, } from '@spartacus/storefront';
import { AsmBindCartDialogComponent } from './asm-bind-cart-dialog/asm-bind-cart-dialog.component';
import { AsmBindCartComponent } from './asm-bind-cart/asm-bind-cart.component';
import { AsmMainUiComponent } from './asm-main-ui/asm-main-ui.component';
import { AsmSessionTimerComponent } from './asm-session-timer/asm-session-timer.component';
import { FormatTimerPipe } from './asm-session-timer/format-timer.pipe';
import { AsmToggleUiComponent } from './asm-toggle-ui/asm-toggle-ui.component';
import { CSAgentLoginFormComponent } from './csagent-login-form/csagent-login-form.component';
import { CustomerEmulationComponent } from './customer-emulation/customer-emulation.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { defaultCustomerListLayoutConfig } from './customer-list/default-customer-list-layout.config';
import { CustomerSelectionComponent } from './customer-selection/customer-selection.component';
import { defaultAsmLayoutConfig } from './default-asm-layout.config';
import { defaultBindCartLayoutConfig } from './default-bind-cart-layout.config';
import { DotSpinnerComponent } from './dot-spinner/dot-spinner.component';
import * as i0 from "@angular/core";
export class AsmComponentsModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWNvbXBvbmVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jb21wb25lbnRzL2FzbS1jb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkUsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsbUJBQW1CLEVBQ25CLGtCQUFrQixFQUNsQiw4QkFBOEIsRUFDOUIsYUFBYSxFQUNiLGFBQWEsR0FDZCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQ25HLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMvRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUM5RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUMvRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUN0RyxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUMvRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQzs7QUFpRDFFLE1BQU0sT0FBTyxtQkFBbUI7O2dIQUFuQixtQkFBbUI7aUhBQW5CLG1CQUFtQixpQkEvQjVCLDBCQUEwQjtRQUMxQixrQkFBa0I7UUFDbEIseUJBQXlCO1FBQ3pCLHFCQUFxQjtRQUNyQiwwQkFBMEI7UUFDMUIsd0JBQXdCO1FBQ3hCLGVBQWU7UUFDZiwwQkFBMEI7UUFDMUIsb0JBQW9CO1FBQ3BCLG9CQUFvQjtRQUNwQixtQkFBbUIsYUF4Qm5CLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsVUFBVTtRQUNWLGdCQUFnQjtRQUNoQixVQUFVO1FBQ1YsY0FBYztRQUNkLFdBQVc7UUFDWCxhQUFhO1FBQ2IsOEJBQThCO1FBQzlCLG1CQUFtQjtRQUNuQixrQkFBa0I7UUFDbEIsYUFBYSxhQWdCYiwwQkFBMEI7UUFDMUIsa0JBQWtCO1FBQ2xCLHlCQUF5QjtRQUN6QixxQkFBcUI7UUFDckIsMEJBQTBCO1FBQzFCLHdCQUF3QjtRQUN4QixlQUFlO1FBQ2YsMEJBQTBCO1FBQzFCLG9CQUFvQjtRQUNwQixvQkFBb0I7UUFDcEIsbUJBQW1CO2lIQVFWLG1CQUFtQixhQU5uQjtRQUNULG9CQUFvQixDQUFDLHNCQUFzQixDQUFDO1FBQzVDLG9CQUFvQixDQUFDLDJCQUEyQixDQUFDO1FBQ2pELG9CQUFvQixDQUFDLCtCQUErQixDQUFDO0tBQ3RELFlBM0NDLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsVUFBVTtRQUNWLGdCQUFnQjtRQUNoQixVQUFVO1FBQ1YsY0FBYztRQUNkLFdBQVc7UUFDWCxhQUFhO1FBQ2IsOEJBQThCO1FBQzlCLG1CQUFtQjtRQUNuQixrQkFBa0I7UUFDbEIsYUFBYTsyRkFrQ0osbUJBQW1CO2tCQS9DL0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixtQkFBbUI7d0JBQ25CLFVBQVU7d0JBQ1YsZ0JBQWdCO3dCQUNoQixVQUFVO3dCQUNWLGNBQWM7d0JBQ2QsV0FBVzt3QkFDWCxhQUFhO3dCQUNiLDhCQUE4Qjt3QkFDOUIsbUJBQW1CO3dCQUNuQixrQkFBa0I7d0JBQ2xCLGFBQWE7cUJBQ2Q7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLDBCQUEwQjt3QkFDMUIsa0JBQWtCO3dCQUNsQix5QkFBeUI7d0JBQ3pCLHFCQUFxQjt3QkFDckIsMEJBQTBCO3dCQUMxQix3QkFBd0I7d0JBQ3hCLGVBQWU7d0JBQ2YsMEJBQTBCO3dCQUMxQixvQkFBb0I7d0JBQ3BCLG9CQUFvQjt3QkFDcEIsbUJBQW1CO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsMEJBQTBCO3dCQUMxQixrQkFBa0I7d0JBQ2xCLHlCQUF5Qjt3QkFDekIscUJBQXFCO3dCQUNyQiwwQkFBMEI7d0JBQzFCLHdCQUF3Qjt3QkFDeEIsZUFBZTt3QkFDZiwwQkFBMEI7d0JBQzFCLG9CQUFvQjt3QkFDcEIsb0JBQW9CO3dCQUNwQixtQkFBbUI7cUJBQ3BCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQyxzQkFBc0IsQ0FBQzt3QkFDNUMsb0JBQW9CLENBQUMsMkJBQTJCLENBQUM7d0JBQ2pELG9CQUFvQixDQUFDLCtCQUErQixDQUFDO3FCQUN0RDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBOZ1NlbGVjdE1vZHVsZSB9IGZyb20gJ0BuZy1zZWxlY3Qvbmctc2VsZWN0JztcbmltcG9ydCB7IEkxOG5Nb2R1bGUsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEZvcm1FcnJvcnNNb2R1bGUsXG4gIEljb25Nb2R1bGUsXG4gIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gIE5nU2VsZWN0QTExeU1vZHVsZSxcbiAgUGFzc3dvcmRWaXNpYmlsaXR5VG9nZ2xlTW9kdWxlLFxuICBTb3J0aW5nTW9kdWxlLFxuICBTcGlubmVyTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQXNtQmluZENhcnREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2FzbS1iaW5kLWNhcnQtZGlhbG9nL2FzbS1iaW5kLWNhcnQtZGlhbG9nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc21CaW5kQ2FydENvbXBvbmVudCB9IGZyb20gJy4vYXNtLWJpbmQtY2FydC9hc20tYmluZC1jYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc21NYWluVWlDb21wb25lbnQgfSBmcm9tICcuL2FzbS1tYWluLXVpL2FzbS1tYWluLXVpLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBc21TZXNzaW9uVGltZXJDb21wb25lbnQgfSBmcm9tICcuL2FzbS1zZXNzaW9uLXRpbWVyL2FzbS1zZXNzaW9uLXRpbWVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3JtYXRUaW1lclBpcGUgfSBmcm9tICcuL2FzbS1zZXNzaW9uLXRpbWVyL2Zvcm1hdC10aW1lci5waXBlJztcbmltcG9ydCB7IEFzbVRvZ2dsZVVpQ29tcG9uZW50IH0gZnJvbSAnLi9hc20tdG9nZ2xlLXVpL2FzbS10b2dnbGUtdWkuY29tcG9uZW50JztcbmltcG9ydCB7IENTQWdlbnRMb2dpbkZvcm1Db21wb25lbnQgfSBmcm9tICcuL2NzYWdlbnQtbG9naW4tZm9ybS9jc2FnZW50LWxvZ2luLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IEN1c3RvbWVyRW11bGF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9jdXN0b21lci1lbXVsYXRpb24vY3VzdG9tZXItZW11bGF0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDdXN0b21lckxpc3RDb21wb25lbnQgfSBmcm9tICcuL2N1c3RvbWVyLWxpc3QvY3VzdG9tZXItbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdEN1c3RvbWVyTGlzdExheW91dENvbmZpZyB9IGZyb20gJy4vY3VzdG9tZXItbGlzdC9kZWZhdWx0LWN1c3RvbWVyLWxpc3QtbGF5b3V0LmNvbmZpZyc7XG5pbXBvcnQgeyBDdXN0b21lclNlbGVjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY3VzdG9tZXItc2VsZWN0aW9uL2N1c3RvbWVyLXNlbGVjdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVmYXVsdEFzbUxheW91dENvbmZpZyB9IGZyb20gJy4vZGVmYXVsdC1hc20tbGF5b3V0LmNvbmZpZyc7XG5pbXBvcnQgeyBkZWZhdWx0QmluZENhcnRMYXlvdXRDb25maWcgfSBmcm9tICcuL2RlZmF1bHQtYmluZC1jYXJ0LWxheW91dC5jb25maWcnO1xuaW1wb3J0IHsgRG90U3Bpbm5lckNvbXBvbmVudCB9IGZyb20gJy4vZG90LXNwaW5uZXIvZG90LXNwaW5uZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgRm9ybUVycm9yc01vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIE5nU2VsZWN0TW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgUGFzc3dvcmRWaXNpYmlsaXR5VG9nZ2xlTW9kdWxlLFxuICAgIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gICAgTmdTZWxlY3RBMTF5TW9kdWxlLFxuICAgIFNvcnRpbmdNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFzbUJpbmRDYXJ0RGlhbG9nQ29tcG9uZW50LFxuICAgIEFzbU1haW5VaUNvbXBvbmVudCxcbiAgICBDU0FnZW50TG9naW5Gb3JtQ29tcG9uZW50LFxuICAgIEN1c3RvbWVyTGlzdENvbXBvbmVudCxcbiAgICBDdXN0b21lclNlbGVjdGlvbkNvbXBvbmVudCxcbiAgICBBc21TZXNzaW9uVGltZXJDb21wb25lbnQsXG4gICAgRm9ybWF0VGltZXJQaXBlLFxuICAgIEN1c3RvbWVyRW11bGF0aW9uQ29tcG9uZW50LFxuICAgIEFzbVRvZ2dsZVVpQ29tcG9uZW50LFxuICAgIEFzbUJpbmRDYXJ0Q29tcG9uZW50LFxuICAgIERvdFNwaW5uZXJDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBc21CaW5kQ2FydERpYWxvZ0NvbXBvbmVudCxcbiAgICBBc21NYWluVWlDb21wb25lbnQsXG4gICAgQ1NBZ2VudExvZ2luRm9ybUNvbXBvbmVudCxcbiAgICBDdXN0b21lckxpc3RDb21wb25lbnQsXG4gICAgQ3VzdG9tZXJTZWxlY3Rpb25Db21wb25lbnQsXG4gICAgQXNtU2Vzc2lvblRpbWVyQ29tcG9uZW50LFxuICAgIEZvcm1hdFRpbWVyUGlwZSxcbiAgICBDdXN0b21lckVtdWxhdGlvbkNvbXBvbmVudCxcbiAgICBBc21Ub2dnbGVVaUNvbXBvbmVudCxcbiAgICBBc21CaW5kQ2FydENvbXBvbmVudCxcbiAgICBEb3RTcGlubmVyQ29tcG9uZW50LFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0QXNtTGF5b3V0Q29uZmlnKSxcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0QmluZENhcnRMYXlvdXRDb25maWcpLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRDdXN0b21lckxpc3RMYXlvdXRDb25maWcpLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBc21Db21wb25lbnRzTW9kdWxlIHt9XG4iXX0=