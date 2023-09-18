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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.addSSR = exports.modifyAppServerModuleFile = void 0;
var core_1 = require("@angular-devkit/core");
var schematics_1 = require("@angular-devkit/schematics");
var ast_utils_1 = require("@schematics/angular/utility/ast-utils");
var dependencies_1 = require("@schematics/angular/utility/dependencies");
var dependencies_json_1 = __importDefault(require("../dependencies.json"));
var constants_1 = require("../shared/constants");
var libs_constants_1 = require("../shared/libs-constants");
var file_utils_1 = require("../shared/utils/file-utils");
var html_utils_1 = require("../shared/utils/html-utils");
var lib_utils_1 = require("../shared/utils/lib-utils");
var module_file_utils_1 = require("../shared/utils/module-file-utils");
var package_utils_1 = require("../shared/utils/package-utils");
var DEPENDENCY_NAMES = [
    '@angular/platform-server',
    constants_1.NGUNIVERSAL_EXPRESS_ENGINE,
    'ts-loader',
];
function modifyAppServerModuleFile() {
    return function (tree, context) {
        var appServerModulePath = (0, file_utils_1.getPathResultsForFile)(tree, 'app.server.module.ts', '/src')[0];
        if (!appServerModulePath) {
            throw new schematics_1.SchematicsException("Project file \"app.server.module.ts\" not found.");
        }
        var importChange = (0, ast_utils_1.insertImport)((0, file_utils_1.getTsSourceFile)(tree, appServerModulePath), appServerModulePath, "provideServer", "@spartacus/setup/ssr", false);
        var providerChanges = (0, module_file_utils_1.addToModuleProviders)(tree, appServerModulePath, "\n     ...provideServer({\n        serverRequestOrigin: process.env['SERVER_REQUEST_ORIGIN'],\n      }),");
        var changes = __spreadArray([importChange], providerChanges, true);
        (0, file_utils_1.commitChanges)(tree, appServerModulePath, changes);
        context.logger.log('info', "\u2705\uFE0F Modified app.server.module.ts file.");
        return tree;
    };
}
exports.modifyAppServerModuleFile = modifyAppServerModuleFile;
function modifyIndexHtmlFile(options) {
    return function (tree) {
        var buffer = tree.read('src/index.html');
        if (buffer) {
            var indexContent = buffer.toString();
            if (!indexContent.includes('<meta name="occ-backend-base-url"')) {
                var projectIndexHtmlPath_1 = (0, file_utils_1.getIndexHtmlPath)(tree);
                var baseUrl = options.baseUrl || 'OCC_BACKEND_BASE_URL_VALUE';
                var metaTags = [
                    "<meta name=\"occ-backend-base-url\" content=\"".concat(baseUrl, "\" />"),
                ];
                metaTags.forEach(function (metaTag) {
                    (0, html_utils_1.appendHtmlElementToHead)(tree, projectIndexHtmlPath_1, metaTag);
                });
            }
        }
        return tree;
    };
}
function provideServerFile(options) {
    return (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
        (0, schematics_1.template)(__assign(__assign(__assign({}, core_1.strings), options), { typescriptExt: 'ts', browserDistDirectory: "dist/".concat(options.project, "/browser") })),
        (0, schematics_1.move)('.'),
    ]);
}
function prepareDependencies() {
    var spartacusVersion = (0, package_utils_1.getPrefixedSpartacusSchematicsVersion)();
    var spartacusDependencies = [];
    spartacusDependencies.push({
        type: dependencies_1.NodeDependencyType.Default,
        version: spartacusVersion,
        name: libs_constants_1.SPARTACUS_SETUP
    });
    var thirdPartyDependencies = [];
    for (var _i = 0, DEPENDENCY_NAMES_1 = DEPENDENCY_NAMES; _i < DEPENDENCY_NAMES_1.length; _i++) {
        var dependencyName = DEPENDENCY_NAMES_1[_i];
        thirdPartyDependencies.push({
            type: dependencies_1.NodeDependencyType.Default,
            version: dependencies_json_1["default"].storefrontapp[dependencyName],
            name: dependencyName
        });
    }
    return spartacusDependencies.concat(thirdPartyDependencies);
}
function addSSR(options) {
    return function (tree, context) {
        var serverTemplate = provideServerFile(options);
        var packageJson = (0, package_utils_1.readPackageJson)(tree);
        return (0, schematics_1.chain)([
            (0, lib_utils_1.addPackageJsonDependencies)(prepareDependencies(), packageJson),
            (0, schematics_1.externalSchematic)(constants_1.NGUNIVERSAL_EXPRESS_ENGINE, 'ng-add', {
                project: options.project
            }),
            modifyAppServerModuleFile(),
            modifyIndexHtmlFile(options),
            (0, schematics_1.branchAndMerge)((0, schematics_1.chain)([(0, schematics_1.mergeWith)(serverTemplate, schematics_1.MergeStrategy.Overwrite)]), schematics_1.MergeStrategy.Overwrite),
            (0, lib_utils_1.installPackageJsonDependencies)(),
        ])(tree, context);
    };
}
exports.addSSR = addSSR;
//# sourceMappingURL=index.js.map