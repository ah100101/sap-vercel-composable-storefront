"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.FEATURE_MODULES_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.FEATURE_MODULES_SERVICE_MIGRATION = {
    // projects/storefrontlib/cms-structure/services/feature-modules.service.ts
    "class": constants_1.FEATURE_MODULES_SERVICE,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.CONFIG_INITIALIZER_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.COMPILER,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.INJECTOR,
            importPath: constants_1.ANGULAR_CORE
        },
    ],
    removeParams: [
        {
            className: constants_1.COMPILER,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.INJECTOR,
            importPath: constants_1.ANGULAR_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.LAZY_MODULES_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=feature-modules.service.migration.js.map