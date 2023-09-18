"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.UNIT_ADDRESS_FORM_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.UNIT_ADDRESS_FORM_SERVICE_MIGRATION = {
    // feature-libs/organization/administration/components/unit/links/addresses/form/unit-address-form.service.ts
    "class": constants_1.UNIT_ADDRESS_FORM_SERVICE,
    importPath: libs_constants_1.SPARTACUS_ORGANIZATION_ADMINISTRATION_COMPONENTS,
    deprecatedParams: [
        { className: constants_1.USER_ADDRESS_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
        { className: constants_1.USER_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE },
    ],
    removeParams: [{ className: constants_1.USER_SERVICE, importPath: libs_constants_1.SPARTACUS_CORE }],
    addParams: [
        { className: constants_1.USER_PROFILE_FACADE, importPath: libs_constants_1.SPARTACUS_USER_PROFILE_ROOT },
    ]
};
//# sourceMappingURL=unit-address-form.service.migration.js.map