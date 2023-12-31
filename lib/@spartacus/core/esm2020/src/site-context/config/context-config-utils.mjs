/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Helper function for safely getting context parameter config
 *
 * @param config
 * @param parameter
 */
export function getContextParameterValues(config, parameter) {
    return (config.context && config.context[parameter]) || [];
}
/**
 * Helper function for calculating default value for context parameter from config
 *
 * @param config
 * @param parameter
 */
export function getContextParameterDefault(config, parameter) {
    const param = getContextParameterValues(config, parameter);
    return param && param.length ? param[0] : undefined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1jb25maWctdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9zaXRlLWNvbnRleHQvY29uZmlnL2NvbnRleHQtY29uZmlnLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSx5QkFBeUIsQ0FDdkMsTUFBeUIsRUFDekIsU0FBaUI7SUFFakIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUM3RCxDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsMEJBQTBCLENBQ3hDLE1BQXlCLEVBQ3pCLFNBQWlCO0lBRWpCLE1BQU0sS0FBSyxHQUFHLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUMzRCxPQUFPLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUN0RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgU2l0ZUNvbnRleHRDb25maWcgfSBmcm9tICcuL3NpdGUtY29udGV4dC1jb25maWcnO1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiBmb3Igc2FmZWx5IGdldHRpbmcgY29udGV4dCBwYXJhbWV0ZXIgY29uZmlnXG4gKlxuICogQHBhcmFtIGNvbmZpZ1xuICogQHBhcmFtIHBhcmFtZXRlclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGV4dFBhcmFtZXRlclZhbHVlcyhcbiAgY29uZmlnOiBTaXRlQ29udGV4dENvbmZpZyxcbiAgcGFyYW1ldGVyOiBzdHJpbmdcbik6IHN0cmluZ1tdIHtcbiAgcmV0dXJuIChjb25maWcuY29udGV4dCAmJiBjb25maWcuY29udGV4dFtwYXJhbWV0ZXJdKSB8fCBbXTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGNhbGN1bGF0aW5nIGRlZmF1bHQgdmFsdWUgZm9yIGNvbnRleHQgcGFyYW1ldGVyIGZyb20gY29uZmlnXG4gKlxuICogQHBhcmFtIGNvbmZpZ1xuICogQHBhcmFtIHBhcmFtZXRlclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGV4dFBhcmFtZXRlckRlZmF1bHQoXG4gIGNvbmZpZzogU2l0ZUNvbnRleHRDb25maWcsXG4gIHBhcmFtZXRlcjogc3RyaW5nXG4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBjb25zdCBwYXJhbSA9IGdldENvbnRleHRQYXJhbWV0ZXJWYWx1ZXMoY29uZmlnLCBwYXJhbWV0ZXIpO1xuICByZXR1cm4gcGFyYW0gJiYgcGFyYW0ubGVuZ3RoID8gcGFyYW1bMF0gOiB1bmRlZmluZWQ7XG59XG4iXX0=