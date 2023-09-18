"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
exports.ORDER_DETAIL_SHIPPING_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/myaccount/order/order-details/order-detail-shipping/order-detail-shipping.component.ts
    selector: 'cx-order-details-shipping',
    componentClassName: constants_1.ORDER_DETAIL_SHIPPING_COMPONENT,
    removedProperties: [
        {
            name: 'order$',
            comment: "'order$' property return type was changed from 'Observable<Order>' to 'Observable<any>'"
        },
        {
            name: 'getPaymentCardContent',
            comment: "'getPaymentCardContent' was removed, please check the 'OrderOverviewComponent' instead."
        },
        {
            name: 'getShippingMethodCardContent',
            comment: "'getShippingMethodCardContent' was removed, please check the 'OrderOverviewComponent' instead."
        },
        {
            name: 'getAddressCardContent',
            comment: "'getAddressCardContent' was removed, please check the 'OrderOverviewComponent' instead."
        },
        {
            name: 'getBillingAddressCardContent',
            comment: "'getBillingAddressCardContent' was removed, please check the 'OrderOverviewComponent' instead."
        },
    ]
};
//# sourceMappingURL=order-detail-shipping.component.migration.js.map