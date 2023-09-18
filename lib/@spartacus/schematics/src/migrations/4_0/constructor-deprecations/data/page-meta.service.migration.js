"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PAGE_META_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.PAGE_META_SERVICE_MIGRATION = {
    "class": constants_1.PAGE_META_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [{ className: constants_1.CMS_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE }],
    addParams: [
        { className: constants_1.UNIFIED_INJECTOR, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.PAGE_META_CONFIG, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.PLATFORM_ID, importPath: constants_1.ANGULAR_CORE },
    ]
};
//# sourceMappingURL=page-meta.service.migration.js.map