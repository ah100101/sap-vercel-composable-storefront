"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
exports.__esModule = true;
exports.addSpartacusConfiguration = void 0;
var schematics_1 = require("@angular-devkit/schematics");
var constants_1 = require("../shared/constants");
var libs_constants_1 = require("../shared/libs-constants");
var new_module_utils_1 = require("../shared/utils/new-module-utils");
var package_utils_1 = require("../shared/utils/package-utils");
var program_1 = require("../shared/utils/program");
var project_tsconfig_paths_1 = require("../shared/utils/project-tsconfig-paths");
var transform_utils_1 = require("../shared/utils/transform-utils");
function addSpartacusConfiguration(options) {
    return function (tree, context) {
        if (options.debug) {
            context.logger.info("\u231B\uFE0F Setting up Spartacus configuration module...");
        }
        var buildPaths = (0, project_tsconfig_paths_1.getProjectTsConfigPaths)(tree, options.project).buildPaths;
        if (!buildPaths.length) {
            throw new schematics_1.SchematicsException('Could not find any tsconfig file. Cannot configure SpartacusConfigurationModule.');
        }
        var basePath = process.cwd();
        for (var _i = 0, buildPaths_1 = buildPaths; _i < buildPaths_1.length; _i++) {
            var tsconfigPath = buildPaths_1[_i];
            addConfiguration(tree, tsconfigPath, basePath, options);
        }
        if (options.debug) {
            context.logger.info("\u2705 Spartacus configuration module setup complete.");
        }
        return tree;
    };
}
exports.addSpartacusConfiguration = addSpartacusConfiguration;
function addConfiguration(tree, tsconfigPath, basePath, options) {
    var appSourceFiles = (0, program_1.createProgram)(tree, basePath, tsconfigPath).appSourceFiles;
    for (var _i = 0, appSourceFiles_1 = appSourceFiles; _i < appSourceFiles_1.length; _i++) {
        var sourceFile = appSourceFiles_1[_i];
        if (sourceFile
            .getFilePath()
            .includes("".concat(libs_constants_1.SPARTACUS_CONFIGURATION_MODULE, ".module.ts"))) {
            addCommonConfiguration(sourceFile, options);
            (0, program_1.saveAndFormat)(sourceFile);
            break;
        }
    }
}
function addCommonConfiguration(sourceFile, options) {
    (0, new_module_utils_1.addModuleProvider)(sourceFile, {
        "import": [
            {
                moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                namedImports: [constants_1.PROVIDE_CONFIG_FUNCTION]
            },
            {
                moduleSpecifier: libs_constants_1.SPARTACUS_STOREFRONTLIB,
                namedImports: ['layoutConfig']
            },
        ],
        content: "provideConfig(layoutConfig)"
    });
    (0, new_module_utils_1.addModuleProvider)(sourceFile, {
        "import": [
            {
                moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                namedImports: [constants_1.PROVIDE_CONFIG_FUNCTION]
            },
            {
                moduleSpecifier: libs_constants_1.SPARTACUS_STOREFRONTLIB,
                namedImports: ['mediaConfig']
            },
        ],
        content: "provideConfig(mediaConfig)"
    });
    (0, new_module_utils_1.addModuleProvider)(sourceFile, {
        "import": {
            moduleSpecifier: libs_constants_1.SPARTACUS_STOREFRONTLIB,
            namedImports: ['defaultCmsContentProviders']
        },
        content: "...defaultCmsContentProviders"
    });
    addStorefrontConfig(sourceFile, options);
}
function createSiteContextConfig(options) {
    var contextConfig = "\n      context: {";
    if (options.currency) {
        var currency = (0, transform_utils_1.parseCSV)(options.currency).toUpperCase();
        contextConfig += "\ncurrency: [".concat(currency, "],");
    }
    if (options.language) {
        var language = (0, transform_utils_1.parseCSV)(options.language).toLowerCase();
        contextConfig += "\nlanguage: [".concat(language, "],");
    }
    if (options.baseSite) {
        var baseSites = (0, transform_utils_1.parseCSV)(options.baseSite);
        contextConfig += "\nbaseSite: [".concat(baseSites, "],");
    }
    if (options.urlParameters) {
        var urlParameters = (0, transform_utils_1.parseCSV)(options.urlParameters);
        contextConfig += "\nurlParameters: [".concat(urlParameters, "]");
    }
    contextConfig += "},";
    return "provideConfig(<".concat(constants_1.SITE_CONTEXT_CONFIG, ">{").concat(contextConfig, "})");
}
/**
 * Creates and adds a spartacus config based on the provided `options`.
 * @param options
 */
function addStorefrontConfig(sourceFile, options) {
    var backendConfig = createBackendConfiguration(options);
    (0, new_module_utils_1.addModuleProvider)(sourceFile, {
        "import": [
            {
                moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                namedImports: [constants_1.PROVIDE_CONFIG_FUNCTION, constants_1.OCC_CONFIG]
            },
        ],
        content: backendConfig
    });
    var siteContextConfig = createSiteContextConfig(options);
    (0, new_module_utils_1.addModuleProvider)(sourceFile, {
        "import": [
            {
                moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                namedImports: [constants_1.PROVIDE_CONFIG_FUNCTION, constants_1.SITE_CONTEXT_CONFIG]
            },
        ],
        content: siteContextConfig
    });
    var i18nConfig = createI18NConfiguration();
    (0, new_module_utils_1.addModuleProvider)(sourceFile, {
        "import": [
            {
                moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                namedImports: [constants_1.PROVIDE_CONFIG_FUNCTION, constants_1.I18N_CONFIG]
            },
            {
                moduleSpecifier: libs_constants_1.SPARTACUS_ASSETS,
                namedImports: ['translations', 'translationChunksConfig']
            },
        ],
        content: i18nConfig
    });
    var featureLevelConfig = createFeatureLevelConfiguration(options);
    (0, new_module_utils_1.addModuleProvider)(sourceFile, {
        "import": [
            {
                moduleSpecifier: libs_constants_1.SPARTACUS_CORE,
                namedImports: [constants_1.PROVIDE_CONFIG_FUNCTION, constants_1.FEATURES_CONFIG]
            },
        ],
        content: featureLevelConfig
    });
}
function createBackendConfiguration(options) {
    var baseUrlPart = "\n          baseUrl: '".concat(options.baseUrl, "',");
    var occPrefixPart = options.occPrefix
        ? "prefix: '".concat(options.occPrefix, "'")
        : '';
    return "provideConfig(<".concat(constants_1.OCC_CONFIG, ">{\n    backend: {\n      occ: {").concat(options.useMetaTags ? '' : baseUrlPart).concat(occPrefixPart, "\n      }\n    },\n  })");
}
function createI18NConfiguration() {
    return "provideConfig(<".concat(constants_1.I18N_CONFIG, ">{\n  i18n: {\n    resources: translations,\n    chunks: translationChunksConfig,\n    fallbackLang: 'en'\n  },\n})");
}
function createFeatureLevelConfiguration(options) {
    var featureLevelConfig = "\n  features: {\n    level: '".concat(options.featureLevel || (0, package_utils_1.getSpartacusCurrentFeatureLevel)(), "'\n  }");
    return "provideConfig(<".concat(constants_1.FEATURES_CONFIG, ">{").concat(featureLevelConfig, "})");
}
//# sourceMappingURL=configuration.js.map