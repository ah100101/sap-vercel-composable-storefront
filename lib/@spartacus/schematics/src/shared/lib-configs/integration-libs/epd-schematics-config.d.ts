import { LibraryOptions, SchematicConfig } from '../../utils/lib-utils';
export interface SpartacusEpdVisualizationOptions extends LibraryOptions {
    baseUrl?: string;
}
export declare const EPD_VISUALIZATION_FOLDER_NAME = "epd-visualization";
export declare const EPD_VISUALIZATION_MODULE_NAME = "EpdVisualization";
export declare const EPD_SCSS_FILE_NAME = "epd-visualization.scss";
export declare const EPD_VISUALIZATION_FEATURE_NAME_CONSTANT = "EPD_VISUALIZATION_FEATURE";
export declare const EPD_VISUALIZATION_MODULE = "EpdVisualizationModule";
export declare const EPD_VISUALIZATION_ROOT_MODULE = "EpdVisualizationRootModule";
export declare const EPD_VISUALIZATION_TRANSLATIONS = "epdVisualizationTranslations";
export declare const EPD_VISUALIZATION_TRANSLATION_CHUNKS_CONFIG = "epdVisualizationTranslationChunksConfig";
export declare const EPD_SCHEMATICS_CONFIG: SchematicConfig;
