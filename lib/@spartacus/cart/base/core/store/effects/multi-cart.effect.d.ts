import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { CartActions } from '../actions/index';
import * as i0 from "@angular/core";
export declare class MultiCartEffects {
    private actions$;
    processesIncrement$: Observable<CartActions.CartProcessesIncrement>;
    setSelectiveId$: Observable<CartActions.SetCartTypeIndex>;
    setActiveCartId$: Observable<CartActions.SetCartTypeIndex>;
    /**
     * Verifies if cart is the current cart and returns the appropriate cart type
     * @param action
     * @returns cart type needed on load
     */
    private getActiveCartTypeOnLoad;
    /**
     * Verifies if cart is active and returns the appropriate cart type
     * @param action
     * @returns cart type needed on creation
     */
    private getActiveCartTypeOnCreate;
    constructor(actions$: Actions);
    static ɵfac: i0.ɵɵFactoryDeclaration<MultiCartEffects, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MultiCartEffects>;
}
