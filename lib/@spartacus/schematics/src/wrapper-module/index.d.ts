import { Rule } from '@angular-devkit/schematics';
import { CallExpression } from 'ts-morph';
import { Schema as SpartacusWrapperOptions } from './schema';
/**
 * Takes the given spartacus provider, and removes the
 * 'module' configuration property from it.
 * If the are no other properties left, the whole
 * spartacus provider is removed.
 */
export declare function cleanupConfig(spartacusProvider: CallExpression): void;
/**
 * Generates wrapper modules for the given
 * Spartacus feature module.
 */
export declare function generateWrapperModule(options: SpartacusWrapperOptions): Rule;
