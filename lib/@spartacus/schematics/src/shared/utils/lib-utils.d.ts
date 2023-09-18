import { ExecutionOptions, Rule, SchematicContext, TaskId, Tree } from '@angular-devkit/schematics';
import { NodeDependency } from '@schematics/angular/utility/dependencies';
import { AdditionalFeatureConfiguration } from './feature-utils';
import { Import } from './new-module-utils';
export interface LibraryOptions extends Partial<ExecutionOptions> {
    project: string;
    lazy?: boolean;
    features?: string[];
    /**
     * When enabled, prints the additional logs.
     */
    debug?: boolean;
    /**
     * Internal options.
     * Should not be set by the user.
     */
    internal?: {
        /**
         * If Spartacus is already installed in the app.
         */
        existingSpartacusApplication?: boolean;
    };
    /**
     * Meta.
     * Populated when programmatically invoking
     * Spartacus installation schematics in order
     * to install them as dependencies.
     */
    options?: LibraryOptions;
}
/**
 * Configuration describing the feature schematics.
 */
export interface SchematicConfig {
    /**
     * Library options
     */
    library: {
        /**
         * The feature name, e.g. CHECKOUT_BASE_FEATURE.
         * Corresponds to the CLI's name defined in file:
         * `projects/schematics/src/add-spartacus/schema.json`
         */
        featureName: string;
        /**
         * Spartacus library scope, e.g. `@spartacus/checkout`
         */
        mainScope: string;
        /**
         * E.g. `@spartacus/checkout/base/b2b`
         */
        featureScope?: string;
        /**
         * If the feature is a b2b feature, it will provide the b2b configuration.
         */
        b2b?: boolean;
    };
    /**
     * The folder in which we will generate the feature module. E.g. app/spartacus/features/__organization__ (__NOTE__: just the `organization` part should be provided.).
     */
    folderName: string;
    /**
     * Used as the generated feature module's file name.
     * Also, used as the lazy loading's feature name if the `lazyLoadingChunk` config is not provided.
     */
    moduleName: string;
    /**
     * The feature module configuration.
     * E.g. `CheckoutB2BModule` from `@spartacus/checkout/b2b`.
     */
    featureModule: Module | Module[];
    /**
     * The root module configuration.
     * E.g. `CheckoutB2BRootModule` from `@spartacus/checkout/b2b/root`.
     */
    rootModule?: Module;
    /**
     * The lazy loading chunk's name.
     * It's usually a constant imported from a library.
     */
    lazyLoadingChunk?: Import;
    /**
     * Translation chunk configuration
     */
    i18n?: I18NConfig;
    /**
     * Styling configuration
     */
    styles?: StylingConfig;
    /**
     * Assets configuration
     */
    assets?: AssetsConfig;
    /**
     * A function returning the custom configuration.
     */
    customConfig?: <OPTIONS extends LibraryOptions>(options: OPTIONS) => AdditionalFeatureConfiguration;
    /**
     * A list of feature dependencies which will be configured
     * during the new Spartacus installation.
     */
    dependencyFeatures?: string[];
    /**
     * Configuration for generating the wrapper modules.
     */
    importAfter?: {
        /**
         * The "marker" module name is a module name for which to search for.
         */
        markerModuleName: string;
        /**
         * The feature module name will be imported after the "marker" module.
         */
        featureModuleName: string;
    }[];
}
export interface Module {
    /** Module name */
    name: string;
    /** Module import path */
    importPath: string;
    /**
     * The content to specify in ng-module's imports,
     * e.g. `AuthModule.forRoot()`. If not specified,
     * the `name` is used.
     */
    content?: string;
}
export interface I18NConfig {
    resources: string;
    chunks: string;
    importPath: string;
}
export interface StylingConfig {
    scssFileName: string;
    importStyle: string;
}
export interface AssetsConfig {
    input: string;
    output?: string;
    glob: string;
}
export declare function shouldAddFeature(feature: string, features?: string[]): boolean;
export declare function addLibraryFeature<T extends LibraryOptions>(options: T, config: SchematicConfig): Rule;
export declare function checkAppStructure(tree: Tree, project: string): boolean;
export declare function createSpartacusFeatureFolderPath(folderName: string): string;
export declare function createSpartacusFeatureFileName(name: string): string;
export declare function createSpartacusWrapperModuleFileName(name: string): string;
export declare function addFeatureTranslations<T extends LibraryOptions>(options: T, config: SchematicConfig): Rule;
export declare function addLibraryStyles(stylingConfig: StylingConfig, options: LibraryOptions): Rule;
export declare function createNodePackageInstallationTask(context: SchematicContext): TaskId;
export declare function installPackageJsonDependencies(): Rule;
export declare function addPackageJsonDependencies(dependencies: NodeDependency[], packageJson: any): Rule;
/**
 * Adds libraries dependencies to package.json
 */
export declare function addPackageJsonDependenciesForLibrary<OPTIONS extends LibraryOptions>(dependencies: Record<string, string>, _options: OPTIONS): Rule;
export declare function dependencyExists(dependency: NodeDependency, packageJson: any): boolean;
export declare function configureB2bFeatures<T extends LibraryOptions>(options: T, packageJson: any): Rule;
/**
 * Used a comparator function when sorting features.
 */
export declare function calculateCrossFeatureSort(featureA: string, featureB: string): number;
/**
 * Used a comparator function when sorting libraries.
 */
export declare function calculateCrossLibrarySort(libraryA: string, libraryB: string): number;
/**
 * Performs the final steps of the installation,
 * before Angular schematics mechanism takes over.
 */
export declare function finalizeInstallation<OPTIONS extends LibraryOptions>(options: OPTIONS, features: string[]): Rule;
