/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The ltr and rtl directions can be used to configure the storefront for a certain direction, both statically
 * or dynamically.
 *
 * The HTML5 "auto" value is not supported in Spartacus, as it's considered to be too fragile for the global
 * direction.
 */
export var DirectionMode;
(function (DirectionMode) {
    /**
     * Indicates Left to Right direction.
     */
    DirectionMode["LTR"] = "ltr";
    /**
     * Indicates Right to Left direction.
     */
    DirectionMode["RTL"] = "rtl";
})(DirectionMode || (DirectionMode = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aW9uLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9sYXlvdXQvZGlyZWN0aW9uL2NvbmZpZy9kaXJlY3Rpb24ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVIOzs7Ozs7R0FNRztBQUNILE1BQU0sQ0FBTixJQUFZLGFBU1g7QUFURCxXQUFZLGFBQWE7SUFDdkI7O09BRUc7SUFDSCw0QkFBVyxDQUFBO0lBQ1g7O09BRUc7SUFDSCw0QkFBVyxDQUFBO0FBQ2IsQ0FBQyxFQVRXLGFBQWEsS0FBYixhQUFhLFFBU3hCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuLyoqXG4gKiBUaGUgbHRyIGFuZCBydGwgZGlyZWN0aW9ucyBjYW4gYmUgdXNlZCB0byBjb25maWd1cmUgdGhlIHN0b3JlZnJvbnQgZm9yIGEgY2VydGFpbiBkaXJlY3Rpb24sIGJvdGggc3RhdGljYWxseVxuICogb3IgZHluYW1pY2FsbHkuXG4gKlxuICogVGhlIEhUTUw1IFwiYXV0b1wiIHZhbHVlIGlzIG5vdCBzdXBwb3J0ZWQgaW4gU3BhcnRhY3VzLCBhcyBpdCdzIGNvbnNpZGVyZWQgdG8gYmUgdG9vIGZyYWdpbGUgZm9yIHRoZSBnbG9iYWxcbiAqIGRpcmVjdGlvbi5cbiAqL1xuZXhwb3J0IGVudW0gRGlyZWN0aW9uTW9kZSB7XG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgTGVmdCB0byBSaWdodCBkaXJlY3Rpb24uXG4gICAqL1xuICBMVFIgPSAnbHRyJyxcbiAgLyoqXG4gICAqIEluZGljYXRlcyBSaWdodCB0byBMZWZ0IGRpcmVjdGlvbi5cbiAgICovXG4gIFJUTCA9ICdydGwnLFxufVxuXG4vKipcbiAqIENvbnRhaW5zIHRoZSBjb25maWd1cmF0aW9uIG1vZGUgZm9yIGxhbmd1YWdlIGRyaXZlbiBkaXJlY3Rpb25hbGl0eS4gVGhlIGRldGVjdCBtb2RlIGlzIHJlY29tbWVuZGVkXG4gKiBmb3IgYSBtdWx0aS1zaXRlIG9yIG11bHRpLWxpbmd1YWwgc2V0dXAgd2hlcmUgdGhlIGFjdGl2ZSBsYW5ndWFnZSBzaG91bGQgZGljdGF0ZSB0aGUgZGlyZWN0aW9uIG1vZGUuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgRGlyZWN0aW9uIHtcbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGRpcmVjdGlvbiBtb2RlIGlzIHVzZWQgZm9yIHRoZSBkaXJlY3Rpb24gbW9kZSBvZiB0aGUgb3ZlcmFsbCBzdG9yZWZyb250LiBUaGUgZGVmYXVsdCBtb2RlXG4gICAqIGNhbiBiZSB1c2VkIGZvciBhbGwgbGFuZ3VhZ2VzLCBidXQgY2FuIGJlIGZ1cnRoZXIgZW5oYW5jZWQgZHluYW1pY2FsbHkgYnkgdXNpbmcgdGhlIGxhbmd1YWdlIGRldGVjdCBtb2RlLlxuICAgKiBUaGUgZGVmYXVsdCBtb2RlIHdpbGwgYWxzbyBiZSB1c2VkIGluIGRldGVjdCBtb2RlIGZvciB0aG9zZSBsYW5ndWFnZXMgdGhhdCBhcmUgbm90IGxpc3RlZCBpbiBlaXRoZXJcbiAgICogYHJ0bExhbmd1YWdlc2Agb3IgYGx0ckxhbmd1YWdlc2AuXG4gICAqL1xuICBkZWZhdWx0PzogRGlyZWN0aW9uTW9kZTtcblxuICAvKipcbiAgICogSWYgZGV0ZWN0IGlzIGVuYWJsZWQsIHRoZSBkaXJlY3Rpb24gaXMgZHJpdmVuIGJ5IHRoZSBhY3RpdmUgbGFuZ3VhZ2UuIFRoZSBsYW5ndWFnZSBpcyBjb21wYXJlZCB0byB0aGVcbiAgICogbGlzdCBvZiBjb25maWd1cmVkIGBydGxMYW5ndWFnZXNgIHZzIGBsdHJMYW5ndWFnZXNgLiBJZiBubyBsYW5ndWFnZSBpcyByZXNvbHZlZCwgdGhlIGRlZmF1bHQgZGlyZWN0aW9uXG4gICAqIG1vZGUgaXMgdXNlZC5cbiAgICpcbiAgICogSWYgbm8gZGlyZWN0aW9uIGNhbiBiZSByZXNvbHZlZCwgdGhlIGRpcmVjdGlvbiBpcyByZW1vdmVkLlxuICAgKi9cbiAgZGV0ZWN0PzogYm9vbGVhbjtcblxuICAvKipcbiAgICogVGhlIGxhbmd1YWdlIGlzb0NvZGVzIHRoYXQgYXJlIHVzZWQgdG8gZGV0ZWN0IFJpZ2h0IHRvIExlZnQgbGFuZ3VhZ2VzLlxuICAgKi9cbiAgcnRsTGFuZ3VhZ2VzPzogc3RyaW5nW107XG5cbiAgLyoqXG4gICAqIFRoZSBsYW5ndWFnZSBpc29Db2RlcyB0aGF0IGFyZSB1c2VkIHRvIGRldGVjdCBMZWZ0IHRvIFJpZ2h0IGxhbmd1YWdlcy5cbiAgICovXG4gIGx0ckxhbmd1YWdlcz86IHN0cmluZ1tdO1xufVxuIl19