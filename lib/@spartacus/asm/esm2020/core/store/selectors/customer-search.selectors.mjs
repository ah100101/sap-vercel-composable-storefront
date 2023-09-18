/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { createSelector } from '@ngrx/store';
import { StateUtils } from '@spartacus/core';
import { getAsmState } from './feature.selector';
export const getCustomerSearchResultsLoaderState = createSelector(getAsmState, (state) => state.customerSearchResult);
export const getCustomerSearchResults = createSelector(getCustomerSearchResultsLoaderState, (state) => StateUtils.loaderValueSelector(state));
export const getCustomerSearchResultsLoading = createSelector(getCustomerSearchResultsLoaderState, (state) => StateUtils.loaderLoadingSelector(state));
export const getCustomerListCustomersSearchResultsLoaderState = createSelector(getAsmState, (state) => state.customerListCustomersSearchResult);
export const getCustomerListCustomersSearchResults = createSelector(getCustomerListCustomersSearchResultsLoaderState, (state) => StateUtils.loaderValueSelector(state));
export const getCustomerListCustomersSearchResultsLoading = createSelector(getCustomerListCustomersSearchResultsLoaderState, (state) => StateUtils.loaderLoadingSelector(state));
export const getCustomerListCustomersSearchResultsError = createSelector(getCustomerListCustomersSearchResultsLoaderState, (state) => StateUtils.loaderErrorSelector(state));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItc2VhcmNoLnNlbGVjdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29yZS9zdG9yZS9zZWxlY3RvcnMvY3VzdG9tZXItc2VhcmNoLnNlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLGNBQWMsRUFBb0IsTUFBTSxhQUFhLENBQUM7QUFFL0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVqRCxNQUFNLENBQUMsTUFBTSxtQ0FBbUMsR0FHNUMsY0FBYyxDQUNoQixXQUFXLEVBQ1gsQ0FBQyxLQUFlLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FDaEQsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUdqQyxjQUFjLENBQ2hCLG1DQUFtQyxFQUNuQyxDQUFDLEtBQWlELEVBQUUsRUFBRSxDQUNwRCxVQUFVLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQ3hDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSwrQkFBK0IsR0FHeEMsY0FBYyxDQUNoQixtQ0FBbUMsRUFDbkMsQ0FBQyxLQUFpRCxFQUFFLEVBQUUsQ0FDcEQsVUFBVSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUMxQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sZ0RBQWdELEdBR3pELGNBQWMsQ0FDaEIsV0FBVyxFQUNYLENBQUMsS0FBZSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQzdELENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxxQ0FBcUMsR0FHOUMsY0FBYyxDQUNoQixnREFBZ0QsRUFDaEQsQ0FBQyxLQUFpRCxFQUFFLEVBQUUsQ0FDcEQsVUFBVSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUN4QyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sNENBQTRDLEdBR3JELGNBQWMsQ0FDaEIsZ0RBQWdELEVBQ2hELENBQUMsS0FBaUQsRUFBRSxFQUFFLENBQ3BELFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FDMUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDBDQUEwQyxHQUduRCxjQUFjLENBQ2hCLGdEQUFnRCxFQUNoRCxDQUFDLEtBQWlELEVBQUUsRUFBRSxDQUNwRCxVQUFVLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQ3hDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBjcmVhdGVTZWxlY3RvciwgTWVtb2l6ZWRTZWxlY3RvciB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IEN1c3RvbWVyU2VhcmNoUGFnZSB9IGZyb20gJ0BzcGFydGFjdXMvYXNtL3Jvb3QnO1xuaW1wb3J0IHsgU3RhdGVVdGlscyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBBc21TdGF0ZSwgU3RhdGVXaXRoQXNtIH0gZnJvbSAnLi4vYXNtLXN0YXRlJztcbmltcG9ydCB7IGdldEFzbVN0YXRlIH0gZnJvbSAnLi9mZWF0dXJlLnNlbGVjdG9yJztcblxuZXhwb3J0IGNvbnN0IGdldEN1c3RvbWVyU2VhcmNoUmVzdWx0c0xvYWRlclN0YXRlOiBNZW1vaXplZFNlbGVjdG9yPFxuICBTdGF0ZVdpdGhBc20sXG4gIFN0YXRlVXRpbHMuTG9hZGVyU3RhdGU8Q3VzdG9tZXJTZWFyY2hQYWdlPlxuPiA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRBc21TdGF0ZSxcbiAgKHN0YXRlOiBBc21TdGF0ZSkgPT4gc3RhdGUuY3VzdG9tZXJTZWFyY2hSZXN1bHRcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRDdXN0b21lclNlYXJjaFJlc3VsdHM6IE1lbW9pemVkU2VsZWN0b3I8XG4gIFN0YXRlV2l0aEFzbSxcbiAgQ3VzdG9tZXJTZWFyY2hQYWdlXG4+ID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldEN1c3RvbWVyU2VhcmNoUmVzdWx0c0xvYWRlclN0YXRlLFxuICAoc3RhdGU6IFN0YXRlVXRpbHMuTG9hZGVyU3RhdGU8Q3VzdG9tZXJTZWFyY2hQYWdlPikgPT5cbiAgICBTdGF0ZVV0aWxzLmxvYWRlclZhbHVlU2VsZWN0b3Ioc3RhdGUpXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q3VzdG9tZXJTZWFyY2hSZXN1bHRzTG9hZGluZzogTWVtb2l6ZWRTZWxlY3RvcjxcbiAgU3RhdGVXaXRoQXNtLFxuICBib29sZWFuXG4+ID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldEN1c3RvbWVyU2VhcmNoUmVzdWx0c0xvYWRlclN0YXRlLFxuICAoc3RhdGU6IFN0YXRlVXRpbHMuTG9hZGVyU3RhdGU8Q3VzdG9tZXJTZWFyY2hQYWdlPikgPT5cbiAgICBTdGF0ZVV0aWxzLmxvYWRlckxvYWRpbmdTZWxlY3RvcihzdGF0ZSlcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRDdXN0b21lckxpc3RDdXN0b21lcnNTZWFyY2hSZXN1bHRzTG9hZGVyU3RhdGU6IE1lbW9pemVkU2VsZWN0b3I8XG4gIFN0YXRlV2l0aEFzbSxcbiAgU3RhdGVVdGlscy5Mb2FkZXJTdGF0ZTxDdXN0b21lclNlYXJjaFBhZ2U+XG4+ID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldEFzbVN0YXRlLFxuICAoc3RhdGU6IEFzbVN0YXRlKSA9PiBzdGF0ZS5jdXN0b21lckxpc3RDdXN0b21lcnNTZWFyY2hSZXN1bHRcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRDdXN0b21lckxpc3RDdXN0b21lcnNTZWFyY2hSZXN1bHRzOiBNZW1vaXplZFNlbGVjdG9yPFxuICBTdGF0ZVdpdGhBc20sXG4gIEN1c3RvbWVyU2VhcmNoUGFnZVxuPiA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDdXN0b21lckxpc3RDdXN0b21lcnNTZWFyY2hSZXN1bHRzTG9hZGVyU3RhdGUsXG4gIChzdGF0ZTogU3RhdGVVdGlscy5Mb2FkZXJTdGF0ZTxDdXN0b21lclNlYXJjaFBhZ2U+KSA9PlxuICAgIFN0YXRlVXRpbHMubG9hZGVyVmFsdWVTZWxlY3RvcihzdGF0ZSlcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRDdXN0b21lckxpc3RDdXN0b21lcnNTZWFyY2hSZXN1bHRzTG9hZGluZzogTWVtb2l6ZWRTZWxlY3RvcjxcbiAgU3RhdGVXaXRoQXNtLFxuICBib29sZWFuXG4+ID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldEN1c3RvbWVyTGlzdEN1c3RvbWVyc1NlYXJjaFJlc3VsdHNMb2FkZXJTdGF0ZSxcbiAgKHN0YXRlOiBTdGF0ZVV0aWxzLkxvYWRlclN0YXRlPEN1c3RvbWVyU2VhcmNoUGFnZT4pID0+XG4gICAgU3RhdGVVdGlscy5sb2FkZXJMb2FkaW5nU2VsZWN0b3Ioc3RhdGUpXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q3VzdG9tZXJMaXN0Q3VzdG9tZXJzU2VhcmNoUmVzdWx0c0Vycm9yOiBNZW1vaXplZFNlbGVjdG9yPFxuICBTdGF0ZVdpdGhBc20sXG4gIGJvb2xlYW5cbj4gPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q3VzdG9tZXJMaXN0Q3VzdG9tZXJzU2VhcmNoUmVzdWx0c0xvYWRlclN0YXRlLFxuICAoc3RhdGU6IFN0YXRlVXRpbHMuTG9hZGVyU3RhdGU8Q3VzdG9tZXJTZWFyY2hQYWdlPikgPT5cbiAgICBTdGF0ZVV0aWxzLmxvYWRlckVycm9yU2VsZWN0b3Ioc3RhdGUpXG4pO1xuIl19