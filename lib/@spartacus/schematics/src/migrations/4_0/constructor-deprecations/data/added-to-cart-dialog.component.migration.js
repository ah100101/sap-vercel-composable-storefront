"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ADDED_TO_CART_DIALOG_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ADDED_TO_CART_DIALOG_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/cart/add-to-cart/added-to-cart-dialog/added-to-cart-dialog.component.ts
    "class": constants_1.ADDED_TO_CART_DIALOG_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        { className: constants_1.ACTIVE_CART_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.MODAL_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
        { className: constants_1.PROMOTION_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
    ],
    removeParams: [
        { className: constants_1.PROMOTION_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
    ]
};
//# sourceMappingURL=added-to-cart-dialog.component.migration.js.map