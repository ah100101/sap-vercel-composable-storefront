"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.AUTH_REDIRECT_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.AUTH_REDIRECT_SERVICE_MIGRATION = {
    // projects/core/src/auth/user-auth/services/auth-redirect.service.ts
    "class": constants_1.AUTH_REDIRECT_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ROUTER,
            importPath: constants_1.ANGULAR_ROUTER
        },
        {
            className: constants_1.AUTH_REDIRECT_STORAGE_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.AUTH_FLOW_ROUTES_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=auth-redirect.service.migration.js.map