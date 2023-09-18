"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.AUTH_GUARD_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.AUTH_GUARD_CONSTRUCTOR_MIGRATION = {
    // projects/core/src/auth/guards/auth.guard.ts
    "class": constants_1.AUTH_GUARD,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.AUTH_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.AUTH_REDIRECT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.ROUTER,
            importPath: constants_1.ANGULAR_ROUTER
        },
    ],
    removeParams: [
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.SEMANTIC_PATH_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=auth.guard.migration.js.map