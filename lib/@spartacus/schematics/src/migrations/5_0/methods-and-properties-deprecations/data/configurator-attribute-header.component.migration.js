"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// feature-libs/product-configurator/rulebased/components/attribute/header/configurator-attribute-header.component.ts
exports.CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT_MIGRATION = [
    {
        "class": constants_1.CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.CONFIGURATOR_API_GET_CONFLICT_MESSAGE_KEY,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.CONFIGURATOR_API_GET_CONFLICT_MESSAGE_KEY, "' got parameter 'groupType' removed.")
    },
    {
        "class": constants_1.CONFIGURATOR_ATTRIBUTE_HEADER_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.CONFIGURATOR_API_IS_ATTRIBUTE_GROUP,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.CONFIGURATOR_API_IS_ATTRIBUTE_GROUP, "' got parameter 'groupType' removed.")
    },
];
//# sourceMappingURL=configurator-attribute-header.component.migration.js.map