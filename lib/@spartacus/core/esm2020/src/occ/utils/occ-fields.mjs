/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { deepMerge, isObject } from '../../config/utils/deep-merge';
/**
 * Merge occ fields parameters
 *
 * @param fields Fields definition as string or object
 */
export function mergeFields(fields) {
    const parsedFields = fields.map((f) => typeof f === 'string' ? parseFields(f) : f);
    const mergedFields = optimizeFields(deepMerge({}, ...parsedFields));
    return stringifyFields(mergedFields);
}
/**
 * Optimize fields definition by removing not needed groups
 *
 * @param fields
 */
export function optimizeFields(fields = {}) {
    const keys = Object.keys(fields);
    if (keys.includes('FULL')) {
        delete fields['DEFAULT'];
        delete fields['BASIC'];
    }
    else if (keys.includes('DEFAULT')) {
        delete fields['BASIC'];
    }
    Object.keys(fields).forEach((key) => {
        fields[key] = optimizeFields(fields[key]);
    });
    return fields;
}
/**
 * Parse string field definition to an AST object
 *
 * @param fields Fields string definition
 * @param startIndex Used for recurrence
 */
export function parseFields(fields, startIndex = 0) {
    const parsedFields = {};
    let i = startIndex;
    while (i < fields.length) {
        if (fields[i] === ',') {
            if (i > startIndex) {
                parsedFields[fields.substr(startIndex, i - startIndex)] = {};
            }
            startIndex = i + 1;
        }
        else if (fields[i] === '(') {
            const subFields = parseFields(fields, i + 1);
            if (!Array.isArray(subFields)) {
                return parsedFields;
            }
            parsedFields[fields.substr(startIndex, i - startIndex)] = subFields[0];
            startIndex = subFields[1];
            i = startIndex - 1;
        }
        else if (fields[i] === ')') {
            if (i > startIndex) {
                parsedFields[fields.substr(startIndex, i - startIndex)] = {};
            }
            return [parsedFields, i + 1];
        }
        i++;
    }
    if (startIndex < fields.length) {
        parsedFields[fields.substr(startIndex, i - startIndex)] = {};
    }
    return parsedFields;
}
/**
 * Convert AST object fields definition to string representation
 *
 * @param fields
 */
export function stringifyFields(fields) {
    return Object.keys(fields)
        .map((key) => {
        const subFields = stringifyFields(fields[key]);
        return subFields ? `${key}(${subFields})` : key;
    })
        .join(',');
}
/**
 * Extract part of the object described by fields definition
 *
 * @param data
 * @param fields
 */
export function extractFields(data, fields) {
    const parsedFields = typeof fields === 'string' ? parseFields(fields) : fields;
    return getObjectPart(data, parsedFields);
}
function getObjectPart(data, fields) {
    if (!isObject(data)) {
        return data;
    }
    const keys = Object.keys(fields);
    if (keys.length === 0 ||
        // we should not extract parts of the object with ambiguous fields definitions
        keys.find((el) => el === 'BASIC' || el === 'DEFAULT' || el === 'FULL')) {
        return data;
    }
    const result = {};
    keys.forEach((key) => {
        if (data.hasOwnProperty(key)) {
            result[key] = getObjectPart(data[key], fields[key]);
        }
    });
    return result;
}
// CHECK SONAR
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWZpZWxkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL29jYy91dGlscy9vY2MtZmllbGRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRXBFOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsV0FBVyxDQUFDLE1BQTJCO0lBQ3JELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUNwQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUMzQyxDQUFDO0lBQ0YsTUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLE9BQU8sZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGNBQWMsQ0FBQyxTQUFpQixFQUFFO0lBQ2hELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3pCLE9BQU8sTUFBTSxDQUFDLFNBQXlCLENBQUMsQ0FBQztRQUN6QyxPQUFPLE1BQU0sQ0FBQyxPQUF1QixDQUFDLENBQUM7S0FDeEM7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDbkMsT0FBTyxNQUFNLENBQUMsT0FBdUIsQ0FBQyxDQUFDO0tBQ3hDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENB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YUFBYSxDQUFJLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUksSUFBTyxFQUFFLE1BQWM7SUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNuQixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUVqQyxJQUNFLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUNqQiw4RUFBOEU7UUFDOUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLE9BQU8sSUFBSSxFQUFFLEtBQUssU0FBUyxJQUFJLEVBQUUsS0FBSyxNQUFNLENBQUMsRUFDdEU7UUFDQSxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsTUFBTSxNQUFNLEdBQUcsRUFBTyxDQUFDO0lBRXZCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNuQixJQUFLLElBQTBCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ25ELE1BQU0sQ0FBQyxHQUFjLENBQUMsR0FBRyxhQUFhLENBQ3BDLElBQUksQ0FBQyxHQUFtQixDQUFDLEVBQ3pCLE1BQU0sQ0FBQyxHQUFtQixDQUFDLENBQzVCLENBQUM7U0FDSDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUVELGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBkZWVwTWVyZ2UsIGlzT2JqZWN0IH0gZnJvbSAnLi4vLi4vY29uZmlnL3V0aWxzL2RlZXAtbWVyZ2UnO1xuXG4vKipcbiAqIE1lcmdlIG9jYyBmaWVsZHMgcGFyYW1ldGVyc1xuICpcbiAqIEBwYXJhbSBmaWVsZHMgRmllbGRzIGRlZmluaXRpb24gYXMgc3RyaW5nIG9yIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VGaWVsZHMoZmllbGRzOiAoc3RyaW5nIHwgb2JqZWN0KVtdKTogc3RyaW5nIHtcbiAgY29uc3QgcGFyc2VkRmllbGRzID0gZmllbGRzLm1hcCgoZikgPT5cbiAgICB0eXBlb2YgZiA9PT0gJ3N0cmluZycgPyBwYXJzZUZpZWxkcyhmKSA6IGZcbiAgKTtcbiAgY29uc3QgbWVyZ2VkRmllbGRzID0gb3B0aW1pemVGaWVsZHMoZGVlcE1lcmdlKHt9LCAuLi5wYXJzZWRGaWVsZHMpKTtcbiAgcmV0dXJuIHN0cmluZ2lmeUZpZWxkcyhtZXJnZWRGaWVsZHMpO1xufVxuXG4vKipcbiAqIE9wdGltaXplIGZpZWxkcyBkZWZpbml0aW9uIGJ5IHJlbW92aW5nIG5vdCBuZWVkZWQgZ3JvdXBzXG4gKlxuICogQHBhcmFtIGZpZWxkc1xuICovXG5leHBvcnQgZnVuY3Rpb24gb3B0aW1pemVGaWVsZHMoZmllbGRzOiBvYmplY3QgPSB7fSk6IG9iamVjdCB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhmaWVsZHMpO1xuICBpZiAoa2V5cy5pbmNsdWRlcygnRlVMTCcpKSB7XG4gICAgZGVsZXRlIGZpZWxkc1snREVGQVVMVCcgYXMga2V5b2Ygb2JqZWN0XTtcbiAgICBkZWxldGUgZmllbGRzWydCQVNJQycgYXMga2V5b2Ygb2JqZWN0XTtcbiAgfSBlbHNlIGlmIChrZXlzLmluY2x1ZGVzKCdERUZBVUxUJykpIHtcbiAgICBkZWxldGUgZmllbGRzWydCQVNJQycgYXMga2V5b2Ygb2JqZWN0XTtcbiAgfVxuICBPYmplY3Qua2V5cyhmaWVsZHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgIChmaWVsZHNba2V5IGFzIGtleW9mIG9iamVjdF0gYXMgb2JqZWN0KSA9IG9wdGltaXplRmllbGRzKFxuICAgICAgZmllbGRzW2tleSBhcyBrZXlvZiBvYmplY3RdXG4gICAgKTtcbiAgfSk7XG4gIHJldHVybiBmaWVsZHM7XG59XG5cbi8qKlxuICogUGFyc2Ugc3RyaW5nIGZpZWxkIGRlZmluaXRpb24gdG8gYW4gQVNUIG9iamVjdFxuICpcbiAqIEBwYXJhbSBmaWVsZHMgRmllbGRzIHN0cmluZyBkZWZpbml0aW9uXG4gKiBAcGFyYW0gc3RhcnRJbmRleCBVc2VkIGZvciByZWN1cnJlbmNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZpZWxkcyhcbiAgZmllbGRzOiBzdHJpbmcsXG4gIHN0YXJ0SW5kZXggPSAwXG4pOiBbb2JqZWN0LCBudW1iZXJdIHwgb2JqZWN0IHtcbiAgY29uc3QgcGFyc2VkRmllbGRzOiBSZWNvcmQ8c3RyaW5nLCBvYmplY3Q+ID0ge307XG5cbiAgbGV0IGkgPSBzdGFydEluZGV4O1xuICB3aGlsZSAoaSA8IGZpZWxkcy5sZW5ndGgpIHtcbiAgICBpZiAoZmllbGRzW2ldID09PSAnLCcpIHtcbiAgICAgIGlmIChpID4gc3RhcnRJbmRleCkge1xuICAgICAgICBwYXJzZWRGaWVsZHNbZmllbGRzLnN1YnN0cihzdGFydEluZGV4LCBpIC0gc3RhcnRJbmRleCldID0ge307XG4gICAgICB9XG4gICAgICBzdGFydEluZGV4ID0gaSArIDE7XG4gICAgfSBlbHNlIGlmIChmaWVsZHNbaV0gPT09ICcoJykge1xuICAgICAgY29uc3Qgc3ViRmllbGRzID0gcGFyc2VGaWVsZHMoZmllbGRzLCBpICsgMSk7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc3ViRmllbGRzKSkge1xuICAgICAgICByZXR1cm4gcGFyc2VkRmllbGRzO1xuICAgICAgfVxuICAgICAgcGFyc2VkRmllbGRzW2ZpZWxkcy5zdWJzdHIoc3RhcnRJbmRleCwgaSAtIHN0YXJ0SW5kZXgpXSA9IHN1YkZpZWxkc1swXTtcbiAgICAgIHN0YXJ0SW5kZXggPSBzdWJGaWVsZHNbMV07XG4gICAgICBpID0gc3RhcnRJbmRleCAtIDE7XG4gICAgfSBlbHNlIGlmIChmaWVsZHNbaV0gPT09ICcpJykge1xuICAgICAgaWYgKGkgPiBzdGFydEluZGV4KSB7XG4gICAgICAgIHBhcnNlZEZpZWxkc1tmaWVsZHMuc3Vic3RyKHN0YXJ0SW5kZXgsIGkgLSBzdGFydEluZGV4KV0gPSB7fTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbcGFyc2VkRmllbGRzLCBpICsgMV07XG4gICAgfVxuICAgIGkrKztcbiAgfVxuXG4gIGlmIChzdGFydEluZGV4IDwgZmllbGRzLmxlbmd0aCkge1xuICAgIHBhcnNlZEZpZWxkc1tmaWVsZHMuc3Vic3RyKHN0YXJ0SW5kZXgsIGkgLSBzdGFydEluZGV4KV0gPSB7fTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZWRGaWVsZHM7XG59XG5cbi8qKlxuICogQ29udmVydCBBU1Qgb2JqZWN0IGZpZWxkcyBkZWZpbml0aW9uIHRvIHN0cmluZyByZXByZXNlbnRhdGlvblxuICpcbiAqIEBwYXJhbSBmaWVsZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmluZ2lmeUZpZWxkcyhmaWVsZHM6IG9iamVjdCk6IHN0cmluZyB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhmaWVsZHMpXG4gICAgLm1hcCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCBzdWJGaWVsZHMgPSBzdHJpbmdpZnlGaWVsZHMoZmllbGRzW2tleSBhcyBrZXlvZiBvYmplY3RdKTtcbiAgICAgIHJldHVybiBzdWJGaWVsZHMgPyBgJHtrZXl9KCR7c3ViRmllbGRzfSlgIDoga2V5O1xuICAgIH0pXG4gICAgLmpvaW4oJywnKTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHBhcnQgb2YgdGhlIG9iamVjdCBkZXNjcmliZWQgYnkgZmllbGRzIGRlZmluaXRpb25cbiAqXG4gKiBAcGFyYW0gZGF0YVxuICogQHBhcmFtIGZpZWxkc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEZpZWxkczxUPihkYXRhOiBULCBmaWVsZHM6IHN0cmluZyB8IG9iamVjdCk6IFQge1xuICBjb25zdCBwYXJzZWRGaWVsZHMgPVxuICAgIHR5cGVvZiBmaWVsZHMgPT09ICdzdHJpbmcnID8gcGFyc2VGaWVsZHMoZmllbGRzKSA6IGZpZWxkcztcbiAgcmV0dXJuIGdldE9iamVjdFBhcnQ8VD4oZGF0YSwgcGFyc2VkRmllbGRzKTtcbn1cblxuZnVuY3Rpb24gZ2V0T2JqZWN0UGFydDxUPihkYXRhOiBULCBmaWVsZHM6IG9iamVjdCk6IFQge1xuICBpZiAoIWlzT2JqZWN0KGRhdGEpKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZmllbGRzKTtcblxuICBpZiAoXG4gICAga2V5cy5sZW5ndGggPT09IDAgfHxcbiAgICAvLyB3ZSBzaG91bGQgbm90IGV4dHJhY3QgcGFydHMgb2YgdGhlIG9iamVjdCB3aXRoIGFtYmlndW91cyBmaWVsZHMgZGVmaW5pdGlvbnNcbiAgICBrZXlzLmZpbmQoKGVsKSA9PiBlbCA9PT0gJ0JBU0lDJyB8fCBlbCA9PT0gJ0RFRkFVTFQnIHx8IGVsID09PSAnRlVMTCcpXG4gICkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0ge30gYXMgVDtcblxuICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgIGlmICgoZGF0YSBhcyB1bmtub3duIGFzIG9iamVjdCkuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgcmVzdWx0W2tleSBhcyBrZXlvZiBUXSA9IGdldE9iamVjdFBhcnQoXG4gICAgICAgIGRhdGFba2V5IGFzIGtleW9mIG9iamVjdF0sXG4gICAgICAgIGZpZWxkc1trZXkgYXMga2V5b2Ygb2JqZWN0XVxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vIENIRUNLIFNPTkFSXG4iXX0=