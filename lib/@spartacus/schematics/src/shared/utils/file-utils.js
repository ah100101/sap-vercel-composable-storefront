"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerTsPath = exports.getLineFromTSFile = exports.getMetadataProperty = exports.findMultiLevelNodesByTextAndKind = exports.renameIdentifierNode = exports.insertCommentAboveImportIdentifier = exports.insertCommentAboveIdentifier = exports.insertCommentAboveConfigProperty = exports.buildSpartacusComment = exports.injectService = exports.removeImport = exports.removeInjectImports = exports.shouldRemoveDecorator = exports.removeConstructorParam = exports.addConstructorParam = exports.isInheriting = exports.isCandidateForConstructorDeprecation = exports.defineProperty = exports.findConstructor = exports.commitChanges = exports.insertHtmlComment = exports.insertComponentSelectorComment = exports.getHtmlFiles = exports.getPathResultsForFile = exports.getIndexHtmlPath = exports.getAllTsSourceFiles = exports.getTsSourceFile = exports.InsertDirection = void 0;
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("@schematics/angular/utility/change");
const typescript_1 = __importDefault(require("typescript"));
const constants_1 = require("../constants");
const workspace_utils_1 = require("./workspace-utils");
var InsertDirection;
(function (InsertDirection) {
    InsertDirection[InsertDirection["LEFT"] = 0] = "LEFT";
    InsertDirection[InsertDirection["RIGHT"] = 1] = "RIGHT";
})(InsertDirection = exports.InsertDirection || (exports.InsertDirection = {}));
function getTsSourceFile(tree, path) {
    const buffer = tree.read(path);
    if (!buffer) {
        throw new schematics_1.SchematicsException(`Could not read file (${path}).`);
    }
    const content = buffer.toString(constants_1.UTF_8);
    const source = typescript_1.default.createSourceFile(path, content, typescript_1.default.ScriptTarget.Latest, true);
    return source;
}
exports.getTsSourceFile = getTsSourceFile;
function getAllTsSourceFiles(tree, basePath) {
    const results = [];
    tree.getDir(basePath).visit((filePath) => {
        if (filePath.endsWith('.ts')) {
            results.push(filePath);
        }
    });
    return results.map((f) => getTsSourceFile(tree, f));
}
exports.getAllTsSourceFiles = getAllTsSourceFiles;
function getIndexHtmlPath(tree) {
    var _a, _b, _c, _d;
    const projectName = (0, workspace_utils_1.getDefaultProjectNameFromWorkspace)(tree);
    const angularJson = (0, workspace_utils_1.getAngularJsonFile)(tree);
    const indexHtml = (_d = (_c = (_b = (_a = angularJson.projects[projectName]) === null || _a === void 0 ? void 0 : _a.architect) === null || _b === void 0 ? void 0 : _b.build) === null || _c === void 0 ? void 0 : _c.options) === null || _d === void 0 ? void 0 : _d.index;
    if (!indexHtml) {
        throw new schematics_1.SchematicsException('"index.html" file not found.');
    }
    return indexHtml;
}
exports.getIndexHtmlPath = getIndexHtmlPath;
function getPathResultsForFile(tree, file, directory) {
    const results = [];
    const dir = directory || '/';
    tree.getDir(dir).visit((filePath) => {
        if (filePath.endsWith(file)) {
            results.push(filePath);
        }
    });
    return results;
}
exports.getPathResultsForFile = getPathResultsForFile;
function getHtmlFiles(tree, fileName = '.html', directory) {
    return getPathResultsForFile(tree, fileName || '.html', directory);
}
exports.getHtmlFiles = getHtmlFiles;
function insertComponentSelectorComment(content, componentSelector, componentProperty) {
    const selector = buildSelector(componentSelector);
    const comment = buildHtmlComment(componentProperty.comment);
    let index = 0;
    let newContent = content;
    while (true) {
        index = getTextPosition(newContent, selector, index);
        if (index == null) {
            break;
        }
        newContent = newContent.slice(0, index) + comment + newContent.slice(index);
        index += comment.length + componentSelector.length;
    }
    return newContent;
}
exports.insertComponentSelectorComment = insertComponentSelectorComment;
function getTextPosition(content, text, startingPosition = 0) {
    const index = content.indexOf(text, startingPosition);
    return index !== -1 ? index : undefined;
}
function buildSelector(selector) {
    return `<${selector}`;
}
function visitHtmlNodesRecursively(angularCompiler, nodes, propertyName, resultingElements = [], parentElement) {
    const { Attribute, Element } = angularCompiler;
    nodes.forEach((node) => {
        if (node instanceof Attribute && parentElement) {
            if (node.name.includes(propertyName) ||
                node.value.includes(propertyName)) {
                resultingElements.push(parentElement);
            }
        }
        if (node instanceof Element) {
            visitHtmlNodesRecursively(angularCompiler, node.attrs, propertyName, resultingElements, node);
            visitHtmlNodesRecursively(angularCompiler, node.children, propertyName, resultingElements, node);
        }
    });
}
function insertHtmlComment(content, componentProperty, angularCompiler) {
    const { HtmlParser } = angularCompiler;
    const comment = buildHtmlComment(componentProperty.comment);
    const result = new HtmlParser().parse(content, '');
    const resultingElements = [];
    visitHtmlNodesRecursively(angularCompiler, result.rootNodes, componentProperty.name, resultingElements);
    resultingElements
        .map((node) => node.sourceSpan.start.line)
        .forEach((line, i) => {
        const split = content.split('\n');
        split.splice(line + i, 0, comment);
        content = split.join('\n');
    });
    return content;
}
exports.insertHtmlComment = insertHtmlComment;
function buildHtmlComment(commentText) {
    return `<!-- ${constants_1.TODO_SPARTACUS} ${commentText} -->`;
}
function commitChanges(host, path, changes, insertDirection = InsertDirection.RIGHT) {
    if (!changes || changes.length === 0) {
        return;
    }
    const recorder = host.beginUpdate(path);
    changes.forEach((change) => {
        if (change instanceof change_1.InsertChange) {
            const pos = change.pos;
            const toAdd = change.toAdd;
            if (insertDirection === InsertDirection.LEFT) {
                recorder.insertLeft(pos, toAdd);
            }
            else {
                recorder.insertRight(pos, toAdd);
            }
        }
        else if (change instanceof change_1.RemoveChange) {
            const pos = change['pos'];
            const length = change['toRemove'].length;
            recorder.remove(pos, length);
        }
        else if (change instanceof change_1.NoopChange) {
            // nothing to do here...
        }
        else {
            const pos = change['pos'];
            const oldText = change['oldText'];
            const newText = change['newText'];
            recorder.remove(pos, oldText.length);
            if (insertDirection === InsertDirection.LEFT) {
                recorder.insertLeft(pos, newText);
            }
            else {
                recorder.insertRight(pos, newText);
            }
        }
    });
    host.commitUpdate(recorder);
}
exports.commitChanges = commitChanges;
function findConstructor(nodes) {
    return nodes.find((n) => n.kind === typescript_1.default.SyntaxKind.Constructor);
}
exports.findConstructor = findConstructor;
function defineProperty(nodes, path, toAdd) {
    const constructorNode = findConstructor(nodes);
    if (!constructorNode) {
        throw new schematics_1.SchematicsException(`No constructor found in ${path}.`);
    }
    return new change_1.InsertChange(path, constructorNode.pos + 1, toAdd);
}
exports.defineProperty = defineProperty;
/**
 *
 * Method performs the following checks on the provided `source` file:
 * - is the file inheriting the provided `constructorDeprecation.class`
 * - is the `constructorDeprecation.class` imported from the specified `constructorDeprecation.importPath`
 * - is the file importing all the provided `parameterClassTypes` from the expected import path
 * - does the provided file contain a constructor
 * - does the `super()` call exist in the constructor
 * - does the param number passed to `super()` match the expected number
 * - does the order and the type of the constructor parameters match the expected `parameterClassTypes`
 *
 * If only once condition is not satisfied, the method returns `false`. Otherwise, it returns `true`.
 *
 * @param source a ts source file
 * @param inheritedClass a class which customers might have extended
 * @param parameterClassTypes a list of parameter class types. Must be provided in the order in which they appear in the deprecated constructor.
 */
function isCandidateForConstructorDeprecation(source, constructorDeprecation) {
    const nodes = (0, ast_utils_1.getSourceNodes)(source);
    if (!isInheriting(nodes, constructorDeprecation.class)) {
        return false;
    }
    if (!(0, ast_utils_1.isImported)(source, constructorDeprecation.class, constructorDeprecation.importPath)) {
        return false;
    }
    if (!checkImports(source, constructorDeprecation.deprecatedParams)) {
        return false;
    }
    const constructorNode = findConstructor(nodes);
    if (!constructorNode) {
        return false;
    }
    if (!checkConstructorParameters(constructorNode, constructorDeprecation.deprecatedParams)) {
        return false;
    }
    if (!checkSuper(constructorNode, constructorDeprecation.deprecatedParams)) {
        return false;
    }
    return true;
}
exports.isCandidateForConstructorDeprecation = isCandidateForConstructorDeprecation;
function isInheriting(nodes, inheritedClass) {
    const heritageClauseNodes = nodes.filter((node) => node.kind === typescript_1.default.SyntaxKind.HeritageClause);
    const heritageNodes = findMultiLevelNodesByTextAndKind(heritageClauseNodes, inheritedClass, typescript_1.default.SyntaxKind.Identifier);
    return heritageNodes.length !== 0;
}
exports.isInheriting = isInheriting;
function checkImports(source, parameterClassTypes) {
    for (const classImport of parameterClassTypes) {
        if (classImport.importPath &&
            !(0, ast_utils_1.isImported)(source, classImport.className, classImport.importPath)) {
            return false;
        }
    }
    return true;
}
function checkConstructorParameters(constructorNode, parameterClassTypes) {
    const constructorParameters = (0, ast_utils_1.findNodes)(constructorNode, typescript_1.default.SyntaxKind.Parameter);
    const foundClassTypes = [];
    for (const parameterClassType of parameterClassTypes) {
        for (const constructorParameter of constructorParameters) {
            const constructorParameterType = (0, ast_utils_1.findNodes)(constructorParameter, typescript_1.default.SyntaxKind.Identifier).filter((node) => node.getText() === parameterClassType.className);
            if (constructorParameterType.length !== 0) {
                foundClassTypes.push(parameterClassType);
                /*
                the break is needed to cope with multiple parameters of one type,
                e.g. constructor migrations for
               constructor(
                  protected cartStore: Store<StateWithMultiCart>,
                  protected store: Store<StateWithConfigurator>,
                  protected configuratorUtilsService: ConfiguratorUtilsService
                ) {}    */
                break;
            }
        }
    }
    return foundClassTypes.length === parameterClassTypes.length;
}
function isInjected(constructorNode, parameterClassType) {
    const constructorParameters = (0, ast_utils_1.findNodes)(constructorNode, typescript_1.default.SyntaxKind.Parameter);
    for (const constructorParameter of constructorParameters) {
        const constructorParameterType = (0, ast_utils_1.findNodes)(constructorParameter, typescript_1.default.SyntaxKind.Identifier).filter((node) => node.getText() === parameterClassType.className);
        if (constructorParameterType.length > 0) {
            return true;
        }
    }
    return false;
}
function checkSuper(constructorNode, parameterClassTypes) {
    const constructorBlock = (0, ast_utils_1.findNodes)(constructorNode, typescript_1.default.SyntaxKind.Block)[0];
    const callExpressions = (0, ast_utils_1.findNodes)(constructorBlock, typescript_1.default.SyntaxKind.CallExpression);
    if (callExpressions.length === 0) {
        return false;
    }
    // super has to be the first expression in constructor
    const firstCallExpression = callExpressions[0];
    const superKeyword = (0, ast_utils_1.findNodes)(firstCallExpression, typescript_1.default.SyntaxKind.SuperKeyword);
    if (superKeyword && superKeyword.length === 0) {
        return false;
    }
    const params = (0, ast_utils_1.findNodes)(firstCallExpression, typescript_1.default.SyntaxKind.Identifier);
    if (params.length !== parameterClassTypes.length) {
        return false;
    }
    return true;
}
function addConstructorParam(source, sourcePath, constructorNode, paramToAdd) {
    var _a, _b, _c;
    if (!constructorNode) {
        throw new schematics_1.SchematicsException(`No constructor found in ${sourcePath}.`);
    }
    const changes = [];
    if (!isInjected(constructorNode, paramToAdd)) {
        changes.push(injectService({
            constructorNode,
            path: sourcePath,
            serviceName: paramToAdd.className,
            modifier: 'no-modifier',
            propertyType: paramToAdd.literalInference,
            injectionToken: (_a = paramToAdd.injectionToken) === null || _a === void 0 ? void 0 : _a.token,
            isArray: (_b = paramToAdd.injectionToken) === null || _b === void 0 ? void 0 : _b.isArray,
        }));
    }
    if (paramToAdd.importPath &&
        !(0, ast_utils_1.isImported)(source, paramToAdd.className, paramToAdd.importPath)) {
        changes.push((0, ast_utils_1.insertImport)(source, sourcePath, paramToAdd.className, paramToAdd.importPath));
    }
    if ((_c = paramToAdd.injectionToken) === null || _c === void 0 ? void 0 : _c.token) {
        if (!(0, ast_utils_1.isImported)(source, constants_1.INJECT_DECORATOR, constants_1.ANGULAR_CORE)) {
            changes.push((0, ast_utils_1.insertImport)(source, sourcePath, constants_1.INJECT_DECORATOR, constants_1.ANGULAR_CORE));
        }
        /**
         * This is for the case when an injection token is the same as the import's type.
         * In this case we don't want to add two imports.
         * Ex: `@Inject(LaunchRenderStrategy) launchRenderStrategy: LaunchRenderStrategy[]`
         */
        if (paramToAdd.injectionToken.importPath &&
            paramToAdd.injectionToken.token !== paramToAdd.className &&
            !(0, ast_utils_1.isImported)(source, paramToAdd.injectionToken.token, paramToAdd.injectionToken.importPath)) {
            changes.push((0, ast_utils_1.insertImport)(source, sourcePath, paramToAdd.injectionToken.token, paramToAdd.injectionToken.importPath));
        }
    }
    const paramName = getParamName(source, constructorNode, paramToAdd);
    changes.push(updateConstructorSuperNode(sourcePath, constructorNode, paramName || paramToAdd.className));
    return changes;
}
exports.addConstructorParam = addConstructorParam;
function removeConstructorParam(source, sourcePath, constructorNode, paramToRemove) {
    if (!constructorNode) {
        throw new schematics_1.SchematicsException(`No constructor found in ${sourcePath}.`);
    }
    const changes = [];
    if (shouldRemoveImportAndParam(source, paramToRemove)) {
        const importRemovalChange = removeImport(source, paramToRemove);
        const injectImportRemovalChange = removeInjectImports(source, constructorNode, paramToRemove);
        const constructorParamRemovalChanges = removeConstructorParamInternal(sourcePath, constructorNode, paramToRemove);
        changes.push(importRemovalChange, ...constructorParamRemovalChanges, ...injectImportRemovalChange);
    }
    const paramName = getParamName(source, constructorNode, paramToRemove);
    if (!paramName) {
        return [new change_1.NoopChange()];
    }
    const superRemoval = removeParamFromSuper(sourcePath, constructorNode, paramName);
    changes.push(...superRemoval);
    return changes;
}
exports.removeConstructorParam = removeConstructorParam;
function shouldRemoveDecorator(constructorNode, decoratorIdentifier) {
    const decoratorParameters = (0, ast_utils_1.findNodes)(constructorNode, typescript_1.default.SyntaxKind.Decorator).filter((x) => x.getText().includes(decoratorIdentifier));
    // if there are 0, or exactly 1 usage of the `decoratorIdentifier` in the whole class, we can safely remove it.
    return decoratorParameters.length < 2;
}
exports.shouldRemoveDecorator = shouldRemoveDecorator;
function getParamName(source, constructorNode, classType) {
    const nodes = (0, ast_utils_1.getSourceNodes)(source);
    const constructorParameters = (0, ast_utils_1.findNodes)(constructorNode, typescript_1.default.SyntaxKind.Parameter);
    const classDeclarationNode = nodes.find((node) => node.kind === typescript_1.default.SyntaxKind.ClassDeclaration);
    if (!classDeclarationNode) {
        return undefined;
    }
    for (const constructorParameter of constructorParameters) {
        if (getClassName(constructorParameter) === classType.className) {
            const paramVariableNode = constructorParameter
                .getChildren()
                .find((node) => node.kind === typescript_1.default.SyntaxKind.Identifier);
            const paramName = paramVariableNode
                ? paramVariableNode.getText()
                : undefined;
            return paramName;
        }
    }
    return undefined;
}
function getClassName(constructorParameter) {
    var _a;
    const identifierNode = (_a = constructorParameter
        .getChildren()
        .find((node) => node.kind === typescript_1.default.SyntaxKind.TypeReference)) === null || _a === void 0 ? void 0 : _a.getChildren().find((node) => node.kind === typescript_1.default.SyntaxKind.Identifier);
    return identifierNode ? identifierNode.getText() : undefined;
}
function shouldRemoveImportAndParam(source, importToRemove) {
    const nodes = (0, ast_utils_1.getSourceNodes)(source);
    const constructorNode = findConstructor(nodes);
    if (!constructorNode) {
        return true;
    }
    const classDeclarationNode = nodes.find((node) => node.kind === typescript_1.default.SyntaxKind.ClassDeclaration);
    if (!classDeclarationNode) {
        return true;
    }
    const constructorParameters = getConstructorParameterList(constructorNode);
    for (const constructorParameter of constructorParameters) {
        if (constructorParameter.getText().includes(importToRemove.className)) {
            const paramVariableNode = constructorParameter
                .getChildren()
                .find((node) => node.kind === typescript_1.default.SyntaxKind.Identifier);
            const paramName = paramVariableNode ? paramVariableNode.getText() : '';
            const paramUsages = (0, ast_utils_1.findNodes)(classDeclarationNode, typescript_1.default.SyntaxKind.Identifier).filter((node) => node.getText() === paramName);
            // if there are more than two usages (injection and passing to super), then the param is used elsewhere in the class
            if (paramUsages.length > 2) {
                return false;
            }
            return true;
        }
    }
    return true;
}
function removeInjectImports(source, constructorNode, paramToRemove) {
    if (!paramToRemove.injectionToken) {
        return [new change_1.NoopChange()];
    }
    const importRemovalChange = [];
    if (shouldRemoveDecorator(constructorNode, constants_1.INJECT_DECORATOR)) {
        importRemovalChange.push(removeImport(source, {
            className: constants_1.INJECT_DECORATOR,
            importPath: constants_1.ANGULAR_CORE,
        }));
    }
    /**
     * This is for the case when an injection token is the same as the import's type.
     * In this case we don't want to have two import removal changes.
     * Ex: `@Inject(LaunchRenderStrategy) launchRenderStrategy: LaunchRenderStrategy[]`
     */
    if (paramToRemove.injectionToken.importPath &&
        paramToRemove.injectionToken.token !== paramToRemove.className) {
        importRemovalChange.push(removeImport(source, {
            className: paramToRemove.injectionToken.token,
            importPath: paramToRemove.injectionToken.importPath,
        }));
    }
    return importRemovalChange;
}
exports.removeInjectImports = removeInjectImports;
function removeImport(source, importToRemove) {
    const importDeclarationNode = getImportDeclarationNode(source, importToRemove);
    if (!importDeclarationNode) {
        return new change_1.NoopChange();
    }
    let position;
    let toRemove = importToRemove.className;
    const importSpecifierNodes = (0, ast_utils_1.findNodes)(importDeclarationNode, typescript_1.default.SyntaxKind.ImportSpecifier);
    if (importSpecifierNodes.length === 1) {
        // delete the whole import line
        position = importDeclarationNode.getStart();
        toRemove = importDeclarationNode.getText();
    }
    else {
        // delete only the specified import, and leave the rest
        const importSpecifier = importSpecifierNodes
            .map((node, i) => {
            const importNode = (0, ast_utils_1.findNode)(node, typescript_1.default.SyntaxKind.Identifier, importToRemove.className);
            return {
                importNode,
                i,
            };
        })
            .filter((result) => result.importNode)[0];
        if (!importSpecifier.importNode) {
            return new change_1.NoopChange();
        }
        // in case the import that needs to be removed is in the middle, we need to remove the ',' that follows the found import
        if (importSpecifier.i !== importSpecifierNodes.length - 1) {
            toRemove += ',';
        }
        position = importSpecifier.importNode.getStart();
    }
    return new change_1.RemoveChange(source.fileName, position, toRemove);
}
exports.removeImport = removeImport;
function getImportDeclarationNode(source, importToCheck) {
    if (!importToCheck.importPath) {
        return undefined;
    }
    // collect al the import declarations
    const importDeclarationNodes = getImportDeclarations(source, importToCheck.importPath);
    if (importDeclarationNodes.length === 0) {
        return undefined;
    }
    // find the one that contains the specified `importToCheck.className`
    let importDeclarationNode = importDeclarationNodes[0];
    for (const currentImportDeclaration of importDeclarationNodes) {
        const importIdentifiers = (0, ast_utils_1.findNodes)(currentImportDeclaration, typescript_1.default.SyntaxKind.Identifier);
        const found = importIdentifiers.find((node) => node.getText() === importToCheck.className);
        if (found) {
            importDeclarationNode = currentImportDeclaration;
            break;
        }
    }
    return importDeclarationNode;
}
function getConstructorParameterList(constructorNode) {
    const syntaxList = constructorNode
        .getChildren()
        .filter((node) => node.kind === typescript_1.default.SyntaxKind.SyntaxList)[0];
    return (0, ast_utils_1.findNodes)(syntaxList, typescript_1.default.SyntaxKind.Parameter);
}
function removeConstructorParamInternal(sourcePath, constructorNode, importToRemove) {
    const constructorParameters = getConstructorParameterList(constructorNode);
    for (let i = 0; i < constructorParameters.length; i++) {
        const constructorParameter = constructorParameters[i];
        if (constructorParameter.getText().includes(importToRemove.className)) {
            const changes = [];
            // if it's not the first parameter that should be removed, we should remove the comma after the previous parameter
            if (i !== 0) {
                const previousParameter = constructorParameters[i - 1];
                changes.push(new change_1.RemoveChange(sourcePath, previousParameter.end, ','));
                // if removing the first param, cleanup the comma after it
            }
            else if (i === 0 && constructorParameters.length > 1) {
                const commas = (0, ast_utils_1.findNodes)(constructorNode, typescript_1.default.SyntaxKind.CommaToken);
                // get the comma that matches the constructor parameter's position
                const comma = commas[i];
                changes.push(new change_1.RemoveChange(sourcePath, comma.getStart(), ','));
            }
            changes.push(new change_1.RemoveChange(sourcePath, constructorParameter.getStart(), constructorParameter.getText()));
            return changes;
        }
    }
    return [];
}
function removeParamFromSuper(sourcePath, constructorNode, paramName) {
    const constructorBlock = (0, ast_utils_1.findNodes)(constructorNode, typescript_1.default.SyntaxKind.Block)[0];
    const callExpressions = (0, ast_utils_1.findNodes)(constructorBlock, typescript_1.default.SyntaxKind.CallExpression);
    if (callExpressions.length === 0) {
        throw new schematics_1.SchematicsException('No super() call found.');
    }
    const changes = [];
    // `super()` has to be the first expression in constructor
    const firstCallExpression = callExpressions[0];
    const params = (0, ast_utils_1.findNodes)(firstCallExpression, typescript_1.default.SyntaxKind.Identifier);
    const commas = (0, ast_utils_1.findNodes)(firstCallExpression, typescript_1.default.SyntaxKind.CommaToken);
    for (let i = 0; i < params.length; i++) {
        const param = params[i];
        if (param.getText() === paramName) {
            if (i !== 0) {
                const previousCommaPosition = commas[i - 1].getStart();
                changes.push(new change_1.RemoveChange(sourcePath, previousCommaPosition, ','));
                // if removing the first param, cleanup the comma after it
            }
            else if (i === 0 && params.length > 0) {
                // get the comma that matches the constructor parameter's position
                const comma = commas[i];
                changes.push(new change_1.RemoveChange(sourcePath, comma.getStart(), ','));
            }
            changes.push(new change_1.RemoveChange(sourcePath, param.getStart(), paramName));
            break;
        }
    }
    return changes;
}
function updateConstructorSuperNode(sourcePath, constructorNode, propertyName) {
    const callBlock = (0, ast_utils_1.findNodes)(constructorNode, typescript_1.default.SyntaxKind.Block);
    propertyName = core_1.strings.camelize(propertyName);
    if (callBlock.length === 0) {
        throw new schematics_1.SchematicsException('No constructor body found.');
    }
    const callExpression = (0, ast_utils_1.findNodes)(callBlock[0], typescript_1.default.SyntaxKind.CallExpression);
    // super has to be the first expression in constructor
    const firstCallExpression = callExpression[0];
    const superKeyword = (0, ast_utils_1.findNodes)(firstCallExpression, typescript_1.default.SyntaxKind.SuperKeyword);
    if (superKeyword && superKeyword.length === 0) {
        throw new schematics_1.SchematicsException('No super() call found.');
    }
    let toInsert = '';
    let position;
    const params = (0, ast_utils_1.findNodes)(firstCallExpression, typescript_1.default.SyntaxKind.Identifier);
    // just an empty super() call, without any params passed to it
    if (params.length === 0) {
        position = superKeyword[0].end + 1;
    }
    else {
        const lastParam = params[params.length - 1];
        toInsert += ', ';
        position = lastParam.end;
    }
    toInsert += propertyName;
    return new change_1.InsertChange(sourcePath, position, toInsert);
}
function injectService(config) {
    var _a;
    if (!config.constructorNode) {
        throw new schematics_1.SchematicsException(`No constructor found in ${config.path}.`);
    }
    const constructorParameters = getConstructorParameterList(config.constructorNode);
    let toInsert = '';
    let position = config.constructorNode.getStart() + 'constructor('.length;
    if (constructorParameters.length > 0) {
        toInsert += ', ';
        const lastParam = constructorParameters[constructorParameters.length - 1];
        position = lastParam.end;
    }
    config.propertyName = config.propertyName
        ? core_1.strings.camelize(config.propertyName)
        : core_1.strings.camelize(config.serviceName);
    config.propertyType =
        (_a = config.propertyType) !== null && _a !== void 0 ? _a : core_1.strings.classify(config.serviceName);
    if (config.injectionToken) {
        toInsert += `@Inject(${config.injectionToken}) `;
    }
    if (config.modifier !== 'no-modifier') {
        toInsert += `${config.modifier} `;
    }
    toInsert += `${config.propertyName}: ${config.propertyType}`;
    if (config.isArray) {
        toInsert += '[]';
    }
    return new change_1.InsertChange(config.path, position, toInsert);
}
exports.injectService = injectService;
function buildSpartacusComment(comment) {
    return `// ${constants_1.TODO_SPARTACUS} ${comment}\n`;
}
exports.buildSpartacusComment = buildSpartacusComment;
function insertCommentAboveConfigProperty(sourcePath, source, identifierName, comment) {
    const identifierNodes = new Set();
    (0, ast_utils_1.getSourceNodes)(source)
        .filter((node) => node.kind === typescript_1.default.SyntaxKind.ObjectLiteralExpression)
        .forEach((objectLiteralNode) => (0, ast_utils_1.findNodes)(objectLiteralNode, typescript_1.default.SyntaxKind.Identifier)
        .filter((node) => node.getText() === identifierName)
        .forEach((idNode) => identifierNodes.add(idNode)));
    const changes = [];
    identifierNodes.forEach((n) => changes.push(new change_1.InsertChange(sourcePath, getLineStartFromTSFile(source, n.getStart()), `${comment}`)));
    return changes;
}
exports.insertCommentAboveConfigProperty = insertCommentAboveConfigProperty;
function insertCommentAboveIdentifier(sourcePath, source, identifierName, comment, identifierType = typescript_1.default.SyntaxKind.Identifier) {
    const changes = [];
    (0, ast_utils_1.getSourceNodes)(source).forEach((node) => {
        if (node.kind !== typescript_1.default.SyntaxKind.ClassDeclaration) {
            return;
        }
        const identifierNodes = (0, ast_utils_1.findNodes)(node, identifierType).filter((identifierNode) => identifierNode.getText() === identifierName);
        identifierNodes.forEach((n) => changes.push(new change_1.InsertChange(sourcePath, getLineStartFromTSFile(source, n.getStart()), `${comment}`)));
    });
    return changes;
}
exports.insertCommentAboveIdentifier = insertCommentAboveIdentifier;
function getImportDeclarations(source, importPath) {
    const imports = (0, ast_utils_1.getSourceNodes)(source).filter((node) => node.kind === typescript_1.default.SyntaxKind.ImportDeclaration);
    return imports.filter((imp) => imp.moduleSpecifier
        .getText()
        .includes(importPath));
}
function filterNamespacedImports(imports) {
    return imports
        .filter((imp) => { var _a, _b; return (_b = (_a = imp.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings) === null || _b === void 0 ? void 0 : _b.name; })
        .filter(Boolean);
}
function filterNamedImports(imports) {
    return imports
        .filter((imp) => { var _a, _b; return (_b = (_a = imp.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings) === null || _b === void 0 ? void 0 : _b.elements; })
        .filter(Boolean);
}
function insertCommentAboveImportIdentifier(sourcePath, source, identifierName, importPath, comment) {
    const imports = getImportDeclarations(source, importPath);
    const namedImports = filterNamedImports(imports);
    const namespacedImports = filterNamespacedImports(imports);
    const namespacedIdentifiers = namespacedImports
        .map((imp) => { var _a, _b, _c; return (_c = (_b = (_a = imp.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings) === null || _b === void 0 ? void 0 : _b.name) === null || _c === void 0 ? void 0 : _c.escapedText; })
        .filter(Boolean);
    const namedImportsWithIdentifierName = namedImports.filter((imp) => (0, ast_utils_1.findNodes)(imp, typescript_1.default.SyntaxKind.ImportSpecifier).find((node) => node.name.escapedText === identifierName));
    const propertyAccessExpressions = (0, ast_utils_1.getSourceNodes)(source).filter((node) => node.kind === typescript_1.default.SyntaxKind.PropertyAccessExpression);
    const accessPropertiesToIdentifierName = propertyAccessExpressions
        .filter((member) => { var _a; return namespacedIdentifiers.includes((_a = member === null || member === void 0 ? void 0 : member.expression) === null || _a === void 0 ? void 0 : _a.escapedText); })
        .filter((member) => { var _a; return identifierName === ((_a = member === null || member === void 0 ? void 0 : member.name) === null || _a === void 0 ? void 0 : _a.escapedText); })
        .filter(Boolean);
    const changes = [];
    namedImportsWithIdentifierName.forEach((n) => changes.push(new change_1.InsertChange(sourcePath, getLineStartFromTSFile(source, n.getStart()), comment)));
    accessPropertiesToIdentifierName.forEach((n) => changes.push(new change_1.InsertChange(sourcePath, getLineStartFromTSFile(source, n.getStart()), comment)));
    return changes;
}
exports.insertCommentAboveImportIdentifier = insertCommentAboveImportIdentifier;
function renameIdentifierNode(sourcePath, source, oldName, newName) {
    const identifierNodes = findLevel1NodesInSourceByTextAndKind(source, oldName, typescript_1.default.SyntaxKind.Identifier);
    const changes = [];
    identifierNodes.forEach((n) => changes.push(new change_1.ReplaceChange(sourcePath, n.getStart(), oldName, newName)));
    return changes;
}
exports.renameIdentifierNode = renameIdentifierNode;
function findLevel1NodesInSourceByTextAndKind(source, text, syntaxKind) {
    const nodes = (0, ast_utils_1.getSourceNodes)(source);
    return findLevel1NodesByTextAndKind(nodes, text, syntaxKind);
}
function findLevel1NodesByTextAndKind(nodes, text, syntaxKind) {
    return nodes
        .filter((n) => n.kind === syntaxKind)
        .filter((n) => n.getText() === text);
}
function findMultiLevelNodesByTextAndKind(nodes, text, syntaxKind) {
    const result = [];
    for (const node of nodes) {
        result.push(...(0, ast_utils_1.findNodes)(node, syntaxKind).filter((n) => n.getText() === text));
    }
    return result;
}
exports.findMultiLevelNodesByTextAndKind = findMultiLevelNodesByTextAndKind;
function getLineStartFromTSFile(source, position) {
    const lac = source.getLineAndCharacterOfPosition(position);
    return source.getPositionOfLineAndCharacter(lac.line, 0);
}
// as this is copied from https://github.com/angular/angular-cli/blob/master/packages/schematics/angular/app-shell/index.ts#L211, no need to test Angular's code
function getMetadataProperty(metadata, propertyName) {
    const properties = metadata.properties;
    const property = properties.filter((prop) => {
        if (!typescript_1.default.isPropertyAssignment(prop)) {
            return false;
        }
        const name = prop.name;
        switch (name.kind) {
            case typescript_1.default.SyntaxKind.Identifier:
                return name.getText() === propertyName;
            case typescript_1.default.SyntaxKind.StringLiteral:
                return name.text === propertyName;
        }
        return false;
    })[0];
    return property;
}
exports.getMetadataProperty = getMetadataProperty;
function getLineFromTSFile(host, path, position, linesToRemove = 1) {
    const tsFile = getTsSourceFile(host, path);
    const lac = tsFile.getLineAndCharacterOfPosition(position);
    const lineStart = tsFile.getPositionOfLineAndCharacter(lac.line, 0);
    const nextLineStart = tsFile.getPositionOfLineAndCharacter(lac.line + linesToRemove, 0);
    return [lineStart, nextLineStart - lineStart];
}
exports.getLineFromTSFile = getLineFromTSFile;
function getServerTsPath(host) {
    var _a, _b, _c;
    const projectName = (0, workspace_utils_1.getDefaultProjectNameFromWorkspace)(host);
    const angularJson = (0, workspace_utils_1.getAngularJsonFile)(host);
    return (_c = (_b = (_a = angularJson.projects[projectName].architect) === null || _a === void 0 ? void 0 : _a.server) === null || _b === void 0 ? void 0 : _b.options) === null || _c === void 0 ? void 0 : _c.main;
}
exports.getServerTsPath = getServerTsPath;
//# sourceMappingURL=file-utils.js.map