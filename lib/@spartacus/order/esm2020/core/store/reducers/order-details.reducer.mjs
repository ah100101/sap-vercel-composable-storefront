/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { OrderActions } from '../actions/index';
export const initialState = {};
export function reducer(state = initialState, action) {
    switch (action.type) {
        case OrderActions.LOAD_ORDER_DETAILS_SUCCESS: {
            const order = action.payload;
            return order;
        }
    }
    return state;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItZGV0YWlscy5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZGVyL2NvcmUvc3RvcmUvcmVkdWNlcnMvb3JkZXItZGV0YWlscy5yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFHSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFaEQsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFVLEVBQUUsQ0FBQztBQUV0QyxNQUFNLFVBQVUsT0FBTyxDQUNyQixLQUFLLEdBQUcsWUFBWSxFQUNwQixNQUF1QztJQUV2QyxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSyxZQUFZLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUM1QyxNQUFNLEtBQUssR0FBVSxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQ3BDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7IE9yZGVyQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5kZXgnO1xuXG5leHBvcnQgY29uc3QgaW5pdGlhbFN0YXRlOiBPcmRlciA9IHt9O1xuXG5leHBvcnQgZnVuY3Rpb24gcmVkdWNlcihcbiAgc3RhdGUgPSBpbml0aWFsU3RhdGUsXG4gIGFjdGlvbjogT3JkZXJBY3Rpb25zLk9yZGVyRGV0YWlsc0FjdGlvblxuKTogT3JkZXIge1xuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgY2FzZSBPcmRlckFjdGlvbnMuTE9BRF9PUkRFUl9ERVRBSUxTX1NVQ0NFU1M6IHtcbiAgICAgIGNvbnN0IG9yZGVyOiBPcmRlciA9IGFjdGlvbi5wYXlsb2FkO1xuICAgICAgcmV0dXJuIG9yZGVyO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG4iXX0=