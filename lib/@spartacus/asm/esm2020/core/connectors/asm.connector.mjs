/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./asm.adapter";
export class AsmConnector {
    constructor(asmAdapter) {
        this.asmAdapter = asmAdapter;
    }
    customerSearch(options) {
        return this.asmAdapter.customerSearch(options);
    }
    customerLists() {
        return this.asmAdapter.customerLists();
    }
    bindCart(options) {
        return this.asmAdapter.bindCart(options);
    }
}
AsmConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmConnector, deps: [{ token: i1.AsmAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
AsmConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: AsmConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AsmAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLmNvbm5lY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vY29yZS9jb25uZWN0b3JzL2FzbS5jb25uZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQWEzQyxNQUFNLE9BQU8sWUFBWTtJQUN2QixZQUFzQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUcsQ0FBQztJQUVoRCxjQUFjLENBQ1osT0FBOEI7UUFFOUIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsUUFBUSxDQUFDLE9BQXVCO1FBQzlCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQzs7eUdBZlUsWUFBWTs2R0FBWixZQUFZLGNBRlgsTUFBTTsyRkFFUCxZQUFZO2tCQUh4QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEJpbmRDYXJ0UGFyYW1zLFxuICBDdXN0b21lckxpc3RzUGFnZSxcbiAgQ3VzdG9tZXJTZWFyY2hPcHRpb25zLFxuICBDdXN0b21lclNlYXJjaFBhZ2UsXG59IGZyb20gJ0BzcGFydGFjdXMvYXNtL3Jvb3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQXNtQWRhcHRlciB9IGZyb20gJy4vYXNtLmFkYXB0ZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXNtQ29ubmVjdG9yIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGFzbUFkYXB0ZXI6IEFzbUFkYXB0ZXIpIHt9XG5cbiAgY3VzdG9tZXJTZWFyY2goXG4gICAgb3B0aW9uczogQ3VzdG9tZXJTZWFyY2hPcHRpb25zXG4gICk6IE9ic2VydmFibGU8Q3VzdG9tZXJTZWFyY2hQYWdlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXNtQWRhcHRlci5jdXN0b21lclNlYXJjaChvcHRpb25zKTtcbiAgfVxuXG4gIGN1c3RvbWVyTGlzdHMoKTogT2JzZXJ2YWJsZTxDdXN0b21lckxpc3RzUGFnZT4ge1xuICAgIHJldHVybiB0aGlzLmFzbUFkYXB0ZXIuY3VzdG9tZXJMaXN0cygpO1xuICB9XG5cbiAgYmluZENhcnQob3B0aW9uczogQmluZENhcnRQYXJhbXMpOiBPYnNlcnZhYmxlPHVua25vd24+IHtcbiAgICByZXR1cm4gdGhpcy5hc21BZGFwdGVyLmJpbmRDYXJ0KG9wdGlvbnMpO1xuICB9XG59XG4iXX0=