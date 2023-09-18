import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ANONYMOUS_CONSENT_NORMALIZER } from '../../../anonymous-consents/connectors/converters';
import { ANONYMOUS_CONSENTS_HEADER, } from '../../../model/consent.model';
import { CONSENT_TEMPLATE_NORMALIZER } from '../../../user/connectors/consent/converters';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../../services/occ-endpoints.service";
import * as i3 from "../../../util/converter.service";
export class OccAnonymousConsentTemplatesAdapter {
    constructor(http, occEndpoints, converter) {
        this.http = http;
        this.occEndpoints = occEndpoints;
        this.converter = converter;
    }
    loadAnonymousConsentTemplates() {
        const url = this.occEndpoints.buildUrl('anonymousConsentTemplates');
        return this.http.get(url).pipe(catchError((error) => throwError(error)), map((consentList) => consentList.consentTemplates ?? []), this.converter.pipeableMany(CONSENT_TEMPLATE_NORMALIZER));
    }
    loadAnonymousConsents() {
        // using the endpoint that doesn't set caching headers
        const url = this.occEndpoints.buildUrl('anonymousConsentTemplates');
        return this.http
            .head(url, { observe: 'response' })
            .pipe(catchError((error) => throwError(error)), map((response) => response.headers.get(ANONYMOUS_CONSENTS_HEADER) ?? ''), this.converter.pipeable(ANONYMOUS_CONSENT_NORMALIZER));
    }
}
OccAnonymousConsentTemplatesAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccAnonymousConsentTemplatesAdapter, deps: [{ token: i1.HttpClient }, { token: i2.OccEndpointsService }, { token: i3.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccAnonymousConsentTemplatesAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccAnonymousConsentTemplatesAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: OccAnonymousConsentTemplatesAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.HttpClient }, { type: i2.OccEndpointsService }, { type: i3.ConverterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLWFub255bW91cy1jb25zZW50LXRlbXBsYXRlcy5hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvb2NjL2FkYXB0ZXJzL3VzZXIvb2NjLWFub255bW91cy1jb25zZW50LXRlbXBsYXRlcy5hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLG1EQUFtRCxDQUFDO0FBQ2pHLE9BQU8sRUFFTCx5QkFBeUIsR0FFMUIsTUFBTSw4QkFBOEIsQ0FBQztBQUN0QyxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7Ozs7QUFNMUYsTUFBTSxPQUFPLG1DQUFtQztJQUc5QyxZQUNZLElBQWdCLEVBQ2hCLFlBQWlDLEVBQ2pDLFNBQTJCO1FBRjNCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQWtCO0lBQ3BDLENBQUM7SUFFSiw2QkFBNkI7UUFDM0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUNwRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUEwQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQ3JELFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ3hDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQyxFQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQywyQkFBMkIsQ0FBQyxDQUN6RCxDQUFDO0lBQ0osQ0FBQztJQUVELHFCQUFxQjtRQUNuQixzREFBc0Q7UUFDdEQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUNwRSxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ2IsSUFBSSxDQUEwQixHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUM7YUFDM0QsSUFBSSxDQUNILFVBQVUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ3hDLEdBQUcsQ0FDRCxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsSUFBSSxFQUFFLENBQ3BFLEVBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsQ0FDdEQsQ0FBQztJQUNOLENBQUM7O2dJQTlCVSxtQ0FBbUM7b0lBQW5DLG1DQUFtQzsyRkFBbkMsbUNBQW1DO2tCQUQvQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFub255bW91c0NvbnNlbnRUZW1wbGF0ZXNBZGFwdGVyIH0gZnJvbSAnLi4vLi4vLi4vYW5vbnltb3VzLWNvbnNlbnRzL2Nvbm5lY3RvcnMvYW5vbnltb3VzLWNvbnNlbnQtdGVtcGxhdGVzLmFkYXB0ZXInO1xuaW1wb3J0IHsgQU5PTllNT1VTX0NPTlNFTlRfTk9STUFMSVpFUiB9IGZyb20gJy4uLy4uLy4uL2Fub255bW91cy1jb25zZW50cy9jb25uZWN0b3JzL2NvbnZlcnRlcnMnO1xuaW1wb3J0IHtcbiAgQW5vbnltb3VzQ29uc2VudCxcbiAgQU5PTllNT1VTX0NPTlNFTlRTX0hFQURFUixcbiAgQ29uc2VudFRlbXBsYXRlLFxufSBmcm9tICcuLi8uLi8uLi9tb2RlbC9jb25zZW50Lm1vZGVsJztcbmltcG9ydCB7IENPTlNFTlRfVEVNUExBVEVfTk9STUFMSVpFUiB9IGZyb20gJy4uLy4uLy4uL3VzZXIvY29ubmVjdG9ycy9jb25zZW50L2NvbnZlcnRlcnMnO1xuaW1wb3J0IHsgQ29udmVydGVyU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3V0aWwvY29udmVydGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2NjIH0gZnJvbSAnLi4vLi4vb2NjLW1vZGVscy9vY2MubW9kZWxzJztcbmltcG9ydCB7IE9jY0VuZHBvaW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vY2MtZW5kcG9pbnRzLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2NjQW5vbnltb3VzQ29uc2VudFRlbXBsYXRlc0FkYXB0ZXJcbiAgaW1wbGVtZW50cyBBbm9ueW1vdXNDb25zZW50VGVtcGxhdGVzQWRhcHRlclxue1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcm90ZWN0ZWQgb2NjRW5kcG9pbnRzOiBPY2NFbmRwb2ludHNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjb252ZXJ0ZXI6IENvbnZlcnRlclNlcnZpY2VcbiAgKSB7fVxuXG4gIGxvYWRBbm9ueW1vdXNDb25zZW50VGVtcGxhdGVzKCk6IE9ic2VydmFibGU8Q29uc2VudFRlbXBsYXRlW10+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgnYW5vbnltb3VzQ29uc2VudFRlbXBsYXRlcycpO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PE9jYy5Db25zZW50VGVtcGxhdGVMaXN0Pih1cmwpLnBpcGUoXG4gICAgICBjYXRjaEVycm9yKChlcnJvcikgPT4gdGhyb3dFcnJvcihlcnJvcikpLFxuICAgICAgbWFwKChjb25zZW50TGlzdCkgPT4gY29uc2VudExpc3QuY29uc2VudFRlbXBsYXRlcyA/PyBbXSksXG4gICAgICB0aGlzLmNvbnZlcnRlci5waXBlYWJsZU1hbnkoQ09OU0VOVF9URU1QTEFURV9OT1JNQUxJWkVSKVxuICAgICk7XG4gIH1cblxuICBsb2FkQW5vbnltb3VzQ29uc2VudHMoKTogT2JzZXJ2YWJsZTxBbm9ueW1vdXNDb25zZW50W10+IHtcbiAgICAvLyB1c2luZyB0aGUgZW5kcG9pbnQgdGhhdCBkb2Vzbid0IHNldCBjYWNoaW5nIGhlYWRlcnNcbiAgICBjb25zdCB1cmwgPSB0aGlzLm9jY0VuZHBvaW50cy5idWlsZFVybCgnYW5vbnltb3VzQ29uc2VudFRlbXBsYXRlcycpO1xuICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgIC5oZWFkPE9jYy5Db25zZW50VGVtcGxhdGVMaXN0Pih1cmwsIHsgb2JzZXJ2ZTogJ3Jlc3BvbnNlJyB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIGNhdGNoRXJyb3IoKGVycm9yKSA9PiB0aHJvd0Vycm9yKGVycm9yKSksXG4gICAgICAgIG1hcChcbiAgICAgICAgICAocmVzcG9uc2UpID0+IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KEFOT05ZTU9VU19DT05TRU5UU19IRUFERVIpID8/ICcnXG4gICAgICAgICksXG4gICAgICAgIHRoaXMuY29udmVydGVyLnBpcGVhYmxlKEFOT05ZTU9VU19DT05TRU5UX05PUk1BTElaRVIpXG4gICAgICApO1xuICB9XG59XG4iXX0=