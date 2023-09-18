import { Rule } from '@angular-devkit/schematics';
import { ArrayLiteralExpression, CallExpression, Expression, SourceFile } from 'ts-morph';
export type ModuleProperty = 'imports' | 'exports' | 'declarations' | 'providers';
export interface Import {
    moduleSpecifier: string;
    namedImports: string[];
}
export declare function ensureModuleExists(options: {
    /** module's name */
    name: string;
    /** path where to create the module */
    path: string;
    /** project name */
    project: string;
    /** the declaring module */
    module: string;
}): Rule;
export declare function addModuleImport(sourceFile: SourceFile, insertOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
}, createIfMissing?: boolean): Expression | undefined;
export declare function addModuleExport(sourceFile: SourceFile, insertOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
}, createIfMissing?: boolean): Expression | undefined;
export declare function addModuleDeclaration(sourceFile: SourceFile, insertOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
}, createIfMissing?: boolean): Expression | undefined;
export declare function addModuleProvider(sourceFile: SourceFile, insertOptions: {
    import: Import | Import[];
    content: string;
    order?: number;
}, createIfMissing?: boolean): Expression | undefined;
export declare function getModule(sourceFile: SourceFile): CallExpression | undefined;
export declare function getModulePropertyInitializer(source: SourceFile, propertyName: ModuleProperty, createIfMissing?: boolean): ArrayLiteralExpression | undefined;
