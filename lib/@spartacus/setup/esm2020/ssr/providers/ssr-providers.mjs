/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { SERVER_REQUEST_ORIGIN, SERVER_REQUEST_URL } from '@spartacus/core';
import { getRequestOrigin } from '../express-utils/express-request-origin';
import { getRequestUrl } from '../express-utils/express-request-url';
import { serverRequestOriginFactory } from './server-request-origin';
import { serverRequestUrlFactory } from './server-request-url';
/**
 * Returns the providers used for SSR and pre-rendering processes.
 */
export function provideServer(options) {
    return [
        {
            provide: SERVER_REQUEST_ORIGIN,
            useFactory: serverRequestOriginFactory(options),
        },
        {
            provide: SERVER_REQUEST_URL,
            useFactory: serverRequestUrlFactory(options),
        },
    ];
}
/**
 * Returns Spartacus providers to be passed to the Angular express engine (in SSR)
 *
 * @param options
 */
export function getServerRequestProviders() {
    return [
        {
            provide: SERVER_REQUEST_ORIGIN,
            useFactory: getRequestOrigin,
            deps: [REQUEST],
        },
        {
            provide: SERVER_REQUEST_URL,
            useFactory: getRequestUrl,
            deps: [REQUEST],
        },
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3NyLXByb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2NvcmUtbGlicy9zZXR1cC9zc3IvcHJvdmlkZXJzL3Nzci1wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUdILE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUM3RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFckUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFL0Q7O0dBRUc7QUFDSCxNQUFNLFVBQVUsYUFBYSxDQUFDLE9BQXVCO0lBQ25ELE9BQU87UUFDTDtZQUNFLE9BQU8sRUFBRSxxQkFBcUI7WUFDOUIsVUFBVSxFQUFFLDBCQUEwQixDQUFDLE9BQU8sQ0FBQztTQUNoRDtRQUNEO1lBQ0UsT0FBTyxFQUFFLGtCQUFrQjtZQUMzQixVQUFVLEVBQUUsdUJBQXVCLENBQUMsT0FBTyxDQUFDO1NBQzdDO0tBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHlCQUF5QjtJQUN2QyxPQUFPO1FBQ0w7WUFDRSxPQUFPLEVBQUUscUJBQXFCO1lBQzlCLFVBQVUsRUFBRSxnQkFBZ0I7WUFDNUIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO1NBQ2hCO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLFVBQVUsRUFBRSxhQUFhO1lBQ3pCLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQztTQUNoQjtLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgU3RhdGljUHJvdmlkZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJFUVVFU1QgfSBmcm9tICdAbmd1bml2ZXJzYWwvZXhwcmVzcy1lbmdpbmUvdG9rZW5zJztcbmltcG9ydCB7IFNFUlZFUl9SRVFVRVNUX09SSUdJTiwgU0VSVkVSX1JFUVVFU1RfVVJMIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGdldFJlcXVlc3RPcmlnaW4gfSBmcm9tICcuLi9leHByZXNzLXV0aWxzL2V4cHJlc3MtcmVxdWVzdC1vcmlnaW4nO1xuaW1wb3J0IHsgZ2V0UmVxdWVzdFVybCB9IGZyb20gJy4uL2V4cHJlc3MtdXRpbHMvZXhwcmVzcy1yZXF1ZXN0LXVybCc7XG5pbXBvcnQgeyBTZXJ2ZXJPcHRpb25zIH0gZnJvbSAnLi9tb2RlbCc7XG5pbXBvcnQgeyBzZXJ2ZXJSZXF1ZXN0T3JpZ2luRmFjdG9yeSB9IGZyb20gJy4vc2VydmVyLXJlcXVlc3Qtb3JpZ2luJztcbmltcG9ydCB7IHNlcnZlclJlcXVlc3RVcmxGYWN0b3J5IH0gZnJvbSAnLi9zZXJ2ZXItcmVxdWVzdC11cmwnO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIHByb3ZpZGVycyB1c2VkIGZvciBTU1IgYW5kIHByZS1yZW5kZXJpbmcgcHJvY2Vzc2VzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZVNlcnZlcihvcHRpb25zPzogU2VydmVyT3B0aW9ucyk6IFN0YXRpY1Byb3ZpZGVyW10ge1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IFNFUlZFUl9SRVFVRVNUX09SSUdJTixcbiAgICAgIHVzZUZhY3Rvcnk6IHNlcnZlclJlcXVlc3RPcmlnaW5GYWN0b3J5KG9wdGlvbnMpLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogU0VSVkVSX1JFUVVFU1RfVVJMLFxuICAgICAgdXNlRmFjdG9yeTogc2VydmVyUmVxdWVzdFVybEZhY3Rvcnkob3B0aW9ucyksXG4gICAgfSxcbiAgXTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIFNwYXJ0YWN1cyBwcm92aWRlcnMgdG8gYmUgcGFzc2VkIHRvIHRoZSBBbmd1bGFyIGV4cHJlc3MgZW5naW5lIChpbiBTU1IpXG4gKlxuICogQHBhcmFtIG9wdGlvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNlcnZlclJlcXVlc3RQcm92aWRlcnMoKTogU3RhdGljUHJvdmlkZXJbXSB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogU0VSVkVSX1JFUVVFU1RfT1JJR0lOLFxuICAgICAgdXNlRmFjdG9yeTogZ2V0UmVxdWVzdE9yaWdpbixcbiAgICAgIGRlcHM6IFtSRVFVRVNUXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFNFUlZFUl9SRVFVRVNUX1VSTCxcbiAgICAgIHVzZUZhY3Rvcnk6IGdldFJlcXVlc3RVcmwsXG4gICAgICBkZXBzOiBbUkVRVUVTVF0sXG4gICAgfSxcbiAgXTtcbn1cbiJdfQ==