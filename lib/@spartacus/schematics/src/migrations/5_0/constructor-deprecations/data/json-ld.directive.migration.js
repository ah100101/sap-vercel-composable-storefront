"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.JSON_LD_DIRECTIVE_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.JSON_LD_DIRECTIVE_CONSTRUCTOR_MIGRATION = {
    // projects/storefrontlib/cms-structure/seo/structured-data/json-ld.directive.ts
    "class": constants_1.JSON_LD_SCRIPT_FACTORY,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.JSON_LD_SCRIPT_FACTORY,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.DOM_SANITIZER,
            importPath: constants_1.ANGULAR_PLATFORM_BROWSER
        },
    ],
    addParams: [
        {
            className: constants_1.WINDOW_REF,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.RENDERER_2,
            importPath: constants_1.ANGULAR_CORE
        },
    ],
    removeParams: [
        {
            className: constants_1.DOM_SANITIZER,
            importPath: constants_1.ANGULAR_PLATFORM_BROWSER
        },
    ]
};
//# sourceMappingURL=json-ld.directive.migration.js.map