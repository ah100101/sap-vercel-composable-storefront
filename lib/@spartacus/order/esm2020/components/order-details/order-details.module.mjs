/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddToCartModule } from '@spartacus/cart/base/components/add-to-cart';
import { AuthGuard, FeaturesConfigModule, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { CardModule, IconModule, KeyboardFocusModule, OutletModule, PromotionsModule, SpinnerModule, } from '@spartacus/storefront';
import { OrderDetailActionsComponent } from './order-detail-actions/order-detail-actions.component';
import { OrderDetailBillingComponent } from './order-detail-billing/order-detail-billing.component';
import { ConsignmentTrackingComponent } from './order-detail-items/consignment-tracking/consignment-tracking.component';
import { TrackingEventsComponent } from './order-detail-items/consignment-tracking/tracking-events/tracking-events.component';
import { defaultConsignmentTrackingLayoutConfig } from './order-detail-items/default-consignment-tracking-layout.config';
import { OrderConsignedEntriesComponent } from './order-detail-items/order-consigned-entries/order-consigned-entries.component';
import { OrderDetailItemsComponent } from './order-detail-items/order-detail-items.component';
import { OrderDetailReorderComponent } from './order-detail-reorder/order-detail-reorder.component';
import { ReorderDialogComponent } from './order-detail-reorder/reorder-dialog/reorder-dialog.component';
import { OrderDetailTotalsComponent } from './order-detail-totals/order-detail-totals.component';
import { OrderOverviewComponent } from './order-overview/order-overview.component';
import { defaultReorderLayoutConfig } from './reoder-layout.config';
import * as i0 from "@angular/core";
const moduleComponents = [
    OrderOverviewComponent,
    OrderDetailActionsComponent,
    OrderDetailItemsComponent,
    OrderDetailTotalsComponent,
    OrderDetailBillingComponent,
    TrackingEventsComponent,
    ConsignmentTrackingComponent,
    OrderConsignedEntriesComponent,
    OrderDetailReorderComponent,
    ReorderDialogComponent,
];
export class OrderDetailsModule {
}
OrderDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: OrderDetailsModule, declarations: [OrderOverviewComponent,
        OrderDetailActionsComponent,
        OrderDetailItemsComponent,
        OrderDetailTotalsComponent,
        OrderDetailBillingComponent,
        TrackingEventsComponent,
        ConsignmentTrackingComponent,
        OrderConsignedEntriesComponent,
        OrderDetailReorderComponent,
        ReorderDialogComponent], imports: [CardModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule,
        PromotionsModule,
        UrlModule,
        SpinnerModule,
        RouterModule,
        OutletModule,
        AddToCartModule,
        KeyboardFocusModule,
        IconModule], exports: [OrderOverviewComponent,
        OrderDetailActionsComponent,
        OrderDetailItemsComponent,
        OrderDetailTotalsComponent,
        OrderDetailBillingComponent,
        TrackingEventsComponent,
        ConsignmentTrackingComponent,
        OrderConsignedEntriesComponent,
        OrderDetailReorderComponent,
        ReorderDialogComponent] });
OrderDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderDetailsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AccountOrderDetailsActionsComponent: {
                    component: OrderDetailActionsComponent,
                    guards: [AuthGuard],
                },
                AccountOrderDetailsItemsComponent: {
                    component: OrderDetailItemsComponent,
                    guards: [AuthGuard],
                    data: {
                        enableAddToCart: true,
                    },
                },
                AccountOrderDetailsGroupedItemsComponent: {
                    component: OrderDetailItemsComponent,
                    guards: [AuthGuard],
                    data: {
                        enableAddToCart: true,
                        groupCartItems: true,
                    },
                },
                AccountOrderDetailsTotalsComponent: {
                    component: OrderDetailTotalsComponent,
                    guards: [AuthGuard],
                },
                AccountOrderDetailsOverviewComponent: {
                    component: OrderOverviewComponent,
                    guards: [AuthGuard],
                },
                AccountOrderDetailsSimpleOverviewComponent: {
                    component: OrderOverviewComponent,
                    guards: [AuthGuard],
                    data: {
                        simple: true,
                    },
                },
                AccountOrderDetailsReorderComponent: {
                    component: OrderDetailReorderComponent,
                    guards: [AuthGuard],
                },
            },
            features: {
                consignmentTracking: '1.2',
            },
        }),
        provideDefaultConfig(defaultConsignmentTrackingLayoutConfig),
        provideDefaultConfig(defaultReorderLayoutConfig),
    ], imports: [CardModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule,
        PromotionsModule,
        UrlModule,
        SpinnerModule,
        RouterModule,
        OutletModule,
        AddToCartModule,
        KeyboardFocusModule,
        IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CardModule,
                        CommonModule,
                        I18nModule,
                        FeaturesConfigModule,
                        PromotionsModule,
                        UrlModule,
                        SpinnerModule,
                        RouterModule,
                        OutletModule,
                        AddToCartModule,
                        KeyboardFocusModule,
                        IconModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountOrderDetailsActionsComponent: {
                                    component: OrderDetailActionsComponent,
                                    guards: [AuthGuard],
                                },
                                AccountOrderDetailsItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    guards: [AuthGuard],
                                    data: {
                                        enableAddToCart: true,
                                    },
                                },
                                AccountOrderDetailsGroupedItemsComponent: {
                                    component: OrderDetailItemsComponent,
                                    guards: [AuthGuard],
                                    data: {
                                        enableAddToCart: true,
                                        groupCartItems: true,
                                    },
                                },
                                AccountOrderDetailsTotalsComponent: {
                                    component: OrderDetailTotalsComponent,
                                    guards: [AuthGuard],
                                },
                                AccountOrderDetailsOverviewComponent: {
                                    component: OrderOverviewComponent,
                                    guards: [AuthGuard],
                                },
                                AccountOrderDetailsSimpleOverviewComponent: {
                                    component: OrderOverviewComponent,
                                    guards: [AuthGuard],
                                    data: {
                                        simple: true,
                                    },
                                },
                                AccountOrderDetailsReorderComponent: {
                                    component: OrderDetailReorderComponent,
                                    guards: [AuthGuard],
                                },
                            },
                            features: {
                                consignmentTracking: '1.2',
                            },
                        }),
                        provideDefaultConfig(defaultConsignmentTrackingLayoutConfig),
                        provideDefaultConfig(defaultReorderLayoutConfig),
                    ],
                    declarations: [...moduleComponents],
                    exports: [...moduleComponents],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGV0YWlscy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9vcmRlci1kZXRhaWxzL29yZGVyLWRldGFpbHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQzlFLE9BQU8sRUFDTCxTQUFTLEVBR1Qsb0JBQW9CLEVBQ3BCLFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsU0FBUyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUNMLFVBQVUsRUFDVixVQUFVLEVBQ1YsbUJBQW1CLEVBQ25CLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsYUFBYSxHQUNkLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDcEcsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDcEcsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMEVBQTBFLENBQUM7QUFDeEgsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUZBQXFGLENBQUM7QUFDOUgsT0FBTyxFQUFFLHNDQUFzQyxFQUFFLE1BQU0saUVBQWlFLENBQUM7QUFDekgsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sZ0ZBQWdGLENBQUM7QUFDaEksT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDOUYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0s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SUFBSTtxQ0FDYjtpQ0FDRjtnQ0FDRCxtQ0FBbUMsRUFBRTtvQ0FDbkMsU0FBUyxFQUFFLDJCQUEyQjtvQ0FDdEMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lDQUNwQjs2QkFDRjs0QkFDRCxRQUFRLEVBQUU7Z0NBQ1IsbUJBQW1CLEVBQUUsS0FBSzs2QkFDM0I7eUJBQ0YsQ0FBQzt3QkFDRixvQkFBb0IsQ0FBQyxzQ0FBc0MsQ0FBQzt3QkFDNUQsb0JBQW9CLENBQUMsMEJBQTBCLENBQUM7cUJBQ2pEO29CQUNELFlBQVksRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7b0JBQ25DLE9BQU8sRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7aUJBQy9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQWRkVG9DYXJ0TW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2UvY29tcG9uZW50cy9hZGQtdG8tY2FydCc7XG5pbXBvcnQge1xuICBBdXRoR3VhcmQsXG4gIENtc0NvbmZpZyxcbiAgRmVhdHVyZXNDb25maWcsXG4gIEZlYXR1cmVzQ29uZmlnTW9kdWxlLFxuICBJMThuTW9kdWxlLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgVXJsTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2FyZE1vZHVsZSxcbiAgSWNvbk1vZHVsZSxcbiAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgT3V0bGV0TW9kdWxlLFxuICBQcm9tb3Rpb25zTW9kdWxlLFxuICBTcGlubmVyTW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxBY3Rpb25zQ29tcG9uZW50IH0gZnJvbSAnLi9vcmRlci1kZXRhaWwtYWN0aW9ucy9vcmRlci1kZXRhaWwtYWN0aW9ucy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxCaWxsaW5nQ29tcG9uZW50IH0gZnJvbSAnLi9vcmRlci1kZXRhaWwtYmlsbGluZy9vcmRlci1kZXRhaWwtYmlsbGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29uc2lnbm1lbnRUcmFja2luZ0NvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItZGV0YWlsLWl0ZW1zL2NvbnNpZ25tZW50LXRyYWNraW5nL2NvbnNpZ25tZW50LXRyYWNraW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmFja2luZ0V2ZW50c0NvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItZGV0YWlsLWl0ZW1zL2NvbnNpZ25tZW50LXRyYWNraW5nL3RyYWNraW5nLWV2ZW50cy90cmFja2luZy1ldmVudHMuY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmF1bHRDb25zaWdubWVudFRyYWNraW5nTGF5b3V0Q29uZmlnIH0gZnJvbSAnLi9vcmRlci1kZXRhaWwtaXRlbXMvZGVmYXVsdC1jb25zaWdubWVudC10cmFja2luZy1sYXlvdXQuY29uZmlnJztcbmltcG9ydCB7IE9yZGVyQ29uc2lnbmVkRW50cmllc0NvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItZGV0YWlsLWl0ZW1zL29yZGVyLWNvbnNpZ25lZC1lbnRyaWVzL29yZGVyLWNvbnNpZ25lZC1lbnRyaWVzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmRlckRldGFpbEl0ZW1zQ29tcG9uZW50IH0gZnJvbSAnLi9vcmRlci1kZXRhaWwtaXRlbXMvb3JkZXItZGV0YWlsLWl0ZW1zLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmRlckRldGFpbFJlb3JkZXJDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLWRldGFpbC1yZW9yZGVyL29yZGVyLWRldGFpbC1yZW9yZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZW9yZGVyRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9vcmRlci1kZXRhaWwtcmVvcmRlci9yZW9yZGVyLWRpYWxvZy9yZW9yZGVyLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxUb3RhbHNDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLWRldGFpbC10b3RhbHMvb3JkZXItZGV0YWlsLXRvdGFscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJPdmVydmlld0NvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItb3ZlcnZpZXcvb3JkZXItb3ZlcnZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IGRlZmF1bHRSZW9yZGVyTGF5b3V0Q29uZmlnIH0gZnJvbSAnLi9yZW9kZXItbGF5b3V0LmNvbmZpZyc7XG5cbmNvbnN0IG1vZHVsZUNvbXBvbmVudHMgPSBbXG4gIE9yZGVyT3ZlcnZpZXdDb21wb25lbnQsXG4gIE9yZGVyRGV0YWlsQWN0aW9uc0NvbXBvbmVudCxcbiAgT3JkZXJEZXRhaWxJdGVtc0NvbXBvbmVudCxcbiAgT3JkZXJEZXRhaWxUb3RhbHNDb21wb25lbnQsXG4gIE9yZGVyRGV0YWlsQmlsbGluZ0NvbXBvbmVudCxcbiAgVHJhY2tpbmdFdmVudHNDb21wb25lbnQsXG4gIENvbnNpZ25tZW50VHJhY2tpbmdDb21wb25lbnQsXG4gIE9yZGVyQ29uc2lnbmVkRW50cmllc0NvbXBvbmVudCxcbiAgT3JkZXJEZXRhaWxSZW9yZGVyQ29tcG9uZW50LFxuICBSZW9yZGVyRGlhbG9nQ29tcG9uZW50LFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENhcmRNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgRmVhdHVyZXNDb25maWdNb2R1bGUsXG4gICAgUHJvbW90aW9uc01vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgT3V0bGV0TW9kdWxlLFxuICAgIEFkZFRvQ2FydE1vZHVsZSxcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICAgIEljb25Nb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWcgfCBGZWF0dXJlc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIEFjY291bnRPcmRlckRldGFpbHNBY3Rpb25zQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckRldGFpbEFjdGlvbnNDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgICAgQWNjb3VudE9yZGVyRGV0YWlsc0l0ZW1zQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckRldGFpbEl0ZW1zQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZW5hYmxlQWRkVG9DYXJ0OiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIEFjY291bnRPcmRlckRldGFpbHNHcm91cGVkSXRlbXNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyRGV0YWlsSXRlbXNDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkXSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBlbmFibGVBZGRUb0NhcnQ6IHRydWUsXG4gICAgICAgICAgICBncm91cENhcnRJdGVtczogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBBY2NvdW50T3JkZXJEZXRhaWxzVG90YWxzQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckRldGFpbFRvdGFsc0NvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtBdXRoR3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgICBBY2NvdW50T3JkZXJEZXRhaWxzT3ZlcnZpZXdDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyT3ZlcnZpZXdDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgICAgQWNjb3VudE9yZGVyRGV0YWlsc1NpbXBsZU92ZXJ2aWV3Q29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlck92ZXJ2aWV3Q29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgc2ltcGxlOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIEFjY291bnRPcmRlckRldGFpbHNSZW9yZGVyQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckRldGFpbFJlb3JkZXJDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBmZWF0dXJlczoge1xuICAgICAgICBjb25zaWdubWVudFRyYWNraW5nOiAnMS4yJyxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoZGVmYXVsdENvbnNpZ25tZW50VHJhY2tpbmdMYXlvdXRDb25maWcpLFxuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRSZW9yZGVyTGF5b3V0Q29uZmlnKSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4ubW9kdWxlQ29tcG9uZW50c10sXG4gIGV4cG9ydHM6IFsuLi5tb2R1bGVDb21wb25lbnRzXSxcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJEZXRhaWxzTW9kdWxlIHt9XG4iXX0=