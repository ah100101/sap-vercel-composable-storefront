import * as i0 from '@angular/core';
import { Injectable, APP_INITIALIZER, NgModule } from '@angular/core';
import * as i3 from '@spartacus/core';
import { Config, provideDefaultConfig, SMART_EDIT_DUMMY_COMPONENT_TYPE } from '@spartacus/core';
import * as i2 from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SmartEditConfig {
}
SmartEditConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SmartEditConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
SmartEditConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SmartEditConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SmartEditConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const SMART_EDIT_FEATURE = 'smartEdit';

/**
 * The SmartEditLauncherService is used to check whether Spartacus is launched inside Smart Edit;
 * it also gets cmsTicketId sent from Smart Edit.
 */
class SmartEditLauncherService {
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
SmartEditLauncherService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SmartEditLauncherService, deps: [{ token: SmartEditConfig }, { token: i2.Location }, { token: i3.ScriptLoader }], target: i0.ɵɵFactoryTarget.Injectable });
SmartEditLauncherService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SmartEditLauncherService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SmartEditLauncherService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: SmartEditConfig }, { type: i2.Location }, { type: i3.ScriptLoader }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultSmartEditConfig = {
    smartEdit: {
        storefrontPreviewRoute: 'cx-preview',
        allowOrigin: 'localhost:9002',
    },
};

class CmsTicketInterceptor {
    constructor(service) {
        this.service = service;
    }
    intercept(request, next) {
        if (this.service.cmsTicketId && request.url.includes('/cms/')) {
            request = request.clone({
                setParams: {
                    cmsTicketId: this.service.cmsTicketId,
                },
            });
        }
        return next.handle(request);
    }
}
CmsTicketInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CmsTicketInterceptor, deps: [{ token: SmartEditLauncherService }], target: i0.ɵɵFactoryTarget.Injectable });
CmsTicketInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CmsTicketInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: CmsTicketInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: SmartEditLauncherService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const interceptors = [
    {
        provide: HTTP_INTERCEPTORS,
        useExisting: CmsTicketInterceptor,
        multi: true,
    },
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function smartEditFactory(smartEditLauncherService) {
    const isReady = () => {
        smartEditLauncherService.load();
    };
    return isReady;
}
class SmartEditRootModule {
}
SmartEditRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SmartEditRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SmartEditRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.4", ngImport: i0, type: SmartEditRootModule });
SmartEditRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SmartEditRootModule, providers: [
        ...interceptors,
        provideDefaultConfig(defaultSmartEditConfig),
        {
            provide: APP_INITIALIZER,
            useFactory: smartEditFactory,
            deps: [SmartEditLauncherService],
            multi: true,
        },
        provideDefaultConfig({
            featureModules: {
                [SMART_EDIT_FEATURE]: {
                    cmsComponents: [SMART_EDIT_DUMMY_COMPONENT_TYPE],
                },
            },
        }),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: SmartEditRootModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        ...interceptors,
                        provideDefaultConfig(defaultSmartEditConfig),
                        {
                            provide: APP_INITIALIZER,
                            useFactory: smartEditFactory,
                            deps: [SmartEditLauncherService],
                            multi: true,
                        },
                        provideDefaultConfig({
                            featureModules: {
                                [SMART_EDIT_FEATURE]: {
                                    cmsComponents: [SMART_EDIT_DUMMY_COMPONENT_TYPE],
                                },
                            },
                        }),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CmsTicketInterceptor, SMART_EDIT_FEATURE, SmartEditConfig, SmartEditLauncherService, SmartEditRootModule, smartEditFactory };
//# sourceMappingURL=spartacus-smartedit-root.mjs.map
