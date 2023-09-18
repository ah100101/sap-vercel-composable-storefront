"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CHECKOUT_AUTH_GUARD_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// feature-libs/checkout/components/guards/checkout-auth.guard.ts
exports.CHECKOUT_AUTH_GUARD_MIGRATION = {
    "class": constants_1.CHECKOUT_AUTH_GUARD,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.AUTH_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.AUTH_REDIRECT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        {
            className: constants_1.CHECKOUT_CONFIG_SERVICE,
            importPath: "".concat(libs_constants_1.SPARTACUS_CHECKOUT, "/components")
        },
        { className: constants_1.ACTIVE_CART_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.SEMANTIC_PATH_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.ROUTER, importPath: constants_1.ANGULAR_ROUTER },
        { className: constants_1.USER_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.GLOBAL_MESSAGE_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    removeParams: [
        { className: constants_1.USER_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.GLOBAL_MESSAGE_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    addParams: [
        {
            className: 'UserAccountFacade',
            importPath: "".concat(libs_constants_1.SPARTACUS_USER_ACCOUNT, "/root")
        },
        { className: constants_1.GLOBAL_MESSAGE_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
//# sourceMappingURL=checkout-auth.guard.js.map