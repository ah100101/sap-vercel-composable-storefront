"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
//feature-libs/product-configurator/rulebased/components/attribute/types/numeric-input-field/configurator-attribute-numeric-input-field.component.ts
exports.CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT_MIGRATION = [
    {
        "class": constants_1.CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.CREATE_EVENT_FROM_INPUT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.CREATE_EVENT_FROM_INPUT, "' was removed from '").concat(constants_1.CONFIGURATOR_ATTRIBUTE_NUMERIC_INPUT_FIELD_COMPONENT, "'. It is no longer used.")
    },
];
//# sourceMappingURL=configurator-attribute-numeric-input-field.component.migration.js.map