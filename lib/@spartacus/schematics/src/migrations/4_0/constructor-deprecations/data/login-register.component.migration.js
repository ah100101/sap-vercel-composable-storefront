"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.LOGIN_REGISTER_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.LOGIN_REGISTER_COMPONENT_MIGRATION = {
    // feature-libs/user/account/components/login-register/login-register.component.ts
    "class": constants_1.LOGIN_REGISTER_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_USER,
    deprecatedParams: [
        { className: constants_1.CHECKOUT_CONFIG_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.ACTIVATED_ROUTE, importPath: constants_1.ANGULAR_ROUTER },
    ],
    removeParams: [
        { className: constants_1.CHECKOUT_CONFIG_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
//# sourceMappingURL=login-register.component.migration.js.map