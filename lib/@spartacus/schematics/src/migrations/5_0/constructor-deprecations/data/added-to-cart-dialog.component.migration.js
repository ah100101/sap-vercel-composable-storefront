"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ADDED_TO_CART_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ADDED_TO_CART_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION = {
    // feature-libs/cart/base/components/added-to-cart-dialog/added-to-cart-dialog.component.ts
    "class": constants_1.ADDED_TO_CART_DIALOG_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_CART_BASE_COMPONENTS,
    deprecatedParams: [
        { className: constants_1.MODAL_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
        { className: constants_1.ACTIVE_CART_FACADE, importPath: libs_constants_1.SPARTACUS_CART_BASE_ROOT },
    ],
    removeParams: [
        {
            className: constants_1.MODAL_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    addParams: [
        {
            className: constants_1.LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ELEMENT_REF,
            importPath: constants_1.ANGULAR_CORE
        },
    ]
};
//# sourceMappingURL=added-to-cart-dialog.component.migration.js.map