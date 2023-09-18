"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDynamicallyImportedLocalSourceFile = exports.findFeatureModule = exports.analyzeApplication = exports.getModuleConfig = exports.getSpartacusFeaturesModule = exports.addFeatures = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const ts_morph_1 = require("ts-morph");
const constants_1 = require("../constants");
const libs_constants_1 = require("../libs-constants");
const schematics_config_mappings_1 = require("../schematics-config-mappings");
const graph_utils_1 = require("./graph-utils");
const import_utils_1 = require("./import-utils");
const lib_utils_1 = require("./lib-utils");
const new_module_utils_1 = require("./new-module-utils");
const program_1 = require("./program");
const project_tsconfig_paths_1 = require("./project-tsconfig-paths");
/**
 * Configures feature modules for the given array of features.
 *
 * Optionally, an override can be provided for the default
 * schematics options and/or feature-schematics configuration.
 */
function addFeatures(options, features) {
    return (_tree, context) => {
        var _a, _b, _c, _d;
        if (options.debug) {
            let message = `\n******************************\n`;
            message += `Cross feature graph:\n`;
            message += graph_utils_1.crossFeatureInstallationOrder.join(', ');
            message += `\n******************************\n`;
            context.logger.info(message);
        }
        /**
         * In an existing Spartacus application, we don't want to
         * force-install the dependent features.
         */
        const featuresToInstall = ((_a = options.internal) === null || _a === void 0 ? void 0 : _a.existingSpartacusApplication)
            ? (_b = options.features) !== null && _b !== void 0 ? _b : []
            : features;
        const rules = [];
        for (const feature of featuresToInstall) {
            const schematicsConfiguration = schematics_config_mappings_1.featureSchematicConfigMapping.get(feature);
            if (!schematicsConfiguration) {
                throw new schematics_1.SchematicsException(`[Internal] No feature config found for ${feature}. ` +
                    `Please check if the schematics config is added to projects/schematics/src/shared/schematics-config-mappings.ts`);
            }
            // TODO:#schematics - fix the interactivity for the CDS / ASM, etc.
            const libraryOptions = (_d = (_c = schematicsConfiguration.customConfig) === null || _c === void 0 ? void 0 : _c.call(schematicsConfiguration, options).options) !== null && _d !== void 0 ? _d : options;
            rules.push((0, lib_utils_1.addLibraryFeature)(libraryOptions, schematicsConfiguration));
            const wrappers = analyzeWrappers(schematicsConfiguration, libraryOptions);
            for (const { wrapperOptions } of wrappers) {
                rules.push((0, schematics_1.externalSchematic)(libs_constants_1.SPARTACUS_SCHEMATICS, 'wrapper-module', wrapperOptions));
            }
        }
        return (0, schematics_1.chain)(rules);
    };
}
exports.addFeatures = addFeatures;
/**
 * Analyzes the given schematics configuration for the wrapper modules.
 * It builds the options for the wrapper schematic run,
 * including the execution sequence.
 */
function analyzeWrappers(schematicsConfiguration, options) {
    var _a;
    if (!((_a = schematicsConfiguration.importAfter) === null || _a === void 0 ? void 0 : _a.length)) {
        return [];
    }
    const result = [];
    for (const importAfterConfig of schematicsConfiguration.importAfter) {
        const wrapperOptions = {
            scope: options.scope,
            interactive: options.interactive,
            project: options.project,
            markerModuleName: importAfterConfig.markerModuleName,
            featureModuleName: importAfterConfig.featureModuleName,
            debug: options.debug,
        };
        const analysis = {
            markerModuleName: importAfterConfig.markerModuleName,
            wrapperOptions,
        };
        result.push(analysis);
    }
    return result;
}
/**
 * If exists, it returns the spartacus-features.module.ts' source.
 * Otherwise, it returns undefined.
 */
function getSpartacusFeaturesModule(tree, basePath, tsconfigPath) {
    const { appSourceFiles } = (0, program_1.createProgram)(tree, basePath, tsconfigPath);
    for (const sourceFile of appSourceFiles) {
        if (sourceFile
            .getFilePath()
            .includes(`${libs_constants_1.SPARTACUS_FEATURES_MODULE}.module.ts`)) {
            if (getSpartacusFeaturesNgModuleDecorator(sourceFile)) {
                return sourceFile;
            }
        }
    }
    return undefined;
}
exports.getSpartacusFeaturesModule = getSpartacusFeaturesModule;
/**
 * Returns the NgModule decorator, if exists.
 */
function getSpartacusFeaturesNgModuleDecorator(sourceFile) {
    let spartacusFeaturesModule;
    function visitor(node) {
        if (ts_morph_1.Node.isCallExpression(node)) {
            const expression = node.getExpression();
            if (ts_morph_1.Node.isIdentifier(expression) &&
                expression.getText() === 'NgModule' &&
                (0, import_utils_1.isImportedFrom)(expression, constants_1.ANGULAR_CORE)) {
                const classDeclaration = node.getFirstAncestorByKind(ts_morph_1.ts.SyntaxKind.ClassDeclaration);
                if (classDeclaration) {
                    const identifier = classDeclaration.getNameNode();
                    if (identifier &&
                        identifier.getText() === libs_constants_1.SPARTACUS_FEATURES_NG_MODULE) {
                        spartacusFeaturesModule = node;
                    }
                }
            }
        }
        node.forEachChild(visitor);
    }
    sourceFile.forEachChild(visitor);
    return spartacusFeaturesModule;
}
/**
 * For the given feature module name,
 * returns the module configuration part
 * of the given schematics feature config
 */
function getModuleConfig(featureModuleName, featureConfig) {
    const featureModuleConfigs = [].concat(featureConfig.featureModule);
    for (const featureModuleConfig of featureModuleConfigs) {
        if (featureModuleConfig.name === featureModuleName) {
            return featureModuleConfig;
        }
    }
    return undefined;
}
exports.getModuleConfig = getModuleConfig;
/**
 * Analyzes the customers' application.
 * It checks for presence of Spartacus features and
 * whether they're configured or present in package.json.
 */
function analyzeApplication(options, allFeatures) {
    return (tree, context) => {
        var _a, _b;
        const spartacusFeatureModuleExists = (0, lib_utils_1.checkAppStructure)(tree, options.project);
        /**
         * Mutates the options, and sets the internal properties
         * for later usage in other rules.
         */
        options.internal = Object.assign(Object.assign({}, options.internal), { existingSpartacusApplication: spartacusFeatureModuleExists });
        if (!options.internal.existingSpartacusApplication) {
            const dependentFeaturesMessage = createDependentFeaturesLog(options, allFeatures);
            if (dependentFeaturesMessage) {
                context.logger.info(dependentFeaturesMessage);
            }
            return (0, schematics_1.noop)();
        }
        logDebugInfo(`⌛️ Analyzing application...`);
        for (const targetFeature of (_a = options.features) !== null && _a !== void 0 ? _a : []) {
            const targetFeatureConfig = (0, schematics_config_mappings_1.getSchematicsConfigByFeatureOrThrow)(targetFeature);
            if (!((_b = targetFeatureConfig.importAfter) === null || _b === void 0 ? void 0 : _b.length)) {
                continue;
            }
            const wrappers = analyzeWrappers(targetFeatureConfig, options);
            for (const { wrapperOptions } of wrappers) {
                const markerFeature = (0, schematics_config_mappings_1.getKeyByMappingValueOrThrow)(schematics_config_mappings_1.featureFeatureModuleMapping, wrapperOptions.markerModuleName);
                const markerFeatureConfig = (0, schematics_config_mappings_1.getSchematicsConfigByFeatureOrThrow)(markerFeature);
                const markerModuleConfig = getModuleConfig(wrapperOptions.markerModuleName, markerFeatureConfig);
                if (!markerModuleConfig ||
                    markerModuleExists(options, tree, markerModuleConfig)) {
                    continue;
                }
                const targetModuleName = wrapperOptions.featureModuleName;
                const targetFeature = (0, schematics_config_mappings_1.getKeyByMappingValueOrThrow)(schematics_config_mappings_1.featureFeatureModuleMapping, targetModuleName);
                const targetFeatureConfig = (0, schematics_config_mappings_1.getSchematicsConfigByFeatureOrThrow)(targetFeature);
                const targetModuleConfig = getModuleConfig(targetModuleName, targetFeatureConfig);
                let message = `Attempted to append '${targetModuleName}' module `;
                message += `from '${targetModuleConfig === null || targetModuleConfig === void 0 ? void 0 : targetModuleConfig.importPath}' after the `;
                message += `'${wrapperOptions.markerModuleName}' from '${markerModuleConfig.importPath}', `;
                message += `but could not find '${wrapperOptions.markerModuleName}'.`;
                message += `\n`;
                message += `Please make sure the '${markerFeature}' is installed by running:\n`;
                message += `> ng add @spartacus/schematics --features=${markerFeature}`;
                throw new schematics_1.SchematicsException(message);
            }
        }
        logDebugInfo(`✅  Application analysis complete.`);
        function logDebugInfo(message) {
            if (options.debug) {
                context.logger.info(message);
            }
        }
    };
}
exports.analyzeApplication = analyzeApplication;
function markerModuleExists(options, tree, markerModuleConfig) {
    const basePath = process.cwd();
    const { buildPaths } = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, options.project);
    for (const tsconfigPath of buildPaths) {
        const { appSourceFiles } = (0, program_1.createProgram)(tree, basePath, tsconfigPath);
        if (findFeatureModule(markerModuleConfig, appSourceFiles)) {
            return true;
        }
    }
    return false;
}
/**
 * Searches through feature modules,
 * and looks for either the static or
 * dynamic imports.
 */
function findFeatureModule(moduleConfig, appSourceFiles) {
    const moduleConfigs = [].concat(moduleConfig);
    for (const sourceFile of appSourceFiles) {
        for (const moduleConfig of moduleConfigs) {
            if (isStaticallyImported(sourceFile, moduleConfig)) {
                return sourceFile;
            }
            if (isDynamicallyImported(sourceFile, moduleConfig)) {
                return sourceFile;
            }
        }
    }
    return undefined;
}
exports.findFeatureModule = findFeatureModule;
function isStaticallyImported(sourceFile, moduleConfig) {
    var _a, _b, _c;
    if (!(0, import_utils_1.staticImportExists)(sourceFile, moduleConfig.importPath, moduleConfig.name)) {
        false;
    }
    const elements = (_b = (_a = (0, new_module_utils_1.getModulePropertyInitializer)(sourceFile, 'imports', false)) === null || _a === void 0 ? void 0 : _a.getElements()) !== null && _b !== void 0 ? _b : [];
    for (const element of elements) {
        const moduleName = (_c = element.getText().split('.').pop()) !== null && _c !== void 0 ? _c : '';
        if (moduleName === moduleConfig.name) {
            return true;
        }
    }
    return false;
}
function isDynamicallyImported(sourceFile, moduleConfig) {
    return !!(0, import_utils_1.findDynamicImport)(sourceFile, {
        moduleSpecifier: moduleConfig.importPath,
        namedImports: [moduleConfig.name],
    });
}
/**
 * Peeks into the given dynamic import,
 * and returns referenced local source file.
 */
function getDynamicallyImportedLocalSourceFile(dynamicImport) {
    var _a;
    const importPath = (_a = (0, import_utils_1.getDynamicImportImportPath)(dynamicImport)) !== null && _a !== void 0 ? _a : '';
    if (!(0, import_utils_1.isRelative)(importPath)) {
        return;
    }
    const wrapperModuleFileName = `${importPath.split('/').pop()}.ts`;
    return dynamicImport
        .getSourceFile()
        .getProject()
        .getSourceFile((s) => s.getFilePath().endsWith(wrapperModuleFileName));
}
exports.getDynamicallyImportedLocalSourceFile = getDynamicallyImportedLocalSourceFile;
function createDependentFeaturesLog(options, features) {
    var _a;
    const selectedFeatures = (_a = options.features) !== null && _a !== void 0 ? _a : [];
    const notSelectedFeatures = features.filter((feature) => !selectedFeatures.includes(feature));
    if (!notSelectedFeatures.length) {
        return;
    }
    return `\n⚙️ Configuring the dependent features of ${selectedFeatures.join(', ')}: ${notSelectedFeatures.join(', ')}\n`;
}
//# sourceMappingURL=feature-utils.js.map