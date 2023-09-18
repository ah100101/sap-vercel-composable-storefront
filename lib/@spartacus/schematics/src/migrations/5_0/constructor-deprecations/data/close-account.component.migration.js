"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.CLOSE_ACCOUNT_COMPONENT_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.CLOSE_ACCOUNT_COMPONENT_CONSTRUCTOR_MIGRATION = {
    // feature-libs/user/profile/components/close-account/components/close-account/close-account.component.ts
    "class": constants_1.CLOSE_ACCOUNT_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_USER_PROFILE_COMPONENTS,
    deprecatedParams: [
        {
            className: constants_1.MODAL_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    removeParams: [
        {
            className: constants_1.MODAL_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    addParams: [
        {
            className: constants_1.LAUNCH_DIALOG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.VIEW_CONTAINER_REF,
            importPath: constants_1.ANGULAR_CORE
        },
    ]
};
//# sourceMappingURL=close-account.component.migration.js.map