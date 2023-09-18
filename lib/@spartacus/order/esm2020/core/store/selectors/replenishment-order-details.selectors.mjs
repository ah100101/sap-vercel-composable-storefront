/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { createSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { getOrderState } from './feature.selector';
export const getReplenishmentOrderState = createSelector(getOrderState, (state) => state.replenishmentOrder);
export const getReplenishmentOrderDetailsValue = createSelector(getReplenishmentOrderState, (state) => StateUtils.loaderValueSelector(state));
export const getReplenishmentOrderDetailsLoading = createSelector(getReplenishmentOrderState, (state) => StateUtils.loaderLoadingSelector(state));
export const getReplenishmentOrderDetailsSuccess = createSelector(getReplenishmentOrderState, (state) => StateUtils.loaderSuccessSelector(state));
export const getReplenishmentOrderDetailsError = createSelector(getReplenishmentOrderState, (state) => StateUtils.loaderErrorSelector(state));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGVuaXNobWVudC1vcmRlci1kZXRhaWxzLnNlbGVjdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9jb3JlL3N0b3JlL3NlbGVjdG9ycy9yZXBsZW5pc2htZW50LW9yZGVyLWRldGFpbHMuc2VsZWN0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsY0FBYyxFQUFvQixNQUFNLGFBQWEsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHN0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRW5ELE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUduQyxjQUFjLENBQ2hCLGFBQWEsRUFDYixDQUFDLEtBQWlCLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FDaEQsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGlDQUFpQyxHQUcxQyxjQUFjLENBQ2hCLDBCQUEwQixFQUMxQixDQUFDLEtBQWlELEVBQUUsRUFBRSxDQUNwRCxVQUFVLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQ3hDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxtQ0FBbUMsR0FHNUMsY0FBYyxDQUNoQiwwQkFBMEIsRUFDMUIsQ0FBQyxLQUFpRCxFQUFFLEVBQUUsQ0FDcEQsVUFBVSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUMxQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sbUNBQW1DLEdBRzVDLGNBQWMsQ0FDaEIsMEJBQTBCLEVBQzFCLENBQUMsS0FBaUQsRUFBRSxFQUFFLENBQ3BELFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FDMUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGlDQUFpQyxHQUcxQyxjQUFjLENBQ2hCLDBCQUEwQixFQUMxQixDQUFDLEtBQWlELEVBQUUsRUFBRSxDQUNwRCxVQUFVLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQ3hDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVTZWxlY3RvciwgTWVtb2l6ZWRTZWxlY3RvciB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IFN0YXRlVXRpbHMgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUmVwbGVuaXNobWVudE9yZGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IE9yZGVyU3RhdGUsIFN0YXRlV2l0aE9yZGVyIH0gZnJvbSAnLi4vb3JkZXItc3RhdGUnO1xuaW1wb3J0IHsgZ2V0T3JkZXJTdGF0ZSB9IGZyb20gJy4vZmVhdHVyZS5zZWxlY3Rvcic7XG5cbmV4cG9ydCBjb25zdCBnZXRSZXBsZW5pc2htZW50T3JkZXJTdGF0ZTogTWVtb2l6ZWRTZWxlY3RvcjxcbiAgU3RhdGVXaXRoT3JkZXIsXG4gIFN0YXRlVXRpbHMuTG9hZGVyU3RhdGU8UmVwbGVuaXNobWVudE9yZGVyPlxuPiA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRPcmRlclN0YXRlLFxuICAoc3RhdGU6IE9yZGVyU3RhdGUpID0+IHN0YXRlLnJlcGxlbmlzaG1lbnRPcmRlclxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFJlcGxlbmlzaG1lbnRPcmRlckRldGFpbHNWYWx1ZTogTWVtb2l6ZWRTZWxlY3RvcjxcbiAgU3RhdGVXaXRoT3JkZXIsXG4gIFJlcGxlbmlzaG1lbnRPcmRlclxuPiA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRSZXBsZW5pc2htZW50T3JkZXJTdGF0ZSxcbiAgKHN0YXRlOiBTdGF0ZVV0aWxzLkxvYWRlclN0YXRlPFJlcGxlbmlzaG1lbnRPcmRlcj4pID0+XG4gICAgU3RhdGVVdGlscy5sb2FkZXJWYWx1ZVNlbGVjdG9yKHN0YXRlKVxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFJlcGxlbmlzaG1lbnRPcmRlckRldGFpbHNMb2FkaW5nOiBNZW1vaXplZFNlbGVjdG9yPFxuICBTdGF0ZVdpdGhPcmRlcixcbiAgYm9vbGVhblxuPiA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRSZXBsZW5pc2htZW50T3JkZXJTdGF0ZSxcbiAgKHN0YXRlOiBTdGF0ZVV0aWxzLkxvYWRlclN0YXRlPFJlcGxlbmlzaG1lbnRPcmRlcj4pID0+XG4gICAgU3RhdGVVdGlscy5sb2FkZXJMb2FkaW5nU2VsZWN0b3Ioc3RhdGUpXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0UmVwbGVuaXNobWVudE9yZGVyRGV0YWlsc1N1Y2Nlc3M6IE1lbW9pemVkU2VsZWN0b3I8XG4gIFN0YXRlV2l0aE9yZGVyLFxuICBib29sZWFuXG4+ID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldFJlcGxlbmlzaG1lbnRPcmRlclN0YXRlLFxuICAoc3RhdGU6IFN0YXRlVXRpbHMuTG9hZGVyU3RhdGU8UmVwbGVuaXNobWVudE9yZGVyPikgPT5cbiAgICBTdGF0ZVV0aWxzLmxvYWRlclN1Y2Nlc3NTZWxlY3RvcihzdGF0ZSlcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzRXJyb3I6IE1lbW9pemVkU2VsZWN0b3I8XG4gIFN0YXRlV2l0aE9yZGVyLFxuICBib29sZWFuXG4+ID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldFJlcGxlbmlzaG1lbnRPcmRlclN0YXRlLFxuICAoc3RhdGU6IFN0YXRlVXRpbHMuTG9hZGVyU3RhdGU8UmVwbGVuaXNobWVudE9yZGVyPikgPT5cbiAgICBTdGF0ZVV0aWxzLmxvYWRlckVycm9yU2VsZWN0b3Ioc3RhdGUpXG4pO1xuIl19