import { Rule, Tree } from '@angular-devkit/schematics';
import { ProjectType, WorkspaceProject, WorkspaceSchema, WorkspaceTargets } from '@schematics/angular/utility/workspace-models';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
export declare function getSourceRoot(host: Tree, options?: {
    project?: string | undefined;
    path?: string | undefined;
}): string;
export declare function getWorkspace(host: Tree, files?: string[]): {
    path: string;
    workspace: WorkspaceSchema;
};
export declare function getAngularJsonFile(tree: Tree, possibleProjectFiles?: string[]): WorkspaceSchema;
export declare function getProjectFromWorkspace<TProjectType extends ProjectType.Application>(tree: Tree, options: SpartacusOptions, files?: string[]): WorkspaceProject<TProjectType>;
export declare function getDefaultProjectNameFromWorkspace(tree: Tree): string;
export declare function getProjectTargets(project: WorkspaceProject): WorkspaceTargets;
export declare function getProjectTargets(workspaceOrHost: WorkspaceSchema | Tree, projectName: string): WorkspaceTargets;
/**
 * Build a default project path for generating.
 * @param project The project to build the path for.
 */
export declare function buildDefaultPath(project: WorkspaceProject): string;
export declare function getProject<TProjectType extends ProjectType = ProjectType.Application>(workspaceOrHost: WorkspaceSchema | Tree, projectName: string): WorkspaceProject<TProjectType>;
export declare function isWorkspaceSchema(workspace: any): workspace is WorkspaceSchema;
export declare function isWorkspaceProject(project: any): project is WorkspaceProject;
export declare function validateSpartacusInstallation(packageJson: any): void;
export declare function scaffoldStructure(options: SpartacusOptions): Rule;
