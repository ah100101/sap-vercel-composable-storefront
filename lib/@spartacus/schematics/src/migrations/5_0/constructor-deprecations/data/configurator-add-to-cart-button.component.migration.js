"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_ADD_TO_CART_BUTTON_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONFIGURATOR_ADD_TO_CART_BUTTON_COMPONENT_MIGRATION = {
    // feature-libs/product-configurator/rulebased/components/add-to-cart-button/configurator-add-to-cart-button.component.ts
    "class": constants_1.CONFIGURATOR_ADD_TO_CART_BUTTON_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
    deprecatedParams: [
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.CONFIGURATOR_COMMONS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED
        },
        {
            className: constants_1.CONFIGURATOR_CART_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED
        },
        {
            className: constants_1.CONFIGURATOR_GROUPS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED
        },
        {
            className: constants_1.CONFIGURATOR_ROUTER_EXTRACTOR_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_COMMON
        },
        {
            className: constants_1.GLOBAL_MESSAGE_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.ORDER_FACADE,
            importPath: libs_constants_1.SPARTACUS_ORDER_ROOT
        },
        {
            className: constants_1.COMMON_CONFIGURATOR_UTILS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_COMMON
        },
        {
            className: constants_1.CONFIGURATOR_STOREFRONT_UTILS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED
        },
        {
            className: constants_1.INTERSECTION_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=configurator-add-to-cart-button.component.migration.js.map