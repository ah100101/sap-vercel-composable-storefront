"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PRODUCT_CAROUSEL_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/storefrontlib/cms-components/product/carousel/product-carousel.service.ts
exports.PRODUCT_CAROUSEL_SERVICE_MIGRATION = [
    {
        "class": constants_1.PRODUCT_CAROUSEL_SERVICE,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.GET_PRODUCT_REFERENCES,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.GET_PRODUCT_REFERENCES, "' was removed from '").concat(constants_1.PRODUCT_CAROUSEL_SERVICE, "'.")
    },
];
//# sourceMappingURL=product-carousel.service.migration.js.map