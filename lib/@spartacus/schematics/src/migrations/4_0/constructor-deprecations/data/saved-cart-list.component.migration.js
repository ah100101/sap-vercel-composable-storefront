"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.SAVED_CART_LIST_COMPONENT_MIGRATION_V2 = exports.SAVED_CART_LIST_COMPONENT_MIGRATION_V1 = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.SAVED_CART_LIST_COMPONENT_MIGRATION_V1 = {
    // feature-libs/cart/saved-cart/components/list/saved-cart-list.component.ts
    "class": constants_1.SAVED_CART_LIST_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_CART,
    deprecatedParams: [
        { className: constants_1.ROUTING_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.TRANSLATION_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.SAVED_CART_FACADE, importPath: libs_constants_1.SPARTACUS_CART },
        { className: constants_1.CLEAR_CHECKOUT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    removeParams: [
        { className: constants_1.CLEAR_CHECKOUT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
exports.SAVED_CART_LIST_COMPONENT_MIGRATION_V2 = {
    // feature-libs/cart/saved-cart/components/list/saved-cart-list.component.ts
    "class": constants_1.SAVED_CART_LIST_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_CART,
    deprecatedParams: [
        { className: constants_1.ROUTING_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.TRANSLATION_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.SAVED_CART_FACADE, importPath: libs_constants_1.SPARTACUS_CART },
    ],
    removeParams: [
        { className: constants_1.TRANSLATION_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    addParams: [
        {
            className: constants_1.VIEW_CONTAINER_REF,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=saved-cart-list.component.migration.js.map