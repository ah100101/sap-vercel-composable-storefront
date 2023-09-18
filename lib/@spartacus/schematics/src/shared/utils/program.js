"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAndFormat = exports.createProgram = void 0;
const ts_morph_1 = require("ts-morph");
const tree_file_system_1 = require("./tree-file-system");
function createProgram(tree, basePath, tsconfigPath) {
    const fs = new tree_file_system_1.TreeFileSystem(tree, basePath);
    const program = new ts_morph_1.Project({
        tsConfigFilePath: tsconfigPath,
        fileSystem: fs,
    });
    program.getTypeChecker();
    const appSourceFiles = program.getSourceFiles().filter((sourceFile) => {
        return (!sourceFile.isDeclarationFile() &&
            !sourceFile.isFromExternalLibrary() &&
            !sourceFile.isInNodeModules());
    });
    return {
        program,
        appSourceFiles,
    };
}
exports.createProgram = createProgram;
function saveAndFormat(sourceFile) {
    sourceFile.organizeImports();
    sourceFile.formatText({
        ensureNewLineAtEndOfFile: true,
        indentSize: 2,
    });
    sourceFile.saveSync();
}
exports.saveAndFormat = saveAndFormat;
//# sourceMappingURL=program.js.map