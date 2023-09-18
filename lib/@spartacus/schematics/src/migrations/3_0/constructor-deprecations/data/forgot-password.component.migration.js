"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.FORGOT_PASSWORD_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.FORGOT_PASSWORD_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/myaccount/forgot-password/forgot-password.component.ts
    "class": constants_1.FORGOT_PASSWORD_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.FORM_BUILDER,
            importPath: constants_1.ANGULAR_FORMS
        },
        {
            className: constants_1.USER_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.AUTH_CONFIG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=forgot-password.component.migration.js.map