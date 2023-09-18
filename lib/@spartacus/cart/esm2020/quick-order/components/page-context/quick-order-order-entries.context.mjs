import { Injectable, isDevMode } from '@angular/core';
import { merge, of } from 'rxjs';
import { catchError, filter, map, mergeAll, switchMap, take, tap, } from 'rxjs/operators';
import { OrderEntriesSource, ProductImportStatus, } from '@spartacus/cart/base/root';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/quick-order/root";
import * as i2 from "@spartacus/core";
export class QuickOrderOrderEntriesContext {
    constructor(quickOrderService, productConnector) {
        this.quickOrderService = quickOrderService;
        this.productConnector = productConnector;
        this.type = OrderEntriesSource.QUICK_ORDER;
    }
    getEntries() {
        return this.quickOrderService.getEntries();
    }
    addEntries(productsData) {
        return merge(productsData.map((productData) => this.quickOrderService
            .canAdd(productData.productCode, productsData)
            .pipe(switchMap((canAdd) => {
            if (canAdd) {
                return this.productConnector.get(productData.productCode).pipe(filter((product) => !!product), tap((product) => {
                    this.quickOrderService.addProduct(product, productData.quantity);
                }), map((product) => this.handleResults(product, productData)), catchError((response) => {
                    return of(this.handleErrors(response, productData.productCode));
                }));
            }
            else {
                return of({
                    productCode: productData.productCode,
                    statusCode: ProductImportStatus.LIMIT_EXCEEDED,
                });
            }
        })))).pipe(mergeAll(), take(productsData.length));
    }
    handleResults(product, productData) {
        if (product.stock?.stockLevel &&
            productData.quantity > product.stock.stockLevel) {
            return {
                productCode: productData.productCode,
                productName: product?.name,
                statusCode: ProductImportStatus.LOW_STOCK,
                quantity: productData.quantity,
                quantityAdded: product.stock.stockLevel,
            };
        }
        else if (product.stock?.stockLevelStatus === 'outOfStock') {
            return {
                productCode: productData.productCode,
                statusCode: ProductImportStatus.NO_STOCK,
                productName: product?.name,
            };
        }
        else {
            return {
                productCode: productData.productCode,
                statusCode: ProductImportStatus.SUCCESS,
            };
        }
    }
    handleErrors(response, productCode) {
        if (response?.error?.errors[0].type === 'UnknownIdentifierError') {
            return {
                productCode,
                statusCode: ProductImportStatus.UNKNOWN_IDENTIFIER,
            };
        }
        else {
            if (isDevMode()) {
                console.warn('Unrecognized cart add entry action type while mapping messages', response);
            }
            return {
                productCode,
                statusCode: ProductImportStatus.UNKNOWN_ERROR,
            };
        }
    }
}
QuickOrderOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: QuickOrderOrderEntriesContext, deps: [{ token: i1.QuickOrderFacade }, { token: i2.ProductConnector }], target: i0.ɵɵFactoryTarget.Injectable });
QuickOrderOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: QuickOrderOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: QuickOrderOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.QuickOrderFacade }, { type: i2.ProductConnector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2stb3JkZXItb3JkZXItZW50cmllcy5jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvcXVpY2stb3JkZXIvY29tcG9uZW50cy9wYWdlLWNvbnRleHQvcXVpY2stb3JkZXItb3JkZXItZW50cmllcy5jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFDTCxVQUFVLEVBQ1YsTUFBTSxFQUNOLEdBQUcsRUFDSCxRQUFRLEVBQ1IsU0FBUyxFQUNULElBQUksRUFDSixHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBR0wsa0JBQWtCLEVBSWxCLG1CQUFtQixHQUNwQixNQUFNLDJCQUEyQixDQUFDOzs7O0FBT25DLE1BQU0sT0FBTyw2QkFBNkI7SUFLeEMsWUFDWSxpQkFBbUMsRUFDbkMsZ0JBQWtDO1FBRGxDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUpyQyxTQUFJLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxDQUFDO0lBSzVDLENBQUM7SUFFSixVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELFVBQVUsQ0FBQyxZQUEyQjtRQUNwQyxPQUFPLEtBQUssQ0FDVixZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FDL0IsSUFBSSxDQUFDLGlCQUFpQjthQUNuQixNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUM7YUFDN0MsSUFBSSxDQUNILFNBQVMsQ0FBQyxD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QUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwRXJyb3JSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUsIGlzRGV2TW9kZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBjYXRjaEVycm9yLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgbWVyZ2VBbGwsXG4gIHN3aXRjaE1hcCxcbiAgdGFrZSxcbiAgdGFwLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBBZGRPcmRlckVudHJpZXNDb250ZXh0LFxuICBHZXRPcmRlckVudHJpZXNDb250ZXh0LFxuICBPcmRlckVudHJpZXNTb3VyY2UsXG4gIE9yZGVyRW50cnksXG4gIFByb2R1Y3REYXRhLFxuICBQcm9kdWN0SW1wb3J0SW5mbyxcbiAgUHJvZHVjdEltcG9ydFN0YXR1cyxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2Uvcm9vdCc7XG5pbXBvcnQgeyBRdWlja09yZGVyRmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L3F1aWNrLW9yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgUHJvZHVjdCwgUHJvZHVjdENvbm5lY3RvciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBRdWlja09yZGVyT3JkZXJFbnRyaWVzQ29udGV4dFxuICBpbXBsZW1lbnRzIEFkZE9yZGVyRW50cmllc0NvbnRleHQsIEdldE9yZGVyRW50cmllc0NvbnRleHRcbntcbiAgcmVhZG9ubHkgdHlwZSA9IE9yZGVyRW50cmllc1NvdXJjZS5RVUlDS19PUkRFUjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcXVpY2tPcmRlclNlcnZpY2U6IFF1aWNrT3JkZXJGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHByb2R1Y3RDb25uZWN0b3I6IFByb2R1Y3RDb25uZWN0b3JcbiAgKSB7fVxuXG4gIGdldEVudHJpZXMoKTogT2JzZXJ2YWJsZTxPcmRlckVudHJ5W10+IHtcbiAgICByZXR1cm4gdGhpcy5xdWlja09yZGVyU2VydmljZS5nZXRFbnRyaWVzKCk7XG4gIH1cblxuICBhZGRFbnRyaWVzKHByb2R1Y3RzRGF0YTogUHJvZHVjdERhdGFbXSk6IE9ic2VydmFibGU8UHJvZHVjdEltcG9ydEluZm8+IHtcbiAgICByZXR1cm4gbWVyZ2UoXG4gICAgICBwcm9kdWN0c0RhdGEubWFwKChwcm9kdWN0RGF0YSkgPT5cbiAgICAgICAgdGhpcy5xdWlja09yZGVyU2VydmljZVxuICAgICAgICAgIC5jYW5BZGQocHJvZHVjdERhdGEucHJvZHVjdENvZGUsIHByb2R1Y3RzRGF0YSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcCgoY2FuQWRkKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChjYW5BZGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0Q29ubmVjdG9yLmdldChwcm9kdWN0RGF0YS5wcm9kdWN0Q29kZSkucGlwZShcbiAgICAgICAgICAgICAgICAgIGZpbHRlcigocHJvZHVjdCkgPT4gISFwcm9kdWN0KSxcbiAgICAgICAgICAgICAgICAgIHRhcCgocHJvZHVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1aWNrT3JkZXJTZXJ2aWNlLmFkZFByb2R1Y3QoXG4gICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdCxcbiAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0RGF0YS5xdWFudGl0eVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBtYXAoKHByb2R1Y3QpID0+IHRoaXMuaGFuZGxlUmVzdWx0cyhwcm9kdWN0LCBwcm9kdWN0RGF0YSkpLFxuICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigocmVzcG9uc2U6IEh0dHBFcnJvclJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvZihcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUVycm9ycyhyZXNwb25zZSwgcHJvZHVjdERhdGEucHJvZHVjdENvZGUpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mKHtcbiAgICAgICAgICAgICAgICAgIHByb2R1Y3RDb2RlOiBwcm9kdWN0RGF0YS5wcm9kdWN0Q29kZSxcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IFByb2R1Y3RJbXBvcnRTdGF0dXMuTElNSVRfRVhDRUVERUQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuICAgICAgKVxuICAgICkucGlwZShtZXJnZUFsbCgpLCB0YWtlKHByb2R1Y3RzRGF0YS5sZW5ndGgpKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVSZXN1bHRzKFxuICAgIHByb2R1Y3Q6IFByb2R1Y3QsXG4gICAgcHJvZHVjdERhdGE6IFByb2R1Y3REYXRhXG4gICk6IFByb2R1Y3RJbXBvcnRJbmZvIHtcbiAgICBpZiAoXG4gICAgICBwcm9kdWN0LnN0b2NrPy5zdG9ja0xldmVsICYmXG4gICAgICBwcm9kdWN0RGF0YS5xdWFudGl0eSA+IHByb2R1Y3Quc3RvY2suc3RvY2tMZXZlbFxuICAgICkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJvZHVjdENvZGU6IHByb2R1Y3REYXRhLnByb2R1Y3RDb2RlLFxuICAgICAgICBwcm9kdWN0TmFtZTogcHJvZHVjdD8ubmFtZSxcbiAgICAgICAgc3RhdHVzQ29kZTogUHJvZHVjdEltcG9ydFN0YXR1cy5MT1dfU1RPQ0ssXG4gICAgICAgIHF1YW50aXR5OiBwcm9kdWN0RGF0YS5xdWFudGl0eSxcbiAgICAgICAgcXVhbnRpdHlBZGRlZDogcHJvZHVjdC5zdG9jay5zdG9ja0xldmVsLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHByb2R1Y3Quc3RvY2s/LnN0b2NrTGV2ZWxTdGF0dXMgPT09ICdvdXRPZlN0b2NrJykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcHJvZHVjdENvZGU6IHByb2R1Y3REYXRhLnByb2R1Y3RDb2RlLFxuICAgICAgICBzdGF0dXNDb2RlOiBQcm9kdWN0SW1wb3J0U3RhdHVzLk5PX1NUT0NLLFxuICAgICAgICBwcm9kdWN0TmFtZTogcHJvZHVjdD8ubmFtZSxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByb2R1Y3RDb2RlOiBwcm9kdWN0RGF0YS5wcm9kdWN0Q29kZSxcbiAgICAgICAgc3RhdHVzQ29kZTogUHJvZHVjdEltcG9ydFN0YXR1cy5TVUNDRVNTLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgaGFuZGxlRXJyb3JzKFxuICAgIHJlc3BvbnNlOiBIdHRwRXJyb3JSZXNwb25zZSxcbiAgICBwcm9kdWN0Q29kZTogc3RyaW5nXG4gICk6IFByb2R1Y3RJbXBvcnRJbmZvIHtcbiAgICBpZiAocmVzcG9uc2U/LmVycm9yPy5lcnJvcnNbMF0udHlwZSA9PT0gJ1Vua25vd25JZGVudGlmaWVyRXJyb3InKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcm9kdWN0Q29kZSxcbiAgICAgICAgc3RhdHVzQ29kZTogUHJvZHVjdEltcG9ydFN0YXR1cy5VTktOT1dOX0lERU5USUZJRVIsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdVbnJlY29nbml6ZWQgY2FydCBhZGQgZW50cnkgYWN0aW9uIHR5cGUgd2hpbGUgbWFwcGluZyBtZXNzYWdlcycsXG4gICAgICAgICAgcmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByb2R1Y3RDb2RlLFxuICAgICAgICBzdGF0dXNDb2RlOiBQcm9kdWN0SW1wb3J0U3RhdHVzLlVOS05PV05fRVJST1IsXG4gICAgICB9O1xuICAgIH1cbiAgfVxufVxuIl19