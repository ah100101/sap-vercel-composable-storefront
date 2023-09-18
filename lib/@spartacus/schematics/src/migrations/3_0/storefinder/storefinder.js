"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.migrate = void 0;
var schematics_1 = require("@angular-devkit/schematics");
var ast_utils_1 = require("@schematics/angular/utility/ast-utils");
var change_1 = require("@schematics/angular/utility/change");
var dependencies_1 = require("@schematics/angular/utility/dependencies");
var ng_ast_utils_1 = require("@schematics/angular/utility/ng-ast-utils");
var index_1 = require("../../../shared/index");
var workspace_utils_1 = require("../../../shared/utils/workspace-utils");
function migrate() {
    var _this = this;
    return function (tree) { return __awaiter(_this, void 0, void 0, function () {
        var packageJson, projectName, angularJson, mainPath, appModulePath;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    packageJson = (0, index_1.readPackageJson)(tree);
                    projectName = (0, index_1.getDefaultProjectNameFromWorkspace)(tree);
                    angularJson = (0, workspace_utils_1.getAngularJsonFile)(tree);
                    mainPath = (_d = (_c = (_b = (_a = angularJson.projects[projectName]) === null || _a === void 0 ? void 0 : _a.architect) === null || _b === void 0 ? void 0 : _b.build) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.main;
                    if (!mainPath) {
                        throw new schematics_1.SchematicsException("No main path specified in angular.json.");
                    }
                    appModulePath = (0, ng_ast_utils_1.getAppModulePath)(tree, mainPath);
                    return [4 /*yield*/, isStorefinderPresent(tree, packageJson, appModulePath)];
                case 1: return [2 /*return*/, (_e.sent())
                        ? (0, schematics_1.chain)([
                            removeOldSetup(appModulePath),
                            addStorefinderPackageJsonDependencies(packageJson),
                            // TODO: Re-enable once we have migration to new app structure
                            // newStructureMigration(),
                            // addStorefinderFeature(),
                            (0, index_1.installPackageJsonDependencies)(),
                        ])
                        : (0, schematics_1.noop)()];
            }
        });
    }); };
}
exports.migrate = migrate;
function isStorefinderPresent(tree, packageJson, appModulePath) {
    return __awaiter(this, void 0, void 0, function () {
        var appModuleSource;
        return __generator(this, function (_a) {
            (0, workspace_utils_1.validateSpartacusInstallation)(packageJson);
            appModuleSource = (0, index_1.getTsSourceFile)(tree, appModulePath);
            return [2 /*return*/, ((0, ast_utils_1.isImported)(appModuleSource, index_1.STOREFINDER_MODULE, index_1.SPARTACUS_STOREFRONTLIB) ||
                    (0, ast_utils_1.isImported)(appModuleSource, index_1.STOREFRONT_MODULE, index_1.SPARTACUS_STOREFRONTLIB))];
        });
    });
}
function removeOldSetup(appModulePath) {
    return function (tree, _context) {
        var appModuleSource = (0, index_1.getTsSourceFile)(tree, appModulePath);
        var changes = [];
        if ((0, ast_utils_1.isImported)(appModuleSource, index_1.STOREFINDER_MODULE, index_1.SPARTACUS_STOREFRONTLIB)) {
            var importRemovalChanges = (0, index_1.removeImport)(appModuleSource, {
                className: index_1.STOREFINDER_MODULE,
                importPath: index_1.SPARTACUS_STOREFRONTLIB
            });
            changes.push(importRemovalChanges);
            var node = (0, ast_utils_1.getDecoratorMetadata)(appModuleSource, 'NgModule', index_1.ANGULAR_CORE)[0];
            var assignment = (0, ast_utils_1.getMetadataField)(node, 'imports')[0];
            var arrLiteral = assignment.initializer;
            if (arrLiteral.elements.length !== 0) {
                arrLiteral.elements.every(function (el) {
                    if (el.getText() === index_1.STOREFINDER_MODULE) {
                        var removeFromModulesArrayChange = new change_1.RemoveChange(appModulePath, el.getStart(), "".concat(index_1.STOREFINDER_MODULE, ","));
                        changes.push(removeFromModulesArrayChange);
                        return false;
                    }
                    return el;
                });
            }
        }
        (0, index_1.commitChanges)(tree, appModulePath, changes);
    };
}
function addStorefinderPackageJsonDependencies(packageJson) {
    var spartacusVersion = "^".concat((0, index_1.getSpartacusSchematicsVersion)());
    var dependencies = [
        {
            type: dependencies_1.NodeDependencyType.Default,
            version: spartacusVersion,
            name: index_1.SPARTACUS_STOREFINDER
        },
    ];
    return (0, index_1.addPackageJsonDependencies)(dependencies, packageJson);
}
//# sourceMappingURL=storefinder.js.map