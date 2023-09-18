import { Rule, Tree } from '@angular-devkit/schematics';
import { ArrowFunction, Expression, Identifier, SourceFile } from 'ts-morph';
import { LibraryOptions, Module, SchematicConfig } from './lib-utils';
import { Import } from './new-module-utils';
export interface FeatureModuleImports {
    importPath: string;
    moduleNode: Expression | Identifier;
}
/**
 * Custom schematics configuration providers.
 */
export interface AdditionalProviders {
    import: Import[];
    content: string;
}
/**
 * Additional schematics configurations / overrides.
 */
export interface AdditionalFeatureConfiguration<T = LibraryOptions> {
    /**
     * If specified, provides the specified configuration.
     */
    providers?: AdditionalProviders | AdditionalProviders[];
    /**
     * If specified, overrides the pre-defined schematics options.
     */
    options?: T;
}
/**
 * Configures feature modules for the given array of features.
 *
 * Optionally, an override can be provided for the default
 * schematics options and/or feature-schematics configuration.
 */
export declare function addFeatures<OPTIONS extends LibraryOptions>(options: OPTIONS, features: string[]): Rule;
/**
 * If exists, it returns the spartacus-features.module.ts' source.
 * Otherwise, it returns undefined.
 */
export declare function getSpartacusFeaturesModule(tree: Tree, basePath: string, tsconfigPath: string): SourceFile | undefined;
/**
 * For the given feature module name,
 * returns the module configuration part
 * of the given schematics feature config
 */
export declare function getModuleConfig(featureModuleName: string, featureConfig: SchematicConfig): Module | undefined;
/**
 * Analyzes the customers' application.
 * It checks for presence of Spartacus features and
 * whether they're configured or present in package.json.
 */
export declare function analyzeApplication<OPTIONS extends LibraryOptions>(options: OPTIONS, allFeatures: string[]): Rule;
/**
 * Searches through feature modules,
 * and looks for either the static or
 * dynamic imports.
 */
export declare function findFeatureModule(moduleConfig: Module | Module[], appSourceFiles: SourceFile[]): SourceFile | undefined;
/**
 * Peeks into the given dynamic import,
 * and returns referenced local source file.
 */
export declare function getDynamicallyImportedLocalSourceFile(dynamicImport: ArrowFunction): SourceFile | undefined;
