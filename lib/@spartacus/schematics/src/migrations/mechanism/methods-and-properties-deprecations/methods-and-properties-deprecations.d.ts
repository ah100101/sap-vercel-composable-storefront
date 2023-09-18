import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
export declare function migrateMethodPropertiesDeprecation(tree: Tree, _context: SchematicContext, methodProperties: MethodPropertyDeprecation[]): Tree;
export declare function buildMethodComment(oldApiMethod: string, newApiMethod?: string): string;
