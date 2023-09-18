/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CART_BASE_FEATURE, ORDER_ENTRIES_CONTEXT, } from '@spartacus/cart/base/root';
import { AuthGuard, provideDefaultConfig, provideDefaultConfigFactory, } from '@spartacus/core';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { defaultOrderRoutingConfig } from './config/default-order-routing-config';
import { ORDER_CORE_FEATURE, ORDER_FEATURE } from './feature-name';
import { OrderConfirmationOrderEntriesContextToken, OrderDetailsOrderEntriesContextToken, } from './tokens/context';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultOrderComponentsConfig() {
    const config = {
        featureModules: {
            [ORDER_FEATURE]: {
                cmsComponents: [
                    'CancelOrderComponent',
                    'CancelOrderConfirmationComponent',
                    'ReturnOrderComponent',
                    'ReturnOrderConfirmationComponent',
                    'AccountOrderDetailsActionsComponent',
                    'AccountOrderDetailsItemsComponent',
                    'AccountOrderDetailsTotalsComponent',
                    'AccountOrderDetailsOverviewComponent',
                    'AccountOrderDetailsBillingComponent',
                    'AccountOrderDetailsGroupedItemsComponent',
                    'AccountOrderDetailsSimpleOverviewComponent',
                    'AccountOrderHistoryComponent',
                    'ReplenishmentDetailItemsComponent',
                    'AccountOrderDetailsReorderComponent',
                    'ReplenishmentDetailTotalsComponent',
                    'ReplenishmentDetailShippingComponent',
                    'ReplenishmentDetailActionsComponent',
                    'ReplenishmentDetailOrderHistoryComponent',
                    'AccountReplenishmentHistoryComponent',
                    'ReturnRequestOverviewComponent',
                    'ReturnRequestItemsComponent',
                    'ReturnRequestTotalsComponent',
                    'OrderReturnRequestListComponent',
                    'OrderConfirmationThankMessageComponent',
                    'OrderConfirmationItemsComponent',
                    'OrderConfirmationTotalsComponent',
                    'OrderConfirmationOverviewComponent',
                    'OrderConfirmationShippingComponent',
                    'OrderConfirmationBillingComponent',
                    'OrderConfirmationContinueButtonComponent',
                    'ReplenishmentConfirmationMessageComponent',
                    'ReplenishmentConfirmationOverviewComponent',
                    'ReplenishmentConfirmationItemsComponent',
                    'ReplenishmentConfirmationTotalsComponent',
                ],
                dependencies: [CART_BASE_FEATURE],
            },
            // by default core is bundled together with components
            [ORDER_CORE_FEATURE]: ORDER_FEATURE,
        },
    };
    return config;
}
export class OrderRootModule {
}
OrderRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: OrderRootModule, imports: [i1.RouterModule] });
OrderRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderRootModule, providers: [
        provideDefaultConfigFactory(defaultOrderComponentsConfig),
        provideDefaultConfig(defaultOrderRoutingConfig),
    ], imports: [RouterModule.forChild([
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { pageLabel: 'order', cxRoute: 'orderGuest' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'orderDetails',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: OrderDetailsOrderEntriesContextToken,
                    },
                },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orderCancel' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orderCancelConfirmation' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orderReturn' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orderReturnConfirmation' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'orders' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'replenishmentDetails' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'replenishmentOrders' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [AuthGuard, CmsPageGuard],
                component: PageLayoutComponent,
                data: { cxRoute: 'returnRequestDetails' },
            },
            {
                // @ts-ignore
                path: null,
                canActivate: [CmsPageGuard],
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'orderConfirmation',
                    cxContext: {
                        [ORDER_ENTRIES_CONTEXT]: OrderConfirmationOrderEntriesContextToken,
                    },
                },
            },
        ])] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { pageLabel: 'order', cxRoute: 'orderGuest' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'orderDetails',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: OrderDetailsOrderEntriesContextToken,
                                    },
                                },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orderCancel' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orderCancelConfirmation' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orderReturn' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orderReturnConfirmation' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'orders' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'replenishmentDetails' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'replenishmentOrders' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [AuthGuard, CmsPageGuard],
                                component: PageLayoutComponent,
                                data: { cxRoute: 'returnRequestDetails' },
                            },
                            {
                                // @ts-ignore
                                path: null,
                                canActivate: [CmsPageGuard],
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'orderConfirmation',
                                    cxContext: {
                                        [ORDER_ENTRIES_CONTEXT]: OrderConfirmationOrderEntriesContextToken,
                                    },
                                },
                            },
                        ]),
                    ],
                    providers: [
                        provideDefaultConfigFactory(defaultOrderComponentsConfig),
                        provideDefaultConfig(defaultOrderRoutingConfig),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcm9vdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvcm9vdC9vcmRlci1yb290Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixxQkFBcUIsR0FDdEIsTUFBTSwyQkFBMkIsQ0FBQztBQUNuQyxPQUFPLEVBQ0wsU0FBUyxFQUVULG9CQUFvQixFQUNwQiwyQkFBMkIsR0FDNUIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFDTCx5Q0FBeUMsRUFDekMsb0NBQW9DLEdBQ3JDLE1BQU0sa0JBQWtCLENBQUM7OztBQUUxQiwyRUFBMkU7QUFDM0UsTUFBTSxVQUFVLDRCQUE0QjtJQUMxQyxNQUFNLE1BQU0sR0FBYztRQUN4QixjQUFjLEVBQUU7WUFDZCxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUNmLGFBQWEsRUFBRTtvQkFDYixzQkFBc0I7b0JBQ3RCLGtDQUFrQztvQkFDbEMsc0JBQXNCO29CQUN0QixrQ0FBa0M7b0JBQ2xDLHFDQUFxQztvQkFDckMsbUNBQW1DO29CQUNuQyxvQ0FBb0M7b0JBQ3BDLHNDQUFzQztvQkFDdEMscUNBQXFDO29CQUNyQywwQ0FBMEM7b0JBQzFDLDRDQUE0QztvQkFDNUMsOEJBQThCO29CQUM5QixtQ0FBbUM7b0JBQ25DLHFDQUFx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LFNBQVMsRUFBRSxtQkFBbUI7Z0NBQzlCLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRTs2QkFDMUM7NEJBQ0Q7Z0NBQ0UsYUFBYTtnQ0FDYixJQUFJLEVBQUUsSUFBSTtnQ0FDVixXQUFXLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDO2dDQUN0QyxTQUFTLEVBQUUsbUJBQW1CO2dDQUM5QixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUU7NkJBQ3pDOzRCQUNEO2dDQUNFLGFBQWE7Z0NBQ2IsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsV0FBVyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQztnQ0FDdEMsU0FBUyxFQUFFLG1CQUFtQjtnQ0FDOUIsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUFFOzZCQUMxQzs0QkFDRDtnQ0FDRSxhQUFhO2dDQUNiLElBQUksRUFBRSxJQUFJO2dDQUNWLFdBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQztnQ0FDM0IsU0FBUyxFQUFFLG1CQUFtQjtnQ0FDOUIsSUFBSSxFQUFFO29DQUNKLE9BQU8sRUFBRSxtQkFBbUI7b0NBQzVCLFNBQVMsRUFBRTt3Q0FDVCxDQUFDLHFCQUFxQixDQUFDLEVBQUUseUNBQXlDO3FDQUNuRTtpQ0FDRjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFNBQVMsRUFBRTt3QkFDVCwyQkFBMkIsQ0FBQyw0QkFBNEIsQ0FBQzt3QkFDekQsb0JBQW9CLENBQUMseUJBQXlCLENBQUM7cUJBQ2hEO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBDQVJUX0JBU0VfRkVBVFVSRSxcbiAgT1JERVJfRU5UUklFU19DT05URVhULFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIEF1dGhHdWFyZCxcbiAgQ21zQ29uZmlnLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5LFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ21zUGFnZUd1YXJkLCBQYWdlTGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IGRlZmF1bHRPcmRlclJvdXRpbmdDb25maWcgfSBmcm9tICcuL2NvbmZpZy9kZWZhdWx0LW9yZGVyLXJvdXRpbmctY29uZmlnJztcbmltcG9ydCB7IE9SREVSX0NPUkVfRkVBVFVSRSwgT1JERVJfRkVBVFVSRSB9IGZyb20gJy4vZmVhdHVyZS1uYW1lJztcbmltcG9ydCB7XG4gIE9yZGVyQ29uZmlybWF0aW9uT3JkZXJFbnRyaWVzQ29udGV4dFRva2VuLFxuICBPcmRlckRldGFpbHNPcmRlckVudHJpZXNDb250ZXh0VG9rZW4sXG59IGZyb20gJy4vdG9rZW5zL2NvbnRleHQnO1xuXG4vLyBUT0RPOiBJbmxpbmUgdGhpcyBmYWN0b3J5IHdoZW4gd2Ugc3RhcnQgcmVsZWFzaW5nIEl2eSBjb21waWxlZCBsaWJyYXJpZXNcbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0T3JkZXJDb21wb25lbnRzQ29uZmlnKCk6IENtc0NvbmZpZyB7XG4gIGNvbnN0IGNvbmZpZzogQ21zQ29uZmlnID0ge1xuICAgIGZlYXR1cmVNb2R1bGVzOiB7XG4gICAgICBbT1JERVJfRkVBVFVSRV06IHtcbiAgICAgICAgY21zQ29tcG9uZW50czogW1xuICAgICAgICAgICdDYW5jZWxPcmRlckNvbXBvbmVudCcsXG4gICAgICAgICAgJ0NhbmNlbE9yZGVyQ29uZmlybWF0aW9uQ29tcG9uZW50JyxcbiAgICAgICAgICAnUmV0dXJuT3JkZXJDb21wb25lbnQnLFxuICAgICAgICAgICdSZXR1cm5PcmRlckNvbmZpcm1hdGlvbkNvbXBvbmVudCcsXG4gICAgICAgICAgJ0FjY291bnRPcmRlckRldGFpbHNBY3Rpb25zQ29tcG9uZW50JyxcbiAgICAgICAgICAnQWNjb3VudE9yZGVyRGV0YWlsc0l0ZW1zQ29tcG9uZW50JyxcbiAgICAgICAgICAnQWNjb3VudE9yZGVyRGV0YWlsc1RvdGFsc0NvbXBvbmVudCcsXG4gICAgICAgICAgJ0FjY291bnRPcmRlckRldGFpbHNPdmVydmlld0NvbXBvbmVudCcsXG4gICAgICAgICAgJ0FjY291bnRPcmRlckRldGFpbHNCaWxsaW5nQ29tcG9uZW50JyxcbiAgICAgICAgICAnQWNjb3VudE9yZGVyRGV0YWlsc0dyb3VwZWRJdGVtc0NvbXBvbmVudCcsXG4gICAgICAgICAgJ0FjY291bnRPcmRlckRldGFpbHNTaW1wbGVPdmVydmlld0NvbXBvbmVudCcsXG4gICAgICAgICAgJ0FjY291bnRPcmRlckhpc3RvcnlDb21wb25lbnQnLFxuICAgICAgICAgICdSZXBsZW5pc2htZW50RGV0YWlsSXRlbXNDb21wb25lbnQnLFxuICAgICAgICAgICdBY2NvdW50T3JkZXJEZXRhaWxzUmVvcmRlckNvbXBvbmVudCcsXG4gICAgICAgICAgJ1JlcGxlbmlzaG1lbnREZXRhaWxUb3RhbHNDb21wb25lbnQnLFxuICAgICAgICAgICdSZXBsZW5pc2htZW50RGV0YWlsU2hpcHBpbmdDb21wb25lbnQnLFxuICAgICAgICAgICdSZXBsZW5pc2htZW50RGV0YWlsQWN0aW9uc0NvbXBvbmVudCcsXG4gICAgICAgICAgJ1JlcGxlbmlzaG1lbnREZXRhaWxPcmRlckhpc3RvcnlDb21wb25lbnQnLFxuICAgICAgICAgICdBY2NvdW50UmVwbGVuaXNobWVudEhpc3RvcnlDb21wb25lbnQnLFxuICAgICAgICAgICdSZXR1cm5SZXF1ZXN0T3ZlcnZpZXdDb21wb25lbnQnLFxuICAgICAgICAgICdSZXR1cm5SZXF1ZXN0SXRlbXNDb21wb25lbnQnLFxuICAgICAgICAgICdSZXR1cm5SZXF1ZXN0VG90YWxzQ29tcG9uZW50JyxcbiAgICAgICAgICAnT3JkZXJSZXR1cm5SZXF1ZXN0TGlzdENvbXBvbmVudCcsXG4gICAgICAgICAgJ09yZGVyQ29uZmlybWF0aW9uVGhhbmtNZXNzYWdlQ29tcG9uZW50JyxcbiAgICAgICAgICAnT3JkZXJDb25maXJtYXRpb25JdGVtc0NvbXBvbmVudCcsXG4gICAgICAgICAgJ09yZGVyQ29uZmlybWF0aW9uVG90YWxzQ29tcG9uZW50JyxcbiAgICAgICAgICAnT3JkZXJDb25maXJtYXRpb25PdmVydmlld0NvbXBvbmVudCcsXG4gICAgICAgICAgJ09yZGVyQ29uZmlybWF0aW9uU2hpcHBpbmdDb21wb25lbnQnLFxuICAgICAgICAgICdPcmRlckNvbmZpcm1hdGlvbkJpbGxpbmdDb21wb25lbnQnLFxuICAgICAgICAgICdPcmRlckNvbmZpcm1hdGlvbkNvbnRpbnVlQnV0dG9uQ29tcG9uZW50JyxcbiAgICAgICAgICAnUmVwbGVuaXNobWVudENvbmZpcm1hdGlvbk1lc3NhZ2VDb21wb25lbnQnLFxuICAgICAgICAgICdSZXBsZW5pc2htZW50Q29uZmlybWF0aW9uT3ZlcnZpZXdDb21wb25lbnQnLFxuICAgICAgICAgICdSZXBsZW5pc2htZW50Q29uZmlybWF0aW9uSXRlbXNDb21wb25lbnQnLFxuICAgICAgICAgICdSZXBsZW5pc2htZW50Q29uZmlybWF0aW9uVG90YWxzQ29tcG9uZW50JyxcbiAgICAgICAgXSxcbiAgICAgICAgZGVwZW5kZW5jaWVzOiBbQ0FSVF9CQVNFX0ZFQVRVUkVdLFxuICAgICAgfSxcbiAgICAgIC8vIGJ5IGRlZmF1bHQgY29yZSBpcyBidW5kbGVkIHRvZ2V0aGVyIHdpdGggY29tcG9uZW50c1xuICAgICAgW09SREVSX0NPUkVfRkVBVFVSRV06IE9SREVSX0ZFQVRVUkUsXG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIGNvbmZpZztcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFJvdXRlck1vZHVsZS5mb3JDaGlsZChbXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIENtc1BhZ2VHdWFyZF0sXG4gICAgICAgIGNvbXBvbmVudDogUGFnZUxheW91dENvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyBwYWdlTGFiZWw6ICdvcmRlcicsIGN4Um91dGU6ICdvcmRlckd1ZXN0JyB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY3hSb3V0ZTogJ29yZGVyRGV0YWlscycsXG4gICAgICAgICAgY3hDb250ZXh0OiB7XG4gICAgICAgICAgICBbT1JERVJfRU5UUklFU19DT05URVhUXTogT3JkZXJEZXRhaWxzT3JkZXJFbnRyaWVzQ29udGV4dFRva2VuLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBhdGg6IG51bGwsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IGN4Um91dGU6ICdvcmRlckNhbmNlbCcgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtDbXNQYWdlR3VhcmRdLFxuICAgICAgICBjb21wb25lbnQ6IFBhZ2VMYXlvdXRDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHsgY3hSb3V0ZTogJ29yZGVyQ2FuY2VsQ29uZmlybWF0aW9uJyB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0Ntc1BhZ2VHdWFyZF0sXG4gICAgICAgIGNvbXBvbmVudDogUGFnZUxheW91dENvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyBjeFJvdXRlOiAnb3JkZXJSZXR1cm4nIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBhdGg6IG51bGwsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IGN4Um91dGU6ICdvcmRlclJldHVybkNvbmZpcm1hdGlvbicgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIENtc1BhZ2VHdWFyZF0sXG4gICAgICAgIGNvbXBvbmVudDogUGFnZUxheW91dENvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyBjeFJvdXRlOiAnb3JkZXJzJyB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0F1dGhHdWFyZCwgQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IGN4Um91dGU6ICdyZXBsZW5pc2htZW50RGV0YWlscycgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIENtc1BhZ2VHdWFyZF0sXG4gICAgICAgIGNvbXBvbmVudDogUGFnZUxheW91dENvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyBjeFJvdXRlOiAncmVwbGVuaXNobWVudE9yZGVycycgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcGF0aDogbnVsbCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtBdXRoR3VhcmQsIENtc1BhZ2VHdWFyZF0sXG4gICAgICAgIGNvbXBvbmVudDogUGFnZUxheW91dENvbXBvbmVudCxcbiAgICAgICAgZGF0YTogeyBjeFJvdXRlOiAncmV0dXJuUmVxdWVzdERldGFpbHMnIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBhdGg6IG51bGwsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbQ21zUGFnZUd1YXJkXSxcbiAgICAgICAgY29tcG9uZW50OiBQYWdlTGF5b3V0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY3hSb3V0ZTogJ29yZGVyQ29uZmlybWF0aW9uJyxcbiAgICAgICAgICBjeENvbnRleHQ6IHtcbiAgICAgICAgICAgIFtPUkRFUl9FTlRSSUVTX0NPTlRFWFRdOiBPcmRlckNvbmZpcm1hdGlvbk9yZGVyRW50cmllc0NvbnRleHRUb2tlbixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdKSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWdGYWN0b3J5KGRlZmF1bHRPcmRlckNvbXBvbmVudHNDb25maWcpLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRPcmRlclJvdXRpbmdDb25maWcpLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlclJvb3RNb2R1bGUge31cbiJdfQ==