"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
//feature-libs/product-configurator/rulebased/components/attribute/types/radio-button/configurator-attribute-radio-button.component.ts
exports.CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT_MIGRATION = [
    {
        "class": constants_1.CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.ON_DESELECT,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.ON_DESELECT, "' was removed from '").concat(constants_1.CONFIGURATOR_ATTRIBUTE_RADIO_BUTTON_COMPONENT, "'. It is no longer used.")
    },
];
//# sourceMappingURL=configurator-attribute-radio-button.component.migration.js.map