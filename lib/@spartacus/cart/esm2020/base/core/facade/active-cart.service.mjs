/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CartType, } from '@spartacus/cart/base/root';
import { getLastValueSync, OCC_CART_ID_CURRENT, OCC_USER_ID_ANONYMOUS, OCC_USER_ID_GUEST, } from '@spartacus/core';
import { combineLatest, of, Subscription, using } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, shareReplay, switchMap, switchMapTo, take, tap, withLatestFrom, } from 'rxjs/operators';
import { getCartIdByUserId, isEmail, isEmpty, isJustLoggedIn, isTempCartId, } from '../utils/utils';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
export class ActiveCartService {
    constructor(multiCartFacade, userIdService) {
        this.multiCartFacade = multiCartFacade;
        this.userIdService = userIdService;
        this.subscription = new Subscription();
        // This stream is used for referencing carts in API calls.
        this.activeCartId$ = this.userIdService.getUserId().pipe(
        // We want to wait the initialization of cartId until the userId is initialized
        // We have take(1) to not trigger this stream, when userId changes.
        take(1), switchMapTo(this.multiCartFacade.getCartIdByType(CartType.ACTIVE)), 
        // We also wait until we initialize cart from localStorage
        filter((cartId) => cartId !== undefined), 
        // fallback to current when we don't have particular cart id
        map((cartId) => (cartId === '' ? OCC_CART_ID_CURRENT : cartId)));
        // Stream with active cart entity
        this.cartEntity$ = this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getCartEntity(cartId)));
        // When the function `requireLoadedCart` is first called, the init cart loading for login user may not be done
        this.checkInitLoad = undefined;
        this.initActiveCart();
        this.detectUserChange();
    }
    initActiveCart() {
        // Stream for getting the cart value
        const cartValue$ = this.cartEntity$.pipe(map((cartEntity) => {
            return {
                cart: cartEntity.value,
                isStable: !cartEntity.loading && cartEntity.processesCount === 0,
                loaded: Boolean((cartEntity.error || cartEntity.success) && !cartEntity.loading),
            };
        }), 
        // we want to emit empty carts even if those are not stable
        // on merge cart action we want to switch to empty cart so no one would use old cartId which can be already obsolete
        // so on merge action the resulting stream looks like this: old_cart -> {} -> new_cart
        filter(({ isStable, cart }) => isStable || isEmpty(cart)));
        // Responsible for loading cart when it does not exist (eg. app initialization when we have only cartId)
        const loading = cartValue$.pipe(withLatestFrom(this.activeCartId$, this.userIdService.getUserId()), tap(([{ cart, loaded, isStable }, cartId, userId]) => {
            if (isStable && isEmpty(cart) && !loaded && !isTempCartId(cartId)) {
                this.load(cartId, userId);
            }
        }));
        this.activeCart$ = using(() => loading.subscribe(), () => cartValue$).pipe(
        // Normalization for empty cart value returned as empty object.
        map(({ cart }) => (cart ? cart : {})), distinctUntilChanged(), shareReplay({ bufferSize: 1, refCount: true }));
    }
    detectUserChange() {
        // Any changes of userId is interesting for us, because we have to merge/load/switch cart in those cases.
        this.subscription.add(this.userIdService
            .getUserId()
            .pipe(
        // We never trigger cart merge/load on app initialization here and that's why we wait with pairwise for a change of userId.
        pairwise(), 
        // We need cartId once we have the previous and current userId. We don't want to subscribe to cartId stream before.
        withLatestFrom(this.activeCartId$))
            .subscribe(([[previousUserId, userId], cartId]) => {
            // Only change of user and not logout (current userId !== anonymous) should trigger loading mechanism
            if (isJustLoggedIn(userId, previousUserId)) {
                this.loadOrMerge(cartId, userId, previousUserId);
            }
        }));
    }
    /**
     * Returns active cart
     */
    getActive() {
        return this.activeCart$;
    }
    /**
     * Waits for the cart to be stable before returning the active cart.
     */
    takeActive() {
        return this.isStable().pipe(filter((isStable) => isStable), switchMap(() => this.getActive()), filter((cart) => !!cart), take(1));
    }
    /**
     * Returns active cart id
     */
    getActiveCartId() {
        return this.activeCart$.pipe(withLatestFrom(this.userIdService.getUserId()), map(([cart, userId]) => getCartIdByUserId(cart, userId)), distinctUntilChanged());
    }
    /**
     * Waits for the cart to be stable before returning the active cart's ID.
     */
    takeActiveCartId() {
        return this.isStable().pipe(filter((isStable) => isStable), switchMap(() => this.getActiveCartId()), filter((cartId) => !!cartId), take(1));
    }
    /**
     * Returns cart entries
     */
    getEntries() {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getEntries(cartId)), distinctUntilChanged());
    }
    /**
     * Returns last cart entry for provided product code.
     * Needed to cover processes where multiple entries can share the same product code
     * (e.g. promotions or configurable products)
     *
     * @param productCode
     */
    getLastEntry(productCode) {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getLastEntry(cartId, productCode)), distinctUntilChanged());
    }
    /**
     * Returns cart loading state
     */
    getLoading() {
        return this.cartEntity$.pipe(map((cartEntity) => Boolean(cartEntity.loading)), distinctUntilChanged());
    }
    /**
     * Returns true when cart is stable (not loading and not pending processes on cart)
     */
    isStable() {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.isStable(cartId)));
    }
    /**
     * Loads cart in every case except anonymous user and current cart combination
     */
    load(cartId, userId) {
        if (!(userId === OCC_USER_ID_ANONYMOUS && cartId === OCC_CART_ID_CURRENT)) {
            this.multiCartFacade.loadCart({
                userId,
                cartId,
                extraData: {
                    active: true,
                },
            });
        }
    }
    /**
     * Loads cart upon login, whenever there's an existing cart, merge it into the current user cart
     * cartId will be defined (not '', null, undefined)
     */
    loadOrMerge(cartId, userId, previousUserId) {
        if (cartId === OCC_CART_ID_CURRENT ||
            // It covers the case when you are logged in and then asm user login, you don't want to merge, but only load emulated user cart
            // Similarly when you are logged in as asm user and you logout and want to resume previous user session
            previousUserId !== OCC_USER_ID_ANONYMOUS) {
            this.multiCartFacade.loadCart({
                userId,
                cartId,
                extraData: {
                    active: true,
                },
            });
        }
        else if (Boolean(getLastValueSync(this.isGuestCart()))) {
            this.guestCartMerge(cartId);
        }
        else {
            // We have particular cart locally, but we logged in, so we need to combine this with current cart or make it ours.
            this.multiCartFacade.mergeToCurrentCart({
                userId,
                cartId,
                extraData: {
                    active: true,
                },
            });
        }
    }
    // TODO: Remove once backend is updated
    /**
     * Temporary method to merge guest cart with user cart because of backend limitation
     * This is for an edge case
     */
    guestCartMerge(cartId) {
        this.getEntries()
            .pipe(take(1))
            .subscribe((entries) => {
            this.multiCartFacade.deleteCart(cartId, OCC_USER_ID_ANONYMOUS);
            this.addEntriesGuestMerge(entries);
        });
    }
    /**
     * Adds entries from guest cart to user cart
     */
    addEntriesGuestMerge(cartEntries) {
        const entriesToAdd = cartEntries.map((entry) => ({
            productCode: entry.product?.code ?? '',
            quantity: entry.quantity ?? 0,
        }));
        this.requireLoadedCart(true)
            .pipe(withLatestFrom(this.userIdService.getUserId()))
            .subscribe(([cart, userId]) => {
            this.multiCartFacade.addEntries(userId, getCartIdByUserId(cart, userId), entriesToAdd);
        });
    }
    isCartCreating(cartState, cartId) {
        // cart creating is always represented with loading flags
        // when all loading flags are false it means that we restored wrong cart id
        // could happen on context change or reload right in the middle on cart create call
        return (isTempCartId(cartId) &&
            (cartState.loading || cartState.success || cartState.error));
    }
    requireLoadedCart(forGuestMerge = false) {
        this.checkInitLoad = this.checkInitLoad === undefined;
        // For guest cart merge we want to filter guest cart in the whole stream
        // We have to wait with load/create/addEntry after guest cart will be deleted.
        const cartSelector$ = (forGuestMerge
            ? this.cartEntity$.pipe(filter(() => !Boolean(getLastValueSync(this.isGuestCart()))))
            : this.cartEntity$).pipe(filter((cartState) => !cartState.loading || !!this.checkInitLoad));
        return this.activeCartId$.pipe(
        // Avoid load/create call when there are new cart creating at the moment
        withLatestFrom(cartSelector$), filter(([cartId, cartState]) => !this.isCartCreating(cartState, cartId)), map(([, cartState]) => cartState), take(1), withLatestFrom(this.userIdService.getUserId()), tap(([cartState, userId]) => {
            // Try to load the cart, because it might have been created on another device between our login and add entry call
            if (isEmpty(cartState.value) &&
                userId !== OCC_USER_ID_ANONYMOUS &&
                !cartState.loading) {
                this.load(OCC_CART_ID_CURRENT, userId);
            }
            this.checkInitLoad = false;
        }), switchMapTo(cartSelector$), 
        // create cart can happen to anonymous user if it is empty or to any other user if it is loaded and empty
        withLatestFrom(this.userIdService.getUserId()), filter(([cartState, userId]) => Boolean(userId === OCC_USER_ID_ANONYMOUS ||
            cartState.success ||
            cartState.error)), take(1), tap(([cartState, userId]) => {
            if (isEmpty(cartState.value)) {
                this.multiCartFacade.createCart({
                    userId,
                    extraData: {
                        active: true,
                    },
                });
            }
        }), switchMapTo(cartSelector$), filter((cartState) => cartState.success || cartState.error), 
        // wait for active cart id to point to code/guid to avoid some work on temp cart entity
        withLatestFrom(this.activeCartId$), filter(([cartState, cartId]) => !this.isCartCreating(cartState, cartId)), map(([cartState]) => cartState.value), filter((cart) => !isEmpty(cart)), take(1));
    }
    /**
     * Add entry to active cart
     *
     * @param productCode
     * @param quantity
     * @param pickupStore
     */
    addEntry(productCode, quantity, pickupStore) {
        this.requireLoadedCart()
            .pipe(withLatestFrom(this.userIdService.getUserId()))
            .subscribe(([cart, userId]) => {
            this.multiCartFacade.addEntry(userId, getCartIdByUserId(cart, userId), productCode, quantity, pickupStore);
        });
    }
    /**
     * Remove entry
     *
     * @param entry
     */
    removeEntry(entry) {
        this.activeCartId$
            .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
            .subscribe(([cartId, userId]) => {
            this.multiCartFacade.removeEntry(userId, cartId, entry.entryNumber);
        });
    }
    /**
     * Update entry
     *
     * @param entryNumber
     * @param quantity
     * @param pickupStore
     * @param pickupToDelivery
     */
    updateEntry(entryNumber, quantity, pickupStore, pickupToDelivery = false) {
        this.activeCartId$
            .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
            .subscribe(([cartId, userId]) => {
            this.multiCartFacade.updateEntry(userId, cartId, entryNumber, quantity, pickupStore, pickupToDelivery);
        });
    }
    /**
     * Returns cart entry
     *
     * @param productCode
     */
    getEntry(productCode) {
        return this.activeCartId$.pipe(switchMap((cartId) => this.multiCartFacade.getEntry(cartId, productCode)), distinctUntilChanged());
    }
    /**
     * Assign email to cart
     *
     * @param email
     */
    addEmail(email) {
        this.activeCartId$
            .pipe(withLatestFrom(this.userIdService.getUserId()), take(1))
            .subscribe(([cartId, userId]) => {
            this.multiCartFacade.assignEmail(cartId, userId, email);
        });
    }
    /**
     * Get assigned user to cart
     */
    getAssignedUser() {
        return this.activeCart$.pipe(map((cart) => cart.user));
    }
    // TODO: Make cart required param in 4.0
    /**
     * Returns observable of true for guest cart
     */
    isGuestCart(cart) {
        return cart
            ? of(this.isCartUserGuest(cart))
            : this.activeCart$.pipe(map((activeCart) => this.isCartUserGuest(activeCart)), distinctUntilChanged());
    }
    isCartUserGuest(cart) {
        const cartUser = cart.user;
        return Boolean(cartUser &&
            (cartUser.name === OCC_USER_ID_GUEST ||
                isEmail(cartUser.uid?.split('|').slice(1).join('|'))));
    }
    /**
     * Add multiple entries to a cart
     *
     * @param cartEntries : list of entries to add (OrderEntry[])
     */
    addEntries(cartEntries) {
        const entriesToAdd = cartEntries.map((entry) => ({
            productCode: entry.product?.code ?? '',
            quantity: entry.quantity ?? 0,
        }));
        this.requireLoadedCart()
            .pipe(withLatestFrom(this.userIdService.getUserId()))
            .subscribe(([cart, userId]) => {
            if (cart) {
                this.multiCartFacade.addEntries(userId, getCartIdByUserId(cart, userId), entriesToAdd);
            }
        });
    }
    /**
     * Reloads active cart
     */
    reloadActiveCart() {
        combineLatest([this.getActiveCartId(), this.userIdService.takeUserId()])
            .pipe(take(1), map(([cartId, userId]) => {
            this.multiCartFacade.loadCart({
                cartId,
                userId,
                extraData: { active: true },
            });
        }))
            .subscribe();
    }
    hasPickupItems() {
        return this.getActive().pipe(map((cart) => cart.pickupItemsQuantity ? cart.pickupItemsQuantity > 0 : false));
    }
    hasDeliveryItems() {
        return this.getActive().pipe(map((cart) => cart.deliveryItemsQuantity ? cart.deliveryItemsQuantity > 0 : false));
    }
    getPickupEntries() {
        return this.getEntries().pipe(map((entries) => entries.filter((entry) => entry.deliveryPointOfService !== undefined)));
    }
    getDeliveryEntries() {
        return this.getEntries().pipe(map((entries) => entries.filter((entry) => entry.deliveryPointOfService === undefined)));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ActiveCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ActiveCartService, deps: [{ token: i1.MultiCartFacade }, { token: i2.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
ActiveCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ActiveCartService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ActiveCartService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.MultiCartFacade }, { type: i2.UserIdService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLWNhcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29yZS9mYWNhZGUvYWN0aXZlLWNhcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUN0RCxPQUFPLEVBR0wsUUFBUSxHQUdULE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixtQkFBbUIsRUFDbkIscUJBQXFCLEVBQ3JCLGlCQUFpQixHQUlsQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUUsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sR0FBRyxFQUNILFFBQVEsRUFDUixXQUFXLEVBQ1gsU0FBUyxFQUNULFdBQVcsRUFDWCxJQUFJLEVBQ0osR0FBRyxFQUNILGNBQWMsR0FDZixNQUFNLGdCQUFnQixDQUFDO0FBQ3hCLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsT0FBTyxFQUNQLE9BQU8sRUFDUCxjQUFjLEVBQ2QsWUFBWSxHQUNiLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHeEIsTUFBTSxPQUFPLGlCQUFpQjtJQXFCNUIsWUFDWSxlQUFnQyxFQUNoQyxhQUE0QjtRQUQ1QixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFyQjlCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU1QywwREFBMEQ7UUFDaEQsa0JBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUk7UUFDM0QsK0VBQStFO1FBQy9FLG1FQUFtRTtRQUNuRSxJ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QyxDQUFDLENBQUMsS0FBSyxDQUNoRSxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUMxQixHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNYLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUNwRSxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUMzQixHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUNkLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsS0FBSyxTQUFTLENBQUMsQ0FDdEUsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVELGtCQUFrQjtRQUNoQixPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQzNCLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ2QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLHNCQUFzQixLQUFLLFNBQVMsQ0FBQyxDQUN0RSxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7OEdBcmhCVSxpQkFBaUI7a0hBQWpCLGlCQUFpQjsyRkFBakIsaUJBQWlCO2tCQUQ3QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBY3RpdmVDYXJ0RmFjYWRlLFxuICBDYXJ0LFxuICBDYXJ0VHlwZSxcbiAgTXVsdGlDYXJ0RmFjYWRlLFxuICBPcmRlckVudHJ5LFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIGdldExhc3RWYWx1ZVN5bmMsXG4gIE9DQ19DQVJUX0lEX0NVUlJFTlQsXG4gIE9DQ19VU0VSX0lEX0FOT05ZTU9VUyxcbiAgT0NDX1VTRVJfSURfR1VFU1QsXG4gIFN0YXRlVXRpbHMsXG4gIFVzZXIsXG4gIFVzZXJJZFNlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiwgU3Vic2NyaXB0aW9uLCB1c2luZyB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGlzdGluY3RVbnRpbENoYW5nZWQsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBwYWlyd2lzZSxcbiAgc2hhcmVSZXBsYXksXG4gIHN3aXRjaE1hcCxcbiAgc3dpdGNoTWFwVG8sXG4gIHRha2UsXG4gIHRhcCxcbiAgd2l0aExhdGVzdEZyb20sXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIGdldENhcnRJZEJ5VXNlcklkLFxuICBpc0VtYWlsLFxuICBpc0VtcHR5LFxuICBpc0p1c3RMb2dnZWRJbixcbiAgaXNUZW1wQ2FydElkLFxufSBmcm9tICcuLi91dGlscy91dGlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBY3RpdmVDYXJ0U2VydmljZSBpbXBsZW1lbnRzIEFjdGl2ZUNhcnRGYWNhZGUsIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBhY3RpdmVDYXJ0JDogT2JzZXJ2YWJsZTxDYXJ0PjtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAvLyBUaGlzIHN0cmVhbSBpcyB1c2VkIGZvciByZWZlcmVuY2luZyBjYXJ0cyBpbiBBUEkgY2FsbHMuXG4gIHByb3RlY3RlZCBhY3RpdmVDYXJ0SWQkID0gdGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpLnBpcGUoXG4gICAgLy8gV2Ugd2FudCB0byB3YWl0IHRoZSBpbml0aWFsaXphdGlvbiBvZiBjYXJ0SWQgdW50aWwgdGhlIHVzZXJJZCBpcyBpbml0aWFsaXplZFxuICAgIC8vIFdlIGhhdmUgdGFrZSgxKSB0byBub3QgdHJpZ2dlciB0aGlzIHN0cmVhbSwgd2hlbiB1c2VySWQgY2hhbmdlcy5cbiAgICB0YWtlKDEpLFxuICAgIHN3aXRjaE1hcFRvKHRoaXMubXVsdGlDYXJ0RmFjYWRlLmdldENhcnRJZEJ5VHlwZShDYXJ0VHlwZS5BQ1RJVkUpKSxcbiAgICAvLyBXZSBhbHNvIHdhaXQgdW50aWwgd2UgaW5pdGlhbGl6ZSBjYXJ0IGZyb20gbG9jYWxTdG9yYWdlXG4gICAgZmlsdGVyKChjYXJ0SWQpID0+IGNhcnRJZCAhPT0gdW5kZWZpbmVkKSxcbiAgICAvLyBmYWxsYmFjayB0byBjdXJyZW50IHdoZW4gd2UgZG9uJ3QgaGF2ZSBwYXJ0aWN1bGFyIGNhcnQgaWRcbiAgICBtYXAoKGNhcnRJZCkgPT4gKGNhcnRJZCA9PT0gJycgPyBPQ0NfQ0FSVF9JRF9DVVJSRU5UIDogY2FydElkKSlcbiAgKTtcblxuICAvLyBTdHJlYW0gd2l0aCBhY3RpdmUgY2FydCBlbnRpdHlcbiAgcHJvdGVjdGVkIGNhcnRFbnRpdHkkID0gdGhpcy5hY3RpdmVDYXJ0SWQkLnBpcGUoXG4gICAgc3dpdGNoTWFwKChjYXJ0SWQpID0+IHRoaXMubXVsdGlDYXJ0RmFjYWRlLmdldENhcnRFbnRpdHkoY2FydElkKSlcbiAgKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgbXVsdGlDYXJ0RmFjYWRlOiBNdWx0aUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5pbml0QWN0aXZlQ2FydCgpO1xuICAgIHRoaXMuZGV0ZWN0VXNlckNoYW5nZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRBY3RpdmVDYXJ0KCkge1xuICAgIC8vIFN0cmVhbSBmb3IgZ2V0dGluZyB0aGUgY2FydCB2YWx1ZVxuICAgIGNvbnN0IGNhcnRWYWx1ZSQgPSB0aGlzLmNhcnRFbnRpdHkkLnBpcGUoXG4gICAgICBtYXAoKGNhcnRFbnRpdHkpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjYXJ0OiBjYXJ0RW50aXR5LnZhbHVlLFxuICAgICAgICAgIGlzU3RhYmxlOiAhY2FydEVudGl0eS5sb2FkaW5nICYmIGNhcnRFbnRpdHkucHJvY2Vzc2VzQ291bnQgPT09IDAsXG4gICAgICAgICAgbG9hZGVkOiBCb29sZWFuKFxuICAgICAgICAgICAgKGNhcnRFbnRpdHkuZXJyb3IgfHwgY2FydEVudGl0eS5zdWNjZXNzKSAmJiAhY2FydEVudGl0eS5sb2FkaW5nXG4gICAgICAgICAgKSxcbiAgICAgICAgfTtcbiAgICAgIH0pLFxuICAgICAgLy8gd2Ugd2FudCB0byBlbWl0IGVtcHR5IGNhcnRzIGV2ZW4gaWYgdGhvc2UgYXJlIG5vdCBzdGFibGVcbiAgICAgIC8vIG9uIG1lcmdlIGNhcnQgYWN0aW9uIHdlIHdhbnQgdG8gc3dpdGNoIHRvIGVtcHR5IGNhcnQgc28gbm8gb25lIHdvdWxkIHVzZSBvbGQgY2FydElkIHdoaWNoIGNhbiBiZSBhbHJlYWR5IG9ic29sZXRlXG4gICAgICAvLyBzbyBvbiBtZXJnZSBhY3Rpb24gdGhlIHJlc3VsdGluZyBzdHJlYW0gbG9va3MgbGlrZSB0aGlzOiBvbGRfY2FydCAtPiB7fSAtPiBuZXdfY2FydFxuICAgICAgZmlsdGVyKCh7IGlzU3RhYmxlLCBjYXJ0IH0pID0+IGlzU3RhYmxlIHx8IGlzRW1wdHkoY2FydCkpXG4gICAgKTtcblxuICAgIC8vIFJlc3BvbnNpYmxlIGZvciBsb2FkaW5nIGNhcnQgd2hlbiBpdCBkb2VzIG5vdCBleGlzdCAoZWcuIGFwcCBpbml0aWFsaXphdGlvbiB3aGVuIHdlIGhhdmUgb25seSBjYXJ0SWQpXG4gICAgY29uc3QgbG9hZGluZyA9IGNhcnRWYWx1ZSQucGlwZShcbiAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuYWN0aXZlQ2FydElkJCwgdGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSxcbiAgICAgIHRhcCgoW3sgY2FydCwgbG9hZGVkLCBpc1N0YWJsZSB9LCBjYXJ0SWQsIHVzZXJJZF0pID0+IHtcbiAgICAgICAgaWYgKGlzU3RhYmxlICYmIGlzRW1wdHkoY2FydCkgJiYgIWxvYWRlZCAmJiAhaXNUZW1wQ2FydElkKGNhcnRJZCkpIHtcbiAgICAgICAgICB0aGlzLmxvYWQoY2FydElkLCB1c2VySWQpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLmFjdGl2ZUNhcnQkID0gdXNpbmcoXG4gICAgICAoKSA9PiBsb2FkaW5nLnN1YnNjcmliZSgpLFxuICAgICAgKCkgPT4gY2FydFZhbHVlJFxuICAgICkucGlwZShcbiAgICAgIC8vIE5vcm1hbGl6YXRpb24gZm9yIGVtcHR5IGNhcnQgdmFsdWUgcmV0dXJuZWQgYXMgZW1wdHkgb2JqZWN0LlxuICAgICAgbWFwKCh7IGNhcnQgfSkgPT4gKGNhcnQgPyBjYXJ0IDoge30pKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICBzaGFyZVJlcGxheSh7IGJ1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZXRlY3RVc2VyQ2hhbmdlKCkge1xuICAgIC8vIEFueSBjaGFuZ2VzIG9mIHVzZXJJZCBpcyBpbnRlcmVzdGluZyBmb3IgdXMsIGJlY2F1c2Ugd2UgaGF2ZSB0byBtZXJnZS9sb2FkL3N3aXRjaCBjYXJ0IGluIHRob3NlIGNhc2VzLlxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMudXNlcklkU2VydmljZVxuICAgICAgICAuZ2V0VXNlcklkKClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgLy8gV2UgbmV2ZXIgdHJpZ2dlciBjYXJ0IG1lcmdlL2xvYWQgb24gYXBwIGluaXRpYWxpemF0aW9uIGhlcmUgYW5kIHRoYXQncyB3aHkgd2Ugd2FpdCB3aXRoIHBhaXJ3aXNlIGZvciBhIGNoYW5nZSBvZiB1c2VySWQuXG4gICAgICAgICAgcGFpcndpc2UoKSxcbiAgICAgICAgICAvLyBXZSBuZWVkIGNhcnRJZCBvbmNlIHdlIGhhdmUgdGhlIHByZXZpb3VzIGFuZCBjdXJyZW50IHVzZXJJZC4gV2UgZG9uJ3Qgd2FudCB0byBzdWJzY3JpYmUgdG8gY2FydElkIHN0cmVhbSBiZWZvcmUuXG4gICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5hY3RpdmVDYXJ0SWQkKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKFtbcHJldmlvdXNVc2VySWQsIHVzZXJJZF0sIGNhcnRJZF0pID0+IHtcbiAgICAgICAgICAvLyBPbmx5IGNoYW5nZSBvZiB1c2VyIGFuZCBub3QgbG9nb3V0IChjdXJyZW50IHVzZXJJZCAhPT0gYW5vbnltb3VzKSBzaG91bGQgdHJpZ2dlciBsb2FkaW5nIG1lY2hhbmlzbVxuICAgICAgICAgIGlmIChpc0p1c3RMb2dnZWRJbih1c2VySWQsIHByZXZpb3VzVXNlcklkKSkge1xuICAgICAgICAgICAgdGhpcy5sb2FkT3JNZXJnZShjYXJ0SWQsIHVzZXJJZCwgcHJldmlvdXNVc2VySWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYWN0aXZlIGNhcnRcbiAgICovXG4gIGdldEFjdGl2ZSgpOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVDYXJ0JDtcbiAgfVxuXG4gIC8qKlxuICAgKiBXYWl0cyBmb3IgdGhlIGNhcnQgdG8gYmUgc3RhYmxlIGJlZm9yZSByZXR1cm5pbmcgdGhlIGFjdGl2ZSBjYXJ0LlxuICAgKi9cbiAgdGFrZUFjdGl2ZSgpOiBPYnNlcnZhYmxlPENhcnQ+IHtcbiAgICByZXR1cm4gdGhpcy5pc1N0YWJsZSgpLnBpcGUoXG4gICAgICBmaWx0ZXIoKGlzU3RhYmxlKSA9PiBpc1N0YWJsZSksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4gdGhpcy5nZXRBY3RpdmUoKSksXG4gICAgICBmaWx0ZXIoKGNhcnQpID0+ICEhY2FydCksXG4gICAgICB0YWtlKDEpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFjdGl2ZSBjYXJ0IGlkXG4gICAqL1xuICBnZXRBY3RpdmVDYXJ0SWQoKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVDYXJ0JC5waXBlKFxuICAgICAgd2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSxcbiAgICAgIG1hcCgoW2NhcnQsIHVzZXJJZF0pID0+IGdldENhcnRJZEJ5VXNlcklkKGNhcnQsIHVzZXJJZCkpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogV2FpdHMgZm9yIHRoZSBjYXJ0IHRvIGJlIHN0YWJsZSBiZWZvcmUgcmV0dXJuaW5nIHRoZSBhY3RpdmUgY2FydCdzIElELlxuICAgKi9cbiAgdGFrZUFjdGl2ZUNhcnRJZCgpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLmlzU3RhYmxlKCkucGlwZShcbiAgICAgIGZpbHRlcigoaXNTdGFibGUpID0+IGlzU3RhYmxlKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLmdldEFjdGl2ZUNhcnRJZCgpKSxcbiAgICAgIGZpbHRlcigoY2FydElkKSA9PiAhIWNhcnRJZCksXG4gICAgICB0YWtlKDEpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGNhcnQgZW50cmllc1xuICAgKi9cbiAgZ2V0RW50cmllcygpOiBPYnNlcnZhYmxlPE9yZGVyRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnRJZCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoY2FydElkKSA9PiB0aGlzLm11bHRpQ2FydEZhY2FkZS5nZXRFbnRyaWVzKGNhcnRJZCkpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBsYXN0IGNhcnQgZW50cnkgZm9yIHByb3ZpZGVkIHByb2R1Y3QgY29kZS5cbiAgICogTmVlZGVkIHRvIGNvdmVyIHByb2Nlc3NlcyB3aGVyZSBtdWx0aXBsZSBlbnRyaWVzIGNhbiBzaGFyZSB0aGUgc2FtZSBwcm9kdWN0IGNvZGVcbiAgICogKGUuZy4gcHJvbW90aW9ucyBvciBjb25maWd1cmFibGUgcHJvZHVjdHMpXG4gICAqXG4gICAqIEBwYXJhbSBwcm9kdWN0Q29kZVxuICAgKi9cbiAgZ2V0TGFzdEVudHJ5KHByb2R1Y3RDb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPE9yZGVyRW50cnkgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVDYXJ0SWQkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGNhcnRJZCkgPT5cbiAgICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUuZ2V0TGFzdEVudHJ5KGNhcnRJZCwgcHJvZHVjdENvZGUpXG4gICAgICApLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBjYXJ0IGxvYWRpbmcgc3RhdGVcbiAgICovXG4gIGdldExvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuY2FydEVudGl0eSQucGlwZShcbiAgICAgIG1hcCgoY2FydEVudGl0eSkgPT4gQm9vbGVhbihjYXJ0RW50aXR5LmxvYWRpbmcpKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSB3aGVuIGNhcnQgaXMgc3RhYmxlIChub3QgbG9hZGluZyBhbmQgbm90IHBlbmRpbmcgcHJvY2Vzc2VzIG9uIGNhcnQpXG4gICAqL1xuICBpc1N0YWJsZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVDYXJ0SWQkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGNhcnRJZCkgPT4gdGhpcy5tdWx0aUNhcnRGYWNhZGUuaXNTdGFibGUoY2FydElkKSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGNhcnQgaW4gZXZlcnkgY2FzZSBleGNlcHQgYW5vbnltb3VzIHVzZXIgYW5kIGN1cnJlbnQgY2FydCBjb21iaW5hdGlvblxuICAgKi9cbiAgcHJvdGVjdGVkIGxvYWQoY2FydElkOiBzdHJpbmcsIHVzZXJJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCEodXNlcklkID09PSBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMgJiYgY2FydElkID09PSBPQ0NfQ0FSVF9JRF9DVVJSRU5UKSkge1xuICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUubG9hZENhcnQoe1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGNhcnRJZCxcbiAgICAgICAgZXh0cmFEYXRhOiB7XG4gICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExvYWRzIGNhcnQgdXBvbiBsb2dpbiwgd2hlbmV2ZXIgdGhlcmUncyBhbiBleGlzdGluZyBjYXJ0LCBtZXJnZSBpdCBpbnRvIHRoZSBjdXJyZW50IHVzZXIgY2FydFxuICAgKiBjYXJ0SWQgd2lsbCBiZSBkZWZpbmVkIChub3QgJycsIG51bGwsIHVuZGVmaW5lZClcbiAgICovXG4gIHByb3RlY3RlZCBsb2FkT3JNZXJnZShcbiAgICBjYXJ0SWQ6IHN0cmluZyxcbiAgICB1c2VySWQ6IHN0cmluZyxcbiAgICBwcmV2aW91c1VzZXJJZDogc3RyaW5nXG4gICk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIGNhcnRJZCA9PT0gT0NDX0NBUlRfSURfQ1VSUkVOVCB8fFxuICAgICAgLy8gSXQgY292ZXJzIHRoZSBjYXNlIHdoZW4geW91IGFyZSBsb2dnZWQgaW4gYW5kIHRoZW4gYXNtIHVzZXIgbG9naW4sIHlvdSBkb24ndCB3YW50IHRvIG1lcmdlLCBidXQgb25seSBsb2FkIGVtdWxhdGVkIHVzZXIgY2FydFxuICAgICAgLy8gU2ltaWxhcmx5IHdoZW4geW91IGFyZSBsb2dnZWQgaW4gYXMgYXNtIHVzZXIgYW5kIHlvdSBsb2dvdXQgYW5kIHdhbnQgdG8gcmVzdW1lIHByZXZpb3VzIHVzZXIgc2Vzc2lvblxuICAgICAgcHJldmlvdXNVc2VySWQgIT09IE9DQ19VU0VSX0lEX0FOT05ZTU9VU1xuICAgICkge1xuICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUubG9hZENhcnQoe1xuICAgICAgICB1c2VySWQsXG4gICAgICAgIGNhcnRJZCxcbiAgICAgICAgZXh0cmFEYXRhOiB7XG4gICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChCb29sZWFuKGdldExhc3RWYWx1ZVN5bmModGhpcy5pc0d1ZXN0Q2FydCgpKSkpIHtcbiAgICAgIHRoaXMuZ3Vlc3RDYXJ0TWVyZ2UoY2FydElkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2UgaGF2ZSBwYXJ0aWN1bGFyIGNhcnQgbG9jYWxseSwgYnV0IHdlIGxvZ2dlZCBpbiwgc28gd2UgbmVlZCB0byBjb21iaW5lIHRoaXMgd2l0aCBjdXJyZW50IGNhcnQgb3IgbWFrZSBpdCBvdXJzLlxuICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUubWVyZ2VUb0N1cnJlbnRDYXJ0KHtcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBjYXJ0SWQsXG4gICAgICAgIGV4dHJhRGF0YToge1xuICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE86IFJlbW92ZSBvbmNlIGJhY2tlbmQgaXMgdXBkYXRlZFxuICAvKipcbiAgICogVGVtcG9yYXJ5IG1ldGhvZCB0byBtZXJnZSBndWVzdCBjYXJ0IHdpdGggdXNlciBjYXJ0IGJlY2F1c2Ugb2YgYmFja2VuZCBsaW1pdGF0aW9uXG4gICAqIFRoaXMgaXMgZm9yIGFuIGVkZ2UgY2FzZVxuICAgKi9cbiAgcHJvdGVjdGVkIGd1ZXN0Q2FydE1lcmdlKGNhcnRJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5nZXRFbnRyaWVzKClcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKChlbnRyaWVzKSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlDYXJ0RmFjYWRlLmRlbGV0ZUNhcnQoY2FydElkLCBPQ0NfVVNFUl9JRF9BTk9OWU1PVVMpO1xuICAgICAgICB0aGlzLmFkZEVudHJpZXNHdWVzdE1lcmdlKGVudHJpZXMpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBlbnRyaWVzIGZyb20gZ3Vlc3QgY2FydCB0byB1c2VyIGNhcnRcbiAgICovXG4gIHByb3RlY3RlZCBhZGRFbnRyaWVzR3Vlc3RNZXJnZShjYXJ0RW50cmllczogT3JkZXJFbnRyeVtdKSB7XG4gICAgY29uc3QgZW50cmllc1RvQWRkID0gY2FydEVudHJpZXMubWFwKChlbnRyeSkgPT4gKHtcbiAgICAgIHByb2R1Y3RDb2RlOiBlbnRyeS5wcm9kdWN0Py5jb2RlID8/ICcnLFxuICAgICAgcXVhbnRpdHk6IGVudHJ5LnF1YW50aXR5ID8/IDAsXG4gICAgfSkpO1xuICAgIHRoaXMucmVxdWlyZUxvYWRlZENhcnQodHJ1ZSlcbiAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMudXNlcklkU2VydmljZS5nZXRVc2VySWQoKSkpXG4gICAgICAuc3Vic2NyaWJlKChbY2FydCwgdXNlcklkXSkgPT4ge1xuICAgICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5hZGRFbnRyaWVzKFxuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICBnZXRDYXJ0SWRCeVVzZXJJZChjYXJ0LCB1c2VySWQpLFxuICAgICAgICAgIGVudHJpZXNUb0FkZFxuICAgICAgICApO1xuICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDYXJ0Q3JlYXRpbmcoXG4gICAgY2FydFN0YXRlOiBTdGF0ZVV0aWxzLlByb2Nlc3Nlc0xvYWRlclN0YXRlPENhcnQgfCB1bmRlZmluZWQ+LFxuICAgIGNhcnRJZDogc3RyaW5nXG4gICkge1xuICAgIC8vIGNhcnQgY3JlYXRpbmcgaXMgYWx3YXlzIHJlcHJlc2VudGVkIHdpdGggbG9hZGluZyBmbGFnc1xuICAgIC8vIHdoZW4gYWxsIGxvYWRpbmcgZmxhZ3MgYXJlIGZhbHNlIGl0IG1lYW5zIHRoYXQgd2UgcmVzdG9yZWQgd3JvbmcgY2FydCBpZFxuICAgIC8vIGNvdWxkIGhhcHBlbiBvbiBjb250ZXh0IGNoYW5nZSBvciByZWxvYWQgcmlnaHQgaW4gdGhlIG1pZGRsZSBvbiBjYXJ0IGNyZWF0ZSBjYWxsXG4gICAgcmV0dXJuIChcbiAgICAgIGlzVGVtcENhcnRJZChjYXJ0SWQpICYmXG4gICAgICAoY2FydFN0YXRlLmxvYWRpbmcgfHwgY2FydFN0YXRlLnN1Y2Nlc3MgfHwgY2FydFN0YXRlLmVycm9yKVxuICAgICk7XG4gIH1cblxuICAvLyBXaGVuIHRoZSBmdW5jdGlvbiBgcmVxdWlyZUxvYWRlZENhcnRgIGlzIGZpcnN0IGNhbGxlZCwgdGhlIGluaXQgY2FydCBsb2FkaW5nIGZvciBsb2dpbiB1c2VyIG1heSBub3QgYmUgZG9uZVxuICBwcml2YXRlIGNoZWNrSW5pdExvYWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgcmVxdWlyZUxvYWRlZENhcnQoZm9yR3Vlc3RNZXJnZSA9IGZhbHNlKTogT2JzZXJ2YWJsZTxDYXJ0PiB7XG4gICAgdGhpcy5jaGVja0luaXRMb2FkID0gdGhpcy5jaGVja0luaXRMb2FkID09PSB1bmRlZmluZWQ7XG5cbiAgICAvLyBGb3IgZ3Vlc3QgY2FydCBtZXJnZSB3ZSB3YW50IHRvIGZpbHRlciBndWVzdCBjYXJ0IGluIHRoZSB3aG9sZSBzdHJlYW1cbiAgICAvLyBXZSBoYXZlIHRvIHdhaXQgd2l0aCBsb2FkL2NyZWF0ZS9hZGRFbnRyeSBhZnRlciBndWVzdCBjYXJ0IHdpbGwgYmUgZGVsZXRlZC5cbiAgICBjb25zdCBjYXJ0U2VsZWN0b3IkID0gKFxuICAgICAgZm9yR3Vlc3RNZXJnZVxuICAgICAgICA/IHRoaXMuY2FydEVudGl0eSQucGlwZShcbiAgICAgICAgICAgIGZpbHRlcigoKSA9PiAhQm9vbGVhbihnZXRMYXN0VmFsdWVTeW5jKHRoaXMuaXNHdWVzdENhcnQoKSkpKVxuICAgICAgICAgIClcbiAgICAgICAgOiB0aGlzLmNhcnRFbnRpdHkkXG4gICAgKS5waXBlKGZpbHRlcigoY2FydFN0YXRlKSA9PiAhY2FydFN0YXRlLmxvYWRpbmcgfHwgISF0aGlzLmNoZWNrSW5pdExvYWQpKTtcblxuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnRJZCQucGlwZShcbiAgICAgIC8vIEF2b2lkIGxvYWQvY3JlYXRlIGNhbGwgd2hlbiB0aGVyZSBhcmUgbmV3IGNhcnQgY3JlYXRpbmcgYXQgdGhlIG1vbWVudFxuICAgICAgd2l0aExhdGVzdEZyb20oY2FydFNlbGVjdG9yJCksXG4gICAgICBmaWx0ZXIoKFtjYXJ0SWQsIGNhcnRTdGF0ZV0pID0+ICF0aGlzLmlzQ2FydENyZWF0aW5nKGNhcnRTdGF0ZSwgY2FydElkKSksXG4gICAgICBtYXAoKFssIGNhcnRTdGF0ZV0pID0+IGNhcnRTdGF0ZSksXG4gICAgICB0YWtlKDEpLFxuICAgICAgd2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSxcbiAgICAgIHRhcCgoW2NhcnRTdGF0ZSwgdXNlcklkXSkgPT4ge1xuICAgICAgICAvLyBUcnkgdG8gbG9hZCB0aGUgY2FydCwgYmVjYXVzZSBpdCBtaWdodCBoYXZlIGJlZW4gY3JlYXRlZCBvbiBhbm90aGVyIGRldmljZSBiZXR3ZWVuIG91ciBsb2dpbiBhbmQgYWRkIGVudHJ5IGNhbGxcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlzRW1wdHkoY2FydFN0YXRlLnZhbHVlKSAmJlxuICAgICAgICAgIHVzZXJJZCAhPT0gT0NDX1VTRVJfSURfQU5PTllNT1VTICYmXG4gICAgICAgICAgIWNhcnRTdGF0ZS5sb2FkaW5nXG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMubG9hZChPQ0NfQ0FSVF9JRF9DVVJSRU5ULCB1c2VySWQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tJbml0TG9hZCA9IGZhbHNlO1xuICAgICAgfSksXG4gICAgICBzd2l0Y2hNYXBUbyhjYXJ0U2VsZWN0b3IkKSxcbiAgICAgIC8vIGNyZWF0ZSBjYXJ0IGNhbiBoYXBwZW4gdG8gYW5vbnltb3VzIHVzZXIgaWYgaXQgaXMgZW1wdHkgb3IgdG8gYW55IG90aGVyIHVzZXIgaWYgaXQgaXMgbG9hZGVkIGFuZCBlbXB0eVxuICAgICAgd2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSxcbiAgICAgIGZpbHRlcigoW2NhcnRTdGF0ZSwgdXNlcklkXSkgPT5cbiAgICAgICAgQm9vbGVhbihcbiAgICAgICAgICB1c2VySWQgPT09IE9DQ19VU0VSX0lEX0FOT05ZTU9VUyB8fFxuICAgICAgICAgICAgY2FydFN0YXRlLnN1Y2Nlc3MgfHxcbiAgICAgICAgICAgIGNhcnRTdGF0ZS5lcnJvclxuICAgICAgICApXG4gICAgICApLFxuICAgICAgdGFrZSgxKSxcbiAgICAgIHRhcCgoW2NhcnRTdGF0ZSwgdXNlcklkXSkgPT4ge1xuICAgICAgICBpZiAoaXNFbXB0eShjYXJ0U3RhdGUudmFsdWUpKSB7XG4gICAgICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUuY3JlYXRlQ2FydCh7XG4gICAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgICBleHRyYURhdGE6IHtcbiAgICAgICAgICAgICAgYWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBzd2l0Y2hNYXBUbyhjYXJ0U2VsZWN0b3IkKSxcbiAgICAgIGZpbHRlcigoY2FydFN0YXRlKSA9PiBjYXJ0U3RhdGUuc3VjY2VzcyB8fCBjYXJ0U3RhdGUuZXJyb3IpLFxuICAgICAgLy8gd2FpdCBmb3IgYWN0aXZlIGNhcnQgaWQgdG8gcG9pbnQgdG8gY29kZS9ndWlkIHRvIGF2b2lkIHNvbWUgd29yayBvbiB0ZW1wIGNhcnQgZW50aXR5XG4gICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmFjdGl2ZUNhcnRJZCQpLFxuICAgICAgZmlsdGVyKChbY2FydFN0YXRlLCBjYXJ0SWRdKSA9PiAhdGhpcy5pc0NhcnRDcmVhdGluZyhjYXJ0U3RhdGUsIGNhcnRJZCkpLFxuICAgICAgbWFwKChbY2FydFN0YXRlXSkgPT4gY2FydFN0YXRlLnZhbHVlKSxcbiAgICAgIGZpbHRlcigoY2FydCkgPT4gIWlzRW1wdHkoY2FydCkpLFxuICAgICAgdGFrZSgxKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGVudHJ5IHRvIGFjdGl2ZSBjYXJ0XG4gICAqXG4gICAqIEBwYXJhbSBwcm9kdWN0Q29kZVxuICAgKiBAcGFyYW0gcXVhbnRpdHlcbiAgICogQHBhcmFtIHBpY2t1cFN0b3JlXG4gICAqL1xuICBhZGRFbnRyeShwcm9kdWN0Q29kZTogc3RyaW5nLCBxdWFudGl0eTogbnVtYmVyLCBwaWNrdXBTdG9yZT86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMucmVxdWlyZUxvYWRlZENhcnQoKVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtjYXJ0LCB1c2VySWRdKSA9PiB7XG4gICAgICAgIHRoaXMubXVsdGlDYXJ0RmFjYWRlLmFkZEVudHJ5KFxuICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICBnZXRDYXJ0SWRCeVVzZXJJZChjYXJ0LCB1c2VySWQpLFxuICAgICAgICAgIHByb2R1Y3RDb2RlLFxuICAgICAgICAgIHF1YW50aXR5LFxuICAgICAgICAgIHBpY2t1cFN0b3JlXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgZW50cnlcbiAgICpcbiAgICogQHBhcmFtIGVudHJ5XG4gICAqL1xuICByZW1vdmVFbnRyeShlbnRyeTogT3JkZXJFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlQ2FydElkJFxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSwgdGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtjYXJ0SWQsIHVzZXJJZF0pID0+IHtcbiAgICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUucmVtb3ZlRW50cnkoXG4gICAgICAgICAgdXNlcklkLFxuICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICBlbnRyeS5lbnRyeU51bWJlciBhcyBudW1iZXJcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBlbnRyeVxuICAgKlxuICAgKiBAcGFyYW0gZW50cnlOdW1iZXJcbiAgICogQHBhcmFtIHF1YW50aXR5XG4gICAqIEBwYXJhbSBwaWNrdXBTdG9yZVxuICAgKiBAcGFyYW0gcGlja3VwVG9EZWxpdmVyeVxuICAgKi9cbiAgdXBkYXRlRW50cnkoXG4gICAgZW50cnlOdW1iZXI6IG51bWJlcixcbiAgICBxdWFudGl0eT86IG51bWJlcixcbiAgICBwaWNrdXBTdG9yZT86IHN0cmluZyxcbiAgICBwaWNrdXBUb0RlbGl2ZXJ5OiBib29sZWFuID0gZmFsc2VcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVDYXJ0SWQkXG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLnVzZXJJZFNlcnZpY2UuZ2V0VXNlcklkKCkpLCB0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoW2NhcnRJZCwgdXNlcklkXSkgPT4ge1xuICAgICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS51cGRhdGVFbnRyeShcbiAgICAgICAgICB1c2VySWQsXG4gICAgICAgICAgY2FydElkLFxuICAgICAgICAgIGVudHJ5TnVtYmVyLFxuICAgICAgICAgIHF1YW50aXR5LFxuICAgICAgICAgIHBpY2t1cFN0b3JlLFxuICAgICAgICAgIHBpY2t1cFRvRGVsaXZlcnlcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY2FydCBlbnRyeVxuICAgKlxuICAgKiBAcGFyYW0gcHJvZHVjdENvZGVcbiAgICovXG4gIGdldEVudHJ5KHByb2R1Y3RDb2RlOiBzdHJpbmcpOiBPYnNlcnZhYmxlPE9yZGVyRW50cnkgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVDYXJ0SWQkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGNhcnRJZCkgPT4gdGhpcy5tdWx0aUNhcnRGYWNhZGUuZ2V0RW50cnkoY2FydElkLCBwcm9kdWN0Q29kZSkpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQXNzaWduIGVtYWlsIHRvIGNhcnRcbiAgICpcbiAgICogQHBhcmFtIGVtYWlsXG4gICAqL1xuICBhZGRFbWFpbChlbWFpbDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmVDYXJ0SWQkXG4gICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLnVzZXJJZFNlcnZpY2UuZ2V0VXNlcklkKCkpLCB0YWtlKDEpKVxuICAgICAgLnN1YnNjcmliZSgoW2NhcnRJZCwgdXNlcklkXSkgPT4ge1xuICAgICAgICB0aGlzLm11bHRpQ2FydEZhY2FkZS5hc3NpZ25FbWFpbChjYXJ0SWQsIHVzZXJJZCwgZW1haWwpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFzc2lnbmVkIHVzZXIgdG8gY2FydFxuICAgKi9cbiAgZ2V0QXNzaWduZWRVc2VyKCk6IE9ic2VydmFibGU8VXNlcj4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUNhcnQkLnBpcGUobWFwKChjYXJ0KSA9PiBjYXJ0LnVzZXIgYXMgVXNlcikpO1xuICB9XG5cbiAgLy8gVE9ETzogTWFrZSBjYXJ0IHJlcXVpcmVkIHBhcmFtIGluIDQuMFxuICAvKipcbiAgICogUmV0dXJucyBvYnNlcnZhYmxlIG9mIHRydWUgZm9yIGd1ZXN0IGNhcnRcbiAgICovXG4gIGlzR3Vlc3RDYXJ0KGNhcnQ/OiBDYXJ0KTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIGNhcnRcbiAgICAgID8gb2YodGhpcy5pc0NhcnRVc2VyR3Vlc3QoY2FydCkpXG4gICAgICA6IHRoaXMuYWN0aXZlQ2FydCQucGlwZShcbiAgICAgICAgICBtYXAoKGFjdGl2ZUNhcnQpID0+IHRoaXMuaXNDYXJ0VXNlckd1ZXN0KGFjdGl2ZUNhcnQpKSxcbiAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNDYXJ0VXNlckd1ZXN0KGNhcnQ6IENhcnQpOiBib29sZWFuIHtcbiAgICBjb25zdCBjYXJ0VXNlciA9IGNhcnQudXNlcjtcbiAgICByZXR1cm4gQm9vbGVhbihcbiAgICAgIGNhcnRVc2VyICYmXG4gICAgICAgIChjYXJ0VXNlci5uYW1lID09PSBPQ0NfVVNFUl9JRF9HVUVTVCB8fFxuICAgICAgICAgIGlzRW1haWwoY2FydFVzZXIudWlkPy5zcGxpdCgnfCcpLnNsaWNlKDEpLmpvaW4oJ3wnKSkpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgbXVsdGlwbGUgZW50cmllcyB0byBhIGNhcnRcbiAgICpcbiAgICogQHBhcmFtIGNhcnRFbnRyaWVzIDogbGlzdCBvZiBlbnRyaWVzIHRvIGFkZCAoT3JkZXJFbnRyeVtdKVxuICAgKi9cbiAgYWRkRW50cmllcyhjYXJ0RW50cmllczogT3JkZXJFbnRyeVtdKTogdm9pZCB7XG4gICAgY29uc3QgZW50cmllc1RvQWRkID0gY2FydEVudHJpZXMubWFwKChlbnRyeSkgPT4gKHtcbiAgICAgIHByb2R1Y3RDb2RlOiBlbnRyeS5wcm9kdWN0Py5jb2RlID8/ICcnLFxuICAgICAgcXVhbnRpdHk6IGVudHJ5LnF1YW50aXR5ID8/IDAsXG4gICAgfSkpO1xuICAgIHRoaXMucmVxdWlyZUxvYWRlZENhcnQoKVxuICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpKSlcbiAgICAgIC5zdWJzY3JpYmUoKFtjYXJ0LCB1c2VySWRdKSA9PiB7XG4gICAgICAgIGlmIChjYXJ0KSB7XG4gICAgICAgICAgdGhpcy5tdWx0aUNhcnRGYWNhZGUuYWRkRW50cmllcyhcbiAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgIGdldENhcnRJZEJ5VXNlcklkKGNhcnQsIHVzZXJJZCksXG4gICAgICAgICAgICBlbnRyaWVzVG9BZGRcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWxvYWRzIGFjdGl2ZSBjYXJ0XG4gICAqL1xuICByZWxvYWRBY3RpdmVDYXJ0KCkge1xuICAgIGNvbWJpbmVMYXRlc3QoW3RoaXMuZ2V0QWN0aXZlQ2FydElkKCksIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKCldKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2UoMSksXG4gICAgICAgIG1hcCgoW2NhcnRJZCwgdXNlcklkXSkgPT4ge1xuICAgICAgICAgIHRoaXMubXVsdGlDYXJ0RmFjYWRlLmxvYWRDYXJ0KHtcbiAgICAgICAgICAgIGNhcnRJZCxcbiAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgIGV4dHJhRGF0YTogeyBhY3RpdmU6IHRydWUgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIGhhc1BpY2t1cEl0ZW1zKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmdldEFjdGl2ZSgpLnBpcGUoXG4gICAgICBtYXAoKGNhcnQpID0+XG4gICAgICAgIGNhcnQucGlja3VwSXRlbXNRdWFudGl0eSA/IGNhcnQucGlja3VwSXRlbXNRdWFudGl0eSA+IDAgOiBmYWxzZVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBoYXNEZWxpdmVyeUl0ZW1zKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmdldEFjdGl2ZSgpLnBpcGUoXG4gICAgICBtYXAoKGNhcnQpID0+XG4gICAgICAgIGNhcnQuZGVsaXZlcnlJdGVtc1F1YW50aXR5ID8gY2FydC5kZWxpdmVyeUl0ZW1zUXVhbnRpdHkgPiAwIDogZmFsc2VcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgZ2V0UGlja3VwRW50cmllcygpOiBPYnNlcnZhYmxlPE9yZGVyRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLmdldEVudHJpZXMoKS5waXBlKFxuICAgICAgbWFwKChlbnRyaWVzKSA9PlxuICAgICAgICBlbnRyaWVzLmZpbHRlcigoZW50cnkpID0+IGVudHJ5LmRlbGl2ZXJ5UG9pbnRPZlNlcnZpY2UgIT09IHVuZGVmaW5lZClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgZ2V0RGVsaXZlcnlFbnRyaWVzKCk6IE9ic2VydmFibGU8T3JkZXJFbnRyeVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0RW50cmllcygpLnBpcGUoXG4gICAgICBtYXAoKGVudHJpZXMpID0+XG4gICAgICAgIGVudHJpZXMuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkuZGVsaXZlcnlQb2ludE9mU2VydmljZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=