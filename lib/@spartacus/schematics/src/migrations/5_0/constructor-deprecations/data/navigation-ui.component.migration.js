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
exports.NAVIGATION_UI_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/navigation/navigation/navigation-ui.component.ts
    "class": constants_1.NAVIGATION_UI_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        { className: constants_1.ROUTER, importPath: constants_1.ANGULAR_ROUTER },
        { className: constants_1.RENDERER_2, importPath: constants_1.ANGULAR_CORE },
        { className: constants_1.ELEMENT_REF, importPath: constants_1.ANGULAR_CORE },
        { className: constants_1.HAMBURGER_MENU_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
    ],
    addParams: [{ className: constants_1.WINDOW_REF, importPath: libs_constants_1.SPARTACUS_CORE }]
};
//# sourceMappingURL=navigation-ui.component.migration.js.map