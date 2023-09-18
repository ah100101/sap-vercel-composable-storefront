"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CDS_MERCHANDISING_PRODUCT_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// integration-libs/cds/src/merchandising/facade/cds-merchandising-product.service.ts
exports.CDS_MERCHANDISING_PRODUCT_SERVICE_MIGRATION = [
    {
        "class": constants_1.CDS_MERCHANDISING_PRODUCT_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CDS,
        deprecatedNode: constants_1.LOAD_PRODUCT_FOR_STRATEGY_METHOD,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.CDS_MERCHANDISING_PRODUCT_SERVICE, ".").concat(constants_1.LOAD_PRODUCT_FOR_STRATEGY_METHOD, "' was changed. New return type is Observable<StrategyResponse>. StrategyProducts which was returned before can be read from StrategyResponse.products field")
    },
];
//# sourceMappingURL=cds-merchandising-product.service.migration.js.map