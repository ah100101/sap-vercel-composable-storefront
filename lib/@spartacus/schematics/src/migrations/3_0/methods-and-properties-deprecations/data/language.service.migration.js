"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.LANGUAGE_SERVICE_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/core/src/site-context/facade/language.service.ts
exports.LANGUAGE_SERVICE_MIGRATION = [
    {
        "class": constants_1.LANGUAGE_SERVICE,
        importPath: libs_constants_1.SPARTACUS_CORE,
        deprecatedNode: constants_1.SET_ACTIVE,
        newNode: constants_1.SET_ACTIVE,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.SET_ACTIVE, "' changed the return type from 'Subscription' to 'void'")
    },
];
//# sourceMappingURL=language.service.migration.js.map