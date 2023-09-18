import { Rule } from '@angular-devkit/schematics';
import { RenamedSymbol } from '../../../shared/utils/file-utils';
export declare const RENAMED_SYMBOLS_DATA: RenamedSymbol[];
export declare const CHECKOUT_LIB_MOVED_SYMBOLS_DATA: RenamedSymbol[];
export declare function migrate(): Rule;
