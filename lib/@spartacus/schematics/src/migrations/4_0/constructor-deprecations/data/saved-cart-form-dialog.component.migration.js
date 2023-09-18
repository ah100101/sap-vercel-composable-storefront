"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.SAVED_CART_FORM_DIALOG_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.SAVED_CART_FORM_DIALOG_COMPONENT_MIGRATION = {
    // feature-libs/cart/saved-cart/components/saved-cart-form-dialog/saved-cart-form-dialog.component.ts
    "class": constants_1.SAVED_CART_FORM_DIALOG_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_CART,
    deprecatedParams: [
        { className: constants_1.LAUNCH_DIALOG_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
        { className: constants_1.ELEMENT_REF, importPath: constants_1.ANGULAR_CORE },
        { className: constants_1.EVENT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.ROUTING_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.GLOBAL_MESSAGE_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.CLEAR_CHECKOUT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    removeParams: [
        { className: constants_1.CLEAR_CHECKOUT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
//# sourceMappingURL=saved-cart-form-dialog.component.migration.js.map