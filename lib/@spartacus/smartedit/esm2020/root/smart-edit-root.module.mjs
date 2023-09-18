/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { provideDefaultConfig, SMART_EDIT_DUMMY_COMPONENT_TYPE, } from '@spartacus/core';
import { defaultSmartEditConfig } from './config/default-smart-edit-config';
import { SMART_EDIT_FEATURE } from './feature-name';
import { interceptors } from './http-interceptors/index';
import { SmartEditLauncherService } from './services/smart-edit-launcher.service';
import * as i0 from "@angular/core";
export function smartEditFactory(smartEditLauncherService) {
    const isReady = () => {
        smartEditLauncherService.load();
    };
    return isReady;
}
export class SmartEditRootModule {
}
SmartEditRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SmartEditRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SmartEditRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: SmartEditRootModule });
SmartEditRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SmartEditRootModule, providers: [
        ...interceptors,
        provideDefaultConfig(defaultSmartEditConfig),
        {
            provide: APP_INITIALIZER,
            useFactory: smartEditFactory,
            deps: [SmartEditLauncherService],
            multi: true,
        },
        provideDefaultConfig({
            featureModules: {
                [SMART_EDIT_FEATURE]: {
                    cmsComponents: [SMART_EDIT_DUMMY_COMPONENT_TYPE],
                },
            },
        }),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SmartEditRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        ...interceptors,
                        provideDefaultConfig(defaultSmartEditConfig),
                        {
                            provide: APP_INITIALIZER,
                            useFactory: smartEditFactory,
                            deps: [SmartEditLauncherService],
                            multi: true,
                        },
                        provideDefaultConfig({
                            featureModules: {
                                [SMART_EDIT_FEATURE]: {
                                    cmsComponents: [SMART_EDIT_DUMMY_COMPONENT_TYPE],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtZWRpdC1yb290Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9zbWFydGVkaXQvcm9vdC9zbWFydC1lZGl0LXJvb3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRCxPQUFPLEVBQ0wsb0JBQW9CLEVBQ3BCLCtCQUErQixHQUNoQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7QUFFbEYsTUFBTSxVQUFVLGdCQUFnQixDQUM5Qix3QkFBa0Q7SUFFbEQsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFO1FBQ25CLHdCQUF3QixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2xDLENBQUMsQ0FBQztJQUNGLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFxQkQsTUFBTSxPQUFPLG1CQUFtQjs7Z0hBQW5CLG1CQUFtQjtpSEFBbkIsbUJBQW1CO2lIQUFuQixtQkFBbUIsYUFsQm5CO1FBQ1QsR0FBRyxZQUFZO1FBQ2Ysb0JBQW9CLENBQUMsc0JBQXNCLENBQUM7UUFDNUM7WUFDRSxPQUFPLEVBQUUsZUFBZTtZQUN4QixVQUFVLEVBQUUsZ0JBQWdCO1lBQzVCLElBQUksRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ2hDLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRCxvQkFBb0IsQ0FBQztZQUNuQixjQUFjLEVBQUU7Z0JBQ2QsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO29CQUNwQixhQUFhLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztpQkFDakQ7YUFDRjtTQUNGLENBQUM7S0FDSDsyRkFFVSxtQkFBbUI7a0JBbkIvQixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVCxHQUFHLFlBQVk7d0JBQ2Ysb0JBQW9CLENBQUMsc0JBQXNCLENBQUM7d0JBQzVDOzRCQUNFLE9BQU8sRUFBRSxlQUFlOzRCQUN4QixVQUFVLEVBQUUsZ0JBQWdCOzRCQUM1QixJQUFJLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQzs0QkFDaEMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7d0JBQ0Qsb0JBQW9CLENBQUM7NEJBQ25CLGNBQWMsRUFBRTtnQ0FDZCxDQUFDLGtCQUFrQixDQUFDLEVBQUU7b0NBQ3BCLGFBQWEsRUFBRSxDQUFDLCtCQUErQixDQUFDO2lDQUNqRDs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQVBQX0lOSVRJQUxJWkVSLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFNNQVJUX0VESVRfRFVNTVlfQ09NUE9ORU5UX1RZUEUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBkZWZhdWx0U21hcnRFZGl0Q29uZmlnIH0gZnJvbSAnLi9jb25maWcvZGVmYXVsdC1zbWFydC1lZGl0LWNvbmZpZyc7XG5pbXBvcnQgeyBTTUFSVF9FRElUX0ZFQVRVUkUgfSBmcm9tICcuL2ZlYXR1cmUtbmFtZSc7XG5pbXBvcnQgeyBpbnRlcmNlcHRvcnMgfSBmcm9tICcuL2h0dHAtaW50ZXJjZXB0b3JzL2luZGV4JztcbmltcG9ydCB7IFNtYXJ0RWRpdExhdW5jaGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvc21hcnQtZWRpdC1sYXVuY2hlci5zZXJ2aWNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNtYXJ0RWRpdEZhY3RvcnkoXG4gIHNtYXJ0RWRpdExhdW5jaGVyU2VydmljZTogU21hcnRFZGl0TGF1bmNoZXJTZXJ2aWNlXG4pOiAoKSA9PiB2b2lkIHtcbiAgY29uc3QgaXNSZWFkeSA9ICgpID0+IHtcbiAgICBzbWFydEVkaXRMYXVuY2hlclNlcnZpY2UubG9hZCgpO1xuICB9O1xuICByZXR1cm4gaXNSZWFkeTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgLi4uaW50ZXJjZXB0b3JzLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRTbWFydEVkaXRDb25maWcpLFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEFQUF9JTklUSUFMSVpFUixcbiAgICAgIHVzZUZhY3Rvcnk6IHNtYXJ0RWRpdEZhY3RvcnksXG4gICAgICBkZXBzOiBbU21hcnRFZGl0TGF1bmNoZXJTZXJ2aWNlXSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoe1xuICAgICAgZmVhdHVyZU1vZHVsZXM6IHtcbiAgICAgICAgW1NNQVJUX0VESVRfRkVBVFVSRV06IHtcbiAgICAgICAgICBjbXNDb21wb25lbnRzOiBbU01BUlRfRURJVF9EVU1NWV9DT01QT05FTlRfVFlQRV0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBTbWFydEVkaXRSb290TW9kdWxlIHt9XG4iXX0=