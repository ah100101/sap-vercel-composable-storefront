"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PAGE_SLOT_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.PAGE_SLOT_COMPONENT_MIGRATION = {
    "class": constants_1.PAGE_SLOT_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        { className: constants_1.CMS_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.DYNAMIC_ATTRIBUTE_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.RENDERER_2, importPath: constants_1.ANGULAR_CORE },
        { className: constants_1.ELEMENT_REF, importPath: constants_1.ANGULAR_CORE },
        {
            className: constants_1.CMS_COMPONENTS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
        {
            className: constants_1.CHANGE_DETECTOR_REF,
            importPath: constants_1.ANGULAR_CORE
        },
    ],
    removeParams: [
        {
            className: constants_1.CMS_COMPONENTS_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    addParams: [
        {
            className: constants_1.PAGE_SLOT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=page-slot.component.migration.js.map