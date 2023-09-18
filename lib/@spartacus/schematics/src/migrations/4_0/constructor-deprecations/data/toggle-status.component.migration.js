"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.TOGGLE_STATUS_COMPONENT_MIGRATION_V2 = exports.TOGGLE_STATUS_COMPONENT_MIGRATION_V1 = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.TOGGLE_STATUS_COMPONENT_MIGRATION_V1 = {
    "class": constants_1.TOGGLE_STATUS_COMPONENT,
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
    ],
    addParams: [
        {
            className: constants_1.DISABLE_INFO_SERVICE,
            importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS
        },
    ]
};
exports.TOGGLE_STATUS_COMPONENT_MIGRATION_V2 = {
    "class": constants_1.TOGGLE_STATUS_COMPONENT,
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
    ],
    addParams: [
        {
            className: constants_1.DISABLE_INFO_SERVICE,
            importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS
        },
    ]
};
//# sourceMappingURL=toggle-status.component.migration.js.map