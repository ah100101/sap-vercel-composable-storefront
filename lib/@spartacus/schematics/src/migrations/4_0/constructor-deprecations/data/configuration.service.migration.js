"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATION_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONFIGURATION_SERVICE_MIGRATION = {
    "class": constants_1.CONFIGURATION_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        {
            className: constants_1.ROOT_CONFIG,
            literalInference: constants_1.ANY_TYPE,
            injectionToken: {
                token: constants_1.ROOT_CONFIG,
                importPath: libs_constants_1.SPARTACUS_CORE
            }
        },
        {
            className: constants_1.DEFAULT_CONFIG,
            literalInference: constants_1.ANY_TYPE,
            injectionToken: {
                token: constants_1.DEFAULT_CONFIG,
                importPath: libs_constants_1.SPARTACUS_CORE
            }
        },
        {
            className: constants_1.UNIFIED_INJECTOR,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.CONFIG,
            literalInference: constants_1.ANY_TYPE,
            injectionToken: {
                token: constants_1.CONFIG,
                importPath: libs_constants_1.SPARTACUS_CORE
            }
        },
    ],
    removeParams: [
        {
            className: constants_1.ROOT_CONFIG,
            literalInference: constants_1.ANY_TYPE,
            injectionToken: {
                token: constants_1.ROOT_CONFIG,
                importPath: libs_constants_1.SPARTACUS_CORE
            }
        },
        {
            className: constants_1.DEFAULT_CONFIG,
            literalInference: constants_1.ANY_TYPE,
            injectionToken: {
                token: constants_1.DEFAULT_CONFIG,
                importPath: libs_constants_1.SPARTACUS_CORE
            }
        },
        {
            className: constants_1.UNIFIED_INJECTOR,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.CONFIG,
            literalInference: constants_1.ANY_TYPE,
            injectionToken: {
                token: constants_1.CONFIG,
                importPath: libs_constants_1.SPARTACUS_CORE
            }
        },
    ],
    addParams: [
        {
            className: constants_1.ROOT_CONFIG,
            literalInference: constants_1.CONFIG,
            injectionToken: {
                token: constants_1.ROOT_CONFIG,
                importPath: libs_constants_1.SPARTACUS_CORE
            }
        },
        {
            className: constants_1.DEFAULT_CONFIG,
            literalInference: constants_1.CONFIG,
            injectionToken: {
                token: constants_1.DEFAULT_CONFIG,
                importPath: libs_constants_1.SPARTACUS_CORE
            }
        },
        {
            className: constants_1.UNIFIED_INJECTOR,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.CONFIG,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=configuration.service.migration.js.map