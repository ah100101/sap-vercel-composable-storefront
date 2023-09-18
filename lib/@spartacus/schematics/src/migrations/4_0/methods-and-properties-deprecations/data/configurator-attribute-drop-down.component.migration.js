"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
//feature-libs/product-configurator/rulebased/components/attribute/types/drop-down/configurator-attribute-drop-down.component.ts
exports.CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT_MIGRATION = [
    {
        "class": constants_1.CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.ON_SELECT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.ON_SELECT, "' was removed from '").concat(constants_1.CONFIGURATOR_ATTRIBUTE_DROP_DOWN_COMPONENT, "'. Instead use new method '").concat(constants_1.ON_SELECT, "' from '").concat(constants_1.CONFIGURATOR_ATTRIBUTE_SINGLE_SELECTION_BASE_COMPONENT, "'.")
    },
];
//# sourceMappingURL=configurator-attribute-drop-down.component.migration.js.map