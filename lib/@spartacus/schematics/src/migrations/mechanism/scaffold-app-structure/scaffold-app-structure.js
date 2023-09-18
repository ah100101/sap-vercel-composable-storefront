"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.scaffoldAppStructure = void 0;
var schematics_1 = require("@angular-devkit/schematics");
var lib_utils_1 = require("../../../shared/utils/lib-utils");
var workspace_utils_1 = require("../../../shared/utils/workspace-utils");
function scaffoldAppStructure() {
    return function (tree, context) {
        var project = (0, workspace_utils_1.getDefaultProjectNameFromWorkspace)(tree);
        var spartacusFeatureModuleExists = (0, lib_utils_1.checkAppStructure)(tree, project);
        if (!spartacusFeatureModuleExists) {
            context.logger.info('Scaffolding the new app structure...');
            context.logger.warn('Please migrate manually the rest of your feature modules to the new app structure: https://sap.github.io/spartacus-docs/reference-app-structure/');
        }
        return spartacusFeatureModuleExists
            ? (0, schematics_1.noop)()
            : (0, workspace_utils_1.scaffoldStructure)({ project: project });
    };
}
exports.scaffoldAppStructure = scaffoldAppStructure;
//# sourceMappingURL=scaffold-app-structure.js.map