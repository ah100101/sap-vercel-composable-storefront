/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, EventEmitter, } from '@angular/core';
import { isNotNullable } from '@spartacus/core';
import { BREAKPOINT, ICON_TYPE, } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, fromEvent, merge, of, Subscription, } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay, switchMap, switchMapTo, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
import * as i2 from "@angular/common";
import * as i3 from "../product-image-zoom-thumbnails/product-image-zoom-thumbnails.component";
export class ProductImageZoomViewComponent {
    get defaultImage() {
        return this._defaultImage;
    }
    set defaultImage(el) {
        if (el) {
            this._defaultImage = el;
            this.defaultImageReady.next(true);
        }
    }
    get zoomImage() {
        return this._zoomImage;
    }
    set zoomImage(el) {
        if (el) {
            this._zoomImage = el;
            this.zoomReady.next(true);
        }
    }
    constructor(currentProductService, renderer, cdRef, breakpointService) {
        this.currentProductService = currentProductService;
        this.renderer = renderer;
        this.cdRef = cdRef;
        this.breakpointService = breakpointService;
        this.iconType = ICON_TYPE;
        this.mainMediaContainer = new BehaviorSubject(null);
        this.defaultImageReady = new BehaviorSubject(false);
        this.zoomReady = new BehaviorSubject(false);
        this.subscription = new Subscription();
        this.mainMediaContainer$ = this.mainMediaContainer.asObservable();
        this.defaultImageReady$ = this.defaultImageReady.asObservable();
        this.zoomReady$ = this.zoomReady.asObservable();
        this.activeThumb = new EventEmitter();
        this.defaultImageClickHandler$ = this.defaultImageReady$.pipe(filter(Boolean), switchMap((_) => merge(...this.clickOrDoubleClick(this.defaultImage)).pipe(tap(() => this.zoom()))));
        this.zoomImageClickHandler$ = this.zoomReady$.pipe(filter(Boolean), switchMap((_) => merge(...this.clickOrDoubleClick(this.zoomImage)).pipe(tap(() => this.zoom()))));
        this.startCoords = null;
        this.left = 0;
        this.top = 0;
        this.isZoomed = false;
        this.product$ = this.currentProductService
            .getProduct()
            .pipe(filter(isNotNullable), distinctUntilChanged(), tap((p) => {
            if (this.galleryIndex) {
                const image = Array.isArray(p.images?.GALLERY)
                    ? p.images?.GALLERY.find((img) => img.zoom?.galleryIndex === this.galleryIndex)
                    : p.images?.GALLERY;
                this.mainMediaContainer.next(image || null);
            }
            else {
                this.mainMediaContainer.next(p.images?.PRIMARY ? p.images.PRIMARY : {});
            }
        }), shareReplay(1));
        this.thumbnails$ = this.product$.pipe(map((p) => this.createThumbs(p)), shareReplay(1));
        this.mainImage$ = combineLatest([
            this.product$,
            this.mainMediaContainer$,
        ]).pipe(map(([, container]) => container));
    }
    ngOnInit() {
        this.subscription.add(this.defaultImageClickHandler$.subscribe());
        this.subscription.add(this.zoomImageClickHandler$.subscribe());
    }
    openImage(item) {
        this.mainMediaContainer.next(item);
        this.activeThumb.emit(item);
    }
    /** find the index of the main media in the list of media */
    getActive() {
        if (Array.isArray(this.mainMediaContainer.value)) {
            return this.mainMediaContainer.value[0].thumbnail?.galleryIndex || 0;
        }
        return this.mainMediaContainer?.value?.thumbnail?.galleryIndex || 0;
    }
    getPreviousProduct(thumbs) {
        const active = this.getActive();
        if (active === 0) {
            return thumbs[active];
        }
        return thumbs[active - 1];
    }
    getNextProduct(thumbs) {
        const active = this.getActive();
        if (active === thumbs.length - 1) {
            return thumbs[active];
        }
        return thumbs[active + 1];
    }
    /**
     * Zoom in or out of the image
     */
    zoom() {
        this.isZoomed = !this.isZoomed;
        this.startCoords = null;
        this.left = 0;
        this.top = 0;
        this.cdRef.markForCheck();
    }
    /**
     * Touch screen image pan
     *
     * @param event
     */
    touchMove(event) {
        const touch = event.touches[0] || event.changedTouches[0];
        const boundingRect = this.zoomedImage?.nativeElement?.getBoundingClientRect();
        const imageElement = this.zoomedImage?.nativeElement?.firstChild;
        if (!this.startCoords) {
            this.startCoords = { x: touch.clientX, y: touch.clientY };
        }
        this.left += touch.clientX - this.startCoords.x;
        this.top += touch.clientY - this.startCoords.y;
        this.moveImage(this.left, this.top, boundingRect, imageElement);
        this.startCoords = { x: touch.clientX, y: touch.clientY };
    }
    /**
     * Clears touch location
     */
    clearTouch() {
        this.startCoords = null;
    }
    /**
     * Pointer image pan
     *
     * @param event
     */
    pointerMove(event) {
        const boundingRect = this.zoomedImage.nativeElement.getBoundingClientRect();
        const imageElement = this.zoomedImage.nativeElement.firstChild;
        const { positionX, positionY } = this.calculatePointerMovePosition(this.zoomedImage, event.clientX, event.clientY);
        this.moveImage(positionX, positionY, boundingRect, imageElement);
    }
    changeImage(event) {
        this.mainMediaContainer.next(event.image);
    }
    /**
     * Applies the offset from touchMove or pointerMove to the image element
     *
     * @param positionX
     * @param positionY
     * @param boundingRect
     * @param imageElement
     */
    moveImage(positionX, positionY, boundingRect, imageElement) {
        const { x, y } = this.handleOutOfBounds(positionX, positionY, imageElement, boundingRect);
        if (imageElement) {
            this.renderer.setStyle(imageElement, 'left', x + 'px');
            this.renderer.setStyle(imageElement, 'top', y + 'px');
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * Returns click and dblclick event mapping for the given element
     *
     * @param element
     */
    clickOrDoubleClick(element) {
        return [
            fromEvent(element.nativeElement, 'click').pipe(switchMapTo(this.breakpointService.isUp(BREAKPOINT.md)), filter(Boolean)),
            fromEvent(element.nativeElement, 'dblclick').pipe(switchMapTo(this.breakpointService.isDown(BREAKPOINT.lg)), filter(Boolean)),
        ];
    }
    /**
     * Return an array of CarouselItems for the product thumbnails.
     * In case there are less then 2 thumbs, we return null.
     */
    createThumbs(product) {
        if (!product.images ||
            !product.images.GALLERY ||
            product.images.GALLERY.length < 2) {
            return [];
        }
        const images = product.images.GALLERY;
        return images.map((c) => of({ container: c }));
    }
    /**
     * Keeps the zoom image from leaving the bounding container
     *
     * @param positionX
     * @param positionY
     * @param imageElement
     * @param boundingRect
     */
    handleOutOfBounds(positionX, positionY, imageElement, boundingRect) {
        const paddingX = 60;
        const paddingY = 60;
        if (positionY <= -imageElement?.height + paddingY) {
            positionY = -imageElement?.height + paddingY;
        }
        if (positionY >= boundingRect?.height - paddingY) {
            positionY = boundingRect?.height - paddingY;
        }
        if (positionX <=
            -imageElement?.width - boundingRect?.width / 2 + paddingX) {
            positionX = -imageElement?.width - boundingRect?.width / 2 + paddingX;
        }
        if (positionX >= imageElement?.width + boundingRect?.width / 2 - paddingX) {
            positionX = imageElement?.width + boundingRect?.width / 2 - paddingX;
        }
        return { x: positionX, y: positionY };
    }
    /**
     * Returns the position of the image based on the cursor pointer
     *
     * @param element
     * @param clientX
     * @param clientY
     */
    calculatePointerMovePosition(element, clientX, clientY) {
        const boundingRect = element.nativeElement.getBoundingClientRect();
        const x = clientX - boundingRect.left;
        const y = clientY - boundingRect.top;
        const positionX = -x + element.nativeElement.clientWidth / 2;
        const positionY = -y + element.nativeElement.clientHeight / 2;
        return { positionX, positionY };
    }
}
ProductImageZoomViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ProductImageZoomViewComponent, deps: [{ token: i1.CurrentProductService }, { token: i0.Renderer2 }, { token: i0.ChangeDetectorRef }, { token: i1.BreakpointService }], target: i0.ɵɵFactoryTarget.Component });
ProductImageZoomViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.4", type: ProductImageZoomViewComponent, selector: "cx-product-image-zoom-view", inputs: { galleryIndex: "galleryIndex" }, viewQueries: [{ propertyName: "defaultImage", first: true, predicate: ["defaultImage"], descendants: true, read: ElementRef }, { propertyName: "zoomImage", first: true, predicate: ["zoomContainer"], descendants: true, read: ElementRef }, { propertyName: "zoomedImage", first: true, predicate: ["zoomedImage"], descendants: true, read: ElementRef }], ngImport: i0, template: "<ng-container *ngIf=\"mainImage$ | async as main\">\n  <div class=\"cx-main-image-group\" *ngIf=\"thumbnails$ | async as thumbs\">\n    <div class=\"cx-navigate-image\">\n      <button\n        class=\"btn btn-link\"\n        *ngIf=\"getPreviousProduct(thumbs) | async as previousProduct\"\n        (click)=\"openImage(previousProduct.container)\"\n      >\n        <cx-icon [type]=\"iconType.CARET_LEFT\"></cx-icon>\n      </button>\n    </div>\n    <cx-media\n      #defaultImage\n      class=\"cx-default-image-zoom\"\n      *ngIf=\"!isZoomed\"\n      [container]=\"main\"\n    >\n    </cx-media>\n    <div #zoomContainer class=\"cx-zoom-container\" *ngIf=\"isZoomed\">\n      <cx-media\n        #zoomedImage\n        class=\"cx-image-zoomed\"\n        [container]=\"main\"\n        (mousemove)=\"pointerMove($event)\"\n        (touchmove)=\"touchMove($event)\"\n        (touchend)=\"clearTouch()\"\n      >\n      </cx-media>\n    </div>\n    <div class=\"cx-navigate-image\">\n      <button\n        class=\"btn btn-link\"\n        *ngIf=\"getNextProduct(thumbs) | async as nextProduct\"\n        (click)=\"openImage(nextProduct.container)\"\n      >\n        <cx-icon [type]=\"iconType.CARET_RIGHT\"></cx-icon>\n      </button>\n    </div>\n  </div>\n</ng-container>\n\n<cx-product-image-zoom-thumbnails\n  [thumbs$]=\"thumbnails$\"\n  [activeThumb]=\"activeThumb\"\n  (productImage)=\"changeImage($event)\"\n></cx-product-image-zoom-thumbnails>\n", dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: i3.ProductImageZoomThumbnailsComponent, selector: "cx-product-image-zoom-thumbnails", inputs: ["thumbs$", "activeThumb"], outputs: ["productImage"] }, { kind: "pipe", type: i2.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: ProductImageZoomViewComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-product-image-zoom-view', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"mainImage$ | async as main\">\n  <div class=\"cx-main-image-group\" *ngIf=\"thumbnails$ | async as thumbs\">\n    <div class=\"cx-navigate-image\">\n      <button\n        class=\"btn btn-link\"\n        *ngIf=\"getPreviousProduct(thumbs) | async as previousProduct\"\n        (click)=\"openImage(previousProduct.container)\"\n      >\n        <cx-icon [type]=\"iconType.CARET_LEFT\"></cx-icon>\n      </button>\n    </div>\n    <cx-media\n      #defaultImage\n      class=\"cx-default-image-zoom\"\n      *ngIf=\"!isZoomed\"\n      [container]=\"main\"\n    >\n    </cx-media>\n    <div #zoomContainer class=\"cx-zoom-container\" *ngIf=\"isZoomed\">\n      <cx-media\n        #zoomedImage\n        class=\"cx-image-zoomed\"\n        [container]=\"main\"\n        (mousemove)=\"pointerMove($event)\"\n        (touchmove)=\"touchMove($event)\"\n        (touchend)=\"clearTouch()\"\n      >\n      </cx-media>\n    </div>\n    <div class=\"cx-navigate-image\">\n      <button\n        class=\"btn btn-link\"\n        *ngIf=\"getNextProduct(thumbs) | async as nextProduct\"\n        (click)=\"openImage(nextProduct.container)\"\n      >\n        <cx-icon [type]=\"iconType.CARET_RIGHT\"></cx-icon>\n      </button>\n    </div>\n  </div>\n</ng-container>\n\n<cx-product-image-zoom-thumbnails\n  [thumbs$]=\"thumbnails$\"\n  [activeThumb]=\"activeThumb\"\n  (productImage)=\"changeImage($event)\"\n></cx-product-image-zoom-thumbnails>\n" }]
        }], ctorParameters: function () { return [{ type: i1.CurrentProductService }, { type: i0.Renderer2 }, { type: i0.ChangeDetectorRef }, { type: i1.BreakpointService }]; }, propDecorators: { galleryIndex: [{
                type: Input
            }], defaultImage: [{
                type: ViewChild,
                args: ['defaultImage', { read: ElementRef }]
            }], zoomImage: [{
                type: ViewChild,
                args: ['zoomContainer', { read: ElementRef }]
            }], zoomedImage: [{
                type: ViewChild,
                args: ['zoomedImage', { read: ElementRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC1pbWFnZS16b29tLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvaW1hZ2Utem9vbS9jb21wb25lbnRzL3Byb2R1Y3QtaW1hZ2Utem9vbS9wcm9kdWN0LWltYWdlLXpvb20tdmlldy9wcm9kdWN0LWltYWdlLXpvb20tdmlldy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvcHJvZHVjdC9pbWFnZS16b29tL2NvbXBvbmVudHMvcHJvZHVjdC1pbWFnZS16b29tL3Byb2R1Y3QtaW1hZ2Utem9vbS12aWV3L3Byb2R1Y3QtaW1hZ2Utem9vbS12aWV3LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUlMLFNBQVMsRUFDVCxZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFjLGFBQWEsRUFBVyxNQUFNLGlCQUFpQixDQUFDO0FBRXJFLE9BQU8sRUFDTCxVQUFVLEVBR1YsU0FBUyxHQUNWLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUNMLGVBQWUsRUFDZixhQUFhLEVBQ2IsU0FBUyxFQUNULEtBQUssRUFFTCxFQUFFLEVBQ0YsWUFBWSxHQUNiLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixNQUFNLEVBQ04sR0FBRyxFQUNILFdBQVcsRUFDWCxTQUFTLEVBQ1QsV0FBVyxFQUNYLEdBQUcsR0FDSixNQUFNLGdCQUFnQixDQUFDOzs7OztBQU94QixNQUFNLE9BQU8sNkJBQTZCO0lBNkJ4QyxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUVELElBQXFELFlB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RyxZQUFZLENBQUMsR0FBRyxDQUFDO1FBRXJDLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUM3RCxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFFOUQsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzswSEE1VVUsNkJBQTZCOzhHQUE3Qiw2QkFBNkIscU1BaUNMLFVBQVUscUdBc0JULFVBQVUscUdBU1osVUFBVSw2QkNsSDlDLCs2Q0E4Q0E7MkZESWEsNkJBQTZCO2tCQUx6QyxTQUFTOytCQUNFLDRCQUE0QixtQkFFckIsdUJBQXVCLENBQUMsTUFBTTtvTUFLdEMsWUFBWTtzQkFBcEIsS0FBSztnQkE4QitDLFlBQVk7c0JBQWhFLFNBQVM7dUJBQUMsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRTtnQkFzQk8sU0FBUztzQkFBOUQsU0FBUzt1QkFBQyxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQVNBLFdBQVc7c0JBQTFELFNBQVM7dUJBQUMsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxuICBFdmVudEVtaXR0ZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW1hZ2VHcm91cCwgaXNOb3ROdWxsYWJsZSwgUHJvZHVjdCB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBUaHVtYm5haWxzR3JvdXAgfSBmcm9tICdAc3BhcnRhY3VzL3Byb2R1Y3QvaW1hZ2Utem9vbS9yb290JztcbmltcG9ydCB7XG4gIEJSRUFLUE9JTlQsXG4gIEJyZWFrcG9pbnRTZXJ2aWNlLFxuICBDdXJyZW50UHJvZHVjdFNlcnZpY2UsXG4gIElDT05fVFlQRSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgY29tYmluZUxhdGVzdCxcbiAgZnJvbUV2ZW50LFxuICBtZXJnZSxcbiAgT2JzZXJ2YWJsZSxcbiAgb2YsXG4gIFN1YnNjcmlwdGlvbixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHNoYXJlUmVwbGF5LFxuICBzd2l0Y2hNYXAsXG4gIHN3aXRjaE1hcFRvLFxuICB0YXAsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtcHJvZHVjdC1pbWFnZS16b29tLXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJvZHVjdC1pbWFnZS16b29tLXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjdEltYWdlWm9vbVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGljb25UeXBlID0gSUNPTl9UWVBFO1xuXG4gIEBJbnB1dCgpIGdhbGxlcnlJbmRleDogbnVtYmVyO1xuXG4gIHByaXZhdGUgbWFpbk1lZGlhQ29udGFpbmVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxJbWFnZUdyb3VwIHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgZGVmYXVsdEltYWdlUmVhZHkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJpdmF0ZSB6b29tUmVhZHkgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgcHJpdmF0ZSBfZGVmYXVsdEltYWdlOiBFbGVtZW50UmVmO1xuICBwcml2YXRlIF96b29tSW1hZ2U6IEVsZW1lbnRSZWY7XG5cbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgcHJvdGVjdGVkIG1haW5NZWRpYUNvbnRhaW5lciQ6IE9ic2VydmFibGU8SW1hZ2VHcm91cCB8IG51bGw+ID1cbiAgICB0aGlzLm1haW5NZWRpYUNvbnRhaW5lci5hc09ic2VydmFibGUoKTtcbiAgcHJvdGVjdGVkIGRlZmF1bHRJbWFnZVJlYWR5JDogT2JzZXJ2YWJsZTxib29sZWFuPiA9XG4gICAgdGhpcy5kZWZhdWx0SW1hZ2VSZWFkeS5hc09ic2VydmFibGUoKTtcbiAgcHJvdGVjdGVkIHpvb21SZWFkeSQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzLnpvb21SZWFkeS5hc09ic2VydmFibGUoKTtcblxuICBhY3RpdmVUaHVtYjogRXZlbnRFbWl0dGVyPEltYWdlR3JvdXA+ID0gbmV3IEV2ZW50RW1pdHRlcjxJbWFnZUdyb3VwPigpO1xuXG4gIGRlZmF1bHRJbWFnZUNsaWNrSGFuZGxlciQ6IE9ic2VydmFibGU8YW55W10+ID0gdGhpcy5kZWZhdWx0SW1hZ2VSZWFkeSQucGlwZShcbiAgICBmaWx0ZXIoQm9vbGVhbiksXG4gICAgc3dpdGNoTWFwKChfKSA9PlxuICAgICAgbWVyZ2UoLi4udGhpcy5jbGlja09yRG91YmxlQ2xpY2sodGhpcy5kZWZhdWx0SW1hZ2UpKS5waXBlKFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy56b29tKCkpXG4gICAgICApXG4gICAgKVxuICApO1xuXG4gIGdldCBkZWZhdWx0SW1hZ2UoKTogRWxlbWVudFJlZiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRJbWFnZTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ2RlZmF1bHRJbWFnZScsIHsgcmVhZDogRWxlbWVudFJlZiB9KSBzZXQgZGVmYXVsdEltYWdlKFxuICAgIGVsOiBFbGVtZW50UmVmXG4gICkge1xuICAgIGlmIChlbCkge1xuICAgICAgdGhpcy5fZGVmYXVsdEltYWdlID0gZWw7XG4gICAgICB0aGlzLmRlZmF1bHRJbWFnZVJlYWR5Lm5leHQodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgem9vbUltYWdlQ2xpY2tIYW5kbGVyJDogT2JzZXJ2YWJsZTxhbnlbXT4gPSB0aGlzLnpvb21SZWFkeSQucGlwZShcbiAgICBmaWx0ZXIoQm9vbGVhbiksXG4gICAgc3dpdGNoTWFwKChfKSA9PlxuICAgICAgbWVyZ2UoLi4udGhpcy5jbGlja09yRG91YmxlQ2xpY2sodGhpcy56b29tSW1hZ2UpKS5waXBlKFxuICAgICAgICB0YXAoKCkgPT4gdGhpcy56b29tKCkpXG4gICAgICApXG4gICAgKVxuICApO1xuXG4gIGdldCB6b29tSW1hZ2UoKTogRWxlbWVudFJlZiB7XG4gICAgcmV0dXJuIHRoaXMuX3pvb21JbWFnZTtcbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ3pvb21Db250YWluZXInLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgc2V0IHpvb21JbWFnZShcbiAgICBlbDogRWxlbWVudFJlZlxuICApIHtcbiAgICBpZiAoZWwpIHtcbiAgICAgIHRoaXMuX3pvb21JbWFnZSA9IGVsO1xuICAgICAgdGhpcy56b29tUmVhZHkubmV4dCh0cnVlKTtcbiAgICB9XG4gIH1cblxuICBAVmlld0NoaWxkKCd6b29tZWRJbWFnZScsIHsgcmVhZDogRWxlbWVudFJlZiB9KSB6b29tZWRJbWFnZTogRWxlbWVudFJlZjtcblxuICBzdGFydENvb3JkczogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHwgbnVsbCA9IG51bGw7XG4gIGxlZnQgPSAwO1xuICB0b3AgPSAwO1xuICBpc1pvb21lZCA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBwcm9kdWN0JDogT2JzZXJ2YWJsZTxQcm9kdWN0PiA9IHRoaXMuY3VycmVudFByb2R1Y3RTZXJ2aWNlXG4gICAgLmdldFByb2R1Y3QoKVxuICAgIC5waXBlKFxuICAgICAgZmlsdGVyKGlzTm90TnVsbGFibGUpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgIHRhcCgocDogUHJvZHVjdCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5nYWxsZXJ5SW5kZXgpIHtcbiAgICAgICAgICBjb25zdCBpbWFnZSA9IEFycmF5LmlzQXJyYXkocC5pbWFnZXM/LkdBTExFUlkpXG4gICAgICAgICAgICA/IHAuaW1hZ2VzPy5HQUxMRVJZLmZpbmQoXG4gICAgICAgICAgICAgICAgKGltZykgPT4gaW1nLnpvb20/LmdhbGxlcnlJbmRleCA9PT0gdGhpcy5nYWxsZXJ5SW5kZXhcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBwLmltYWdlcz8uR0FMTEVSWTtcbiAgICAgICAgICB0aGlzLm1haW5NZWRpYUNvbnRhaW5lci5uZXh0KGltYWdlIHx8IG51bGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWFpbk1lZGlhQ29udGFpbmVyLm5leHQoXG4gICAgICAgICAgICBwLmltYWdlcz8uUFJJTUFSWSA/IChwLmltYWdlcy5QUklNQVJZIGFzIEltYWdlR3JvdXApIDoge31cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHNoYXJlUmVwbGF5KDEpXG4gICAgKTtcblxuICB0aHVtYm5haWxzJDogT2JzZXJ2YWJsZTxPYnNlcnZhYmxlPFRodW1ibmFpbHNHcm91cD5bXT4gPSB0aGlzLnByb2R1Y3QkLnBpcGUoXG4gICAgbWFwKChwOiBQcm9kdWN0KSA9PiB0aGlzLmNyZWF0ZVRodW1icyhwKSksXG4gICAgc2hhcmVSZXBsYXkoMSlcbiAgKTtcblxuICBtYWluSW1hZ2UkOiBPYnNlcnZhYmxlPEltYWdlR3JvdXAgfCBudWxsPiA9IGNvbWJpbmVMYXRlc3QoW1xuICAgIHRoaXMucHJvZHVjdCQsXG4gICAgdGhpcy5tYWluTWVkaWFDb250YWluZXIkLFxuICBdKS5waXBlKG1hcCgoWywgY29udGFpbmVyXSkgPT4gY29udGFpbmVyKSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRQcm9kdWN0U2VydmljZTogQ3VycmVudFByb2R1Y3RTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByb3RlY3RlZCBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJvdGVjdGVkIGJyZWFrcG9pbnRTZXJ2aWNlOiBCcmVha3BvaW50U2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHRoaXMuZGVmYXVsdEltYWdlQ2xpY2tIYW5kbGVyJC5zdWJzY3JpYmUoKSk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKHRoaXMuem9vbUltYWdlQ2xpY2tIYW5kbGVyJC5zdWJzY3JpYmUoKSk7XG4gIH1cblxuICBvcGVuSW1hZ2UoaXRlbTogSW1hZ2VHcm91cCk6IHZvaWQge1xuICAgIHRoaXMubWFpbk1lZGlhQ29udGFpbmVyLm5leHQoaXRlbSk7XG4gICAgdGhpcy5hY3RpdmVUaHVtYi5lbWl0KGl0ZW0pO1xuICB9XG5cbiAgLyoqIGZpbmQgdGhlIGluZGV4IG9mIHRoZSBtYWluIG1lZGlhIGluIHRoZSBsaXN0IG9mIG1lZGlhICovXG4gIHByb3RlY3RlZCBnZXRBY3RpdmUoKTogbnVtYmVyIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLm1haW5NZWRpYUNvbnRhaW5lci52YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLm1haW5NZWRpYUNvbnRhaW5lci52YWx1ZVswXS50aHVtYm5haWw/LmdhbGxlcnlJbmRleCB8fCAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5tYWluTWVkaWFDb250YWluZXI/LnZhbHVlPy50aHVtYm5haWw/LmdhbGxlcnlJbmRleCB8fCAwO1xuICB9XG5cbiAgZ2V0UHJldmlvdXNQcm9kdWN0KHRodW1iczogT2JzZXJ2YWJsZTxJbWFnZUdyb3VwPltdKTogT2JzZXJ2YWJsZTxJbWFnZUdyb3VwPiB7XG4gICAgY29uc3QgYWN0aXZlID0gdGhpcy5nZXRBY3RpdmUoKTtcbiAgICBpZiAoYWN0aXZlID09PSAwKSB7XG4gICAgICByZXR1cm4gdGh1bWJzW2FjdGl2ZV07XG4gICAgfVxuICAgIHJldHVybiB0aHVtYnNbYWN0aXZlIC0gMV07XG4gIH1cblxuICBnZXROZXh0UHJvZHVjdCh0aHVtYnM6IE9ic2VydmFibGU8SW1hZ2VHcm91cD5bXSk6IE9ic2VydmFibGU8SW1hZ2VHcm91cD4ge1xuICAgIGNvbnN0IGFjdGl2ZSA9IHRoaXMuZ2V0QWN0aXZlKCk7XG4gICAgaWYgKGFjdGl2ZSA9PT0gdGh1bWJzLmxlbmd0aCAtIDEpIHtcbiAgICAgIHJldHVybiB0aHVtYnNbYWN0aXZlXTtcbiAgICB9XG4gICAgcmV0dXJuIHRodW1ic1thY3RpdmUgKyAxXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBab29tIGluIG9yIG91dCBvZiB0aGUgaW1hZ2VcbiAgICovXG4gIHpvb20oKTogdm9pZCB7XG4gICAgdGhpcy5pc1pvb21lZCA9ICF0aGlzLmlzWm9vbWVkO1xuICAgIHRoaXMuc3RhcnRDb29yZHMgPSBudWxsO1xuICAgIHRoaXMubGVmdCA9IDA7XG4gICAgdGhpcy50b3AgPSAwO1xuICAgIHRoaXMuY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogVG91Y2ggc2NyZWVuIGltYWdlIHBhblxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIHRvdWNoTW92ZShldmVudDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcbiAgICBjb25zdCBib3VuZGluZ1JlY3QgPVxuICAgICAgdGhpcy56b29tZWRJbWFnZT8ubmF0aXZlRWxlbWVudD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgYXMgRE9NUmVjdDtcbiAgICBjb25zdCBpbWFnZUVsZW1lbnQgPSB0aGlzLnpvb21lZEltYWdlPy5uYXRpdmVFbGVtZW50Py5maXJzdENoaWxkO1xuXG4gICAgaWYgKCF0aGlzLnN0YXJ0Q29vcmRzKSB7XG4gICAgICB0aGlzLnN0YXJ0Q29vcmRzID0geyB4OiB0b3VjaC5jbGllbnRYLCB5OiB0b3VjaC5jbGllbnRZIH07XG4gICAgfVxuICAgIHRoaXMubGVmdCArPSB0b3VjaC5jbGllbnRYIC0gdGhpcy5zdGFydENvb3Jkcy54O1xuICAgIHRoaXMudG9wICs9IHRvdWNoLmNsaWVudFkgLSB0aGlzLnN0YXJ0Q29vcmRzLnk7XG5cbiAgICB0aGlzLm1vdmVJbWFnZSh0aGlzLmxlZnQsIHRoaXMudG9wLCBib3VuZGluZ1JlY3QsIGltYWdlRWxlbWVudCk7XG5cbiAgICB0aGlzLnN0YXJ0Q29vcmRzID0geyB4OiB0b3VjaC5jbGllbnRYLCB5OiB0b3VjaC5jbGllbnRZIH07XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXJzIHRvdWNoIGxvY2F0aW9uXG4gICAqL1xuICBjbGVhclRvdWNoKCk6IHZvaWQge1xuICAgIHRoaXMuc3RhcnRDb29yZHMgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFBvaW50ZXIgaW1hZ2UgcGFuXG4gICAqXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgcG9pbnRlck1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBib3VuZGluZ1JlY3QgPVxuICAgICAgdGhpcy56b29tZWRJbWFnZS5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIGFzIERPTVJlY3Q7XG4gICAgY29uc3QgaW1hZ2VFbGVtZW50ID0gdGhpcy56b29tZWRJbWFnZS5uYXRpdmVFbGVtZW50LmZpcnN0Q2hpbGQ7XG5cbiAgICBjb25zdCB7IHBvc2l0aW9uWCwgcG9zaXRpb25ZIH0gPSB0aGlzLmNhbGN1bGF0ZVBvaW50ZXJNb3ZlUG9zaXRpb24oXG4gICAgICB0aGlzLnpvb21lZEltYWdlLFxuICAgICAgZXZlbnQuY2xpZW50WCxcbiAgICAgIGV2ZW50LmNsaWVudFlcbiAgICApO1xuXG4gICAgdGhpcy5tb3ZlSW1hZ2UocG9zaXRpb25YLCBwb3NpdGlvblksIGJvdW5kaW5nUmVjdCwgaW1hZ2VFbGVtZW50KTtcbiAgfVxuXG4gIGNoYW5nZUltYWdlKGV2ZW50OiB7IGltYWdlOiBJbWFnZUdyb3VwOyBpbmRleDogbnVtYmVyIH0pOiB2b2lkIHtcbiAgICB0aGlzLm1haW5NZWRpYUNvbnRhaW5lci5uZXh0KGV2ZW50LmltYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRoZSBvZmZzZXQgZnJvbSB0b3VjaE1vdmUgb3IgcG9pbnRlck1vdmUgdG8gdGhlIGltYWdlIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIHBvc2l0aW9uWFxuICAgKiBAcGFyYW0gcG9zaXRpb25ZXG4gICAqIEBwYXJhbSBib3VuZGluZ1JlY3RcbiAgICogQHBhcmFtIGltYWdlRWxlbWVudFxuICAgKi9cbiAgcHJvdGVjdGVkIG1vdmVJbWFnZShcbiAgICBwb3NpdGlvblg6IG51bWJlcixcbiAgICBwb3NpdGlvblk6IG51bWJlcixcbiAgICBib3VuZGluZ1JlY3Q6IGFueSxcbiAgICBpbWFnZUVsZW1lbnQ6IERPTVJlY3RcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLmhhbmRsZU91dE9mQm91bmRzKFxuICAgICAgcG9zaXRpb25YLFxuICAgICAgcG9zaXRpb25ZLFxuICAgICAgaW1hZ2VFbGVtZW50LFxuICAgICAgYm91bmRpbmdSZWN0XG4gICAgKTtcblxuICAgIGlmIChpbWFnZUVsZW1lbnQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoaW1hZ2VFbGVtZW50LCAnbGVmdCcsIHggKyAncHgnKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoaW1hZ2VFbGVtZW50LCAndG9wJywgeSArICdweCcpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBjbGljayBhbmQgZGJsY2xpY2sgZXZlbnQgbWFwcGluZyBmb3IgdGhlIGdpdmVuIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICovXG4gIHByaXZhdGUgY2xpY2tPckRvdWJsZUNsaWNrKGVsZW1lbnQ6IEVsZW1lbnRSZWYpOiBPYnNlcnZhYmxlPGFueT5bXSB7XG4gICAgcmV0dXJuIFtcbiAgICAgIGZyb21FdmVudChlbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdjbGljaycpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcFRvKHRoaXMuYnJlYWtwb2ludFNlcnZpY2UuaXNVcChCUkVBS1BPSU5ULm1kKSksXG4gICAgICAgIGZpbHRlcihCb29sZWFuKVxuICAgICAgKSxcbiAgICAgIGZyb21FdmVudChlbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdkYmxjbGljaycpLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcFRvKHRoaXMuYnJlYWtwb2ludFNlcnZpY2UuaXNEb3duKEJSRUFLUE9JTlQubGcpKSxcbiAgICAgICAgZmlsdGVyKEJvb2xlYW4pXG4gICAgICApLFxuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGFuIGFycmF5IG9mIENhcm91c2VsSXRlbXMgZm9yIHRoZSBwcm9kdWN0IHRodW1ibmFpbHMuXG4gICAqIEluIGNhc2UgdGhlcmUgYXJlIGxlc3MgdGhlbiAyIHRodW1icywgd2UgcmV0dXJuIG51bGwuXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZVRodW1icyhwcm9kdWN0OiBQcm9kdWN0KTogT2JzZXJ2YWJsZTxUaHVtYm5haWxzR3JvdXA+W10ge1xuICAgIGlmIChcbiAgICAgICFwcm9kdWN0LmltYWdlcyB8fFxuICAgICAgIXByb2R1Y3QuaW1hZ2VzLkdBTExFUlkgfHxcbiAgICAgIHByb2R1Y3QuaW1hZ2VzLkdBTExFUlkubGVuZ3RoIDwgMlxuICAgICkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbnN0IGltYWdlczogSW1hZ2VHcm91cFtdID0gcHJvZHVjdC5pbWFnZXMuR0FMTEVSWSBhcyBJbWFnZUdyb3VwW107XG5cbiAgICByZXR1cm4gaW1hZ2VzLm1hcCgoYykgPT4gb2YoeyBjb250YWluZXI6IGMgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEtlZXBzIHRoZSB6b29tIGltYWdlIGZyb20gbGVhdmluZyB0aGUgYm91bmRpbmcgY29udGFpbmVyXG4gICAqXG4gICAqIEBwYXJhbSBwb3NpdGlvblhcbiAgICogQHBhcmFtIHBvc2l0aW9uWVxuICAgKiBAcGFyYW0gaW1hZ2VFbGVtZW50XG4gICAqIEBwYXJhbSBib3VuZGluZ1JlY3RcbiAgICovXG4gIGhhbmRsZU91dE9mQm91bmRzKFxuICAgIHBvc2l0aW9uWDogbnVtYmVyLFxuICAgIHBvc2l0aW9uWTogbnVtYmVyLFxuICAgIGltYWdlRWxlbWVudDogYW55LFxuICAgIGJvdW5kaW5nUmVjdDogRE9NUmVjdFxuICApOiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0ge1xuICAgIGNvbnN0IHBhZGRpbmdYID0gNjA7XG4gICAgY29uc3QgcGFkZGluZ1kgPSA2MDtcblxuICAgIGlmIChwb3NpdGlvblkgPD0gLWltYWdlRWxlbWVudD8uaGVpZ2h0ICsgcGFkZGluZ1kpIHtcbiAgICAgIHBvc2l0aW9uWSA9IC1pbWFnZUVsZW1lbnQ/LmhlaWdodCArIHBhZGRpbmdZO1xuICAgIH1cbiAgICBpZiAocG9zaXRpb25ZID49IGJvdW5kaW5nUmVjdD8uaGVpZ2h0IC0gcGFkZGluZ1kpIHtcbiAgICAgIHBvc2l0aW9uWSA9IGJvdW5kaW5nUmVjdD8uaGVpZ2h0IC0gcGFkZGluZ1k7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHBvc2l0aW9uWCA8PVxuICAgICAgLWltYWdlRWxlbWVudD8ud2lkdGggLSBib3VuZGluZ1JlY3Q/LndpZHRoIC8gMiArIHBhZGRpbmdYXG4gICAgKSB7XG4gICAgICBwb3NpdGlvblggPSAtaW1hZ2VFbGVtZW50Py53aWR0aCAtIGJvdW5kaW5nUmVjdD8ud2lkdGggLyAyICsgcGFkZGluZ1g7XG4gICAgfVxuICAgIGlmIChwb3NpdGlvblggPj0gaW1hZ2VFbGVtZW50Py53aWR0aCArIGJvdW5kaW5nUmVjdD8ud2lkdGggLyAyIC0gcGFkZGluZ1gpIHtcbiAgICAgIHBvc2l0aW9uWCA9IGltYWdlRWxlbWVudD8ud2lkdGggKyBib3VuZGluZ1JlY3Q/LndpZHRoIC8gMiAtIHBhZGRpbmdYO1xuICAgIH1cblxuICAgIHJldHVybiB7IHg6IHBvc2l0aW9uWCwgeTogcG9zaXRpb25ZIH07XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhlIGltYWdlIGJhc2VkIG9uIHRoZSBjdXJzb3IgcG9pbnRlclxuICAgKlxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKiBAcGFyYW0gY2xpZW50WFxuICAgKiBAcGFyYW0gY2xpZW50WVxuICAgKi9cbiAgY2FsY3VsYXRlUG9pbnRlck1vdmVQb3NpdGlvbihcbiAgICBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIGNsaWVudFg6IG51bWJlcixcbiAgICBjbGllbnRZOiBudW1iZXJcbiAgKTogeyBwb3NpdGlvblg6IG51bWJlcjsgcG9zaXRpb25ZOiBudW1iZXIgfSB7XG4gICAgY29uc3QgYm91bmRpbmdSZWN0ID1cbiAgICAgIGVsZW1lbnQubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBhcyBET01SZWN0O1xuXG4gICAgY29uc3QgeCA9IGNsaWVudFggLSBib3VuZGluZ1JlY3QubGVmdDtcbiAgICBjb25zdCB5ID0gY2xpZW50WSAtIGJvdW5kaW5nUmVjdC50b3A7XG5cbiAgICBjb25zdCBwb3NpdGlvblggPSAteCArIGVsZW1lbnQubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aCAvIDI7XG4gICAgY29uc3QgcG9zaXRpb25ZID0gLXkgKyBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0IC8gMjtcblxuICAgIHJldHVybiB7IHBvc2l0aW9uWCwgcG9zaXRpb25ZIH07XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJtYWluSW1hZ2UkIHwgYXN5bmMgYXMgbWFpblwiPlxuICA8ZGl2IGNsYXNzPVwiY3gtbWFpbi1pbWFnZS1ncm91cFwiICpuZ0lmPVwidGh1bWJuYWlscyQgfCBhc3luYyBhcyB0aHVtYnNcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY3gtbmF2aWdhdGUtaW1hZ2VcIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgY2xhc3M9XCJidG4gYnRuLWxpbmtcIlxuICAgICAgICAqbmdJZj1cImdldFByZXZpb3VzUHJvZHVjdCh0aHVtYnMpIHwgYXN5bmMgYXMgcHJldmlvdXNQcm9kdWN0XCJcbiAgICAgICAgKGNsaWNrKT1cIm9wZW5JbWFnZShwcmV2aW91c1Byb2R1Y3QuY29udGFpbmVyKVwiXG4gICAgICA+XG4gICAgICAgIDxjeC1pY29uIFt0eXBlXT1cImljb25UeXBlLkNBUkVUX0xFRlRcIj48L2N4LWljb24+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8Y3gtbWVkaWFcbiAgICAgICNkZWZhdWx0SW1hZ2VcbiAgICAgIGNsYXNzPVwiY3gtZGVmYXVsdC1pbWFnZS16b29tXCJcbiAgICAgICpuZ0lmPVwiIWlzWm9vbWVkXCJcbiAgICAgIFtjb250YWluZXJdPVwibWFpblwiXG4gICAgPlxuICAgIDwvY3gtbWVkaWE+XG4gICAgPGRpdiAjem9vbUNvbnRhaW5lciBjbGFzcz1cImN4LXpvb20tY29udGFpbmVyXCIgKm5nSWY9XCJpc1pvb21lZFwiPlxuICAgICAgPGN4LW1lZGlhXG4gICAgICAgICN6b29tZWRJbWFnZVxuICAgICAgICBjbGFzcz1cImN4LWltYWdlLXpvb21lZFwiXG4gICAgICAgIFtjb250YWluZXJdPVwibWFpblwiXG4gICAgICAgIChtb3VzZW1vdmUpPVwicG9pbnRlck1vdmUoJGV2ZW50KVwiXG4gICAgICAgICh0b3VjaG1vdmUpPVwidG91Y2hNb3ZlKCRldmVudClcIlxuICAgICAgICAodG91Y2hlbmQpPVwiY2xlYXJUb3VjaCgpXCJcbiAgICAgID5cbiAgICAgIDwvY3gtbWVkaWE+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImN4LW5hdmlnYXRlLWltYWdlXCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCJcbiAgICAgICAgKm5nSWY9XCJnZXROZXh0UHJvZHVjdCh0aHVtYnMpIHwgYXN5bmMgYXMgbmV4dFByb2R1Y3RcIlxuICAgICAgICAoY2xpY2spPVwib3BlbkltYWdlKG5leHRQcm9kdWN0LmNvbnRhaW5lcilcIlxuICAgICAgPlxuICAgICAgICA8Y3gtaWNvbiBbdHlwZV09XCJpY29uVHlwZS5DQVJFVF9SSUdIVFwiPjwvY3gtaWNvbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG48Y3gtcHJvZHVjdC1pbWFnZS16b29tLXRodW1ibmFpbHNcbiAgW3RodW1icyRdPVwidGh1bWJuYWlscyRcIlxuICBbYWN0aXZlVGh1bWJdPVwiYWN0aXZlVGh1bWJcIlxuICAocHJvZHVjdEltYWdlKT1cImNoYW5nZUltYWdlKCRldmVudClcIlxuPjwvY3gtcHJvZHVjdC1pbWFnZS16b29tLXRodW1ibmFpbHM+XG4iXX0=