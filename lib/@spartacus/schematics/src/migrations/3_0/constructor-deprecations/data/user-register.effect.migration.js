"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.USER_REGISTER_EFFECT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.USER_REGISTER_EFFECT_MIGRATION = {
    // projects/core/src/user/store/effects/user-register.effect.ts
    "class": constants_1.USER_REGISTER_EFFECT,
    importPath: libs_constants_1.SPARTACUS_CORE,
    deprecatedParams: [
        {
            className: constants_1.ACTIONS,
            importPath: constants_1.NGRX_STORE
        },
        {
            className: constants_1.USER_CONNECTOR,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ],
    addParams: [
        {
            className: constants_1.AUTH_SERVICE,
            importPath: libs_constants_1.SPARTACUS_CORE
        },
    ]
};
//# sourceMappingURL=user-register.effect.migration.js.map