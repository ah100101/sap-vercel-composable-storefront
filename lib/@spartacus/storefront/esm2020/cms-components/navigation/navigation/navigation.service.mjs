/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { combineLatest, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class NavigationService {
    constructor(cmsService, semanticPathService) {
        this.cmsService = cmsService;
        this.semanticPathService = semanticPathService;
    }
    createNavigation(data$) {
        return combineLatest([data$, this.getNavigationNode(data$)]).pipe(map(([data, nav]) => {
            return {
                title: data.name,
                children: [nav],
            };
        }));
    }
    /**
     * returns an observable with the `NavigationNode` for the given `CmsNavigationComponent`.
     * This function will load the navigation underlying entries and children if they haven't been
     * loaded so far.
     */
    getNavigationNode(data$) {
        if (!data$) {
            return of();
        }
        return data$.pipe(filter((data) => !!data), switchMap((data) => {
            const navigation = data.navigationNode ? data.navigationNode : data;
            return this.cmsService
                .getNavigationEntryItems(navigation.uid ?? '')
                .pipe(tap((items) => {
                if (items === undefined) {
                    this.loadNavigationEntryItems(navigation, true);
                    return;
                }
                // we should check whether the existing node items are what expected
                const expectedItems = [];
                this.loadNavigationEntryItems(navigation, false, expectedItems);
                const existingItems = Object.keys(items).map((key) => items[key].uid ?? '');
                const missingItems = expectedItems.filter((it) => it.id && !existingItems.includes(it.id));
                if (missingItems.length > 0) {
                    this.cmsService.loadNavigationItems(navigation.uid ?? '', missingItems);
                }
            }), filter(Boolean), map((items) => this.populateNavigationNode(navigation, items) ?? {}));
        }));
    }
    /**
     * Loads all navigation entry items' type and id. Dispatch action to load all these items
     * @param nodeData
     * @param root
     * @param itemsList
     */
    loadNavigationEntryItems(nodeData, root, itemsList = []) {
        if (nodeData.entries && nodeData.entries.length > 0) {
            nodeData.entries.forEach((entry) => {
                itemsList.push({
                    superType: entry.itemSuperType,
                    id: entry.itemId,
                });
            });
        }
        if (nodeData.children && nodeData.children.length > 0) {
            nodeData.children.forEach((child) => this.loadNavigationEntryItems(child, false, itemsList));
        }
        if (root && nodeData.uid) {
            this.cmsService.loadNavigationItems(nodeData.uid, itemsList);
        }
    }
    /**
     * Create a new node tree for the view
     * @param nodeData
     * @param items
     */
    populateNavigationNode(nodeData, items) {
        const node = {};
        if (nodeData.title) {
            // the node title will be populated by the first entry (if any)
            // if there's no nodeData.title available
            node.title = nodeData.title;
        }
        // populate style classes to apply CMS driven styling
        if (nodeData.styleClasses) {
            node.styleClasses = nodeData.styleClasses;
        }
        // populate style attributes to apply CMS driven styling
        if (nodeData.styleAttributes) {
            node.styleAttributes = nodeData.styleAttributes;
        }
        if (nodeData.entries && nodeData.entries.length > 0) {
            this.populateLink(node, nodeData.entries[0], items);
        }
        if (nodeData.children?.length > 0) {
            const children = nodeData.children
                .map((child) => this.populateNavigationNode(child, items))
                .filter(Boolean);
            if (children.length > 0) {
                node.children = children;
            }
        }
        // return null in case there are no children
        return Object.keys(node).length === 0 ? null : node;
    }
    /**
     * The node link is driven by the first entry.
     */
    populateLink(node, entry, items) {
        const item = items[`${entry.itemId}_${entry.itemSuperType}`];
        // now we only consider CMSLinkComponent
        if (item && entry.itemType === 'CMSLinkComponent') {
            if (!node.title) {
                node.title = item.linkName;
            }
            const url = this.getLink(item);
            // only populate the node link if we have a visible node
            if (node.title && url) {
                node.url = url;
                // the backend provide boolean value for the target
                // in case the link should be opened in a new window
                if (item.target === 'true' || item.target === true) {
                    node.target = '_blank';
                }
            }
            // populate style classes to apply CMS driven styling
            if (item.styleClasses) {
                node.styleClasses = item.styleClasses;
            }
            // populate style attributes to apply CMS driven styling
            if (item.styleAttributes) {
                node.styleAttributes = item.styleAttributes;
            }
        }
    }
    /**
     *
     * Gets the URL or link to a related item (category),
     * also taking into account content pages (contentPageLabelOrId)
     * and product pages (productCode)
     */
    getLink(item) {
        if (item.url) {
            return item.url;
        }
        else if (item.contentPageLabelOrId) {
            return item.contentPageLabelOrId;
        }
        else if (item.categoryCode) {
            return this.semanticPathService.transform({
                cxRoute: 'category',
                params: {
                    code: item.categoryCode,
                    name: item.name,
                },
            });
        }
        else if (item.productCode) {
            return this.semanticPathService.transform({
                cxRoute: 'product',
                params: {
                    code: item.productCode,
                    name: item.name,
                },
            });
        }
    }
}
NavigationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: NavigationService, deps: [{ token: i1.CmsService }, { token: i1.SemanticPathService }], target: i0.ɵɵFactoryTarget.Injectable });
NavigationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: NavigationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: NavigationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CmsService }, { type: i1.SemanticPathService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy9uYXZpZ2F0aW9uL25hdmlnYXRpb24vbmF2aWdhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTzNDLE9BQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBTTdELE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsWUFDWSxVQUFzQixFQUN0QixtQkFBd0M7UUFEeEMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO0lBQ2pELENBQUM7SUFFRyxnQkFBZ0IsQ0FDckIsS0FBeUM7UUFFekMsT0FBTyxhQUFhLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQy9ELEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQUU7WUFDbEIsT0FBTztnQkFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2hCLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQzthQUNoQixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksaUJBQWlCLENBQ3RCLEtBQXlDO1FBRXpDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixPQUFPLEVBQUUsRUFBRSxDQUFDO1NBQ2I7UUFDRCxPQUFPLEtBQUssQ0FBQyxJ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O1lBQ1osT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQ2pCO2FBQU0sSUFBSSxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDcEMsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUM7U0FDbEM7YUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO2dCQUN4QyxPQUFPLEVBQUUsVUFBVTtnQkFDbkIsTUFBTSxFQUFFO29CQUNOLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWTtvQkFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2lCQUNoQjthQUNGLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQztnQkFDeEMsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLE1BQU0sRUFBRTtvQkFDTixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVc7b0JBQ3RCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtpQkFDaEI7YUFDRixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7OzhHQTFNVSxpQkFBaUI7a0hBQWpCLGlCQUFpQixjQUZoQixNQUFNOzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDbXNOYXZpZ2F0aW9uQ29tcG9uZW50LFxuICBDbXNOYXZpZ2F0aW9uTm9kZSxcbiAgQ21zU2VydmljZSxcbiAgU2VtYW50aWNQYXRoU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uTm9kZSB9IGZyb20gJy4vbmF2aWdhdGlvbi1ub2RlLm1vZGVsJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25TZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNtc1NlcnZpY2U6IENtc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHNlbWFudGljUGF0aFNlcnZpY2U6IFNlbWFudGljUGF0aFNlcnZpY2VcbiAgKSB7fVxuXG4gIHB1YmxpYyBjcmVhdGVOYXZpZ2F0aW9uKFxuICAgIGRhdGEkOiBPYnNlcnZhYmxlPENtc05hdmlnYXRpb25Db21wb25lbnQ+XG4gICk6IE9ic2VydmFibGU8TmF2aWdhdGlvbk5vZGU+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbZGF0YSQsIHRoaXMuZ2V0TmF2aWdhdGlvbk5vZGUoZGF0YSQpXSkucGlwZShcbiAgICAgIG1hcCgoW2RhdGEsIG5hdl0pID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0aXRsZTogZGF0YS5uYW1lLFxuICAgICAgICAgIGNoaWxkcmVuOiBbbmF2XSxcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGFuIG9ic2VydmFibGUgd2l0aCB0aGUgYE5hdmlnYXRpb25Ob2RlYCBmb3IgdGhlIGdpdmVuIGBDbXNOYXZpZ2F0aW9uQ29tcG9uZW50YC5cbiAgICogVGhpcyBmdW5jdGlvbiB3aWxsIGxvYWQgdGhlIG5hdmlnYXRpb24gdW5kZXJseWluZyBlbnRyaWVzIGFuZCBjaGlsZHJlbiBpZiB0aGV5IGhhdmVuJ3QgYmVlblxuICAgKiBsb2FkZWQgc28gZmFyLlxuICAgKi9cbiAgcHVibGljIGdldE5hdmlnYXRpb25Ob2RlKFxuICAgIGRhdGEkOiBPYnNlcnZhYmxlPENtc05hdmlnYXRpb25Db21wb25lbnQ+XG4gICk6IE9ic2VydmFibGU8TmF2aWdhdGlvbk5vZGU+IHtcbiAgICBpZiAoIWRhdGEkKSB7XG4gICAgICByZXR1cm4gb2YoKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGEkLnBpcGUoXG4gICAgICBmaWx0ZXIoKGRhdGEpID0+ICEhZGF0YSksXG4gICAgICBzd2l0Y2hNYXAoKGRhdGEpID0+IHtcbiAgICAgICAgY29uc3QgbmF2aWdhdGlvbiA9IGRhdGEubmF2aWdhdGlvbk5vZGUgPyBkYXRhLm5hdmlnYXRpb25Ob2RlIDogZGF0YTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY21zU2VydmljZVxuICAgICAgICAgIC5nZXROYXZpZ2F0aW9uRW50cnlJdGVtcyhuYXZpZ2F0aW9uLnVpZCA/PyAnJylcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHRhcCgoaXRlbXMpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGl0ZW1zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWROYXZpZ2F0aW9uRW50cnlJdGVtcyhuYXZpZ2F0aW9uLCB0cnVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIGNoZWNrIHdoZXRoZXIgdGhlIGV4aXN0aW5nIG5vZGUgaXRlbXMgYXJlIHdoYXQgZXhwZWN0ZWRcbiAgICAgICAgICAgICAgY29uc3QgZXhwZWN0ZWRJdGVtczoge1xuICAgICAgICAgICAgICAgIHN1cGVyVHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIGlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIH1bXSA9IFtdO1xuICAgICAgICAgICAgICB0aGlzLmxvYWROYXZpZ2F0aW9uRW50cnlJdGVtcyhuYXZpZ2F0aW9uLCBmYWxzZSwgZXhwZWN0ZWRJdGVtcyk7XG4gICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nSXRlbXMgPSBPYmplY3Qua2V5cyhpdGVtcykubWFwKFxuICAgICAgICAgICAgICAgIChrZXkpID0+IGl0ZW1zW2tleV0udWlkID8/ICcnXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGNvbnN0IG1pc3NpbmdJdGVtcyA9IGV4cGVjdGVkSXRlbXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgIChpdCkgPT4gaXQuaWQgJiYgIWV4aXN0aW5nSXRlbXMuaW5jbHVkZXMoaXQuaWQpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmIChtaXNzaW5nSXRlbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY21zU2VydmljZS5sb2FkTmF2aWdhdGlvbkl0ZW1zKFxuICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbi51aWQgPz8gJycsXG4gICAgICAgICAgICAgICAgICBtaXNzaW5nSXRlbXNcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGZpbHRlcihCb29sZWFuKSxcbiAgICAgICAgICAgIG1hcCgoaXRlbXMpID0+IHRoaXMucG9wdWxhdGVOYXZpZ2F0aW9uTm9kZShuYXZpZ2F0aW9uLCBpdGVtcykgPz8ge30pXG4gICAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkcyBhbGwgbmF2aWdhdGlvbiBlbnRyeSBpdGVtcycgdHlwZSBhbmQgaWQuIERpc3BhdGNoIGFjdGlvbiB0byBsb2FkIGFsbCB0aGVzZSBpdGVtc1xuICAgKiBAcGFyYW0gbm9kZURhdGFcbiAgICogQHBhcmFtIHJvb3RcbiAgICogQHBhcmFtIGl0ZW1zTGlzdFxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkTmF2aWdhdGlvbkVudHJ5SXRlbXMoXG4gICAgbm9kZURhdGE6IENtc05hdmlnYXRpb25Ob2RlLFxuICAgIHJvb3Q6IGJvb2xlYW4sXG4gICAgaXRlbXNMaXN0OiB7IHN1cGVyVHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkOyBpZDogc3RyaW5nIHwgdW5kZWZpbmVkIH1bXSA9IFtdXG4gICk6IHZvaWQge1xuICAgIGlmIChub2RlRGF0YS5lbnRyaWVzICYmIG5vZGVEYXRhLmVudHJpZXMubGVuZ3RoID4gMCkge1xuICAgICAgbm9kZURhdGEuZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgICBpdGVtc0xpc3QucHVzaCh7XG4gICAgICAgICAgc3VwZXJUeXBlOiBlbnRyeS5pdGVtU3VwZXJUeXBlLFxuICAgICAgICAgIGlkOiBlbnRyeS5pdGVtSWQsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG5vZGVEYXRhLmNoaWxkcmVuICYmIG5vZGVEYXRhLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIG5vZGVEYXRhLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PlxuICAgICAgICB0aGlzLmxvYWROYXZpZ2F0aW9uRW50cnlJdGVtcyhjaGlsZCwgZmFsc2UsIGl0ZW1zTGlzdClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHJvb3QgJiYgbm9kZURhdGEudWlkKSB7XG4gICAgICB0aGlzLmNtc1NlcnZpY2UubG9hZE5hdmlnYXRpb25JdGVtcyhub2RlRGF0YS51aWQsIGl0ZW1zTGlzdCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBub2RlIHRyZWUgZm9yIHRoZSB2aWV3XG4gICAqIEBwYXJhbSBub2RlRGF0YVxuICAgKiBAcGFyYW0gaXRlbXNcbiAgICovXG4gIHByaXZhdGUgcG9wdWxhdGVOYXZpZ2F0aW9uTm9kZShcbiAgICBub2RlRGF0YTogYW55LFxuICAgIGl0ZW1zOiBhbnlcbiAgKTogTmF2aWdhdGlvbk5vZGUgfCBudWxsIHtcbiAgICBjb25zdCBub2RlOiBOYXZpZ2F0aW9uTm9kZSA9IHt9O1xuXG4gICAgaWYgKG5vZGVEYXRhLnRpdGxlKSB7XG4gICAgICAvLyB0aGUgbm9kZSB0aXRsZSB3aWxsIGJlIHBvcHVsYXRlZCBieSB0aGUgZmlyc3QgZW50cnkgKGlmIGFueSlcbiAgICAgIC8vIGlmIHRoZXJlJ3Mgbm8gbm9kZURhdGEudGl0bGUgYXZhaWxhYmxlXG4gICAgICBub2RlLnRpdGxlID0gbm9kZURhdGEudGl0bGU7XG4gICAgfVxuXG4gICAgLy8gcG9wdWxhdGUgc3R5bGUgY2xhc3NlcyB0byBhcHBseSBDTVMgZHJpdmVuIHN0eWxpbmdcbiAgICBpZiAobm9kZURhdGEuc3R5bGVDbGFzc2VzKSB7XG4gICAgICBub2RlLnN0eWxlQ2xhc3NlcyA9IG5vZGVEYXRhLnN0eWxlQ2xhc3NlcztcbiAgICB9XG4gICAgLy8gcG9wdWxhdGUgc3R5bGUgYXR0cmlidXRlcyB0byBhcHBseSBDTVMgZHJpdmVuIHN0eWxpbmdcbiAgICBpZiAobm9kZURhdGEuc3R5bGVBdHRyaWJ1dGVzKSB7XG4gICAgICBub2RlLnN0eWxlQXR0cmlidXRlcyA9IG5vZGVEYXRhLnN0eWxlQXR0cmlidXRlcztcbiAgICB9XG5cbiAgICBpZiAobm9kZURhdGEuZW50cmllcyAmJiBub2RlRGF0YS5lbnRyaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucG9wdWxhdGVMaW5rKG5vZGUsIG5vZGVEYXRhLmVudHJpZXNbMF0sIGl0ZW1zKTtcbiAgICB9XG5cbiAgICBpZiAobm9kZURhdGEuY2hpbGRyZW4/Lmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZURhdGEuY2hpbGRyZW5cbiAgICAgICAgLm1hcCgoY2hpbGQ6IGFueSkgPT4gdGhpcy5wb3B1bGF0ZU5hdmlnYXRpb25Ob2RlKGNoaWxkLCBpdGVtcykpXG4gICAgICAgIC5maWx0ZXIoQm9vbGVhbik7XG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBub2RlLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcmV0dXJuIG51bGwgaW4gY2FzZSB0aGVyZSBhcmUgbm8gY2hpbGRyZW5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMobm9kZSkubGVuZ3RoID09PSAwID8gbnVsbCA6IG5vZGU7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG5vZGUgbGluayBpcyBkcml2ZW4gYnkgdGhlIGZpcnN0IGVudHJ5LlxuICAgKi9cbiAgcHJpdmF0ZSBwb3B1bGF0ZUxpbmsobm9kZTogTmF2aWdhdGlvbk5vZGUsIGVudHJ5OiBhbnksIGl0ZW1zOiBhbnkpIHtcbiAgICBjb25zdCBpdGVtID0gaXRlbXNbYCR7ZW50cnkuaXRlbUlkfV8ke2VudHJ5Lml0ZW1TdXBlclR5cGV9YF07XG5cbiAgICAvLyBub3cgd2Ugb25seSBjb25zaWRlciBDTVNMaW5rQ29tcG9uZW50XG4gICAgaWYgKGl0ZW0gJiYgZW50cnkuaXRlbVR5cGUgPT09ICdDTVNMaW5rQ29tcG9uZW50Jykge1xuICAgICAgaWYgKCFub2RlLnRpdGxlKSB7XG4gICAgICAgIG5vZGUudGl0bGUgPSBpdGVtLmxpbmtOYW1lO1xuICAgICAgfVxuICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRMaW5rKGl0ZW0pO1xuICAgICAgLy8gb25seSBwb3B1bGF0ZSB0aGUgbm9kZSBsaW5rIGlmIHdlIGhhdmUgYSB2aXNpYmxlIG5vZGVcbiAgICAgIGlmIChub2RlLnRpdGxlICYmIHVybCkge1xuICAgICAgICBub2RlLnVybCA9IHVybDtcbiAgICAgICAgLy8gdGhlIGJhY2tlbmQgcHJvdmlkZSBib29sZWFuIHZhbHVlIGZvciB0aGUgdGFyZ2V0XG4gICAgICAgIC8vIGluIGNhc2UgdGhlIGxpbmsgc2hvdWxkIGJlIG9wZW5lZCBpbiBhIG5ldyB3aW5kb3dcbiAgICAgICAgaWYgKGl0ZW0udGFyZ2V0ID09PSAndHJ1ZScgfHwgaXRlbS50YXJnZXQgPT09IHRydWUpIHtcbiAgICAgICAgICBub2RlLnRhcmdldCA9ICdfYmxhbmsnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBwb3B1bGF0ZSBzdHlsZSBjbGFzc2VzIHRvIGFwcGx5IENNUyBkcml2ZW4gc3R5bGluZ1xuICAgICAgaWYgKGl0ZW0uc3R5bGVDbGFzc2VzKSB7XG4gICAgICAgIG5vZGUuc3R5bGVDbGFzc2VzID0gaXRlbS5zdHlsZUNsYXNzZXM7XG4gICAgICB9XG4gICAgICAvLyBwb3B1bGF0ZSBzdHlsZSBhdHRyaWJ1dGVzIHRvIGFwcGx5IENNUyBkcml2ZW4gc3R5bGluZ1xuICAgICAgaWYgKGl0ZW0uc3R5bGVBdHRyaWJ1dGVzKSB7XG4gICAgICAgIG5vZGUuc3R5bGVBdHRyaWJ1dGVzID0gaXRlbS5zdHlsZUF0dHJpYnV0ZXM7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEdldHMgdGhlIFVSTCBvciBsaW5rIHRvIGEgcmVsYXRlZCBpdGVtIChjYXRlZ29yeSksXG4gICAqIGFsc28gdGFraW5nIGludG8gYWNjb3VudCBjb250ZW50IHBhZ2VzIChjb250ZW50UGFnZUxhYmVsT3JJZClcbiAgICogYW5kIHByb2R1Y3QgcGFnZXMgKHByb2R1Y3RDb2RlKVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldExpbmsoaXRlbTogYW55KTogc3RyaW5nIHwgc3RyaW5nW10gfCB1bmRlZmluZWQge1xuICAgIGlmIChpdGVtLnVybCkge1xuICAgICAgcmV0dXJuIGl0ZW0udXJsO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5jb250ZW50UGFnZUxhYmVsT3JJZCkge1xuICAgICAgcmV0dXJuIGl0ZW0uY29udGVudFBhZ2VMYWJlbE9ySWQ7XG4gICAgfSBlbHNlIGlmIChpdGVtLmNhdGVnb3J5Q29kZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc2VtYW50aWNQYXRoU2VydmljZS50cmFuc2Zvcm0oe1xuICAgICAgICBjeFJvdXRlOiAnY2F0ZWdvcnknLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBjb2RlOiBpdGVtLmNhdGVnb3J5Q29kZSxcbiAgICAgICAgICBuYW1lOiBpdGVtLm5hbWUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGl0ZW0ucHJvZHVjdENvZGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnNlbWFudGljUGF0aFNlcnZpY2UudHJhbnNmb3JtKHtcbiAgICAgICAgY3hSb3V0ZTogJ3Byb2R1Y3QnLFxuICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICBjb2RlOiBpdGVtLnByb2R1Y3RDb2RlLFxuICAgICAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG4vLyBDSEVDSyBTT05BUlxuIl19