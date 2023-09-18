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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.finalizeInstallation = exports.calculateCrossLibrarySort = exports.calculateCrossFeatureSort = exports.configureB2bFeatures = exports.dependencyExists = exports.addPackageJsonDependenciesForLibrary = exports.addPackageJsonDependencies = exports.installPackageJsonDependencies = exports.createNodePackageInstallationTask = exports.addLibraryStyles = exports.addFeatureTranslations = exports.createSpartacusWrapperModuleFileName = exports.createSpartacusFeatureFileName = exports.createSpartacusFeatureFolderPath = exports.checkAppStructure = exports.addLibraryFeature = exports.shouldAddFeature = void 0;
var strings_1 = require("@angular-devkit/core/src/utils/strings");
var schematics_1 = require("@angular-devkit/schematics");
var tasks_1 = require("@angular-devkit/schematics/tasks");
var dependencies_1 = require("@schematics/angular/utility/dependencies");
var constants_1 = require("../constants");
var libs_constants_1 = require("../libs-constants");
var config_utils_1 = require("./config-utils");
var feature_utils_1 = require("./feature-utils");
var graph_utils_1 = require("./graph-utils");
var import_utils_1 = require("./import-utils");
var logger_utils_1 = require("./logger-utils");
var new_module_utils_1 = require("./new-module-utils");
var package_utils_1 = require("./package-utils");
var program_1 = require("./program");
var project_tsconfig_paths_1 = require("./project-tsconfig-paths");
var styling_utils_1 = require("./styling-utils");
var workspace_utils_1 = require("./workspace-utils");
function shouldAddFeature(feature, features) {
    if (features === void 0) { features = []; }
    return features.includes(feature);
}
exports.shouldAddFeature = shouldAddFeature;
function addLibraryFeature(options, config) {
    return function (tree, context) {
        var spartacusFeatureModuleExistsInApp = checkAppStructure(tree, options.project);
        if (!spartacusFeatureModuleExistsInApp) {
            context.logger.info('Scaffolding the new app structure...');
            context.logger.warn('Please migrate manually the rest of your feature modules to the new app structure: https://sap.github.io/spartacus-docs/reference-app-structure/');
        }
        return (0, schematics_1.chain)([
            (0, logger_utils_1.debugLogRule)((0, logger_utils_1.formatFeatureStart)(config.library.featureName, "adding..."), options.debug),
            spartacusFeatureModuleExistsInApp ? (0, schematics_1.noop)() : (0, workspace_utils_1.scaffoldStructure)(options),
            handleFeature(options, config),
            config.styles ? addLibraryStyles(config.styles, options) : (0, schematics_1.noop)(),
            config.assets ? addLibraryAssets(config.assets, options) : (0, schematics_1.noop)(),
            (0, logger_utils_1.debugLogRule)((0, logger_utils_1.formatFeatureComplete)(config.library.featureName, "added."), options.debug),
        ]);
    };
}
exports.addLibraryFeature = addLibraryFeature;
function checkAppStructure(tree, project) {
    var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, project).buildPaths;
    if (!buildPaths.length) {
        throw new schematics_1.SchematicsException("Could not find any tsconfig file. Can't find ".concat(libs_constants_1.SPARTACUS_FEATURES_NG_MODULE, "."));
    }
    var basePath = process.cwd();
    for (var _i = 0, buildPaths_1 = buildPaths; _i < buildPaths_1.length; _i++) {
        var tsconfigPath = buildPaths_1[_i];
        if ((0, feature_utils_1.getSpartacusFeaturesModule)(tree, basePath, tsconfigPath)) {
            return true;
        }
    }
    return false;
}
exports.checkAppStructure = checkAppStructure;
function handleFeature(options, config) {
    return function (tree, _context) {
        var rules = [];
        rules.push((0, new_module_utils_1.ensureModuleExists)({
            name: createSpartacusFeatureFileName(config.moduleName),
            path: createSpartacusFeatureFolderPath(config.folderName),
            module: libs_constants_1.SPARTACUS_FEATURES_MODULE,
            project: options.project
        }));
        rules.push(addRootModule(options, config));
        rules.push(addFeatureModule(options, config));
        rules.push(addFeatureTranslations(options, config));
        rules.push(addCustomConfig(options, config));
        if (config.library.b2b) {
            rules.push(configureB2bFeatures(options, (0, package_utils_1.readPackageJson)(tree)));
        }
        return (0, schematics_1.chain)(rules);
    };
}
function createSpartacusFeatureFolderPath(folderName) {
    return "app/spartacus/features/".concat((0, strings_1.dasherize)(folderName));
}
exports.createSpartacusFeatureFolderPath = createSpartacusFeatureFolderPath;
function createSpartacusFeatureFileName(name) {
    return "".concat((0, strings_1.dasherize)(name), "-feature");
}
exports.createSpartacusFeatureFileName = createSpartacusFeatureFileName;
function createSpartacusWrapperModuleFileName(name) {
    var normalizedName = name.replace('module', '').replace('Module', '');
    return "".concat((0, strings_1.dasherize)(normalizedName), "-wrapper");
}
exports.createSpartacusWrapperModuleFileName = createSpartacusWrapperModuleFileName;
function addRootModule(options, config) {
    return function (tree) {
        if (!config.rootModule) {
            return tree;
        }
        var basePath = process.cwd();
        var moduleFileName = createModuleFileName(config);
        var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, options.project).buildPaths;
        for (var _i = 0, buildPaths_2 = buildPaths; _i < buildPaths_2.length; _i++) {
            var tsconfigPath = buildPaths_2[_i];
            var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
            for (var _a = 0, appSourceFiles_1 = appSourceFiles; _a < appSourceFiles_1.length; _a++) {
                var sourceFile = appSourceFiles_1[_a];
                if (!sourceFile.getFilePath().endsWith('/' + moduleFileName)) {
                    continue;
                }
                (0, new_module_utils_1.addModuleImport)(sourceFile, {
                    "import": {
                        moduleSpecifier: config.rootModule.importPath,
                        namedImports: [config.rootModule.name]
                    },
                    content: config.rootModule.content || config.rootModule.name
                });
                (0, program_1.saveAndFormat)(sourceFile);
                break;
            }
        }
        return tree;
    };
}
function addFeatureModule(options, config) {
    return function (tree) {
        var basePath = process.cwd();
        var moduleFileName = createModuleFileName(config);
        var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, options.project).buildPaths;
        for (var _i = 0, buildPaths_3 = buildPaths; _i < buildPaths_3.length; _i++) {
            var tsconfigPath = buildPaths_3[_i];
            var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
            for (var _a = 0, appSourceFiles_2 = appSourceFiles; _a < appSourceFiles_2.length; _a++) {
                var sourceFile = appSourceFiles_2[_a];
                if (!sourceFile.getFilePath().endsWith('/' + moduleFileName)) {
                    continue;
                }
                addToFeatureModule(sourceFile, appSourceFiles);
                (0, program_1.saveAndFormat)(sourceFile);
                break;
            }
        }
        return tree;
    };
    function addToFeatureModule(sourceFile, appSourceFiles) {
        var configFeatures = [].concat(config.featureModule);
        for (var i = 0; i < configFeatures.length; i++) {
            var featureModule = configFeatures[i];
            // if it's already in a wrapper module
            if ((0, feature_utils_1.findFeatureModule)(featureModule, appSourceFiles)) {
                break;
            }
            var content = "".concat(constants_1.PROVIDE_CONFIG_FUNCTION, "(<").concat(constants_1.CMS_CONFIG, ">{\n            featureModules: {");
            if (options.lazy) {
                var lazyLoadingChunkName = config.moduleName;
                if (config.lazyLoadingChunk) {
                    var namedImportsContent = config.lazyLoadingChunk.namedImports[i];
                    lazyLoadingChunkName = "[".concat(namedImportsContent, "]");
                    (0, import_utils_1.createImports)(sourceFile, config.lazyLoadingChunk);
                }
                content =
                    content +
                        "".concat(lazyLoadingChunkName, ": {\n                module: () =>\n                  import('").concat(featureModule.importPath, "').then((m) => m.").concat(featureModule.name, "),\n              },");
                (0, new_module_utils_1.addModuleProvider)(sourceFile, {
                    "import": [
                        {
                            moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                            namedImports: [constants_1.PROVIDE_CONFIG_FUNCTION, constants_1.CMS_CONFIG]
                        },
                    ],
                    content: content + "}})"
                });
            }
            else {
                (0, new_module_utils_1.addModuleImport)(sourceFile, {
                    "import": {
                        moduleSpecifier: featureModule.importPath,
                        namedImports: [featureModule.name]
                    },
                    content: featureModule.content || featureModule.name
                });
            }
        }
    }
}
function addFeatureTranslations(options, config) {
    return function (tree) {
        if (!config.i18n) {
            return tree;
        }
        var basePath = process.cwd();
        var moduleFileName = createModuleFileName(config);
        var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, options.project).buildPaths;
        for (var _i = 0, buildPaths_4 = buildPaths; _i < buildPaths_4.length; _i++) {
            var tsconfigPath = buildPaths_4[_i];
            var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
            for (var _a = 0, appSourceFiles_3 = appSourceFiles; _a < appSourceFiles_3.length; _a++) {
                var sourceFile = appSourceFiles_3[_a];
                if (!sourceFile.getFilePath().endsWith('/' + moduleFileName)) {
                    continue;
                }
                (0, new_module_utils_1.addModuleProvider)(sourceFile, {
                    "import": [
                        {
                            moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                            namedImports: [constants_1.PROVIDE_CONFIG_FUNCTION, constants_1.I18N_CONFIG]
                        },
                        {
                            moduleSpecifier: config.i18n.importPath,
                            namedImports: [config.i18n.chunks, config.i18n.resources]
                        },
                    ],
                    content: "".concat(constants_1.PROVIDE_CONFIG_FUNCTION, "(<").concat(constants_1.I18N_CONFIG, ">{\n              i18n: {\n                resources: ").concat(config.i18n.resources, ",\n                chunks: ").concat(config.i18n.chunks, ",\n              },\n            })")
                });
                (0, program_1.saveAndFormat)(sourceFile);
                break;
            }
        }
        return tree;
    };
}
exports.addFeatureTranslations = addFeatureTranslations;
function addCustomConfig(options, config) {
    return function (tree) {
        var _a;
        if (!config.customConfig) {
            return tree;
        }
        var basePath = process.cwd();
        var moduleFileName = createModuleFileName(config);
        var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, options.project).buildPaths;
        for (var _i = 0, buildPaths_5 = buildPaths; _i < buildPaths_5.length; _i++) {
            var tsconfigPath = buildPaths_5[_i];
            var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
            var _loop_1 = function (sourceFile) {
                if (!sourceFile.getFilePath().endsWith('/' + moduleFileName)) {
                    return "continue";
                }
                var customConfigs = [].concat((_a = config.customConfig(options).providers) !== null && _a !== void 0 ? _a : []);
                customConfigs.forEach(function (customConfig) {
                    (0, new_module_utils_1.addModuleProvider)(sourceFile, {
                        "import": __spreadArray([
                            {
                                moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                                namedImports: [constants_1.PROVIDE_CONFIG_FUNCTION]
                            }
                        ], customConfig["import"], true),
                        content: "".concat(constants_1.PROVIDE_CONFIG_FUNCTION, "(").concat(customConfig.content, ")")
                    });
                });
                (0, program_1.saveAndFormat)(sourceFile);
                return "break";
            };
            for (var _b = 0, appSourceFiles_4 = appSourceFiles; _b < appSourceFiles_4.length; _b++) {
                var sourceFile = appSourceFiles_4[_b];
                var state_1 = _loop_1(sourceFile);
                if (state_1 === "break")
                    break;
            }
        }
        return tree;
    };
}
function addLibraryAssets(assetsConfig, options) {
    return function (tree) {
        var _a;
        var _b, _c, _d, _e;
        var _f = (0, workspace_utils_1.getWorkspace)(tree), path = _f.path, angularJson = _f.workspace;
        var defaultProject = (0, workspace_utils_1.getDefaultProjectNameFromWorkspace)(tree);
        var project = options.project || defaultProject;
        var architect = angularJson.projects[project].architect;
        // `build` architect section
        var architectBuild = architect === null || architect === void 0 ? void 0 : architect.build;
        var buildAssets = createAssetsArray(assetsConfig, (_b = architectBuild === null || architectBuild === void 0 ? void 0 : architectBuild.options) === null || _b === void 0 ? void 0 : _b.assets);
        var buildOptions = __assign(__assign({}, architectBuild === null || architectBuild === void 0 ? void 0 : architectBuild.options), { assets: buildAssets });
        // `test` architect section
        var architectTest = architect === null || architect === void 0 ? void 0 : architect.test;
        var testAssets = createAssetsArray(assetsConfig, (_c = architectTest === null || architectTest === void 0 ? void 0 : architectTest.options) === null || _c === void 0 ? void 0 : _c.assets);
        var testOptions = __assign(__assign({}, architectTest === null || architectTest === void 0 ? void 0 : architectTest.options), { assets: testAssets });
        var updatedAngularJson = __assign(__assign({}, angularJson), { projects: __assign(__assign({}, angularJson.projects), (_a = {}, _a[project] = __assign(__assign({}, angularJson.projects[project]), { architect: __assign(__assign({}, architect), { build: __assign(__assign({}, architectBuild), { options: buildOptions }), test: __assign(__assign({}, architectTest), { options: testOptions }) }) }), _a)) });
        var initialContent = (_e = (_d = tree.read(path)) === null || _d === void 0 ? void 0 : _d.toString(constants_1.UTF_8)) !== null && _e !== void 0 ? _e : '';
        var toUpdate = JSON.stringify(updatedAngularJson, null, 2);
        // prevent the unnecessary Angular logs about the files being updated
        if (initialContent !== toUpdate) {
            tree.overwrite(path, toUpdate);
        }
    };
}
function createAssetsArray(assetsConfig, angularJsonAssets) {
    if (angularJsonAssets === void 0) { angularJsonAssets = []; }
    for (var _i = 0, angularJsonAssets_1 = angularJsonAssets; _i < angularJsonAssets_1.length; _i++) {
        var asset = angularJsonAssets_1[_i];
        if (typeof asset === 'object') {
            if (asset.glob === assetsConfig.glob &&
                asset.input === "./node_modules/@spartacus/".concat(assetsConfig.input) &&
                asset.output === (assetsConfig.output || 'assets/')) {
                return angularJsonAssets;
            }
        }
    }
    angularJsonAssets = __spreadArray(__spreadArray([], angularJsonAssets, true), [
        {
            glob: assetsConfig.glob,
            input: "./node_modules/@spartacus/".concat(assetsConfig.input),
            output: assetsConfig.output || 'assets/'
        },
    ], false);
    return angularJsonAssets;
}
function addLibraryStyles(stylingConfig, options) {
    return function (tree, _context) {
        var _a;
        var _b, _c, _d, _e, _f, _g;
        var defaultProject = (0, workspace_utils_1.getDefaultProjectNameFromWorkspace)(tree);
        var project = options.project || defaultProject;
        var libraryScssPath = "".concat((0, workspace_utils_1.getSourceRoot)(tree, {
            project: project
        }), "/styles/spartacus/").concat(stylingConfig.scssFileName);
        var libraryStylesImport = "@import \"".concat(stylingConfig.importStyle, "\";");
        if (tree.exists(libraryScssPath)) {
            var initialContent = (_c = (_b = tree.read(libraryScssPath)) === null || _b === void 0 ? void 0 : _b.toString(constants_1.UTF_8)) !== null && _c !== void 0 ? _c : '';
            var content = initialContent;
            if (!content.includes(libraryStylesImport)) {
                content += "\n".concat(libraryStylesImport);
            }
            // prevent the unnecessary Angular logs about the files being updated
            if (initialContent !== content) {
                tree.overwrite(libraryScssPath, content);
            }
            return tree;
        }
        var styleConfigFilePath = (0, styling_utils_1.getStylesConfigFilePath)((0, workspace_utils_1.getSourceRoot)(tree, {
            project: project
        }));
        var libraryScssFileContent = '';
        if (tree.exists(styleConfigFilePath)) {
            var styleConfigImportPath = (0, styling_utils_1.getRelativeStyleConfigImportPath)((0, workspace_utils_1.getProject)(tree, project), libraryScssPath);
            var stylesConfigImport = "@import \"".concat(styleConfigImportPath, "\";");
            libraryScssFileContent += "".concat(stylesConfigImport, "\n");
        }
        libraryScssFileContent += "".concat(libraryStylesImport, "\n");
        tree.create(libraryScssPath, libraryScssFileContent);
        var _h = (0, workspace_utils_1.getWorkspace)(tree), path = _h.path, angularJson = _h.workspace;
        var architect = angularJson.projects[project].architect;
        // `build` architect section
        var architectBuild = architect === null || architect === void 0 ? void 0 : architect.build;
        var buildOptions = __assign(__assign({}, architectBuild === null || architectBuild === void 0 ? void 0 : architectBuild.options), { styles: __spreadArray(__spreadArray([], (((_d = architectBuild === null || architectBuild === void 0 ? void 0 : architectBuild.options) === null || _d === void 0 ? void 0 : _d.styles)
                ? (_e = architectBuild === null || architectBuild === void 0 ? void 0 : architectBuild.options) === null || _e === void 0 ? void 0 : _e.styles
                : []), true), [
                libraryScssPath,
            ], false) });
        // `test` architect section
        var architectTest = architect === null || architect === void 0 ? void 0 : architect.test;
        var testOptions = __assign(__assign({}, architectTest === null || architectTest === void 0 ? void 0 : architectTest.options), { styles: __spreadArray(__spreadArray([], (((_f = architectTest === null || architectTest === void 0 ? void 0 : architectTest.options) === null || _f === void 0 ? void 0 : _f.styles)
                ? (_g = architectTest === null || architectTest === void 0 ? void 0 : architectTest.options) === null || _g === void 0 ? void 0 : _g.styles
                : []), true), [
                libraryScssPath,
            ], false) });
        var updatedAngularJson = __assign(__assign({}, angularJson), { projects: __assign(__assign({}, angularJson.projects), (_a = {}, _a[project] = __assign(__assign({}, angularJson.projects[project]), { architect: __assign(__assign({}, architect), { build: __assign(__assign({}, architectBuild), { options: buildOptions }), test: __assign(__assign({}, architectTest), { options: testOptions }) }) }), _a)) });
        tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));
    };
}
exports.addLibraryStyles = addLibraryStyles;
function createNodePackageInstallationTask(context) {
    return context.addTask(new tasks_1.NodePackageInstallTask());
}
exports.createNodePackageInstallationTask = createNodePackageInstallationTask;
function installPackageJsonDependencies() {
    return function (tree, context) {
        createNodePackageInstallationTask(context);
        return tree;
    };
}
exports.installPackageJsonDependencies = installPackageJsonDependencies;
function addPackageJsonDependencies(dependencies, packageJson) {
    return function (tree, context) {
        for (var _i = 0, dependencies_2 = dependencies; _i < dependencies_2.length; _i++) {
            var dependency = dependencies_2[_i];
            if (!dependencyExists(dependency, packageJson)) {
                (0, dependencies_1.addPackageJsonDependency)(tree, dependency);
                context.logger.info("\u2705\uFE0F Added '".concat(dependency.name, "' into ").concat(dependency.type));
            }
        }
        return tree;
    };
}
exports.addPackageJsonDependencies = addPackageJsonDependencies;
/**
 * Adds libraries dependencies to package.json
 */
function addPackageJsonDependenciesForLibrary(dependencies, _options) {
    return function (tree, _context) {
        var packageJson = (0, package_utils_1.readPackageJson)(tree);
        var spartacusLibraries = (0, package_utils_1.createSpartacusDependencies)(dependencies);
        var thirdPartyLibraries = (0, package_utils_1.createDependencies)(dependencies);
        var libraries = spartacusLibraries.concat(thirdPartyLibraries);
        return (0, schematics_1.chain)([
            addPackageJsonDependencies(libraries, packageJson),
            installPackageJsonDependencies(),
        ]);
    };
}
exports.addPackageJsonDependenciesForLibrary = addPackageJsonDependenciesForLibrary;
function dependencyExists(dependency, packageJson) {
    var _a;
    return (_a = packageJson[dependency.type]) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(dependency.name);
}
exports.dependencyExists = dependencyExists;
function configureB2bFeatures(options, packageJson) {
    return function (_tree, _context) {
        var spartacusVersion = (0, package_utils_1.getPrefixedSpartacusSchematicsVersion)();
        return (0, schematics_1.chain)([
            addB2bProviders(options),
            addPackageJsonDependencies([
                {
                    type: dependencies_1.NodeDependencyType.Default,
                    version: spartacusVersion,
                    name: libs_constants_1.SPARTACUS_SETUP
                },
            ], packageJson),
        ]);
    };
}
exports.configureB2bFeatures = configureB2bFeatures;
function addB2bProviders(options) {
    return function (tree, _context) {
        var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, options.project).buildPaths;
        if (!buildPaths.length) {
            throw new schematics_1.SchematicsException('Could not find any tsconfig file. Cannot configure SpartacusConfigurationModule.');
        }
        var basePath = process.cwd();
        for (var _i = 0, buildPaths_6 = buildPaths; _i < buildPaths_6.length; _i++) {
            var tsconfigPath = buildPaths_6[_i];
            var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
            var _loop_2 = function (sourceFile) {
                if (!sourceFile
                    .getFilePath()
                    .includes("".concat(libs_constants_1.SPARTACUS_CONFIGURATION_MODULE, ".module.ts"))) {
                    return "continue";
                }
                (0, config_utils_1.getB2bConfiguration)().forEach(function (provider) {
                    return (0, new_module_utils_1.addModuleProvider)(sourceFile, provider);
                });
                (0, program_1.saveAndFormat)(sourceFile);
                return "break";
            };
            for (var _a = 0, appSourceFiles_5 = appSourceFiles; _a < appSourceFiles_5.length; _a++) {
                var sourceFile = appSourceFiles_5[_a];
                var state_2 = _loop_2(sourceFile);
                if (state_2 === "break")
                    break;
            }
        }
        return tree;
    };
}
function createModuleFileName(config) {
    return "".concat((0, strings_1.dasherize)(config.moduleName), "-feature.module.ts");
}
/**
 * Used a comparator function when sorting features.
 */
function calculateCrossFeatureSort(featureA, featureB) {
    return calculateSortInternal(featureA, featureB, graph_utils_1.crossFeatureInstallationOrder);
}
exports.calculateCrossFeatureSort = calculateCrossFeatureSort;
/**
 * Used a comparator function when sorting libraries.
 */
function calculateCrossLibrarySort(libraryA, libraryB) {
    return calculateSortInternal(libraryA, libraryB, graph_utils_1.crossLibraryInstallationOrder);
}
exports.calculateCrossLibrarySort = calculateCrossLibrarySort;
/**
 * Used to sort libraries or features in the correct order.
 */
function calculateSortInternal(libOrFeatureA, libOrFeatureB, order) {
    var indexA = order.indexOf(libOrFeatureA);
    var indexB = order.indexOf(libOrFeatureB);
    /**
     * In case a feature module is _not_ found in the `order`,
     * we want to sort it at the end of the list.
     */
    return (indexA > -1 ? indexA : Infinity) - (indexB > -1 ? indexB : Infinity);
}
/**
 * Performs the final steps of the installation,
 * before Angular schematics mechanism takes over.
 */
function finalizeInstallation(options, features) {
    return function (_tree, context) {
        var _a;
        if ((_a = options.internal) === null || _a === void 0 ? void 0 : _a.existingSpartacusApplication) {
            var message = "\uD83D\uDEA8 Detected Spartacus installation. Please make sure the following ";
            message += "features are installed, configured and sorted in the correct order:\n";
            message += features.join(', ');
            context.logger.warn(message);
        }
    };
}
exports.finalizeInstallation = finalizeInstallation;
//# sourceMappingURL=lib-utils.js.map