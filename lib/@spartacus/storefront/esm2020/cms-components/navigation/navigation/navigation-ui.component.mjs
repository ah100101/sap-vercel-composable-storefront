/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, HostListener, Input, } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { ICON_TYPE } from '../../misc/icon/index';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./../../../layout/header/hamburger-menu/hamburger-menu.service";
import * as i3 from "@spartacus/core";
import * as i4 from "@angular/common";
import * as i5 from "../../misc/icon/icon.component";
import * as i6 from "../../../shared/components/generic-link/generic-link.component";
export class NavigationUIComponent {
    onResize() {
        this.resize.next();
    }
    constructor(router, renderer, elemRef, hamburgerMenuService, winRef) {
        this.router = router;
        this.renderer = renderer;
        this.elemRef = elemRef;
        this.hamburgerMenuService = hamburgerMenuService;
        this.winRef = winRef;
        /**
         * the icon type that will be used for navigation nodes
         * with children.
         */
        this.iconType = ICON_TYPE;
        /**
         * Indicates whether the navigation should support flyout.
         * If flyout is set to true, the
         * nested child navigation nodes will only appear on hover or focus.
         */
        this.flyout = true;
        this.isOpen = false;
        this.openNodes = [];
        this.subscriptions = new Subscription();
        this.resize = new EventEmitter();
        this.subscriptions.add(this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => this.clear()));
        this.subscriptions.add(this.resize.pipe(debounceTime(50)).subscribe(() => {
            this.alignWrappersToRightIfStickOut();
        }));
    }
    /**
     * During initialization of this component, we will check the resetMenuOnClose flag and attach a menu reset listener if needed.
     */
    ngOnInit() {
        if (this.resetMenuOnClose) {
            this.resetOnMenuCollapse();
        }
    }
    /**
     * This method performs the action of resetting the menu (close all sub menus and return to main options)
     * when the menu is closed.
     */
    resetOnMenuCollapse() {
        this.subscriptions.add(this.hamburgerMenuService?.isExpanded
            .pipe(distinctUntilChanged(), filter(Boolean))
            .subscribe(() => {
            this.reinitializeMenu();
        }));
    }
    closeIfClickedTheSameLink(navNode) {
        if (typeof navNode.url === 'string' &&
            this.winRef.nativeWindow?.location.href.includes(navNode.url)) {
            this.elemRef.nativeElement
                .querySelectorAll('li.is-open:not(.back), li.is-opened')
                .forEach((el) => {
                this.renderer.removeClass(el, 'is-open');
                this.renderer.removeClass(el, 'is-opened');
            });
            this.reinitializeMenu();
            this.hamburgerMenuService.toggle();
        }
    }
    /**
     * This method performs the actions required to reset the state of the menu and reset any visual components.
     */
    reinitializeMenu() {
        if (this.openNodes?.length > 0) {
            this.clear();
            this.renderer.removeClass(this.elemRef.nativeElement, 'is-open');
        }
    }
    ariaCollapseNodes() {
        this.openNodes.forEach((parentNode) => {
            Array.from(parentNode.children)
                .filter((childNode) => childNode?.tagName === 'BUTTON')
                .forEach((childNode) => {
                this.renderer.setAttribute(childNode, 'aria-expanded', 'false');
            });
        });
    }
    toggleOpen(event) {
        if (event.type === 'keydown') {
            event.preventDefault();
        }
        this.ariaCollapseNodes();
        const node = event.currentTarget;
        const parentNode = node.parentNode;
        if (this.openNodes.includes(parentNode)) {
            if (event.type === 'keydown') {
                this.back();
            }
            else {
                this.openNodes = this.openNodes.filter((n) => n !== parentNode);
                this.renderer.removeClass(parentNode, 'is-open');
            }
        }
        else {
            this.openNodes.push(parentNode);
            this.renderer.setAttribute(node, 'aria-expanded', 'true');
        }
        this.updateClasses();
        event.stopImmediatePropagation();
        event.stopPropagation();
    }
    back() {
        if (this.openNodes[this.openNodes.length - 1]) {
            this.renderer.removeClass(this.openNodes[this.openNodes.length - 1], 'is-open');
            this.openNodes.pop();
            this.updateClasses();
        }
    }
    clear() {
        this.openNodes = [];
        this.updateClasses();
    }
    onMouseEnter(event) {
        this.alignWrapperToRightIfStickOut(event.currentTarget);
        this.focusAfterPreviousClicked(event);
    }
    getTotalDepth(node, depth = 0) {
        if (node.children && node.children.length > 0) {
            return Math.max(...node.children.map((n) => this.getTotalDepth(n, depth + 1)));
        }
        else {
            return depth;
        }
    }
    getColumnCount(length) {
        return Math.round(length / (this.wrapAfter || length));
    }
    focusAfterPreviousClicked(event) {
        const target = ((event.target || event.relatedTarget));
        if (target.ownerDocument.activeElement?.matches('nav[tabindex]') &&
            target.parentElement?.matches('.flyout')) {
            target.focus();
        }
        return target.ownerDocument;
    }
    ngOnDestroy() {
        if (this.subscriptions) {
            this.subscriptions.unsubscribe();
        }
    }
    alignWrapperToRightIfStickOut(node) {
        const wrapper = node.querySelector('.wrapper');
        const body = node.closest('body');
        if (wrapper) {
            this.renderer.removeStyle(wrapper, 'margin-left');
            if (wrapper.offsetLeft + wrapper.offsetWidth >
                body.offsetLeft + body.offsetWidth) {
                this.renderer.setStyle(wrapper, 'margin-left', `${node.offsetWidth - wrapper.offsetWidth}px`);
            }
        }
    }
    alignWrappersToRightIfStickOut() {
        const navs = this.elemRef.nativeElement.childNodes;
        Array.from(navs)
            .filter((node) => node.tagName === 'LI')
            .forEach((nav) => this.alignWrapperToRightIfStickOut(nav));
    }
    updateClasses() {
        this.openNodes.forEach((node, i) => {
            if (i + 1 < this.openNodes.length) {
                this.renderer.addClass(node, 'is-opened');
                this.renderer.removeClass(node, 'is-open');
            }
            else {
                this.renderer.removeClass(node, 'is-opened');
                this.renderer.addClass(node, 'is-open');
            }
        });
        this.isOpen = this.openNodes.length > 0;
    }
}
NavigationUIComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: NavigationUIComponent, deps: [{ token: i1.Router }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i2.HamburgerMenuService }, { token: i3.WindowRef }], target: i0.ɵɵFactoryTarget.Component });
NavigationUIComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: NavigationUIComponent, selector: "cx-navigation-ui", inputs: { node: "node", wrapAfter: "wrapAfter", resetMenuOnClose: "resetMenuOnClose", navAriaLabel: "navAriaLabel", flyout: "flyout", isOpen: "isOpen" }, host: { listeners: { "window:resize": "onResize()" }, properties: { "class.flyout": "this.flyout", "class.is-open": "this.isOpen" } }, ngImport: i0, template: "<nav [attr.aria-label]=\"navAriaLabel\">\n  <ul>\n    <li\n      *ngIf=\"flyout && (node?.children?.length ?? 0) > 1\"\n      class=\"back is-open\"\n    >\n      <button (click)=\"back()\">\n        <cx-icon [type]=\"iconType.CARET_LEFT\"></cx-icon>\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </li>\n\n    <ng-container *ngFor=\"let child of node?.children\">\n      <ng-container *ngTemplateOutlet=\"nav; context: { node: child, depth: 0 }\">\n      </ng-container>\n    </ng-container>\n  </ul>\n</nav>\n<!-- we generate links in a recursive manner -->\n\n<ng-template #nav let-node=\"node\" let-depth=\"depth\">\n  <li>\n    <cx-generic-link\n      *ngIf=\"\n        node.url && (!node.children || node.children?.length === 0);\n        else heading\n      \"\n      [url]=\"node.url\"\n      [target]=\"node.target\"\n      [style]=\"node.styleAttributes\"\n      [class]=\"node.styleClasses\"\n      (click)=\"closeIfClickedTheSameLink(node)\"\n    >\n      {{ node.title }}\n    </cx-generic-link>\n\n    <ng-template #heading>\n      <ng-container *ngIf=\"flyout && node.children?.length > 0; else title\">\n        <cx-generic-link\n          *ngIf=\"node.url\"\n          [url]=\"node.url\"\n          [target]=\"node.target\"\n          (click)=\"closeIfClickedTheSameLink(node)\"\n        >\n          {{ node.title }}\n        </cx-generic-link>\n        <button\n          [attr.tabindex]=\"depth < 1 ? 0 : -1\"\n          [attr.aria-haspopup]=\"true\"\n          [attr.aria-expanded]=\"false\"\n          [attr.aria-label]=\"node.title\"\n          (click)=\"toggleOpen($any($event))\"\n          (mouseenter)=\"onMouseEnter($event)\"\n          (keydown.space)=\"toggleOpen($any($event))\"\n          (keydown.esc)=\"back()\"\n        >\n          <ng-container *ngIf=\"!node.url\">\n            {{ node.title }}\n          </ng-container>\n          <cx-icon [type]=\"iconType.CARET_DOWN\"></cx-icon>\n        </button>\n      </ng-container>\n      <ng-template #title>\n        <span [attr.tabindex]=\"-1\">\n          {{ node.title }}\n        </span>\n      </ng-template>\n    </ng-template>\n\n    <!-- we add a wrapper to allow for better layout handling in CSS -->\n    <div class=\"wrapper\" *ngIf=\"node.children && node.children.length > 0\">\n      <ul\n        class=\"childs\"\n        [attr.depth]=\"getTotalDepth(node)\"\n        [attr.wrap-after]=\"node.children.length > wrapAfter ? wrapAfter : null\"\n        [attr.columns]=\"getColumnCount(node.children.length)\"\n      >\n        <ng-container *ngFor=\"let child of node.children\">\n          <ng-container\n            *ngTemplateOutlet=\"nav; context: { node: child, depth: depth + 1 }\"\n          >\n          </ng-container>\n        </ng-container>\n      </ul>\n    </div>\n  </li>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i5.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i6.GenericLinkComponent, selector: "cx-generic-link", inputs: ["url", "target", "id", "class", "style", "title"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: NavigationUIComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-navigation-ui', changeDetection: ChangeDetectionStrategy.OnPush, template: "<nav [attr.aria-label]=\"navAriaLabel\">\n  <ul>\n    <li\n      *ngIf=\"flyout && (node?.children?.length ?? 0) > 1\"\n      class=\"back is-open\"\n    >\n      <button (click)=\"back()\">\n        <cx-icon [type]=\"iconType.CARET_LEFT\"></cx-icon>\n        {{ 'common.back' | cxTranslate }}\n      </button>\n    </li>\n\n    <ng-container *ngFor=\"let child of node?.children\">\n      <ng-container *ngTemplateOutlet=\"nav; context: { node: child, depth: 0 }\">\n      </ng-container>\n    </ng-container>\n  </ul>\n</nav>\n<!-- we generate links in a recursive manner -->\n\n<ng-template #nav let-node=\"node\" let-depth=\"depth\">\n  <li>\n    <cx-generic-link\n      *ngIf=\"\n        node.url && (!node.children || node.children?.length === 0);\n        else heading\n      \"\n      [url]=\"node.url\"\n      [target]=\"node.target\"\n      [style]=\"node.styleAttributes\"\n      [class]=\"node.styleClasses\"\n      (click)=\"closeIfClickedTheSameLink(node)\"\n    >\n      {{ node.title }}\n    </cx-generic-link>\n\n    <ng-template #heading>\n      <ng-container *ngIf=\"flyout && node.children?.length > 0; else title\">\n        <cx-generic-link\n          *ngIf=\"node.url\"\n          [url]=\"node.url\"\n          [target]=\"node.target\"\n          (click)=\"closeIfClickedTheSameLink(node)\"\n        >\n          {{ node.title }}\n        </cx-generic-link>\n        <button\n          [attr.tabindex]=\"depth < 1 ? 0 : -1\"\n          [attr.aria-haspopup]=\"true\"\n          [attr.aria-expanded]=\"false\"\n          [attr.aria-label]=\"node.title\"\n          (click)=\"toggleOpen($any($event))\"\n          (mouseenter)=\"onMouseEnter($event)\"\n          (keydown.space)=\"toggleOpen($any($event))\"\n          (keydown.esc)=\"back()\"\n        >\n          <ng-container *ngIf=\"!node.url\">\n            {{ node.title }}\n          </ng-container>\n          <cx-icon [type]=\"iconType.CARET_DOWN\"></cx-icon>\n        </button>\n      </ng-container>\n      <ng-template #title>\n        <span [attr.tabindex]=\"-1\">\n          {{ node.title }}\n        </span>\n      </ng-template>\n    </ng-template>\n\n    <!-- we add a wrapper to allow for better layout handling in CSS -->\n    <div class=\"wrapper\" *ngIf=\"node.children && node.children.length > 0\">\n      <ul\n        class=\"childs\"\n        [attr.depth]=\"getTotalDepth(node)\"\n        [attr.wrap-after]=\"node.children.length > wrapAfter ? wrapAfter : null\"\n        [attr.columns]=\"getColumnCount(node.children.length)\"\n      >\n        <ng-container *ngFor=\"let child of node.children\">\n          <ng-container\n            *ngTemplateOutlet=\"nav; context: { node: child, depth: depth + 1 }\"\n          >\n          </ng-container>\n        </ng-container>\n      </ul>\n    </div>\n  </li>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i2.HamburgerMenuService }, { type: i3.WindowRef }]; }, propDecorators: { node: [{
                type: Input
            }], wrapAfter: [{
                type: Input
            }], resetMenuOnClose: [{
                type: Input
            }], navAriaLabel: [{
                type: Input
            }], flyout: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.flyout']
            }], isOpen: [{
                type: Input
            }, {
                type: HostBinding,
                args: ['class.is-open']
            }], onResize: [{
                type: HostListener,
                args: ['window:resize']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi11aS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1jb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLXVpLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uL25hdmlnYXRpb24tdWkuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssR0FJTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsYUFBYSxFQUFVLE1BQU0saUJBQWlCLENBQUM7QUFFeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7Ozs7Ozs7QUFTbEQsTUFBTSxPQUFPLHFCQUFxQjtJQXFDaEMsUUFBUTtRQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELFlBQ1UsTUFBYyxFQUNkLFFBQW1CLEVBQ25CLE9BQW1CLEVBQ2pCLG9CQUEwQyxFQUMxQyxNQUFpQjtRQUpuQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ2pCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsV0FBTSxHQUFOLE1BQU0s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TUFNdEMsSUFBSTtzQkFBWixLQUFLO2dCQUtHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBS0csZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUVHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBWWdDLE1BQU07c0JBQTNDLEtBQUs7O3NCQUFJLFdBQVc7dUJBQUMsY0FBYztnQkFFRyxNQUFNO3NCQUE1QyxLQUFLOztzQkFBSSxXQUFXO3VCQUFDLGVBQWU7Z0JBT3JDLFFBQVE7c0JBRFAsWUFBWTt1QkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSUNPTl9UWVBFIH0gZnJvbSAnLi4vLi4vbWlzYy9pY29uL2luZGV4JztcbmltcG9ydCB7IEhhbWJ1cmdlck1lbnVTZXJ2aWNlIH0gZnJvbSAnLi8uLi8uLi8uLi9sYXlvdXQvaGVhZGVyL2hhbWJ1cmdlci1tZW51L2hhbWJ1cmdlci1tZW51LnNlcnZpY2UnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbk5vZGUgfSBmcm9tICcuL25hdmlnYXRpb24tbm9kZS5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2N4LW5hdmlnYXRpb24tdWknLFxuICB0ZW1wbGF0ZVVybDogJy4vbmF2aWdhdGlvbi11aS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOYXZpZ2F0aW9uVUlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBUaGUgbmF2aWdhdGlvbiBub2RlIHRvIHJlbmRlci5cbiAgICovXG4gIEBJbnB1dCgpIG5vZGU6IE5hdmlnYXRpb25Ob2RlIHwgbnVsbDtcblxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBjaGlsZCBub2RlcyB0aGF0IG11c3QgYmUgd3JhcHBlZC5cbiAgICovXG4gIEBJbnB1dCgpIHdyYXBBZnRlcjogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBGbGFnIGluZGljYXRlcyB3aGV0aGVyIHRvIHJlc2V0IHRoZSBzdGF0ZSBvZiBtZW51IG5hdmlnYXRpb24gKGllLiBDb2xsYXBzZSBhbGwgc3VibWVudXMpIHdoZW4gdGhlIG1lbnUgaXMgY2xvc2VkLlxuICAgKi9cbiAgQElucHV0KCkgcmVzZXRNZW51T25DbG9zZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICBASW5wdXQoKSBuYXZBcmlhTGFiZWw6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQ7XG4gIC8qKlxuICAgKiB0aGUgaWNvbiB0eXBlIHRoYXQgd2lsbCBiZSB1c2VkIGZvciBuYXZpZ2F0aW9uIG5vZGVzXG4gICAqIHdpdGggY2hpbGRyZW4uXG4gICAqL1xuICBpY29uVHlwZSA9IElDT05fVFlQRTtcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIG5hdmlnYXRpb24gc2hvdWxkIHN1cHBvcnQgZmx5b3V0LlxuICAgKiBJZiBmbHlvdXQgaXMgc2V0IHRvIHRydWUsIHRoZVxuICAgKiBuZXN0ZWQgY2hpbGQgbmF2aWdhdGlvbiBub2RlcyB3aWxsIG9ubHkgYXBwZWFyIG9uIGhvdmVyIG9yIGZvY3VzLlxuICAgKi9cbiAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdjbGFzcy5mbHlvdXQnKSBmbHlvdXQgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIEBIb3N0QmluZGluZygnY2xhc3MuaXMtb3BlbicpIGlzT3BlbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgb3Blbk5vZGVzOiBIVE1MRWxlbWVudFtdID0gW107XG4gIHByaXZhdGUgc3Vic2NyaXB0aW9ucyA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJpdmF0ZSByZXNpemUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXG4gIG9uUmVzaXplKCkge1xuICAgIHRoaXMucmVzaXplLm5leHQoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWxlbVJlZjogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgaGFtYnVyZ2VyTWVudVNlcnZpY2U6IEhhbWJ1cmdlck1lbnVTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZlxuICApIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5yb3V0ZXIuZXZlbnRzXG4gICAgICAgIC5waXBlKGZpbHRlcigoZXZlbnQpID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jbGVhcigpKVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb25zLmFkZChcbiAgICAgIHRoaXMucmVzaXplLnBpcGUoZGVib3VuY2VUaW1lKDUwKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hbGlnbldyYXBwZXJzVG9SaWdodElmU3RpY2tPdXQoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEdXJpbmcgaW5pdGlhbGl6YXRpb24gb2YgdGhpcyBjb21wb25lbnQsIHdlIHdpbGwgY2hlY2sgdGhlIHJlc2V0TWVudU9uQ2xvc2UgZmxhZyBhbmQgYXR0YWNoIGEgbWVudSByZXNldCBsaXN0ZW5lciBpZiBuZWVkZWQuXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5yZXNldE1lbnVPbkNsb3NlKSB7XG4gICAgICB0aGlzLnJlc2V0T25NZW51Q29sbGFwc2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgcGVyZm9ybXMgdGhlIGFjdGlvbiBvZiByZXNldHRpbmcgdGhlIG1lbnUgKGNsb3NlIGFsbCBzdWIgbWVudXMgYW5kIHJldHVybiB0byBtYWluIG9wdGlvbnMpXG4gICAqIHdoZW4gdGhlIG1lbnUgaXMgY2xvc2VkLlxuICAgKi9cbiAgcmVzZXRPbk1lbnVDb2xsYXBzZSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbnMuYWRkKFxuICAgICAgdGhpcy5oYW1idXJnZXJNZW51U2VydmljZT8uaXNFeHBhbmRlZFxuICAgICAgICAucGlwZShkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLCBmaWx0ZXIoQm9vbGVhbikpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVpbml0aWFsaXplTWVudSgpO1xuICAgICAgICB9KVxuICAgICk7XG4gIH1cblxuICBjbG9zZUlmQ2xpY2tlZFRoZVNhbWVMaW5rKG5hdk5vZGU6IE5hdmlnYXRpb25Ob2RlKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdHlwZW9mIG5hdk5vZGUudXJsID09PSAnc3RyaW5nJyAmJlxuICAgICAgdGhpcy53aW5SZWYubmF0aXZlV2luZG93Py5sb2NhdGlvbi5ocmVmLmluY2x1ZGVzKG5hdk5vZGUudXJsKVxuICAgICkge1xuICAgICAgdGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnRcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpLmlzLW9wZW46bm90KC5iYWNrKSwgbGkuaXMtb3BlbmVkJylcbiAgICAgICAgLmZvckVhY2goKGVsOiBhbnkpID0+IHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKGVsLCAnaXMtb3BlbicpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3MoZWwsICdpcy1vcGVuZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICB0aGlzLnJlaW5pdGlhbGl6ZU1lbnUoKTtcbiAgICAgIHRoaXMuaGFtYnVyZ2VyTWVudVNlcnZpY2UudG9nZ2xlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIHBlcmZvcm1zIHRoZSBhY3Rpb25zIHJlcXVpcmVkIHRvIHJlc2V0IHRoZSBzdGF0ZSBvZiB0aGUgbWVudSBhbmQgcmVzZXQgYW55IHZpc3VhbCBjb21wb25lbnRzLlxuICAgKi9cbiAgcmVpbml0aWFsaXplTWVudSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vcGVuTm9kZXM/Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQsICdpcy1vcGVuJyk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGFyaWFDb2xsYXBzZU5vZGVzKCk6IHZvaWQge1xuICAgIHRoaXMub3Blbk5vZGVzLmZvckVhY2goKHBhcmVudE5vZGUpID0+IHtcbiAgICAgIEFycmF5LmZyb20ocGFyZW50Tm9kZS5jaGlsZHJlbilcbiAgICAgICAgLmZpbHRlcigoY2hpbGROb2RlKSA9PiBjaGlsZE5vZGU/LnRhZ05hbWUgPT09ICdCVVRUT04nKVxuICAgICAgICAuZm9yRWFjaCgoY2hpbGROb2RlKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoY2hpbGROb2RlLCAnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHRvZ2dsZU9wZW4oZXZlbnQ6IFVJRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2tleWRvd24nKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICB0aGlzLmFyaWFDb2xsYXBzZU5vZGVzKCk7XG4gICAgY29uc3Qgbm9kZSA9IDxIVE1MRWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IHBhcmVudE5vZGUgPSA8SFRNTEVsZW1lbnQ+bm9kZS5wYXJlbnROb2RlO1xuICAgIGlmICh0aGlzLm9wZW5Ob2Rlcy5pbmNsdWRlcyhwYXJlbnROb2RlKSkge1xuICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICdrZXlkb3duJykge1xuICAgICAgICB0aGlzLmJhY2soKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3Blbk5vZGVzID0gdGhpcy5vcGVuTm9kZXMuZmlsdGVyKChuKSA9PiBuICE9PSBwYXJlbnROb2RlKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhwYXJlbnROb2RlLCAnaXMtb3BlbicpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW5Ob2Rlcy5wdXNoKHBhcmVudE5vZGUpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUobm9kZSwgJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xuICAgIH1cblxuICAgIHRoaXMudXBkYXRlQ2xhc3NlcygpO1xuXG4gICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBiYWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm9wZW5Ob2Rlc1t0aGlzLm9wZW5Ob2Rlcy5sZW5ndGggLSAxXSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyhcbiAgICAgICAgdGhpcy5vcGVuTm9kZXNbdGhpcy5vcGVuTm9kZXMubGVuZ3RoIC0gMV0sXG4gICAgICAgICdpcy1vcGVuJ1xuICAgICAgKTtcbiAgICAgIHRoaXMub3Blbk5vZGVzLnBvcCgpO1xuICAgICAgdGhpcy51cGRhdGVDbGFzc2VzKCk7XG4gICAgfVxuICB9XG5cbiAgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5vcGVuTm9kZXMgPSBbXTtcbiAgICB0aGlzLnVwZGF0ZUNsYXNzZXMoKTtcbiAgfVxuXG4gIG9uTW91c2VFbnRlcihldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuYWxpZ25XcmFwcGVyVG9SaWdodElmU3RpY2tPdXQoPEhUTUxFbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgIHRoaXMuZm9jdXNBZnRlclByZXZpb3VzQ2xpY2tlZChldmVudCk7XG4gIH1cblxuICBnZXRUb3RhbERlcHRoKG5vZGU6IE5hdmlnYXRpb25Ob2RlLCBkZXB0aCA9IDApOiBudW1iZXIge1xuICAgIGlmIChub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIE1hdGgubWF4KFxuICAgICAgICAuLi5ub2RlLmNoaWxkcmVuLm1hcCgobikgPT4gdGhpcy5nZXRUb3RhbERlcHRoKG4sIGRlcHRoICsgMSkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZGVwdGg7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29sdW1uQ291bnQobGVuZ3RoOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKGxlbmd0aCAvICh0aGlzLndyYXBBZnRlciB8fCBsZW5ndGgpKTtcbiAgfVxuXG4gIGZvY3VzQWZ0ZXJQcmV2aW91c0NsaWNrZWQoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQ6IEhUTUxFbGVtZW50ID0gPEhUTUxFbGVtZW50PihcbiAgICAgIChldmVudC50YXJnZXQgfHwgZXZlbnQucmVsYXRlZFRhcmdldClcbiAgICApO1xuICAgIGlmIChcbiAgICAgIHRhcmdldC5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ/Lm1hdGNoZXMoJ25hdlt0YWJpbmRleF0nKSAmJlxuICAgICAgdGFyZ2V0LnBhcmVudEVsZW1lbnQ/Lm1hdGNoZXMoJy5mbHlvdXQnKVxuICAgICkge1xuICAgICAgdGFyZ2V0LmZvY3VzKCk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQub3duZXJEb2N1bWVudDtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWxpZ25XcmFwcGVyVG9SaWdodElmU3RpY2tPdXQobm9kZTogSFRNTEVsZW1lbnQpIHtcbiAgICBjb25zdCB3cmFwcGVyID0gPEhUTUxFbGVtZW50Pm5vZGUucXVlcnlTZWxlY3RvcignLndyYXBwZXInKTtcbiAgICBjb25zdCBib2R5ID0gPEhUTUxFbGVtZW50Pm5vZGUuY2xvc2VzdCgnYm9keScpO1xuICAgIGlmICh3cmFwcGVyKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZVN0eWxlKHdyYXBwZXIsICdtYXJnaW4tbGVmdCcpO1xuICAgICAgaWYgKFxuICAgICAgICB3cmFwcGVyLm9mZnNldExlZnQgKyB3cmFwcGVyLm9mZnNldFdpZHRoID5cbiAgICAgICAgYm9keS5vZmZzZXRMZWZ0ICsgYm9keS5vZmZzZXRXaWR0aFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgd3JhcHBlcixcbiAgICAgICAgICAnbWFyZ2luLWxlZnQnLFxuICAgICAgICAgIGAke25vZGUub2Zmc2V0V2lkdGggLSB3cmFwcGVyLm9mZnNldFdpZHRofXB4YFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWxpZ25XcmFwcGVyc1RvUmlnaHRJZlN0aWNrT3V0KCkge1xuICAgIGNvbnN0IG5hdnMgPSA8SFRNTENvbGxlY3Rpb24+dGhpcy5lbGVtUmVmLm5hdGl2ZUVsZW1lbnQuY2hpbGROb2RlcztcbiAgICBBcnJheS5mcm9tKG5hdnMpXG4gICAgICAuZmlsdGVyKChub2RlKSA9PiBub2RlLnRhZ05hbWUgPT09ICdMSScpXG4gICAgICAuZm9yRWFjaCgobmF2KSA9PiB0aGlzLmFsaWduV3JhcHBlclRvUmlnaHRJZlN0aWNrT3V0KDxIVE1MRWxlbWVudD5uYXYpKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQ2xhc3NlcygpOiB2b2lkIHtcbiAgICB0aGlzLm9wZW5Ob2Rlcy5mb3JFYWNoKChub2RlLCBpKSA9PiB7XG4gICAgICBpZiAoaSArIDEgPCB0aGlzLm9wZW5Ob2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhub2RlLCAnaXMtb3BlbmVkJyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3Mobm9kZSwgJ2lzLW9wZW4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3Mobm9kZSwgJ2lzLW9wZW5lZCcpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG5vZGUsICdpcy1vcGVuJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmlzT3BlbiA9IHRoaXMub3Blbk5vZGVzLmxlbmd0aCA+IDA7XG4gIH1cbn1cbiIsIjxuYXYgW2F0dHIuYXJpYS1sYWJlbF09XCJuYXZBcmlhTGFiZWxcIj5cbiAgPHVsPlxuICAgIDxsaVxuICAgICAgKm5nSWY9XCJmbHlvdXQgJiYgKG5vZGU/LmNoaWxkcmVuPy5sZW5ndGggPz8gMCkgPiAxXCJcbiAgICAgIGNsYXNzPVwiYmFjayBpcy1vcGVuXCJcbiAgICA+XG4gICAgICA8YnV0dG9uIChjbGljayk9XCJiYWNrKClcIj5cbiAgICAgICAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGUuQ0FSRVRfTEVGVFwiPjwvY3gtaWNvbj5cbiAgICAgICAge3sgJ2NvbW1vbi5iYWNrJyB8IGN4VHJhbnNsYXRlIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2xpPlxuXG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGQgb2Ygbm9kZT8uY2hpbGRyZW5cIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJuYXY7IGNvbnRleHQ6IHsgbm9kZTogY2hpbGQsIGRlcHRoOiAwIH1cIj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L3VsPlxuPC9uYXY+XG48IS0tIHdlIGdlbmVyYXRlIGxpbmtzIGluIGEgcmVjdXJzaXZlIG1hbm5lciAtLT5cblxuPG5nLXRlbXBsYXRlICNuYXYgbGV0LW5vZGU9XCJub2RlXCIgbGV0LWRlcHRoPVwiZGVwdGhcIj5cbiAgPGxpPlxuICAgIDxjeC1nZW5lcmljLWxpbmtcbiAgICAgICpuZ0lmPVwiXG4gICAgICAgIG5vZGUudXJsICYmICghbm9kZS5jaGlsZHJlbiB8fCBub2RlLmNoaWxkcmVuPy5sZW5ndGggPT09IDApO1xuICAgICAgICBlbHNlIGhlYWRpbmdcbiAgICAgIFwiXG4gICAgICBbdXJsXT1cIm5vZGUudXJsXCJcbiAgICAgIFt0YXJnZXRdPVwibm9kZS50YXJnZXRcIlxuICAgICAgW3N0eWxlXT1cIm5vZGUuc3R5bGVBdHRyaWJ1dGVzXCJcbiAgICAgIFtjbGFzc109XCJub2RlLnN0eWxlQ2xhc3Nlc1wiXG4gICAgICAoY2xpY2spPVwiY2xvc2VJZkNsaWNrZWRUaGVTYW1lTGluayhub2RlKVwiXG4gICAgPlxuICAgICAge3sgbm9kZS50aXRsZSB9fVxuICAgIDwvY3gtZ2VuZXJpYy1saW5rPlxuXG4gICAgPG5nLXRlbXBsYXRlICNoZWFkaW5nPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImZseW91dCAmJiBub2RlLmNoaWxkcmVuPy5sZW5ndGggPiAwOyBlbHNlIHRpdGxlXCI+XG4gICAgICAgIDxjeC1nZW5lcmljLWxpbmtcbiAgICAgICAgICAqbmdJZj1cIm5vZGUudXJsXCJcbiAgICAgICAgICBbdXJsXT1cIm5vZGUudXJsXCJcbiAgICAgICAgICBbdGFyZ2V0XT1cIm5vZGUudGFyZ2V0XCJcbiAgICAgICAgICAoY2xpY2spPVwiY2xvc2VJZkNsaWNrZWRUaGVTYW1lTGluayhub2RlKVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eyBub2RlLnRpdGxlIH19XG4gICAgICAgIDwvY3gtZ2VuZXJpYy1saW5rPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiZGVwdGggPCAxID8gMCA6IC0xXCJcbiAgICAgICAgICBbYXR0ci5hcmlhLWhhc3BvcHVwXT1cInRydWVcIlxuICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiZmFsc2VcIlxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwibm9kZS50aXRsZVwiXG4gICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZU9wZW4oJGFueSgkZXZlbnQpKVwiXG4gICAgICAgICAgKG1vdXNlZW50ZXIpPVwib25Nb3VzZUVudGVyKCRldmVudClcIlxuICAgICAgICAgIChrZXlkb3duLnNwYWNlKT1cInRvZ2dsZU9wZW4oJGFueSgkZXZlbnQpKVwiXG4gICAgICAgICAgKGtleWRvd24uZXNjKT1cImJhY2soKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW5vZGUudXJsXCI+XG4gICAgICAgICAgICB7eyBub2RlLnRpdGxlIH19XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPGN4LWljb24gW3R5cGVdPVwiaWNvblR5cGUuQ0FSRVRfRE9XTlwiPjwvY3gtaWNvbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjdGl0bGU+XG4gICAgICAgIDxzcGFuIFthdHRyLnRhYmluZGV4XT1cIi0xXCI+XG4gICAgICAgICAge3sgbm9kZS50aXRsZSB9fVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICA8IS0tIHdlIGFkZCBhIHdyYXBwZXIgdG8gYWxsb3cgZm9yIGJldHRlciBsYXlvdXQgaGFuZGxpbmcgaW4gQ1NTIC0tPlxuICAgIDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCIgKm5nSWY9XCJub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMFwiPlxuICAgICAgPHVsXG4gICAgICAgIGNsYXNzPVwiY2hpbGRzXCJcbiAgICAgICAgW2F0dHIuZGVwdGhdPVwiZ2V0VG90YWxEZXB0aChub2RlKVwiXG4gICAgICAgIFthdHRyLndyYXAtYWZ0ZXJdPVwibm9kZS5jaGlsZHJlbi5sZW5ndGggPiB3cmFwQWZ0ZXIgPyB3cmFwQWZ0ZXIgOiBudWxsXCJcbiAgICAgICAgW2F0dHIuY29sdW1uc109XCJnZXRDb2x1bW5Db3VudChub2RlLmNoaWxkcmVuLmxlbmd0aClcIlxuICAgICAgPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJuYXY7IGNvbnRleHQ6IHsgbm9kZTogY2hpbGQsIGRlcHRoOiBkZXB0aCArIDEgfVwiXG4gICAgICAgICAgPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIDwvbGk+XG48L25nLXRlbXBsYXRlPlxuIl19