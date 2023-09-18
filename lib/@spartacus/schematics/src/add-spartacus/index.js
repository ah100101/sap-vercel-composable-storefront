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
exports.addSpartacus = exports.createStylePreprocessorOptions = exports.getMainStyleFilePath = void 0;
var schematics_1 = require("@angular-devkit/schematics");
var constants_1 = require("../shared/constants");
var libs_constants_1 = require("../shared/libs-constants");
var dependency_utils_1 = require("../shared/utils/dependency-utils");
var feature_utils_1 = require("../shared/utils/feature-utils");
var file_utils_1 = require("../shared/utils/file-utils");
var html_utils_1 = require("../shared/utils/html-utils");
var lib_utils_1 = require("../shared/utils/lib-utils");
var new_module_utils_1 = require("../shared/utils/new-module-utils");
var package_utils_1 = require("../shared/utils/package-utils");
var program_1 = require("../shared/utils/program");
var project_tsconfig_paths_1 = require("../shared/utils/project-tsconfig-paths");
var styling_utils_1 = require("../shared/utils/styling-utils");
var workspace_utils_1 = require("../shared/utils/workspace-utils");
var configuration_1 = require("./configuration");
var spartacus_1 = require("./spartacus");
var spartacus_features_1 = require("./spartacus-features");
var store_1 = require("./store");
function createStylesConfig(options) {
    return function (tree, context) {
        var project = (0, workspace_utils_1.getProjectFromWorkspace)(tree, options);
        var styleConfigFilePath = (0, styling_utils_1.getStylesConfigFilePath)(project.sourceRoot);
        var styleConfigContent = "$styleVersion: ".concat(options.featureLevel || (0, package_utils_1.getSpartacusCurrentFeatureLevel)());
        if (tree.exists(styleConfigFilePath)) {
            context.logger.warn("Skipping styles config file creation. File ".concat(styleConfigFilePath, " already exists."));
        }
        else {
            tree.create(styleConfigFilePath, styleConfigContent);
        }
        return tree;
    };
}
function getMainStyleFilePath(project) {
    var _a, _b, _c, _d;
    var rootStyles = (_d = (_c = (_b = (_a = (0, workspace_utils_1.getProjectTargets)(project)) === null || _a === void 0 ? void 0 : _a.build) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.styles) === null || _d === void 0 ? void 0 : _d[0];
    var styleFilePath = typeof rootStyles === 'object'
        ? rootStyles === null || rootStyles === void 0 ? void 0 : rootStyles.input
        : rootStyles;
    if (!styleFilePath) {
        throw new Error("Could not find main styling file from the project's angular configuration.");
    }
    return styleFilePath;
}
exports.getMainStyleFilePath = getMainStyleFilePath;
function installStyles(options) {
    return function (tree, context) {
        if (options.debug) {
            context.logger.info("\u231B\uFE0F Installing styles...");
        }
        var project = (0, workspace_utils_1.getProjectFromWorkspace)(tree, options);
        var styleFilePath = getMainStyleFilePath(project);
        if (!styleFilePath) {
            context.logger.warn("Could not find the default style file for this project.");
            context.logger.warn("Please consider manually setting up spartacus styles");
            return;
        }
        if (styleFilePath.split('.').pop() !== 'scss') {
            context.logger.warn("Could not find the default SCSS style file for this project. ");
            context.logger.warn("Please make sure your project is configured with SCSS and consider manually setting up spartacus styles.");
            return;
        }
        var buffer = tree.read(styleFilePath);
        if (!buffer) {
            context.logger.warn("Could not read the default style file within the project ".concat(styleFilePath));
            context.logger.warn("Please consider manually importing spartacus styles.");
            return;
        }
        var htmlContent = buffer.toString();
        var relativeStyleConfigImportPath = (0, styling_utils_1.getRelativeStyleConfigImportPath)(project, styleFilePath);
        var insertion = "\n@import '".concat(relativeStyleConfigImportPath, "';\n") +
            "@import '@spartacus/styles/index';\n";
        if (options === null || options === void 0 ? void 0 : options.theme) {
            insertion += "\n@import '@spartacus/styles/scss/theme/".concat(options.theme, "';\n");
        }
        if (htmlContent.includes(insertion)) {
            return;
        }
        var recorder = tree.beginUpdate(styleFilePath);
        recorder.insertLeft(htmlContent.length, insertion);
        tree.commitUpdate(recorder);
        if (options.debug) {
            context.logger.info("\u2705 Style installation complete.");
        }
    };
}
function updateMainComponent(project, options) {
    return function (host, context) {
        if (options.debug) {
            context.logger.info("\u231B\uFE0F Updating main component...");
        }
        var filePath = project.sourceRoot + '/app/app.component.html';
        var buffer = host.read(filePath);
        if (!buffer) {
            context.logger.warn("Could not read app.component.html file.");
            return;
        }
        var htmlContent = buffer.toString();
        var insertion = "<cx-storefront></cx-storefront>\n";
        if (htmlContent.includes(insertion)) {
            return;
        }
        var recorder = host.beginUpdate(filePath);
        if (options && options.overwriteAppComponent) {
            recorder.remove(0, htmlContent.length);
            recorder.insertLeft(0, insertion);
        }
        else {
            recorder.insertLeft(htmlContent.length, "\n".concat(insertion));
        }
        host.commitUpdate(recorder);
        if (options.debug) {
            context.logger.info("\u2705 Main component update complete.");
        }
        return host;
    };
}
function updateIndexFile(tree, options) {
    return function (host, context) {
        if (options.debug) {
            context.logger.info("\u231B\uFE0F Updating index file...");
        }
        var projectIndexHtmlPath = (0, file_utils_1.getIndexHtmlPath)(tree);
        var baseUrl = options.baseUrl || 'OCC_BACKEND_BASE_URL_VALUE';
        var metaTags = [
            "<meta name=\"occ-backend-base-url\" content=\"".concat(baseUrl, "\" />"),
            "<meta name=\"media-backend-base-url\" content=\"MEDIA_BACKEND_BASE_URL_VALUE\" />",
        ];
        metaTags.forEach(function (metaTag) {
            (0, html_utils_1.appendHtmlElementToHead)(host, projectIndexHtmlPath, metaTag);
        });
        if (options.debug) {
            context.logger.info("\u2705 Index file update complete");
        }
        return host;
    };
}
function increaseBudgets(options) {
    return function (tree, context) {
        var _a;
        var _b;
        if (options.debug) {
            context.logger.info("\u231B\uFE0F Increasing budgets...");
        }
        var _c = (0, workspace_utils_1.getWorkspace)(tree), path = _c.path, angularJson = _c.workspace;
        var projectName = (0, workspace_utils_1.getDefaultProjectNameFromWorkspace)(tree);
        var project = angularJson.projects[projectName];
        var architect = project.architect;
        var build = architect === null || architect === void 0 ? void 0 : architect.build;
        var configurations = build === null || build === void 0 ? void 0 : build.configurations;
        var productionConfiguration = configurations === null || configurations === void 0 ? void 0 : configurations.production;
        var productionBudgets = ((_b = productionConfiguration.budgets) !== null && _b !== void 0 ? _b : []).map(function (budget) {
            if (budget.type === 'initial') {
                return __assign(__assign({}, budget), { maximumError: '2.5mb' });
            }
            return budget;
        });
        var updatedAngularJson = __assign(__assign({}, angularJson), { projects: __assign(__assign({}, angularJson.projects), (_a = {}, _a[projectName] = __assign(__assign({}, project), { architect: __assign(__assign({}, architect), { build: __assign(__assign({}, build), { configurations: __assign(__assign({}, configurations), { production: __assign(__assign({}, productionConfiguration), { budgets: productionBudgets }) }) }) }) }), _a)) });
        tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));
        if (options.debug) {
            context.logger.info("\u2705 Budget increase complete.");
        }
        return tree;
    };
}
function createStylePreprocessorOptions(options) {
    return function (tree, context) {
        var _a;
        var _b, _c;
        if (options === null || options === void 0 ? void 0 : options.debug) {
            context.logger.info("\u231B\uFE0F Updating style preprocessor...");
        }
        var _d = (0, workspace_utils_1.getWorkspace)(tree), path = _d.path, angularJson = _d.workspace;
        var projectName = (0, workspace_utils_1.getDefaultProjectNameFromWorkspace)(tree);
        var project = angularJson.projects[projectName];
        var architect = project.architect;
        // `build` architect section
        var architectBuild = architect === null || architect === void 0 ? void 0 : architect.build;
        var buildStylePreprocessorOptions = createStylePreprocessorOptionsArray((_b = architectBuild === null || architectBuild === void 0 ? void 0 : architectBuild.options) === null || _b === void 0 ? void 0 : _b.stylePreprocessorOptions);
        var buildOptions = __assign(__assign({}, architectBuild === null || architectBuild === void 0 ? void 0 : architectBuild.options), { stylePreprocessorOptions: buildStylePreprocessorOptions });
        // `test` architect section
        var architectTest = architect === null || architect === void 0 ? void 0 : architect.test;
        var testStylePreprocessorOptions = createStylePreprocessorOptionsArray((_c = architectBuild === null || architectBuild === void 0 ? void 0 : architectBuild.options) === null || _c === void 0 ? void 0 : _c.stylePreprocessorOptions);
        var testOptions = __assign(__assign({}, architectTest === null || architectTest === void 0 ? void 0 : architectTest.options), { stylePreprocessorOptions: testStylePreprocessorOptions });
        var updatedAngularJson = __assign(__assign({}, angularJson), { projects: __assign(__assign({}, angularJson.projects), (_a = {}, _a[projectName] = __assign(__assign({}, project), { architect: __assign(__assign({}, architect), { build: __assign(__assign({}, architectBuild), { options: buildOptions }), test: __assign(__assign({}, architectTest), { options: testOptions }) }) }), _a)) });
        tree.overwrite(path, JSON.stringify(updatedAngularJson, null, 2));
        if (options === null || options === void 0 ? void 0 : options.debug) {
            context.logger.info("\u2705 Style preprocessor update complete.");
        }
        return tree;
    };
}
exports.createStylePreprocessorOptions = createStylePreprocessorOptions;
function createStylePreprocessorOptionsArray(angularJsonStylePreprocessorOptions) {
    var NODE_MODULES_PATH = 'node_modules/';
    if (!angularJsonStylePreprocessorOptions) {
        angularJsonStylePreprocessorOptions = {
            includePaths: [NODE_MODULES_PATH]
        };
    }
    else {
        if (!angularJsonStylePreprocessorOptions.includePaths) {
            angularJsonStylePreprocessorOptions.includePaths = [NODE_MODULES_PATH];
        }
        else {
            if (!angularJsonStylePreprocessorOptions.includePaths.includes(NODE_MODULES_PATH)) {
                angularJsonStylePreprocessorOptions.includePaths.push(NODE_MODULES_PATH);
            }
        }
    }
    return angularJsonStylePreprocessorOptions;
}
function prepareDependencies(features) {
    var spartacusDependencies = (0, package_utils_1.prepareSpartacusDependencies)();
    var libraries = (0, dependency_utils_1.analyzeCrossLibraryDependenciesByFeatures)(features);
    var spartacusVersion = (0, package_utils_1.getPrefixedSpartacusSchematicsVersion)();
    var spartacusLibraryDependencies = libraries.map(function (library) {
        return (0, package_utils_1.mapPackageToNodeDependencies)(library, spartacusVersion);
    });
    var dependencies = spartacusDependencies
        .concat(spartacusLibraryDependencies)
        .concat((0, package_utils_1.prepare3rdPartyDependencies)());
    return dependencies;
}
function updateAppModule(options) {
    return function (tree, context) {
        if (options.debug) {
            context.logger.info("\u231B\uFE0F Updating AppModule...");
        }
        var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, options.project).buildPaths;
        if (!buildPaths.length) {
            throw new schematics_1.SchematicsException('Could not find any tsconfig file. Cannot configure AppModule.');
        }
        var basePath = process.cwd();
        for (var _i = 0, buildPaths_1 = buildPaths; _i < buildPaths_1.length; _i++) {
            var tsconfigPath = buildPaths_1[_i];
            var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
            for (var _a = 0, appSourceFiles_1 = appSourceFiles; _a < appSourceFiles_1.length; _a++) {
                var sourceFile = appSourceFiles_1[_a];
                if (sourceFile.getFilePath().includes("app.module.ts")) {
                    (0, new_module_utils_1.addModuleImport)(sourceFile, {
                        order: 1,
                        "import": {
                            moduleSpecifier: constants_1.ANGULAR_HTTP,
                            namedImports: ['HttpClientModule']
                        },
                        content: 'HttpClientModule'
                    });
                    (0, new_module_utils_1.addModuleImport)(sourceFile, {
                        order: 2,
                        "import": {
                            moduleSpecifier: libs_constants_1.SPARTACUS_STOREFRONTLIB,
                            namedImports: ['AppRoutingModule']
                        },
                        content: 'AppRoutingModule'
                    });
                    (0, program_1.saveAndFormat)(sourceFile);
                    break;
                }
            }
        }
        if (options.debug) {
            context.logger.info("\u2705 AppModule update complete.");
        }
        return tree;
    };
}
function addSpartacus(options) {
    return function (tree, context) {
        var _a;
        var features = (0, dependency_utils_1.analyzeCrossFeatureDependencies)((_a = options.features) !== null && _a !== void 0 ? _a : []);
        var dependencies = prepareDependencies(features);
        var spartacusRxjsDependency = [
            dependencies.find(function (dep) { return dep.name === constants_1.RXJS; }),
        ];
        var packageJsonFile = (0, package_utils_1.readPackageJson)(tree);
        return (0, schematics_1.chain)([
            (0, feature_utils_1.analyzeApplication)(options, features),
            (0, store_1.setupStoreModules)(options),
            (0, workspace_utils_1.scaffoldStructure)(options),
            (0, spartacus_1.setupSpartacusModule)(options),
            (0, spartacus_features_1.setupSpartacusFeaturesModule)(options),
            (0, configuration_1.addSpartacusConfiguration)(options),
            updateAppModule(options),
            createStylesConfig(options),
            installStyles(options),
            updateMainComponent((0, workspace_utils_1.getProjectFromWorkspace)(tree, options), options),
            options.useMetaTags ? updateIndexFile(tree, options) : (0, schematics_1.noop)(),
            increaseBudgets(options),
            createStylePreprocessorOptions(options),
            (0, feature_utils_1.addFeatures)(options, features),
            (0, schematics_1.chain)([
                (0, lib_utils_1.addPackageJsonDependencies)(prepareDependencies(features), packageJsonFile),
                /**
                 * Force installing versions of dependencies used by Spartacus.
                 * E.g. ng13 uses rxjs 7, but Spartacus uses rxjs 6.
                 */
                (0, package_utils_1.updatePackageJsonDependencies)(spartacusRxjsDependency, packageJsonFile),
                (0, lib_utils_1.installPackageJsonDependencies)(),
            ]),
            (0, lib_utils_1.finalizeInstallation)(options, features),
        ])(tree, context);
    };
}
exports.addSpartacus = addSpartacus;
//# sourceMappingURL=index.js.map