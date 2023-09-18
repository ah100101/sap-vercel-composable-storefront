"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.BASE_SITE_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/site-context/facade/base-site.service.ts
exports.BASE_SITE_SERVICE_MIGRATION = [
    {
        "class": constants_1.BASE_SITE_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.INITIALIZE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.BASE_SITE_SERVICE, ".").concat(constants_1.INITIALIZE, "' was removed. The state initialization is done with the 'BaseSiteInitializer' .")
    },
];
//# sourceMappingURL=base-site.service.migration.js.map