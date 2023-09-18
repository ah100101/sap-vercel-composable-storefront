"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PRODUCT_REFERENCE_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/product/facade/product-reference.service.ts
exports.PRODUCT_REFERENCE_SERVICE_MIGRATION = [
    {
        "class": constants_1.PRODUCT_REFERENCE_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.GET,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET, "' was removed from '").concat(constants_1.PRODUCT_REFERENCE_SERVICE, "'. Use ").concat(constants_1.LOAD_PRODUCT_REFERENCES, " and ").concat(constants_1.GET_PRODUCT_REFERENCES, " instead.")
    },
];
//# sourceMappingURL=product-reference.service.migration.js.map