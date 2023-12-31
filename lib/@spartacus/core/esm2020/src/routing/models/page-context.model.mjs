/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The homepage id for the CMS homepage is not required when we query the backend.
 * CMS business users can have multiple pages, that they might switch quickly without
 * changing the page id. Therefore, we use a constant to keep track of the page in the
 * store, but are able to ignore the id while querying the backend.
 */
export const HOME_PAGE_CONTEXT = '__HOMEPAGE__';
/**
 * SmartEdit preview page is loaded by previewToken which is added by interceptor
 */
export const SMART_EDIT_CONTEXT = 'smartedit-preview';
export class PageContext {
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1jb250ZXh0Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvcm91dGluZy9tb2RlbHMvcGFnZS1jb250ZXh0Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFJSDs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLGlCQUFpQixHQUFHLGNBQWMsQ0FBQztBQUVoRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLG1CQUFtQixDQUFDO0FBRXRELE1BQU0sT0FBTyxXQUFXO0lBSXRCLFlBQVksRUFBVSxFQUFFLElBQWU7UUFDckMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBQYWdlVHlwZSB9IGZyb20gJy4uLy4uL21vZGVsL2Ntcy5tb2RlbCc7XG5cbi8qKlxuICogVGhlIGhvbWVwYWdlIGlkIGZvciB0aGUgQ01TIGhvbWVwYWdlIGlzIG5vdCByZXF1aXJlZCB3aGVuIHdlIHF1ZXJ5IHRoZSBiYWNrZW5kLlxuICogQ01TIGJ1c2luZXNzIHVzZXJzIGNhbiBoYXZlIG11bHRpcGxlIHBhZ2VzLCB0aGF0IHRoZXkgbWlnaHQgc3dpdGNoIHF1aWNrbHkgd2l0aG91dFxuICogY2hhbmdpbmcgdGhlIHBhZ2UgaWQuIFRoZXJlZm9yZSwgd2UgdXNlIGEgY29uc3RhbnQgdG8ga2VlcCB0cmFjayBvZiB0aGUgcGFnZSBpbiB0aGVcbiAqIHN0b3JlLCBidXQgYXJlIGFibGUgdG8gaWdub3JlIHRoZSBpZCB3aGlsZSBxdWVyeWluZyB0aGUgYmFja2VuZC5cbiAqL1xuZXhwb3J0IGNvbnN0IEhPTUVfUEFHRV9DT05URVhUID0gJ19fSE9NRVBBR0VfXyc7XG5cbi8qKlxuICogU21hcnRFZGl0IHByZXZpZXcgcGFnZSBpcyBsb2FkZWQgYnkgcHJldmlld1Rva2VuIHdoaWNoIGlzIGFkZGVkIGJ5IGludGVyY2VwdG9yXG4gKi9cbmV4cG9ydCBjb25zdCBTTUFSVF9FRElUX0NPTlRFWFQgPSAnc21hcnRlZGl0LXByZXZpZXcnO1xuXG5leHBvcnQgY2xhc3MgUGFnZUNvbnRleHQge1xuICBpZDogc3RyaW5nO1xuICB0eXBlPzogUGFnZVR5cGU7XG5cbiAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgdHlwZT86IFBhZ2VUeXBlKSB7XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cbn1cbiJdfQ==