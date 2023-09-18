"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.STOCK_NOTIFICATION_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.STOCK_NOTIFICATION_DIALOG_COMPONENT_CONSTRUCTOR_MIGRATION = {
    // projects/storefrontlib/cms-components/product/stock-notification/stock-notification-dialog/stock-notification-dialog.component.ts
    "class": constants_1.STOCK_NOTIFICATION_DIALOG_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.MODAL_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.USER_INTERESTS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
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
            className: constants_1.ELEMENT_REF,
            importPath: constants_1.ANGULAR_CORE
        },
    ]
};
//# sourceMappingURL=stock-notification-dialog.component.migration.js.map