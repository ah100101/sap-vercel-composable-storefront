"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PRODUCT_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/product/facade/product.service.ts
exports.PRODUCT_SERVICE_MIGRATION = [
    {
        "class": constants_1.PRODUCT_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: "reload",
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.PRODUCT_SERVICE, ".reload' was removed. Please use the reloading triggers configuration instead (see https://sap.github.io/spartacus-docs/loading-scopes/#reloading-triggers for more).")
    },
];
//# sourceMappingURL=product.service.migration.js.map