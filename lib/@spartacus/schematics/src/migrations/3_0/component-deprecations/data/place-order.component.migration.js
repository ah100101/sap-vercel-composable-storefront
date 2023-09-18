"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PLACE_ORDER_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
exports.PLACE_ORDER_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/checkout/components/place-order/place-order.component.ts
    selector: 'cx-place-order',
    componentClassName: constants_1.PLACE_ORDER_COMPONENT,
    removedProperties: [
        {
            name: 'placeOrderSubscription',
            comment: "'placeOrderSubscription' property was removed and replaced"
        },
    ]
};
//# sourceMappingURL=place-order.component.migration.js.map