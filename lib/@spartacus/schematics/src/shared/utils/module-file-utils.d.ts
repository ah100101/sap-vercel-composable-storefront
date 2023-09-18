import { Tree } from '@angular-devkit/schematics';
import { Change, InsertChange } from '@schematics/angular/utility/change';
import ts from 'typescript';
export declare function stripTsFromImport(importPath: string): string;
export declare function addImport(host: Tree, filePath: string, importText: string, importPath: string): void;
export declare function createImportChange(host: Tree, filePath: string, importText: string, importPath: string): Change;
export declare function addToModuleImports(host: Tree, modulePath: string, importText: string, moduleSource?: ts.SourceFile): InsertChange[];
export declare function addToModuleDeclarations(host: Tree, modulePath: string, declarations: string, moduleSource?: ts.SourceFile): InsertChange[];
export declare function addToModuleExports(host: Tree, modulePath: string, exportsText: string, moduleSource?: ts.SourceFile): InsertChange[];
export declare function addToModuleProviders(host: Tree, modulePath: string, importText: string, moduleSource?: ts.SourceFile): InsertChange[];
export declare function addToMetadata(host: Tree, modulePath: string, text: string, metadataType: 'imports' | 'declarations' | 'exports' | 'providers', moduleSource?: ts.SourceFile): InsertChange[];
export declare function addToModuleImportsAndCommitChanges(host: Tree, modulePath: string, importText: string): void;
/**
 * Build a relative path from one file path to another file path.
 */
export declare function buildRelativePath(from: string, to: string): string;
export declare function getTemplateInfo(source: ts.SourceFile): {
    templateUrl?: string;
    inlineTemplateContent?: string;
    inlineTemplateStart?: number;
} | undefined;
export declare function getAppModule(host: Tree, project: string): string;
