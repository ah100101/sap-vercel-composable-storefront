import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../config/smart-edit-config";
import * as i2 from "@angular/common";
import * as i3 from "@spartacus/core";
/**
 * The SmartEditLauncherService is used to check whether Spartacus is launched inside Smart Edit;
 * it also gets cmsTicketId sent from Smart Edit.
 */
export class SmartEditLauncherService {
    get cmsTicketId() {
        return this._cmsTicketId;
    }
    constructor(config, location, scriptLoader) {
        this.config = config;
        this.location = location;
        this.scriptLoader = scriptLoader;
    }
    /**
     * load webApplicationInjector.js first when Spartacus launched inside SmartEdit
     */
    load() {
        if (this.isLaunchedInSmartEdit()) {
            this.scriptLoader?.embedScript({
                src: 'assets/webApplicationInjector.js',
                params: undefined,
                attributes: {
                    id: 'text/smartedit-injector',
                    'data-smartedit-allow-origin': this.config.smartEdit?.allowOrigin,
                },
            });
        }
    }
    /**
     * Indicates whether Spartacus is launched in SmartEdit
     */
    isLaunchedInSmartEdit() {
        const path = this.location.path().split('?')[0];
        const params = this.location.path().split('?')[1];
        const cmsToken = params
            ?.split('&')
            .find((param) => param.startsWith('cmsTicketId='));
        this._cmsTicketId = cmsToken?.split('=')[1];
        return (path.split('/').pop() === this.config.smartEdit?.storefrontPreviewRoute &&
            !!this._cmsTicketId);
    }
}
SmartEditLauncherService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SmartEditLauncherService, deps: [{ token: i1.SmartEditConfig }, { token: i2.Location }, { token: i3.ScriptLoader }], target: i0.ɵɵFactoryTarget.Injectable });
SmartEditLauncherService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SmartEditLauncherService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SmartEditLauncherService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.SmartEditConfig }, { type: i2.Location }, { type: i3.ScriptLoader }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnQtZWRpdC1sYXVuY2hlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3NtYXJ0ZWRpdC9yb290L3NlcnZpY2VzL3NtYXJ0LWVkaXQtbGF1bmNoZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7OztBQUkzQzs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sd0JBQXdCO0lBR25DLElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsWUFDWSxNQUF1QixFQUN2QixRQUFrQixFQUNsQixZQUEwQjtRQUYxQixXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUN2QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQ25DLENBQUM7SUFFSjs7T0FFRztJQUNILElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDO2dCQUM3QixHQUFHLEVBQUUsa0NBQWtDO2dCQUN2QyxNQUFNLEVBQUUsU0FBUztnQkFDakIsVUFBVSxFQUFFO29CQUNWLEVBQUUsRUFBRSx5QkFBeUI7b0JBQzdCLDZCQUE2QixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFdBQVc7aUJBQ2xFO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQkFBcUI7UUFDbkIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEQsTUFBTSxRQUFRLEdBQUcsTUFBTTtZQUNyQixFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDWCxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUMsT0FBTyxDQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsc0JBQXNCO1lBQ3ZFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUNwQixDQUFDO0lBQ0osQ0FBQzs7cUhBNUNVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCLGNBRnZCLE1BQU07MkZBRVAsd0JBQXdCO2tCQUhwQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjcmlwdExvYWRlciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBTbWFydEVkaXRDb25maWcgfSBmcm9tICcuLi9jb25maWcvc21hcnQtZWRpdC1jb25maWcnO1xuXG4vKipcbiAqIFRoZSBTbWFydEVkaXRMYXVuY2hlclNlcnZpY2UgaXMgdXNlZCB0byBjaGVjayB3aGV0aGVyIFNwYXJ0YWN1cyBpcyBsYXVuY2hlZCBpbnNpZGUgU21hcnQgRWRpdDtcbiAqIGl0IGFsc28gZ2V0cyBjbXNUaWNrZXRJZCBzZW50IGZyb20gU21hcnQgRWRpdC5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNtYXJ0RWRpdExhdW5jaGVyU2VydmljZSB7XG4gIHByaXZhdGUgX2Ntc1RpY2tldElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgZ2V0IGNtc1RpY2tldElkKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2Ntc1RpY2tldElkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogU21hcnRFZGl0Q29uZmlnLFxuICAgIHByb3RlY3RlZCBsb2NhdGlvbjogTG9jYXRpb24sXG4gICAgcHJvdGVjdGVkIHNjcmlwdExvYWRlcjogU2NyaXB0TG9hZGVyXG4gICkge31cblxuICAvKipcbiAgICogbG9hZCB3ZWJBcHBsaWNhdGlvbkluamVjdG9yLmpzIGZpcnN0IHdoZW4gU3BhcnRhY3VzIGxhdW5jaGVkIGluc2lkZSBTbWFydEVkaXRcbiAgICovXG4gIGxvYWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNMYXVuY2hlZEluU21hcnRFZGl0KCkpIHtcbiAgICAgIHRoaXMuc2NyaXB0TG9hZGVyPy5lbWJlZFNjcmlwdCh7XG4gICAgICAgIHNyYzogJ2Fzc2V0cy93ZWJBcHBsaWNhdGlvbkluamVjdG9yLmpzJyxcbiAgICAgICAgcGFyYW1zOiB1bmRlZmluZWQsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICBpZDogJ3RleHQvc21hcnRlZGl0LWluamVjdG9yJyxcbiAgICAgICAgICAnZGF0YS1zbWFydGVkaXQtYWxsb3ctb3JpZ2luJzogdGhpcy5jb25maWcuc21hcnRFZGl0Py5hbGxvd09yaWdpbixcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBTcGFydGFjdXMgaXMgbGF1bmNoZWQgaW4gU21hcnRFZGl0XG4gICAqL1xuICBpc0xhdW5jaGVkSW5TbWFydEVkaXQoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMubG9jYXRpb24ucGF0aCgpLnNwbGl0KCc/JylbMF07XG4gICAgY29uc3QgcGFyYW1zID0gdGhpcy5sb2NhdGlvbi5wYXRoKCkuc3BsaXQoJz8nKVsxXTtcbiAgICBjb25zdCBjbXNUb2tlbiA9IHBhcmFtc1xuICAgICAgPy5zcGxpdCgnJicpXG4gICAgICAuZmluZCgocGFyYW0pID0+IHBhcmFtLnN0YXJ0c1dpdGgoJ2Ntc1RpY2tldElkPScpKTtcbiAgICB0aGlzLl9jbXNUaWNrZXRJZCA9IGNtc1Rva2VuPy5zcGxpdCgnPScpWzFdO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIHBhdGguc3BsaXQoJy8nKS5wb3AoKSA9PT0gdGhpcy5jb25maWcuc21hcnRFZGl0Py5zdG9yZWZyb250UHJldmlld1JvdXRlICYmXG4gICAgICAhIXRoaXMuX2Ntc1RpY2tldElkXG4gICAgKTtcbiAgfVxufVxuIl19