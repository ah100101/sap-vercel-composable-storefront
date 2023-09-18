"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_COMPONENT_MIGRATION = {
    // feature-libs/product-configurator/common/components/configurator-cart-entry-bundle-info/configurator-cart-entry-bundle-info.component.ts/configurator-cart-entry-bundle-info.component.ts
    "class": constants_1.CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_COMMON,
    deprecatedParams: [
        {
            className: constants_1.COMMON_CONFIGURATOR_UTILS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_COMMON
        },
        {
            className: constants_1.CONFIGURATOR_CART_ENTRY_BUNDLE_INFO_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_COMMON
        },
        {
            className: constants_1.BREAKPOINT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    addParams: [
        {
            className: constants_1.TRANSLATION_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=configurator-cart-entry-bundle-info.component.migration.js.map