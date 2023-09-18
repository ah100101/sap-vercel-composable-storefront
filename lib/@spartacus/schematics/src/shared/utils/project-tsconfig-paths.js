"use strict";
/*
 * Copyright Google LLC All Rights Reserved.
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectTsConfigPaths = void 0;
const core_1 = require("@angular-devkit/core");
const workspace_utils_1 = require("./workspace-utils");
/**
 * Gets all tsconfig paths (or only for specific project) from a CLI project by reading the workspace configuration
 * and looking for common tsconfig locations.
 */
function getProjectTsConfigPaths(tree, project) {
    const buildPaths = new Set([]);
    const testPaths = new Set([]);
    // Add any tsconfig directly referenced in a build or test task of the angular.json workspace.
    const { workspace } = (0, workspace_utils_1.getWorkspace)(tree);
    if (workspace) {
        if (project) {
            if (workspace.projects[project]) {
                const buildPath = getTargetTsconfigPath(workspace.projects[project], 'build');
                const testPath = getTargetTsconfigPath(workspace.projects[project], 'test');
                addBuildPath(buildPath);
                addTestPath(testPath);
            }
        }
        else {
            const projects = Object.keys(workspace.projects).map((name) => workspace.projects[name]);
            for (const workspaceProject of projects) {
                const buildPath = getTargetTsconfigPath(workspaceProject, 'build');
                const testPath = getTargetTsconfigPath(workspaceProject, 'test');
                addBuildPath(buildPath);
                addTestPath(testPath);
            }
        }
    }
    // Filter out tsconfig files that don't exist in the CLI project.
    return {
        buildPaths: Array.from(buildPaths).filter((p) => tree.exists(p)),
        testPaths: Array.from(testPaths).filter((p) => tree.exists(p)),
    };
    function addBuildPath(path) {
        if (path) {
            buildPaths.add(path);
        }
    }
    function addTestPath(path) {
        if (path) {
            testPaths.add(path);
        }
    }
}
exports.getProjectTsConfigPaths = getProjectTsConfigPaths;
/** Gets the tsconfig path from the given target within the specified project. */
function getTargetTsconfigPath(project, targetName) {
    var _a, _b;
    if (project.targets &&
        project.targets[targetName] &&
        ((_a = project.targets[targetName].options) === null || _a === void 0 ? void 0 : _a.tsConfig)) {
        return (0, core_1.normalize)(project.targets[targetName].options.tsConfig);
    }
    if (project.architect &&
        project.architect[targetName] &&
        ((_b = project.architect[targetName].options) === null || _b === void 0 ? void 0 : _b.tsConfig)) {
        return (0, core_1.normalize)(project.architect[targetName].options.tsConfig);
    }
    return null;
}
//# sourceMappingURL=project-tsconfig-paths.js.map