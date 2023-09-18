"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CDS_MERCHANDISING_PRODUCT_SERVICE_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CDS_MERCHANDISING_PRODUCT_SERVICE_CONSTRUCTOR_MIGRATION = {
    //integration-libs/cds/src/merchandising/facade/cds-merchandising-product.service.ts
    "class": constants_1.CDS_MERCHANDISING_PRODUCT_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CDS,
    deprecatedParams: [
        {
            className: constants_1.MERCHANDISING_STRATEGY_CONNECTOR,
            importPath: libs_constants_1.SPARTACUS_CDS
        },
        {
            className: constants_1.CDS_MERCHANDISING_USER_CONTEXT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CDS
        },
        {
            className: constants_1.CDS_MERCHANDISING_SITE_CONTEXT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CDS
        },
        {
            className: constants_1.CDS_MERCHANDISING_SEARCH_CONTEXT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CDS
        },
    ],
    removeParams: [
        {
            className: constants_1.CDS_MERCHANDISING_SEARCH_CONTEXT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CDS
        },
    ]
};
//# sourceMappingURL=cds-merchandising-product.service.migration.js.map