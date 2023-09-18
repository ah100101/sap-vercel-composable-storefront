/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CheckoutDeliveryAddressFacade, CheckoutDeliveryModesFacade, CheckoutPaymentFacade, CheckoutQueryFacade, } from '@spartacus/checkout/base/root';
import { CheckoutDeliveryAddressService } from './checkout-delivery-address.service';
import { CheckoutDeliveryModesService } from './checkout-delivery-modes.service';
import { CheckoutPaymentService } from './checkout-payment.service';
import { CheckoutQueryService } from './checkout-query.service';
export const facadeProviders = [
    CheckoutDeliveryAddressService,
    {
        provide: CheckoutDeliveryAddressFacade,
        useExisting: CheckoutDeliveryAddressService,
    },
    CheckoutDeliveryModesService,
    {
        provide: CheckoutDeliveryModesFacade,
        useExisting: CheckoutDeliveryModesService,
    },
    CheckoutPaymentService,
    {
        provide: CheckoutPaymentFacade,
        useExisting: CheckoutPaymentService,
    },
    CheckoutQueryService,
    {
        provide: CheckoutQueryFacade,
        useExisting: CheckoutQueryService,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjYWRlLXByb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jaGVja291dC9iYXNlL2NvcmUvZmFjYWRlL2ZhY2FkZS1wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUdILE9BQU8sRUFDTCw2QkFBNkIsRUFDN0IsMkJBQTJCLEVBQzNCLHFCQUFxQixFQUNyQixtQkFBbUIsR0FDcEIsTUFBTSwrQkFBK0IsQ0FBQztBQUN2QyxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNyRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRSxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQWU7SUFDekMsOEJBQThCO0lBQzlCO1FBQ0UsT0FBTyxFQUFFLDZCQUE2QjtRQUN0QyxXQUFXLEVBQUUsOEJBQThCO0tBQzVDO0lBQ0QsNEJBQTRCO0lBQzVCO1FBQ0UsT0FBTyxFQUFFLDJCQUEyQjtRQUNwQyxXQUFXLEVBQUUsNEJBQTRCO0tBQzFDO0lBQ0Qsc0JBQXNCO0lBQ3RCO1FBQ0UsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixXQUFXLEVBQUUsc0JBQXNCO0tBQ3BDO0lBQ0Qsb0JBQW9CO0lBQ3BCO1FBQ0UsT0FBTyxFQUFFLG1CQUFtQjtRQUM1QixXQUFXLEVBQUUsb0JBQW9CO0tBQ2xDO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0ZhY2FkZSxcbiAgQ2hlY2tvdXREZWxpdmVyeU1vZGVzRmFjYWRlLFxuICBDaGVja291dFBheW1lbnRGYWNhZGUsXG4gIENoZWNrb3V0UXVlcnlGYWNhZGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYmFzZS9yb290JztcbmltcG9ydCB7IENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzU2VydmljZSB9IGZyb20gJy4vY2hlY2tvdXQtZGVsaXZlcnktYWRkcmVzcy5zZXJ2aWNlJztcbmltcG9ydCB7IENoZWNrb3V0RGVsaXZlcnlNb2Rlc1NlcnZpY2UgfSBmcm9tICcuL2NoZWNrb3V0LWRlbGl2ZXJ5LW1vZGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2hlY2tvdXRQYXltZW50U2VydmljZSB9IGZyb20gJy4vY2hlY2tvdXQtcGF5bWVudC5zZXJ2aWNlJztcbmltcG9ydCB7IENoZWNrb3V0UXVlcnlTZXJ2aWNlIH0gZnJvbSAnLi9jaGVja291dC1xdWVyeS5zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IGZhY2FkZVByb3ZpZGVyczogUHJvdmlkZXJbXSA9IFtcbiAgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NTZXJ2aWNlLFxuICB7XG4gICAgcHJvdmlkZTogQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NGYWNhZGUsXG4gICAgdXNlRXhpc3Rpbmc6IENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzU2VydmljZSxcbiAgfSxcbiAgQ2hlY2tvdXREZWxpdmVyeU1vZGVzU2VydmljZSxcbiAge1xuICAgIHByb3ZpZGU6IENoZWNrb3V0RGVsaXZlcnlNb2Rlc0ZhY2FkZSxcbiAgICB1c2VFeGlzdGluZzogQ2hlY2tvdXREZWxpdmVyeU1vZGVzU2VydmljZSxcbiAgfSxcbiAgQ2hlY2tvdXRQYXltZW50U2VydmljZSxcbiAge1xuICAgIHByb3ZpZGU6IENoZWNrb3V0UGF5bWVudEZhY2FkZSxcbiAgICB1c2VFeGlzdGluZzogQ2hlY2tvdXRQYXltZW50U2VydmljZSxcbiAgfSxcbiAgQ2hlY2tvdXRRdWVyeVNlcnZpY2UsXG4gIHtcbiAgICBwcm92aWRlOiBDaGVja291dFF1ZXJ5RmFjYWRlLFxuICAgIHVzZUV4aXN0aW5nOiBDaGVja291dFF1ZXJ5U2VydmljZSxcbiAgfSxcbl07XG4iXX0=