import { Injectable } from '@angular/core';
import { normalizeHttpError, } from '@spartacus/core';
import { FUTURE_STOCK_NORMALIZER, FUTURE_STOCK_LIST_NORMALIZER, } from '@spartacus/product/future-stock/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@spartacus/core";
export class OccFutureStockAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    getFutureStock(userId, productCode) {
        return this.http
            .get(this.getFutureStockEndpoint(userId, productCode))
            .pipe(catchError((error) => throwError(normalizeHttpError(error))), this.converter.pipeable(FUTURE_STOCK_NORMALIZER));
    }
    getFutureStocks(userId, productCodes) {
        return this.http
            .get(this.getFutureStocksEndpoint(userId, productCodes))
            .pipe(catchError((error) => throwError(normalizeHttpError(error))), this.converter.pipeable(FUTURE_STOCK_LIST_NORMALIZER));
    }
    getFutureStockEndpoint(userId, productCode) {
        return this.occEndpoints.buildUrl('futureStock', {
            urlParams: { userId, productCode },
        });
    }
    getFutureStocksEndpoint(userId, productCodes) {
        const params = {};
        params['productCodes'] = productCodes;
        return this.occEndpoints.buildUrl('futureStocks', {
            urlParams: { userId },
            queryParams: params,
        });
    }
}
OccFutureStockAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccFutureStockAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i2.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccFutureStockAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccFutureStockAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccFutureStockAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i2.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWZ1dHVyZS1zdG9jay5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvZnV0dXJlLXN0b2NrL29jYy9hZGFwdGVycy9vY2MtZnV0dXJlLXN0b2NrLmFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBR0wsa0JBQWtCLEdBQ25CLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUVMLHVCQUF1QixFQUN2Qiw0QkFBNEIsR0FHN0IsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5QyxPQUFPLEVBQWMsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUc1QyxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDLFlBQ1ksSUFBZ0IsRUFDaEIsWUFBaUMsRUFDakMsU0FBMkI7UUFGM0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBa0I7SUFDcEMsQ0FBQztJQUVKLGNBQWMsQ0FDWixNQUFjLEVBQ2QsV0FBbUI7UUFFbkIsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FBcUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQzthQUN6RSxJQUFJLENBQ0gsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUM1RCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUNqRCxDQUFDO0lBQ04sQ0FBQztJQUVELGVBQWUsQ0FDYixNQUFjLEVBQ2QsWUFBb0I7UUFFcEIsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FDRixJQUFJLENBQUMsdUJBQXVCLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUNuRDthQUNBLElBQUksQ0FDSCxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQzVELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDRCQUE0QixDQUFDLENBQ3RELENBQUM7SUFDTixDQUFDO0lBRVMsc0JBQXNCLENBQzlCLE1BQWMsRUFDZCxXQUFtQjtRQUVuQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUMvQyxTQUFTLEVBQUUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFO1NBQ25DLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyx1QkFBdUIsQ0FDL0IsTUFBYyxFQUNkLFlBQW9CO1FBRXBCLE1BQU0sTUFBTSxHQUFRLEVBQUUsQ0FBQztRQUN2QixNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsWUFBWSxDQUFDO1FBRXRDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFO1lBQ2hELFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRTtZQUNyQixXQUFXLEVBQUUsTUFBTTtTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDOztrSEFyRFUscUJBQXFCO3NIQUFyQixxQkFBcUI7MkZBQXJCLHFCQUFxQjtrQkFEakMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gIENvbnZlcnRlclNlcnZpY2UsXG4gIG5vcm1hbGl6ZUh0dHBFcnJvcixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuaW1wb3J0IHtcbiAgRnV0dXJlU3RvY2tBZGFwdGVyLFxuICBGVVRVUkVfU1RPQ0tfTk9STUFMSVpFUixcbiAgRlVUVVJFX1NUT0NLX0xJU1RfTk9STUFMSVpFUixcbiAgUHJvZHVjdEZ1dHVyZVN0b2NrLFxuICBQcm9kdWN0RnV0dXJlU3RvY2tMaXN0LFxufSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QvZnV0dXJlLXN0b2NrL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9jY0Z1dHVyZVN0b2NrQWRhcHRlciBpbXBsZW1lbnRzIEZ1dHVyZVN0b2NrQWRhcHRlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByb3RlY3RlZCBvY2NFbmRwb2ludHM6IE9jY0VuZHBvaW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNvbnZlcnRlcjogQ29udmVydGVyU2VydmljZVxuICApIHt9XG5cbiAgZ2V0RnV0dXJlU3RvY2soXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgcHJvZHVjdENvZGU6IHN0cmluZ1xuICApOiBPYnNlcnZhYmxlPFByb2R1Y3RGdXR1cmVTdG9jaz4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQ8UHJvZHVjdEZ1dHVyZVN0b2NrPih0aGlzLmdldEZ1dHVyZVN0b2NrRW5kcG9pbnQodXNlcklkLCBwcm9kdWN0Q29kZSkpXG4gICAgICAucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHRocm93RXJyb3Iobm9ybWFsaXplSHR0cEVycm9yKGVycm9yKSkpLFxuICAgICAgICB0aGlzLmNvbnZlcnRlci5waXBlYWJsZShGVVRVUkVfU1RPQ0tfTk9STUFMSVpFUilcbiAgICAgICk7XG4gIH1cblxuICBnZXRGdXR1cmVTdG9ja3MoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgcHJvZHVjdENvZGVzOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxQcm9kdWN0RnV0dXJlU3RvY2tMaXN0PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldDxQcm9kdWN0RnV0dXJlU3RvY2tMaXN0PihcbiAgICAgICAgdGhpcy5nZXRGdXR1cmVTdG9ja3NFbmRwb2ludCh1c2VySWQsIHByb2R1Y3RDb2RlcylcbiAgICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4gdGhyb3dFcnJvcihub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpKSksXG4gICAgICAgIHRoaXMuY29udmVydGVyLnBpcGVhYmxlKEZVVFVSRV9TVE9DS19MSVNUX05PUk1BTElaRVIpXG4gICAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEZ1dHVyZVN0b2NrRW5kcG9pbnQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgcHJvZHVjdENvZGU6IHN0cmluZ1xuICApOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgnZnV0dXJlU3RvY2snLCB7XG4gICAgICB1cmxQYXJhbXM6IHsgdXNlcklkLCBwcm9kdWN0Q29kZSB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEZ1dHVyZVN0b2Nrc0VuZHBvaW50KFxuICAgIHVzZXJJZDogc3RyaW5nLFxuICAgIHByb2R1Y3RDb2Rlczogc3RyaW5nXG4gICk6IHN0cmluZyB7XG4gICAgY29uc3QgcGFyYW1zID0gPGFueT57fTtcbiAgICBwYXJhbXNbJ3Byb2R1Y3RDb2RlcyddID0gcHJvZHVjdENvZGVzO1xuXG4gICAgcmV0dXJuIHRoaXMub2NjRW5kcG9pbnRzLmJ1aWxkVXJsKCdmdXR1cmVTdG9ja3MnLCB7XG4gICAgICB1cmxQYXJhbXM6IHsgdXNlcklkIH0sXG4gICAgICBxdWVyeVBhcmFtczogcGFyYW1zLFxuICAgIH0pO1xuICB9XG59XG4iXX0=