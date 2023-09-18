"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.SEARCH_BOX_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.SEARCH_BOX_COMPONENT_MIGRATION = {
    // storefrontlibs\scr\cms-components\navigation\search-box\search-box.component.ts
    "class": constants_1.SEARCH_BOX_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        { className: constants_1.SEARCH_BOX_COMPONENT_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        {
            className: constants_1.CMS_COMPONENT_DATA_CLASS,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        { className: constants_1.WINDOW_REF, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    addParams: [
        {
            className: constants_1.ROUTING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=search-box.component.migration.js.map