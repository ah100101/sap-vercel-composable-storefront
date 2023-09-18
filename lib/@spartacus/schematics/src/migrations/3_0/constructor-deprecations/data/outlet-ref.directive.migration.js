"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.OUTLET_REF_DIRECTIVE_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.OUTLET_REF_DIRECTIVE_CONSTRUCTOR_MIGRATION = 
// projects/storefrontlib/cms-structure/outlet/outlet-ref/outlet-ref.directive.ts
{
    "class": constants_1.OUTLET_REF_DIRECTIVE,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.TEMPLATE_REF,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.OUTLET_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.FEATURE_CONFIG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    removeParams: [
        {
            className: constants_1.FEATURE_CONFIG_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=outlet-ref.directive.migration.js.map