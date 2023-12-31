/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import * as i0 from "@angular/core";
export var ICON_TYPE;
(function (ICON_TYPE) {
    ICON_TYPE["ACTIVE"] = "ACTIVE";
    ICON_TYPE["ADDRESS_BOOK"] = "ADDRESS_BOOK";
    ICON_TYPE["AMEX"] = "AMEX";
    ICON_TYPE["CARET_DOWN"] = "CARET_DOWN";
    ICON_TYPE["CARET_LEFT"] = "CARET_LEFT";
    ICON_TYPE["CARET_RIGHT"] = "CARET_RIGHT";
    ICON_TYPE["CARET_UP"] = "CARET_UP";
    ICON_TYPE["CART"] = "CART";
    ICON_TYPE["CHECK"] = "CHECK";
    ICON_TYPE["CIRCLE"] = "CIRCLE";
    ICON_TYPE["CLIPBOARD_LIST"] = "CLIPBOARD_LIST";
    ICON_TYPE["CLOCK"] = "CLOCK";
    ICON_TYPE["CLOSE"] = "CLOSE";
    ICON_TYPE["COLLAPSE"] = "COLLAPSE";
    ICON_TYPE["CREDIT_CARD"] = "CREDIT_CARD";
    ICON_TYPE["DINERS_CLUB"] = "DINERS_CLUB";
    ICON_TYPE["DOWNLOAD"] = "DOWNLOAD";
    ICON_TYPE["EMPTY_HEART"] = "EMPTY_HEART";
    ICON_TYPE["ERROR"] = "ERROR";
    ICON_TYPE["EXPAND"] = "EXPAND";
    ICON_TYPE["EXPAND_ARROWS"] = "EXPAND_ARROWS";
    ICON_TYPE["EYE"] = "EYE";
    ICON_TYPE["EYE_SLASH"] = "EYE_SLASH";
    ICON_TYPE["FILE"] = "FILE";
    ICON_TYPE["FILTER"] = "FILTER";
    ICON_TYPE["GRID"] = "GRID";
    ICON_TYPE["HEART"] = "HEART";
    ICON_TYPE["INFO"] = "INFO";
    ICON_TYPE["LINK_OUT"] = "LINK_OUT";
    ICON_TYPE["LIST"] = "LIST";
    ICON_TYPE["MASTER_CARD"] = "MASTER_CARD";
    ICON_TYPE["OFF"] = "OFF";
    ICON_TYPE["ON"] = "ON";
    ICON_TYPE["ORDER"] = "ORDER";
    ICON_TYPE["PENCIL"] = "PENCIL";
    ICON_TYPE["RESET"] = "RESET";
    ICON_TYPE["REPEAT"] = "REPEAT";
    ICON_TYPE["SEARCH"] = "SEARCH";
    ICON_TYPE["SORT"] = "SORT";
    ICON_TYPE["SORT_AMOUNT_DOWN"] = "SORT_AMOUNT_DOWN";
    ICON_TYPE["SORT_AMOUNT_UP"] = "SORT_AMOUNT_UP";
    ICON_TYPE["SORT_DOWN"] = "SORT_DOWN";
    ICON_TYPE["STAR"] = "STAR";
    ICON_TYPE["SUCCESS"] = "SUCCESS";
    ICON_TYPE["TRASH"] = "TRASH";
    ICON_TYPE["USER_FRIENDS"] = "USER_FRIENDS";
    ICON_TYPE["VISA"] = "VISA";
    ICON_TYPE["WARNING"] = "WARNING";
    ICON_TYPE["HEADSET"] = "HEADSET";
    ICON_TYPE["ATTACHMENT"] = "ATTACHMENT";
    ICON_TYPE["UPLOAD"] = "UPLOAD";
    ICON_TYPE["USER"] = "USER";
    ICON_TYPE["ARROW_LEFT"] = "ARROW_LEFT";
    ICON_TYPE["ARROW_RIGHT"] = "ARROW_RIGHT";
    ICON_TYPE["ARROW_DOWN"] = "ARROW_DOWN";
    ICON_TYPE["ARROW_UP"] = "ARROW_UP";
})(ICON_TYPE || (ICON_TYPE = {}));
export class IconConfig {
}
IconConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: IconConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
IconConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: IconConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: IconConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });
/**
 * Each ICON type can have an companied resource type, such as SVG, LINK (font) or just TEXT.
 * The resources will be automatically loaded in case they're required for the `ICON_TYPE`.
 */
export var IconResourceType;
(function (IconResourceType) {
    /**
     * An svg based icon requires an SVG resource that must be loaded,
     * this is typically a sprite svg file.
     */
    IconResourceType["SVG"] = "svg";
    /**
     * A font based ICON might require an additional CSS file to be loaded.
     */
    IconResourceType["LINK"] = "link";
    /**
     * Text based icons will simply add the ICON string to the DOM. Text icons do not need an image
     * or CSS pseudo class (i.e. :before), as the text itself is the icon (i.e. +)
     */
    IconResourceType["TEXT"] = "text";
})(IconResourceType || (IconResourceType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLWNvbXBvbmVudHMvbWlzYy9pY29uL2ljb24ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQUd6QyxNQUFNLENBQU4sSUFBWSxTQXlEWDtBQXpERCxXQUFZLFNBQVM7SUFDbkIsOEJBQWlCLENBQUE7SUFDakIsMENBQTZCLENBQUE7SUFDN0IsMEJBQWEsQ0FBQTtJQUNiLHNDQUF5QixDQUFBO0lBQ3pCLHNDQUF5QixDQUFBO0lBQ3pCLHdDQUEyQixDQUFBO0lBQzNCLGtDQUFxQixDQUFBO0lBQ3JCLDBCQUFhLENBQUE7SUFDYiw0QkFBZSxDQUFBO0lBQ2YsOEJBQWlCLENBQUE7SUFDakIsOENBQWlDLENBQUE7SUFDakMsNEJBQWUsQ0FBQTtJQUNmLDRCQUFlLENBQUE7SUFDZixrQ0FBcUIsQ0FBQTtJQUNyQix3Q0FBMkIsQ0FBQTtJQUMzQix3Q0FBMkIsQ0FBQTtJQUMzQixrQ0FBcUIsQ0FBQTtJQUNyQix3Q0FBMkIsQ0FBQTtJQUMzQiw0QkFBZSxDQUFBO0lBQ2YsOEJBQWlCLENBQUE7SUFDakIsNENBQStCLENBQUE7SUFDL0Isd0JBQVcsQ0FBQTtJQUNYLG9DQUF1QixDQUFBO0lBQ3ZCLDBCQUFhLENBQUE7SUFDYiw4QkFBaUIsQ0FBQTtJQUNqQiwwQkFBYSxDQUFBO0lBQ2IsNEJBQWUsQ0FBQTtJQUNmLDBCQUFhLENBQUE7SUFDYixrQ0FBcUIsQ0FBQTtJQUNyQiwwQkFBYSxDQUFBO0lBQ2Isd0NBQTJCLENBQUE7SUFDM0Isd0JBQVcsQ0FBQTtJQUNYLHNCQUFTLENBQUE7SUFDVCw0QkFBZSxDQUFBO0lBQ2YsOEJBQWlCLENBQUE7SUFDakIsNEJBQWUsQ0FBQTtJQUNmLDhCQUFpQixDQUFBO0lBQ2pCLDhCQUFpQixDQUFBO0lBQ2pCLDBCQUFhLENBQUE7SUFDYixrREFBcUMsQ0FBQTtJQUNyQyw4Q0FBaUMsQ0FBQTtJQUNqQyxvQ0FBdUIsQ0FBQTtJQUN2QiwwQkFBYSxDQUFBO0lBQ2IsZ0NBQW1CLENBQUE7SUFDbkIsNEJBQWUsQ0FBQTtJQUNmLDBDQUE2QixDQUFBO0lBQzdCLDBCQUFhLENBQUE7SUFDYixnQ0FBbUIsQ0FBQTtJQUNuQixnQ0FBbUIsQ0FBQTtJQUNuQixzQ0FBeUIsQ0FBQTtJQUN6Qiw4QkFBaUIsQ0FBQTtJQUNqQiwwQkFBYSxDQUFBO0lBQ2Isc0NBQXlCLENBQUE7SUFDekIsd0NBQTJCLENBQUE7SUFDM0Isc0NBQXlCLENBQUE7SUFDekIsa0NBQXFCLENBQUE7QUFDdkIsQ0FBQyxFQXpEVyxTQUFTLEtBQVQsU0FBUyxRQXlEcEI7QUFNRCxNQUFNLE9BQWdCLFVBQVU7O3VHQUFWLFVBQVU7MkdBQVYsVUFBVSxjQUhsQixNQUFNLGVBQ0wsTUFBTTsyRkFFQyxVQUFVO2tCQUovQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO29CQUNsQixXQUFXLEVBQUUsTUFBTTtpQkFDcEI7O0FBK0NEOzs7R0FHRztBQUNILE1BQU0sQ0FBTixJQUFZLGdCQWdCWDtBQWhCRCxXQUFZLGdCQUFnQjtJQUMxQjs7O09BR0c7SUFDSCwrQkFBVyxDQUFBO0lBRVg7O09BRUc7SUFDSCxpQ0FBYSxDQUFBO0lBQ2I7OztPQUdHO0lBQ0gsaUNBQWEsQ0FBQTtBQUNmLENBQUMsRUFoQlcsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQWdCM0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgRGlyZWN0aW9uTW9kZSB9IGZyb20gJy4uLy4uLy4uL2xheW91dC9kaXJlY3Rpb24vY29uZmlnL2RpcmVjdGlvbi5tb2RlbCc7XG5cbmV4cG9ydCBlbnVtIElDT05fVFlQRSB7XG4gIEFDVElWRSA9ICdBQ1RJVkUnLFxuICBBRERSRVNTX0JPT0sgPSAnQUREUkVTU19CT09LJyxcbiAgQU1FWCA9ICdBTUVYJyxcbiAgQ0FSRVRfRE9XTiA9ICdDQVJFVF9ET1dOJyxcbiAgQ0FSRVRfTEVGVCA9ICdDQVJFVF9MRUZUJyxcbiAgQ0FSRVRfUklHSFQgPSAnQ0FSRVRfUklHSFQnLFxuICBDQVJFVF9VUCA9ICdDQVJFVF9VUCcsXG4gIENBUlQgPSAnQ0FSVCcsXG4gIENIRUNLID0gJ0NIRUNLJyxcbiAgQ0lSQ0xFID0gJ0NJUkNMRScsXG4gIENMSVBCT0FSRF9MSVNUID0gJ0NMSVBCT0FSRF9MSVNUJyxcbiAgQ0xPQ0sgPSAnQ0xPQ0snLFxuICBDTE9TRSA9ICdDTE9TRScsXG4gIENPTExBUFNFID0gJ0NPTExBUFNFJyxcbiAgQ1JFRElUX0NBUkQgPSAnQ1JFRElUX0NBUkQnLFxuICBESU5FUlNfQ0xVQiA9ICdESU5FUlNfQ0xVQicsXG4gIERPV05MT0FEID0gJ0RPV05MT0FEJyxcbiAgRU1QVFlfSEVBUlQgPSAnRU1QVFlfSEVBUlQnLFxuICBFUlJPUiA9ICdFUlJPUicsXG4gIEVYUEFORCA9ICdFWFBBTkQnLFxuICBFWFBBTkRfQVJST1dTID0gJ0VYUEFORF9BUlJPV1MnLFxuICBFWUUgPSAnRVlFJyxcbiAgRVlFX1NMQVNIID0gJ0VZRV9TTEFTSCcsXG4gIEZJTEUgPSAnRklMRScsXG4gIEZJTFRFUiA9ICdGSUxURVInLFxuICBHUklEID0gJ0dSSUQnLFxuICBIRUFSVCA9ICdIRUFSVCcsXG4gIElORk8gPSAnSU5GTycsXG4gIExJTktfT1VUID0gJ0xJTktfT1VUJyxcbiAgTElTVCA9ICdMSVNUJyxcbiAgTUFTVEVSX0NBUkQgPSAnTUFTVEVSX0NBUkQnLFxuICBPRkYgPSAnT0ZGJyxcbiAgT04gPSAnT04nLFxuICBPUkRFUiA9ICdPUkRFUicsXG4gIFBFTkNJTCA9ICdQRU5DSUwnLFxuICBSRVNFVCA9ICdSRVNFVCcsXG4gIFJFUEVBVCA9ICdSRVBFQVQnLFxuICBTRUFSQ0ggPSAnU0VBUkNIJyxcbiAgU09SVCA9ICdTT1JUJyxcbiAgU09SVF9BTU9VTlRfRE9XTiA9ICdTT1JUX0FNT1VOVF9ET1dOJyxcbiAgU09SVF9BTU9VTlRfVVAgPSAnU09SVF9BTU9VTlRfVVAnLFxuICBTT1JUX0RPV04gPSAnU09SVF9ET1dOJyxcbiAgU1RBUiA9ICdTVEFSJyxcbiAgU1VDQ0VTUyA9ICdTVUNDRVNTJyxcbiAgVFJBU0ggPSAnVFJBU0gnLFxuICBVU0VSX0ZSSUVORFMgPSAnVVNFUl9GUklFTkRTJyxcbiAgVklTQSA9ICdWSVNBJyxcbiAgV0FSTklORyA9ICdXQVJOSU5HJyxcbiAgSEVBRFNFVCA9ICdIRUFEU0VUJyxcbiAgQVRUQUNITUVOVCA9ICdBVFRBQ0hNRU5UJyxcbiAgVVBMT0FEID0gJ1VQTE9BRCcsXG4gIFVTRVIgPSAnVVNFUicsXG4gIEFSUk9XX0xFRlQgPSAnQVJST1dfTEVGVCcsXG4gIEFSUk9XX1JJR0hUID0gJ0FSUk9XX1JJR0hUJyxcbiAgQVJST1dfRE9XTiA9ICdBUlJPV19ET1dOJyxcbiAgQVJST1dfVVAgPSAnQVJST1dfVVAnLFxufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290JyxcbiAgdXNlRXhpc3Rpbmc6IENvbmZpZyxcbn0pXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgSWNvbkNvbmZpZyB7XG4gIGljb24/OiBJY29uT3B0aW9ucztcbn1cblxuZGVjbGFyZSBtb2R1bGUgJ0BzcGFydGFjdXMvY29yZScge1xuICBpbnRlcmZhY2UgQ29uZmlnIGV4dGVuZHMgSWNvbkNvbmZpZyB7fVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEljb25PcHRpb25zIHtcbiAgLyoqXG4gICAqIEVhY2ggaWNvbiB0eXBlIGNhbiBiZSBjb25maWd1cmVkIHdpdGggYSBzby1jYWxsZWQgc3ltYm9sLiBUaGUgc3ltYm9sIHdpbGxcbiAgICogYmUgdXNlZCB0byBtYXAgdGhlIGljb24gdG8gYW4gU1ZHIGBzeW1ib2xgIChpZCkgb3IgdG8gdGhlIHN0eWxlIGNsYXNzZXMgb2ZcbiAgICogYSBmb250IGJhc2VkIGljb24uIFRoZSBmb2xsb3dpbmcgY29uZmlndXJhdGlvbiB3b3VsZCBtYXAgdG8gYSBmb250YXdlc29tZVxuICAgKiBpY29uOlxuICAgKlxuICAgKiBpY29uOiB7XG4gICAqICAgc3ltYm9sczoge1xuICAgKiAgICAgQ0FSVDogJ2ZhcyBmYS1zaG9wcGluZy1jYXJ0J1xuICAgKiAgIH1cbiAgICogfVxuICAgKi9cbiAgc3ltYm9scz86IHtcbiAgICBbSUNPTl9UWVBFOiBzdHJpbmddOiBzdHJpbmc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlc291cmNlcyBhcmUgdXNlZCB0byBtYXAgaWNvbiB0eXBlcyB0byBjZXJ0YWluIGFzc2V0LCBzdWNoIGFzIGFuIFNWRyAoc3ByaXRlKSBpbWFnZS5cbiAgICogVGhlIHJlc291cmNlIHR5cGUgKGBJY29uUmVzb3VyY2VUeXBlYCkgZGljdGF0ZXMgd2hldGhlciBhbiBTVkcgaW1hZ2UgaXMgdXNlZC4gVGhlIFVSTFxuICAgKiBpcyB1c2VkIGZvciB0aGUgU1ZHIHhsaW5rIHJlZmVyZW5jZS5cbiAgICovXG4gIHJlc291cmNlcz86IEljb25Db25maWdSZXNvdXJjZVtdO1xuXG4gIC8qKlxuICAgKiBMaXN0cyBpY29ucyB0aGF0IHNob3VsZCBiZSBmbGlwcGVkIGZvciBhIHNwZWNpZmljIGRpcmVjdGlvbi5cbiAgICovXG4gIGZsaXBEaXJlY3Rpb24/OiB7XG4gICAgW0lDT05fVFlQRTogc3RyaW5nXTogRGlyZWN0aW9uTW9kZTtcbiAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJY29uQ29uZmlnUmVzb3VyY2Uge1xuICB0eXBlOiBJY29uUmVzb3VyY2VUeXBlIHwgc3RyaW5nO1xuICB1cmw/OiBzdHJpbmc7XG4gIHR5cGVzPzogKElDT05fVFlQRSB8IHN0cmluZylbXTtcbn1cblxuLyoqXG4gKiBFYWNoIElDT04gdHlwZSBjYW4gaGF2ZSBhbiBjb21wYW5pZWQgcmVzb3VyY2UgdHlwZSwgc3VjaCBhcyBTVkcsIExJTksgKGZvbnQpIG9yIGp1c3QgVEVYVC5cbiAqIFRoZSByZXNvdXJjZXMgd2lsbCBiZSBhdXRvbWF0aWNhbGx5IGxvYWRlZCBpbiBjYXNlIHRoZXkncmUgcmVxdWlyZWQgZm9yIHRoZSBgSUNPTl9UWVBFYC5cbiAqL1xuZXhwb3J0IGVudW0gSWNvblJlc291cmNlVHlwZSB7XG4gIC8qKlxuICAgKiBBbiBzdmcgYmFzZWQgaWNvbiByZXF1aXJlcyBhbiBTVkcgcmVzb3VyY2UgdGhhdCBtdXN0IGJlIGxvYWRlZCxcbiAgICogdGhpcyBpcyB0eXBpY2FsbHkgYSBzcHJpdGUgc3ZnIGZpbGUuXG4gICAqL1xuICBTVkcgPSAnc3ZnJyxcblxuICAvKipcbiAgICogQSBmb250IGJhc2VkIElDT04gbWlnaHQgcmVxdWlyZSBhbiBhZGRpdGlvbmFsIENTUyBmaWxlIHRvIGJlIGxvYWRlZC5cbiAgICovXG4gIExJTksgPSAnbGluaycsXG4gIC8qKlxuICAgKiBUZXh0IGJhc2VkIGljb25zIHdpbGwgc2ltcGx5IGFkZCB0aGUgSUNPTiBzdHJpbmcgdG8gdGhlIERPTS4gVGV4dCBpY29ucyBkbyBub3QgbmVlZCBhbiBpbWFnZVxuICAgKiBvciBDU1MgcHNldWRvIGNsYXNzIChpLmUuIDpiZWZvcmUpLCBhcyB0aGUgdGV4dCBpdHNlbGYgaXMgdGhlIGljb24gKGkuZS4gKylcbiAgICovXG4gIFRFWFQgPSAndGV4dCcsXG59XG4iXX0=