"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.PARAGRAPH_COMPONENT_MIGRATION = void 0;
var libs_constants_1 = require("../../../../shared/libs-constants");
var constants_1 = require("../../../../shared/constants");
exports.PARAGRAPH_COMPONENT_MIGRATION = {
    // projects/storefrontlib/cms-components/content/paragraph/paragraph.component.ts
    "class": constants_1.PARAGRAPH_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        {
            className: constants_1.CMS_COMPONENT_DATA_CLASS,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ],
    addParams: [{ className: constants_1.ROUTER, importPath: constants_1.ANGULAR_ROUTER }]
};
//# sourceMappingURL=paragraph.component.migration.js.map