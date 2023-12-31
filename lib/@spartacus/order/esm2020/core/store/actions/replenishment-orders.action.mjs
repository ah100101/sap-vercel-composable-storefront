/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { StateUtils } from '@spartacus/core';
import { REPLENISHMENT_ORDERS } from '../order-state';
export const LOAD_USER_REPLENISHMENT_ORDERS = '[Order] Load User Replenishment Orders';
export const LOAD_USER_REPLENISHMENT_ORDERS_FAIL = '[Order] Load User Replenishment Orders Fail';
export const LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS = '[Order] Load User Replenishment Orders Success';
export const CLEAR_USER_REPLENISHMENT_ORDERS = '[Order] Clear User Replenishment Orders';
export class LoadUserReplenishmentOrders extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(REPLENISHMENT_ORDERS);
        this.payload = payload;
        this.type = LOAD_USER_REPLENISHMENT_ORDERS;
    }
}
export class LoadUserReplenishmentOrdersFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(REPLENISHMENT_ORDERS, payload);
        this.payload = payload;
        this.type = LOAD_USER_REPLENISHMENT_ORDERS_FAIL;
    }
}
export class LoadUserReplenishmentOrdersSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(REPLENISHMENT_ORDERS);
        this.payload = payload;
        this.type = LOAD_USER_REPLENISHMENT_ORDERS_SUCCESS;
    }
}
export class ClearUserReplenishmentOrders extends StateUtils.LoaderResetAction {
    constructor() {
        super(REPLENISHMENT_ORDERS);
        this.type = CLEAR_USER_REPLENISHMENT_ORDERS;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGVuaXNobWVudC1vcmRlcnMuYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvcmUvc3RvcmUvYWN0aW9ucy9yZXBsZW5pc2htZW50LW9yZGVycy5hY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUU3QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0RCxNQUFNLENBQUMsTUFBTSw4QkFBOEIsR0FDekMsd0NBQXdDLENBQUM7QUFDM0MsTUFBTSxDQUFDLE1BQU0sbUNBQW1DLEdBQzlDLDZDQUE2QyxDQUFDO0FBQ2hELE1BQU0sQ0FBQyxNQUFNLHNDQUFzQyxHQUNqRCxnREFBZ0QsQ0FBQztBQUNuRCxNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FDMUMseUNBQXlDLENBQUM7QUFFNUMsTUFBTSxPQUFPLDJCQUE0QixTQUFRLFVBQVUsQ0FBQyxnQkFBZ0I7SUFFMUUsWUFDUyxPQUtOO1FBRUQsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFQckIsWUFBTyxHQUFQLE9BQU8sQ0FLYjtRQVBNLFNBQUksR0FBRyw4QkFBOEIsQ0FBQztJQVUvQyxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sK0JBQWdDLFNBQVEsVUFBVSxDQUFDLGdCQUFnQjtJQUU5RSxZQUFtQixPQUFZO1FBQzdCLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQURwQixZQUFPLEdBQVAsT0FBTyxDQUFLO1FBRHRCLFNBQUksR0FBRyxtQ0FBbUMsQ0FBQztJQUdwRCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sa0NBQW1DLFNBQVEsVUFBVSxDQUFDLG1CQUFtQjtJQUVwRixZQUFtQixPQUErQjtRQUNoRCxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQURYLFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBRHpDLFNBQUksR0FBRyxzQ0FBc0MsQ0FBQztJQUd2RCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sNEJBQTZCLFNBQVEsVUFBVSxDQUFDLGlCQUFpQjtJQUU1RTtRQUNFLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRnJCLFNBQUksR0FBRywrQkFBK0IsQ0FBQztJQUdoRCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBTdGF0ZVV0aWxzIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFJlcGxlbmlzaG1lbnRPcmRlckxpc3QgfSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgUkVQTEVOSVNITUVOVF9PUkRFUlMgfSBmcm9tICcuLi9vcmRlci1zdGF0ZSc7XG5cbmV4cG9ydCBjb25zdCBMT0FEX1VTRVJfUkVQTEVOSVNITUVOVF9PUkRFUlMgPVxuICAnW09yZGVyXSBMb2FkIFVzZXIgUmVwbGVuaXNobWVudCBPcmRlcnMnO1xuZXhwb3J0IGNvbnN0IExPQURfVVNFUl9SRVBMRU5JU0hNRU5UX09SREVSU19GQUlMID1cbiAgJ1tPcmRlcl0gTG9hZCBVc2VyIFJlcGxlbmlzaG1lbnQgT3JkZXJzIEZhaWwnO1xuZXhwb3J0IGNvbnN0IExPQURfVVNFUl9SRVBMRU5JU0hNRU5UX09SREVSU19TVUNDRVNTID1cbiAgJ1tPcmRlcl0gTG9hZCBVc2VyIFJlcGxlbmlzaG1lbnQgT3JkZXJzIFN1Y2Nlc3MnO1xuZXhwb3J0IGNvbnN0IENMRUFSX1VTRVJfUkVQTEVOSVNITUVOVF9PUkRFUlMgPVxuICAnW09yZGVyXSBDbGVhciBVc2VyIFJlcGxlbmlzaG1lbnQgT3JkZXJzJztcblxuZXhwb3J0IGNsYXNzIExvYWRVc2VyUmVwbGVuaXNobWVudE9yZGVycyBleHRlbmRzIFN0YXRlVXRpbHMuTG9hZGVyTG9hZEFjdGlvbiB7XG4gIHJlYWRvbmx5IHR5cGUgPSBMT0FEX1VTRVJfUkVQTEVOSVNITUVOVF9PUkRFUlM7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBwYXlsb2FkOiB7XG4gICAgICB1c2VySWQ6IHN0cmluZztcbiAgICAgIHBhZ2VTaXplPzogbnVtYmVyO1xuICAgICAgY3VycmVudFBhZ2U/OiBudW1iZXI7XG4gICAgICBzb3J0Pzogc3RyaW5nO1xuICAgIH1cbiAgKSB7XG4gICAgc3VwZXIoUkVQTEVOSVNITUVOVF9PUkRFUlMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkVXNlclJlcGxlbmlzaG1lbnRPcmRlcnNGYWlsIGV4dGVuZHMgU3RhdGVVdGlscy5Mb2FkZXJGYWlsQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZSA9IExPQURfVVNFUl9SRVBMRU5JU0hNRU5UX09SREVSU19GQUlMO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogYW55KSB7XG4gICAgc3VwZXIoUkVQTEVOSVNITUVOVF9PUkRFUlMsIHBheWxvYWQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkVXNlclJlcGxlbmlzaG1lbnRPcmRlcnNTdWNjZXNzIGV4dGVuZHMgU3RhdGVVdGlscy5Mb2FkZXJTdWNjZXNzQWN0aW9uIHtcbiAgcmVhZG9ubHkgdHlwZSA9IExPQURfVVNFUl9SRVBMRU5JU0hNRU5UX09SREVSU19TVUNDRVNTO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcGF5bG9hZDogUmVwbGVuaXNobWVudE9yZGVyTGlzdCkge1xuICAgIHN1cGVyKFJFUExFTklTSE1FTlRfT1JERVJTKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2xlYXJVc2VyUmVwbGVuaXNobWVudE9yZGVycyBleHRlbmRzIFN0YXRlVXRpbHMuTG9hZGVyUmVzZXRBY3Rpb24ge1xuICByZWFkb25seSB0eXBlID0gQ0xFQVJfVVNFUl9SRVBMRU5JU0hNRU5UX09SREVSUztcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoUkVQTEVOSVNITUVOVF9PUkRFUlMpO1xuICB9XG59XG5cbmV4cG9ydCB0eXBlIFVzZXJSZXBsZW5pc2htZW50T3JkZXJzQWN0aW9uID1cbiAgfCBMb2FkVXNlclJlcGxlbmlzaG1lbnRPcmRlcnNcbiAgfCBMb2FkVXNlclJlcGxlbmlzaG1lbnRPcmRlcnNGYWlsXG4gIHwgTG9hZFVzZXJSZXBsZW5pc2htZW50T3JkZXJzU3VjY2Vzc1xuICB8IENsZWFyVXNlclJlcGxlbmlzaG1lbnRPcmRlcnM7XG4iXX0=