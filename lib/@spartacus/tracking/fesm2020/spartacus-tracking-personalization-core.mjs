import * as i0 from '@angular/core';
import { NgModule, isDevMode, Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as i1 from '@spartacus/tracking/personalization/root';
import * as i2 from '@spartacus/core';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PersonalizationCoreModule {
}
PersonalizationCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: PersonalizationCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PersonalizationCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: PersonalizationCoreModule });
PersonalizationCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: PersonalizationCoreModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: PersonalizationCoreModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PersonalizationContextService {
    constructor(config, cmsService) {
        this.config = config;
        this.cmsService = cmsService;
    }
    getPersonalizationContext() {
        if (!this.config.personalization?.context) {
            if (isDevMode()) {
                console.warn(`There is no context configured in Personalization.`);
            }
            return EMPTY;
        }
        else {
            const context = this.config.personalization.context;
            return this.cmsService.getCurrentPage().pipe(filter(Boolean), map((page) => page.slots?.[context.slotPosition]), filter(Boolean), map((slot) => {
                const scriptComponent = slot.components?.find((i) => i.uid === context.componentId);
                return this.buildPersonalizationContext(scriptComponent?.properties?.script?.data);
            }));
        }
    }
    buildPersonalizationContext(data) {
        if (data) {
            const context = JSON.parse(atob(data));
            context.actions.forEach((action) => {
                Object.keys(action).forEach((key) => {
                    action[key] = atob(action[key]);
                });
            });
            for (let i = 0; i < context.segments.length; i++) {
                context.segments[i] = atob(context.segments[i]);
            }
            return context;
        }
    }
}
PersonalizationContextService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: PersonalizationContextService, deps: [{ token: i1.PersonalizationConfig }, { token: i2.CmsService }], target: i0.ɵɵFactoryTarget.Injectable });
PersonalizationContextService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: PersonalizationContextService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: PersonalizationContextService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.PersonalizationConfig }, { type: i2.CmsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { PersonalizationContextService, PersonalizationCoreModule };
//# sourceMappingURL=spartacus-tracking-personalization-core.mjs.map
