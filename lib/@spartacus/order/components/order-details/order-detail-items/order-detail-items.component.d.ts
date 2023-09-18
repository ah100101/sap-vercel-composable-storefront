import { CartOutlets, OrderEntry, PromotionLocation } from '@spartacus/cart/base/root';
import { CmsOrderDetailItemsComponent } from '@spartacus/core';
import { Consignment, Order, OrderOutlets } from '@spartacus/order/root';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { OrderDetailsService } from '../order-details.service';
import * as i0 from "@angular/core";
export declare class OrderDetailItemsComponent {
    protected orderDetailsService: OrderDetailsService;
    protected component: CmsComponentData<CmsOrderDetailItemsComponent>;
    readonly OrderOutlets: typeof OrderOutlets;
    readonly CartOutlets: typeof CartOutlets;
    promotionLocation: PromotionLocation;
    pickupConsignments: Consignment[] | undefined;
    deliveryConsignments: Consignment[] | undefined;
    pickupUnconsignedEntries: OrderEntry[] | undefined;
    deliveryUnConsignedEntries: OrderEntry[] | undefined;
    order$: Observable<Order>;
    enableAddToCart$: Observable<boolean | undefined>;
    isOrderLoading$: Observable<boolean>;
    groupCartItems$: Observable<boolean | undefined>;
    constructor(orderDetailsService: OrderDetailsService, component: CmsComponentData<CmsOrderDetailItemsComponent>);
    protected getGroupedConsignments(order: Order, pickup: boolean): Consignment[] | undefined;
    protected getUnconsignedEntries(order: Order, pickup: boolean): OrderEntry[] | undefined;
    protected groupConsignments(consignments: Consignment[] | undefined): Consignment[] | undefined;
    /**
     * complete: 0
     * processing: 1
     * cancel: -1
     */
    private getStatusGroupKey;
    static ɵfac: i0.ɵɵFactoryDeclaration<OrderDetailItemsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OrderDetailItemsComponent, "cx-order-details-items", never, {}, {}, never, never, false, never>;
}
