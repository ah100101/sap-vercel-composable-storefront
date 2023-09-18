"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CART_ITEM_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
exports.CART_ITEM_COMPONENT_MIGRATION = {
    selector: 'cx-cart-item',
    componentClassName: constants_1.CART_ITEM_COMPONENT,
    removedProperties: [
        {
            name: 'view',
            comment: "'view' output was removed. Instead use '[cxModal]' directive to close modal on link click."
        },
        {
            name: 'viewItem',
            comment: "'viewItem' method was removed. Instead use '[cxModal]' directive to close modal on link click."
        },
    ]
};
//# sourceMappingURL=cart-item.component.migration.js.map