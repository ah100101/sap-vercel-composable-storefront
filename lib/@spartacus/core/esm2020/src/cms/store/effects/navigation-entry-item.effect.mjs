/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, mergeMap, take } from 'rxjs/operators';
import { normalizeHttpError } from '../../../util/normalize-http-error';
import { isNotUndefined } from '../../../util/type-guards';
import { CmsActions } from '../actions/index';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/effects";
import * as i2 from "../../connectors/component/cms-component.connector";
import * as i3 from "../../../routing/index";
export class NavigationEntryItemEffects {
    // We only consider 3 item types: cms page, cms component, and media.
    getIdListByItemType(itemList) {
        const pageIds = [];
        const componentIds = [];
        const mediaIds = [];
        itemList.forEach((item) => {
            if (item.superType === 'AbstractCMSComponent') {
                componentIds.push(item.id);
            }
            else if (item.superType === 'AbstractPage') {
                pageIds.push(item.id);
            }
            else if (item.superType === 'AbstractMedia') {
                mediaIds.push(item.id);
            }
        });
        return { pageIds: pageIds, componentIds: componentIds, mediaIds: mediaIds };
    }
    constructor(actions$, cmsComponentConnector, routingService) {
        this.actions$ = actions$;
        this.cmsComponentConnector = cmsComponentConnector;
        this.routingService = routingService;
        this.loadNavigationItems$ = createEffect(() => this.actions$.pipe(ofType(CmsActions.LOAD_CMS_NAVIGATION_ITEMS), map((action) => action.payload), map((payload) => {
            return {
                ids: this.getIdListByItemType(payload.items),
                nodeId: payload.nodeId,
            };
        }), mergeMap((data) => {
            if (data.ids.componentIds.length > 0) {
                return this.routingService.getRouterState().pipe(filter(isNotUndefined), map((routerState) => routerState.state.context), take(1), mergeMap((pageContext) => 
                // download all items in one request
                this.cmsComponentConnector
                    .getList(data.ids.componentIds, pageContext)
                    .pipe(map((components) => new CmsActions.LoadCmsNavigationItemsSuccess({
                    nodeId: data.nodeId,
                    components: components,
                })), catchError((error) => of(new CmsActions.LoadCmsNavigationItemsFail(data.nodeId, normalizeHttpError(error)))))));
                //} else if (data.ids.pageIds.length > 0) {
                // TODO: future work
                // dispatch action to load cms page one by one
                //} else if (data.ids.mediaIds.length > 0) {
                // TODO: future work
                // send request to get list of media
            }
            else {
                return of(new CmsActions.LoadCmsNavigationItemsFail(data.nodeId, 'navigation nodes are empty'));
            }
        })));
    }
}
NavigationEntryItemEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: NavigationEntryItemEffects, deps: [{ token: i1.Actions }, { token: i2.CmsComponentConnector }, { token: i3.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
NavigationEntryItemEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: NavigationEntryItemEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: NavigationEntryItemEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.Actions }, { type: i2.CmsComponentConnector }, { type: i3.RoutingService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1lbnRyeS1pdGVtLmVmZmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2Ntcy9zdG9yZS9lZmZlY3RzL25hdmlnYXRpb24tZW50cnktaXRlbS5lZmZlY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFXLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUUzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBRzlDLE1BQU0sT0FBTywwQkFBMEI7SUE2RHJDLHFFQUFxRTtJQUNyRSxtQkFBbUIsQ0FBQyxRQUFlO1FBS2pDLE1BQU0sT0FBTyxHQUFhLEVBQUUsQ0FBQztRQUM3QixNQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7UUFDbEMsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO1FBRTlCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssc0JBQXNCLEVBQUU7Z0JBQzdDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzVCO2lCQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxjQUFjLEVBQUU7Z0JBQzVDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZCO2lCQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxlQUFlLEVBQUU7Z0JBQzdDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQztJQUM5RSxDQUFDO0lBRUQsWUFDVSxRQUFpQixFQUNqQixxQkFBNEMsRUFDNUMsY0FBOEI7UUFGOUIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQiwwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQXJGeEMseUJBQW9CLEdBR2hCLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQ2hCLE1BQU0sQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsRUFDNUMsR0FBRyxDQUFDLENBQUMsTUFBeUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUNsRSxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNkLE9BQU87Z0JBQ0wsR0FBRyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUM1QyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU07YUFDdkIsQ0FBQztRQUNKLENBQUMsQ0FBQyxFQUNGLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2hCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDcEMsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FDOUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUN0QixHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQy9DLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDdkIsb0NBQW9DO2dCQUNwQyxJQUFJLENBQUMscUJBQXFCO3FCQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO3FCQUMzQyxJQUFJLENBQ0gsR0FBRyxDQUNELENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FDYixJQUFJLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQztvQkFDM0MsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixVQUFVLEVBQUUsVUFBVTtpQkFDdkIsQ0FBQyxDQUNMLEVBQ0QsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDbkIsRUFBRSxDQUNBLElBQUksVUFBVSxDQUFDLDBCQUEwQixDQUN2QyxJQUFJLENBQUMsTUFBTSxFQUNYLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUMxQixDQUNGLENBQ0YsQ0FDRixDQUNKLENBQ0YsQ0FBQztnQkFDRiwyQ0FBMkM7Z0JBQzNDLG9CQUFvQjtnQkFDcEIsOENBQThDO2dCQUM5Qyw0Q0FBNEM7Z0JBQzVDLG9CQUFvQjtnQkFDcEIsb0NBQW9DO2FBQ3JDO2lCQUFNO2dCQUNMLE9BQU8sRUFBRSxDQUNQLElBQUksVUFBVSxDQUFDLDBCQUEwQixDQUN2QyxJQUFJLENBQUMsTUFBTSxFQUNYLDRCQUE0QixDQUM3QixDQUNGLENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUNILENBQ0YsQ0FBQztJQTRCQyxDQUFDOzt1SEF2Rk8sMEJBQTBCOzJIQUExQiwwQkFBMEI7MkZBQTFCLDBCQUEwQjtrQkFEdEMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGlvbnMsIGNyZWF0ZUVmZmVjdCwgb2ZUeXBlIH0gZnJvbSAnQG5ncngvZWZmZWN0cyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgZmlsdGVyLCBtYXAsIG1lcmdlTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUm91dGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9yb3V0aW5nL2luZGV4JztcbmltcG9ydCB7IG5vcm1hbGl6ZUh0dHBFcnJvciB9IGZyb20gJy4uLy4uLy4uL3V0aWwvbm9ybWFsaXplLWh0dHAtZXJyb3InO1xuaW1wb3J0IHsgaXNOb3RVbmRlZmluZWQgfSBmcm9tICcuLi8uLi8uLi91dGlsL3R5cGUtZ3VhcmRzJztcbmltcG9ydCB7IENtc0NvbXBvbmVudENvbm5lY3RvciB9IGZyb20gJy4uLy4uL2Nvbm5lY3RvcnMvY29tcG9uZW50L2Ntcy1jb21wb25lbnQuY29ubmVjdG9yJztcbmltcG9ydCB7IENtc0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2luZGV4JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25FbnRyeUl0ZW1FZmZlY3RzIHtcbiAgbG9hZE5hdmlnYXRpb25JdGVtcyQ6IE9ic2VydmFibGU8XG4gICAgfCBDbXNBY3Rpb25zLkxvYWRDbXNOYXZpZ2F0aW9uSXRlbXNTdWNjZXNzXG4gICAgfCBDbXNBY3Rpb25zLkxvYWRDbXNOYXZpZ2F0aW9uSXRlbXNGYWlsXG4gID4gPSBjcmVhdGVFZmZlY3QoKCkgPT5cbiAgICB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gICAgICBvZlR5cGUoQ21zQWN0aW9ucy5MT0FEX0NNU19OQVZJR0FUSU9OX0lURU1TKSxcbiAgICAgIG1hcCgoYWN0aW9uOiBDbXNBY3Rpb25zLkxvYWRDbXNOYXZpZ2F0aW9uSXRlbXMpID0+IGFjdGlvbi5wYXlsb2FkKSxcbiAgICAgIG1hcCgocGF5bG9hZCkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkczogdGhpcy5nZXRJZExpc3RCeUl0ZW1UeXBlKHBheWxvYWQuaXRlbXMpLFxuICAgICAgICAgIG5vZGVJZDogcGF5bG9hZC5ub2RlSWQsXG4gICAgICAgIH07XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGlmIChkYXRhLmlkcy5jb21wb25lbnRJZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdldFJvdXRlclN0YXRlKCkucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihpc05vdFVuZGVmaW5lZCksXG4gICAgICAgICAgICBtYXAoKHJvdXRlclN0YXRlKSA9PiByb3V0ZXJTdGF0ZS5zdGF0ZS5jb250ZXh0KSxcbiAgICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgICBtZXJnZU1hcCgocGFnZUNvbnRleHQpID0+XG4gICAgICAgICAgICAgIC8vIGRvd25sb2FkIGFsbCBpdGVtcyBpbiBvbmUgcmVxdWVzdFxuICAgICAgICAgICAgICB0aGlzLmNtc0NvbXBvbmVudENvbm5lY3RvclxuICAgICAgICAgICAgICAgIC5nZXRMaXN0KGRhdGEuaWRzLmNvbXBvbmVudElkcywgcGFnZUNvbnRleHQpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICBtYXAoXG4gICAgICAgICAgICAgICAgICAgIChjb21wb25lbnRzKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBDbXNBY3Rpb25zLkxvYWRDbXNOYXZpZ2F0aW9uSXRlbXNTdWNjZXNzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVJZDogZGF0YS5ub2RlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRzOiBjb21wb25lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+XG4gICAgICAgICAgICAgICAgICAgIG9mKFxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBDbXNBY3Rpb25zLkxvYWRDbXNOYXZpZ2F0aW9uSXRlbXNGYWlsKFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5ub2RlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVIdHRwRXJyb3IoZXJyb3IpXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgICAgLy99IGVsc2UgaWYgKGRhdGEuaWRzLnBhZ2VJZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIC8vIFRPRE86IGZ1dHVyZSB3b3JrXG4gICAgICAgICAgLy8gZGlzcGF0Y2ggYWN0aW9uIHRvIGxvYWQgY21zIHBhZ2Ugb25lIGJ5IG9uZVxuICAgICAgICAgIC8vfSBlbHNlIGlmIChkYXRhLmlkcy5tZWRpYUlkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy8gVE9ETzogZnV0dXJlIHdvcmtcbiAgICAgICAgICAvLyBzZW5kIHJlcXVlc3QgdG8gZ2V0IGxpc3Qgb2YgbWVkaWFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb2YoXG4gICAgICAgICAgICBuZXcgQ21zQWN0aW9ucy5Mb2FkQ21zTmF2aWdhdGlvbkl0ZW1zRmFpbChcbiAgICAgICAgICAgICAgZGF0YS5ub2RlSWQsXG4gICAgICAgICAgICAgICduYXZpZ2F0aW9uIG5vZGVzIGFyZSBlbXB0eSdcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIClcbiAgKTtcblxuICAvLyBXZSBvbmx5IGNvbnNpZGVyIDMgaXRlbSB0eXBlczogY21zIHBhZ2UsIGNtcyBjb21wb25lbnQsIGFuZCBtZWRpYS5cbiAgZ2V0SWRMaXN0QnlJdGVtVHlwZShpdGVtTGlzdDogYW55W10pOiB7XG4gICAgcGFnZUlkczogc3RyaW5nW107XG4gICAgY29tcG9uZW50SWRzOiBzdHJpbmdbXTtcbiAgICBtZWRpYUlkczogc3RyaW5nW107XG4gIH0ge1xuICAgIGNvbnN0IHBhZ2VJZHM6IHN0cmluZ1tdID0gW107XG4gICAgY29uc3QgY29tcG9uZW50SWRzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGNvbnN0IG1lZGlhSWRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaXRlbUxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0uc3VwZXJUeXBlID09PSAnQWJzdHJhY3RDTVNDb21wb25lbnQnKSB7XG4gICAgICAgIGNvbXBvbmVudElkcy5wdXNoKGl0ZW0uaWQpO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLnN1cGVyVHlwZSA9PT0gJ0Fic3RyYWN0UGFnZScpIHtcbiAgICAgICAgcGFnZUlkcy5wdXNoKGl0ZW0uaWQpO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLnN1cGVyVHlwZSA9PT0gJ0Fic3RyYWN0TWVkaWEnKSB7XG4gICAgICAgIG1lZGlhSWRzLnB1c2goaXRlbS5pZCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHsgcGFnZUlkczogcGFnZUlkcywgY29tcG9uZW50SWRzOiBjb21wb25lbnRJZHMsIG1lZGlhSWRzOiBtZWRpYUlkcyB9O1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhY3Rpb25zJDogQWN0aW9ucyxcbiAgICBwcml2YXRlIGNtc0NvbXBvbmVudENvbm5lY3RvcjogQ21zQ29tcG9uZW50Q29ubmVjdG9yLFxuICAgIHByaXZhdGUgcm91dGluZ1NlcnZpY2U6IFJvdXRpbmdTZXJ2aWNlXG4gICkge31cbn1cbiJdfQ==