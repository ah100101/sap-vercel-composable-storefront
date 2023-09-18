import { ArrowFunction, CallExpression, Identifier, ImportDeclaration, PropertyAccessExpression, SourceFile } from 'ts-morph';
import { Import } from './new-module-utils';
/**
 * Checks if the provided import is a Spartacus library.
 */
export declare function isImportedFromSpartacusLibs(node: Identifier | string): boolean;
/**
 * Checks if the provided imports is a core Spartacus library.
 */
export declare function isImportedFromSpartacusCoreLib(node: Identifier | string): boolean;
export declare function isImportedFrom(node: Identifier | string, toCheck: string): boolean;
export declare function getImportPath(node: Identifier): string | undefined;
export declare function getImportDeclaration(node: Identifier): ImportDeclaration | undefined;
/**
 * Collects the higher-order arrow functions.
 * E.g. `() => import('@spartacus/cart/base/components/add-to-cart').then((m) => m.AddToCartModule)`,
 * but not the inner one `(m) => m.AddToCartModule`.
 */
export declare function collectDynamicImports(source: SourceFile): ArrowFunction[];
/**
 * Returns the call expression of the dynamic import (if any).
 * E.g. for the given `() => import('@spartacus/cart/base').then((m) => m.CartBaseModule)` it returns `import('@spartacus/cart/base')`
 */
export declare function getDynamicImportCallExpression(arrowFunction: ArrowFunction): CallExpression | undefined;
/**
 * Returns the import path, e.g. @spartacus/cart/base
 */
export declare function getDynamicImportImportPath(arrowFunction: ArrowFunction): string | undefined;
/**
 * Returns the import module of the dynamic import (if any).
 * E.g. for the given `() => import('@spartacus/cart/base').then((m) => m.CartBaseModule)` it returns `m.CartBaseModule`
 */
export declare function getDynamicImportPropertyAccess(arrowFunction: ArrowFunction): PropertyAccessExpression | undefined;
/**
 * Creates the import statement in the given source file.
 */
export declare function createImports(sourceFile: SourceFile, imports: Import | Import[]): ImportDeclaration[];
/**
 * Searches through the given module's imports
 * for the given import path and import name.
 */
export declare function staticImportExists(sourceFile: SourceFile, importPathToFind: string, moduleNameToFind: string): boolean;
/**
 * Returns true if the given path is relative
 */
export declare function isRelative(path: string): boolean;
/**
 * Analyzes the dynamic imports of the given module.
 * If both dynamic import's import path and module name
 * are found in the given config, it returns it.
 */
export declare function findDynamicImport(sourceFile: SourceFile, importToFind: Import): ArrowFunction | undefined;
