"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.AUTH_HTTP_HEADER_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.AUTH_HTTP_HEADER_SERVICE_MIGRATION = {
    // projects/core/src/auth/user-auth/services/auth-http-header.service.ts
    "class": constants_1.AUTH_HTTP_HEADER_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        {
            className: constants_1.AUTH_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.AUTH_STORAGE_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.OAUTH_LIB_WRAPPER_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.OCC_ENDPOINTS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.GLOBAL_MESSAGE_SERVICE,
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
//# sourceMappingURL=auth-http-header.service.migration.js.map