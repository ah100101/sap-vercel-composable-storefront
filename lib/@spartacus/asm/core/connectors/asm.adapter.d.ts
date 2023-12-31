import { BindCartParams, CustomerListsPage, CustomerSearchOptions, CustomerSearchPage } from '@spartacus/asm/root';
import { Observable } from 'rxjs';
export declare abstract class AsmAdapter {
    /**
     * Abstract function used to search for customers.
     */
    abstract customerSearch(options: CustomerSearchOptions): Observable<CustomerSearchPage>;
    /**
     * Abstract function used to get customer lists.
     */
    abstract customerLists(): Observable<CustomerListsPage>;
    /**
     * Used to bind an anonymous cart to a registered user.
     */
    abstract bindCart(options: BindCartParams): Observable<unknown>;
}
