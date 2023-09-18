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
// projects\storefrontlib\src\cms-structure\services\cms-components.service.ts
exports.FEATURE_MODULES_SERVICE_MIGRATION = [
    {
        "class": constants_1.FEATURE_MODULES_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_INJECTORS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_INJECTORS, "' has been removed'")
    },
];
//# sourceMappingURL=feature-modules.service.migration.js.map