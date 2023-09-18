import { LibraryOptions, SchematicConfig } from '../../utils/lib-utils';
export interface SpartacusCdsOptions extends LibraryOptions {
    tenant?: string;
    baseUrl?: string;
    profileTagLoadUrl?: string;
    profileTagConfigUrl?: string;
}
export declare const CDS_FOLDER_NAME = "cds";
export declare const CDS_MODULE_NAME = "Cds";
export declare const CDS_MODULE = "CdsModule";
export declare const CDS_SCHEMATICS_CONFIG: SchematicConfig;
