/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ConfigChunk, deepMerge, DefaultConfigChunk, } from '@spartacus/core';
import { defer, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
/**
 * Service responsible for resolving cms config based feature modules.
 */
export class CmsFeaturesService {
    constructor(configInitializer, featureModules) {
        this.configInitializer = configInitializer;
        this.featureModules = featureModules;
        // maps componentType to feature
        this.componentFeatureMap = new Map();
        /*
         * Contains either FeatureInstance or FeatureInstance resolver for not yet
         * resolved feature modules
         */
        this.featureInstances = new Map();
        this.initFeatureMap();
    }
    initFeatureMap() {
        this.configInitializer
            .getStable('featureModules')
            .subscribe((config) => {
            this.featureModulesConfig = config.featureModules ?? {};
            for (const [featureName, featureConfig] of Object.entries(this.featureModulesConfig)) {
                if (typeof featureConfig !== 'string' &&
                    featureConfig?.module &&
                    featureConfig?.cmsComponents?.length) {
                    for (const component of featureConfig.cmsComponents) {
                        this.componentFeatureMap.set(component, featureName);
                    }
                }
            }
        });
    }
    /**
     * Check if there is feature module configuration that covers specified
     * component type
     */
    hasFeatureFor(componentType) {
        return this.componentFeatureMap.has(componentType);
    }
    /**
     * Return full CmsComponent mapping defined in feature module
     */
    getCmsMapping(componentType) {
        const feature = this.componentFeatureMap.get(componentType);
        if (!feature) {
            return of(undefined);
        }
        return this.resolveFeatureInstance(feature).pipe(map((featureInstance) => featureInstance.componentsMappings?.[componentType]));
    }
    /**
     * Resolves feature module for provided component type
     *
     * @param componentType
     */
    getModule(componentType) {
        const feature = this.componentFeatureMap.get(componentType);
        if (!feature) {
            return undefined;
        }
        let module;
        // we are returning injectors only for already resolved features
        this.featureInstances
            .get(feature)
            ?.subscribe((featureInstance) => {
            module = featureInstance.moduleRef;
        })
            .unsubscribe();
        return module;
    }
    /**
     * Resolve feature based on feature name, if feature was not yet resolved
     *
     * It will first resolve all module dependencies if defined
     */
    resolveFeatureInstance(featureName) {
        return defer(() => {
            if (!this.featureInstances.has(featureName)) {
                this.featureInstances.set(featureName, this.featureModules.resolveFeature(featureName).pipe(map((moduleRef) => this.createFeatureInstance(moduleRef, featureName)), shareReplay()));
            }
            return this.featureInstances.get(featureName);
        });
    }
    /**
     * Create feature instance from feature's moduleRef
     */
    createFeatureInstance(moduleRef, feature) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const featureConfig = this.featureModulesConfig[feature];
        const featureInstance = {
            moduleRef,
            componentsMappings: {},
        };
        // resolve configuration for feature module
        const resolvedConfiguration = this.resolveFeatureConfiguration(moduleRef.injector);
        // extract cms components configuration from feature config
        for (const componentType of featureConfig.cmsComponents ?? []) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            featureInstance.componentsMappings[componentType] =
                resolvedConfiguration.cmsComponents?.[componentType] ?? {};
        }
        return featureInstance;
    }
    /**
     * Returns configuration provided in feature module
     */
    resolveFeatureConfiguration(featureInjector) {
        // get config chunks from feature lib
        const featureConfigChunks = featureInjector.get(ConfigChunk, [], {
            self: true,
        });
        // get default config chunks from feature lib
        const featureDefaultConfigChunks = featureInjector.get(DefaultConfigChunk, [], { self: true });
        return deepMerge({}, ...(featureDefaultConfigChunks ?? []), ...(featureConfigChunks ?? []));
    }
}
CmsFeaturesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CmsFeaturesService, deps: [{ token: i1.ConfigInitializerService }, { token: i1.FeatureModulesService }], target: i0.ɵɵFactoryTarget.Injectable });
CmsFeaturesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CmsFeaturesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CmsFeaturesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConfigInitializerService }, { type: i1.FeatureModulesService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY21zLWZlYXR1cmVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvc2VydmljZXMvY21zLWZlYXR1cmVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQXlCLE1BQU0sZUFBZSxDQUFDO0FBQ2xFLE9BQU8sRUFJTCxXQUFXLEVBRVgsU0FBUyxFQUNULGtCQUFrQixHQUduQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU9sRDs7R0FFRztBQUlILE1BQU0sT0FBTyxrQkFBa0I7SUFnQjdCLFlBQ1ksaUJBQTJDLEVBQzNDLGNBQXFDO1FBRHJDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBMEI7UUFDM0MsbUJBQWMsR0FBZCxjQUFjLENBQXVCO1FBWmpELGdDQUFnQztRQUN4Qix3QkFBbUIsR0FBd0IsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUU3RDs7O1dBR0c7UUFDSyxxQkFBZ0IsR0FDdEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQU1WLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU8sY0FBYztRQUNwQixJQUFJLENBQUMsaUJBQWlCO2FBQ25CLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQzthQUMzQixTQUFTLENBQUMsQ0FBQyxNQUFpQixFQUFFLEVBQUU7WUFDL0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDO1lBRXhELEtBQUssTUFBTSxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUN2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REFBMkQ7UUFDM0QsS0FBSyxNQUFNLGFBQWEsSUFBSSxhQUFhLENBQUMsYUFBYSxJQUFJLEVBQUUsRUFBRTtZQUM3RCxvRUFBb0U7WUFDcEUsZUFBZSxDQUFDLGtCQUFtQixDQUFDLGFBQWEsQ0FBQztnQkFDaEQscUJBQXFCLENBQUMsYUFBYSxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzlEO1FBQ0QsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0ssMkJBQTJCLENBQUMsZUFBeUI7UUFDM0QscUNBQXFDO1FBQ3JDLE1BQU0sbUJBQW1CLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBUSxXQUFXLEVBQUUsRUFBRSxFQUFFO1lBQ3RFLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFDO1FBQ0gsNkNBQTZDO1FBQzdDLE1BQU0sMEJBQTBCLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FDcEQsa0JBQWtCLEVBQ2xCLEVBQUUsRUFDRixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FDZixDQUFDO1FBRUYsT0FBTyxTQUFTLENBQ2QsRUFBRSxFQUNGLEdBQUcsQ0FBQywwQkFBMEIsSUFBSSxFQUFFLENBQUMsRUFDckMsR0FBRyxDQUFDLG1CQUFtQixJQUFJLEVBQUUsQ0FBQyxDQUNsQixDQUFDO0lBQ2pCLENBQUM7OytHQTVLVSxrQkFBa0I7bUhBQWxCLGtCQUFrQixjQUZqQixNQUFNOzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciwgTmdNb2R1bGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENNU0NvbXBvbmVudENvbmZpZyxcbiAgQ21zQ29tcG9uZW50TWFwcGluZyxcbiAgQ21zQ29uZmlnLFxuICBDb25maWdDaHVuayxcbiAgQ29uZmlnSW5pdGlhbGl6ZXJTZXJ2aWNlLFxuICBkZWVwTWVyZ2UsXG4gIERlZmF1bHRDb25maWdDaHVuayxcbiAgRmVhdHVyZU1vZHVsZUNvbmZpZyxcbiAgRmVhdHVyZU1vZHVsZXNTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgZGVmZXIsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHNoYXJlUmVwbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbnRlcmZhY2UgRmVhdHVyZUluc3RhbmNlIGV4dGVuZHMgRmVhdHVyZU1vZHVsZUNvbmZpZyB7XG4gIG1vZHVsZVJlZj86IE5nTW9kdWxlUmVmPGFueT47XG4gIGNvbXBvbmVudHNNYXBwaW5ncz86IENNU0NvbXBvbmVudENvbmZpZztcbn1cblxuLyoqXG4gKiBTZXJ2aWNlIHJlc3BvbnNpYmxlIGZvciByZXNvbHZpbmcgY21zIGNvbmZpZyBiYXNlZCBmZWF0dXJlIG1vZHVsZXMuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDbXNGZWF0dXJlc1NlcnZpY2Uge1xuICAvLyBmZWF0dXJlIG1vZHVsZXMgY29uZmlndXJhdGlvblxuICBwcml2YXRlIGZlYXR1cmVNb2R1bGVzQ29uZmlnPzoge1xuICAgIFtmZWF0dXJlTmFtZTogc3RyaW5nXTogRmVhdHVyZU1vZHVsZUNvbmZpZyB8IHN0cmluZztcbiAgfTtcblxuICAvLyBtYXBzIGNvbXBvbmVudFR5cGUgdG8gZmVhdHVyZVxuICBwcml2YXRlIGNvbXBvbmVudEZlYXR1cmVNYXA6IE1hcDxzdHJpbmcsIHN0cmluZz4gPSBuZXcgTWFwKCk7XG5cbiAgLypcbiAgICogQ29udGFpbnMgZWl0aGVyIEZlYXR1cmVJbnN0YW5jZSBvciBGZWF0dXJlSW5zdGFuY2UgcmVzb2x2ZXIgZm9yIG5vdCB5ZXRcbiAgICogcmVzb2x2ZWQgZmVhdHVyZSBtb2R1bGVzXG4gICAqL1xuICBwcml2YXRlIGZlYXR1cmVJbnN0YW5jZXM6IE1hcDxzdHJpbmcsIE9ic2VydmFibGU8RmVhdHVyZUluc3RhbmNlPj4gPVxuICAgIG5ldyBNYXAoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgY29uZmlnSW5pdGlhbGl6ZXI6IENvbmZpZ0luaXRpYWxpemVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZmVhdHVyZU1vZHVsZXM6IEZlYXR1cmVNb2R1bGVzU2VydmljZVxuICApIHtcbiAgICB0aGlzLmluaXRGZWF0dXJlTWFwKCk7XG4gIH1cblxuICBwcml2YXRlIGluaXRGZWF0dXJlTWFwKCk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlnSW5pdGlhbGl6ZXJcbiAgICAgIC5nZXRTdGFibGUoJ2ZlYXR1cmVNb2R1bGVzJylcbiAgICAgIC5zdWJzY3JpYmUoKGNvbmZpZzogQ21zQ29uZmlnKSA9PiB7XG4gICAgICAgIHRoaXMuZmVhdHVyZU1vZHVsZXNDb25maWcgPSBjb25maWcuZmVhdHVyZU1vZHVsZXMgPz8ge307XG5cbiAgICAgICAgZm9yIChjb25zdCBbZmVhdHVyZU5hbWUsIGZlYXR1cmVDb25maWddIG9mIE9iamVjdC5lbnRyaWVzKFxuICAgICAgICAgIHRoaXMuZmVhdHVyZU1vZHVsZXNDb25maWdcbiAgICAgICAgKSkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBmZWF0dXJlQ29uZmlnICE9PSAnc3RyaW5nJyAmJlxuICAgICAgICAgICAgZmVhdHVyZUNvbmZpZz8ubW9kdWxlICYmXG4gICAgICAgICAgICBmZWF0dXJlQ29uZmlnPy5jbXNDb21wb25lbnRzPy5sZW5ndGhcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgY29tcG9uZW50IG9mIGZlYXR1cmVDb25maWcuY21zQ29tcG9uZW50cykge1xuICAgICAgICAgICAgICB0aGlzLmNvbXBvbmVudEZlYXR1cmVNYXAuc2V0KGNvbXBvbmVudCwgZmVhdHVyZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlcmUgaXMgZmVhdHVyZSBtb2R1bGUgY29uZmlndXJhdGlvbiB0aGF0IGNvdmVycyBzcGVjaWZpZWRcbiAgICogY29tcG9uZW50IHR5cGVcbiAgICovXG4gIGhhc0ZlYXR1cmVGb3IoY29tcG9uZW50VHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29tcG9uZW50RmVhdHVyZU1hcC5oYXMoY29tcG9uZW50VHlwZSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGZ1bGwgQ21zQ29tcG9uZW50IG1hcHBpbmcgZGVmaW5lZCBpbiBmZWF0dXJlIG1vZHVsZVxuICAgKi9cbiAgZ2V0Q21zTWFwcGluZyhcbiAgICBjb21wb25lbnRUeXBlOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxDbXNDb21wb25lbnRNYXBwaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgY29uc3QgZmVhdHVyZSA9IHRoaXMuY29tcG9uZW50RmVhdHVyZU1hcC5nZXQoY29tcG9uZW50VHlwZSk7XG5cbiAgICBpZiAoIWZlYXR1cmUpIHtcbiAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlc29sdmVGZWF0dXJlSW5zdGFuY2UoZmVhdHVyZSkucGlwZShcbiAgICAgIG1hcChcbiAgICAgICAgKGZlYXR1cmVJbnN0YW5jZSkgPT4gZmVhdHVyZUluc3RhbmNlLmNvbXBvbmVudHNNYXBwaW5ncz8uW2NvbXBvbmVudFR5cGVdXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyBmZWF0dXJlIG1vZHVsZSBmb3IgcHJvdmlkZWQgY29tcG9uZW50IHR5cGVcbiAgICpcbiAgICogQHBhcmFtIGNvbXBvbmVudFR5cGVcbiAgICovXG4gIGdldE1vZHVsZShjb21wb25lbnRUeXBlOiBzdHJpbmcpOiBOZ01vZHVsZVJlZjxhbnk+IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBmZWF0dXJlID0gdGhpcy5jb21wb25lbnRGZWF0dXJlTWFwLmdldChjb21wb25lbnRUeXBlKTtcblxuICAgIGlmICghZmVhdHVyZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBsZXQgbW9kdWxlO1xuXG4gICAgLy8gd2UgYXJlIHJldHVybmluZyBpbmplY3RvcnMgb25seSBmb3IgYWxyZWFkeSByZXNvbHZlZCBmZWF0dXJlc1xuICAgIHRoaXMuZmVhdHVyZUluc3RhbmNlc1xuICAgICAgLmdldChmZWF0dXJlKVxuICAgICAgPy5zdWJzY3JpYmUoKGZlYXR1cmVJbnN0YW5jZSkgPT4ge1xuICAgICAgICBtb2R1bGUgPSBmZWF0dXJlSW5zdGFuY2UubW9kdWxlUmVmO1xuICAgICAgfSlcbiAgICAgIC51bnN1YnNjcmliZSgpO1xuICAgIHJldHVybiBtb2R1bGU7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZSBmZWF0dXJlIGJhc2VkIG9uIGZlYXR1cmUgbmFtZSwgaWYgZmVhdHVyZSB3YXMgbm90IHlldCByZXNvbHZlZFxuICAgKlxuICAgKiBJdCB3aWxsIGZpcnN0IHJlc29sdmUgYWxsIG1vZHVsZSBkZXBlbmRlbmNpZXMgaWYgZGVmaW5lZFxuICAgKi9cbiAgcHJpdmF0ZSByZXNvbHZlRmVhdHVyZUluc3RhbmNlKFxuICAgIGZlYXR1cmVOYW1lOiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTxGZWF0dXJlSW5zdGFuY2U+IHtcbiAgICByZXR1cm4gZGVmZXIoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmZlYXR1cmVJbnN0YW5jZXMuaGFzKGZlYXR1cmVOYW1lKSkge1xuICAgICAgICB0aGlzLmZlYXR1cmVJbnN0YW5jZXMuc2V0KFxuICAgICAgICAgIGZlYXR1cmVOYW1lLFxuICAgICAgICAgIHRoaXMuZmVhdHVyZU1vZHVsZXMucmVzb2x2ZUZlYXR1cmUoZmVhdHVyZU5hbWUpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKG1vZHVsZVJlZikgPT5cbiAgICAgICAgICAgICAgdGhpcy5jcmVhdGVGZWF0dXJlSW5zdGFuY2UobW9kdWxlUmVmLCBmZWF0dXJlTmFtZSlcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBzaGFyZVJlcGxheSgpXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5mZWF0dXJlSW5zdGFuY2VzLmdldChmZWF0dXJlTmFtZSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGZlYXR1cmUgaW5zdGFuY2UgZnJvbSBmZWF0dXJlJ3MgbW9kdWxlUmVmXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUZlYXR1cmVJbnN0YW5jZShcbiAgICBtb2R1bGVSZWY6IE5nTW9kdWxlUmVmPGFueT4sXG4gICAgZmVhdHVyZTogc3RyaW5nXG4gICk6IEZlYXR1cmVJbnN0YW5jZSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICBjb25zdCBmZWF0dXJlQ29uZmlnID0gdGhpcy5mZWF0dXJlTW9kdWxlc0NvbmZpZyFbXG4gICAgICBmZWF0dXJlXG4gICAgXSBhcyBGZWF0dXJlTW9kdWxlQ29uZmlnO1xuXG4gICAgY29uc3QgZmVhdHVyZUluc3RhbmNlOiBGZWF0dXJlSW5zdGFuY2UgPSB7XG4gICAgICBtb2R1bGVSZWYsXG4gICAgICBjb21wb25lbnRzTWFwcGluZ3M6IHt9LFxuICAgIH07XG5cbiAgICAvLyByZXNvbHZlIGNvbmZpZ3VyYXRpb24gZm9yIGZlYXR1cmUgbW9kdWxlXG4gICAgY29uc3QgcmVzb2x2ZWRDb25maWd1cmF0aW9uID0gdGhpcy5yZXNvbHZlRmVhdHVyZUNvbmZpZ3VyYXRpb24oXG4gICAgICBtb2R1bGVSZWYuaW5qZWN0b3JcbiAgICApO1xuXG4gICAgLy8gZXh0cmFjdCBjbXMgY29tcG9uZW50cyBjb25maWd1cmF0aW9uIGZyb20gZmVhdHVyZSBjb25maWdcbiAgICBmb3IgKGNvbnN0IGNvbXBvbmVudFR5cGUgb2YgZmVhdHVyZUNvbmZpZy5jbXNDb21wb25lbnRzID8/IFtdKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgZmVhdHVyZUluc3RhbmNlLmNvbXBvbmVudHNNYXBwaW5ncyFbY29tcG9uZW50VHlwZV0gPVxuICAgICAgICByZXNvbHZlZENvbmZpZ3VyYXRpb24uY21zQ29tcG9uZW50cz8uW2NvbXBvbmVudFR5cGVdID8/IHt9O1xuICAgIH1cbiAgICByZXR1cm4gZmVhdHVyZUluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY29uZmlndXJhdGlvbiBwcm92aWRlZCBpbiBmZWF0dXJlIG1vZHVsZVxuICAgKi9cbiAgcHJpdmF0ZSByZXNvbHZlRmVhdHVyZUNvbmZpZ3VyYXRpb24oZmVhdHVyZUluamVjdG9yOiBJbmplY3Rvcik6IENtc0NvbmZpZyB7XG4gICAgLy8gZ2V0IGNvbmZpZyBjaHVua3MgZnJvbSBmZWF0dXJlIGxpYlxuICAgIGNvbnN0IGZlYXR1cmVDb25maWdDaHVua3MgPSBmZWF0dXJlSW5qZWN0b3IuZ2V0PGFueVtdPihDb25maWdDaHVuaywgW10sIHtcbiAgICAgIHNlbGY6IHRydWUsXG4gICAgfSk7XG4gICAgLy8gZ2V0IGRlZmF1bHQgY29uZmlnIGNodW5rcyBmcm9tIGZlYXR1cmUgbGliXG4gICAgY29uc3QgZmVhdHVyZURlZmF1bHRDb25maWdDaHVua3MgPSBmZWF0dXJlSW5qZWN0b3IuZ2V0PGFueVtdPihcbiAgICAgIERlZmF1bHRDb25maWdDaHVuayxcbiAgICAgIFtdLFxuICAgICAgeyBzZWxmOiB0cnVlIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIGRlZXBNZXJnZShcbiAgICAgIHt9LFxuICAgICAgLi4uKGZlYXR1cmVEZWZhdWx0Q29uZmlnQ2h1bmtzID8/IFtdKSxcbiAgICAgIC4uLihmZWF0dXJlQ29uZmlnQ2h1bmtzID8/IFtdKVxuICAgICkgYXMgQ21zQ29uZmlnO1xuICB9XG59XG4iXX0=