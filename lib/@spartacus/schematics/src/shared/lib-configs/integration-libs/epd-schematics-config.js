"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EPD_SCHEMATICS_CONFIG = exports.EPD_VISUALIZATION_TRANSLATION_CHUNKS_CONFIG = exports.EPD_VISUALIZATION_TRANSLATIONS = exports.EPD_VISUALIZATION_ROOT_MODULE = exports.EPD_VISUALIZATION_MODULE = exports.EPD_VISUALIZATION_FEATURE_NAME_CONSTANT = exports.EPD_SCSS_FILE_NAME = exports.EPD_VISUALIZATION_MODULE_NAME = exports.EPD_VISUALIZATION_FOLDER_NAME = void 0;
const constants_1 = require("../../constants");
const libs_constants_1 = require("../../libs-constants");
exports.EPD_VISUALIZATION_FOLDER_NAME = 'epd-visualization';
exports.EPD_VISUALIZATION_MODULE_NAME = 'EpdVisualization';
exports.EPD_SCSS_FILE_NAME = 'epd-visualization.scss';
exports.EPD_VISUALIZATION_FEATURE_NAME_CONSTANT = 'EPD_VISUALIZATION_FEATURE';
exports.EPD_VISUALIZATION_MODULE = 'EpdVisualizationModule';
exports.EPD_VISUALIZATION_ROOT_MODULE = 'EpdVisualizationRootModule';
exports.EPD_VISUALIZATION_TRANSLATIONS = 'epdVisualizationTranslations';
exports.EPD_VISUALIZATION_TRANSLATION_CHUNKS_CONFIG = 'epdVisualizationTranslationChunksConfig';
exports.EPD_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.EPD_VISUALIZATION_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_EPD_VISUALIZATION,
    },
    folderName: exports.EPD_VISUALIZATION_FOLDER_NAME,
    moduleName: exports.EPD_VISUALIZATION_MODULE_NAME,
    featureModule: {
        name: exports.EPD_VISUALIZATION_MODULE,
        importPath: libs_constants_1.SPARTACUS_EPD_VISUALIZATION,
    },
    rootModule: {
        name: exports.EPD_VISUALIZATION_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_EPD_VISUALIZATION_ROOT,
    },
    customConfig: buildCdsConfig,
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_EPD_VISUALIZATION_ROOT,
        namedImports: [exports.EPD_VISUALIZATION_FEATURE_NAME_CONSTANT],
    },
    i18n: {
        resources: exports.EPD_VISUALIZATION_TRANSLATIONS,
        chunks: exports.EPD_VISUALIZATION_TRANSLATION_CHUNKS_CONFIG,
        importPath: libs_constants_1.SPARTACUS_EPD_VISUALIZATION_ASSETS,
    },
    styles: {
        scssFileName: exports.EPD_SCSS_FILE_NAME,
        importStyle: libs_constants_1.SPARTACUS_EPD_VISUALIZATION,
    },
};
function buildCdsConfig(options) {
    return {
        providers: {
            import: [
                {
                    moduleSpecifier: libs_constants_1.SPARTACUS_EPD_VISUALIZATION_ROOT,
                    namedImports: [constants_1.EPD_VISUALIZATION_CONFIG],
                },
            ],
            content: `<${constants_1.EPD_VISUALIZATION_CONFIG}>{
        epdVisualization: {
          ui5: {
            bootstrapUrl: "https://sapui5.hana.ondemand.com/1.108.5/resources/sap-ui-core.js"
          },

          apis: {
            baseUrl: "${options.baseUrl || 'PLACEHOLDER_BASE_URL'}"
          }
        }
      }`,
        },
    };
}
//# sourceMappingURL=epd-schematics-config.js.map