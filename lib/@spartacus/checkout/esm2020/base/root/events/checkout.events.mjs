/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CxEvent } from '@spartacus/core';
/**
 * Emit this event to force checkout details reload
 */
export class CheckoutQueryReloadEvent extends CxEvent {
}
/**
 * Event's type
 */
CheckoutQueryReloadEvent.type = 'CheckoutQueryReloadEvent';
/**
 * Emit this event to force checkout details reset
 */
export class CheckoutQueryResetEvent extends CxEvent {
}
/**
 * Event's type
 */
CheckoutQueryResetEvent.type = 'CheckoutQueryResetEvent';
/**
 * An abstract event for all the checkout events.
 */
export class CheckoutEvent extends CxEvent {
}
/**
 * An abstract event for all the delivery address related events.
 */
export class CheckoutDeliveryAddressEvent extends CheckoutEvent {
}
/**
 * Fired when the delivery address is create cleared.
 */
export class CheckoutDeliveryAddressCreatedEvent extends CheckoutDeliveryAddressEvent {
}
/**
 * Event's type
 */
CheckoutDeliveryAddressCreatedEvent.type = 'CheckoutDeliveryAddressCreatedEvent';
/**
 * Fired when the user sets a delivery address during checkout.
 */
export class CheckoutDeliveryAddressSetEvent extends CheckoutDeliveryAddressEvent {
}
/**
 * Event's type
 */
CheckoutDeliveryAddressSetEvent.type = 'CheckoutDeliveryAddressSetEvent';
/**
 * Fired when the delivery address has to be cleared.
 */
export class CheckoutDeliveryAddressClearedEvent extends CheckoutDeliveryAddressEvent {
}
/**
 * Event's type
 */
CheckoutDeliveryAddressClearedEvent.type = 'CheckoutDeliveryAddressClearedEvent';
/**
 * An abstract event for all the delivery mode related events.
 */
export class CheckoutDeliveryModeEvent extends CheckoutEvent {
}
/**
 * Fired when the delivery mode was set.
 */
export class CheckoutDeliveryModeSetEvent extends CheckoutDeliveryModeEvent {
}
/**
 * Event's type
 */
CheckoutDeliveryModeSetEvent.type = 'CheckoutDeliveryModeSetEvent';
/**
 * Fired when the delivery mode has been cleared.
 */
export class CheckoutDeliveryModeClearedEvent extends CheckoutDeliveryModeEvent {
}
/**
 * Event's type
 */
CheckoutDeliveryModeClearedEvent.type = 'CheckoutDeliveryModeClearedEvent';
/**
 * Fired when the delivery mode has an error when trying to be cleared.
 */
export class CheckoutDeliveryModeClearedErrorEvent extends CheckoutDeliveryModeEvent {
}
/**
 * Event's type
 */
CheckoutDeliveryModeClearedErrorEvent.type = 'CheckoutDeliveryModeClearedErrorEvent';
/**
 * Emit this event to force delivery modes reload
 */
export class CheckoutSupportedDeliveryModesQueryReloadEvent extends CheckoutDeliveryModeEvent {
}
/**
 * Event's type
 */
CheckoutSupportedDeliveryModesQueryReloadEvent.type = 'CheckoutSupportedDeliveryModesQueryReloadEvent';
/**
 * Emit this event to force delivery modes reset
 */
export class CheckoutSupportedDeliveryModesQueryResetEvent extends CheckoutDeliveryModeEvent {
}
/**
 * Event's type
 */
CheckoutSupportedDeliveryModesQueryResetEvent.type = 'CheckoutSupportedDeliveryModesQueryResetEvent';
/**
 * An abstract event for all the payment details related events.
 */
export class CheckoutPaymentDetailsEvent extends CheckoutEvent {
}
/**
 * Fired when the payment details have been created.
 */
export class CheckoutPaymentDetailsCreatedEvent extends CheckoutPaymentDetailsEvent {
}
/**
 * Event's type
 */
CheckoutPaymentDetailsCreatedEvent.type = 'CheckoutPaymentDetailsCreatedEvent';
/**
 * Fired when the payment details have been set.
 */
export class CheckoutPaymentDetailsSetEvent extends CheckoutPaymentDetailsEvent {
}
/**
 * Event's type
 */
CheckoutPaymentDetailsSetEvent.type = 'CheckoutPaymentDetailsSetEvent';
/**
 * Emit this event to force payment card types reload
 */
export class CheckoutPaymentCardTypesQueryReloadEvent extends CheckoutPaymentDetailsEvent {
}
/**
 * Event's type
 */
CheckoutPaymentCardTypesQueryReloadEvent.type = 'CheckoutPaymentCardTypesQueryReloadEvent';
/**
 * Emit this event to force payment card types reset
 */
export class CheckoutPaymentCardTypesQueryResetEvent extends CheckoutPaymentDetailsEvent {
}
/**
 * Event's type
 */
CheckoutPaymentCardTypesQueryResetEvent.type = 'CheckoutPaymentCardTypesQueryResetEvent';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NoZWNrb3V0L2Jhc2Uvcm9vdC9ldmVudHMvY2hlY2tvdXQuZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFHSCxPQUFPLEVBQVcsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFbkQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsT0FBTzs7QUFDbkQ7O0dBRUc7QUFDYSw2QkFBSSxHQUFHLDBCQUEwQixDQUFDO0FBR3BEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLHVCQUF3QixTQUFRLE9BQU87O0FBQ2xEOztHQUVHO0FBQ2EsNEJBQUksR0FBRyx5QkFBeUIsQ0FBQztBQUduRDs7R0FFRztBQUNILE1BQU0sT0FBZ0IsYUFBYyxTQUFRLE9BQU87Q0FnQmxEO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLE9BQWdCLDRCQUE2QixTQUFRLGFBQWE7Q0FBRztBQUUzRTs7R0FFRztBQUNILE1BQU0sT0FBTyxtQ0FBb0MsU0FBUSw0QkFBNEI7O0FBQ25GOztHQUVHO0FBQ2Esd0NBQUksR0FBRyxxQ0FBcUMsQ0FBQztBQU8vRDs7R0FFRztBQUNILE1BQU0sT0FBTywrQkFBZ0MsU0FBUSw0QkFBNEI7O0FBQy9FOztHQUVHO0FBQ2Esb0NBQUksR0FBRyxpQ0FBaUMsQ0FBQztBQU8zRDs7R0FFRztBQUNILE1BQU0sT0FBTyxtQ0FBb0MsU0FBUSw0QkFBNEI7O0FBQ25GOztHQUVHO0FBQ2Esd0NBQUksR0FBRyxxQ0FBcUMsQ0FBQztBQUcvRDs7R0FFRztBQUNILE1BQU0sT0FBZ0IseUJBQTBCLFNBQVEsYUFBYTtDQUFHO0FBRXhFOztHQUVHO0FBQ0gsTUFBTSxPQUFPLDRCQUE2QixTQUFRLHlCQUF5Qjs7QUFDekU7O0dBRUc7QUFDYSxpQ0FBSSxHQUFHLDhCQUE4QixDQUFDO0FBT3hEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLGdDQUFpQyxTQUFRLHlCQUF5Qjs7QUFDN0U7O0dBRUc7QUFDYSxxQ0FBSSxHQUFHLGtDQUFrQyxDQUFDO0FBRzVEOztHQUVHO0FBQ0gsTUFBTSxPQUFPLHFDQUFzQyxTQUFRLHlCQUF5Qjs7QUFDbEY7O0dBRUc7QUFDYSwwQ0FBSSxHQUFHLHVDQUF1QyxDQUFDO0FBR2pFOztHQUVHO0FBQ0gsTUFBTSxPQUFPLDhDQUErQyxTQUFRLHlCQUF5Qjs7QUFDM0Y7O0dBRUc7QUFDYSxtREFBSSxHQUFHLGdEQUFnRCxDQUFDO0FBRzFFOztHQUVHO0FBQ0gsTUFBTSxPQUFPLDZDQUE4QyxTQUFRLHlCQUF5Qjs7QUFDMUY7O0dBRUc7QUFDYSxrREFBSSxHQUFHLCtDQUErQyxDQUFDO0FBR3pFOztHQUVHO0FBQ0gsTUFBTSxPQUFnQiwyQkFBNEIsU0FBUSxhQUFhO0NBQUc7QUFFMUU7O0dBRUc7QUFDSCxNQUFNLE9BQU8sa0NBQW1DLFNBQVEsMkJBQTJCOztBQUNqRjs7R0FFRztBQUNhLHVDQUFJLEdBQUcsb0NBQW9DLENBQUM7QUFPOUQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sOEJBQStCLFNBQVEsMkJBQTJCOztBQUM3RTs7R0FFRztBQUNhLG1DQUFJLEdBQUcsZ0NBQWdDLENBQUM7QUFPMUQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sd0NBQXlDLFNBQVEsMkJBQTJCOztBQUN2Rjs7R0FFRztBQUNhLDZDQUFJLEdBQUcsMENBQTBDLENBQUM7QUFHcEU7O0dBRUc7QUFDSCxNQUFNLE9BQU8sdUNBQXdDLFNBQVEsMkJBQTJCOztBQUN0Rjs7R0FFRztBQUNhLDRDQUFJLEdBQUcseUNBQXlDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBQYXltZW50RGV0YWlscyB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgQWRkcmVzcywgQ3hFdmVudCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbi8qKlxuICogRW1pdCB0aGlzIGV2ZW50IHRvIGZvcmNlIGNoZWNrb3V0IGRldGFpbHMgcmVsb2FkXG4gKi9cbmV4cG9ydCBjbGFzcyBDaGVja291dFF1ZXJ5UmVsb2FkRXZlbnQgZXh0ZW5kcyBDeEV2ZW50IHtcbiAgLyoqXG4gICAqIEV2ZW50J3MgdHlwZVxuICAgKi9cbiAgc3RhdGljIHJlYWRvbmx5IHR5cGUgPSAnQ2hlY2tvdXRRdWVyeVJlbG9hZEV2ZW50Jztcbn1cblxuLyoqXG4gKiBFbWl0IHRoaXMgZXZlbnQgdG8gZm9yY2UgY2hlY2tvdXQgZGV0YWlscyByZXNldFxuICovXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRRdWVyeVJlc2V0RXZlbnQgZXh0ZW5kcyBDeEV2ZW50IHtcbiAgLyoqXG4gICAqIEV2ZW50J3MgdHlwZVxuICAgKi9cbiAgc3RhdGljIHJlYWRvbmx5IHR5cGUgPSAnQ2hlY2tvdXRRdWVyeVJlc2V0RXZlbnQnO1xufVxuXG4vKipcbiAqIEFuIGFic3RyYWN0IGV2ZW50IGZvciBhbGwgdGhlIGNoZWNrb3V0IGV2ZW50cy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENoZWNrb3V0RXZlbnQgZXh0ZW5kcyBDeEV2ZW50IHtcbiAgdXNlcklkPzogc3RyaW5nO1xuICAvKipcbiAgICogVXN1YWxseSBzZXQgdmlhIGBnZXRDYXJ0SWRCeVVzZXJJZCgpYCB1dGlsIG1ldGhvZCxcbiAgICogSXQgaXMgYW4gYWJzdHJhY3Rpb24gb3ZlciB0aGUgZGlmZmVyZW50IHByb3BlcnRpZXNcbiAgICogdXNlZCBmb3IgYW5vbnltb3VzIGFuZCBsb2dnZWQtaW4gdXNlcnMnIGNhcnRzOlxuICAgKiAtIGBjb2RlYCBmb3IgbG9nZ2VkLWluIHVzZXJzXG4gICAqIC0gYGd1aWRgIGZvciBhbm9ueW1vdXMgdXNlcnNcbiAgICovXG4gIGNhcnRJZD86IHN0cmluZztcbiAgLyoqXG4gICAqIEFsbCBjYXJ0cyBoYXZlIHRoZSBgY29kZWAgcHJvcGVydHkgYXNzaWduZWQgdG8gdGhlbSxcbiAgICogcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZXkgYXJlIGFub255bW91cyBvciBsb2dnZWQtaW4uXG4gICAqIEluIGNhc2Ugb2YgbG9nZ2VkLWluIHVzZXJzLCB0aGUgYGNhcnRDb2RlYCBhbmQgYGNhcnRJZGAgYXJlIHRoZSBzYW1lLlxuICAgKi9cbiAgY2FydENvZGU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgZXZlbnQgZm9yIGFsbCB0aGUgZGVsaXZlcnkgYWRkcmVzcyByZWxhdGVkIGV2ZW50cy5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzRXZlbnQgZXh0ZW5kcyBDaGVja291dEV2ZW50IHt9XG5cbi8qKlxuICogRmlyZWQgd2hlbiB0aGUgZGVsaXZlcnkgYWRkcmVzcyBpcyBjcmVhdGUgY2xlYXJlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQ3JlYXRlZEV2ZW50IGV4dGVuZHMgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NFdmVudCB7XG4gIC8qKlxuICAgKiBFdmVudCdzIHR5cGVcbiAgICovXG4gIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ0NoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQ3JlYXRlZEV2ZW50JztcbiAgLyoqXG4gICAqIFRoZSBhZGRyZXNzLlxuICAgKi9cbiAgYWRkcmVzczogQWRkcmVzcztcbn1cblxuLyoqXG4gKiBGaXJlZCB3aGVuIHRoZSB1c2VyIHNldHMgYSBkZWxpdmVyeSBhZGRyZXNzIGR1cmluZyBjaGVja291dC5cbiAqL1xuZXhwb3J0IGNsYXNzIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzU2V0RXZlbnQgZXh0ZW5kcyBDaGVja291dERlbGl2ZXJ5QWRkcmVzc0V2ZW50IHtcbiAgLyoqXG4gICAqIEV2ZW50J3MgdHlwZVxuICAgKi9cbiAgc3RhdGljIHJlYWRvbmx5IHR5cGUgPSAnQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NTZXRFdmVudCc7XG4gIC8qKlxuICAgKiBUaGUgYWRkcmVzcy5cbiAgICovXG4gIGFkZHJlc3M6IEFkZHJlc3M7XG59XG5cbi8qKlxuICogRmlyZWQgd2hlbiB0aGUgZGVsaXZlcnkgYWRkcmVzcyBoYXMgdG8gYmUgY2xlYXJlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIENoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQ2xlYXJlZEV2ZW50IGV4dGVuZHMgQ2hlY2tvdXREZWxpdmVyeUFkZHJlc3NFdmVudCB7XG4gIC8qKlxuICAgKiBFdmVudCdzIHR5cGVcbiAgICovXG4gIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ0NoZWNrb3V0RGVsaXZlcnlBZGRyZXNzQ2xlYXJlZEV2ZW50Jztcbn1cblxuLyoqXG4gKiBBbiBhYnN0cmFjdCBldmVudCBmb3IgYWxsIHRoZSBkZWxpdmVyeSBtb2RlIHJlbGF0ZWQgZXZlbnRzLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2hlY2tvdXREZWxpdmVyeU1vZGVFdmVudCBleHRlbmRzIENoZWNrb3V0RXZlbnQge31cblxuLyoqXG4gKiBGaXJlZCB3aGVuIHRoZSBkZWxpdmVyeSBtb2RlIHdhcyBzZXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBDaGVja291dERlbGl2ZXJ5TW9kZVNldEV2ZW50IGV4dGVuZHMgQ2hlY2tvdXREZWxpdmVyeU1vZGVFdmVudCB7XG4gIC8qKlxuICAgKiBFdmVudCdzIHR5cGVcbiAgICovXG4gIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ0NoZWNrb3V0RGVsaXZlcnlNb2RlU2V0RXZlbnQnO1xuICAvKipcbiAgICogRGVsaXZlcnkgbW9kZSBjb2RlLlxuICAgKi9cbiAgZGVsaXZlcnlNb2RlQ29kZTogc3RyaW5nO1xufVxuXG4vKipcbiAqIEZpcmVkIHdoZW4gdGhlIGRlbGl2ZXJ5IG1vZGUgaGFzIGJlZW4gY2xlYXJlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIENoZWNrb3V0RGVsaXZlcnlNb2RlQ2xlYXJlZEV2ZW50IGV4dGVuZHMgQ2hlY2tvdXREZWxpdmVyeU1vZGVFdmVudCB7XG4gIC8qKlxuICAgKiBFdmVudCdzIHR5cGVcbiAgICovXG4gIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ0NoZWNrb3V0RGVsaXZlcnlNb2RlQ2xlYXJlZEV2ZW50Jztcbn1cblxuLyoqXG4gKiBGaXJlZCB3aGVuIHRoZSBkZWxpdmVyeSBtb2RlIGhhcyBhbiBlcnJvciB3aGVuIHRyeWluZyB0byBiZSBjbGVhcmVkLlxuICovXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXREZWxpdmVyeU1vZGVDbGVhcmVkRXJyb3JFdmVudCBleHRlbmRzIENoZWNrb3V0RGVsaXZlcnlNb2RlRXZlbnQge1xuICAvKipcbiAgICogRXZlbnQncyB0eXBlXG4gICAqL1xuICBzdGF0aWMgcmVhZG9ubHkgdHlwZSA9ICdDaGVja291dERlbGl2ZXJ5TW9kZUNsZWFyZWRFcnJvckV2ZW50Jztcbn1cblxuLyoqXG4gKiBFbWl0IHRoaXMgZXZlbnQgdG8gZm9yY2UgZGVsaXZlcnkgbW9kZXMgcmVsb2FkXG4gKi9cbmV4cG9ydCBjbGFzcyBDaGVja291dFN1cHBvcnRlZERlbGl2ZXJ5TW9kZXNRdWVyeVJlbG9hZEV2ZW50IGV4dGVuZHMgQ2hlY2tvdXREZWxpdmVyeU1vZGVFdmVudCB7XG4gIC8qKlxuICAgKiBFdmVudCdzIHR5cGVcbiAgICovXG4gIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ0NoZWNrb3V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVsb2FkRXZlbnQnO1xufVxuXG4vKipcbiAqIEVtaXQgdGhpcyBldmVudCB0byBmb3JjZSBkZWxpdmVyeSBtb2RlcyByZXNldFxuICovXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRTdXBwb3J0ZWREZWxpdmVyeU1vZGVzUXVlcnlSZXNldEV2ZW50IGV4dGVuZHMgQ2hlY2tvdXREZWxpdmVyeU1vZGVFdmVudCB7XG4gIC8qKlxuICAgKiBFdmVudCdzIHR5cGVcbiAgICovXG4gIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ0NoZWNrb3V0U3VwcG9ydGVkRGVsaXZlcnlNb2Rlc1F1ZXJ5UmVzZXRFdmVudCc7XG59XG5cbi8qKlxuICogQW4gYWJzdHJhY3QgZXZlbnQgZm9yIGFsbCB0aGUgcGF5bWVudCBkZXRhaWxzIHJlbGF0ZWQgZXZlbnRzLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ2hlY2tvdXRQYXltZW50RGV0YWlsc0V2ZW50IGV4dGVuZHMgQ2hlY2tvdXRFdmVudCB7fVxuXG4vKipcbiAqIEZpcmVkIHdoZW4gdGhlIHBheW1lbnQgZGV0YWlscyBoYXZlIGJlZW4gY3JlYXRlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIENoZWNrb3V0UGF5bWVudERldGFpbHNDcmVhdGVkRXZlbnQgZXh0ZW5kcyBDaGVja291dFBheW1lbnREZXRhaWxzRXZlbnQge1xuICAvKipcbiAgICogRXZlbnQncyB0eXBlXG4gICAqL1xuICBzdGF0aWMgcmVhZG9ubHkgdHlwZSA9ICdDaGVja291dFBheW1lbnREZXRhaWxzQ3JlYXRlZEV2ZW50JztcbiAgLyoqXG4gICAqIFBheW1lbnQgZGV0YWlsc1xuICAgKi9cbiAgcGF5bWVudERldGFpbHM6IFBheW1lbnREZXRhaWxzO1xufVxuXG4vKipcbiAqIEZpcmVkIHdoZW4gdGhlIHBheW1lbnQgZGV0YWlscyBoYXZlIGJlZW4gc2V0LlxuICovXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRQYXltZW50RGV0YWlsc1NldEV2ZW50IGV4dGVuZHMgQ2hlY2tvdXRQYXltZW50RGV0YWlsc0V2ZW50IHtcbiAgLyoqXG4gICAqIEV2ZW50J3MgdHlwZVxuICAgKi9cbiAgc3RhdGljIHJlYWRvbmx5IHR5cGUgPSAnQ2hlY2tvdXRQYXltZW50RGV0YWlsc1NldEV2ZW50JztcbiAgLyoqXG4gICAqIFBheW1lbnQgZGV0YWlscyBpZFxuICAgKi9cbiAgcGF5bWVudERldGFpbHNJZDogc3RyaW5nO1xufVxuXG4vKipcbiAqIEVtaXQgdGhpcyBldmVudCB0byBmb3JjZSBwYXltZW50IGNhcmQgdHlwZXMgcmVsb2FkXG4gKi9cbmV4cG9ydCBjbGFzcyBDaGVja291dFBheW1lbnRDYXJkVHlwZXNRdWVyeVJlbG9hZEV2ZW50IGV4dGVuZHMgQ2hlY2tvdXRQYXltZW50RGV0YWlsc0V2ZW50IHtcbiAgLyoqXG4gICAqIEV2ZW50J3MgdHlwZVxuICAgKi9cbiAgc3RhdGljIHJlYWRvbmx5IHR5cGUgPSAnQ2hlY2tvdXRQYXltZW50Q2FyZFR5cGVzUXVlcnlSZWxvYWRFdmVudCc7XG59XG5cbi8qKlxuICogRW1pdCB0aGlzIGV2ZW50IHRvIGZvcmNlIHBheW1lbnQgY2FyZCB0eXBlcyByZXNldFxuICovXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRQYXltZW50Q2FyZFR5cGVzUXVlcnlSZXNldEV2ZW50IGV4dGVuZHMgQ2hlY2tvdXRQYXltZW50RGV0YWlsc0V2ZW50IHtcbiAgLyoqXG4gICAqIEV2ZW50J3MgdHlwZVxuICAgKi9cbiAgc3RhdGljIHJlYWRvbmx5IHR5cGUgPSAnQ2hlY2tvdXRQYXltZW50Q2FyZFR5cGVzUXVlcnlSZXNldEV2ZW50Jztcbn1cbiJdfQ==