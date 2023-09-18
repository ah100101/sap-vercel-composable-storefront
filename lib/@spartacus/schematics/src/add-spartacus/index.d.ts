import { Rule } from '@angular-devkit/schematics';
import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';
import { Schema as SpartacusOptions } from './schema';
export declare function getMainStyleFilePath(project: WorkspaceProject): string;
export declare function createStylePreprocessorOptions(options?: SpartacusOptions): Rule;
export declare function addSpartacus(options: SpartacusOptions): Rule;
