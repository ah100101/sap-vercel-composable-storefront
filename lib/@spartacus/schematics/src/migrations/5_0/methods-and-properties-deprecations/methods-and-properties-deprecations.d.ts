import { Rule } from '@angular-devkit/schematics';
import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
export declare const METHODS_AND_PROPERTIES_DEPRECATIONS_DATA: MethodPropertyDeprecation[];
export declare function migrate(): Rule;
