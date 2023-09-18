"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.ROUTING_SERVICE_MIGRATION_V2 = exports.ROUTING_SERVICE_MIGRATION_V1 = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.ROUTING_SERVICE_MIGRATION_V1 = {
    // projects/core/src/routing/facade/routing.service.ts
    "class": constants_1.ROUTING_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.STORE, importPath: constants_1.NGRX_STORE },
        { className: constants_1.WINDOW_REF, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.SEMANTIC_PATH_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.ROUTING_PARAMS_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.ROUTER, importPath: constants_1.ANGULAR_ROUTER },
    ],
    addParams: [{ className: constants_1.LOCATION, importPath: constants_1.ANGULAR_COMMON }]
};
exports.ROUTING_SERVICE_MIGRATION_V2 = {
    // projects/core/src/routing/facade/routing.service.ts
    "class": constants_1.ROUTING_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.STORE, importPath: constants_1.NGRX_STORE },
        { className: constants_1.WINDOW_REF, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.SEMANTIC_PATH_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.ROUTING_PARAMS_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    addParams: [
        { className: constants_1.ROUTER, importPath: constants_1.ANGULAR_ROUTER },
        { className: constants_1.LOCATION, importPath: constants_1.ANGULAR_COMMON },
    ]
};
//# sourceMappingURL=routing.service.migration.js.map