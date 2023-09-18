"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_CART_ENTRY_INFO_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONFIGURATOR_CART_ENTRY_INFO_COMPONENT_MIGRATION = {
    // feature-libs/product-configurator/common/components/configurator-cart-entry-info/configurator-cart-entry-info.component.ts
    "class": constants_1.CONFIGURATOR_CART_ENTRY_INFO_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
    deprecatedParams: [
        {
            className: constants_1.CART_ITEM_CONTEXT,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    addParams: [
        {
            className: constants_1.COMMON_CONFIGURATOR_UTILS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_COMMON
        },
    ]
};
//# sourceMappingURL=configurator-cart-entry-info.component.migration.js.map