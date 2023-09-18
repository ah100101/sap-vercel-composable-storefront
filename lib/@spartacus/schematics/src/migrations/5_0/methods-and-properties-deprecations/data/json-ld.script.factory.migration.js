"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.JSON_LD_SCRIPT_FACTORY_MIGRATION = void 0;
var constants_1 = require("../../../../shared/constants");
var libs_constants_1 = require("../../../../shared/libs-constants");
// projects/storefrontlib/cms-structure/seo/structured-data/json-ld-script.factory.ts
exports.JSON_LD_SCRIPT_FACTORY_MIGRATION = [
    {
        "class": constants_1.JSON_LD_SCRIPT_FACTORY,
        importPath: libs_constants_1.SPARTACUS_STOREFRONTLIB,
        deprecatedNode: constants_1.SANITIZE_METHOD,
        comment: "// ".concat(constants_1.TODO_SPARTACUS, " Method '").concat(constants_1.JSON_LD_SCRIPT_FACTORY, ".").concat(constants_1.SANITIZE_METHOD, "' was removed. Use 'escapeHtml' instead.")
    },
];
//# sourceMappingURL=json-ld.script.factory.migration.js.map