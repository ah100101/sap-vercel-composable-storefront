"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.BANNER_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
var libs_constants_2 = require("../../../../shared/libs-constants");
exports.BANNER_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/content/banner/banner.component.ts
    "class": constants_1.BANNER_COMPONENT,
    importPath: libs_constants_2.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.CMS_COMPONENT_DATA_CLASS,
            importPath: libs_constants_2.SPARTACUS_STOREFRONTLIB
        },
    ],
    addParams: [
        {
            className: constants_1.CMS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.SEMANTIC_PATH_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=banner.component.migration.js.map