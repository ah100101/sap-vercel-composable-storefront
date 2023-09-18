"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.DELETE_ITEM_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.DELETE_ITEM_COMPONENT_MIGRATION = {
    "class": constants_1.DELETE_ITEM_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    deprecatedParams: [
        {
            className: constants_1.ITEM_SERVICE,
            importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS
        },
        {
            className: constants_1.MESSAGE_SERVICE,
            importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS
        },
        {
            className: constants_1.FEATURE_CONFIG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    removeParams: [
        {
            className: constants_1.FEATURE_CONFIG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=delete-item.component.migration.js.map