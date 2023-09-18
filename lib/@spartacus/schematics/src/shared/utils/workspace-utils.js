"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaffoldStructure = exports.validateSpartacusInstallation = exports.isWorkspaceProject = exports.isWorkspaceSchema = exports.getProject = exports.buildDefaultPath = exports.getProjectTargets = exports.getDefaultProjectNameFromWorkspace = exports.getProjectFromWorkspace = exports.getAngularJsonFile = exports.getWorkspace = exports.getSourceRoot = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const workspace_models_1 = require("@schematics/angular/utility/workspace-models");
const jsonc_parser_1 = require("jsonc-parser");
const libs_constants_1 = require("../libs-constants");
const logger_utils_1 = require("./logger-utils");
const new_module_utils_1 = require("./new-module-utils");
const DEFAULT_POSSIBLE_PROJECT_FILES = ['/angular.json', '/.angular.json'];
function getSourceRoot(host, options = {}) {
    const workspace = getWorkspace(host).workspace;
    if (!options.project) {
        options.project = getDefaultProjectNameFromWorkspace(host);
    }
    const sourceRoot = workspace.projects[options.project].sourceRoot;
    if (!sourceRoot) {
        throw new schematics_1.SchematicsException('No default project found');
    }
    return sourceRoot;
}
exports.getSourceRoot = getSourceRoot;
function getWorkspace(host, files = DEFAULT_POSSIBLE_PROJECT_FILES) {
    const angularJson = getAngularJsonFile(host, files);
    const path = files.filter((filePath) => host.exists(filePath))[0];
    return {
        path,
        workspace: angularJson,
    };
}
exports.getWorkspace = getWorkspace;
function getAngularJsonFile(tree, possibleProjectFiles = DEFAULT_POSSIBLE_PROJECT_FILES) {
    const path = possibleProjectFiles.filter((filePath) => tree.exists(filePath))[0];
    if (!path) {
        throw new schematics_1.SchematicsException(`Could not find Angular`);
    }
    const configBuffer = tree.read(path);
    if (configBuffer === null) {
        throw new schematics_1.SchematicsException(`Could not find (${path})`);
    }
    const angularJsonContent = configBuffer.toString();
    return (0, jsonc_parser_1.parse)(angularJsonContent, undefined, { allowTrailingComma: true });
}
exports.getAngularJsonFile = getAngularJsonFile;
function getProjectFromWorkspace(tree, options, files = DEFAULT_POSSIBLE_PROJECT_FILES) {
    const { workspace } = getWorkspace(tree, files);
    if (!options.project) {
        throw new schematics_1.SchematicsException('Option "project" is required.');
    }
    const project = workspace.projects[options.project];
    if (!project) {
        throw new schematics_1.SchematicsException(`Project is not defined in this workspace.`);
    }
    if (project.projectType !== 'application') {
        throw new schematics_1.SchematicsException(`Spartacus requires a project type of "application".`);
    }
    return project;
}
exports.getProjectFromWorkspace = getProjectFromWorkspace;
function getDefaultProjectNameFromWorkspace(tree) {
    const workspace = getWorkspace(tree).workspace;
    return workspace.defaultProject !== undefined
        ? workspace.defaultProject
        : Object.keys(workspace.projects)[0];
}
exports.getDefaultProjectNameFromWorkspace = getDefaultProjectNameFromWorkspace;
function getProjectTargets(projectOrHost, projectName = '') {
    const project = isWorkspaceProject(projectOrHost)
        ? projectOrHost
        : getProject(projectOrHost, projectName);
    const projectTargets = project.targets || project.architect;
    if (!projectTargets) {
        throw new Error('Project target not found.');
    }
    return projectTargets;
}
exports.getProjectTargets = getProjectTargets;
/**
 * Build a default project path for generating.
 * @param project The project to build the path for.
 */
function buildDefaultPath(project) {
    const root = project.sourceRoot
        ? `/${project.sourceRoot}/`
        : `/${project.root}/src/`;
    const projectDirName = project.projectType === workspace_models_1.ProjectType.Application ? 'app' : 'lib';
    return `${root}${projectDirName}`;
}
exports.buildDefaultPath = buildDefaultPath;
function getProject(workspaceOrHost, projectName) {
    const workspace = isWorkspaceSchema(workspaceOrHost)
        ? workspaceOrHost
        : getWorkspace(workspaceOrHost).workspace;
    return workspace.projects[projectName];
}
exports.getProject = getProject;
function isWorkspaceSchema(workspace) {
    return !!(workspace && workspace.projects);
}
exports.isWorkspaceSchema = isWorkspaceSchema;
function isWorkspaceProject(project) {
    return !!(project && project.projectType);
}
exports.isWorkspaceProject = isWorkspaceProject;
function validateSpartacusInstallation(packageJson) {
    if (!packageJson.dependencies.hasOwnProperty(libs_constants_1.SPARTACUS_CORE)) {
        throw new schematics_1.SchematicsException(`Spartacus is not detected. Please first install Spartacus by running: 'ng add @spartacus/schematics'.
    To see more options, please check our documentation: https://sap.github.io/spartacus-docs/schematics/`);
    }
}
exports.validateSpartacusInstallation = validateSpartacusInstallation;
function scaffoldStructure(options) {
    const APP_PATH = 'app/spartacus';
    return (_tree, _context) => {
        return (0, schematics_1.chain)([
            (0, logger_utils_1.debugLogRule)(`⌛️ Scaffolding Spartacus file structure...`, options.debug),
            (0, new_module_utils_1.ensureModuleExists)({
                name: libs_constants_1.SPARTACUS_MODULE,
                path: APP_PATH,
                module: 'app',
                project: options.project,
            }),
            (0, new_module_utils_1.ensureModuleExists)({
                name: libs_constants_1.SPARTACUS_FEATURES_MODULE,
                path: APP_PATH,
                module: 'spartacus',
                project: options.project,
            }),
            (0, new_module_utils_1.ensureModuleExists)({
                name: libs_constants_1.SPARTACUS_CONFIGURATION_MODULE,
                path: APP_PATH,
                module: 'spartacus',
                project: options.project,
            }),
            (0, logger_utils_1.debugLogRule)(`✅ Spartacus file structure scaffolded.`, options.debug),
        ]);
    };
}
exports.scaffoldStructure = scaffoldStructure;
//# sourceMappingURL=workspace-utils.js.map