/// <reference types="node" />
import { Tree } from '@angular-devkit/schematics';
import { FileSystemHost } from 'ts-morph';
export declare class TreeFileSystem implements FileSystemHost {
    private readonly tree;
    private readonly rootDir;
    constructor(tree: Tree, rootDir: string);
    private resolvePath;
    isCaseSensitive(): boolean;
    delete(filePath: string): Promise<void>;
    deleteSync(filePath: string): void;
    readDirSync(dirPath: string): string[];
    readFile(filePath: string, encoding?: BufferEncoding | undefined): Promise<string>;
    readFileSync(filePath: string, encoding?: BufferEncoding | undefined): string;
    writeFile(filePath: string, fileText: string): Promise<void>;
    writeFileSync(filePath: string, fileText: string): void;
    mkdir(dirPath: string): Promise<void>;
    mkdirSync(dirPath: string): void;
    move(srcPath: string, destPath: string): Promise<void>;
    moveSync(srcPath: string, destPath: string): void;
    copy(srcPath: string, destPath: string): Promise<void>;
    copySync(_srcPath: string, _destPath: string): void;
    fileExists(filePath: string): Promise<boolean>;
    fileExistsSync(filePath: string): boolean;
    directoryExists(dirPath: string): Promise<boolean>;
    directoryExistsSync(dirPath: string): boolean;
    realpathSync(filePath: string): string;
    getCurrentDirectory(): string;
    glob(_patterns: readonly string[]): Promise<string[]>;
    globSync(_patterns: readonly string[]): string[];
}
