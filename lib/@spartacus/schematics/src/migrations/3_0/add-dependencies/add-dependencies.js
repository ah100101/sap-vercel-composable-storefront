"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = void 0;
var schematics_1 = require("@angular-devkit/schematics");
var dependencies_1 = require("@schematics/angular/utility/dependencies");
var index_1 = require("../../../shared/index");
function migrate() {
    return function (tree, _context) {
        var dependencies = [
            {
                type: dependencies_1.NodeDependencyType.Default,
                version: '^10.0.0',
                name: index_1.ANGULAR_OAUTH2_OIDC
            },
        ];
        return (0, schematics_1.chain)([
            (0, index_1.addPackageJsonDependencies)(dependencies, (0, index_1.readPackageJson)(tree)),
            index_1.installPackageJsonDependencies,
        ]);
    };
}
exports.migrate = migrate;
//# sourceMappingURL=add-dependencies.js.map