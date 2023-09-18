"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.JSONLD_PRODUCT_REVIEW_BUILDER_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
//projects/storefrontlib/cms-structure/seo/structured-data/builders/product/jsonld-product-review.builder.ts
exports.JSONLD_PRODUCT_REVIEW_BUILDER_MIGRATION = {
    "class": constants_1.JSONLD_PRODUCT_REVIEW_BUILDER,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.PRODUCT_REVIEW_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.SEO_CONFIG,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=jsonld-product-review.builder.migration.js.map