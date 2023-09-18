"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.migrate = void 0;
var schematics_1 = require("@angular-devkit/schematics");
var ast_utils_1 = require("@schematics/angular/utility/ast-utils");
var dependencies_1 = require("@schematics/angular/utility/dependencies");
var constants_1 = require("../../../shared/constants");
var libs_constants_1 = require("../../../shared/libs-constants");
var file_utils_1 = require("../../../shared/utils/file-utils");
var lib_utils_1 = require("../../../shared/utils/lib-utils");
var module_file_utils_1 = require("../../../shared/utils/module-file-utils");
var package_utils_1 = require("../../../shared/utils/package-utils");
function migrate() {
    return function (tree, _context) {
        var packageJson = (0, package_utils_1.readPackageJson)(tree);
        return (0, package_utils_1.checkIfSSRIsUsed)(tree)
            ? (0, schematics_1.chain)([
                updateImport(),
                addSetupPackageJsonDependencies(packageJson),
                (0, lib_utils_1.installPackageJsonDependencies)(),
            ])
            : (0, schematics_1.noop)();
    };
}
exports.migrate = migrate;
function updateImport() {
    return function (tree, _context) {
        var serverFilePath = (0, file_utils_1.getServerTsPath)(tree);
        if (!serverFilePath) {
            return tree;
        }
        if ((0, ast_utils_1.isImported)((0, file_utils_1.getTsSourceFile)(tree, serverFilePath), constants_1.NG_EXPRESS_ENGINE_DECORATOR, libs_constants_1.SPARTACUS_CORE)) {
            var importRemovalChange = (0, file_utils_1.removeImport)((0, file_utils_1.getTsSourceFile)(tree, serverFilePath), {
                className: constants_1.NG_EXPRESS_ENGINE_DECORATOR,
                importPath: libs_constants_1.SPARTACUS_CORE
            });
            (0, file_utils_1.commitChanges)(tree, serverFilePath, [importRemovalChange]);
            var addImportChange = (0, module_file_utils_1.createImportChange)(tree, serverFilePath, constants_1.NG_EXPRESS_ENGINE_DECORATOR, libs_constants_1.SPARTACUS_SETUP_SSR);
            (0, file_utils_1.commitChanges)(tree, serverFilePath, [addImportChange]);
        }
        return tree;
    };
}
function addSetupPackageJsonDependencies(packageJson) {
    var spartacusVersion = "^".concat((0, package_utils_1.getSpartacusSchematicsVersion)());
    var dependencies = [
        {
            type: dependencies_1.NodeDependencyType.Default,
            version: spartacusVersion,
            name: libs_constants_1.SPARTACUS_SETUP
        },
    ];
    return (0, lib_utils_1.addPackageJsonDependencies)(dependencies, packageJson);
}
//# sourceMappingURL=ssr.js.map