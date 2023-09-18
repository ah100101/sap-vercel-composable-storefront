"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.LANGUAGE_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.LANGUAGE_SERVICE_MIGRATION = {
    // projects/core/src/site-context/facade/language.service.ts
    "class": constants_1.LANGUAGE_SERVICE,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        { className: constants_1.STORE, importPath: constants_1.NGRX_STORE },
        { className: constants_1.WINDOW_REF, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.SITE_CONTEXT_CONFIG, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    removeParams: [{ className: constants_1.WINDOW_REF, importPath: libs_constants_1.SPARTACUS_CORE }]
};
//# sourceMappingURL=language.service.migration.js.map