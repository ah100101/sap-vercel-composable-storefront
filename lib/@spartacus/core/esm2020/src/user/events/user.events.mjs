/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CxEvent } from '../../event/cx-event';
export class UserAddressEvent extends CxEvent {
}
export class UpdateUserAddressEvent extends UserAddressEvent {
}
UpdateUserAddressEvent.type = 'UpdateUserAddressEvent';
export class DeleteUserAddressEvent extends UserAddressEvent {
}
DeleteUserAddressEvent.type = 'DeleteUserAddressEvent';
export class AddUserAddressEvent extends UserAddressEvent {
}
AddUserAddressEvent.type = 'AddUserAddressEvent';
export class LoadUserAddressesEvent extends UserAddressEvent {
}
LoadUserAddressesEvent.type = 'LoadUserAddressesEvent';
export class LoadUserPaymentMethodsEvent extends UserAddressEvent {
}
LoadUserPaymentMethodsEvent.type = 'LoadUserPaymentMethodsEvent';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5ldmVudHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy91c2VyL2V2ZW50cy91c2VyLmV2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRy9DLE1BQU0sT0FBZ0IsZ0JBQWlCLFNBQVEsT0FBTztDQUVyRDtBQUVELE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxnQkFBZ0I7O0FBQzFDLDJCQUFJLEdBQUcsd0JBQXdCLENBQUM7QUFLbEQsTUFBTSxPQUFPLHNCQUF1QixTQUFRLGdCQUFnQjs7QUFDMUMsMkJBQUksR0FBRyx3QkFBd0IsQ0FBQztBQUlsRCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsZ0JBQWdCOztBQUN2Qyx3QkFBSSxHQUFHLHFCQUFxQixDQUFDO0FBSS9DLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxnQkFBZ0I7O0FBQzFDLDJCQUFJLEdBQUcsd0JBQXdCLENBQUM7QUFHbEQsTUFBTSxPQUFPLDJCQUE0QixTQUFRLGdCQUFnQjs7QUFDL0MsZ0NBQUksR0FBRyw2QkFBNkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEN4RXZlbnQgfSBmcm9tICcuLi8uLi9ldmVudC9jeC1ldmVudCc7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSAnLi4vLi4vbW9kZWwvYWRkcmVzcy5tb2RlbCc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVc2VyQWRkcmVzc0V2ZW50IGV4dGVuZHMgQ3hFdmVudCB7XG4gIHVzZXJJZDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgVXBkYXRlVXNlckFkZHJlc3NFdmVudCBleHRlbmRzIFVzZXJBZGRyZXNzRXZlbnQge1xuICBzdGF0aWMgcmVhZG9ubHkgdHlwZSA9ICdVcGRhdGVVc2VyQWRkcmVzc0V2ZW50JztcbiAgYWRkcmVzc0lkOiBzdHJpbmc7XG4gIGFkZHJlc3M6IEFkZHJlc3M7XG59XG5cbmV4cG9ydCBjbGFzcyBEZWxldGVVc2VyQWRkcmVzc0V2ZW50IGV4dGVuZHMgVXNlckFkZHJlc3NFdmVudCB7XG4gIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ0RlbGV0ZVVzZXJBZGRyZXNzRXZlbnQnO1xuICBhZGRyZXNzSWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIEFkZFVzZXJBZGRyZXNzRXZlbnQgZXh0ZW5kcyBVc2VyQWRkcmVzc0V2ZW50IHtcbiAgc3RhdGljIHJlYWRvbmx5IHR5cGUgPSAnQWRkVXNlckFkZHJlc3NFdmVudCc7XG4gIGFkZHJlc3M6IEFkZHJlc3M7XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkVXNlckFkZHJlc3Nlc0V2ZW50IGV4dGVuZHMgVXNlckFkZHJlc3NFdmVudCB7XG4gIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ0xvYWRVc2VyQWRkcmVzc2VzRXZlbnQnO1xufVxuXG5leHBvcnQgY2xhc3MgTG9hZFVzZXJQYXltZW50TWV0aG9kc0V2ZW50IGV4dGVuZHMgVXNlckFkZHJlc3NFdmVudCB7XG4gIHN0YXRpYyByZWFkb25seSB0eXBlID0gJ0xvYWRVc2VyUGF5bWVudE1ldGhvZHNFdmVudCc7XG59XG4iXX0=