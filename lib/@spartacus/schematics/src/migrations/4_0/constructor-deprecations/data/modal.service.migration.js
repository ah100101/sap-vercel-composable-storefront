"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.MODAL_SERVICE_MIGRATION_V2 = exports.MODAL_SERVICE_MIGRATION_V1 = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.MODAL_SERVICE_MIGRATION_V1 = {
    // projects/storefrontlib/shared/components/modal/modal.service.ts
    "class": constants_1.MODAL_SERVICE,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [
        { className: constants_1.NGB_MODAL, importPath: constants_1.NG_BOOTSTRAP },
        { className: constants_1.APPLICATION_REF, importPath: constants_1.ANGULAR_CORE },
        { className: constants_1.FEATURE_CONFIG_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
    ],
    removeParams: [
        { className: constants_1.FEATURE_CONFIG_SERVICE, importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB },
    ]
};
exports.MODAL_SERVICE_MIGRATION_V2 = {
    // projects/storefrontlib/shared/components/modal/modal.service.ts
    "class": constants_1.MODAL_SERVICE,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [{ className: constants_1.NGB_MODAL, importPath: constants_1.NG_BOOTSTRAP }],
    addParams: [{ className: constants_1.APPLICATION_REF, importPath: constants_1.ANGULAR_CORE }]
};
//# sourceMappingURL=modal.service.migration.js.map