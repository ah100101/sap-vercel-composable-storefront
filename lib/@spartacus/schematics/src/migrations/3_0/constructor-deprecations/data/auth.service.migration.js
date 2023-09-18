"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.AUTH_SERVICE_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.AUTH_SERVICE_CONSTRUCTOR_MIGRATION = {
    // projects/core/src/auth/facade/auth.service.ts
    "class": constants_1.AUTH_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        {
            className: constants_1.STORE,
            importPath: constants_1.NGRX_STORE
        },
    ],
    addParams: [
        {
            className: constants_1.USER_ID_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.OAUTH_LIB_WRAPPER_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.AUTH_STORAGE_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.AUTH_REDIRECT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=auth.service.migration.js.map