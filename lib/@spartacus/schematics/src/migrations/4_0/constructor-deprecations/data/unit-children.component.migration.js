"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.UNIT_CHILDREN_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.UNIT_CHILDREN_COMPONENT_MIGRATION = {
    // feature-libs\organization\administration\components\unit\links\children\unit-children.component.ts
    "class": constants_1.UNIT_CHILDREN_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    deprecatedParams: [],
    addParams: [
        {
            className: constants_1.CURRENT_UNIT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_CORE
        },
    ]
};
//# sourceMappingURL=unit-children.component.migration.js.map