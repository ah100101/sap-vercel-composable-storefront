"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CART_ITEM_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CART_ITEM_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/cart/cart-shared/cart-item/cart-item.component.ts
    "class": constants_1.CART_ITEM_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.PROMOTION_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    addParams: [
        {
            className: constants_1.CART_ITEM_CONTEXT_SOURCE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    removeParams: [
        {
            className: constants_1.PROMOTION_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=cart-item.component.migration.js.map