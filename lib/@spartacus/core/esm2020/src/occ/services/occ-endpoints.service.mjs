/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpParams } from '@angular/common/http';
import { Injectable, isDevMode, Optional } from '@angular/core';
import { StringTemplate } from '../../config/utils/string-template';
import { getContextParameterDefault } from '../../site-context/config/context-config-utils';
import { BASE_SITE_CONTEXT_ID } from '../../site-context/providers/context-ids';
import { HttpParamsURIEncoder } from '../../util/http-params-uri.encoder';
import { DEFAULT_SCOPE } from '../occ-models/occ-endpoints.model';
import { urlPathJoin } from '../utils/occ-url-util';
import * as i0 from "@angular/core";
import * as i1 from "../config/occ-config";
import * as i2 from "../../site-context/facade/base-site.service";
export class OccEndpointsService {
    get activeBaseSite() {
        return (this._activeBaseSite ??
            getContextParameterDefault(this.config, BASE_SITE_CONTEXT_ID));
    }
    constructor(config, baseSiteService) {
        this.config = config;
        this.baseSiteService = baseSiteService;
        if (this.baseSiteService) {
            this.baseSiteService
                .getActive()
                .subscribe((value) => (this._activeBaseSite = value));
        }
    }
    /**
     * Returns the value configured for a specific endpoint
     *
     * @param endpointKey the configuration key for the endpoint to return
     * @param scope endpoint configuration scope
     */
    getRawEndpointValue(endpoint, scope) {
        const endpointValue = this.getEndpointForScope(endpoint, scope);
        return endpointValue;
    }
    /**
     * Returns true when the endpoint is configured
     *
     * @param endpointKey the configuration key for the endpoint to return
     * @param scope endpoint configuration scope
     */
    isConfigured(endpoint, scope) {
        return !(typeof this.getEndpointFromConfig(endpoint, scope) === 'undefined');
    }
    /**
     * Returns base OCC endpoint (baseUrl + prefix + baseSite) base on provided values
     *
     * @param baseUrlProperties Specify properties to not add to the url (baseUrl, prefix, baseSite)
     */
    getBaseUrl(baseUrlProperties = {
        baseUrl: true,
        prefix: true,
        baseSite: true,
    }) {
        const baseUrl = baseUrlProperties.baseUrl === false
            ? ''
            : this.config?.backend?.occ?.baseUrl ?? '';
        const prefix = baseUrlProperties.prefix === false ? '' : this.getPrefix();
        const baseSite = baseUrlProperties.baseSite === false ? '' : this.activeBaseSite;
        return urlPathJoin(baseUrl, prefix, baseSite);
    }
    /**
     * Returns a fully qualified OCC Url
     *
     * @param endpoint Name of the OCC endpoint key
     * @param attributes Dynamic attributes used to build the url
     * @param propertiesToOmit Specify properties to not add to the url (baseUrl, prefix, baseSite)
     */
    buildUrl(endpoint, attributes, propertiesToOmit) {
        let url = this.getEndpointForScope(endpoint, attributes?.scope);
        if (attributes) {
            const { urlParams, queryParams } = attributes;
            if (urlParams) {
                url = StringTemplate.resolve(url, urlParams, true);
            }
            if (queryParams) {
                let httpParamsOptions = { encoder: new HttpParamsURIEncoder() };
                if (url.includes('?')) {
                    let queryParamsFromEndpoint;
                    [url, queryParamsFromEndpoint] = url.split('?');
                    httpParamsOptions = {
                        ...httpParamsOptions,
                        ...{ fromString: queryParamsFromEndpoint },
                    };
                }
                const httpParams = this.getHttpParamsFromQueryParams(queryParams, httpParamsOptions);
                const params = httpParams.toString();
                if (params.length) {
                    url += '?' + params;
                }
            }
        }
        return this.buildUrlFromEndpointString(url, propertiesToOmit);
    }
    getHttpParamsFromQueryParams(queryParams, options) {
        let httpParams = new HttpParams(options);
        Object.keys(queryParams).forEach((key) => {
            const value = queryParams[key];
            if (value !== undefined) {
                if (value === null) {
                    httpParams = httpParams.delete(key);
                }
                else {
                    httpParams = httpParams.set(key, value);
                }
            }
        });
        return httpParams;
    }
    getEndpointFromConfig(endpoint, scope) {
        const endpointsConfig = this.config.backend?.occ?.endpoints;
        if (!endpointsConfig) {
            return undefined;
        }
        const endpointConfig = endpointsConfig[endpoint];
        if (scope) {
            if (scope === DEFAULT_SCOPE && typeof endpointConfig === 'string') {
                return endpointConfig;
            }
            return endpointConfig?.[scope];
        }
        return typeof endpointConfig === 'string'
            ? endpointConfig
            : endpointConfig?.[DEFAULT_SCOPE];
    }
    // TODO: Can we reuse getEndpointFromConfig in this method? Should we change behavior of this function?
    getEndpointForScope(endpoint, scope) {
        const endpointsConfig = this.config.backend?.occ?.endpoints;
        if (!endpointsConfig) {
            return '';
        }
        const endpointConfig = endpointsConfig[endpoint];
        if (scope) {
            if (endpointConfig?.[scope]) {
                return endpointConfig?.[scope];
            }
            if (scope === DEFAULT_SCOPE && typeof endpointConfig === 'string') {
                return endpointConfig;
            }
            if (isDevMode()) {
                console.warn(`${endpoint} endpoint configuration missing for scope "${scope}"`);
            }
        }
        return ((typeof endpointConfig === 'string'
            ? endpointConfig
            : endpointConfig?.[DEFAULT_SCOPE]) || endpoint);
    }
    /**
     * Add the base OCC url properties to the specified endpoint string
     *
     * @param endpointString String value for the url endpoint
     * @param propertiesToOmit Specify properties to not add to the url (baseUrl, prefix, baseSite)
     */
    buildUrlFromEndpointString(endpointString, propertiesToOmit) {
        return urlPathJoin(this.getBaseUrl(propertiesToOmit), endpointString);
    }
    getPrefix() {
        if (this.config?.backend?.occ?.prefix &&
            !this.config.backend.occ.prefix.startsWith('/')) {
            return '/' + this.config.backend.occ.prefix;
        }
        return this.config?.backend?.occ?.prefix ?? '';
    }
}
OccEndpointsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccEndpointsService, deps: [{ token: i1.OccConfig }, { token: i2.BaseSiteService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
OccEndpointsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccEndpointsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccEndpointsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.OccConfig }, { type: i2.BaseSiteService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWVuZHBvaW50cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvb2NjL3NlcnZpY2VzL29jYy1lbmRwb2ludHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBcUIsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBRTVGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRTFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7QUFpQnBELE1BQU0sT0FBTyxtQkFBbUI7SUFHOUIsSUFBWSxjQUFjO1FBQ3hCLE9BQU8sQ0FDTCxJQUFJLENBQUMsZUFBZTtZQUNwQiwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLG9CQUFvQixDQUFDLENBQzlELENBQUM7SUFDSixDQUFDO0lBRUQsWUFDVSxNQUFpQixFQUNMLGVBQWdDO1FBRDVDLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDTCxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFFcEQsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxlQUFlO2lCQUNqQixTQUFTLEVBQUU7aUJBQ1gsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN6RDtJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILG1CQUFtQixDQUFDLFFBQWdCLEVBQUUsS0FBYztRQUNsRCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWhFLE9BQU8sYUFBYSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFlBQVksQ0FBQyxRQUFnQixFQUFFLEtBQWM7UUFDM0MsT0FBTyxDQUFDLENBQ04sT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxLQUFLLFdBQVcsQ0FDbkUsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsVUFBVSxDQUNSLG9CQUEwQztRQUN4QyxPQUFPLEVBQUUsSUFBSTtRQUNiLE1BQU0sRUFBRSxJQUFJO1FBQ1osUUFBUSxFQUFFLElBQUk7S0FDZjtRQUVELE1BQU0sT0FBTyxHQUNYLGlCQUFpQixDQUFDLE9BQU8sS0FBSyxLQUFLO1lBQ2pDLENBQUMsQ0FBQyxFQUFFO1lBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxPQUFPLElBQUksRUFBRSxDQUFDO1FBQy9DLE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFFLE1BQU0sUUFBUSxHQUNaLGlCQUFpQixDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUVsRSxPQUFPLFdBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxRQUFRLENBQ04sUUFBZ0IsRUFDaEIsVUFBOEIsRUFDOUIsZ0JBQXVDO1FBRXZDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWhFLElBQUksVUFBVSxFQUFFO1lBQ2QsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFFOUMsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsR0FBRyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNwRDtZQUVELElBQUksV0FBVyxFQUFFO2dCQUNmLElBQUksaUJBQWlCLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxvQkFBb0IsRUFBRSxFQUFFLENBQUM7Z0JBRWhFLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDckIsSUFBSSx1QkFBK0IsQ0FBQztvQkFDcEMsQ0FBQyxHQUFHLEVBQUUsdUJBQXVCLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNoRCxpQkFBaUIsR0FBRzt3QkFDbEIsR0FBRyxpQkFBaUI7d0JBQ3BCLEdBQUcsRUFBRSxVQUFVLEVBQUUsdUJBQXVCLEVBQUU7cUJBQzNDLENBQUM7aUJBQ0g7Z0JBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLDRCQUE0QixDQUNsRCxXQUFXLEVBQ1gsaUJBQWlCLENBQ2xCLENBQUM7Z0JBRUYsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNyQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7b0JBQ2pCLEdBQUcsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDO2lCQUNyQjthQUNGO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRVMsNEJBQTRCLENBQ3BDLFdBQWdCLEVBQ2hCLE9BQTBCO1FBRTFCLElBQUksVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDdkMsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEdBQW1CLENBQUMsQ0FBQztZQUMvQyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQ3ZCLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtvQkFDbEIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3JDO3FCQUFNO29CQUNMLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDekM7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVPLHFCQUFxQixDQUMzQixRQUFnQixFQUNoQixLQUFjO1FBRWQsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQztRQUU1RCxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3BCLE9BQU8sU0FBUyxDQUFDO1NBQ2xCO1FBRUQsTUFBTSxjQUFjLEdBQ2xCLGVBQWUsQ0FBQyxRQUF3QyxDQUFDLENBQUM7UUFFNUQsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLEtBQUssS0FBSyxhQUFhLElBQUksT0FBTyxjQUFjLEtBQUssUUFBUSxFQUFFO2dCQUNqRSxPQUFPLGNBQWMsQ0FBQzthQUN2QjtZQUNELE9BQU8sY0FBYyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7UUFFRCxPQUFPLE9BQU8sY0FBYyxLQUFLLFFBQVE7WUFDdkMsQ0FBQyxDQUFDLGNBQWM7WUFDaEIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCx1R0FBdUc7SUFDL0YsbUJBQW1CLENBQUMsUUFBZ0IsRUFBRSxLQUFjO1FBQzFELE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUM7UUFFNUQsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNwQixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsTUFBTSxjQUFjLEdBQ2xCLGVBQWUsQ0FBQyxRQUF3QyxDQUFDLENBQUM7UUFFNUQsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLGNBQWMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMzQixPQUFPLGNBQWMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hDO1lBQ0QsSUFBSSxLQUFLLEtBQUssYUFBYSxJQUFJLE9BQU8sY0FBYyxLQUFLLFFBQVEsRUFBRTtnQkFDakUsT0FBTyxjQUFjLENBQUM7YUFDdkI7WUFDRCxJQUFJLFNBQVMsRUFBRSxFQUFFO2dCQUNmLE9BQU8sQ0FBQyxJQUFJLENBQ1YsR0FBRyxRQUFRLDhDQUE4QyxLQUFLLEdBQUcsQ0FDbEUsQ0FBQzthQUNIO1NBQ0Y7UUFFRCxPQUFPLENBQ0wsQ0FBQyxPQUFPLGNBQWMsS0FBSyxRQUFRO1lBQ2pDLENBQUMsQ0FBQyxjQUFjO1lBQ2hCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FDakQsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLDBCQUEwQixDQUNoQyxjQUFzQixFQUN0QixnQkFBdUM7UUFFdkMsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTyxTQUFTO1FBQ2YsSUFDRSxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTTtZQUNqQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUMvQztZQUNBLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7U0FDN0M7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLElBQUksRUFBRSxDQUFDO0lBQ2pELENBQUM7O2dIQXBOVSxtQkFBbUI7b0hBQW5CLG1CQUFtQixjQUZsQixNQUFNOzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7OzBCQWFJLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBIdHRwUGFyYW1zLCBIdHRwUGFyYW1zT3B0aW9ucyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUsIGlzRGV2TW9kZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0cmluZ1RlbXBsYXRlIH0gZnJvbSAnLi4vLi4vY29uZmlnL3V0aWxzL3N0cmluZy10ZW1wbGF0ZSc7XG5pbXBvcnQgeyBnZXRDb250ZXh0UGFyYW1ldGVyRGVmYXVsdCB9IGZyb20gJy4uLy4uL3NpdGUtY29udGV4dC9jb25maWcvY29udGV4dC1jb25maWctdXRpbHMnO1xuaW1wb3J0IHsgQmFzZVNpdGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2l0ZS1jb250ZXh0L2ZhY2FkZS9iYXNlLXNpdGUuc2VydmljZSc7XG5pbXBvcnQgeyBCQVNFX1NJVEVfQ09OVEVYVF9JRCB9IGZyb20gJy4uLy4uL3NpdGUtY29udGV4dC9wcm92aWRlcnMvY29udGV4dC1pZHMnO1xuaW1wb3J0IHsgSHR0cFBhcmFtc1VSSUVuY29kZXIgfSBmcm9tICcuLi8uLi91dGlsL2h0dHAtcGFyYW1zLXVyaS5lbmNvZGVyJztcbmltcG9ydCB7IE9jY0NvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9vY2MtY29uZmlnJztcbmltcG9ydCB7IERFRkFVTFRfU0NPUEUgfSBmcm9tICcuLi9vY2MtbW9kZWxzL29jYy1lbmRwb2ludHMubW9kZWwnO1xuaW1wb3J0IHsgdXJsUGF0aEpvaW4gfSBmcm9tICcuLi91dGlscy9vY2MtdXJsLXV0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VPY2NVcmxQcm9wZXJ0aWVzIHtcbiAgYmFzZVVybD86IGJvb2xlYW47XG4gIHByZWZpeD86IGJvb2xlYW47XG4gIGJhc2VTaXRlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEeW5hbWljQXR0cmlidXRlcyB7XG4gIHVybFBhcmFtcz86IG9iamVjdDtcbiAgcXVlcnlQYXJhbXM/OiBvYmplY3Q7XG4gIHNjb3BlPzogc3RyaW5nO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgT2NjRW5kcG9pbnRzU2VydmljZSB7XG4gIHByaXZhdGUgX2FjdGl2ZUJhc2VTaXRlOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBnZXQgYWN0aXZlQmFzZVNpdGUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5fYWN0aXZlQmFzZVNpdGUgPz9cbiAgICAgIGdldENvbnRleHRQYXJhbWV0ZXJEZWZhdWx0KHRoaXMuY29uZmlnLCBCQVNFX1NJVEVfQ09OVEVYVF9JRClcbiAgICApO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb25maWc6IE9jY0NvbmZpZyxcbiAgICBAT3B0aW9uYWwoKSBwcml2YXRlIGJhc2VTaXRlU2VydmljZTogQmFzZVNpdGVTZXJ2aWNlXG4gICkge1xuICAgIGlmICh0aGlzLmJhc2VTaXRlU2VydmljZSkge1xuICAgICAgdGhpcy5iYXNlU2l0ZVNlcnZpY2VcbiAgICAgICAgLmdldEFjdGl2ZSgpXG4gICAgICAgIC5zdWJzY3JpYmUoKHZhbHVlKSA9PiAodGhpcy5fYWN0aXZlQmFzZVNpdGUgPSB2YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB2YWx1ZSBjb25maWd1cmVkIGZvciBhIHNwZWNpZmljIGVuZHBvaW50XG4gICAqXG4gICAqIEBwYXJhbSBlbmRwb2ludEtleSB0aGUgY29uZmlndXJhdGlvbiBrZXkgZm9yIHRoZSBlbmRwb2ludCB0byByZXR1cm5cbiAgICogQHBhcmFtIHNjb3BlIGVuZHBvaW50IGNvbmZpZ3VyYXRpb24gc2NvcGVcbiAgICovXG4gIGdldFJhd0VuZHBvaW50VmFsdWUoZW5kcG9pbnQ6IHN0cmluZywgc2NvcGU/OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGVuZHBvaW50VmFsdWUgPSB0aGlzLmdldEVuZHBvaW50Rm9yU2NvcGUoZW5kcG9pbnQsIHNjb3BlKTtcblxuICAgIHJldHVybiBlbmRwb2ludFZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSB3aGVuIHRoZSBlbmRwb2ludCBpcyBjb25maWd1cmVkXG4gICAqXG4gICAqIEBwYXJhbSBlbmRwb2ludEtleSB0aGUgY29uZmlndXJhdGlvbiBrZXkgZm9yIHRoZSBlbmRwb2ludCB0byByZXR1cm5cbiAgICogQHBhcmFtIHNjb3BlIGVuZHBvaW50IGNvbmZpZ3VyYXRpb24gc2NvcGVcbiAgICovXG4gIGlzQ29uZmlndXJlZChlbmRwb2ludDogc3RyaW5nLCBzY29wZT86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhKFxuICAgICAgdHlwZW9mIHRoaXMuZ2V0RW5kcG9pbnRGcm9tQ29uZmlnKGVuZHBvaW50LCBzY29wZSkgPT09ICd1bmRlZmluZWQnXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGJhc2UgT0NDIGVuZHBvaW50IChiYXNlVXJsICsgcHJlZml4ICsgYmFzZVNpdGUpIGJhc2Ugb24gcHJvdmlkZWQgdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSBiYXNlVXJsUHJvcGVydGllcyBTcGVjaWZ5IHByb3BlcnRpZXMgdG8gbm90IGFkZCB0byB0aGUgdXJsIChiYXNlVXJsLCBwcmVmaXgsIGJhc2VTaXRlKVxuICAgKi9cbiAgZ2V0QmFzZVVybChcbiAgICBiYXNlVXJsUHJvcGVydGllczogQmFzZU9jY1VybFByb3BlcnRpZXMgPSB7XG4gICAgICBiYXNlVXJsOiB0cnVlLFxuICAgICAgcHJlZml4OiB0cnVlLFxuICAgICAgYmFzZVNpdGU6IHRydWUsXG4gICAgfVxuICApOiBzdHJpbmcge1xuICAgIGNvbnN0IGJhc2VVcmwgPVxuICAgICAgYmFzZVVybFByb3BlcnRpZXMuYmFzZVVybCA9PT0gZmFsc2VcbiAgICAgICAgPyAnJ1xuICAgICAgICA6IHRoaXMuY29uZmlnPy5iYWNrZW5kPy5vY2M/LmJhc2VVcmwgPz8gJyc7XG4gICAgY29uc3QgcHJlZml4ID0gYmFzZVVybFByb3BlcnRpZXMucHJlZml4ID09PSBmYWxzZSA/ICcnIDogdGhpcy5nZXRQcmVmaXgoKTtcbiAgICBjb25zdCBiYXNlU2l0ZSA9XG4gICAgICBiYXNlVXJsUHJvcGVydGllcy5iYXNlU2l0ZSA9PT0gZmFsc2UgPyAnJyA6IHRoaXMuYWN0aXZlQmFzZVNpdGU7XG5cbiAgICByZXR1cm4gdXJsUGF0aEpvaW4oYmFzZVVybCwgcHJlZml4LCBiYXNlU2l0ZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGZ1bGx5IHF1YWxpZmllZCBPQ0MgVXJsXG4gICAqXG4gICAqIEBwYXJhbSBlbmRwb2ludCBOYW1lIG9mIHRoZSBPQ0MgZW5kcG9pbnQga2V5XG4gICAqIEBwYXJhbSBhdHRyaWJ1dGVzIER5bmFtaWMgYXR0cmlidXRlcyB1c2VkIHRvIGJ1aWxkIHRoZSB1cmxcbiAgICogQHBhcmFtIHByb3BlcnRpZXNUb09taXQgU3BlY2lmeSBwcm9wZXJ0aWVzIHRvIG5vdCBhZGQgdG8gdGhlIHVybCAoYmFzZVVybCwgcHJlZml4LCBiYXNlU2l0ZSlcbiAgICovXG4gIGJ1aWxkVXJsKFxuICAgIGVuZHBvaW50OiBzdHJpbmcsXG4gICAgYXR0cmlidXRlcz86IER5bmFtaWNBdHRyaWJ1dGVzLFxuICAgIHByb3BlcnRpZXNUb09taXQ/OiBCYXNlT2NjVXJsUHJvcGVydGllc1xuICApOiBzdHJpbmcge1xuICAgIGxldCB1cmwgPSB0aGlzLmdldEVuZHBvaW50Rm9yU2NvcGUoZW5kcG9pbnQsIGF0dHJpYnV0ZXM/LnNjb3BlKTtcblxuICAgIGlmIChhdHRyaWJ1dGVzKSB7XG4gICAgICBjb25zdCB7IHVybFBhcmFtcywgcXVlcnlQYXJhbXMgfSA9IGF0dHJpYnV0ZXM7XG5cbiAgICAgIGlmICh1cmxQYXJhbXMpIHtcbiAgICAgICAgdXJsID0gU3RyaW5nVGVtcGxhdGUucmVzb2x2ZSh1cmwsIHVybFBhcmFtcywgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChxdWVyeVBhcmFtcykge1xuICAgICAgICBsZXQgaHR0cFBhcmFtc09wdGlvbnMgPSB7IGVuY29kZXI6IG5ldyBIdHRwUGFyYW1zVVJJRW5jb2RlcigpIH07XG5cbiAgICAgICAgaWYgKHVybC5pbmNsdWRlcygnPycpKSB7XG4gICAgICAgICAgbGV0IHF1ZXJ5UGFyYW1zRnJvbUVuZHBvaW50OiBzdHJpbmc7XG4gICAgICAgICAgW3VybCwgcXVlcnlQYXJhbXNGcm9tRW5kcG9pbnRdID0gdXJsLnNwbGl0KCc/Jyk7XG4gICAgICAgICAgaHR0cFBhcmFtc09wdGlvbnMgPSB7XG4gICAgICAgICAgICAuLi5odHRwUGFyYW1zT3B0aW9ucyxcbiAgICAgICAgICAgIC4uLnsgZnJvbVN0cmluZzogcXVlcnlQYXJhbXNGcm9tRW5kcG9pbnQgfSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaHR0cFBhcmFtcyA9IHRoaXMuZ2V0SHR0cFBhcmFtc0Zyb21RdWVyeVBhcmFtcyhcbiAgICAgICAgICBxdWVyeVBhcmFtcyxcbiAgICAgICAgICBodHRwUGFyYW1zT3B0aW9uc1xuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IGh0dHBQYXJhbXMudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHBhcmFtcy5sZW5ndGgpIHtcbiAgICAgICAgICB1cmwgKz0gJz8nICsgcGFyYW1zO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYnVpbGRVcmxGcm9tRW5kcG9pbnRTdHJpbmcodXJsLCBwcm9wZXJ0aWVzVG9PbWl0KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRIdHRwUGFyYW1zRnJvbVF1ZXJ5UGFyYW1zKFxuICAgIHF1ZXJ5UGFyYW1zOiBhbnksXG4gICAgb3B0aW9uczogSHR0cFBhcmFtc09wdGlvbnNcbiAgKSB7XG4gICAgbGV0IGh0dHBQYXJhbXMgPSBuZXcgSHR0cFBhcmFtcyhvcHRpb25zKTtcbiAgICBPYmplY3Qua2V5cyhxdWVyeVBhcmFtcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHF1ZXJ5UGFyYW1zW2tleSBhcyBrZXlvZiBvYmplY3RdO1xuICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuZGVsZXRlKGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gIH1cblxuICBwcml2YXRlIGdldEVuZHBvaW50RnJvbUNvbmZpZyhcbiAgICBlbmRwb2ludDogc3RyaW5nLFxuICAgIHNjb3BlPzogc3RyaW5nXG4gICk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZW5kcG9pbnRzQ29uZmlnID0gdGhpcy5jb25maWcuYmFja2VuZD8ub2NjPy5lbmRwb2ludHM7XG5cbiAgICBpZiAoIWVuZHBvaW50c0NvbmZpZykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBlbmRwb2ludENvbmZpZzogYW55ID1cbiAgICAgIGVuZHBvaW50c0NvbmZpZ1tlbmRwb2ludCBhcyBrZXlvZiB0eXBlb2YgZW5kcG9pbnRzQ29uZmlnXTtcblxuICAgIGlmIChzY29wZSkge1xuICAgICAgaWYgKHNjb3BlID09PSBERUZBVUxUX1NDT1BFICYmIHR5cGVvZiBlbmRwb2ludENvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGVuZHBvaW50Q29uZmlnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVuZHBvaW50Q29uZmlnPy5bc2NvcGVdO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlb2YgZW5kcG9pbnRDb25maWcgPT09ICdzdHJpbmcnXG4gICAgICA/IGVuZHBvaW50Q29uZmlnXG4gICAgICA6IGVuZHBvaW50Q29uZmlnPy5bREVGQVVMVF9TQ09QRV07XG4gIH1cblxuICAvLyBUT0RPOiBDYW4gd2UgcmV1c2UgZ2V0RW5kcG9pbnRGcm9tQ29uZmlnIGluIHRoaXMgbWV0aG9kPyBTaG91bGQgd2UgY2hhbmdlIGJlaGF2aW9yIG9mIHRoaXMgZnVuY3Rpb24/XG4gIHByaXZhdGUgZ2V0RW5kcG9pbnRGb3JTY29wZShlbmRwb2ludDogc3RyaW5nLCBzY29wZT86IHN0cmluZyk6IHN0cmluZyB7XG4gICAgY29uc3QgZW5kcG9pbnRzQ29uZmlnID0gdGhpcy5jb25maWcuYmFja2VuZD8ub2NjPy5lbmRwb2ludHM7XG5cbiAgICBpZiAoIWVuZHBvaW50c0NvbmZpZykge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIGNvbnN0IGVuZHBvaW50Q29uZmlnOiBhbnkgPVxuICAgICAgZW5kcG9pbnRzQ29uZmlnW2VuZHBvaW50IGFzIGtleW9mIHR5cGVvZiBlbmRwb2ludHNDb25maWddO1xuXG4gICAgaWYgKHNjb3BlKSB7XG4gICAgICBpZiAoZW5kcG9pbnRDb25maWc/LltzY29wZV0pIHtcbiAgICAgICAgcmV0dXJuIGVuZHBvaW50Q29uZmlnPy5bc2NvcGVdO1xuICAgICAgfVxuICAgICAgaWYgKHNjb3BlID09PSBERUZBVUxUX1NDT1BFICYmIHR5cGVvZiBlbmRwb2ludENvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGVuZHBvaW50Q29uZmlnO1xuICAgICAgfVxuICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgJHtlbmRwb2ludH0gZW5kcG9pbnQgY29uZmlndXJhdGlvbiBtaXNzaW5nIGZvciBzY29wZSBcIiR7c2NvcGV9XCJgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICh0eXBlb2YgZW5kcG9pbnRDb25maWcgPT09ICdzdHJpbmcnXG4gICAgICAgID8gZW5kcG9pbnRDb25maWdcbiAgICAgICAgOiBlbmRwb2ludENvbmZpZz8uW0RFRkFVTFRfU0NPUEVdKSB8fCBlbmRwb2ludFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHRoZSBiYXNlIE9DQyB1cmwgcHJvcGVydGllcyB0byB0aGUgc3BlY2lmaWVkIGVuZHBvaW50IHN0cmluZ1xuICAgKlxuICAgKiBAcGFyYW0gZW5kcG9pbnRTdHJpbmcgU3RyaW5nIHZhbHVlIGZvciB0aGUgdXJsIGVuZHBvaW50XG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzVG9PbWl0IFNwZWNpZnkgcHJvcGVydGllcyB0byBub3QgYWRkIHRvIHRoZSB1cmwgKGJhc2VVcmwsIHByZWZpeCwgYmFzZVNpdGUpXG4gICAqL1xuICBwcml2YXRlIGJ1aWxkVXJsRnJvbUVuZHBvaW50U3RyaW5nKFxuICAgIGVuZHBvaW50U3RyaW5nOiBzdHJpbmcsXG4gICAgcHJvcGVydGllc1RvT21pdD86IEJhc2VPY2NVcmxQcm9wZXJ0aWVzXG4gICk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHVybFBhdGhKb2luKHRoaXMuZ2V0QmFzZVVybChwcm9wZXJ0aWVzVG9PbWl0KSwgZW5kcG9pbnRTdHJpbmcpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQcmVmaXgoKTogc3RyaW5nIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmNvbmZpZz8uYmFja2VuZD8ub2NjPy5wcmVmaXggJiZcbiAgICAgICF0aGlzLmNvbmZpZy5iYWNrZW5kLm9jYy5wcmVmaXguc3RhcnRzV2l0aCgnLycpXG4gICAgKSB7XG4gICAgICByZXR1cm4gJy8nICsgdGhpcy5jb25maWcuYmFja2VuZC5vY2MucHJlZml4O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb25maWc/LmJhY2tlbmQ/Lm9jYz8ucHJlZml4ID8/ICcnO1xuICB9XG59XG5cbi8vIENIRUNLIFNPTkFSXG4iXX0=