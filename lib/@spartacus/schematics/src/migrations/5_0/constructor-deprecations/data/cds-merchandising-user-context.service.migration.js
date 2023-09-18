"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CDS_MERCHANDISING_USER_CONTEXT_SERVICE_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CDS_MERCHANDISING_USER_CONTEXT_SERVICE_CONSTRUCTOR_MIGRATION = {
    // integration-libs/cds/src/merchandising/facade/cds-merchandising-user-context.service.ts
    "class": constants_1.CDS_MERCHANDISING_USER_CONTEXT_SERVICE,
    importPath: libs_constants_1.SPARTACUS_CDS,
    deprecatedParams: [
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.PRODUCT_SEARCH_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.CONVERTER_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.PROFILE_TAG_EVENT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CDS
        },
        {
            className: constants_1.PROFILE_TAG_LIFECYCLE_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CDS
        },
    ],
    removeParams: [
        {
            className: constants_1.CONVERTER_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.FACET_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=cds-merchandising-user-context.service.migration.js.map