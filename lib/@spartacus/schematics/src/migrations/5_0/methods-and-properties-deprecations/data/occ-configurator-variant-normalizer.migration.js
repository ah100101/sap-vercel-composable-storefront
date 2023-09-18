"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.OCC_CONFIGURATOR_VARIANT_NORMALIZER_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// feature-libs/product-configurator/rulebased/occ/variant/converters/occ-configurator-variant-normalizer.ts
exports.OCC_CONFIGURATOR_VARIANT_NORMALIZER_MIGRATION = [
    {
        "class": constants_1.OCC_CONFIGURATOR_VARIANT_NORMALIZER,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.CONFIGURATOR_CONVERT_ATTRIBUTE_TYPE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.CONFIGURATOR_CONVERT_ATTRIBUTE_TYPE, "' got new parameter 'sourceAttribute' instead of 'type'.")
    },
];
//# sourceMappingURL=occ-configurator-variant-normalizer.migration.js.map