/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { InjectionToken } from '@angular/core';
/**
 * Injection token to extend schema builders for adding structural data (json-ld).
 *
 * Some builders (i.e. `JSONLD_PRODUCT_BUILDER`) might have additional
 * lower level builder to further extend the schema.
 */
export const SCHEMA_BUILDER = new InjectionToken('SchemaBuilderToken');
/**
 * Injection token to add specific json-ld builders for product related schemas.
 * See see https://schema.org/product for more information.
 */
export const JSONLD_PRODUCT_BUILDER = new InjectionToken('JsonLdProductBuilderToken');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtc3RydWN0dXJlL3Nlby9zdHJ1Y3R1cmVkLWRhdGEvYnVpbGRlcnMvdG9rZW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRS9DOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFdkU7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxjQUFjLENBQ3RELDJCQUEyQixDQUM1QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBJbmplY3Rpb24gdG9rZW4gdG8gZXh0ZW5kIHNjaGVtYSBidWlsZGVycyBmb3IgYWRkaW5nIHN0cnVjdHVyYWwgZGF0YSAoanNvbi1sZCkuXG4gKlxuICogU29tZSBidWlsZGVycyAoaS5lLiBgSlNPTkxEX1BST0RVQ1RfQlVJTERFUmApIG1pZ2h0IGhhdmUgYWRkaXRpb25hbFxuICogbG93ZXIgbGV2ZWwgYnVpbGRlciB0byBmdXJ0aGVyIGV4dGVuZCB0aGUgc2NoZW1hLlxuICovXG5leHBvcnQgY29uc3QgU0NIRU1BX0JVSUxERVIgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ1NjaGVtYUJ1aWxkZXJUb2tlbicpO1xuXG4vKipcbiAqIEluamVjdGlvbiB0b2tlbiB0byBhZGQgc3BlY2lmaWMganNvbi1sZCBidWlsZGVycyBmb3IgcHJvZHVjdCByZWxhdGVkIHNjaGVtYXMuXG4gKiBTZWUgc2VlIGh0dHBzOi8vc2NoZW1hLm9yZy9wcm9kdWN0IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICovXG5leHBvcnQgY29uc3QgSlNPTkxEX1BST0RVQ1RfQlVJTERFUiA9IG5ldyBJbmplY3Rpb25Ub2tlbihcbiAgJ0pzb25MZFByb2R1Y3RCdWlsZGVyVG9rZW4nXG4pO1xuIl19