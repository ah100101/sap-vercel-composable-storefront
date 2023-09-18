"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.JSON_LD_SCRIPT_FACTORY_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.JSON_LD_SCRIPT_FACTORY_CONSTRUCTOR_MIGRATION = {
    // projects/storefrontlib/cms-structure/seo/structured-data/json-ld-script.factory.ts
    "class": constants_1.JSON_LD_SCRIPT_FACTORY,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.PLATFORM,
            literalInference: constants_1.STRING_TYPE,
            injectionToken: {
                token: constants_1.PLATFORM_ID_STRING,
                importPath: constants_1.ANGULAR_CORE
            }
        },
        {
            className: constants_1.WINDOW_REF,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.RENDERER_FACTORY_2,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.DOM_SANITIZER,
            importPath: constants_1.ANGULAR_PLATFORM_BROWSER
        },
        {
            className: constants_1.SEO_CONFIG,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    removeParams: [
        {
            className: constants_1.DOM_SANITIZER,
            importPath: constants_1.ANGULAR_PLATFORM_BROWSER
        },
    ]
};
//# sourceMappingURL=json-ld.script.factory.migration.js.map