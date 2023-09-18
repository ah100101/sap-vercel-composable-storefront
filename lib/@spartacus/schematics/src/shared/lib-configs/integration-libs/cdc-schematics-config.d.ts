import { LibraryOptions, SchematicConfig } from '../../utils/lib-utils';
export interface SpartacusCdcOptions extends LibraryOptions {
    baseSite?: string;
    javascriptUrl?: string;
    sessionExpiration?: number;
}
export declare const CDC_FOLDER_NAME = "cdc";
export declare const CDC_MODULE_NAME = "Cdc";
export declare const CDC_MODULE = "CdcModule";
export declare const CDC_ROOT_MODULE = "CdcRootModule";
export declare const CDC_FEATURE_CONSTANT = "CDC_FEATURE";
export declare const CDC_CONFIG = "CdcConfig";
export declare const CDC_USER_ACCOUNT_MODULE = "CDCUserAccountModule";
export declare const CDC_USER_PROFILE_MODULE = "CDCUserProfileModule";
export declare const CDC_ADMINISTRATION_MODULE = "CdcAdministrationModule";
export declare const CDC_SCHEMATICS_CONFIG: SchematicConfig;
