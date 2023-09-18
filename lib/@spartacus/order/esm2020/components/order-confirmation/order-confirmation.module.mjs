/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { OrderConfirmationOrderEntriesContextToken, OrderFacade, OrderOutlets, } from '@spartacus/order/root';
import { CardModule, FormErrorsModule, OutletModule, PasswordVisibilityToggleModule, PromotionsModule, provideOutlet, PwaModule, } from '@spartacus/storefront';
import { OrderConfirmationGuard } from '../guards/order-confirmation.guard';
import { OrderDetailBillingComponent } from '../order-details/order-detail-billing/order-detail-billing.component';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderOverviewComponent } from '../order-details/order-overview/order-overview.component';
import { OrderConfirmationOrderEntriesContext } from '../page-context/order-confirmation-order-entries.context';
import { OrderConfirmationItemsComponent } from './order-confirmation-items/order-confirmation-items.component';
import { OrderConfirmationShippingComponent } from './order-confirmation-shipping/order-confirmation-shipping.component';
import { OrderConfirmationThankYouMessageComponent } from './order-confirmation-thank-you-message/order-confirmation-thank-you-message.component';
import { OrderConfirmationTotalsComponent } from './order-confirmation-totals/order-confirmation-totals.component';
import { OrderGuestRegisterFormComponent } from './order-guest-register-form/order-guest-register-form.component';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
const orderConfirmationComponents = [
    OrderConfirmationItemsComponent,
    OrderConfirmationThankYouMessageComponent,
    OrderConfirmationTotalsComponent,
    OrderGuestRegisterFormComponent,
    OrderConfirmationShippingComponent,
];
export class OrderConfirmationModule {
}
OrderConfirmationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderConfirmationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderConfirmationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: OrderConfirmationModule, declarations: [OrderConfirmationItemsComponent,
        OrderConfirmationThankYouMessageComponent,
        OrderConfirmationTotalsComponent,
        OrderGuestRegisterFormComponent,
        OrderConfirmationShippingComponent], imports: [CommonModule,
        CardModule,
        PwaModule,
        PromotionsModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule, i1.OutletModule, PasswordVisibilityToggleModule], exports: [OrderConfirmationItemsComponent,
        OrderConfirmationThankYouMessageComponent,
        OrderConfirmationTotalsComponent,
        OrderGuestRegisterFormComponent,
        OrderConfirmationShippingComponent] });
OrderConfirmationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderConfirmationModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                OrderConfirmationThankMessageComponent: {
                    component: OrderConfirmationThankYouMessageComponent,
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationMessageComponent: {
                    component: OrderConfirmationThankYouMessageComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationItemsComponent: {
                    component: OrderConfirmationItemsComponent,
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationItemsComponent: {
                    component: OrderConfirmationItemsComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationTotalsComponent: {
                    component: OrderConfirmationTotalsComponent,
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationTotalsComponent: {
                    component: OrderConfirmationTotalsComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationOverviewComponent: {
                    component: OrderOverviewComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderFacade,
                        },
                    ],
                    guards: [OrderConfirmationGuard],
                },
                ReplenishmentConfirmationOverviewComponent: {
                    component: OrderOverviewComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderFacade,
                        },
                    ],
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationShippingComponent: {
                    component: OrderConfirmationShippingComponent,
                    guards: [OrderConfirmationGuard],
                },
                OrderConfirmationBillingComponent: {
                    component: OrderDetailBillingComponent,
                    providers: [
                        {
                            provide: OrderDetailsService,
                            useExisting: OrderFacade,
                        },
                    ],
                    guards: [OrderConfirmationGuard],
                },
            },
        }),
        {
            provide: OrderConfirmationOrderEntriesContextToken,
            useExisting: OrderConfirmationOrderEntriesContext,
        },
        provideOutlet({
            id: OrderOutlets.CONSIGNMENT_DELIVERY_INFO,
            component: OrderConfirmationShippingComponent,
        }),
    ], imports: [CommonModule,
        CardModule,
        PwaModule,
        PromotionsModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        OutletModule.forChild(),
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderConfirmationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        PwaModule,
                        PromotionsModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        OutletModule.forChild(),
                        PasswordVisibilityToggleModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                OrderConfirmationThankMessageComponent: {
                                    component: OrderConfirmationThankYouMessageComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationMessageComponent: {
                                    component: OrderConfirmationThankYouMessageComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationItemsComponent: {
                                    component: OrderConfirmationItemsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationItemsComponent: {
                                    component: OrderConfirmationItemsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationTotalsComponent: {
                                    component: OrderConfirmationTotalsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationTotalsComponent: {
                                    component: OrderConfirmationTotalsComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationOverviewComponent: {
                                    component: OrderOverviewComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderFacade,
                                        },
                                    ],
                                    guards: [OrderConfirmationGuard],
                                },
                                ReplenishmentConfirmationOverviewComponent: {
                                    component: OrderOverviewComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderFacade,
                                        },
                                    ],
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationShippingComponent: {
                                    component: OrderConfirmationShippingComponent,
                                    guards: [OrderConfirmationGuard],
                                },
                                OrderConfirmationBillingComponent: {
                                    component: OrderDetailBillingComponent,
                                    providers: [
                                        {
                                            provide: OrderDetailsService,
                                            useExisting: OrderFacade,
                                        },
                                    ],
                                    guards: [OrderConfirmationGuard],
                                },
                            },
                        }),
                        {
                            provide: OrderConfirmationOrderEntriesContextToken,
                            useExisting: OrderConfirmationOrderEntriesContext,
                        },
                        provideOutlet({
                            id: OrderOutlets.CONSIGNMENT_DELIVERY_INFO,
                            component: OrderConfirmationShippingComponent,
                        }),
                    ],
                    declarations: [...orderConfirmationComponents],
                    exports: [...orderConfirmationComponents],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY29uZmlybWF0aW9uLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb21wb25lbnRzL29yZGVyLWNvbmZpcm1hdGlvbi9vcmRlci1jb25maXJtYXRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQWEsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUUsT0FBTyxFQUNMLHlDQUF5QyxFQUN6QyxXQUFXLEVBQ1gsWUFBWSxHQUNiLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUNMLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsWUFBWSxFQUNaLDhCQUE4QixFQUM5QixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLFNBQVMsR0FDVixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHNFQUFzRSxDQUFDO0FBQ25ILE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ2xHLE9BQU8sRUFBRSxvQ0FBb0MsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQ2hILE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQ2hILE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLHFFQUFxRSxDQUFDO0FBQ3pILE9BQU8sRUFB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Q0UsT0FBTyxFQUFFLG1CQUFtQjs0Q0FDNUIsV0FBVyxFQUFFLFdBQVc7eUNBQ3pCO3FDQUNGO29DQUNELE1BQU0sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lDQUNqQztnQ0FDRCwwQ0FBMEMsRUFBRTtvQ0FDMUMsU0FBUyxFQUFFLHNCQUFzQjtvQ0FDakMsU0FBUyxFQUFFO3dDQUNUOzRDQUNFLE9BQU8sRUFBRSxtQkFBbUI7NENBQzVCLFdBQVcsRUFBRSxXQUFXO3lDQUN6QjtxQ0FDRjtvQ0FDRCxNQUFNLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztpQ0FDakM7Z0NBRUQsa0NBQWtDLEVBQUU7b0NBQ2xDLFNBQVMsRUFBRSxrQ0FBa0M7b0NBQzdDLE1BQU0sRUFBRSxDQUFDLHNCQUFzQixDQUFDO2lDQUNqQztnQ0FFRCxpQ0FBaUMsRUFBRTtvQ0FDakMsU0FBUyxFQUFFLDJCQUEyQjtvQ0FDdEMsU0FBUyxFQUFFO3dDQUNUOzRDQUNFLE9BQU8sRUFBRSxtQkFBbUI7NENBQzVCLFdBQVcsRUFBRSxXQUFXO3lDQUN6QjtxQ0FDRjtvQ0FDRCxNQUFNLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztpQ0FDakM7NkJBQ0Y7eUJBQ0YsQ0FBQzt3QkFDRjs0QkFDRSxPQUFPLEVBQUUseUNBQXlDOzRCQUNsRCxXQUFXLEVBQUUsb0NBQW9DO3lCQUNsRDt3QkFDRCxhQUFhLENBQUM7NEJBQ1osRUFBRSxFQUFFLFlBQVksQ0FBQyx5QkFBeUI7NEJBQzFDLFNBQVMsRUFBRSxrQ0FBa0M7eUJBQzlDLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsR0FBRywyQkFBMkIsQ0FBQztvQkFDOUMsT0FBTyxFQUFFLENBQUMsR0FBRywyQkFBMkIsQ0FBQztpQkFDMUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDbXNDb25maWcsIEkxOG5Nb2R1bGUsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIE9yZGVyQ29uZmlybWF0aW9uT3JkZXJFbnRyaWVzQ29udGV4dFRva2VuLFxuICBPcmRlckZhY2FkZSxcbiAgT3JkZXJPdXRsZXRzLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHtcbiAgQ2FyZE1vZHVsZSxcbiAgRm9ybUVycm9yc01vZHVsZSxcbiAgT3V0bGV0TW9kdWxlLFxuICBQYXNzd29yZFZpc2liaWxpdHlUb2dnbGVNb2R1bGUsXG4gIFByb21vdGlvbnNNb2R1bGUsXG4gIHByb3ZpZGVPdXRsZXQsXG4gIFB3YU1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9yZGVyQ29uZmlybWF0aW9uR3VhcmQgfSBmcm9tICcuLi9ndWFyZHMvb3JkZXItY29uZmlybWF0aW9uLmd1YXJkJztcbmltcG9ydCB7IE9yZGVyRGV0YWlsQmlsbGluZ0NvbXBvbmVudCB9IGZyb20gJy4uL29yZGVyLWRldGFpbHMvb3JkZXItZGV0YWlsLWJpbGxpbmcvb3JkZXItZGV0YWlsLWJpbGxpbmcuY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVyRGV0YWlsc1NlcnZpY2UgfSBmcm9tICcuLi9vcmRlci1kZXRhaWxzL29yZGVyLWRldGFpbHMuc2VydmljZSc7XG5pbXBvcnQgeyBPcmRlck92ZXJ2aWV3Q29tcG9uZW50IH0gZnJvbSAnLi4vb3JkZXItZGV0YWlscy9vcmRlci1vdmVydmlldy9vcmRlci1vdmVydmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJDb25maXJtYXRpb25PcmRlckVudHJpZXNDb250ZXh0IH0gZnJvbSAnLi4vcGFnZS1jb250ZXh0L29yZGVyLWNvbmZpcm1hdGlvbi1vcmRlci1lbnRyaWVzLmNvbnRleHQnO1xuaW1wb3J0IHsgT3JkZXJDb25maXJtYXRpb25JdGVtc0NvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItY29uZmlybWF0aW9uLWl0ZW1zL29yZGVyLWNvbmZpcm1hdGlvbi1pdGVtcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJDb25maXJtYXRpb25TaGlwcGluZ0NvbXBvbmVudCB9IGZyb20gJy4vb3JkZXItY29uZmlybWF0aW9uLXNoaXBwaW5nL29yZGVyLWNvbmZpcm1hdGlvbi1zaGlwcGluZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT3JkZXJDb25maXJtYXRpb25UaGFua1lvdU1lc3NhZ2VDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLWNvbmZpcm1hdGlvbi10aGFuay15b3UtbWVzc2FnZS9vcmRlci1jb25maXJtYXRpb24tdGhhbmsteW91LW1lc3NhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVyQ29uZmlybWF0aW9uVG90YWxzQ29tcG9uZW50IH0gZnJvbSAnLi9vcmRlci1jb25maXJtYXRpb24tdG90YWxzL29yZGVyLWNvbmZpcm1hdGlvbi10b3RhbHMuY29tcG9uZW50JztcbmltcG9ydCB7IE9yZGVyR3Vlc3RSZWdpc3RlckZvcm1Db21wb25lbnQgfSBmcm9tICcuL29yZGVyLWd1ZXN0LXJlZ2lzdGVyLWZvcm0vb3JkZXItZ3Vlc3QtcmVnaXN0ZXItZm9ybS5jb21wb25lbnQnO1xuXG5jb25zdCBvcmRlckNvbmZpcm1hdGlvbkNvbXBvbmVudHMgPSBbXG4gIE9yZGVyQ29uZmlybWF0aW9uSXRlbXNDb21wb25lbnQsXG4gIE9yZGVyQ29uZmlybWF0aW9uVGhhbmtZb3VNZXNzYWdlQ29tcG9uZW50LFxuICBPcmRlckNvbmZpcm1hdGlvblRvdGFsc0NvbXBvbmVudCxcbiAgT3JkZXJHdWVzdFJlZ2lzdGVyRm9ybUNvbXBvbmVudCxcbiAgT3JkZXJDb25maXJtYXRpb25TaGlwcGluZ0NvbXBvbmVudCxcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgQ2FyZE1vZHVsZSxcbiAgICBQd2FNb2R1bGUsXG4gICAgUHJvbW90aW9uc01vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgRm9ybUVycm9yc01vZHVsZSxcbiAgICBPdXRsZXRNb2R1bGUuZm9yQ2hpbGQoKSxcbiAgICBQYXNzd29yZFZpc2liaWxpdHlUb2dnbGVNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBPcmRlckNvbmZpcm1hdGlvblRoYW5rTWVzc2FnZUNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJDb25maXJtYXRpb25UaGFua1lvdU1lc3NhZ2VDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbT3JkZXJDb25maXJtYXRpb25HdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICAgIFJlcGxlbmlzaG1lbnRDb25maXJtYXRpb25NZXNzYWdlQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckNvbmZpcm1hdGlvblRoYW5rWW91TWVzc2FnZUNvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtPcmRlckNvbmZpcm1hdGlvbkd1YXJkXSxcbiAgICAgICAgfSxcblxuICAgICAgICBPcmRlckNvbmZpcm1hdGlvbkl0ZW1zQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckNvbmZpcm1hdGlvbkl0ZW1zQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW09yZGVyQ29uZmlybWF0aW9uR3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgICBSZXBsZW5pc2htZW50Q29uZmlybWF0aW9uSXRlbXNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyQ29uZmlybWF0aW9uSXRlbXNDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbT3JkZXJDb25maXJtYXRpb25HdWFyZF0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgT3JkZXJDb25maXJtYXRpb25Ub3RhbHNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyQ29uZmlybWF0aW9uVG90YWxzQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW09yZGVyQ29uZmlybWF0aW9uR3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgICBSZXBsZW5pc2htZW50Q29uZmlybWF0aW9uVG90YWxzQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckNvbmZpcm1hdGlvblRvdGFsc0NvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtPcmRlckNvbmZpcm1hdGlvbkd1YXJkXSxcbiAgICAgICAgfSxcblxuICAgICAgICBPcmRlckNvbmZpcm1hdGlvbk92ZXJ2aWV3Q29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlck92ZXJ2aWV3Q29tcG9uZW50LFxuICAgICAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBwcm92aWRlOiBPcmRlckRldGFpbHNTZXJ2aWNlLFxuICAgICAgICAgICAgICB1c2VFeGlzdGluZzogT3JkZXJGYWNhZGUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgZ3VhcmRzOiBbT3JkZXJDb25maXJtYXRpb25HdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICAgIFJlcGxlbmlzaG1lbnRDb25maXJtYXRpb25PdmVydmlld0NvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogT3JkZXJPdmVydmlld0NvbXBvbmVudCxcbiAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvdmlkZTogT3JkZXJEZXRhaWxzU2VydmljZSxcbiAgICAgICAgICAgICAgdXNlRXhpc3Rpbmc6IE9yZGVyRmFjYWRlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGd1YXJkczogW09yZGVyQ29uZmlybWF0aW9uR3VhcmRdLFxuICAgICAgICB9LFxuXG4gICAgICAgIE9yZGVyQ29uZmlybWF0aW9uU2hpcHBpbmdDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IE9yZGVyQ29uZmlybWF0aW9uU2hpcHBpbmdDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbT3JkZXJDb25maXJtYXRpb25HdWFyZF0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgT3JkZXJDb25maXJtYXRpb25CaWxsaW5nQ29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlckRldGFpbEJpbGxpbmdDb21wb25lbnQsXG4gICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHByb3ZpZGU6IE9yZGVyRGV0YWlsc1NlcnZpY2UsXG4gICAgICAgICAgICAgIHVzZUV4aXN0aW5nOiBPcmRlckZhY2FkZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBndWFyZHM6IFtPcmRlckNvbmZpcm1hdGlvbkd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAge1xuICAgICAgcHJvdmlkZTogT3JkZXJDb25maXJtYXRpb25PcmRlckVudHJpZXNDb250ZXh0VG9rZW4sXG4gICAgICB1c2VFeGlzdGluZzogT3JkZXJDb25maXJtYXRpb25PcmRlckVudHJpZXNDb250ZXh0LFxuICAgIH0sXG4gICAgcHJvdmlkZU91dGxldCh7XG4gICAgICBpZDogT3JkZXJPdXRsZXRzLkNPTlNJR05NRU5UX0RFTElWRVJZX0lORk8sXG4gICAgICBjb21wb25lbnQ6IE9yZGVyQ29uZmlybWF0aW9uU2hpcHBpbmdDb21wb25lbnQsXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogWy4uLm9yZGVyQ29uZmlybWF0aW9uQ29tcG9uZW50c10sXG4gIGV4cG9ydHM6IFsuLi5vcmRlckNvbmZpcm1hdGlvbkNvbXBvbmVudHNdLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckNvbmZpcm1hdGlvbk1vZHVsZSB7fVxuIl19