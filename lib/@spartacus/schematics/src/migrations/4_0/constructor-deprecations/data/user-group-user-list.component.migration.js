"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.USER_GROUP_USER_LIST_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.USER_GROUP_USER_LIST_COMPONENT_MIGRATION = {
    // feature-libs\organization\administration\components\user-group\users\user-group-user-list.component.ts
    "class": constants_1.USER_GROUP_USER_LIST_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    deprecatedParams: [
        {
            className: constants_1.CURRENT_USER_GROUP_SERVICE,
            importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS
        },
        {
            className: constants_1.USER_GROUP_USER_LIST_SERVICE,
            importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS
        },
        {
            className: constants_1.MESSAGE_SERVICE,
            importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS
        },
    ],
    removeParams: [
        {
            className: constants_1.MESSAGE_SERVICE,
            importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS
        },
    ]
};
//# sourceMappingURL=user-group-user-list.component.migration.js.map