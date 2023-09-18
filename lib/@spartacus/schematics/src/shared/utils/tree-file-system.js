"use strict";
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeFileSystem = void 0;
const core_1 = require("@angular-devkit/core");
const path = __importStar(require("path"));
const ts_morph_1 = require("ts-morph");
class TreeFileSystem {
    constructor(tree, rootDir) {
        this.tree = tree;
        this.rootDir = rootDir;
    }
    resolvePath(filePath) {
        return (0, core_1.normalize)((0, core_1.resolve)((0, core_1.normalize)(this.rootDir), (0, core_1.normalize)(filePath)));
    }
    isCaseSensitive() {
        return ts_morph_1.ts.sys.useCaseSensitiveFileNames;
    }
    delete(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.deleteSync(filePath);
        });
    }
    deleteSync(filePath) {
        return this.tree.delete(filePath);
    }
    readDirSync(dirPath) {
        const paths = [];
        this.tree
            .getDir(dirPath)
            .subfiles.forEach((file) => paths.push(path.join(dirPath, file.toString())));
        this.tree
            .getDir(dirPath)
            .subdirs.forEach((dir) => paths.push(path.join(dirPath, dir.toString())));
        return paths;
    }
    readFile(filePath, encoding) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.readFileSync(filePath, encoding);
        });
    }
    readFileSync(filePath, encoding) {
        var _a;
        const result = (_a = this.tree
            .get(this.resolvePath(filePath))) === null || _a === void 0 ? void 0 : _a.content.toString(encoding);
        if (result) {
            return result;
        }
        return '';
    }
    writeFile(filePath, fileText) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.writeFileSync(filePath, fileText);
        });
    }
    writeFileSync(filePath, fileText) {
        if (this.fileExistsSync(filePath)) {
            const currentContent = this.readFileSync(filePath);
            // prevent the unnecessary Angular logs about the files being updated
            if (currentContent === fileText) {
                return;
            }
        }
        return this.tree.overwrite(filePath, fileText);
    }
    mkdir(dirPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.mkdirSync(dirPath);
        });
    }
    mkdirSync(dirPath) {
        if (this.tree.exists(`${dirPath}/.gitkeep`)) {
            return;
        }
        return;
    }
    move(srcPath, destPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.moveSync(srcPath, destPath);
        });
    }
    moveSync(srcPath, destPath) {
        return this.tree.rename(srcPath, destPath);
    }
    copy(srcPath, destPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.copySync(srcPath, destPath);
        });
    }
    copySync(_srcPath, _destPath) {
        throw new Error('Method `copySync` not implemented in TreeFileSystem.');
    }
    fileExists(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fileExistsSync(filePath);
        });
    }
    fileExistsSync(filePath) {
        return this.tree.exists(filePath);
    }
    directoryExists(dirPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.directoryExistsSync(dirPath);
        });
    }
    directoryExistsSync(dirPath) {
        return this.tree.exists(dirPath);
    }
    realpathSync(filePath) {
        const result = (0, core_1.normalize)((0, core_1.resolve)((0, core_1.normalize)(this.rootDir), (0, core_1.normalize)(filePath)));
        return result;
    }
    getCurrentDirectory() {
        return this.tree.root.path.toString();
    }
    glob(_patterns) {
        throw new Error('Method `glob` not implemented in TreeFileSystem.');
    }
    globSync(_patterns) {
        throw new Error('Method `globSync` not implemented in TreeFileSystem.');
    }
}
exports.TreeFileSystem = TreeFileSystem;
//# sourceMappingURL=tree-file-system.js.map