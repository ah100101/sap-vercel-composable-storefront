import { Tree } from '@angular-devkit/schematics';
/**
 * Gets all tsconfig paths (or only for specific project) from a CLI project by reading the workspace configuration
 * and looking for common tsconfig locations.
 */
export declare function getProjectTsConfigPaths(tree: Tree, project?: string): {
    buildPaths: string[];
    testPaths: string[];
};
