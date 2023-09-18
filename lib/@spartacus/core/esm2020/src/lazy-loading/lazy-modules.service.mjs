/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, NgModuleFactory, } from '@angular/core';
import { combineLatest, from, of, queueScheduler, throwError, } from 'rxjs';
import { catchError, concatMap, map, observeOn, publishReplay, switchMap, switchMapTo, tap, } from 'rxjs/operators';
import { CombinedInjector } from '../util/combined-injector';
import { createFrom } from '../util/create-from';
import { ModuleInitializedEvent } from './events/module-initialized-event';
import { MODULE_INITIALIZER } from './tokens';
import * as i0 from "@angular/core";
import * as i1 from "../event/event.service";
/**
 * Utility service for managing dynamic imports of Angular services
 */
export class LazyModulesService {
    constructor(compiler, injector, events) {
        this.compiler = compiler;
        this.injector = injector;
        this.events = events;
        /**
         * Expose lazy loaded module references
         */
        this.modules$ = this.events
            .get(ModuleInitializedEvent)
            .pipe(map((event) => event.moduleRef), publishReplay());
        this.dependencyModules = new Map();
        this.eventSubscription = this.modules$.connect();
    }
    /**
     * Resolves module instance based dynamic import wrapped in an arrow function
     *
     * New module instance will be created with each call.
     *
     * @param moduleFunc
     * @param feature
     */
    resolveModuleInstance(moduleFunc, feature, dependencyModuleRefs = []) {
        let parentInjector;
        if (!dependencyModuleRefs.length) {
            parentInjector = this.injector;
        }
        else if (dependencyModuleRefs.length === 1) {
            parentInjector = dependencyModuleRefs[0].injector;
        }
        else {
            parentInjector = new CombinedInjector(this.injector, dependencyModuleRefs.map((moduleRef) => moduleRef.injector));
        }
        return this.resolveModuleFactory(moduleFunc).pipe(map(([moduleFactory]) => moduleFactory.create(parentInjector)), concatMap((moduleRef) => this.runModuleInitializersForModule(moduleRef)), tap((moduleRef) => this.events.dispatch(createFrom(ModuleInitializedEvent, {
            feature,
            moduleRef,
        }))));
    }
    /**
     * Returns dependency module instance and initializes it when needed.
     *
     * Module will be instantiated only once, at first request for a this specific module class
     */
    resolveDependencyModuleInstance(moduleFunc) {
        // We grab moduleFactory symbol from module function and if there is no
        // such a module created yet, we create it and store it in a
        // dependencyModules map
        return this.resolveModuleFactory(moduleFunc).pipe(map(([moduleFactory, module]) => {
            if (!this.dependencyModules.has(module)) {
                const moduleRef = moduleFactory.create(this.injector);
                this.dependencyModules.set(module, moduleRef);
            }
            return this.dependencyModules.get(module);
        }), concatMap((moduleRef) => this.runModuleInitializersForModule(moduleRef)), tap((moduleRef) => this.events.dispatch(createFrom(ModuleInitializedEvent, {
            moduleRef,
        }))));
    }
    /**
     * The purpose of this function is to run MODULE_INITIALIZER logic that can be provided
     * by a lazy loaded module.  The module is recieved as a function parameter.
     * This function returns an Observable to the module reference passed as an argument.
     *
     * @param {NgModuleRef<any>} moduleRef
     *
     * @returns {Observable<NgModuleRef<any>>}
     */
    runModuleInitializersForModule(moduleRef) {
        const moduleInits = moduleRef.injector.get(MODULE_INITIALIZER, [], { self: true });
        const asyncInitPromises = this.runModuleInitializerFunctions(moduleInits);
        if (asyncInitPromises.length) {
            return from(Promise.all(asyncInitPromises)).pipe(catchError((error) => {
                console.error('MODULE_INITIALIZER promise was rejected while lazy loading a module.', error);
                return throwError(error);
            }), switchMapTo(of(moduleRef)));
        }
        else {
            return of(moduleRef);
        }
    }
    /**
     * This function accepts an array of functions and runs them all. For each function that returns a promise,
     * the resulting promise is stored in an array of promises.  That array of promises is returned.
     * It is not required for the functions to return a Promise.  All functions are run.  The return values
     * that are not a Promise are simply not stored and returned.
     *
     * @param {(() => any)[]} initFunctions An array of functions too be run.
     *
     * @return {Promise<any>[]} An array of Promise returned by the functions, if any,
     */
    runModuleInitializerFunctions(initFunctions) {
        const initPromises = [];
        try {
            if (initFunctions) {
                for (let i = 0; i < initFunctions.length; i++) {
                    const initResult = initFunctions[i]();
                    if (this.isObjectPromise(initResult)) {
                        initPromises.push(initResult);
                    }
                }
            }
            return initPromises;
        }
        catch (error) {
            console.error(`MODULE_INITIALIZER init function throwed an error. `, error);
            throw error;
        }
    }
    /**
     * Determine if the argument is shaped like a Promise
     */
    isObjectPromise(obj) {
        return !!obj && typeof obj.then === 'function';
    }
    /**
     * Resolve any Angular module from an function that return module or moduleFactory
     */
    resolveModuleFactory(moduleFunc) {
        return from(moduleFunc()).pipe(switchMap((module) => module instanceof NgModuleFactory
            ? of([module, module])
            : combineLatest([
                // using compiler here is for jit compatibility, there is no overhead
                // for aot production builds as it will be stubbed
                from(this.compiler.compileModuleAsync(module)),
                of(module),
            ])), observeOn(queueScheduler));
    }
    ngOnDestroy() {
        if (this.eventSubscription) {
            this.eventSubscription.unsubscribe();
        }
        // clean up all initialized dependency modules
        this.dependencyModules.forEach((dependency) => dependency.destroy());
    }
}
LazyModulesService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: LazyModulesService, deps: [{ token: i0.Compiler }, { token: i0.Injector }, { token: i1.EventService }], target: i0.ɵɵFactoryTarget.Injectable });
LazyModulesService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: LazyModulesService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.4", ngImport: i0, type: LazyModulesService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i0.Compiler }, { type: i0.Injector }, { type: i1.EventService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF6eS1tb2R1bGVzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9sYXp5LWxvYWRpbmcvbGF6eS1tb2R1bGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFFTCxVQUFVLEVBRVYsZUFBZSxHQUdoQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsYUFBYSxFQUViLElBQUksRUFFSixFQUFFLEVBQ0YsY0FBYyxFQUVkLFVBQVUsR0FDWCxNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxVQUFVLEVBQ1YsU0FBUyxFQUNULEdBQUcsRUFDSCxTQUFTLEVBQ1QsYUFBYSxFQUNiLFNBQVMsRUFDVCxXQUFXLEVBQ1gsR0FBRyxHQUNKLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7O0FBRTlDOztHQUVHO0FBSUgsTUFBTSxPQUFPLGtCQUFrQjtJQWM3QixZQUNZLFFBQWtCLEVBQ2xCLFFBQWtCLEVBQ2xCLE1BQW9CO1FBRnBCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFjO1FBaEJoQzs7V0FFRztRQUNNLGFBQVEsR0FBaUMsSUFBSSxDQUFDLE1BQU07YUFDMUQsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQzNCLElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMs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LENBQUMsR0FBRyxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksS0FBSyxVQUFVLENBQUM7SUFDakQsQ0FBQztJQUVEOztPQUVHO0lBQ0ssb0JBQW9CLENBQzFCLFVBQThCO1FBRTlCLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUM1QixTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUNuQixNQUFNLFlBQVksZUFBZTtZQUMvQixDQUFDLENBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUE2QztZQUNuRSxDQUFDLENBQUMsYUFBYSxDQUFDO2dCQUNaLHFFQUFxRTtnQkFDckUsa0RBQWtEO2dCQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFhLENBQUMsQ0FBQztnQkFDckQsRUFBRSxDQUFDLE1BQU0sQ0FBQzthQUNYLENBQUMsQ0FDUCxFQUNELFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FDMUIsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RDO1FBRUQsOENBQThDO1FBQzlDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7OytHQXRNVSxrQkFBa0I7bUhBQWxCLGtCQUFrQixjQUZqQixNQUFNOzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDb21waWxlcixcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIE5nTW9kdWxlRmFjdG9yeSxcbiAgTmdNb2R1bGVSZWYsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBjb21iaW5lTGF0ZXN0LFxuICBDb25uZWN0YWJsZU9ic2VydmFibGUsXG4gIGZyb20sXG4gIE9ic2VydmFibGUsXG4gIG9mLFxuICBxdWV1ZVNjaGVkdWxlcixcbiAgU3Vic2NyaXB0aW9uLFxuICB0aHJvd0Vycm9yLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGNhdGNoRXJyb3IsXG4gIGNvbmNhdE1hcCxcbiAgbWFwLFxuICBvYnNlcnZlT24sXG4gIHB1Ymxpc2hSZXBsYXksXG4gIHN3aXRjaE1hcCxcbiAgc3dpdGNoTWFwVG8sXG4gIHRhcCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRXZlbnRTZXJ2aWNlIH0gZnJvbSAnLi4vZXZlbnQvZXZlbnQuc2VydmljZSc7XG5pbXBvcnQgeyBDb21iaW5lZEluamVjdG9yIH0gZnJvbSAnLi4vdXRpbC9jb21iaW5lZC1pbmplY3Rvcic7XG5pbXBvcnQgeyBjcmVhdGVGcm9tIH0gZnJvbSAnLi4vdXRpbC9jcmVhdGUtZnJvbSc7XG5pbXBvcnQgeyBNb2R1bGVJbml0aWFsaXplZEV2ZW50IH0gZnJvbSAnLi9ldmVudHMvbW9kdWxlLWluaXRpYWxpemVkLWV2ZW50JztcbmltcG9ydCB7IE1PRFVMRV9JTklUSUFMSVpFUiB9IGZyb20gJy4vdG9rZW5zJztcblxuLyoqXG4gKiBVdGlsaXR5IHNlcnZpY2UgZm9yIG1hbmFnaW5nIGR5bmFtaWMgaW1wb3J0cyBvZiBBbmd1bGFyIHNlcnZpY2VzXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBMYXp5TW9kdWxlc1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogRXhwb3NlIGxhenkgbG9hZGVkIG1vZHVsZSByZWZlcmVuY2VzXG4gICAqL1xuICByZWFkb25seSBtb2R1bGVzJDogT2JzZXJ2YWJsZTxOZ01vZHVsZVJlZjxhbnk+PiA9IHRoaXMuZXZlbnRzXG4gICAgLmdldChNb2R1bGVJbml0aWFsaXplZEV2ZW50KVxuICAgIC5waXBlKFxuICAgICAgbWFwKChldmVudCkgPT4gZXZlbnQubW9kdWxlUmVmKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoKVxuICAgICk7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBkZXBlbmRlbmN5TW9kdWxlcyA9IG5ldyBNYXA8YW55LCBOZ01vZHVsZVJlZjxhbnk+PigpO1xuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbXBpbGVyOiBDb21waWxlcixcbiAgICBwcm90ZWN0ZWQgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByb3RlY3RlZCBldmVudHM6IEV2ZW50U2VydmljZVxuICApIHtcbiAgICB0aGlzLmV2ZW50U3Vic2NyaXB0aW9uID0gKFxuICAgICAgdGhpcy5tb2R1bGVzJCBhcyBDb25uZWN0YWJsZU9ic2VydmFibGU8TmdNb2R1bGVSZWY8YW55Pj5cbiAgICApLmNvbm5lY3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNvbHZlcyBtb2R1bGUgaW5zdGFuY2UgYmFzZWQgZHluYW1pYyBpbXBvcnQgd3JhcHBlZCBpbiBhbiBhcnJvdyBmdW5jdGlvblxuICAgKlxuICAgKiBOZXcgbW9kdWxlIGluc3RhbmNlIHdpbGwgYmUgY3JlYXRlZCB3aXRoIGVhY2ggY2FsbC5cbiAgICpcbiAgICogQHBhcmFtIG1vZHVsZUZ1bmNcbiAgICogQHBhcmFtIGZlYXR1cmVcbiAgICovXG4gIHB1YmxpYyByZXNvbHZlTW9kdWxlSW5zdGFuY2UoXG4gICAgbW9kdWxlRnVuYzogKCkgPT4gUHJvbWlzZTxhbnk+LFxuICAgIGZlYXR1cmU/OiBzdHJpbmcsXG4gICAgZGVwZW5kZW5jeU1vZHVsZVJlZnM6IE5nTW9kdWxlUmVmPGFueT5bXSA9IFtdXG4gICk6IE9ic2VydmFibGU8TmdNb2R1bGVSZWY8YW55Pj4ge1xuICAgIGxldCBwYXJlbnRJbmplY3RvcjogSW5qZWN0b3I7XG5cbiAgICBpZiAoIWRlcGVuZGVuY3lNb2R1bGVSZWZzLmxlbmd0aCkge1xuICAgICAgcGFyZW50SW5qZWN0b3IgPSB0aGlzLmluamVjdG9yO1xuICAgIH0gZWxzZSBpZiAoZGVwZW5kZW5jeU1vZHVsZVJlZnMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwYXJlbnRJbmplY3RvciA9IGRlcGVuZGVuY3lNb2R1bGVSZWZzWzBdLmluamVjdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJlbnRJbmplY3RvciA9IG5ldyBDb21iaW5lZEluamVjdG9yKFxuICAgICAgICB0aGlzLmluamVjdG9yLFxuICAgICAgICBkZXBlbmRlbmN5TW9kdWxlUmVmcy5tYXAoKG1vZHVsZVJlZikgPT4gbW9kdWxlUmVmLmluamVjdG9yKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZXNvbHZlTW9kdWxlRmFjdG9yeShtb2R1bGVGdW5jKS5waXBlKFxuICAgICAgbWFwKChbbW9kdWxlRmFjdG9yeV0pID0+IG1vZHVsZUZhY3RvcnkuY3JlYXRlKHBhcmVudEluamVjdG9yKSksXG4gICAgICBjb25jYXRNYXAoKG1vZHVsZVJlZikgPT4gdGhpcy5ydW5Nb2R1bGVJbml0aWFsaXplcnNGb3JNb2R1bGUobW9kdWxlUmVmKSksXG4gICAgICB0YXAoKG1vZHVsZVJlZikgPT5cbiAgICAgICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goXG4gICAgICAgICAgY3JlYXRlRnJvbShNb2R1bGVJbml0aWFsaXplZEV2ZW50LCB7XG4gICAgICAgICAgICBmZWF0dXJlLFxuICAgICAgICAgICAgbW9kdWxlUmVmLFxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgZGVwZW5kZW5jeSBtb2R1bGUgaW5zdGFuY2UgYW5kIGluaXRpYWxpemVzIGl0IHdoZW4gbmVlZGVkLlxuICAgKlxuICAgKiBNb2R1bGUgd2lsbCBiZSBpbnN0YW50aWF0ZWQgb25seSBvbmNlLCBhdCBmaXJzdCByZXF1ZXN0IGZvciBhIHRoaXMgc3BlY2lmaWMgbW9kdWxlIGNsYXNzXG4gICAqL1xuICBwdWJsaWMgcmVzb2x2ZURlcGVuZGVuY3lNb2R1bGVJbnN0YW5jZShcbiAgICBtb2R1bGVGdW5jOiAoKSA9PiBQcm9taXNlPGFueT5cbiAgKTogT2JzZXJ2YWJsZTxOZ01vZHVsZVJlZjxhbnk+PiB7XG4gICAgLy8gV2UgZ3JhYiBtb2R1bGVGYWN0b3J5IHN5bWJvbCBmcm9tIG1vZHVsZSBmdW5jdGlvbiBhbmQgaWYgdGhlcmUgaXMgbm9cbiAgICAvLyBzdWNoIGEgbW9kdWxlIGNyZWF0ZWQgeWV0LCB3ZSBjcmVhdGUgaXQgYW5kIHN0b3JlIGl0IGluIGFcbiAgICAvLyBkZXBlbmRlbmN5TW9kdWxlcyBtYXBcbiAgICByZXR1cm4gdGhpcy5yZXNvbHZlTW9kdWxlRmFjdG9yeShtb2R1bGVGdW5jKS5waXBlKFxuICAgICAgbWFwKChbbW9kdWxlRmFjdG9yeSwgbW9kdWxlXSkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuZGVwZW5kZW5jeU1vZHVsZXMuaGFzKG1vZHVsZSkpIHtcbiAgICAgICAgICBjb25zdCBtb2R1bGVSZWYgPSBtb2R1bGVGYWN0b3J5LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcbiAgICAgICAgICB0aGlzLmRlcGVuZGVuY3lNb2R1bGVzLnNldChtb2R1bGUsIG1vZHVsZVJlZik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5kZXBlbmRlbmN5TW9kdWxlcy5nZXQobW9kdWxlKSBhcyBOZ01vZHVsZVJlZjxhbnk+O1xuICAgICAgfSksXG4gICAgICBjb25jYXRNYXAoKG1vZHVsZVJlZikgPT4gdGhpcy5ydW5Nb2R1bGVJbml0aWFsaXplcnNGb3JNb2R1bGUobW9kdWxlUmVmKSksXG4gICAgICB0YXAoKG1vZHVsZVJlZikgPT5cbiAgICAgICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goXG4gICAgICAgICAgY3JlYXRlRnJvbShNb2R1bGVJbml0aWFsaXplZEV2ZW50LCB7XG4gICAgICAgICAgICBtb2R1bGVSZWYsXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHB1cnBvc2Ugb2YgdGhpcyBmdW5jdGlvbiBpcyB0byBydW4gTU9EVUxFX0lOSVRJQUxJWkVSIGxvZ2ljIHRoYXQgY2FuIGJlIHByb3ZpZGVkXG4gICAqIGJ5IGEgbGF6eSBsb2FkZWQgbW9kdWxlLiAgVGhlIG1vZHVsZSBpcyByZWNpZXZlZCBhcyBhIGZ1bmN0aW9uIHBhcmFtZXRlci5cbiAgICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGFuIE9ic2VydmFibGUgdG8gdGhlIG1vZHVsZSByZWZlcmVuY2UgcGFzc2VkIGFzIGFuIGFyZ3VtZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge05nTW9kdWxlUmVmPGFueT59IG1vZHVsZVJlZlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxOZ01vZHVsZVJlZjxhbnk+Pn1cbiAgICovXG4gIHB1YmxpYyBydW5Nb2R1bGVJbml0aWFsaXplcnNGb3JNb2R1bGUoXG4gICAgbW9kdWxlUmVmOiBOZ01vZHVsZVJlZjxhbnk+XG4gICk6IE9ic2VydmFibGU8TmdNb2R1bGVSZWY8YW55Pj4ge1xuICAgIGNvbnN0IG1vZHVsZUluaXRzOiBhbnlbXSA9IG1vZHVsZVJlZi5pbmplY3Rvci5nZXQ8YW55W10+KFxuICAgICAgTU9EVUxFX0lOSVRJQUxJWkVSLFxuICAgICAgW10sXG4gICAgICB7IHNlbGY6IHRydWUgfVxuICAgICk7XG4gICAgY29uc3QgYXN5bmNJbml0UHJvbWlzZXM6IFByb21pc2U8YW55PltdID1cbiAgICAgIHRoaXMucnVuTW9kdWxlSW5pdGlhbGl6ZXJGdW5jdGlvbnMobW9kdWxlSW5pdHMpO1xuICAgIGlmIChhc3luY0luaXRQcm9taXNlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmcm9tKFByb21pc2UuYWxsKGFzeW5jSW5pdFByb21pc2VzKSkucGlwZShcbiAgICAgICAgY2F0Y2hFcnJvcigoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgJ01PRFVMRV9JTklUSUFMSVpFUiBwcm9taXNlIHdhcyByZWplY3RlZCB3aGlsZSBsYXp5IGxvYWRpbmcgYSBtb2R1bGUuJyxcbiAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihlcnJvcik7XG4gICAgICAgIH0pLFxuICAgICAgICBzd2l0Y2hNYXBUbyhvZihtb2R1bGVSZWYpKVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9mKG1vZHVsZVJlZik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbiBhcnJheSBvZiBmdW5jdGlvbnMgYW5kIHJ1bnMgdGhlbSBhbGwuIEZvciBlYWNoIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHByb21pc2UsXG4gICAqIHRoZSByZXN1bHRpbmcgcHJvbWlzZSBpcyBzdG9yZWQgaW4gYW4gYXJyYXkgb2YgcHJvbWlzZXMuICBUaGF0IGFycmF5IG9mIHByb21pc2VzIGlzIHJldHVybmVkLlxuICAgKiBJdCBpcyBub3QgcmVxdWlyZWQgZm9yIHRoZSBmdW5jdGlvbnMgdG8gcmV0dXJuIGEgUHJvbWlzZS4gIEFsbCBmdW5jdGlvbnMgYXJlIHJ1bi4gIFRoZSByZXR1cm4gdmFsdWVzXG4gICAqIHRoYXQgYXJlIG5vdCBhIFByb21pc2UgYXJlIHNpbXBseSBub3Qgc3RvcmVkIGFuZCByZXR1cm5lZC5cbiAgICpcbiAgICogQHBhcmFtIHsoKCkgPT4gYW55KVtdfSBpbml0RnVuY3Rpb25zIEFuIGFycmF5IG9mIGZ1bmN0aW9ucyB0b28gYmUgcnVuLlxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlPGFueT5bXX0gQW4gYXJyYXkgb2YgUHJvbWlzZSByZXR1cm5lZCBieSB0aGUgZnVuY3Rpb25zLCBpZiBhbnksXG4gICAqL1xuICBwdWJsaWMgcnVuTW9kdWxlSW5pdGlhbGl6ZXJGdW5jdGlvbnMoXG4gICAgaW5pdEZ1bmN0aW9uczogKCgpID0+IGFueSlbXVxuICApOiBQcm9taXNlPGFueT5bXSB7XG4gICAgY29uc3QgaW5pdFByb21pc2VzOiBQcm9taXNlPGFueT5bXSA9IFtdO1xuICAgIHRyeSB7XG4gICAgICBpZiAoaW5pdEZ1bmN0aW9ucykge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluaXRGdW5jdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBpbml0UmVzdWx0ID0gaW5pdEZ1bmN0aW9uc1tpXSgpO1xuICAgICAgICAgIGlmICh0aGlzLmlzT2JqZWN0UHJvbWlzZShpbml0UmVzdWx0KSkge1xuICAgICAgICAgICAgaW5pdFByb21pc2VzLnB1c2goaW5pdFJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5pdFByb21pc2VzO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICBgTU9EVUxFX0lOSVRJQUxJWkVSIGluaXQgZnVuY3Rpb24gdGhyb3dlZCBhbiBlcnJvci4gYCxcbiAgICAgICAgZXJyb3JcbiAgICAgICk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIGlmIHRoZSBhcmd1bWVudCBpcyBzaGFwZWQgbGlrZSBhIFByb21pc2VcbiAgICovXG4gIHByaXZhdGUgaXNPYmplY3RQcm9taXNlPFQgPSBhbnk+KG9iajogYW55KTogb2JqIGlzIFByb21pc2U8VD4ge1xuICAgIHJldHVybiAhIW9iaiAmJiB0eXBlb2Ygb2JqLnRoZW4gPT09ICdmdW5jdGlvbic7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZSBhbnkgQW5ndWxhciBtb2R1bGUgZnJvbSBhbiBmdW5jdGlvbiB0aGF0IHJldHVybiBtb2R1bGUgb3IgbW9kdWxlRmFjdG9yeVxuICAgKi9cbiAgcHJpdmF0ZSByZXNvbHZlTW9kdWxlRmFjdG9yeShcbiAgICBtb2R1bGVGdW5jOiAoKSA9PiBQcm9taXNlPGFueT5cbiAgKTogT2JzZXJ2YWJsZTxbTmdNb2R1bGVGYWN0b3J5PGFueT4sIGFueV0+IHtcbiAgICByZXR1cm4gZnJvbShtb2R1bGVGdW5jKCkpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKG1vZHVsZSkgPT5cbiAgICAgICAgbW9kdWxlIGluc3RhbmNlb2YgTmdNb2R1bGVGYWN0b3J5XG4gICAgICAgICAgPyAob2YoW21vZHVsZSwgbW9kdWxlXSkgYXMgT2JzZXJ2YWJsZTxbTmdNb2R1bGVGYWN0b3J5PGFueT4sIGFueV0+KVxuICAgICAgICAgIDogY29tYmluZUxhdGVzdChbXG4gICAgICAgICAgICAgIC8vIHVzaW5nIGNvbXBpbGVyIGhlcmUgaXMgZm9yIGppdCBjb21wYXRpYmlsaXR5LCB0aGVyZSBpcyBubyBvdmVyaGVhZFxuICAgICAgICAgICAgICAvLyBmb3IgYW90IHByb2R1Y3Rpb24gYnVpbGRzIGFzIGl0IHdpbGwgYmUgc3R1YmJlZFxuICAgICAgICAgICAgICBmcm9tKHRoaXMuY29tcGlsZXIuY29tcGlsZU1vZHVsZUFzeW5jKG1vZHVsZSBhcyBhbnkpKSxcbiAgICAgICAgICAgICAgb2YobW9kdWxlKSxcbiAgICAgICAgICAgIF0pXG4gICAgICApLFxuICAgICAgb2JzZXJ2ZU9uKHF1ZXVlU2NoZWR1bGVyKVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ldmVudFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5ldmVudFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIC8vIGNsZWFuIHVwIGFsbCBpbml0aWFsaXplZCBkZXBlbmRlbmN5IG1vZHVsZXNcbiAgICB0aGlzLmRlcGVuZGVuY3lNb2R1bGVzLmZvckVhY2goKGRlcGVuZGVuY3kpID0+IGRlcGVuZGVuY3kuZGVzdHJveSgpKTtcbiAgfVxufVxuIl19