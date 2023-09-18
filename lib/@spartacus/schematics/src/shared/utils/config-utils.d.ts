import { ArrayLiteralExpression, Expression, ObjectLiteralExpression, SourceFile } from 'ts-morph';
import { AdditionalProviders } from './feature-utils';
export declare function getSpartacusProviders(sourceFile: SourceFile, createIfMissing?: boolean): Expression[];
export declare function isSpartacusConfigDuplicate(newContent: string, initializer: ArrayLiteralExpression): boolean;
export declare function normalizeObject(obj: string): string;
/**
 * Removes the config for the given property name.
 * If the object is empty after removal, the object
 * itself is removed.
 */
export declare function removeProperty(objectLiteral: ObjectLiteralExpression, propertyName: string): void;
export declare function getB2bConfiguration(): AdditionalProviders[];
