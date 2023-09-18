"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.UPDATE_EMAIL_COMPONENT_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.UPDATE_EMAIL_COMPONENT_SERVICE_MIGRATION = {
    // feature-libs\user\profile\components\update-email\update-email-component.service.ts
    "class": constants_1.UPDATE_EMAIL_COMPONENT_SERVICE,
    importPath: libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS,
    deprecatedParams: [
        {
            className: constants_1.USER_EMAIL_FACADE,
            importPath: libs_constants_1.SPARTACUS_USER_PROFILE_ROOT
        },
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.GLOBAL_MESSAGE_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.AUTH_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.AUTH_REDIRECT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=update-email-component.service.migration.js.map