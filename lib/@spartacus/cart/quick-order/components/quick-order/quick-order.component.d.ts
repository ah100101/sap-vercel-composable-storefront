import { OnDestroy, OnInit } from '@angular/core';
import { ActiveCartFacade, OrderEntry } from '@spartacus/cart/base/root';
import { CmsQuickOrderComponent, QuickOrderStatePersistenceService } from '@spartacus/cart/quick-order/core';
import { QuickOrderAddEntryEvent, QuickOrderFacade } from '@spartacus/cart/quick-order/root';
import { GlobalMessageService, GlobalMessageType, Product } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuickOrderFormComponent } from './form/quick-order-form.component';
import * as i0 from "@angular/core";
export declare class QuickOrderComponent implements OnInit, OnDestroy {
    protected activeCartService: ActiveCartFacade;
    protected component: CmsComponentData<CmsQuickOrderComponent>;
    protected globalMessageService: GlobalMessageService;
    protected quickOrderService: QuickOrderFacade;
    protected quickOrderStatePersistenceService: QuickOrderStatePersistenceService;
    cartId$: Observable<string>;
    entries$: Observable<OrderEntry[]>;
    quickOrderListLimit$: Observable<number | undefined>;
    isCartStable$: Observable<boolean>;
    globalMessageType: typeof GlobalMessageType;
    listLimitReached$: Observable<boolean>;
    quickOrderForm: QuickOrderFormComponent;
    protected cartErrors$: BehaviorSubject<QuickOrderAddEntryEvent[]>;
    protected cartWarnings$: BehaviorSubject<QuickOrderAddEntryEvent[]>;
    protected cartSuccesses$: BehaviorSubject<OrderEntry[]>;
    protected showAddToCartInformation$: BehaviorSubject<boolean>;
    protected nonPurchasableProductError$: BehaviorSubject<Product | null>;
    constructor(activeCartService: ActiveCartFacade, component: CmsComponentData<CmsQuickOrderComponent>, globalMessageService: GlobalMessageService, quickOrderService: QuickOrderFacade, quickOrderStatePersistenceService: QuickOrderStatePersistenceService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    get errors$(): Observable<QuickOrderAddEntryEvent[]>;
    get warnings$(): Observable<QuickOrderAddEntryEvent[]>;
    get successes$(): Observable<OrderEntry[]>;
    get nonPurchasableError$(): Observable<Product | null>;
    get addToCartInformation$(): Observable<boolean>;
    get softDeletedEntries$(): Observable<Record<string, OrderEntry>>;
    clear(): void;
    addToCart(orderEntries: OrderEntry[]): void;
    clearErrors(): void;
    clearWarnings(): void;
    clearSuccesses(): void;
    clearAddToCartInformation(): void;
    undoDeletion(entry: OrderEntry): void;
    clearDeletion(entry: OrderEntry): void;
    clearNonPurchasableError(): void;
    canAddProduct(): Observable<boolean>;
    protected extractErrors(errors: QuickOrderAddEntryEvent[]): void;
    protected extractWarnings(errors: QuickOrderAddEntryEvent[]): void;
    protected extractSuccesses(errors: QuickOrderAddEntryEvent[], entries: OrderEntry[]): void;
    protected clearStatuses(): void;
    protected showAddedToCartSuccessMessage(): void;
    protected setErrors(errors: QuickOrderAddEntryEvent[]): void;
    protected setWarnings(warnings: QuickOrderAddEntryEvent[]): void;
    protected setSuccesses(entries: OrderEntry[]): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<QuickOrderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<QuickOrderComponent, "cx-quick-order", never, {}, {}, never, never, false, never>;
}