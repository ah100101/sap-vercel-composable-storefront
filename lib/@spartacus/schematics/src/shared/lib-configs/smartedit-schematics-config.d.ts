import { LibraryOptions, SchematicConfig } from '../utils/lib-utils';
export interface SpartacusSmartEditOptions extends LibraryOptions {
    storefrontPreviewRoute?: string;
    allowOrigin?: string;
}
export declare const SMARTEDIT_FOLDER_NAME = "smartedit";
export declare const SMARTEDIT_MODULE_NAME = "SmartEdit";
export declare const SMARTEDIT_MODULE = "SmartEditModule";
export declare const SMARTEDIT_ROOT_MODULE = "SmartEditRootModule";
export declare const SMARTEDIT_FEATURE_NAME_CONSTANT = "SMART_EDIT_FEATURE";
export declare const SPARTACUS_SMARTEDIT_ASSETS = "smartedit/assets";
export declare const SMARTEDIT_SCHEMATICS_CONFIG: SchematicConfig;
