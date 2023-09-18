"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.OCC_ENDPOINTS_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/occ/services/occ-endpoints.service.ts
exports.OCC_ENDPOINTS_SERVICE_MIGRATION = [
    {
        "class": constants_1.OCC_ENDPOINTS_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GET_OCC_ENDPOINT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.OCC_ENDPOINTS_SERVICE, ".").concat(constants_1.GET_OCC_ENDPOINT, "' was removed. Please use 'buildUrl' method instead with the proper parameters.")
    },
    {
        "class": constants_1.OCC_ENDPOINTS_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GET_BASE_ENDPOINT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.OCC_ENDPOINTS_SERVICE, ".").concat(constants_1.GET_BASE_ENDPOINT, "' was removed. Please use 'getBaseUrl' method instead with the proper parameters.")
    },
    {
        "class": constants_1.OCC_ENDPOINTS_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GET_END_POINT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.OCC_ENDPOINTS_SERVICE, ".").concat(constants_1.GET_END_POINT, "' was removed. Please use 'buildUrl' method instead with the proper parameters.")
    },
    {
        "class": constants_1.OCC_ENDPOINTS_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GET_URL,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.OCC_ENDPOINTS_SERVICE, ".").concat(constants_1.GET_URL, "' was renamed to 'buildUrl' and changed signature. Before 4.0, 'urlParams', 'queryParams' and 'scope' were separate arguments (2nd, 3rd and 4th). Now they are properties of one wrapper object passed in the 2nd argument.")
    },
    {
        "class": constants_1.OCC_ENDPOINTS_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GET_RAW_ENDPOINT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.OCC_ENDPOINTS_SERVICE, ".").concat(constants_1.GET_RAW_ENDPOINT, "' was removed. Please use 'buildUrl' or 'getRawEndpointValue' method instead with the proper parameters.")
    },
];
//# sourceMappingURL=occ-endpoints.service.migration.js.map