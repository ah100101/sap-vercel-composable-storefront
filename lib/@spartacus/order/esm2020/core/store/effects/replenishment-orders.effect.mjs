/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { normalizeHttpError } from '@spartacus/core';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OrderActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../connectors/replenishment-order-history.connector";
export class ReplenishmentOrdersEffect {
    constructor(actions$, replenishmentOrderConnector) {
        this.actions$ = actions$;
        this.replenishmentOrderConnector = replenishmentOrderConnector;
        this.loadUserReplenishmentOrders$ = createEffect(() => this.actions$.pipe(ofType(OrderActions.LOAD_USER_REPLENISHMENT_ORDERS), map((action) => action.payload), switchMap((payload) => {
            return this.replenishmentOrderConnector
                .loadHistory(payload.userId, payload.pageSize, payload.currentPage, payload.sort)
                .pipe(map((orders) => {
                return new OrderActions.LoadUserReplenishmentOrdersSuccess(orders);
            }), catchError((error) => of(new OrderActions.LoadUserReplenishmentOrdersFail(normalizeHttpError(error)))));
        })));
    }
}
ReplenishmentOrdersEffect.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ReplenishmentOrdersEffect, deps: [{ token: i1.Actions }, { token: i2.ReplenishmentOrderHistoryConnector }], target: i0.ɵɵFactoryTarget.Injectable });
ReplenishmentOrdersEffect.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ReplenishmentOrdersEffect });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ReplenishmentOrdersEffect, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.ReplenishmentOrderHistoryConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGVuaXNobWVudC1vcmRlcnMuZWZmZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvcmUvc3RvcmUvZWZmZWN0cy9yZXBsZW5pc2htZW50LW9yZGVycy5lZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFXLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFckQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFHaEQsTUFBTSxPQUFPLHlCQUF5QjtJQWtDcEMsWUFDVSxRQUFpQixFQUNqQiwyQkFBK0Q7UUFEL0QsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixnQ0FBMkIsR0FBM0IsMkJBQTJCLENBQW9DO1FBbkN6RSxpQ0FBNEIsR0FDMUIsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEIsTUFBTSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQyxFQUNuRCxHQUFHLENBQ0QsQ0FBQyxNQUFnRCxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUNyRSxFQUNELFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLDJCQUEyQjtpQkFDcEMsV0FBVyxDQUNWLE9BQU8sQ0FBQyxNQUFNLEVBQ2QsT0FBTyxDQUFDLFFBQVEsRUFDaEIsT0FBTyxDQUFDLFdBQVcsRUFDbkIsT0FBTyxDQUFDLElBQUksQ0FDYjtpQkFDQSxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsTUFBOEIsRUFBRSxFQUFFO2dCQUNyQyxPQUFPLElBQUksWUFBWSxDQUFDLGtDQUFrQyxDQUN4RCxNQUFNLENBQ1AsQ0FBQztZQUNKLENBQUMsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQ25CLEVBQUUsQ0FDQSxJQUFJLFlBQVksQ0FBQywrQkFBK0IsQ0FDOUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQzFCLENBQ0YsQ0FDRixDQUNGLENBQUM7UUFDTixDQUFDLENBQUMsQ0FDSCxDQUNGLENBQUM7SUFLRCxDQUFDOztzSEFyQ08seUJBQXlCOzBIQUF6Qix5QkFBeUI7MkZBQXpCLHlCQUF5QjtrQkFEckMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbnMsIGNyZWF0ZUVmZmVjdCwgb2ZUeXBlIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBub3JtYWxpemVIdHRwRXJyb3IgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUmVwbGVuaXNobWVudE9yZGVyTGlzdCB9IGZyb20gJ0BzcGFydGFjdXMvb3JkZXIvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5Q29ubmVjdG9yIH0gZnJvbSAnLi4vLi4vY29ubmVjdG9ycy9yZXBsZW5pc2htZW50LW9yZGVyLWhpc3RvcnkuY29ubmVjdG9yJztcbmltcG9ydCB7IE9yZGVyQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVwbGVuaXNobWVudE9yZGVyc0VmZmVjdCB7XG4gIGxvYWRVc2VyUmVwbGVuaXNobWVudE9yZGVycyQ6IE9ic2VydmFibGU8T3JkZXJBY3Rpb25zLlVzZXJSZXBsZW5pc2htZW50T3JkZXJzQWN0aW9uPiA9XG4gICAgY3JlYXRlRWZmZWN0KCgpID0+XG4gICAgICB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gICAgICAgIG9mVHlwZShPcmRlckFjdGlvbnMuTE9BRF9VU0VSX1JFUExFTklTSE1FTlRfT1JERVJTKSxcbiAgICAgICAgbWFwKFxuICAgICAgICAgIChhY3Rpb246IE9yZGVyQWN0aW9ucy5Mb2FkVXNlclJlcGxlbmlzaG1lbnRPcmRlcnMpID0+IGFjdGlvbi5wYXlsb2FkXG4gICAgICAgICksXG4gICAgICAgIHN3aXRjaE1hcCgocGF5bG9hZCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlcGxlbmlzaG1lbnRPcmRlckNvbm5lY3RvclxuICAgICAgICAgICAgLmxvYWRIaXN0b3J5KFxuICAgICAgICAgICAgICBwYXlsb2FkLnVzZXJJZCxcbiAgICAgICAgICAgICAgcGF5bG9hZC5wYWdlU2l6ZSxcbiAgICAgICAgICAgICAgcGF5bG9hZC5jdXJyZW50UGFnZSxcbiAgICAgICAgICAgICAgcGF5bG9hZC5zb3J0XG4gICAgICAgICAgICApXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgbWFwKChvcmRlcnM6IFJlcGxlbmlzaG1lbnRPcmRlckxpc3QpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9yZGVyQWN0aW9ucy5Mb2FkVXNlclJlcGxlbmlzaG1lbnRPcmRlcnNTdWNjZXNzKFxuICAgICAgICAgICAgICAgICAgb3JkZXJzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PlxuICAgICAgICAgICAgICAgIG9mKFxuICAgICAgICAgICAgICAgICAgbmV3IE9yZGVyQWN0aW9ucy5Mb2FkVXNlclJlcGxlbmlzaG1lbnRPcmRlcnNGYWlsKFxuICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zJDogQWN0aW9ucyxcbiAgICBwcml2YXRlIHJlcGxlbmlzaG1lbnRPcmRlckNvbm5lY3RvcjogUmVwbGVuaXNobWVudE9yZGVySGlzdG9yeUNvbm5lY3RvclxuICApIHt9XG59XG4iXX0=