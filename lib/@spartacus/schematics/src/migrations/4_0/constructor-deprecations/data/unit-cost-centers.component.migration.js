"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.UNIT_COST_CENTERS_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.UNIT_COST_CENTERS_COMPONENT_MIGRATION = {
    // feature-libs\organization\administration\components\unit\links\cost-centers\unit-cost-centers.component.ts
    "class": constants_1.UNIT_COST_CENTER_LIST_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    deprecatedParams: [],
    addParams: [
        {
            className: constants_1.CURRENT_UNIT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_CORE
        },
    ]
};
//# sourceMappingURL=unit-cost-centers.component.migration.js.map