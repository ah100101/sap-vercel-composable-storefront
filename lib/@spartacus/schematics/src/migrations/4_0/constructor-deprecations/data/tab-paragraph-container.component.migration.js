"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.TAB_PARAGRAPH_CONTAINER_COMPONENT_CONSTRUCTOR_DEPRECATION_2 = exports.TAB_PARAGRAPH_CONTAINER_COMPONENT_CONSTRUCTOR_DEPRECATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.TAB_PARAGRAPH_CONTAINER_COMPONENT_CONSTRUCTOR_DEPRECATION = {
    // projects/storefrontlib/cms-components/content/tab-paragraph-container/tab-paragraph-container.component.ts
    "class": constants_1.TAB_PARAGRAPH_CONTAINER_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.CMS_COMPONENT_DATA_CLASS,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        { className: constants_1.CMS_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        {
            className: constants_1.WINDOW_REF,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.BREAKPOINT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
exports.TAB_PARAGRAPH_CONTAINER_COMPONENT_CONSTRUCTOR_DEPRECATION_2 = {
    // projects/storefrontlib/cms-components/content/tab-paragraph-container/tab-paragraph-container.component.ts
    "class": constants_1.TAB_PARAGRAPH_CONTAINER_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.CMS_COMPONENT_DATA_CLASS,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        { className: constants_1.CMS_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    addParams: [
        {
            className: constants_1.WINDOW_REF,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.BREAKPOINT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=tab-paragraph-container.component.migration.js.map