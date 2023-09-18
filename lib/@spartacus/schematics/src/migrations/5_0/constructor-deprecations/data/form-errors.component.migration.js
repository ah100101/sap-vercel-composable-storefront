"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.FORM_ERRORS_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
exports.FORM_ERRORS_COMPONENT_MIGRATION = {
    // /projects/storefrontlib/shared/components/form/form-errors/form-errors.component.ts
    "class": constants_1.FORM_ERRORS_COMPONENT,
    importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
    deprecatedParams: [],
    addParams: [
        { className: constants_1.CHANGE_DETECTOR_REF, importPath: constants_1.ANGULAR_CORE },
        { className: constants_1.KEY_VALUE_DIFFERS, importPath: constants_1.ANGULAR_CORE },
    ]
};
//# sourceMappingURL=form-errors.component.migration.js.map