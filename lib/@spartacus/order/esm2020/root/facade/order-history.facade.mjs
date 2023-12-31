/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { ORDER_CORE_FEATURE } from '../feature-name';
import * as i0 from "@angular/core";
export function orderHistoryFacadeFactory() {
    return facadeFactory({
        facade: OrderHistoryFacade,
        feature: ORDER_CORE_FEATURE,
        methods: [
            'getOrderDetails',
            'loadOrderDetails',
            'clearOrderDetails',
            'getOrderHistoryList',
            'getOrderHistoryListLoaded',
            'loadOrderList',
            'clearOrderList',
            'getConsignmentTracking',
            'loadConsignmentTracking',
            'clearConsignmentTracking',
            'cancelOrder',
            'getCancelOrderLoading',
            'getCancelOrderSuccess',
            'resetCancelOrderProcessState',
            'getOrderDetailsLoading',
        ],
        async: true,
    });
}
export class OrderHistoryFacade {
}
OrderHistoryFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderHistoryFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OrderHistoryFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderHistoryFacade, providedIn: 'root', useFactory: orderHistoryFacadeFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OrderHistoryFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: orderHistoryFacadeFactory,
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItaGlzdG9yeS5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvcm9vdC9mYWNhZGUvb3JkZXItaGlzdG9yeS5mYWNhZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQVFyRCxNQUFNLFVBQVUseUJBQXlCO0lBQ3ZDLE9BQU8sYUFBYSxDQUFDO1FBQ25CLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixPQUFPLEVBQUU7WUFDUCxpQkFBaUI7WUFDakIsa0JBQWtCO1lBQ2xCLG1CQUFtQjtZQUNuQixxQkFBcUI7WUFDckIsMkJBQTJCO1lBQzNCLGVBQWU7WUFDZixnQkFBZ0I7WUFDaEIsd0JBQXdCO1lBQ3hCLHlCQUF5QjtZQUN6QiwwQkFBMEI7WUFDMUIsYUFBYTtZQUNiLHVCQUF1QjtZQUN2Qix1QkFBdUI7WUFDdkIsOEJBQThCO1lBQzlCLHdCQUF3QjtTQUN6QjtRQUNELEtBQUssRUFBRSxJQUFJO0tBQ1osQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQU1ELE1BQU0sT0FBZ0Isa0JBQWtCOzsrR0FBbEIsa0JBQWtCO21IQUFsQixrQkFBa0IsY0FIMUIsTUFBTSxjQUNOLHlCQUF5QjsyRkFFakIsa0JBQWtCO2tCQUp2QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixVQUFVLEVBQUUseUJBQXlCO2lCQUN0QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZhY2FkZUZhY3RvcnkgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT1JERVJfQ09SRV9GRUFUVVJFIH0gZnJvbSAnLi4vZmVhdHVyZS1uYW1lJztcbmltcG9ydCB7IENvbnNpZ25tZW50VHJhY2tpbmcgfSBmcm9tICcuLi9tb2RlbC9jb25zaWdubWVudC10cmFja2luZy5tb2RlbCc7XG5pbXBvcnQge1xuICBDYW5jZWxsYXRpb25SZXF1ZXN0RW50cnlJbnB1dExpc3QsXG4gIE9yZGVyLFxuICBPcmRlckhpc3RvcnlMaXN0LFxufSBmcm9tICcuLi9tb2RlbC9vcmRlci5tb2RlbCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBvcmRlckhpc3RvcnlGYWNhZGVGYWN0b3J5KCkge1xuICByZXR1cm4gZmFjYWRlRmFjdG9yeSh7XG4gICAgZmFjYWRlOiBPcmRlckhpc3RvcnlGYWNhZGUsXG4gICAgZmVhdHVyZTogT1JERVJfQ09SRV9GRUFUVVJFLFxuICAgIG1ldGhvZHM6IFtcbiAgICAgICdnZXRPcmRlckRldGFpbHMnLFxuICAgICAgJ2xvYWRPcmRlckRldGFpbHMnLFxuICAgICAgJ2NsZWFyT3JkZXJEZXRhaWxzJyxcbiAgICAgICdnZXRPcmRlckhpc3RvcnlMaXN0JyxcbiAgICAgICdnZXRPcmRlckhpc3RvcnlMaXN0TG9hZGVkJyxcbiAgICAgICdsb2FkT3JkZXJMaXN0JyxcbiAgICAgICdjbGVhck9yZGVyTGlzdCcsXG4gICAgICAnZ2V0Q29uc2lnbm1lbnRUcmFja2luZycsXG4gICAgICAnbG9hZENvbnNpZ25tZW50VHJhY2tpbmcnLFxuICAgICAgJ2NsZWFyQ29uc2lnbm1lbnRUcmFja2luZycsXG4gICAgICAnY2FuY2VsT3JkZXInLFxuICAgICAgJ2dldENhbmNlbE9yZGVyTG9hZGluZycsXG4gICAgICAnZ2V0Q2FuY2VsT3JkZXJTdWNjZXNzJyxcbiAgICAgICdyZXNldENhbmNlbE9yZGVyUHJvY2Vzc1N0YXRlJyxcbiAgICAgICdnZXRPcmRlckRldGFpbHNMb2FkaW5nJyxcbiAgICBdLFxuICAgIGFzeW5jOiB0cnVlLFxuICB9KTtcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6IG9yZGVySGlzdG9yeUZhY2FkZUZhY3RvcnksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIE9yZGVySGlzdG9yeUZhY2FkZSB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIG9yZGVyJ3MgZGV0YWlsXG4gICAqL1xuICBhYnN0cmFjdCBnZXRPcmRlckRldGFpbHMoKTogT2JzZXJ2YWJsZTxPcmRlcj47XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyBvcmRlcidzIGRldGFpbHNcbiAgICpcbiAgICogQHBhcmFtIG9yZGVyQ29kZSBhbiBvcmRlciBjb2RlXG4gICAqL1xuICBhYnN0cmFjdCBsb2FkT3JkZXJEZXRhaWxzKG9yZGVyQ29kZTogc3RyaW5nKTogdm9pZDtcblxuICAvKipcbiAgICogQ2xlYXJzIG9yZGVyJ3MgZGV0YWlsc1xuICAgKi9cbiAgYWJzdHJhY3QgY2xlYXJPcmRlckRldGFpbHMoKTogdm9pZDtcblxuICAvKipcbiAgICogUmV0dXJucyBvcmRlciBoaXN0b3J5IGxpc3RcbiAgICovXG4gIGFic3RyYWN0IGdldE9yZGVySGlzdG9yeUxpc3QoXG4gICAgcGFnZVNpemU6IG51bWJlclxuICApOiBPYnNlcnZhYmxlPE9yZGVySGlzdG9yeUxpc3QgfCB1bmRlZmluZWQ+O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbG9hZGVkIGZsYWcgZm9yIG9yZGVyIGhpc3RvcnkgbGlzdFxuICAgKi9cbiAgYWJzdHJhY3QgZ2V0T3JkZXJIaXN0b3J5TGlzdExvYWRlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYW4gb3JkZXIgbGlzdFxuICAgKiBAcGFyYW0gcGFnZVNpemUgcGFnZSBzaXplXG4gICAqIEBwYXJhbSBjdXJyZW50UGFnZSBjdXJyZW50IHBhZ2VcbiAgICogQHBhcmFtIHNvcnQgc29ydFxuICAgKi9cbiAgYWJzdHJhY3QgbG9hZE9yZGVyTGlzdChcbiAgICBwYWdlU2l6ZTogbnVtYmVyLFxuICAgIGN1cnJlbnRQYWdlPzogbnVtYmVyLFxuICAgIHNvcnQ/OiBzdHJpbmdcbiAgKTogdm9pZDtcblxuICAvKipcbiAgICogQ2xlYW5pbmcgb3JkZXIgbGlzdFxuICAgKi9cbiAgYWJzdHJhY3QgY2xlYXJPcmRlckxpc3QoKTogdm9pZDtcblxuICAvKipcbiAgICogIFJldHVybnMgYSBjb25zaWdubWVudCB0cmFja2luZyBkZXRhaWxcbiAgICovXG4gIGFic3RyYWN0IGdldENvbnNpZ25tZW50VHJhY2tpbmcoKTogT2JzZXJ2YWJsZTxDb25zaWdubWVudFRyYWNraW5nPjtcblxuICAvKipcbiAgICogUmV0cmlldmVzIGNvbnNpZ25tZW50IHRyYWNraW5nIGRldGFpbHNcbiAgICogQHBhcmFtIG9yZGVyQ29kZSBhbiBvcmRlciBjb2RlXG4gICAqIEBwYXJhbSBjb25zaWdubWVudENvZGUgYSBjb25zaWdubWVudCBjb2RlXG4gICAqL1xuICBhYnN0cmFjdCBsb2FkQ29uc2lnbm1lbnRUcmFja2luZyhcbiAgICBvcmRlckNvZGU6IHN0cmluZyxcbiAgICBjb25zaWdubWVudENvZGU6IHN0cmluZ1xuICApOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBDbGVhbmluZyBjb25zaWdubWVudCB0cmFja2luZ1xuICAgKi9cbiAgYWJzdHJhY3QgY2xlYXJDb25zaWdubWVudFRyYWNraW5nKCk6IHZvaWQ7XG5cbiAgLypcbiAgICogQ2FuY2VsIGFuIG9yZGVyXG4gICAqL1xuICBhYnN0cmFjdCBjYW5jZWxPcmRlcihcbiAgICBvcmRlckNvZGU6IHN0cmluZyxcbiAgICBjYW5jZWxSZXF1ZXN0SW5wdXQ6IENhbmNlbGxhdGlvblJlcXVlc3RFbnRyeUlucHV0TGlzdFxuICApOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjYW5jZWwgb3JkZXIgbG9hZGluZyBmbGFnXG4gICAqL1xuICBhYnN0cmFjdCBnZXRDYW5jZWxPcmRlckxvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY2FuY2VsIG9yZGVyIHN1Y2Nlc3MgZmxhZ1xuICAgKi9cbiAgYWJzdHJhY3QgZ2V0Q2FuY2VsT3JkZXJTdWNjZXNzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgY2FuY2VsIG9yZGVyIHByb2Nlc3MgZmxhZ3NcbiAgICovXG4gIGFic3RyYWN0IHJlc2V0Q2FuY2VsT3JkZXJQcm9jZXNzU3RhdGUoKTogdm9pZDtcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvcmRlciBkZXRhaWxzIGxvYWRpbmcgZmxhZ1xuICAgKi9cbiAgYWJzdHJhY3QgZ2V0T3JkZXJEZXRhaWxzTG9hZGluZygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xufVxuIl19