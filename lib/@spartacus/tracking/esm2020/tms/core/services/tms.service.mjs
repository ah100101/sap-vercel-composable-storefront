/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, isDevMode } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "../config/tms-config";
/**
 * This service interacts with the configured data layer object by pushing the Spartacus events to it.
 */
export class TmsService {
    constructor(eventsService, windowRef, tmsConfig, injector) {
        this.eventsService = eventsService;
        this.windowRef = windowRef;
        this.tmsConfig = tmsConfig;
        this.injector = injector;
        /**
         * Stores subscriptions to events.
         */
        this.subscription = new Subscription();
    }
    /**
     * Called only once to start collecting and dispatching events
     */
    collect() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        for (const tmsCollectorConfig in this.tmsConfig.tagManager) {
            if (!this.tmsConfig.tagManager?.hasOwnProperty(tmsCollectorConfig)) {
                continue;
            }
            const collectorConfig = this.tmsConfig.tagManager[tmsCollectorConfig] ?? {};
            if (!collectorConfig.collector) {
                if (isDevMode()) {
                    console.warn(`Skipping the '${tmsCollectorConfig}', as the collector is not defined.`);
                }
                continue;
            }
            const events = collectorConfig.events?.map((event) => this.eventsService.get(event)) ||
                [];
            const collector = this.injector.get(collectorConfig.collector);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            collector.init(collectorConfig, this.windowRef.nativeWindow);
            this.subscription.add(this.mapEvents(events).subscribe((event) => {
                if (collectorConfig.debug) {
                    console.log(`🎤 Pushing the following event to ${tmsCollectorConfig}: `, event);
                }
                event = collector.map?.(event) ?? event;
                collector.pushEvent(collectorConfig, 
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this.windowRef.nativeWindow, event);
            }));
        }
    }
    /**
     * Maps the given events to an appropriate type that fits the specified TMS' structure.
     *
     * @param events - the events to map
     * @param collector - a name of the collector for which the events should be mapped
     */
    mapEvents(events) {
        return merge(...events);
    }
    /**
     * Angular's callback
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
TmsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: TmsService, deps: [{ token: i1.EventService }, { token: i1.WindowRef }, { token: i2.TmsConfig }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
TmsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: TmsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: TmsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i1.WindowRef }, { type: i2.TmsConfig }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG1zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvdHJhY2tpbmcvdG1zL2NvcmUvc2VydmljZXMvdG1zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQVksU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRTNFLE9BQU8sRUFBRSxLQUFLLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7O0FBSXZEOztHQUVHO0FBRUgsTUFBTSxPQUFPLFVBQVU7SUFNckIsWUFDWSxhQUEyQixFQUMzQixTQUFvQixFQUNwQixTQUFvQixFQUNwQixRQUFrQjtRQUhsQixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUMzQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVQ5Qjs7V0FFRztRQUNPLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQU96QyxDQUFDO0lBRUo7O09BRUc7SUFDSCxPQUFPO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDL0IsT0FBTztTQUNSO1FBRUQsS0FBSyxNQUFNLGtCQUFrQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO1lBQzFELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxjQUFjLENBQUMsa0JBQWtCLENBQUMsRUFBRTtnQkFDbEUsU0FBUzthQUNWO1lBRUQsTUFBTSxlQUFlLEdBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDO1lBRXRELElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFO2dCQUM5QixJQUFJLFNBQVMsRUFBRSxFQUFFO29CQUNmLE9BQU8sQ0FBQyxJQUFJLENBQ1YsaUJBQWlCLGtCQUFrQixxQ0FBcUMsQ0FDekUsQ0FBQztpQkFDSDtnQkFDRCxTQUFTO2FBQ1Y7WUFFRCxNQUFNLE1BQU0sR0FDVixlQUFlLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JFLEVBQUUsQ0FBQztZQUNMLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUNqQyxlQUFlLENBQUMsU0FBUyxDQUMxQixDQUFDO1lBQ0Ysb0VBQW9FO1lBQ3BFLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBYSxDQUFDLENBQUM7WUFFOUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3pDLElBQUksZUFBZSxDQUFDLEtBQUssRUFBRTtvQkFDekIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxxQ0FBcUMsa0JBQWtCLElBQUksRUFDM0QsS0FBSyxDQUNOLENBQUM7aUJBQ0g7Z0JBRUQsS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUM7Z0JBQ3hDLFNBQVMsQ0FBQyxTQUFTLENBQ2pCLGVBQWU7Z0JBQ2Ysb0VBQW9FO2dCQUNwRSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWEsRUFDNUIsS0FBSyxDQUNOLENBQUM7WUFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDTyxTQUFTLENBQ2pCLE1BQXVCO1FBRXZCLE9BQU8sS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7dUdBckZVLFVBQVU7MkdBQVYsVUFBVSxjQURHLE1BQU07MkZBQ25CLFVBQVU7a0JBRHRCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0b3IsIGlzRGV2TW9kZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDeEV2ZW50LCBFdmVudFNlcnZpY2UsIFdpbmRvd1JlZiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUbXNDb25maWcgfSBmcm9tICcuLi9jb25maWcvdG1zLWNvbmZpZyc7XG5pbXBvcnQgeyBUbXNDb2xsZWN0b3IgfSBmcm9tICcuLi9tb2RlbC90bXMubW9kZWwnO1xuXG4vKipcbiAqIFRoaXMgc2VydmljZSBpbnRlcmFjdHMgd2l0aCB0aGUgY29uZmlndXJlZCBkYXRhIGxheWVyIG9iamVjdCBieSBwdXNoaW5nIHRoZSBTcGFydGFjdXMgZXZlbnRzIHRvIGl0LlxuICovXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxuZXhwb3J0IGNsYXNzIFRtc1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogU3RvcmVzIHN1YnNjcmlwdGlvbnMgdG8gZXZlbnRzLlxuICAgKi9cbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgZXZlbnRzU2VydmljZTogRXZlbnRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB3aW5kb3dSZWY6IFdpbmRvd1JlZixcbiAgICBwcm90ZWN0ZWQgdG1zQ29uZmlnOiBUbXNDb25maWcsXG4gICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvclxuICApIHt9XG5cbiAgLyoqXG4gICAqIENhbGxlZCBvbmx5IG9uY2UgdG8gc3RhcnQgY29sbGVjdGluZyBhbmQgZGlzcGF0Y2hpbmcgZXZlbnRzXG4gICAqL1xuICBjb2xsZWN0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy53aW5kb3dSZWYuaXNCcm93c2VyKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IHRtc0NvbGxlY3RvckNvbmZpZyBpbiB0aGlzLnRtc0NvbmZpZy50YWdNYW5hZ2VyKSB7XG4gICAgICBpZiAoIXRoaXMudG1zQ29uZmlnLnRhZ01hbmFnZXI/Lmhhc093blByb3BlcnR5KHRtc0NvbGxlY3RvckNvbmZpZykpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbGxlY3RvckNvbmZpZyA9XG4gICAgICAgIHRoaXMudG1zQ29uZmlnLnRhZ01hbmFnZXJbdG1zQ29sbGVjdG9yQ29uZmlnXSA/PyB7fTtcblxuICAgICAgaWYgKCFjb2xsZWN0b3JDb25maWcuY29sbGVjdG9yKSB7XG4gICAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBTa2lwcGluZyB0aGUgJyR7dG1zQ29sbGVjdG9yQ29uZmlnfScsIGFzIHRoZSBjb2xsZWN0b3IgaXMgbm90IGRlZmluZWQuYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV2ZW50cyA9XG4gICAgICAgIGNvbGxlY3RvckNvbmZpZy5ldmVudHM/Lm1hcCgoZXZlbnQpID0+IHRoaXMuZXZlbnRzU2VydmljZS5nZXQoZXZlbnQpKSB8fFxuICAgICAgICBbXTtcbiAgICAgIGNvbnN0IGNvbGxlY3RvciA9IHRoaXMuaW5qZWN0b3IuZ2V0PFRtc0NvbGxlY3Rvcj4oXG4gICAgICAgIGNvbGxlY3RvckNvbmZpZy5jb2xsZWN0b3JcbiAgICAgICk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgY29sbGVjdG9yLmluaXQoY29sbGVjdG9yQ29uZmlnLCB0aGlzLndpbmRvd1JlZi5uYXRpdmVXaW5kb3chKTtcblxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgICB0aGlzLm1hcEV2ZW50cyhldmVudHMpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoY29sbGVjdG9yQ29uZmlnLmRlYnVnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgYPCfjqQgUHVzaGluZyB0aGUgZm9sbG93aW5nIGV2ZW50IHRvICR7dG1zQ29sbGVjdG9yQ29uZmlnfTogYCxcbiAgICAgICAgICAgICAgZXZlbnRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXZlbnQgPSBjb2xsZWN0b3IubWFwPy4oZXZlbnQpID8/IGV2ZW50O1xuICAgICAgICAgIGNvbGxlY3Rvci5wdXNoRXZlbnQoXG4gICAgICAgICAgICBjb2xsZWN0b3JDb25maWcsXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgdGhpcy53aW5kb3dSZWYubmF0aXZlV2luZG93ISxcbiAgICAgICAgICAgIGV2ZW50XG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1hcHMgdGhlIGdpdmVuIGV2ZW50cyB0byBhbiBhcHByb3ByaWF0ZSB0eXBlIHRoYXQgZml0cyB0aGUgc3BlY2lmaWVkIFRNUycgc3RydWN0dXJlLlxuICAgKlxuICAgKiBAcGFyYW0gZXZlbnRzIC0gdGhlIGV2ZW50cyB0byBtYXBcbiAgICogQHBhcmFtIGNvbGxlY3RvciAtIGEgbmFtZSBvZiB0aGUgY29sbGVjdG9yIGZvciB3aGljaCB0aGUgZXZlbnRzIHNob3VsZCBiZSBtYXBwZWRcbiAgICovXG4gIHByb3RlY3RlZCBtYXBFdmVudHM8VCBleHRlbmRzIEN4RXZlbnQ+KFxuICAgIGV2ZW50czogT2JzZXJ2YWJsZTxUPltdXG4gICk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBtZXJnZSguLi5ldmVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFuZ3VsYXIncyBjYWxsYmFja1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19