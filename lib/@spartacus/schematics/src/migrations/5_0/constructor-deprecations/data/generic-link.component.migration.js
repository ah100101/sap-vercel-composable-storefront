"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.GENERIC_LINK_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.GENERIC_LINK_COMPONENT_MIGRATION = {
    // projects/storefrontlib/shared/components/generic-link/generic-link.component.ts
    "class": constants_1.GENERIC_LINK_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [{ className: constants_1.ROUTER, importPath: constants_1.ANGULAR_ROUTER }],
    addParams: [
        {
            className: constants_1.GENERIC_LINK_COMPONENT_SERVICE,
            importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB
        },
    ]
};
//# sourceMappingURL=generic-link.component.migration.js.map