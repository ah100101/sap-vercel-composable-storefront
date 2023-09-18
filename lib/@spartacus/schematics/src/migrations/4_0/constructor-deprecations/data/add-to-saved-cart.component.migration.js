"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ADD_TO_SAVED_CART_COMPONENT_MIGRATION_V2 = exports.ADD_TO_SAVED_CART_COMPONENT_MIGRATION_V1 = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ADD_TO_SAVED_CART_COMPONENT_MIGRATION_V1 = {
    // feature-libs/cart/saved-cart/components/add-to-saved-cart/add-to-saved-cart.component.ts
    "class": constants_1.ADD_TO_SAVED_CART_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_CART_SAVED_CART_COMPONENTS,
    deprecatedParams: [
        {
            className: constants_1.ACTIVE_CART_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.AUTH_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CART_SAVED_CART_COMPONENTS
        },
        {
            className: constants_1.VIEW_CONTAINER_REF,
            importPath: constants_1.ANGULAR_CORE
        },
    ],
    removeParams: [
        {
            className: constants_1.SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CART_SAVED_CART_COMPONENTS
        },
    ],
    addParams: [
        {
            className: constants_1.LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
exports.ADD_TO_SAVED_CART_COMPONENT_MIGRATION_V2 = {
    // feature-libs/cart/saved-cart/components/add-to-saved-cart/add-to-saved-cart.component.ts
    "class": constants_1.ADD_TO_SAVED_CART_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_CART_SAVED_CART_COMPONENTS,
    deprecatedParams: [
        {
            className: constants_1.ACTIVE_CART_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.AUTH_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CART_SAVED_CART_COMPONENTS
        },
        {
            className: constants_1.VIEW_CONTAINER_REF,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    removeParams: [
        {
            className: constants_1.SAVED_CART_FORM_LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CART_SAVED_CART_COMPONENTS
        },
    ]
};
//# sourceMappingURL=add-to-saved-cart.component.migration.js.map