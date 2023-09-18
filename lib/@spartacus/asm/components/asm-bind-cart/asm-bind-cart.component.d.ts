import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';
import { AsmBindCartFacade } from '@spartacus/asm/root';
import { ActiveCartFacade, MultiCartFacade } from '@spartacus/cart/base/root';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import { GlobalMessageService } from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BIND_CART_DIALOG_ACTION } from '../asm-bind-cart-dialog/asm-bind-cart-dialog.component';
import * as i0 from "@angular/core";
export declare class AsmBindCartComponent implements OnInit, OnDestroy {
    protected globalMessageService: GlobalMessageService;
    protected activeCartFacade: ActiveCartFacade;
    protected multiCartFacade: MultiCartFacade;
    protected asmBindCartFacade: AsmBindCartFacade;
    protected launchDialogService: LaunchDialogService;
    protected savedCartFacade: SavedCartFacade;
    activeCartValidator: ValidatorFn;
    cartId: FormControl<string | null>;
    loading$: BehaviorSubject<boolean>;
    valid$: Observable<boolean>;
    activeCartId: string;
    bindToCartElemRef: ElementRef<HTMLButtonElement>;
    protected subscription: Subscription;
    constructor(globalMessageService: GlobalMessageService, activeCartFacade: ActiveCartFacade, multiCartFacade: MultiCartFacade, asmBindCartFacade: AsmBindCartFacade, launchDialogService: LaunchDialogService, savedCartFacade: SavedCartFacade);
    ngOnInit(): void;
    resetInput(): void;
    /**
     * Bind the input cart number to the customer
     */
    bindCartToCustomer(): void;
    clearText(): void;
    ngOnDestroy(): void;
    /**
     * Binds cart on subscription and reloads cart
     */
    protected simpleBindCart(anonymousCartId: string): Observable<unknown>;
    /**
     * Opens dialog and passes non-cancel result to select action
     */
    protected openDialog(activeCartId: string, anonymousCartId: string): Observable<unknown>;
    protected selectBindAction(activeCartId: string, anonymousCartId: string, action: BIND_CART_DIALOG_ACTION): Observable<unknown>;
    protected replaceCart(previousActiveCartId: string, anonymousCartId: string): Observable<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmBindCartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmBindCartComponent, "cx-asm-bind-cart", never, {}, {}, never, never, false, never>;
}
