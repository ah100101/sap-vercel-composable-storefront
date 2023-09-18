"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMARTEDIT_SCHEMATICS_CONFIG = exports.SPARTACUS_SMARTEDIT_ASSETS = exports.SMARTEDIT_FEATURE_NAME_CONSTANT = exports.SMARTEDIT_ROOT_MODULE = exports.SMARTEDIT_MODULE = exports.SMARTEDIT_MODULE_NAME = exports.SMARTEDIT_FOLDER_NAME = void 0;
const constants_1 = require("../constants");
const libs_constants_1 = require("../libs-constants");
exports.SMARTEDIT_FOLDER_NAME = 'smartedit';
exports.SMARTEDIT_MODULE_NAME = 'SmartEdit';
exports.SMARTEDIT_MODULE = 'SmartEditModule';
exports.SMARTEDIT_ROOT_MODULE = 'SmartEditRootModule';
exports.SMARTEDIT_FEATURE_NAME_CONSTANT = 'SMART_EDIT_FEATURE';
exports.SPARTACUS_SMARTEDIT_ASSETS = 'smartedit/assets';
exports.SMARTEDIT_SCHEMATICS_CONFIG = {
    library: {
        featureName: libs_constants_1.SMARTEDIT_FEATURE_NAME,
        mainScope: libs_constants_1.SPARTACUS_SMARTEDIT,
    },
    folderName: exports.SMARTEDIT_FOLDER_NAME,
    moduleName: exports.SMARTEDIT_MODULE_NAME,
    featureModule: {
        name: exports.SMARTEDIT_MODULE,
        importPath: libs_constants_1.SPARTACUS_SMARTEDIT,
    },
    rootModule: {
        name: exports.SMARTEDIT_ROOT_MODULE,
        importPath: libs_constants_1.SPARTACUS_SMARTEDIT_ROOT,
    },
    customConfig: buildSmartEditConfig,
    lazyLoadingChunk: {
        moduleSpecifier: libs_constants_1.SPARTACUS_SMARTEDIT_ROOT,
        namedImports: [exports.SMARTEDIT_FEATURE_NAME_CONSTANT],
    },
    assets: {
        input: exports.SPARTACUS_SMARTEDIT_ASSETS,
        glob: '**/*',
    },
};
function buildSmartEditConfig(options) {
    return {
        providers: {
            import: [
                {
                    moduleSpecifier: libs_constants_1.SPARTACUS_SMARTEDIT_ROOT,
                    namedImports: [constants_1.SMART_EDIT_CONFIG],
                },
            ],
            content: `<${constants_1.SMART_EDIT_CONFIG}>{
        smartEdit: {
          storefrontPreviewRoute: '${options.storefrontPreviewRoute ||
                'STOREFRONT_PREVIEW_ROUTE_PLACEHOLDER'}',
          allowOrigin: '${options.allowOrigin || 'ALLOWED_ORIGIN_PLACEHOLDER'}',
        },}`,
        },
    };
}
//# sourceMappingURL=smartedit-schematics-config.js.map