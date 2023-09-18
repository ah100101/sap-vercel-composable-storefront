/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Inject, Injectable } from '@angular/core';
import { I18NEXT_INSTANCE } from './i18next-instance';
import * as i0 from "@angular/core";
import * as i1 from "../config/i18n-config";
import * as i2 from "../../site-context/facade/language.service";
import * as i3 from "./i18next-backend/i18next-backend.service";
/**
 * Initializes the i18next instance.
 */
export class I18nextInitializer {
    constructor(i18next, config, languageService, i18nextBackendService) {
        this.i18next = i18next;
        this.config = config;
        this.languageService = languageService;
        this.i18nextBackendService = i18nextBackendService;
    }
    /**
     * Initializes the i18next instance.
     *
     * @returns Promise that resolves when the i18next instance is initialized.
     */
    initialize() {
        const i18nextConfig = this.getI18nextConfig();
        return this.i18next.init(i18nextConfig, () => {
            // Don't use i18next's 'resources' config key for adding static translations,
            // because it will disable loading chunks from backend. We add resources here, in the init's callback.
            this.addTranslationResources();
            this.synchronizeLanguage();
        });
    }
    /**
     * Returns the configuration for initializing an i18next instance.
     */
    getI18nextConfig() {
        let i18nextConfig = {
            ns: [],
            fallbackLng: this.config.i18n?.fallbackLang,
            debug: this.config.i18n?.debug,
            interpolation: {
                escapeValue: false,
                skipOnVariables: false,
            },
        };
        if (this.config.i18n?.backend) {
            i18nextConfig = {
                ...i18nextConfig,
                ...this.i18nextBackendService.initialize(),
            };
        }
        return i18nextConfig;
    }
    /**
     * Populates the i18next instance with the given static translations.
     *
     * @param i18next i18next instance
     * @param resources translation resources
     */
    addTranslationResources() {
        const resources = this.config.i18n?.resources ?? {};
        Object.keys(resources).forEach((lang) => {
            Object.keys(resources[lang]).forEach((chunkName) => {
                this.i18next.addResourceBundle(lang, chunkName, resources[lang][chunkName], true, true);
            });
        });
    }
    /**
     * Ensures that when the site context language changes,
     * the i18next instance is updated with the new language.
     */
    synchronizeLanguage() {
        this.subscription =
            this.subscription ??
                this.languageService
                    .getActive()
                    .subscribe((lang) => this.i18next.changeLanguage(lang));
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
I18nextInitializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: I18nextInitializer, deps: [{ token: I18NEXT_INSTANCE }, { token: i1.I18nConfig }, { token: i2.LanguageService }, { token: i3.I18nextBackendService }], target: i0.ɵɵFactoryTarget.Injectable });
I18nextInitializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: I18nextInitializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: I18nextInitializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [I18NEXT_INSTANCE]
                }] }, { type: i1.I18nConfig }, { type: i2.LanguageService }, { type: i3.I18nextBackendService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bmV4dC1pbml0aWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2kxOG4vaTE4bmV4dC9pMThuZXh0LWluaXRpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQU85RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7QUFFdEQ7O0dBRUc7QUFFSCxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQ3NDLE9BQWEsRUFDdkMsTUFBa0IsRUFDbEIsZUFBZ0MsRUFDaEMscUJBQTRDO1FBSGxCLFlBQU8sR0FBUCxPQUFPLENBQU07UUFDdkMsV0FBTSxHQUFOLE1BQU0sQ0FBWTtRQUNsQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtJQUNyRCxDQUFDO0lBRUo7Ozs7T0FJRztJQUNILFVBQVU7UUFDUixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7WUFDM0MsNkVBQTZFO1lBQzdFLHNHQUFzRztZQUN0RyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNPLGdCQUFnQjtRQUN4QixJQUFJLGFBQWEsR0FBZ0I7WUFDL0IsRUFBRSxFQUFFLEVBQUU7WUFDTixXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsWUFBWTtZQUMzQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSztZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLGVBQWUsRUFBRSxLQUFLO2FBQ3ZCO1NBQ0YsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQzdCLGFBQWEsR0FBRztnQkFDZCxHQUFHLGFBQWE7Z0JBQ2hCLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsRUFBRTthQUMzQyxDQUFDO1NBQ0g7UUFFRCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDTyx1QkFBdUI7UUFDL0IsTUFBTSxTQUFTLEdBQXlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDMUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUM1QixJQUFJLEVBQ0osU0FBUyxFQUNULFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFDMUIsSUFBSSxFQUNKLElBQUksQ0FDTCxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFJRDs7O09BR0c7SUFDTyxtQkFBbUI7UUFDM0IsSUFBSSxDQUFDLFlBQVk7WUFDZixJQUFJLENBQUMsWUFBWTtnQkFDakIsSUFBSSxDQUFDLGVBQWU7cUJBQ2pCLFNBQVMsRUFBRTtxQkFDWCxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ25DLENBQUM7OytHQXBGVSxrQkFBa0Isa0JBRW5CLGdCQUFnQjttSEFGZixrQkFBa0IsY0FETCxNQUFNOzJGQUNuQixrQkFBa0I7a0JBRDlCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzswQkFHN0IsTUFBTTsyQkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHR5cGUgeyBpMThuLCBJbml0T3B0aW9ucyB9IGZyb20gJ2kxOG5leHQnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMYW5ndWFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaXRlLWNvbnRleHQvZmFjYWRlL2xhbmd1YWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSTE4bkNvbmZpZyB9IGZyb20gJy4uL2NvbmZpZy9pMThuLWNvbmZpZyc7XG5pbXBvcnQgeyBUcmFuc2xhdGlvblJlc291cmNlcyB9IGZyb20gJy4uL3RyYW5zbGF0aW9uLXJlc291cmNlcyc7XG5pbXBvcnQgeyBJMThuZXh0QmFja2VuZFNlcnZpY2UgfSBmcm9tICcuL2kxOG5leHQtYmFja2VuZC9pMThuZXh0LWJhY2tlbmQuc2VydmljZSc7XG5pbXBvcnQgeyBJMThORVhUX0lOU1RBTkNFIH0gZnJvbSAnLi9pMThuZXh0LWluc3RhbmNlJztcblxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgaTE4bmV4dCBpbnN0YW5jZS5cbiAqL1xuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBJMThuZXh0SW5pdGlhbGl6ZXIgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEkxOE5FWFRfSU5TVEFOQ0UpIHByb3RlY3RlZCBpMThuZXh0OiBpMThuLFxuICAgIHByb3RlY3RlZCBjb25maWc6IEkxOG5Db25maWcsXG4gICAgcHJvdGVjdGVkIGxhbmd1YWdlU2VydmljZTogTGFuZ3VhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBpMThuZXh0QmFja2VuZFNlcnZpY2U6IEkxOG5leHRCYWNrZW5kU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBpMThuZXh0IGluc3RhbmNlLlxuICAgKlxuICAgKiBAcmV0dXJucyBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgaTE4bmV4dCBpbnN0YW5jZSBpcyBpbml0aWFsaXplZC5cbiAgICovXG4gIGluaXRpYWxpemUoKTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCBpMThuZXh0Q29uZmlnID0gdGhpcy5nZXRJMThuZXh0Q29uZmlnKCk7XG4gICAgcmV0dXJuIHRoaXMuaTE4bmV4dC5pbml0KGkxOG5leHRDb25maWcsICgpID0+IHtcbiAgICAgIC8vIERvbid0IHVzZSBpMThuZXh0J3MgJ3Jlc291cmNlcycgY29uZmlnIGtleSBmb3IgYWRkaW5nIHN0YXRpYyB0cmFuc2xhdGlvbnMsXG4gICAgICAvLyBiZWNhdXNlIGl0IHdpbGwgZGlzYWJsZSBsb2FkaW5nIGNodW5rcyBmcm9tIGJhY2tlbmQuIFdlIGFkZCByZXNvdXJjZXMgaGVyZSwgaW4gdGhlIGluaXQncyBjYWxsYmFjay5cbiAgICAgIHRoaXMuYWRkVHJhbnNsYXRpb25SZXNvdXJjZXMoKTtcbiAgICAgIHRoaXMuc3luY2hyb25pemVMYW5ndWFnZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGNvbmZpZ3VyYXRpb24gZm9yIGluaXRpYWxpemluZyBhbiBpMThuZXh0IGluc3RhbmNlLlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldEkxOG5leHRDb25maWcoKTogSW5pdE9wdGlvbnMge1xuICAgIGxldCBpMThuZXh0Q29uZmlnOiBJbml0T3B0aW9ucyA9IHtcbiAgICAgIG5zOiBbXSwgLy8gZG9uJ3QgcHJlbG9hZCBhbnkgbmFtZXNwYWNlc1xuICAgICAgZmFsbGJhY2tMbmc6IHRoaXMuY29uZmlnLmkxOG4/LmZhbGxiYWNrTGFuZyxcbiAgICAgIGRlYnVnOiB0aGlzLmNvbmZpZy5pMThuPy5kZWJ1ZyxcbiAgICAgIGludGVycG9sYXRpb246IHtcbiAgICAgICAgZXNjYXBlVmFsdWU6IGZhbHNlLFxuICAgICAgICBza2lwT25WYXJpYWJsZXM6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29uZmlnLmkxOG4/LmJhY2tlbmQpIHtcbiAgICAgIGkxOG5leHRDb25maWcgPSB7XG4gICAgICAgIC4uLmkxOG5leHRDb25maWcsXG4gICAgICAgIC4uLnRoaXMuaTE4bmV4dEJhY2tlbmRTZXJ2aWNlLmluaXRpYWxpemUoKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGkxOG5leHRDb25maWc7XG4gIH1cblxuICAvKipcbiAgICogUG9wdWxhdGVzIHRoZSBpMThuZXh0IGluc3RhbmNlIHdpdGggdGhlIGdpdmVuIHN0YXRpYyB0cmFuc2xhdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBpMThuZXh0IGkxOG5leHQgaW5zdGFuY2VcbiAgICogQHBhcmFtIHJlc291cmNlcyB0cmFuc2xhdGlvbiByZXNvdXJjZXNcbiAgICovXG4gIHByb3RlY3RlZCBhZGRUcmFuc2xhdGlvblJlc291cmNlcygpOiB2b2lkIHtcbiAgICBjb25zdCByZXNvdXJjZXM6IFRyYW5zbGF0aW9uUmVzb3VyY2VzID0gdGhpcy5jb25maWcuaTE4bj8ucmVzb3VyY2VzID8/IHt9O1xuICAgIE9iamVjdC5rZXlzKHJlc291cmNlcykuZm9yRWFjaCgobGFuZykgPT4ge1xuICAgICAgT2JqZWN0LmtleXMocmVzb3VyY2VzW2xhbmddKS5mb3JFYWNoKChjaHVua05hbWUpID0+IHtcbiAgICAgICAgdGhpcy5pMThuZXh0LmFkZFJlc291cmNlQnVuZGxlKFxuICAgICAgICAgIGxhbmcsXG4gICAgICAgICAgY2h1bmtOYW1lLFxuICAgICAgICAgIHJlc291cmNlc1tsYW5nXVtjaHVua05hbWVdLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgLyoqXG4gICAqIEVuc3VyZXMgdGhhdCB3aGVuIHRoZSBzaXRlIGNvbnRleHQgbGFuZ3VhZ2UgY2hhbmdlcyxcbiAgICogdGhlIGkxOG5leHQgaW5zdGFuY2UgaXMgdXBkYXRlZCB3aXRoIHRoZSBuZXcgbGFuZ3VhZ2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgc3luY2hyb25pemVMYW5ndWFnZSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbiA9XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA/P1xuICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2VcbiAgICAgICAgLmdldEFjdGl2ZSgpXG4gICAgICAgIC5zdWJzY3JpYmUoKGxhbmcpID0+IHRoaXMuaTE4bmV4dC5jaGFuZ2VMYW5ndWFnZShsYW5nKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbj8udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19