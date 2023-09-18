import { SchematicContext, Tree } from '@angular-devkit/schematics';
export interface MissingPackageMigration {
    package: string;
    comment?: string;
}
export declare function migrateMissingPackage(tree: Tree, context: SchematicContext, missingPackageConfig: MissingPackageMigration): Tree;
