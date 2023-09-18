/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, HostListener, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../cms-structure/page/model/cms-component-data";
import * as i2 from "@angular/router";
import * as i3 from "@angular/common";
import * as i4 from "../../../shared/pipes/suplement-hash-anchors/supplement-hash-anchors.pipe";
export class ParagraphComponent {
    handleClick(event) {
        if (event.target instanceof HTMLAnchorElement) {
            const element = event.target;
            const href = element?.getAttribute('href');
            const documentHost = element.ownerDocument.URL.split('://')[1].split('/')[0];
            // Use router for internal link navigation
            if (href && documentHost === element.host) {
                event.preventDefault();
                this.router.navigateByUrl(href);
            }
        }
    }
    constructor(component, router) {
        this.component = component;
        this.router = router;
    }
}
ParagraphComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ParagraphComponent, deps: [{ token: i1.CmsComponentData }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Component });
ParagraphComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: ParagraphComponent, selector: "cx-paragraph", host: { listeners: { "click": "handleClick($event)" } }, ngImport: i0, template: "<div\n  *ngIf=\"component.data$ | async as data\"\n  [innerHTML]=\"data.content ?? '' | cxSupplementHashAnchors\"\n></div>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.SupplementHashAnchorsPipe, name: "cxSupplementHashAnchors" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ParagraphComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-paragraph', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  *ngIf=\"component.data$ | async as data\"\n  [innerHTML]=\"data.content ?? '' | cxSupplementHashAnchors\"\n></div>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CmsComponentData }, { type: i2.Router }]; }, propDecorators: { handleClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYWdyYXBoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9wYXJhZ3JhcGgvcGFyYWdyYXBoLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvY29udGVudC9wYXJhZ3JhcGgvcGFyYWdyYXBoLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7Ozs7OztBQVV2QixNQUFNLE9BQU8sa0JBQWtCO0lBRXRCLFdBQVcsQ0FBQyxLQUFZO1FBQzdCLElBQUksS0FBSyxDQUFDLE1BQU0sWUFBWSxpQkFBaUIsRUFBRTtZQUM3QyxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsTUFBMkIsQ0FBQztZQUNsRCxNQUFNLElBQUksR0FBRyxPQUFPLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRTNDLE1BQU0sWUFBWSxHQUNoQixPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTFELDBDQUEwQztZQUMxQyxJQUFJLElBQUksSUFBSSxZQUFZLEtBQUssT0FBTyxDQUFDLElBQUksRUFBRTtnQkFDekMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNqQztTQUNGO0lBQ0gsQ0FBQztJQUVELFlBQ1MsU0FBa0QsRUFDL0MsTUFBYztRQURqQixjQUFTLEdBQVQsU0FBUyxDQUF5QztRQUMvQyxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQ3ZCLENBQUM7OytHQXJCTyxrQkFBa0I7bUdBQWxCLGtCQUFrQiw2R0NwQi9CLDhIQUlBOzJGRGdCYSxrQkFBa0I7a0JBTDlCLFNBQVM7K0JBQ0UsY0FBYyxtQkFFUCx1QkFBdUIsQ0FBQyxNQUFNOzRIQUl4QyxXQUFXO3NCQURqQixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEhvc3RMaXN0ZW5lcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ21zUGFyYWdyYXBoQ29tcG9uZW50IH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IENtc0NvbXBvbmVudERhdGEgfSBmcm9tICcuLi8uLi8uLi9jbXMtc3RydWN0dXJlL3BhZ2UvbW9kZWwvY21zLWNvbXBvbmVudC1kYXRhJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtcGFyYWdyYXBoJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BhcmFncmFwaC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQYXJhZ3JhcGhDb21wb25lbnQge1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBoYW5kbGVDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTEFuY2hvckVsZW1lbnQ7XG4gICAgICBjb25zdCBocmVmID0gZWxlbWVudD8uZ2V0QXR0cmlidXRlKCdocmVmJyk7XG5cbiAgICAgIGNvbnN0IGRvY3VtZW50SG9zdCA9XG4gICAgICAgIGVsZW1lbnQub3duZXJEb2N1bWVudC5VUkwuc3BsaXQoJzovLycpWzFdLnNwbGl0KCcvJylbMF07XG5cbiAgICAgIC8vIFVzZSByb3V0ZXIgZm9yIGludGVybmFsIGxpbmsgbmF2aWdhdGlvblxuICAgICAgaWYgKGhyZWYgJiYgZG9jdW1lbnRIb3N0ID09PSBlbGVtZW50Lmhvc3QpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybChocmVmKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY29tcG9uZW50OiBDbXNDb21wb25lbnREYXRhPENtc1BhcmFncmFwaENvbXBvbmVudD4sXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyXG4gICkge31cbn1cbiIsIjxkaXZcbiAgKm5nSWY9XCJjb21wb25lbnQuZGF0YSQgfCBhc3luYyBhcyBkYXRhXCJcbiAgW2lubmVySFRNTF09XCJkYXRhLmNvbnRlbnQgPz8gJycgfCBjeFN1cHBsZW1lbnRIYXNoQW5jaG9yc1wiXG4+PC9kaXY+XG4iXX0=