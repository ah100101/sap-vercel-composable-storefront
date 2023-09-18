"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.OCC_ENDPOINTS_MODEL_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/occ/occ-models/occ-endpoints.model.ts
exports.OCC_ENDPOINTS_MODEL_MIGRATION = [
    {
        "class": constants_1.OCC_ENDPOINT,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.BASE_SITES_FOR_CONFIG,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Property '").concat(constants_1.OCC_ENDPOINT, ".").concat(constants_1.BASE_SITES_FOR_CONFIG, "' was removed. Please use 'baseSites' property instead.")
    },
];
//# sourceMappingURL=occ-endpoint.model.migration.js.map