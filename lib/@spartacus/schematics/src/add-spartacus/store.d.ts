import { Rule } from '@angular-devkit/schematics';
import { Schema as SpartacusOptions } from './schema';
/** Migration that ensures that we have correct Store modules set */
export declare function setupStoreModules(options: SpartacusOptions): Rule;
