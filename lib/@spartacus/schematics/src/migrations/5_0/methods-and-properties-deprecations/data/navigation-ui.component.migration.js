"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.NAVIGATION_UI_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.NAVIGATION_UI_COMPONENT_MIGRATION = [
    {
        "class": constants_1.NAVIGATION_UI_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.REINITALIZE_MENU,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.NAVIGATION_UI_COMPONENT, ".").concat(constants_1.REINITALIZE_MENU, "' was removed. Use 'reinitializeMenu' instead.")
    },
];
//# sourceMappingURL=navigation-ui.component.migration.js.map