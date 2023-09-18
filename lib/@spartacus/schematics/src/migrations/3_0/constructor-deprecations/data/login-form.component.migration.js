"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.LOGIN_FORM_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.LOGIN_FORM_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/user/login-form/login-form.component.ts
    "class": constants_1.LOGIN_FORM_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.AUTH_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.GLOBAL_MESSAGE_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.FORM_BUILDER,
            importPath: constants_1.ANGULAR_FORMS
        },
        {
            className: constants_1.AUTH_REDIRECT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.WINDOW_REF,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ACTIVATED_ROUTE,
            importPath: constants_1.ANGULAR_ROUTER
        },
        {
            className: constants_1.CHECKOUT_CONFIG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    removeParams: [
        {
            className: constants_1.AUTH_REDIRECT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ACTIVATED_ROUTE,
            importPath: constants_1.ANGULAR_ROUTER
        },
        {
            className: constants_1.CHECKOUT_CONFIG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=login-form.component.migration.js.map