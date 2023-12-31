/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { InjectionToken } from '@angular/core';
/**
 * @private We plan to drive the outlets by standard configuration
 */
export const PROVIDE_OUTLET_OPTIONS = new InjectionToken('PROVIDE_OUTLET_OPTIONS');
/**
 * Helper function to register a component for an outlet.
 *
 * @param options.id unique id of the outlet
 * @param options.component Component to be registered for the outlet
 * @param options.position Component's position in the outlet (default: `OutletPosition.AFTER`)
 */
export function provideOutlet(options) {
    return {
        provide: PROVIDE_OUTLET_OPTIONS,
        useValue: options,
        multi: true,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGV0LnByb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9vdXRsZXQvb3V0bGV0LnByb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLGNBQWMsRUFBd0IsTUFBTSxlQUFlLENBQUM7QUFHckU7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLGNBQWMsQ0FDdEQsd0JBQXdCLENBQ3pCLENBQUM7QUFtQkY7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FBQyxPQUE2QjtJQUN6RCxPQUFPO1FBQ0wsT0FBTyxFQUFFLHNCQUFzQjtRQUMvQixRQUFRLEVBQUUsT0FBTztRQUNqQixLQUFLLEVBQUUsSUFBSTtLQUNaLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4sIFN0YXRpY1Byb3ZpZGVyLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPdXRsZXRQb3NpdGlvbiB9IGZyb20gJy4vb3V0bGV0Lm1vZGVsJztcblxuLyoqXG4gKiBAcHJpdmF0ZSBXZSBwbGFuIHRvIGRyaXZlIHRoZSBvdXRsZXRzIGJ5IHN0YW5kYXJkIGNvbmZpZ3VyYXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IFBST1ZJREVfT1VUTEVUX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48UHJvdmlkZU91dGxldE9wdGlvbnM+KFxuICAnUFJPVklERV9PVVRMRVRfT1BUSU9OUydcbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvdmlkZU91dGxldE9wdGlvbnMge1xuICAvKipcbiAgICogIFVuaXF1ZSBpZCBvZiB0aGUgb3V0bGV0XG4gICAqL1xuICBpZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBDb21wb25lbnQgdG8gYmUgcmVnaXN0ZXJlZCBmb3IgdGhlIG91dGxldFxuICAgKi9cbiAgY29tcG9uZW50OiBUeXBlPGFueT47XG5cbiAgLyoqXG4gICAqIENvbXBvbmVudCdzIHBvc2l0aW9uIGluIHRoZSBvdXRsZXRcbiAgICovXG4gIHBvc2l0aW9uPzogT3V0bGV0UG9zaXRpb247XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHJlZ2lzdGVyIGEgY29tcG9uZW50IGZvciBhbiBvdXRsZXQuXG4gKlxuICogQHBhcmFtIG9wdGlvbnMuaWQgdW5pcXVlIGlkIG9mIHRoZSBvdXRsZXRcbiAqIEBwYXJhbSBvcHRpb25zLmNvbXBvbmVudCBDb21wb25lbnQgdG8gYmUgcmVnaXN0ZXJlZCBmb3IgdGhlIG91dGxldFxuICogQHBhcmFtIG9wdGlvbnMucG9zaXRpb24gQ29tcG9uZW50J3MgcG9zaXRpb24gaW4gdGhlIG91dGxldCAoZGVmYXVsdDogYE91dGxldFBvc2l0aW9uLkFGVEVSYClcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVPdXRsZXQob3B0aW9uczogUHJvdmlkZU91dGxldE9wdGlvbnMpOiBTdGF0aWNQcm92aWRlciB7XG4gIHJldHVybiB7XG4gICAgcHJvdmlkZTogUFJPVklERV9PVVRMRVRfT1BUSU9OUyxcbiAgICB1c2VWYWx1ZTogb3B0aW9ucyxcbiAgICBtdWx0aTogdHJ1ZSxcbiAgfTtcbn1cbiJdfQ==