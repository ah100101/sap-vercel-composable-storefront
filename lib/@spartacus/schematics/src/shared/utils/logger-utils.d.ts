import { Rule } from '@angular-devkit/schematics';
/**
 * Logs the provided message if the debug option is set to true.
 */
export declare function debugLogRule(message: string, debug?: boolean): Rule;
/**
 * Formats the given message.
 */
export declare function formatFeatureStart(feature: string, message: string): string;
/**
 * Formats the given message.
 */
export declare function formatFeatureComplete(feature: string, message: string): string;
