"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CONFIGURATOR_GROUP_TITLE_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CONFIGURATOR_GROUP_TITLE_COMPONENT_MIGRATION = [
    {
        "class": constants_1.CONFIGURATOR_GROUP_TITLE_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_PRODUCT_CONFIGURATOR_RULEBASED,
        deprecatedNode: constants_1.CONFIGURATOR_CONFIGURATION_OBS,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Member '").concat(constants_1.CONFIGURATOR_GROUP_TITLE_COMPONENT, ".").concat(constants_1.CONFIGURATOR_CONFIGURATION_OBS, "' was removed. Consult the migration documentation on how to deal with that")
    },
];
//# sourceMappingURL=configurator-group-title-component.migration.js.map