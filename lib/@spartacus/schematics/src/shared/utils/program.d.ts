import { Tree } from '@angular-devkit/schematics';
import { Project, SourceFile } from 'ts-morph';
export declare function createProgram(tree: Tree, basePath: string, tsconfigPath: string): {
    program: Project;
    appSourceFiles: SourceFile[];
};
export declare function saveAndFormat(sourceFile: SourceFile): void;
