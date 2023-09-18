"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = void 0;
var schematics_1 = require("@angular-devkit/schematics");
var index_1 = require("../../../add-ssr/index");
var package_utils_1 = require("../../../shared/utils/package-utils");
function migrate() {
    return function (tree, _context) {
        return (0, package_utils_1.checkIfSSRIsUsed)(tree) ? (0, index_1.modifyAppServerModuleFile)() : (0, schematics_1.noop)();
    };
}
exports.migrate = migrate;
//# sourceMappingURL=ssr.js.map