"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.GOOGLE_MAP_RENDERER_SERVICE_MIGRATION_V2 = exports.GOOGLE_MAP_RENDERER_SERVICE_MIGRATION_V1 = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.GOOGLE_MAP_RENDERER_SERVICE_MIGRATION_V1 = {
    // feature-libs/storefinder/core/service/google-map-renderer.service.ts
    "class": constants_1.GOOGLE_MAP_RENDERER_SERVICE,
    importPath: libs_constants_1.SPARTACUS_STOREFINDER,
    deprecatedParams: [
        {
            className: constants_1.STORE_FINDER_CONFIG,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
        {
            className: constants_1.EXTERNAL_JS_FILE_LOADER,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.STORE_DATA_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
        {
            className: constants_1.SCRIPT_LOADER,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    removeParams: [
        {
            className: constants_1.EXTERNAL_JS_FILE_LOADER,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.STORE_DATA_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
        {
            className: constants_1.SCRIPT_LOADER,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.STORE_FINDER_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
        {
            className: constants_1.SCRIPT_LOADER,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
exports.GOOGLE_MAP_RENDERER_SERVICE_MIGRATION_V2 = {
    // feature-libs/storefinder/core/service/google-map-renderer.service.ts
    "class": constants_1.GOOGLE_MAP_RENDERER_SERVICE,
    importPath: libs_constants_1.SPARTACUS_STOREFINDER,
    deprecatedParams: [
        {
            className: constants_1.STORE_FINDER_CONFIG,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
        {
            className: constants_1.EXTERNAL_JS_FILE_LOADER,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.STORE_DATA_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
    ],
    removeParams: [
        {
            className: constants_1.EXTERNAL_JS_FILE_LOADER,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.STORE_DATA_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
    ],
    addParams: [
        {
            className: constants_1.STORE_FINDER_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFINDER
        },
        {
            className: constants_1.SCRIPT_LOADER,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=google-map-renderer.service.migration.js.map