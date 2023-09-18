/// <reference types="@types/google.maps" />
/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/// <reference types="@types/google.maps" />
import { Injectable, isDevMode } from '@angular/core';
import { GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG } from '@spartacus/storefinder/root';
import * as i0 from "@angular/core";
import * as i1 from "../config/store-finder-config";
import * as i2 from "../facade/store-finder.service";
import * as i3 from "@spartacus/core";
export class GoogleMapRendererService {
    constructor(config, storeFinderService, scriptLoader) {
        this.config = config;
        this.storeFinderService = storeFinderService;
        this.scriptLoader = scriptLoader;
        this.googleMap = null;
    }
    /**
     * Renders google map on the given element and draws markers on it.
     * If map already exists it will use an existing map otherwise it will create one
     * @param mapElement HTML element inside of which the map will be displayed
     * @param locations array containign geo data to be displayed on the map
     * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
     */
    renderMap(mapElement, locations, selectMarkerHandler) {
        if (this.config.googleMaps?.apiKey) {
            if (Object.entries(locations[Object.keys(locations)[0]]).length > 0) {
                if (this.googleMap === null) {
                    const apiKey = this.config.googleMaps.apiKey === GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG
                        ? ''
                        : this.config.googleMaps.apiKey;
                    this.scriptLoader.embedScript({
                        src: this.config.googleMaps.apiUrl,
                        params: { key: apiKey },
                        attributes: { type: 'text/javascript' },
                        callback: () => {
                            this.drawMap(mapElement, locations, selectMarkerHandler);
                        },
                    });
                }
                else {
                    this.drawMap(mapElement, locations, selectMarkerHandler);
                }
            }
        }
        else {
            if (isDevMode()) {
                console.warn('A Google Maps api key is required in the store finder configuration to display the Google map.');
            }
        }
    }
    /**
     * Centers the map to the given point
     * @param latitute latitude of the new center
     * @param longitude longitude of the new center
     */
    centerMap(latitute, longitude) {
        this.googleMap.panTo({ lat: latitute, lng: longitude });
        this.googleMap.setZoom(this.config.googleMaps.selectedMarkerScale);
    }
    /**
     * Defines and returns {@link google.maps.LatLng} representing a point where the map will be centered
     * @param locations list of locations
     */
    defineMapCenter(locations) {
        return new google.maps.LatLng(this.storeFinderService.getStoreLatitude(locations[0]), this.storeFinderService.getStoreLongitude(locations[0]));
    }
    /**
     * Creates google map inside if the given HTML element centered to the given point
     * @param mapElement {@link HTMLElement} inside of which the map will be created
     * @param mapCenter {@link google.maps.LatLng} the point where the map will be centered
     */
    initMap(mapElement, mapCenter) {
        const gestureOption = 'greedy';
        const mapProp = {
            center: mapCenter,
            zoom: this.config.googleMaps.scale,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            gestureHandling: gestureOption,
        };
        this.googleMap = new google.maps.Map(mapElement, mapProp);
    }
    /**
     * Erases the current map's markers and create a new one based on the given locations
     * @param locations array of locations to be displayed on the map
     * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
     */
    createMarkers(locations, selectMarkerHandler) {
        this.markers = [];
        locations.forEach((element, index) => {
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.storeFinderService.getStoreLatitude(element), this.storeFinderService.getStoreLongitude(element)),
                label: index + 1 + '',
            });
            this.markers.push(marker);
            marker.setMap(this.googleMap);
            marker.addListener('mouseover', function () {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            });
            marker.addListener('mouseout', function () {
                marker.setAnimation(null);
            });
            if (selectMarkerHandler) {
                marker.addListener('click', function () {
                    selectMarkerHandler(index);
                });
            }
        });
    }
    /**
     * Initialize and draw the map
     * @param mapElement {@link HTMLElement} inside of which the map will be drawn
     * @param locations array of locations to be displayed on the map
     * @param selectMarkerHandler function to handle whenever a marker on a map is clicked
     */
    drawMap(mapElement, locations, selectMarkerHandler) {
        this.initMap(mapElement, this.defineMapCenter(locations));
        this.createMarkers(locations, selectMarkerHandler);
    }
}
GoogleMapRendererService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: GoogleMapRendererService, deps: [{ token: i1.StoreFinderConfig }, { token: i2.StoreFinderService }, { token: i3.ScriptLoader }], target: i0.ɵɵFactoryTarget.Injectable });
GoogleMapRendererService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: GoogleMapRendererService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: GoogleMapRendererService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.StoreFinderConfig }, { type: i2.StoreFinderService }, { type: i3.ScriptLoader }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLW1hcC1yZW5kZXJlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3N0b3JlZmluZGVyL2NvcmUvc2VydmljZS9nb29nbGUtbWFwLXJlbmRlcmVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUEsNENBQTRDO0FBTjVDOzs7O0dBSUc7QUFFSCw0Q0FBNEM7QUFDNUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7Ozs7O0FBT2pGLE1BQU0sT0FBTyx3QkFBd0I7SUFJbkMsWUFDWSxNQUF5QixFQUN6QixrQkFBc0MsRUFDdEMsWUFBMEI7UUFGMUIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQU45QixjQUFTLEdBQW9CLElBQUksQ0FBQztJQU92QyxDQUFDO0lBRUo7Ozs7OztPQU1HO0lBQ0gsU0FBUyxDQUNQLFVBQXVCLEVBQ3ZCLFNBQWdCLEVBQ2hCLG1CQUE4QjtRQUU5QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRTtZQUNsQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ25FLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7b0JBQzNCLE1BQU0sTUFBTSxHQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxrQ0FBa0M7d0JBQ2xFLENBQUMsQ0FBQyxFQUFFO3dCQUNKLENBQUMsQ0FBQyxJ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QUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRTtnQkFDOUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFO2dCQUM3QixNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxtQkFBbUIsRUFBRTtnQkFDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7b0JBQzFCLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxPQUFPLENBQ2IsVUFBdUIsRUFDdkIsU0FBZ0IsRUFDaEIsbUJBQTZCO1FBRTdCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3JELENBQUM7O3FIQTVJVSx3QkFBd0I7eUhBQXhCLHdCQUF3QixjQUZ2QixNQUFNOzJGQUVQLHdCQUF3QjtrQkFIcEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cIkB0eXBlcy9nb29nbGUubWFwc1wiIC8+XG5pbXBvcnQgeyBJbmplY3RhYmxlLCBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNjcmlwdExvYWRlciB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBHT09HTEVfTUFQU19ERVZFTE9QTUVOVF9LRVlfQ09ORklHIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZpbmRlci9yb290JztcbmltcG9ydCB7IFN0b3JlRmluZGVyQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL3N0b3JlLWZpbmRlci1jb25maWcnO1xuaW1wb3J0IHsgU3RvcmVGaW5kZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZmFjYWRlL3N0b3JlLWZpbmRlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdvb2dsZU1hcFJlbmRlcmVyU2VydmljZSB7XG4gIHByaXZhdGUgZ29vZ2xlTWFwOiBnb29nbGUubWFwcy5NYXAgPSBudWxsO1xuICBwcml2YXRlIG1hcmtlcnM6IGdvb2dsZS5tYXBzLk1hcmtlcltdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb25maWc6IFN0b3JlRmluZGVyQ29uZmlnLFxuICAgIHByb3RlY3RlZCBzdG9yZUZpbmRlclNlcnZpY2U6IFN0b3JlRmluZGVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgc2NyaXB0TG9hZGVyOiBTY3JpcHRMb2FkZXJcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBSZW5kZXJzIGdvb2dsZSBtYXAgb24gdGhlIGdpdmVuIGVsZW1lbnQgYW5kIGRyYXdzIG1hcmtlcnMgb24gaXQuXG4gICAqIElmIG1hcCBhbHJlYWR5IGV4aXN0cyBpdCB3aWxsIHVzZSBhbiBleGlzdGluZyBtYXAgb3RoZXJ3aXNlIGl0IHdpbGwgY3JlYXRlIG9uZVxuICAgKiBAcGFyYW0gbWFwRWxlbWVudCBIVE1MIGVsZW1lbnQgaW5zaWRlIG9mIHdoaWNoIHRoZSBtYXAgd2lsbCBiZSBkaXNwbGF5ZWRcbiAgICogQHBhcmFtIGxvY2F0aW9ucyBhcnJheSBjb250YWluaWduIGdlbyBkYXRhIHRvIGJlIGRpc3BsYXllZCBvbiB0aGUgbWFwXG4gICAqIEBwYXJhbSBzZWxlY3RNYXJrZXJIYW5kbGVyIGZ1bmN0aW9uIHRvIGhhbmRsZSB3aGVuZXZlciBhIG1hcmtlciBvbiBhIG1hcCBpcyBjbGlja2VkXG4gICAqL1xuICByZW5kZXJNYXAoXG4gICAgbWFwRWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgbG9jYXRpb25zOiBhbnlbXSxcbiAgICBzZWxlY3RNYXJrZXJIYW5kbGVyPzogRnVuY3Rpb25cbiAgKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29uZmlnLmdvb2dsZU1hcHM/LmFwaUtleSkge1xuICAgICAgaWYgKE9iamVjdC5lbnRyaWVzKGxvY2F0aW9uc1tPYmplY3Qua2V5cyhsb2NhdGlvbnMpWzBdXSkubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAodGhpcy5nb29nbGVNYXAgPT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBhcGlLZXkgPVxuICAgICAgICAgICAgdGhpcy5jb25maWcuZ29vZ2xlTWFwcy5hcGlLZXkgPT09IEdPT0dMRV9NQVBTX0RFVkVMT1BNRU5UX0tFWV9DT05GSUdcbiAgICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgICA6IHRoaXMuY29uZmlnLmdvb2dsZU1hcHMuYXBpS2V5O1xuXG4gICAgICAgICAgdGhpcy5zY3JpcHRMb2FkZXIuZW1iZWRTY3JpcHQoe1xuICAgICAgICAgICAgc3JjOiB0aGlzLmNvbmZpZy5nb29nbGVNYXBzLmFwaVVybCxcbiAgICAgICAgICAgIHBhcmFtczogeyBrZXk6IGFwaUtleSB9LFxuICAgICAgICAgICAgYXR0cmlidXRlczogeyB0eXBlOiAndGV4dC9qYXZhc2NyaXB0JyB9LFxuICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5kcmF3TWFwKG1hcEVsZW1lbnQsIGxvY2F0aW9ucywgc2VsZWN0TWFya2VySGFuZGxlcik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZHJhd01hcChtYXBFbGVtZW50LCBsb2NhdGlvbnMsIHNlbGVjdE1hcmtlckhhbmRsZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpc0Rldk1vZGUoKSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgJ0EgR29vZ2xlIE1hcHMgYXBpIGtleSBpcyByZXF1aXJlZCBpbiB0aGUgc3RvcmUgZmluZGVyIGNvbmZpZ3VyYXRpb24gdG8gZGlzcGxheSB0aGUgR29vZ2xlIG1hcC4nXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENlbnRlcnMgdGhlIG1hcCB0byB0aGUgZ2l2ZW4gcG9pbnRcbiAgICogQHBhcmFtIGxhdGl0dXRlIGxhdGl0dWRlIG9mIHRoZSBuZXcgY2VudGVyXG4gICAqIEBwYXJhbSBsb25naXR1ZGUgbG9uZ2l0dWRlIG9mIHRoZSBuZXcgY2VudGVyXG4gICAqL1xuICBjZW50ZXJNYXAobGF0aXR1dGU6IG51bWJlciwgbG9uZ2l0dWRlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmdvb2dsZU1hcC5wYW5Ubyh7IGxhdDogbGF0aXR1dGUsIGxuZzogbG9uZ2l0dWRlIH0pO1xuICAgIHRoaXMuZ29vZ2xlTWFwLnNldFpvb20odGhpcy5jb25maWcuZ29vZ2xlTWFwcy5zZWxlY3RlZE1hcmtlclNjYWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIGFuZCByZXR1cm5zIHtAbGluayBnb29nbGUubWFwcy5MYXRMbmd9IHJlcHJlc2VudGluZyBhIHBvaW50IHdoZXJlIHRoZSBtYXAgd2lsbCBiZSBjZW50ZXJlZFxuICAgKiBAcGFyYW0gbG9jYXRpb25zIGxpc3Qgb2YgbG9jYXRpb25zXG4gICAqL1xuICBwcml2YXRlIGRlZmluZU1hcENlbnRlcihsb2NhdGlvbnM6IGFueVtdKTogZ29vZ2xlLm1hcHMuTGF0TG5nIHtcbiAgICByZXR1cm4gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhcbiAgICAgIHRoaXMuc3RvcmVGaW5kZXJTZXJ2aWNlLmdldFN0b3JlTGF0aXR1ZGUobG9jYXRpb25zWzBdKSxcbiAgICAgIHRoaXMuc3RvcmVGaW5kZXJTZXJ2aWNlLmdldFN0b3JlTG9uZ2l0dWRlKGxvY2F0aW9uc1swXSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgZ29vZ2xlIG1hcCBpbnNpZGUgaWYgdGhlIGdpdmVuIEhUTUwgZWxlbWVudCBjZW50ZXJlZCB0byB0aGUgZ2l2ZW4gcG9pbnRcbiAgICogQHBhcmFtIG1hcEVsZW1lbnQge0BsaW5rIEhUTUxFbGVtZW50fSBpbnNpZGUgb2Ygd2hpY2ggdGhlIG1hcCB3aWxsIGJlIGNyZWF0ZWRcbiAgICogQHBhcmFtIG1hcENlbnRlciB7QGxpbmsgZ29vZ2xlLm1hcHMuTGF0TG5nfSB0aGUgcG9pbnQgd2hlcmUgdGhlIG1hcCB3aWxsIGJlIGNlbnRlcmVkXG4gICAqL1xuICBwcml2YXRlIGluaXRNYXAoXG4gICAgbWFwRWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgbWFwQ2VudGVyOiBnb29nbGUubWFwcy5MYXRMbmdcbiAgKTogdm9pZCB7XG4gICAgdHlwZSBHZXN0dXJlSGFuZGxpbmdPcHRpb25zID0gJ2Nvb3BlcmF0aXZlJyB8ICdncmVlZHknIHwgJ25vbmUnIHwgJ2F1dG8nO1xuICAgIGNvbnN0IGdlc3R1cmVPcHRpb246IEdlc3R1cmVIYW5kbGluZ09wdGlvbnMgPSAnZ3JlZWR5JztcblxuICAgIGNvbnN0IG1hcFByb3AgPSB7XG4gICAgICBjZW50ZXI6IG1hcENlbnRlcixcbiAgICAgIHpvb206IHRoaXMuY29uZmlnLmdvb2dsZU1hcHMuc2NhbGUsXG4gICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxuICAgICAgZ2VzdHVyZUhhbmRsaW5nOiBnZXN0dXJlT3B0aW9uLFxuICAgIH07XG4gICAgdGhpcy5nb29nbGVNYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG1hcEVsZW1lbnQsIG1hcFByb3ApO1xuICB9XG5cbiAgLyoqXG4gICAqIEVyYXNlcyB0aGUgY3VycmVudCBtYXAncyBtYXJrZXJzIGFuZCBjcmVhdGUgYSBuZXcgb25lIGJhc2VkIG9uIHRoZSBnaXZlbiBsb2NhdGlvbnNcbiAgICogQHBhcmFtIGxvY2F0aW9ucyBhcnJheSBvZiBsb2NhdGlvbnMgdG8gYmUgZGlzcGxheWVkIG9uIHRoZSBtYXBcbiAgICogQHBhcmFtIHNlbGVjdE1hcmtlckhhbmRsZXIgZnVuY3Rpb24gdG8gaGFuZGxlIHdoZW5ldmVyIGEgbWFya2VyIG9uIGEgbWFwIGlzIGNsaWNrZWRcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlTWFya2VycyhcbiAgICBsb2NhdGlvbnM6IGFueVtdLFxuICAgIHNlbGVjdE1hcmtlckhhbmRsZXI/OiBGdW5jdGlvblxuICApOiB2b2lkIHtcbiAgICB0aGlzLm1hcmtlcnMgPSBbXTtcbiAgICBsb2NhdGlvbnMuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xuICAgICAgICBwb3NpdGlvbjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhcbiAgICAgICAgICB0aGlzLnN0b3JlRmluZGVyU2VydmljZS5nZXRTdG9yZUxhdGl0dWRlKGVsZW1lbnQpLFxuICAgICAgICAgIHRoaXMuc3RvcmVGaW5kZXJTZXJ2aWNlLmdldFN0b3JlTG9uZ2l0dWRlKGVsZW1lbnQpXG4gICAgICAgICksXG4gICAgICAgIGxhYmVsOiBpbmRleCArIDEgKyAnJyxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5tYXJrZXJzLnB1c2gobWFya2VyKTtcbiAgICAgIG1hcmtlci5zZXRNYXAodGhpcy5nb29nbGVNYXApO1xuICAgICAgbWFya2VyLmFkZExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1hcmtlci5zZXRBbmltYXRpb24oZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkJPVU5DRSk7XG4gICAgICB9KTtcbiAgICAgIG1hcmtlci5hZGRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1hcmtlci5zZXRBbmltYXRpb24obnVsbCk7XG4gICAgICB9KTtcbiAgICAgIGlmIChzZWxlY3RNYXJrZXJIYW5kbGVyKSB7XG4gICAgICAgIG1hcmtlci5hZGRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZWN0TWFya2VySGFuZGxlcihpbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgYW5kIGRyYXcgdGhlIG1hcFxuICAgKiBAcGFyYW0gbWFwRWxlbWVudCB7QGxpbmsgSFRNTEVsZW1lbnR9IGluc2lkZSBvZiB3aGljaCB0aGUgbWFwIHdpbGwgYmUgZHJhd25cbiAgICogQHBhcmFtIGxvY2F0aW9ucyBhcnJheSBvZiBsb2NhdGlvbnMgdG8gYmUgZGlzcGxheWVkIG9uIHRoZSBtYXBcbiAgICogQHBhcmFtIHNlbGVjdE1hcmtlckhhbmRsZXIgZnVuY3Rpb24gdG8gaGFuZGxlIHdoZW5ldmVyIGEgbWFya2VyIG9uIGEgbWFwIGlzIGNsaWNrZWRcbiAgICovXG4gIHByaXZhdGUgZHJhd01hcChcbiAgICBtYXBFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBsb2NhdGlvbnM6IGFueVtdLFxuICAgIHNlbGVjdE1hcmtlckhhbmRsZXI6IEZ1bmN0aW9uXG4gICkge1xuICAgIHRoaXMuaW5pdE1hcChtYXBFbGVtZW50LCB0aGlzLmRlZmluZU1hcENlbnRlcihsb2NhdGlvbnMpKTtcbiAgICB0aGlzLmNyZWF0ZU1hcmtlcnMobG9jYXRpb25zLCBzZWxlY3RNYXJrZXJIYW5kbGVyKTtcbiAgfVxufVxuIl19