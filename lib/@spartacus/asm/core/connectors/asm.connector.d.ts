import { BindCartParams, CustomerListsPage, CustomerSearchOptions, CustomerSearchPage } from '@spartacus/asm/root';
import { Observable } from 'rxjs';
import { AsmAdapter } from './asm.adapter';
import * as i0 from "@angular/core";
export declare class AsmConnector {
    protected asmAdapter: AsmAdapter;
    constructor(asmAdapter: AsmAdapter);
    customerSearch(options: CustomerSearchOptions): Observable<CustomerSearchPage>;
    customerLists(): Observable<CustomerListsPage>;
    bindCart(options: BindCartParams): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AsmConnector>;
}
