"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BUNDLE_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// feature-libs/product-configurator/rulebased/components/attribute/types/single-selection-bundle/configurator-attribute-single-selection-bundle.component.ts
exports.CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BUNDLE_COMPONENT_MIGRATION = [
    {
        "class": constants_1.CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BUNDLE_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.EXTRACT_PRODUCT_CARD_PARAMETERS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.EXTRACT_PRODUCT_CARD_PARAMETERS, "' obtained additional parameter 'index' of current value in list of values.")
    },
];
//# sourceMappingURL=configurator-attribute-single-selection-bundle.component.migration.js.map