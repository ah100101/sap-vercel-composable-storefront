import { Rule, Tree } from '@angular-devkit/schematics';
import { NodeDependency } from '@schematics/angular/utility/dependencies';
export declare function createSpartacusDependencies(dependencyObject: Record<string, string>): NodeDependency[];
export declare function createDependencies(dependencyObject: Record<string, string>, options?: {
    /**
     * skip the scopes that start with any of the given scopes
     */
    skipScopes: string[];
    /**
     * create and return dependencies only listed in the given array
     */
    onlyIncludeScopes?: string[];
    /** dependency version which to set. If not provided, the one from the given `dependencyObject` will be used. */
    version?: string;
    /** Overwrite the dependencies */
    overwrite?: boolean;
}): NodeDependency[];
export declare function mapPackageToNodeDependencies(packageName: string, pkgVersion: string, overwrite?: boolean): NodeDependency;
export declare function readPackageJson(tree: Tree): any;
export declare function cleanSemverVersion(versionString: string): string;
export declare function getMajorVersionNumber(versionString: string): number;
export declare function getSpartacusSchematicsVersion(): string;
export declare function getPrefixedSpartacusSchematicsVersion(): string;
export declare function getSpartacusCurrentFeatureLevel(): string;
export declare function checkIfSSRIsUsed(tree: Tree): boolean;
export declare function prepareSpartacusDependencies(): NodeDependency[];
export declare function prepare3rdPartyDependencies(): NodeDependency[];
export declare function updatePackageJsonDependencies(dependencies: NodeDependency[], packageJson: any): Rule;
