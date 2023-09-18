"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CDC_LOGOUT_GUARD_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CDC_LOGOUT_GUARD_CONSTRUCTOR_MIGRATION = {
    // integration-libs/cdc/root/guards/cdc-logout.guard.ts
    "class": constants_1.CDC_LOGOUT_GUARD,
    importPath: libs_constants_1.SPARTACUS_CDC,
    deprecatedParams: [
        {
            className: constants_1.AUTH_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.CMS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.SEMANTIC_PATH_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.PROTECTED_ROUTES_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ROUTER,
            importPath: constants_1.ANGULAR_ROUTER
        },
        {
            className: constants_1.WINDOW_REF,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [{ className: constants_1.AUTH_REDIRECT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE }]
};
//# sourceMappingURL=cdc-logout.guard.migration.js.map