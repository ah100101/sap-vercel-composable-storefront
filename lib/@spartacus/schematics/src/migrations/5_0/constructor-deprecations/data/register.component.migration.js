"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.REGISTER_COMPONENT_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.REGISTER_COMPONENT_CONSTRUCTOR_MIGRATION = {
    // feature-libs/user/profile/components/register/register.component.ts
    "class": constants_1.REGISTER_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS,
    removeParams: [
        {
            className: constants_1.USER_REGISTER_FACADE,
            importPath: libs_constants_1.SPARTACUS_USER_PROFILE_ROOT
        },
    ],
    addParams: [
        {
            className: constants_1.REGISTER_COMPONENT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS
        },
    ],
    deprecatedParams: []
};
//# sourceMappingURL=register.component.migration.js.map