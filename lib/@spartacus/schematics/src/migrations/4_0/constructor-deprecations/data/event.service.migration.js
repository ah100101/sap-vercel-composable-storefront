"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.EVENT_SERVICE_CONSTRUCTOR_DEPRECATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.EVENT_SERVICE_CONSTRUCTOR_DEPRECATION = {
    // projects/core/src/event/event.service.ts
    "class": constants_1.EVENT_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        { className: constants_1.FEATURE_CONFIG_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    removeParams: [
        { className: constants_1.FEATURE_CONFIG_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ]
};
//# sourceMappingURL=event.service.migration.js.map