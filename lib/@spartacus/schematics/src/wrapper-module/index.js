"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.generateWrapperModule = exports.cleanupConfig = void 0;
var schematics_1 = require("@angular-devkit/schematics");
var ts_morph_1 = require("ts-morph");
var schematics_config_mappings_1 = require("../shared/schematics-config-mappings");
var config_utils_1 = require("../shared/utils/config-utils");
var feature_utils_1 = require("../shared/utils/feature-utils");
var import_utils_1 = require("../shared/utils/import-utils");
var lib_utils_1 = require("../shared/utils/lib-utils");
var logger_utils_1 = require("../shared/utils/logger-utils");
var new_module_utils_1 = require("../shared/utils/new-module-utils");
var program_1 = require("../shared/utils/program");
var project_tsconfig_paths_1 = require("../shared/utils/project-tsconfig-paths");
/**
 * If the wrapper module already exists for
 * the given `options.markerModuleName`, it
 * sets it path to the `options` object.
 */
function checkWrapperModuleExists(options) {
    return function (tree, context) {
        var feature = (0, schematics_config_mappings_1.getKeyByMappingValueOrThrow)(schematics_config_mappings_1.featureFeatureModuleMapping, options.markerModuleName);
        if (options.debug) {
            context.logger.info((0, logger_utils_1.formatFeatureStart)(feature, "checking the wrapper module path for ".concat(options.markerModuleName, " ...")));
        }
        var featureConfig = (0, schematics_config_mappings_1.getSchematicsConfigByFeatureOrThrow)(feature);
        var moduleConfig = (0, feature_utils_1.getModuleConfig)(options.markerModuleName, featureConfig);
        if (!moduleConfig) {
            return (0, schematics_1.noop)();
        }
        var basePath = process.cwd();
        var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, options.project).buildPaths;
        for (var _i = 0, buildPaths_1 = buildPaths; _i < buildPaths_1.length; _i++) {
            var tsconfigPath = buildPaths_1[_i];
            var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
            for (var _a = 0, appSourceFiles_1 = appSourceFiles; _a < appSourceFiles_1.length; _a++) {
                var sourceFile = appSourceFiles_1[_a];
                // check if the wrapper module already exists
                if ((0, import_utils_1.staticImportExists)(sourceFile, moduleConfig.importPath, moduleConfig.name)) {
                    options.internal = __assign(__assign({}, options.internal), { wrapperModulePath: sourceFile.getFilePath() });
                    if (options.debug) {
                        context.logger.info((0, logger_utils_1.formatFeatureStart)(feature, "found '".concat(options.markerModuleName, "' in the existing wrapper module: ").concat(sourceFile.getFilePath(), " .")));
                    }
                    return (0, schematics_1.noop)();
                }
            }
        }
        if (options.debug) {
            context.logger.info((0, logger_utils_1.formatFeatureStart)(feature, "wrapper module not found, will create a new one."));
        }
    };
}
/**
 * Creates the wrapper module using the feature config
 * for the given module name.
 */
function createWrapperModule(options) {
    return function (tree, context) {
        var _a;
        /**
         * if the wrapper module path is set, it means
         * the wrapper module already exists.
         */
        if ((_a = options.internal) === null || _a === void 0 ? void 0 : _a.wrapperModulePath) {
            return (0, schematics_1.noop)();
        }
        var basePath = process.cwd();
        var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, options.project).buildPaths;
        var feature = (0, schematics_config_mappings_1.getKeyByMappingValueOrThrow)(schematics_config_mappings_1.featureFeatureModuleMapping, options.markerModuleName);
        if (options.debug) {
            context.logger.info((0, logger_utils_1.formatFeatureStart)(feature, "creating wrapper module for ".concat(options.markerModuleName, " ...")));
        }
        var featureConfig = (0, schematics_config_mappings_1.getSchematicsConfigByFeatureOrThrow)(feature);
        var moduleConfig = (0, feature_utils_1.getModuleConfig)(options.markerModuleName, featureConfig);
        if (!moduleConfig) {
            return (0, schematics_1.noop)();
        }
        var path = (0, lib_utils_1.createSpartacusFeatureFolderPath)(featureConfig.folderName);
        var name = (0, lib_utils_1.createSpartacusWrapperModuleFileName)(options.markerModuleName);
        var wrapperModulePath = "".concat(path, "/").concat(name);
        /**
         * Mutates the options by setting
         * the wrapperModulePath for the next rules.
         */
        options.internal = __assign(__assign({}, options.internal), { wrapperModulePath: wrapperModulePath });
        var rules = [];
        for (var _i = 0, buildPaths_2 = buildPaths; _i < buildPaths_2.length; _i++) {
            var tsconfigPath = buildPaths_2[_i];
            var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
            var featureModule = (0, feature_utils_1.findFeatureModule)(featureConfig.featureModule, appSourceFiles);
            if (!featureModule) {
                continue;
            }
            rules.push((0, new_module_utils_1.ensureModuleExists)({
                path: path,
                name: name,
                project: options.project,
                /**
                 * Only temporarily import the wrapper module to the feature module.
                 * The import will be removed in updateFeatureModule().
                 *
                 * This is a workaround for a weird behavior of the ts-morph library,
                 * which does not "see" the newly created TS file if it is not
                 * referenced anywhere.
                 */
                module: featureModule.getBaseNameWithoutExtension()
            }));
        }
        rules.push((0, logger_utils_1.debugLogRule)((0, logger_utils_1.formatFeatureComplete)(feature, "wrapper module created for ".concat(options.markerModuleName, " in ").concat(wrapperModulePath, " .")), options.debug));
        return (0, schematics_1.chain)(rules);
    };
}
/**
 * Changes the dynamic import to point to the wrapper module.
 * E.g. instead of:
 * `import('@spartacus/user/profile').then((m) => m.UserProfileModule),`
 * it will be changed to:
 * `import('./profile-wrapper.module').then((m) => m.ProfileWrapperModule),`
 *
 * It also removes the temporary static import to the wrapper
 * module from the ngModule's array.
 */
function updateFeatureModule(options) {
    return function (tree, context) {
        var _a, _b, _c;
        var basePath = process.cwd();
        var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, options.project).buildPaths;
        var feature = (0, schematics_config_mappings_1.getKeyByMappingValueOrThrow)(schematics_config_mappings_1.featureFeatureModuleMapping, options.markerModuleName);
        if (options.debug) {
            context.logger.info((0, logger_utils_1.formatFeatureStart)(feature, "updating feature module for '".concat(options.markerModuleName, "' ...")));
        }
        var featureConfig = (0, schematics_config_mappings_1.getSchematicsConfigByFeatureOrThrow)(feature);
        var featureModuleConfig = (0, feature_utils_1.getModuleConfig)(options.markerModuleName, featureConfig);
        if (!featureModuleConfig) {
            return (0, schematics_1.noop)();
        }
        var rules = [];
        for (var _i = 0, buildPaths_3 = buildPaths; _i < buildPaths_3.length; _i++) {
            var tsconfigPath = buildPaths_3[_i];
            var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
            var featureModule = (0, feature_utils_1.findFeatureModule)(featureConfig.featureModule, appSourceFiles);
            if (!featureModule) {
                continue;
            }
            var dynamicImport = (0, import_utils_1.findDynamicImport)(featureModule, {
                moduleSpecifier: featureModuleConfig.importPath,
                namedImports: [featureModuleConfig.name]
            });
            if (!dynamicImport) {
                continue;
            }
            for (var _d = 0, appSourceFiles_2 = appSourceFiles; _d < appSourceFiles_2.length; _d++) {
                var wrapperModule = appSourceFiles_2[_d];
                if (!wrapperModule
                    .getFilePath()
                    .includes((_b = (_a = options.internal) === null || _a === void 0 ? void 0 : _a.wrapperModulePath) !== null && _b !== void 0 ? _b : '')) {
                    continue;
                }
                var wrapperModuleClassName = (_c = wrapperModule.getClasses()[0].getName()) !== null && _c !== void 0 ? _c : '';
                updateDynamicImportPath(dynamicImport, featureModule.getRelativePathAsModuleSpecifierTo(wrapperModule.getFilePath()));
                updateDynamicImportModuleName(dynamicImport, wrapperModuleClassName);
                // remove the dummy import
                var ngImports = (0, new_module_utils_1.getModulePropertyInitializer)(featureModule, 'imports', false);
                if (!ngImports) {
                    continue;
                }
                removeNgImportWrapperElements(ngImports, wrapperModuleClassName);
                (0, program_1.saveAndFormat)(featureModule);
                break;
            }
        }
        rules.push((0, logger_utils_1.debugLogRule)((0, logger_utils_1.formatFeatureComplete)(feature, "feature module updated for '".concat(options.markerModuleName, "' .")), options.debug));
        return (0, schematics_1.chain)(rules);
    };
    function removeNgImportWrapperElements(ngImports, wrapperModuleClassName) {
        for (var _i = 0, _a = ngImports.getElements(); _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.getText() === wrapperModuleClassName) {
                ngImports.removeElement(element);
                break;
            }
        }
    }
}
/**
 * Removes the dynamic imports pointing to the given
 * `options.featureModuleName` from the feature module.
 */
function removeLibraryDynamicImport(options) {
    return function (tree, context) {
        var _a;
        var basePath = process.cwd();
        var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, options.project).buildPaths;
        var feature = (0, schematics_config_mappings_1.getKeyByMappingValueOrThrow)(schematics_config_mappings_1.featureFeatureModuleMapping, options.featureModuleName);
        var featureConfig = (0, schematics_config_mappings_1.getSchematicsConfigByFeatureOrThrow)(feature);
        var featureModuleConfig = (0, feature_utils_1.getModuleConfig)(options.featureModuleName, featureConfig);
        if (!featureModuleConfig) {
            return (0, schematics_1.noop)();
        }
        var path = (0, lib_utils_1.createSpartacusFeatureFolderPath)(featureConfig.folderName);
        var name = (0, lib_utils_1.createSpartacusFeatureFileName)(featureConfig.moduleName);
        var featureModulePath = "".concat(path, "/").concat(name);
        if (options.debug) {
            context.logger.info((0, logger_utils_1.formatFeatureStart)(feature, "removing dynamic import in '".concat(featureModulePath, "' for '").concat(options.featureModuleName, "' ...")));
        }
        for (var _i = 0, buildPaths_4 = buildPaths; _i < buildPaths_4.length; _i++) {
            var tsconfigPath = buildPaths_4[_i];
            var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
            for (var _b = 0, appSourceFiles_3 = appSourceFiles; _b < appSourceFiles_3.length; _b++) {
                var featureModule = appSourceFiles_3[_b];
                if (!featureModule.getFilePath().includes(featureModulePath)) {
                    continue;
                }
                var spartacusProvider = (_a = (0, import_utils_1.findDynamicImport)(featureModule, {
                    moduleSpecifier: featureModuleConfig.importPath,
                    namedImports: [featureModuleConfig.name]
                })) === null || _a === void 0 ? void 0 : _a.getFirstAncestorByKind(ts_morph_1.SyntaxKind.CallExpression);
                if (!spartacusProvider) {
                    continue;
                }
                cleanupConfig(spartacusProvider);
                (0, program_1.saveAndFormat)(featureModule);
                break;
            }
        }
        if (options.debug) {
            context.logger.info((0, logger_utils_1.formatFeatureComplete)(feature, "dynamic import removed in '".concat(featureModulePath, "' for '").concat(options.featureModuleName, "' .")));
        }
    };
}
/**
 * Takes the given spartacus provider, and removes the
 * 'module' configuration property from it.
 * If the are no other properties left, the whole
 * spartacus provider is removed.
 */
function cleanupConfig(spartacusProvider) {
    var objectLiteral = spartacusProvider.getFirstDescendantByKind(ts_morph_1.SyntaxKind.ObjectLiteralExpression);
    if (!objectLiteral) {
        return;
    }
    (0, config_utils_1.removeProperty)(objectLiteral, 'module');
    if ((0, config_utils_1.normalizeObject)(objectLiteral.getText()) === '{}') {
        spartacusProvider
            .getParentIfKindOrThrow(ts_morph_1.SyntaxKind.ArrayLiteralExpression)
            .removeElement(spartacusProvider);
    }
}
exports.cleanupConfig = cleanupConfig;
/**
 * Replaces the given dynamic import's path.
 * E.g. for the given `() => import('@spartacus/checkout/base')`
 * it replaces it with the given path: `() => import('./checkout-wrapper.module')`.
 */
function updateDynamicImportPath(dynamicImport, path) {
    var _a, _b;
    (_b = (_a = (0, import_utils_1.getDynamicImportCallExpression)(dynamicImport)) === null || _a === void 0 ? void 0 : _a.removeArgument(0)) === null || _b === void 0 ? void 0 : _b.insertArgument(0, "'".concat(path, "'"));
}
/**
 * Replaces the given dynamic import's module name.
 * E.g. for the given `(m) => m.CheckoutModule`
 * it replaces it with the given module name: `(m) => m.CheckoutWrapperModule`.
 */
function updateDynamicImportModuleName(dynamicImport, wrapperModuleName) {
    var _a;
    (_a = (0, import_utils_1.getDynamicImportPropertyAccess)(dynamicImport)) === null || _a === void 0 ? void 0 : _a.replaceWithText("m.".concat(wrapperModuleName));
}
/**
 * Statically imports the given module.
 */
function updateWrapperModule(options, moduleName) {
    return function (tree, context) {
        var _a, _b, _c;
        var basePath = process.cwd();
        var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, options.project).buildPaths;
        var feature = (0, schematics_config_mappings_1.getKeyByMappingValueOrThrow)(schematics_config_mappings_1.featureFeatureModuleMapping, moduleName);
        var featureConfig = (0, schematics_config_mappings_1.getSchematicsConfigByFeatureOrThrow)(feature);
        var featureModuleConfig = (0, feature_utils_1.getModuleConfig)(moduleName, featureConfig);
        if (!featureModuleConfig) {
            return (0, schematics_1.noop)();
        }
        var wrapperModulePath = (_b = (_a = options.internal) === null || _a === void 0 ? void 0 : _a.wrapperModulePath) !== null && _b !== void 0 ? _b : '';
        if (options.debug) {
            context.logger.info((0, logger_utils_1.formatFeatureStart)(feature, "importing the '".concat(moduleName, "' to the wrapper module ").concat(wrapperModulePath, " ...")));
        }
        var rules = [];
        for (var _i = 0, buildPaths_5 = buildPaths; _i < buildPaths_5.length; _i++) {
            var tsconfigPath = buildPaths_5[_i];
            var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
            for (var _d = 0, appSourceFiles_4 = appSourceFiles; _d < appSourceFiles_4.length; _d++) {
                var wrapperModule = appSourceFiles_4[_d];
                if (!wrapperModule.getFilePath().includes(wrapperModulePath)) {
                    continue;
                }
                (0, new_module_utils_1.addModuleImport)(wrapperModule, {
                    "import": {
                        moduleSpecifier: featureModuleConfig.importPath,
                        namedImports: [featureModuleConfig.name]
                    },
                    content: featureModuleConfig.name
                });
                (0, program_1.saveAndFormat)(wrapperModule);
                break;
            }
        }
        rules.push((0, logger_utils_1.debugLogRule)((0, logger_utils_1.formatFeatureComplete)(feature, "imported the '".concat(moduleName, "' to the wrapper module ").concat((_c = options.internal) === null || _c === void 0 ? void 0 : _c.wrapperModulePath, " .")), options.debug));
        return (0, schematics_1.chain)(rules);
    };
}
/**
 * Generates wrapper modules for the given
 * Spartacus feature module.
 */
function generateWrapperModule(options) {
    return function (_tree, _context) {
        return (0, schematics_1.chain)([
            checkWrapperModuleExists(options),
            createWrapperModule(options),
            updateFeatureModule(options),
            removeLibraryDynamicImport(options),
            updateWrapperModule(options, options.markerModuleName),
            updateWrapperModule(options, options.featureModuleName),
        ]);
    };
}
exports.generateWrapperModule = generateWrapperModule;
//# sourceMappingURL=index.js.map