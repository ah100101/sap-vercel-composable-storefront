"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.POPOVER_DIRECTIVE_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.POPOVER_DIRECTIVE_CONSTRUCTOR_MIGRATION = {
    "class": constants_1.POPOVER_DIRECTIVE,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        { className: constants_1.ELEMENT_REF, importPath: constants_1.ANGULAR_CORE },
        {
            className: constants_1.VIEW_CONTAINER_REF,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.COMPONENT_FACTORY_RESOLVER,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.RENDERER_2,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.CHANGE_DETECTOR_REF,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.POSITIONING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.POPOVER_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.WINDOW_REF,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    removeParams: [
        {
            className: constants_1.POSITIONING_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=popover.directive.migration.js.map