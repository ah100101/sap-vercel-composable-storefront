import { Rule } from '@angular-devkit/schematics';
import { ConfigDeprecation } from '../../../shared/utils/file-utils';
export declare const CONFIG_DEPRECATIONS_DATA: ConfigDeprecation[];
export declare function migrate(): Rule;
