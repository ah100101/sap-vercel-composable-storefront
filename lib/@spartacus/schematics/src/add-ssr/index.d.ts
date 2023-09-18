import { Rule } from '@angular-devkit/schematics';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
export declare function modifyAppServerModuleFile(): Rule;
export declare function addSSR(options: SpartacusOptions): Rule;
