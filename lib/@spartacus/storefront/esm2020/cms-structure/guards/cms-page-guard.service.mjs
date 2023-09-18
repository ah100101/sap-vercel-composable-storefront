/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PageType, SMART_EDIT_CONTEXT, SMART_EDIT_DUMMY_COMPONENT_TYPE, } from '@spartacus/core';
import { of } from 'rxjs';
import { filter, map, switchMap, take, tap, withLatestFrom, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../services/cms-routes.service";
import * as i3 from "../services/cms-i18n.service";
import * as i4 from "../services/cms-guards.service";
import * as i5 from "../services/cms-components.service";
/**
 * Helper service for `CmsPageGuard`
 */
export class CmsPageGuardService {
    constructor(semanticPathService, cmsService, cmsRoutes, cmsI18n, cmsGuards, cmsComponentsService, routing) {
        this.semanticPathService = semanticPathService;
        this.cmsService = cmsService;
        this.cmsRoutes = cmsRoutes;
        this.cmsI18n = cmsI18n;
        this.cmsGuards = cmsGuards;
        this.cmsComponentsService = cmsComponentsService;
        this.routing = routing;
    }
    /**
     * Takes CMS components types in the current CMS page, triggers (configurable) side effects and returns a boolean - whether the route can be activated.
     *
     * Based on `cmsComponents` config for the components in the page:
     * - Evaluates components' guards; if one of them emits false or UrlTree - the route cannot be activated or redirects to the given UrlTree, respectively.
     * - If all components' guards emitted true, then the route can be activated
     * - Then we trigger loading of configured i18n chunks in parallel
     * - And we register the configured children routes of cms components
     *
     * @param pageContext current cms page context
     * @param pageData cms page data
     * @param route activated route snapshot
     * @param state router state snapshot
     *
     * @returns boolean observable - whether the route can be activated
     */
    canActivatePage(pageContext, pageData, route, state) {
        return this.cmsService.getPageComponentTypes(pageContext).pipe(map((componentTypes) => pageContext.id === SMART_EDIT_CONTEXT
            ? [SMART_EDIT_DUMMY_COMPONENT_TYPE, ...componentTypes]
            : componentTypes), take(1), switchMap((componentTypes) => this.cmsComponentsService.determineMappings(componentTypes)), switchMap((componentTypes) => this.cmsGuards
            .cmsPageCanActivate(componentTypes, route, state)
            .pipe(withLatestFrom(of(componentTypes)))), tap(([canActivate, componentTypes]) => {
            if (canActivate === true) {
                this.cmsI18n.loadForComponents(componentTypes);
            }
        }), map(([canActivate, componentTypes]) => {
            const pageLabel = pageData.label || pageContext.id; // for content pages the page label returned from backend can be different than ID initially assumed from route
            if (canActivate === true && !route?.data?.cxCmsRouteContext) {
                return this.cmsRoutes.handleCmsRoutesInGuard(pageContext, componentTypes, state.url, pageLabel);
            }
            return canActivate;
        }));
    }
    /**
     * Activates the "NOT FOUND" cms page.
     *
     * It loads cms page data for the "NOT FOUND" page and puts it in the state of the the requested page label.
     * Then it processes its CMS components with the method `canActivatePage()` of this service. For more, see its docs.
     */
    canActivateNotFoundPage(pageContext, route, state) {
        const notFoundLabel = this.semanticPathService.get('notFound');
        if (!notFoundLabel) {
            return of(false);
        }
        const notFoundCmsPageContext = {
            type: PageType.CONTENT_PAGE,
            id: notFoundLabel,
        };
        return this.cmsService.getPage(notFoundCmsPageContext).pipe(switchMap((notFoundPage) => {
            if (notFoundPage) {
                return this.cmsService.getPageIndex(notFoundCmsPageContext).pipe(tap((notFoundIndex) => {
                    this.cmsService.setPageFailIndex(pageContext, notFoundIndex);
                    this.routing.changeNextPageContext(notFoundCmsPageContext);
                }), switchMap((notFoundIndex) => this.cmsService.getPageIndex(pageContext).pipe(
                // we have to wait for page index update
                filter((index) => index === notFoundIndex))), switchMap(() => this.canActivatePage(pageContext, notFoundPage, route, state)));
            }
            return of(false);
        }));
    }
}
CmsPageGuardService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CmsPageGuardService, deps: [{ token: i1.SemanticPathService }, { token: i1.CmsService }, { token: i2.CmsRoutesService }, { token: i3.CmsI18nService }, { token: i4.CmsGuardsService }, { token: i5.CmsComponentsService }, { token: i1.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
CmsPageGuardService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CmsPageGuardService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CmsPageGuardService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.SemanticPathService }, { type: i1.CmsService }, { type: i2.CmsRoutesService }, { type: i3.CmsI18nService }, { type: i4.CmsGuardsService }, { type: i5.CmsComponentsService }, { type: i1.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLXBhZ2UtZ3VhcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9ndWFyZHMvY21zLXBhZ2UtZ3VhcmQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBS0wsUUFBUSxFQUdSLGtCQUFrQixFQUNsQiwrQkFBK0IsR0FDaEMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFDTCxNQUFNLEVBQ04sR0FBRyxFQUNILFNBQVMsRUFDVCxJQUFJLEVBQ0osR0FBRyxFQUNILGNBQWMsR0FDZixNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0FBTXhCOztHQUVHO0FBSUgsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUNZLG1CQUF3QyxFQUN4QyxVQUFzQixFQUN0QixTQUEyQixFQUMzQixPQUF1QixFQUN2QixTQUEyQixFQUMzQixvQkFBMEMsRUFDMUMsT0FBdUI7UUFOdkIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQWtCO1FBQzNCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7SUFDaEMsQ0FBQztJQUVKOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILGVBQWUsQ0FDYixXQUF3QixFQUN4QixRQUFjLEVBQ2QsS0FBZ0MsRUFDaEMsS0FBMEI7UUFFMUIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixD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R0FBRyxFQUFFLENBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FDOUQsQ0FDRixDQUFDO2FBQ0g7WUFDRCxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7Z0hBOUdVLG1CQUFtQjtvSEFBbkIsbUJBQW1CLGNBRmxCLE1BQU07MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlclN0YXRlU25hcHNob3QsIFVybFRyZWUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQ21zQWN0aXZhdGVkUm91dGVTbmFwc2hvdCxcbiAgQ21zU2VydmljZSxcbiAgUGFnZSxcbiAgUGFnZUNvbnRleHQsXG4gIFBhZ2VUeXBlLFxuICBSb3V0aW5nU2VydmljZSxcbiAgU2VtYW50aWNQYXRoU2VydmljZSxcbiAgU01BUlRfRURJVF9DT05URVhULFxuICBTTUFSVF9FRElUX0RVTU1ZX0NPTVBPTkVOVF9UWVBFLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGZpbHRlcixcbiAgbWFwLFxuICBzd2l0Y2hNYXAsXG4gIHRha2UsXG4gIHRhcCxcbiAgd2l0aExhdGVzdEZyb20sXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IENtc0NvbXBvbmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY21zLWNvbXBvbmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBDbXNHdWFyZHNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY21zLWd1YXJkcy5zZXJ2aWNlJztcbmltcG9ydCB7IENtc0kxOG5TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY21zLWkxOG4uc2VydmljZSc7XG5pbXBvcnQgeyBDbXNSb3V0ZXNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY21zLXJvdXRlcy5zZXJ2aWNlJztcblxuLyoqXG4gKiBIZWxwZXIgc2VydmljZSBmb3IgYENtc1BhZ2VHdWFyZGBcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENtc1BhZ2VHdWFyZFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc2VtYW50aWNQYXRoU2VydmljZTogU2VtYW50aWNQYXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY21zU2VydmljZTogQ21zU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY21zUm91dGVzOiBDbXNSb3V0ZXNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjbXNJMThuOiBDbXNJMThuU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY21zR3VhcmRzOiBDbXNHdWFyZHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjbXNDb21wb25lbnRzU2VydmljZTogQ21zQ29tcG9uZW50c1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRpbmc6IFJvdXRpbmdTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogVGFrZXMgQ01TIGNvbXBvbmVudHMgdHlwZXMgaW4gdGhlIGN1cnJlbnQgQ01TIHBhZ2UsIHRyaWdnZXJzIChjb25maWd1cmFibGUpIHNpZGUgZWZmZWN0cyBhbmQgcmV0dXJucyBhIGJvb2xlYW4gLSB3aGV0aGVyIHRoZSByb3V0ZSBjYW4gYmUgYWN0aXZhdGVkLlxuICAgKlxuICAgKiBCYXNlZCBvbiBgY21zQ29tcG9uZW50c2AgY29uZmlnIGZvciB0aGUgY29tcG9uZW50cyBpbiB0aGUgcGFnZTpcbiAgICogLSBFdmFsdWF0ZXMgY29tcG9uZW50cycgZ3VhcmRzOyBpZiBvbmUgb2YgdGhlbSBlbWl0cyBmYWxzZSBvciBVcmxUcmVlIC0gdGhlIHJvdXRlIGNhbm5vdCBiZSBhY3RpdmF0ZWQgb3IgcmVkaXJlY3RzIHRvIHRoZSBnaXZlbiBVcmxUcmVlLCByZXNwZWN0aXZlbHkuXG4gICAqIC0gSWYgYWxsIGNvbXBvbmVudHMnIGd1YXJkcyBlbWl0dGVkIHRydWUsIHRoZW4gdGhlIHJvdXRlIGNhbiBiZSBhY3RpdmF0ZWRcbiAgICogLSBUaGVuIHdlIHRyaWdnZXIgbG9hZGluZyBvZiBjb25maWd1cmVkIGkxOG4gY2h1bmtzIGluIHBhcmFsbGVsXG4gICAqIC0gQW5kIHdlIHJlZ2lzdGVyIHRoZSBjb25maWd1cmVkIGNoaWxkcmVuIHJvdXRlcyBvZiBjbXMgY29tcG9uZW50c1xuICAgKlxuICAgKiBAcGFyYW0gcGFnZUNvbnRleHQgY3VycmVudCBjbXMgcGFnZSBjb250ZXh0XG4gICAqIEBwYXJhbSBwYWdlRGF0YSBjbXMgcGFnZSBkYXRhXG4gICAqIEBwYXJhbSByb3V0ZSBhY3RpdmF0ZWQgcm91dGUgc25hcHNob3RcbiAgICogQHBhcmFtIHN0YXRlIHJvdXRlciBzdGF0ZSBzbmFwc2hvdFxuICAgKlxuICAgKiBAcmV0dXJucyBib29sZWFuIG9ic2VydmFibGUgLSB3aGV0aGVyIHRoZSByb3V0ZSBjYW4gYmUgYWN0aXZhdGVkXG4gICAqL1xuICBjYW5BY3RpdmF0ZVBhZ2UoXG4gICAgcGFnZUNvbnRleHQ6IFBhZ2VDb250ZXh0LFxuICAgIHBhZ2VEYXRhOiBQYWdlLFxuICAgIHJvdXRlOiBDbXNBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90XG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICByZXR1cm4gdGhpcy5jbXNTZXJ2aWNlLmdldFBhZ2VDb21wb25lbnRUeXBlcyhwYWdlQ29udGV4dCkucGlwZShcbiAgICAgIG1hcCgoY29tcG9uZW50VHlwZXMpID0+XG4gICAgICAgIHBhZ2VDb250ZXh0LmlkID09PSBTTUFSVF9FRElUX0NPTlRFWFRcbiAgICAgICAgICA/IFtTTUFSVF9FRElUX0RVTU1ZX0NPTVBPTkVOVF9UWVBFLCAuLi5jb21wb25lbnRUeXBlc11cbiAgICAgICAgICA6IGNvbXBvbmVudFR5cGVzXG4gICAgICApLFxuICAgICAgdGFrZSgxKSxcbiAgICAgIHN3aXRjaE1hcCgoY29tcG9uZW50VHlwZXMpID0+XG4gICAgICAgIHRoaXMuY21zQ29tcG9uZW50c1NlcnZpY2UuZGV0ZXJtaW5lTWFwcGluZ3MoY29tcG9uZW50VHlwZXMpXG4gICAgICApLFxuICAgICAgc3dpdGNoTWFwKChjb21wb25lbnRUeXBlcykgPT5cbiAgICAgICAgdGhpcy5jbXNHdWFyZHNcbiAgICAgICAgICAuY21zUGFnZUNhbkFjdGl2YXRlKGNvbXBvbmVudFR5cGVzLCByb3V0ZSwgc3RhdGUpXG4gICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20ob2YoY29tcG9uZW50VHlwZXMpKSlcbiAgICAgICksXG4gICAgICB0YXAoKFtjYW5BY3RpdmF0ZSwgY29tcG9uZW50VHlwZXNdKSA9PiB7XG4gICAgICAgIGlmIChjYW5BY3RpdmF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHRoaXMuY21zSTE4bi5sb2FkRm9yQ29tcG9uZW50cyhjb21wb25lbnRUeXBlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbWFwKChbY2FuQWN0aXZhdGUsIGNvbXBvbmVudFR5cGVzXSkgPT4ge1xuICAgICAgICBjb25zdCBwYWdlTGFiZWwgPSBwYWdlRGF0YS5sYWJlbCB8fCBwYWdlQ29udGV4dC5pZDsgLy8gZm9yIGNvbnRlbnQgcGFnZXMgdGhlIHBhZ2UgbGFiZWwgcmV0dXJuZWQgZnJvbSBiYWNrZW5kIGNhbiBiZSBkaWZmZXJlbnQgdGhhbiBJRCBpbml0aWFsbHkgYXNzdW1lZCBmcm9tIHJvdXRlXG4gICAgICAgIGlmIChjYW5BY3RpdmF0ZSA9PT0gdHJ1ZSAmJiAhcm91dGU/LmRhdGE/LmN4Q21zUm91dGVDb250ZXh0KSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY21zUm91dGVzLmhhbmRsZUNtc1JvdXRlc0luR3VhcmQoXG4gICAgICAgICAgICBwYWdlQ29udGV4dCxcbiAgICAgICAgICAgIGNvbXBvbmVudFR5cGVzLFxuICAgICAgICAgICAgc3RhdGUudXJsLFxuICAgICAgICAgICAgcGFnZUxhYmVsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FuQWN0aXZhdGU7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQWN0aXZhdGVzIHRoZSBcIk5PVCBGT1VORFwiIGNtcyBwYWdlLlxuICAgKlxuICAgKiBJdCBsb2FkcyBjbXMgcGFnZSBkYXRhIGZvciB0aGUgXCJOT1QgRk9VTkRcIiBwYWdlIGFuZCBwdXRzIGl0IGluIHRoZSBzdGF0ZSBvZiB0aGUgdGhlIHJlcXVlc3RlZCBwYWdlIGxhYmVsLlxuICAgKiBUaGVuIGl0IHByb2Nlc3NlcyBpdHMgQ01TIGNvbXBvbmVudHMgd2l0aCB0aGUgbWV0aG9kIGBjYW5BY3RpdmF0ZVBhZ2UoKWAgb2YgdGhpcyBzZXJ2aWNlLiBGb3IgbW9yZSwgc2VlIGl0cyBkb2NzLlxuICAgKi9cbiAgY2FuQWN0aXZhdGVOb3RGb3VuZFBhZ2UoXG4gICAgcGFnZUNvbnRleHQ6IFBhZ2VDb250ZXh0LFxuICAgIHJvdXRlOiBDbXNBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LFxuICAgIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90XG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbiB8IFVybFRyZWU+IHtcbiAgICBjb25zdCBub3RGb3VuZExhYmVsID0gdGhpcy5zZW1hbnRpY1BhdGhTZXJ2aWNlLmdldCgnbm90Rm91bmQnKTtcbiAgICBpZiAoIW5vdEZvdW5kTGFiZWwpIHtcbiAgICAgIHJldHVybiBvZihmYWxzZSk7XG4gICAgfVxuICAgIGNvbnN0IG5vdEZvdW5kQ21zUGFnZUNvbnRleHQ6IFBhZ2VDb250ZXh0ID0ge1xuICAgICAgdHlwZTogUGFnZVR5cGUuQ09OVEVOVF9QQUdFLFxuICAgICAgaWQ6IG5vdEZvdW5kTGFiZWwsXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLmNtc1NlcnZpY2UuZ2V0UGFnZShub3RGb3VuZENtc1BhZ2VDb250ZXh0KS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChub3RGb3VuZFBhZ2UpID0+IHtcbiAgICAgICAgaWYgKG5vdEZvdW5kUGFnZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNtc1NlcnZpY2UuZ2V0UGFnZUluZGV4KG5vdEZvdW5kQ21zUGFnZUNvbnRleHQpLnBpcGUoXG4gICAgICAgICAgICB0YXAoKG5vdEZvdW5kSW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5jbXNTZXJ2aWNlLnNldFBhZ2VGYWlsSW5kZXgocGFnZUNvbnRleHQsIG5vdEZvdW5kSW5kZXgpO1xuICAgICAgICAgICAgICB0aGlzLnJvdXRpbmcuY2hhbmdlTmV4dFBhZ2VDb250ZXh0KG5vdEZvdW5kQ21zUGFnZUNvbnRleHQpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzd2l0Y2hNYXAoKG5vdEZvdW5kSW5kZXgpID0+XG4gICAgICAgICAgICAgIHRoaXMuY21zU2VydmljZS5nZXRQYWdlSW5kZXgocGFnZUNvbnRleHQpLnBpcGUoXG4gICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byB3YWl0IGZvciBwYWdlIGluZGV4IHVwZGF0ZVxuICAgICAgICAgICAgICAgIGZpbHRlcigoaW5kZXgpID0+IGluZGV4ID09PSBub3RGb3VuZEluZGV4KVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgc3dpdGNoTWFwKCgpID0+XG4gICAgICAgICAgICAgIHRoaXMuY2FuQWN0aXZhdGVQYWdlKHBhZ2VDb250ZXh0LCBub3RGb3VuZFBhZ2UsIHJvdXRlLCBzdGF0ZSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvZihmYWxzZSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==