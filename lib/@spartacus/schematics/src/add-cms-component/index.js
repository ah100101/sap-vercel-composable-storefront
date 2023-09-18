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
exports.addCmsComponent = void 0;
var core_1 = require("@angular-devkit/core");
var schematics_1 = require("@angular-devkit/schematics");
var ast_utils_1 = require("@schematics/angular/utility/ast-utils");
var change_1 = require("@schematics/angular/utility/change");
var constants_1 = require("../shared/constants");
var libs_constants_1 = require("../shared/libs-constants");
var file_utils_1 = require("../shared/utils/file-utils");
var module_file_utils_1 = require("../shared/utils/module-file-utils");
var workspace_utils_1 = require("../shared/utils/workspace-utils");
function buildComponentModule(options) {
    var moduleName = options.module || '';
    return Boolean(options.declareCmsModule)
        ? options.declareCmsModule
        : moduleName;
}
function buildDeclaringCmsModule(options) {
    return Boolean(options.declareCmsModule)
        ? options.declareCmsModule
        : options.name;
}
function updateModule(options) {
    return function (tree, context) {
        var rawComponentModule = buildDeclaringCmsModule(options);
        var componentModule = "".concat(core_1.strings.dasherize(rawComponentModule), ".module.ts");
        var modulePath = (0, file_utils_1.getPathResultsForFile)(tree, componentModule, '/src')[0];
        if (!modulePath) {
            context.logger.error("Could not find the ".concat(modulePath));
            return;
        }
        var changes = [];
        var moduleTs = (0, file_utils_1.getTsSourceFile)(tree, modulePath);
        if (!(0, ast_utils_1.isImported)(moduleTs, constants_1.CONFIG_MODULE_CLASS, libs_constants_1.SPARTACUS_CORE)) {
            var insertImportChange = (0, ast_utils_1.insertImport)(moduleTs, modulePath, "".concat(constants_1.CONFIG_MODULE_CLASS), libs_constants_1.SPARTACUS_CORE, false);
            changes.push(insertImportChange);
        }
        if (!(0, ast_utils_1.isImported)(moduleTs, constants_1.CMS_CONFIG, libs_constants_1.SPARTACUS_CORE)) {
            var insertImportChange = (0, ast_utils_1.insertImport)(moduleTs, modulePath, "".concat(constants_1.CMS_CONFIG), libs_constants_1.SPARTACUS_CORE, false);
            changes.push(insertImportChange);
        }
        var componentName = "".concat(core_1.strings.classify(options.name)).concat(core_1.strings.classify(options.type));
        /*** updating the module's metadata start ***/
        var addToModuleImportsChanges = (0, module_file_utils_1.addToModuleImports)(tree, modulePath, "".concat(constants_1.CONFIG_MODULE_CLASS, ".withConfig(<").concat(constants_1.CMS_CONFIG, ">{\n      cmsComponents: {\n        ").concat(componentName, ": {\n          component: ").concat(componentName, ",\n        },\n      },\n    })"), moduleTs);
        changes.push.apply(changes, addToModuleImportsChanges);
        var addToModuleDeclarationsChanges = (0, module_file_utils_1.addToModuleDeclarations)(tree, modulePath, componentName, moduleTs);
        changes.push.apply(changes, addToModuleDeclarationsChanges);
        var addToModuleExportsChanges = (0, module_file_utils_1.addToModuleExports)(tree, modulePath, componentName, moduleTs);
        changes.push.apply(changes, addToModuleExportsChanges);
        /*** updating the module's metadata end ***/
        var componentImportSkipped = !Boolean(options.declareCmsModule);
        if (componentImportSkipped) {
            var componentFileName = "".concat(core_1.strings.dasherize(options.name), ".").concat(core_1.strings.dasherize(options.type), ".ts");
            var componentPath = (0, file_utils_1.getPathResultsForFile)(tree, componentFileName, '/src')[0];
            var componentRelativeImportPath = (0, module_file_utils_1.buildRelativePath)(modulePath, componentPath);
            var componentImport = (0, ast_utils_1.insertImport)(moduleTs, modulePath, componentName, (0, module_file_utils_1.stripTsFromImport)(componentRelativeImportPath), false);
            changes.push(componentImport);
        }
        (0, file_utils_1.commitChanges)(tree, modulePath, changes, file_utils_1.InsertDirection.RIGHT);
        context.logger.info("Updated ".concat(modulePath));
    };
}
function updateComponent(options) {
    return function (tree, _context) {
        if (!options.cmsComponentData) {
            return;
        }
        if (!options.cmsComponentDataModel) {
            throw new schematics_1.SchematicsException("\"cmsComponentDataModel\" can't be falsy");
        }
        var cmsComponentData = "".concat(constants_1.CMS_COMPONENT_DATA_CLASS, "<").concat(core_1.strings.classify(options.cmsComponentDataModel), ">");
        var componentFileName = "".concat(core_1.strings.dasherize(options.name), ".").concat(core_1.strings.dasherize(options.type), ".ts");
        var project = (0, workspace_utils_1.getProjectFromWorkspace)(tree, options);
        var componentPath = (0, file_utils_1.getPathResultsForFile)(tree, componentFileName, project.sourceRoot)[0];
        var changes = [];
        var componentTs = (0, file_utils_1.getTsSourceFile)(tree, componentPath);
        var nodes = (0, ast_utils_1.getSourceNodes)(componentTs);
        var constructorNode = (0, file_utils_1.findConstructor)(nodes);
        var injectionChange = (0, file_utils_1.injectService)({
            constructorNode: constructorNode,
            path: componentPath,
            serviceName: cmsComponentData,
            modifier: 'private',
            propertyName: constants_1.CMS_COMPONENT_DATA_PROPERTY_NAME
        });
        changes.push(injectionChange);
        var componentDataProperty = "  ".concat(constants_1.CMS_COMPONENT_DATA_PROPERTY_NAME, "$: Observable<").concat(core_1.strings.classify(options.cmsComponentDataModel), "> = this.").concat(constants_1.CMS_COMPONENT_DATA_PROPERTY_NAME, ".data$;");
        var componentDataPropertyChange = (0, file_utils_1.defineProperty)(nodes, componentPath, componentDataProperty);
        changes.push(componentDataPropertyChange);
        var cmsComponentImport = (0, ast_utils_1.insertImport)(componentTs, componentPath, core_1.strings.classify(options.cmsComponentDataModel), (0, module_file_utils_1.stripTsFromImport)(options.cmsComponentDataModelPath), false);
        changes.push(cmsComponentImport);
        var cmsComponentDataImport = (0, ast_utils_1.insertImport)(componentTs, componentPath, constants_1.CMS_COMPONENT_DATA_CLASS, libs_constants_1.SPARTACUS_STOREFRONTLIB, false);
        changes.push(cmsComponentDataImport);
        var observableImport = (0, ast_utils_1.insertImport)(componentTs, componentPath, constants_1.OBSERVABLE_CLASS, constants_1.RXJS, false);
        changes.push(observableImport);
        (0, file_utils_1.commitChanges)(tree, componentPath, changes, file_utils_1.InsertDirection.LEFT);
    };
}
function updateTemplate(options) {
    return function (tree, _context) {
        var componentFileName = "".concat(core_1.strings.dasherize(options.name), ".").concat(core_1.strings.dasherize(options.type), ".ts");
        var project = (0, workspace_utils_1.getProjectFromWorkspace)(tree, options);
        var componentPath = (0, file_utils_1.getPathResultsForFile)(tree, componentFileName, project.sourceRoot)[0];
        var componentTs = (0, file_utils_1.getTsSourceFile)(tree, componentPath);
        var templatePath = '';
        var templateContent = '';
        var startIndex;
        if (options.inlineTemplate) {
            templatePath = componentPath;
            var decorator = (0, ast_utils_1.getDecoratorMetadata)(componentTs, 'Component', constants_1.ANGULAR_CORE)[0];
            var inlineTemplate = (0, file_utils_1.getMetadataProperty)(decorator, 'template');
            templateContent = inlineTemplate.getText();
            startIndex = inlineTemplate.name.parent.end - 1;
        }
        else {
            var componentTemplateFileName = "".concat(core_1.strings.dasherize(options.name), ".").concat(core_1.strings.dasherize(options.type), ".html");
            templatePath = (0, file_utils_1.getPathResultsForFile)(tree, componentTemplateFileName, project.sourceRoot)[0];
            var buffer = tree.read(templatePath);
            templateContent = buffer ? buffer.toString(constants_1.UTF_8) : '';
            startIndex = templateContent.length;
        }
        if (Boolean(templateContent)) {
            var insertion = new change_1.InsertChange(templatePath, startIndex, "<ng-container *ngIf=\"".concat(constants_1.CMS_COMPONENT_DATA_PROPERTY_NAME, "$ | async as data\">{{data | json}}</ng-container>"));
            (0, file_utils_1.commitChanges)(tree, templatePath, [insertion], file_utils_1.InsertDirection.RIGHT);
        }
    };
}
function declareInModule(options) {
    return function (tree, context) {
        if (!(options.declareCmsModule && options.module)) {
            return;
        }
        var sourceCmsModule = (0, core_1.basename)(options.declareCmsModule);
        var sourceCmsModuleFileName = "".concat(core_1.strings.dasherize(sourceCmsModule), ".module.ts");
        var sourceCmsModulePath = (0, file_utils_1.getPathResultsForFile)(tree, sourceCmsModuleFileName, '/src')[0];
        if (!sourceCmsModulePath) {
            context.logger.error("Could not find the ".concat(sourceCmsModulePath));
            return;
        }
        var destinationModuleName = (0, core_1.basename)(options.module);
        var destinationFileName = "".concat(core_1.strings.dasherize(destinationModuleName), ".module.ts");
        var destinationModulePath = (0, file_utils_1.getPathResultsForFile)(tree, destinationFileName, '/src')[0];
        if (!destinationModulePath) {
            context.logger.error("Could not find the ".concat(destinationModulePath));
            return;
        }
        var sourceCmsModuleRelativeImportPath = (0, module_file_utils_1.buildRelativePath)(destinationModulePath, sourceCmsModulePath);
        var destinationModuleTs = (0, file_utils_1.getTsSourceFile)(tree, destinationModulePath);
        var sourceCmsModuleClassified = core_1.strings.classify(sourceCmsModule);
        var moduleFileImport = (0, ast_utils_1.insertImport)(destinationModuleTs, destinationModulePath, sourceCmsModuleClassified, (0, module_file_utils_1.stripTsFromImport)(sourceCmsModuleRelativeImportPath), false);
        var moduleImport = (0, module_file_utils_1.addToModuleImports)(tree, destinationModulePath, sourceCmsModuleClassified, destinationModuleTs);
        var changes = __spreadArray([moduleFileImport], moduleImport, true);
        (0, file_utils_1.commitChanges)(tree, destinationModulePath, changes, file_utils_1.InsertDirection.LEFT);
    };
}
function validateArguments(options) {
    if (options.cmsComponentData && !Boolean(options.cmsComponentDataModel)) {
        throw new schematics_1.SchematicsException('You have to specify the "cmsComponentDataModel" option.');
    }
}
function addCmsComponent(options) {
    return function (tree, context) {
        validateArguments(options);
        // angular's component CLI flags
        var declareCmsModule = options.declareCmsModule, exportOption = options["export"], componentName = options.name, changeDetection = options.changeDetection, flat = options.flat, inlineStyle = options.inlineStyle, inlineTemplate = options.inlineTemplate, prefix = options.prefix, project = options.project, selector = options.selector, skipSelector = options.skipSelector, type = options.type, skipTests = options.skipTests, style = options.style, viewEncapsulation = options.viewEncapsulation;
        var componentModule = buildComponentModule(options);
        // angular's module CLI flags
        var path = options.path, routing = options.routing, routingScope = options.routingScope, route = options.route, commonModule = options.commonModule, declaringModule = options.module;
        var createCmsModule = !Boolean(declareCmsModule);
        var skipImport = createCmsModule;
        var templateSource = (0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.applyTemplates)(__assign(__assign({}, core_1.strings), options)),
            (0, schematics_1.move)((0, core_1.normalize)("/".concat(options.path, "/").concat(core_1.strings.dasherize(options.name)))),
        ]);
        return (0, schematics_1.chain)([
            // we are creating a new module if the declared module is not provided
            createCmsModule
                ? (0, schematics_1.externalSchematic)(constants_1.ANGULAR_SCHEMATICS, 'module', {
                    project: project,
                    name: componentName,
                    path: path,
                    routing: routing,
                    routingScope: routingScope,
                    route: route,
                    commonModule: commonModule,
                    module: declaringModule
                })
                : (0, schematics_1.noop)(),
            (0, schematics_1.externalSchematic)(constants_1.ANGULAR_SCHEMATICS, 'component', {
                changeDetection: changeDetection,
                "export": exportOption,
                flat: flat,
                inlineStyle: inlineStyle,
                inlineTemplate: inlineTemplate,
                module: componentModule,
                name: componentName,
                prefix: prefix,
                project: project,
                selector: selector,
                skipSelector: skipSelector,
                type: type,
                skipTests: skipTests,
                style: style,
                viewEncapsulation: viewEncapsulation,
                skipImport: skipImport
            }),
            (0, schematics_1.mergeWith)(templateSource, schematics_1.MergeStrategy.Overwrite),
            updateModule(options),
            updateComponent(options),
            updateTemplate(options),
            !createCmsModule && declaringModule ? declareInModule(options) : (0, schematics_1.noop)(),
        ])(tree, context);
    };
}
exports.addCmsComponent = addCmsComponent;
//# sourceMappingURL=index.js.map