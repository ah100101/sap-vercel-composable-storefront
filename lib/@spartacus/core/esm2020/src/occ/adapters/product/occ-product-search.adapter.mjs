/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck } from 'rxjs/operators';
import { PRODUCT_SEARCH_PAGE_NORMALIZER, PRODUCT_SUGGESTION_NORMALIZER, } from '../../../product/connectors/search/converters';
import { OCC_HTTP_TOKEN } from '../../utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../services/occ-endpoints.service";
import * as i3 from "../../../util/converter.service";
export class OccProductSearchAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
        this.DEFAULT_SEARCH_CONFIG = {
            pageSize: 20,
        };
    }
    search(query, searchConfig = this.DEFAULT_SEARCH_CONFIG) {
        const context = new HttpContext().set(OCC_HTTP_TOKEN, {
            sendUserIdAsHeader: true,
        });
        return this.http
            .get(this.getSearchEndpoint(query, searchConfig), { context })
            .pipe(this.converter.pipeable(PRODUCT_SEARCH_PAGE_NORMALIZER));
    }
    loadSuggestions(term, pageSize = 3) {
        return this.http
            .get(this.getSuggestionEndpoint(term, pageSize.toString()))
            .pipe(pluck('suggestions'), map((suggestions) => suggestions ?? []), this.converter.pipeableMany(PRODUCT_SUGGESTION_NORMALIZER));
    }
    getSearchEndpoint(query, searchConfig) {
        return this.occEndpoints.buildUrl('productSearch', {
            queryParams: { query, ...searchConfig },
        });
    }
    getSuggestionEndpoint(term, max) {
        return this.occEndpoints.buildUrl('productSuggestions', {
            queryParams: { term, max },
        });
    }
}
OccProductSearchAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccProductSearchAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i3.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccProductSearchAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccProductSearchAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccProductSearchAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i3.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLXByb2R1Y3Qtc2VhcmNoLmFkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9vY2MvYWRhcHRlcnMvcHJvZHVjdC9vY2MtcHJvZHVjdC1zZWFyY2guYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFjLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUs1QyxPQUFPLEVBQ0wsOEJBQThCLEVBQzlCLDZCQUE2QixHQUM5QixNQUFNLCtDQUErQyxDQUFDO0FBTXZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxhQUFhLENBQUM7Ozs7O0FBRTdDLE1BQU0sT0FBTyx1QkFBdUI7SUFDbEMsWUFDWSxJQUFnQixFQUNoQixZQUFpQyxFQUNqQyxTQUEyQjtRQUYzQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFrQjtRQUc5QiwwQkFBcUIsR0FBaUI7WUFDN0MsUUFBUSxFQUFFLEVBQUU7U0FDYixDQUFDO0lBSkMsQ0FBQztJQU1KLE1BQU0sQ0FDSixLQUFhLEVBQ2IsZUFBNkIsSUFBSSxDQUFDLHFCQUFxQjtRQUV2RCxNQUFNLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUU7WUFDcEQsa0JBQWtCLEVBQUUsSUFBSTtTQUN6QixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQzthQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxlQUFlLENBQ2IsSUFBWSxFQUNaLFdBQW1CLENBQUM7UUFFcEIsT0FBTyxJQUFJLENBQUMsSUFBSTthQUNiLEdBQUcsQ0FDRixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUN0RDthQUNBLElBQUksQ0FDSCxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQ3BCLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxFQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyw2QkFBNkIsQ0FBQyxDQUMzRCxDQUFDO0lBQ04sQ0FBQztJQUVTLGlCQUFpQixDQUN6QixLQUFhLEVBQ2IsWUFBMEI7UUFFMUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7WUFDakQsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsWUFBWSxFQUFFO1NBQ3hDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyxxQkFBcUIsQ0FBQyxJQUFZLEVBQUUsR0FBVztRQUN2RCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1lBQ3RELFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7U0FDM0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7b0hBcERVLHVCQUF1Qjt3SEFBdkIsdUJBQXVCOzJGQUF2Qix1QkFBdUI7a0JBRG5DLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwQ29udGV4dCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgcGx1Y2sgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQge1xuICBQcm9kdWN0U2VhcmNoUGFnZSxcbiAgU3VnZ2VzdGlvbixcbn0gZnJvbSAnLi4vLi4vLi4vbW9kZWwvcHJvZHVjdC1zZWFyY2gubW9kZWwnO1xuaW1wb3J0IHtcbiAgUFJPRFVDVF9TRUFSQ0hfUEFHRV9OT1JNQUxJWkVSLFxuICBQUk9EVUNUX1NVR0dFU1RJT05fTk9STUFMSVpFUixcbn0gZnJvbSAnLi4vLi4vLi4vcHJvZHVjdC9jb25uZWN0b3JzL3NlYXJjaC9jb252ZXJ0ZXJzJztcbmltcG9ydCB7IFByb2R1Y3RTZWFyY2hBZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vcHJvZHVjdC9jb25uZWN0b3JzL3NlYXJjaC9wcm9kdWN0LXNlYXJjaC5hZGFwdGVyJztcbmltcG9ydCB7IFNlYXJjaENvbmZpZyB9IGZyb20gJy4uLy4uLy4uL3Byb2R1Y3QvbW9kZWwvc2VhcmNoLWNvbmZpZyc7XG5pbXBvcnQgeyBDb252ZXJ0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vdXRpbC9jb252ZXJ0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBPY2MgfSBmcm9tICcuLi8uLi9vY2MtbW9kZWxzL29jYy5tb2RlbHMnO1xuaW1wb3J0IHsgT2NjRW5kcG9pbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29jYy1lbmRwb2ludHMuc2VydmljZSc7XG5pbXBvcnQgeyBPQ0NfSFRUUF9UT0tFTiB9IGZyb20gJy4uLy4uL3V0aWxzJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPY2NQcm9kdWN0U2VhcmNoQWRhcHRlciBpbXBsZW1lbnRzIFByb2R1Y3RTZWFyY2hBZGFwdGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgcHJvdGVjdGVkIG9jY0VuZHBvaW50czogT2NjRW5kcG9pbnRzU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY29udmVydGVyOiBDb252ZXJ0ZXJTZXJ2aWNlXG4gICkge31cblxuICByZWFkb25seSBERUZBVUxUX1NFQVJDSF9DT05GSUc6IFNlYXJjaENvbmZpZyA9IHtcbiAgICBwYWdlU2l6ZTogMjAsXG4gIH07XG5cbiAgc2VhcmNoKFxuICAgIHF1ZXJ5OiBzdHJpbmcsXG4gICAgc2VhcmNoQ29uZmlnOiBTZWFyY2hDb25maWcgPSB0aGlzLkRFRkFVTFRfU0VBUkNIX0NPTkZJR1xuICApOiBPYnNlcnZhYmxlPFByb2R1Y3RTZWFyY2hQYWdlPiB7XG4gICAgY29uc3QgY29udGV4dCA9IG5ldyBIdHRwQ29udGV4dCgpLnNldChPQ0NfSFRUUF9UT0tFTiwge1xuICAgICAgc2VuZFVzZXJJZEFzSGVhZGVyOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLmdldCh0aGlzLmdldFNlYXJjaEVuZHBvaW50KHF1ZXJ5LCBzZWFyY2hDb25maWcpLCB7IGNvbnRleHQgfSlcbiAgICAgIC5waXBlKHRoaXMuY29udmVydGVyLnBpcGVhYmxlKFBST0RVQ1RfU0VBUkNIX1BBR0VfTk9STUFMSVpFUikpO1xuICB9XG5cbiAgbG9hZFN1Z2dlc3Rpb25zKFxuICAgIHRlcm06IHN0cmluZyxcbiAgICBwYWdlU2l6ZTogbnVtYmVyID0gM1xuICApOiBPYnNlcnZhYmxlPFN1Z2dlc3Rpb25bXT4ge1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5nZXQ8T2NjLlN1Z2dlc3Rpb25MaXN0PihcbiAgICAgICAgdGhpcy5nZXRTdWdnZXN0aW9uRW5kcG9pbnQodGVybSwgcGFnZVNpemUudG9TdHJpbmcoKSlcbiAgICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBwbHVjaygnc3VnZ2VzdGlvbnMnKSxcbiAgICAgICAgbWFwKChzdWdnZXN0aW9ucykgPT4gc3VnZ2VzdGlvbnMgPz8gW10pLFxuICAgICAgICB0aGlzLmNvbnZlcnRlci5waXBlYWJsZU1hbnkoUFJPRFVDVF9TVUdHRVNUSU9OX05PUk1BTElaRVIpXG4gICAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFNlYXJjaEVuZHBvaW50KFxuICAgIHF1ZXJ5OiBzdHJpbmcsXG4gICAgc2VhcmNoQ29uZmlnOiBTZWFyY2hDb25maWdcbiAgKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5vY2NFbmRwb2ludHMuYnVpbGRVcmwoJ3Byb2R1Y3RTZWFyY2gnLCB7XG4gICAgICBxdWVyeVBhcmFtczogeyBxdWVyeSwgLi4uc2VhcmNoQ29uZmlnIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0U3VnZ2VzdGlvbkVuZHBvaW50KHRlcm06IHN0cmluZywgbWF4OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgncHJvZHVjdFN1Z2dlc3Rpb25zJywge1xuICAgICAgcXVlcnlQYXJhbXM6IHsgdGVybSwgbWF4IH0sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==