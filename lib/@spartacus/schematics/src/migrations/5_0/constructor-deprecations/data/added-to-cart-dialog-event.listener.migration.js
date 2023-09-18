"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ADDED_TO_CART_DIALOG_EVENT_LISTENER_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ADDED_TO_CART_DIALOG_EVENT_LISTENER_CONSTRUCTOR_MIGRATION = {
    // feature-libs/cart/base/components/added-to-cart-dialog/added-to-cart-dialog-event.listener.ts
    "class": constants_1.ADDED_TO_CART_DIALOG_EVENT_LISTENER,
    importPath: libs_constants_1.SPARTACUS_CART_BASE_COMPONENTS,
    deprecatedParams: [
        { className: constants_1.EVENT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.MODAL_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
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
    ]
};
//# sourceMappingURL=added-to-cart-dialog-event.listener.migration.js.map