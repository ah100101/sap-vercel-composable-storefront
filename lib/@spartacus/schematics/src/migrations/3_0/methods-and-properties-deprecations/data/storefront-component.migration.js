"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.STOREFRONT_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/storefrontlib/layout/main/storefront.component.ts
exports.STOREFRONT_COMPONENT_MIGRATION = [
    {
        "class": constants_1.STOREFRONT_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.COLLAPSE_MENU_IF_CLICK_OUTSIDE,
        newNode: constants_1.COLLAPSE_MENU_IF_CLICK_OUTSIDE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.COLLAPSE_MENU_IF_CLICK_OUTSIDE, "' changed method param type from 'MouseEvent' to 'any'")
    },
];
//# sourceMappingURL=storefront-component.migration.js.map