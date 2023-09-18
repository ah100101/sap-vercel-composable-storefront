/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { StoreFinderActions } from '../actions/index';
export const initialState = {
    findStoresEntities: {},
    findStoreEntityById: {},
};
export function findStoresReducer(state = initialState, action) {
    switch (action.type) {
        case StoreFinderActions.FIND_STORES_SUCCESS: {
            const findStoresEntities = action.payload;
            return { ...state, findStoresEntities };
        }
        case StoreFinderActions.FIND_STORE_BY_ID_SUCCESS: {
            const findStoreEntityById = action.payload;
            return { ...state, findStoreEntityById };
        }
    }
    return state;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1zdG9yZXMucmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9zdG9yZWZpbmRlci9jb3JlL3N0b3JlL3JlZHVjZXJzL2ZpbmQtc3RvcmVzLnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR3RELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBb0I7SUFDM0Msa0JBQWtCLEVBQUUsRUFBRTtJQUN0QixtQkFBbUIsRUFBRSxFQUFFO0NBQ3hCLENBQUM7QUFFRixNQUFNLFVBQVUsaUJBQWlCLENBQy9CLEtBQUssR0FBRyxZQUFZLEVBQ3BCLE1BQTJDO0lBRTNDLFFBQVEsTUFBTSxDQUFDLElBQUksRUFBRTtRQUNuQixLQUFLLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDM0MsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBRTFDLE9BQU8sRUFBRSxHQUFHLEtBQUssRUFBRSxrQkFBa0IsRUFBRSxDQUFDO1NBQ3pDO1FBQ0QsS0FBSyxrQkFBa0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUUzQyxPQUFPLEVBQUUsR0FBRyxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQztTQUMxQztLQUNGO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgU3RvcmVGaW5kZXJBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmRleCc7XG5pbXBvcnQgeyBGaW5kU3RvcmVzU3RhdGUgfSBmcm9tICcuLi9zdG9yZS1maW5kZXItc3RhdGUnO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlOiBGaW5kU3RvcmVzU3RhdGUgPSB7XG4gIGZpbmRTdG9yZXNFbnRpdGllczoge30sXG4gIGZpbmRTdG9yZUVudGl0eUJ5SWQ6IHt9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRTdG9yZXNSZWR1Y2VyKFxuICBzdGF0ZSA9IGluaXRpYWxTdGF0ZSxcbiAgYWN0aW9uOiBTdG9yZUZpbmRlckFjdGlvbnMuRmluZFN0b3Jlc0FjdGlvblxuKTogRmluZFN0b3Jlc1N0YXRlIHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgU3RvcmVGaW5kZXJBY3Rpb25zLkZJTkRfU1RPUkVTX1NVQ0NFU1M6IHtcbiAgICAgIGNvbnN0IGZpbmRTdG9yZXNFbnRpdGllcyA9IGFjdGlvbi5wYXlsb2FkO1xuXG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgZmluZFN0b3Jlc0VudGl0aWVzIH07XG4gICAgfVxuICAgIGNhc2UgU3RvcmVGaW5kZXJBY3Rpb25zLkZJTkRfU1RPUkVfQllfSURfU1VDQ0VTUzoge1xuICAgICAgY29uc3QgZmluZFN0b3JlRW50aXR5QnlJZCA9IGFjdGlvbi5wYXlsb2FkO1xuXG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgZmluZFN0b3JlRW50aXR5QnlJZCB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn1cbiJdfQ==