"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.LOGIN_FORM_COMPONENT_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects\storefrontlib\src\cms-components\user\login-form\login-form.component.ts
exports.LOGIN_FORM_COMPONENT_MIGRATION = [
    {
        "class": constants_1.LOGIN_FORM_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.NG_ON_DESTROY,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.NG_ON_DESTROY, "' was removed together with the ").concat(constants_1.SUB, " property")
    },
    {
        "class": constants_1.LOGIN_FORM_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.SUB,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " property '").concat(constants_1.SUB, "' was removed")
    },
    {
        "class": constants_1.LOGIN_FORM_COMPONENT,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.LOGIN_AS_GUEST,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " property '").concat(constants_1.LOGIN_AS_GUEST, "' was removed")
    },
];
//# sourceMappingURL=login-form.component.migration.js.map