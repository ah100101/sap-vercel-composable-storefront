"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.UNIT_FORM_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// feature-libs\organization\administration\components\unit\form\unit-form.component.ts
exports.UNIT_FORM_COMPONENT_MIGRATION = [
    {
        "class": constants_1.UNIT_FORM_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION,
        deprecatedNode: constants_1.FORM_GROUP,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Property '").concat(constants_1.UNIT_FORM_COMPONENT, ".").concat(constants_1.FORM_GROUP, "' has been renamed to 'form'.")
    },
    {
        "class": constants_1.UNIT_FORM_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_ORGANIZATION,
        deprecatedNode: constants_1.FORM$,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Property '").concat(constants_1.UNIT_FORM_COMPONENT, ".").concat(constants_1.FORM$, "' was removed. Please use 'form' property instead.")
    },
];
//# sourceMappingURL=unit-form.component.migration.js.map