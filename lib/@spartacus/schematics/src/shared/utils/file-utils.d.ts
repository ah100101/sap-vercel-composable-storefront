import { Tree } from '@angular-devkit/schematics';
import { Change, InsertChange, ReplaceChange } from '@schematics/angular/utility/change';
import ts from 'typescript';
export declare enum InsertDirection {
    LEFT = 0,
    RIGHT = 1
}
export interface ClassType {
    className: string;
    importPath?: string;
    literalInference?: string;
    injectionToken?: {
        token: string;
        importPath?: string;
        isArray?: boolean;
    };
}
interface InjectServiceConfiguration {
    constructorNode: ts.Node | undefined;
    path: string;
    serviceName: string;
    modifier: 'private' | 'protected' | 'public' | 'no-modifier';
    propertyName?: string;
    propertyType?: string;
    injectionToken?: string;
    isArray?: boolean;
}
export interface ComponentProperty {
    /** property name */
    name: string;
    /** comment describing the change to the property */
    comment: string;
}
export interface ComponentData {
    /** a component's selector, e.g. cx-start-rating */
    selector: string;
    /** a component.ts' class name */
    componentClassName: string;
    /** only `@Input` and `@Output` properties should be listed here */
    removedInputOutputProperties?: ComponentProperty[];
    /** all other removed component properties should be listed here */
    removedProperties?: ComponentProperty[];
}
export interface ConstructorDeprecation {
    class: string;
    importPath: string;
    deprecatedParams: ClassType[];
    /** The list of constructor parameters that are _added_ for the given version. */
    addParams?: ClassType[];
    /** The list of constructor parameters that are _removed_ for the given version. */
    removeParams?: ClassType[];
}
export interface MethodPropertyDeprecation {
    class: string;
    importPath: string;
    deprecatedNode: string;
    newNode?: string;
    comment?: string;
}
export interface DeprecatedNode {
    node: string;
    importPath: string;
    comment?: string;
}
export interface ConfigDeprecation {
    propertyName: string;
    comment: string;
}
export interface RenamedSymbol {
    previousNode: string;
    previousImportPath: string;
    newNode?: string;
    newImportPath?: string;
}
export declare function getTsSourceFile(tree: Tree, path: string): ts.SourceFile;
export declare function getAllTsSourceFiles(tree: Tree, basePath: string): ts.SourceFile[];
export declare function getIndexHtmlPath(tree: Tree): string;
export declare function getPathResultsForFile(tree: Tree, file: string, directory?: string): string[];
export declare function getHtmlFiles(tree: Tree, fileName?: string, directory?: string): string[];
export declare function insertComponentSelectorComment(content: string, componentSelector: string, componentProperty: ComponentProperty): string | undefined;
export declare function insertHtmlComment(content: string, componentProperty: ComponentProperty, angularCompiler: typeof import('@angular/compiler')): string | undefined;
export declare function commitChanges(host: Tree, path: string, changes: Change[] | null, insertDirection?: InsertDirection): void;
export declare function findConstructor(nodes: ts.Node[]): ts.Node | undefined;
export declare function defineProperty(nodes: ts.Node[], path: string, toAdd: string): InsertChange;
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
export declare function isCandidateForConstructorDeprecation(source: ts.SourceFile, constructorDeprecation: ConstructorDeprecation): boolean;
export declare function isInheriting(nodes: ts.Node[], inheritedClass: string): boolean;
export declare function addConstructorParam(source: ts.SourceFile, sourcePath: string, constructorNode: ts.Node | undefined, paramToAdd: ClassType): Change[];
export declare function removeConstructorParam(source: ts.SourceFile, sourcePath: string, constructorNode: ts.Node | undefined, paramToRemove: ClassType): Change[];
export declare function shouldRemoveDecorator(constructorNode: ts.Node, decoratorIdentifier: string): boolean;
export declare function removeInjectImports(source: ts.SourceFile, constructorNode: ts.Node, paramToRemove: ClassType): Change[];
export declare function removeImport(source: ts.SourceFile, importToRemove: ClassType): Change;
export declare function injectService(config: InjectServiceConfiguration): InsertChange;
export declare function buildSpartacusComment(comment: string): string;
export declare function insertCommentAboveConfigProperty(sourcePath: string, source: ts.SourceFile, identifierName: string, comment: string): Change[];
export declare function insertCommentAboveIdentifier(sourcePath: string, source: ts.SourceFile, identifierName: string, comment: string, identifierType?: ts.SyntaxKind): Change[];
export declare function insertCommentAboveImportIdentifier(sourcePath: string, source: ts.SourceFile, identifierName: string, importPath: string, comment: string): Change[];
export declare function renameIdentifierNode(sourcePath: string, source: ts.SourceFile, oldName: string, newName: string): ReplaceChange[];
export declare function findMultiLevelNodesByTextAndKind(nodes: ts.Node[], text: string, syntaxKind: ts.SyntaxKind): ts.Node[];
export declare function getMetadataProperty(metadata: ts.Node, propertyName: string): ts.PropertyAssignment;
export declare function getLineFromTSFile(host: Tree, path: string, position: number, linesToRemove?: number): [number, number];
export declare function getServerTsPath(host: Tree): string | undefined;
export {};
