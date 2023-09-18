"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.COMPONENT_WRAPPER_CONSTRUCTOR_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.COMPONENT_WRAPPER_CONSTRUCTOR_MIGRATION = {
    "class": constants_1.COMPONENT_WRAPPER_DIRECTIVE,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.VIEW_CONTAINER_REF,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.CMS_COMPONENTS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.INJECTOR,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.DYNAMIC_ATTRIBUTE_SERVICE,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.RENDERER_2,
            importPath: constants_1.ANGULAR_CORE
        },
        {
            className: constants_1.COMPONENT_HANDLER_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
        {
            className: constants_1.CMS_INJECTOR_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.EVENT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=component-wrapper.directive.migration.js.map