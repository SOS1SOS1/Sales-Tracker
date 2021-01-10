/**
 * @fileoverview added by tsickle
 * Generated from: analytics.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ComponentFactoryResolver, Inject, Injectable, Injector, NgModuleFactory, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { filter, groupBy, map, mergeMap, observeOn, pairwise, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ActivationEnd, NavigationEnd, Router, ROUTES } from '@angular/router';
import { ɵAngularFireSchedulers } from '@angular/fire';
import { AngularFireAnalytics, DEBUG_MODE } from './analytics';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
/** @type {?} */
const FIREBASE_EVENT_ORIGIN_KEY = 'firebase_event_origin';
/** @type {?} */
const FIREBASE_PREVIOUS_SCREEN_CLASS_KEY = 'firebase_previous_class';
/** @type {?} */
const FIREBASE_PREVIOUS_SCREEN_INSTANCE_ID_KEY = 'firebase_previous_id';
/** @type {?} */
const FIREBASE_PREVIOUS_SCREEN_NAME_KEY = 'firebase_previous_screen';
/** @type {?} */
const FIREBASE_SCREEN_CLASS_KEY = 'firebase_screen_class';
/** @type {?} */
const FIREBASE_SCREEN_INSTANCE_ID_KEY = 'firebase_screen_id';
/** @type {?} */
const FIREBASE_SCREEN_NAME_KEY = 'firebase_screen';
/** @type {?} */
const OUTLET_KEY = 'outlet';
/** @type {?} */
const PAGE_PATH_KEY = 'page_path';
/** @type {?} */
const PAGE_TITLE_KEY = 'page_title';
/** @type {?} */
const SCREEN_CLASS_KEY = 'screen_class';
/** @type {?} */
const SCREEN_NAME_KEY = 'screen_name';
/** @type {?} */
const SCREEN_VIEW_EVENT = 'screen_view';
/** @type {?} */
const EVENT_ORIGIN_AUTO = 'auto';
/** @type {?} */
const DEFAULT_SCREEN_CLASS = '???';
/** @type {?} */
const NG_PRIMARY_OUTLET = 'primary';
/** @type {?} */
const SCREEN_INSTANCE_DELIMITER = '#';
/** @type {?} */
const ANNOTATIONS = '__annotations__';
// this is an INT64 in iOS/Android but use INT32 cause javascript
/** @type {?} */
let nextScreenInstanceID = Math.floor(Math.random() * (Math.pow(2, 32) - 1)) - Math.pow(2, 31);
/** @type {?} */
const knownScreenInstanceIDs = {};
/** @type {?} */
const getScreenInstanceID = (/**
 * @param {?} params
 * @return {?}
 */
(params) => {
    // unique the screen class against the outlet name
    /** @type {?} */
    const screenInstanceKey = [
        params[SCREEN_CLASS_KEY],
        params[OUTLET_KEY]
    ].join(SCREEN_INSTANCE_DELIMITER);
    if (knownScreenInstanceIDs.hasOwnProperty(screenInstanceKey)) {
        return knownScreenInstanceIDs[screenInstanceKey];
    }
    else {
        /** @type {?} */
        const ret = nextScreenInstanceID++;
        knownScreenInstanceIDs[screenInstanceKey] = ret;
        return ret;
    }
});
const ɵ0 = getScreenInstanceID;
export class ScreenTrackingService {
    /**
     * @param {?} analytics
     * @param {?} router
     * @param {?} title
     * @param {?} componentFactoryResolver
     * @param {?} platformId
     * @param {?} debugModeEnabled
     * @param {?} zone
     * @param {?} injector
     */
    constructor(analytics, router, title, componentFactoryResolver, 
    // tslint:disable-next-line:ban-types
    platformId, debugModeEnabled, zone, injector) {
        if (!router || !isPlatformBrowser(platformId)) {
            return this;
        }
        zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const activationEndEvents = router.events.pipe(filter((/**
             * @param {?} e
             * @return {?}
             */
            e => e instanceof ActivationEnd)));
            /** @type {?} */
            const navigationEndEvents = router.events.pipe(filter((/**
             * @param {?} e
             * @return {?}
             */
            e => e instanceof NavigationEnd)));
            this.disposable = navigationEndEvents.pipe(withLatestFrom(activationEndEvents), switchMap((/**
             * @param {?} __0
             * @return {?}
             */
            ([navigationEnd, activationEnd]) => {
                // SEMVER: start using optional chains and nullish coalescing once we support newer typescript
                /** @type {?} */
                const pagePath = navigationEnd.url;
                /** @type {?} */
                const screenName = activationEnd.snapshot.routeConfig && activationEnd.snapshot.routeConfig.path || pagePath;
                /** @type {?} */
                const params = {
                    [SCREEN_NAME_KEY]: screenName,
                    [PAGE_PATH_KEY]: pagePath,
                    [FIREBASE_EVENT_ORIGIN_KEY]: EVENT_ORIGIN_AUTO,
                    [FIREBASE_SCREEN_NAME_KEY]: screenName,
                    [OUTLET_KEY]: activationEnd.snapshot.outlet
                };
                if (title) {
                    params[PAGE_TITLE_KEY] = title.getTitle();
                }
                /** @type {?} */
                const component = activationEnd.snapshot.component;
                /** @type {?} */
                const routeConfig = activationEnd.snapshot.routeConfig;
                /** @type {?} */
                const loadChildren = routeConfig && routeConfig.loadChildren;
                // TODO figure out how to handle minification
                if (typeof loadChildren === 'string') {
                    // SEMVER: this is the older lazy load style "./path#ClassName", drop this when we drop old ng
                    // TODO is it worth seeing if I can look up the component factory selector from the module name?
                    // it's lazy so it's not registered with componentFactoryResolver yet... seems a pain for a depreciated style
                    return of(Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: loadChildren.split('#')[1] }));
                }
                else if (typeof component === 'string') {
                    return of(Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: component }));
                }
                else if (component) {
                    /** @type {?} */
                    const componentFactory = componentFactoryResolver.resolveComponentFactory(component);
                    return of(Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: componentFactory.selector }));
                }
                else if (loadChildren) {
                    /** @type {?} */
                    const loadedChildren = loadChildren();
                    /** @type {?} */
                    const loadedChildren$ = (loadedChildren instanceof Observable) ?
                        loadedChildren :
                        from(Promise.resolve(loadedChildren));
                    return loadedChildren$.pipe(map((/**
                     * @param {?} lazyModule
                     * @return {?}
                     */
                    lazyModule => {
                        if (lazyModule instanceof NgModuleFactory) {
                            // AOT create an injector
                            /** @type {?} */
                            const moduleRef = lazyModule.create(injector);
                            // INVESTIGATE is this the right way to get at the matching route?
                            /** @type {?} */
                            const routes = moduleRef.injector.get(ROUTES);
                            /** @type {?} */
                            const component = routes[0][0].component;
                            try {
                                /** @type {?} */
                                const componentFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(component);
                                return Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: componentFactory.selector });
                            }
                            catch (_) {
                                return Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: DEFAULT_SCREEN_CLASS });
                            }
                        }
                        else {
                            // JIT look at the annotations
                            // INVESTIGATE are there public APIs for this stuff?
                            /** @type {?} */
                            const declarations = [].concat.apply([], (lazyModule[ANNOTATIONS] || []).map((/**
                             * @param {?} f
                             * @return {?}
                             */
                            (f) => f.declarations)));
                            /** @type {?} */
                            const selectors = [].concat.apply([], declarations.map((/**
                             * @param {?} c
                             * @return {?}
                             */
                            (c) => (c[ANNOTATIONS] || []).map((/**
                             * @param {?} f
                             * @return {?}
                             */
                            (f) => f.selector)))));
                            // should I just be grabbing the selector like this or should i match against the route component?
                            //   const routerModule = lazyModule.ngInjectorDef.imports.find(i => i.ngModule && ....);
                            //   const route = routerModule.providers[0].find(p => p.provide == ROUTES).useValue[0];
                            return Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: selectors[0] || DEFAULT_SCREEN_CLASS });
                        }
                    })));
                }
                else {
                    return of(Object.assign(Object.assign({}, params), { [SCREEN_CLASS_KEY]: DEFAULT_SCREEN_CLASS }));
                }
            })), map((/**
             * @param {?} params
             * @return {?}
             */
            params => (Object.assign({ [FIREBASE_SCREEN_CLASS_KEY]: params[SCREEN_CLASS_KEY], [FIREBASE_SCREEN_INSTANCE_ID_KEY]: getScreenInstanceID(params) }, params)))), tap((/**
             * @param {?} params
             * @return {?}
             */
            params => {
                // TODO perhaps I can be smarter about this, bubble events up to the nearest outlet?
                if (params[OUTLET_KEY] === NG_PRIMARY_OUTLET) {
                    analytics.setCurrentScreen(params[SCREEN_NAME_KEY]);
                    analytics.updateConfig({
                        [PAGE_PATH_KEY]: params[PAGE_PATH_KEY],
                        [SCREEN_CLASS_KEY]: params[SCREEN_CLASS_KEY]
                    });
                    if (title) {
                        analytics.updateConfig({ [PAGE_TITLE_KEY]: params[PAGE_TITLE_KEY] });
                    }
                }
            })), groupBy((/**
             * @param {?} params
             * @return {?}
             */
            params => params[OUTLET_KEY])), 
            // tslint:disable-next-line
            mergeMap((/**
             * @param {?} group
             * @return {?}
             */
            group => group.pipe(startWith(undefined), pairwise()))), map((/**
             * @param {?} __0
             * @return {?}
             */
            ([prior, current]) => prior ? Object.assign({ [FIREBASE_PREVIOUS_SCREEN_CLASS_KEY]: prior[SCREEN_CLASS_KEY], [FIREBASE_PREVIOUS_SCREEN_NAME_KEY]: prior[SCREEN_NAME_KEY], [FIREBASE_PREVIOUS_SCREEN_INSTANCE_ID_KEY]: prior[FIREBASE_SCREEN_INSTANCE_ID_KEY] }, current) : current)), 
            // tslint:disable-next-line:no-console
            tap((/**
             * @param {?} params
             * @return {?}
             */
            params => debugModeEnabled && console.info(SCREEN_VIEW_EVENT, params))), tap((/**
             * @param {?} params
             * @return {?}
             */
            params => zone.runOutsideAngular((/**
             * @return {?}
             */
            () => analytics.logEvent(SCREEN_VIEW_EVENT, params)))))).subscribe();
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.disposable) {
            this.disposable.unsubscribe();
        }
    }
}
ScreenTrackingService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ScreenTrackingService.ctorParameters = () => [
    { type: AngularFireAnalytics },
    { type: Router, decorators: [{ type: Optional }] },
    { type: Title, decorators: [{ type: Optional }] },
    { type: ComponentFactoryResolver },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DEBUG_MODE,] }] },
    { type: NgZone },
    { type: Injector }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    ScreenTrackingService.prototype.disposable;
}
export class UserTrackingService {
    // TODO a user properties injector
    /**
     * @param {?} analytics
     * @param {?} zone
     * @param {?} platformId
     */
    constructor(analytics, zone, 
    // tslint:disable-next-line:ban-types
    platformId) {
        /** @type {?} */
        const schedulers = new ɵAngularFireSchedulers(zone);
        if (!isPlatformServer(platformId)) {
            zone.runOutsideAngular((/**
             * @return {?}
             */
            () => {
                // @ts-ignore zap the import in the UMD
                this.disposable = from(import('firebase/auth')).pipe(observeOn(schedulers.outsideAngular), switchMap((/**
                 * @return {?}
                 */
                () => analytics.app)), map((/**
                 * @param {?} app
                 * @return {?}
                 */
                app => app.auth())), switchMap((/**
                 * @param {?} auth
                 * @return {?}
                 */
                auth => new Observable(auth.onAuthStateChanged.bind(auth)))), switchMap((/**
                 * @param {?} user
                 * @return {?}
                 */
                user => analytics.setUserId(user ? user.uid : null)))).subscribe();
            }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.disposable) {
            this.disposable.unsubscribe();
        }
    }
}
UserTrackingService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
UserTrackingService.ctorParameters = () => [
    { type: AngularFireAnalytics },
    { type: NgZone },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    UserTrackingService.prototype.disposable;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHl0aWNzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL3dvcmtzcGFjZS9zcmMvYW5hbHl0aWNzLyIsInNvdXJjZXMiOlsiYW5hbHl0aWNzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQ0wsd0JBQXdCLEVBQ3hCLE1BQU0sRUFDTixVQUFVLEVBQ1YsUUFBUSxFQUNSLGVBQWUsRUFDZixNQUFNLEVBRU4sUUFBUSxFQUNSLFdBQVcsRUFDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoSSxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFL0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztNQUVoRSx5QkFBeUIsR0FBRyx1QkFBdUI7O01BQ25ELGtDQUFrQyxHQUFHLHlCQUF5Qjs7TUFDOUQsd0NBQXdDLEdBQUcsc0JBQXNCOztNQUNqRSxpQ0FBaUMsR0FBRywwQkFBMEI7O01BQzlELHlCQUF5QixHQUFHLHVCQUF1Qjs7TUFDbkQsK0JBQStCLEdBQUcsb0JBQW9COztNQUN0RCx3QkFBd0IsR0FBRyxp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LE1BQU0sdUJBQXRDLE1BQU0sU0FBQyxXQUFXOzs7Ozs7O0lBUHJCLHlDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgTmdNb2R1bGVGYWN0b3J5LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFBMQVRGT1JNX0lEXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbSwgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBncm91cEJ5LCBtYXAsIG1lcmdlTWFwLCBvYnNlcnZlT24sIHBhaXJ3aXNlLCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFwLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFjdGl2YXRpb25FbmQsIE5hdmlnYXRpb25FbmQsIFJvdXRlciwgUk9VVEVTIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZUFuYWx5dGljcywgREVCVUdfTU9ERSB9IGZyb20gJy4vYW5hbHl0aWNzJztcbmltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuaW1wb3J0IHsgVGl0bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7IGlzUGxhdGZvcm1Ccm93c2VyLCBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuY29uc3QgRklSRUJBU0VfRVZFTlRfT1JJR0lOX0tFWSA9ICdmaXJlYmFzZV9ldmVudF9vcmlnaW4nO1xuY29uc3QgRklSRUJBU0VfUFJFVklPVVNfU0NSRUVOX0NMQVNTX0tFWSA9ICdmaXJlYmFzZV9wcmV2aW91c19jbGFzcyc7XG5jb25zdCBGSVJFQkFTRV9QUkVWSU9VU19TQ1JFRU5fSU5TVEFOQ0VfSURfS0VZID0gJ2ZpcmViYXNlX3ByZXZpb3VzX2lkJztcbmNvbnN0IEZJUkVCQVNFX1BSRVZJT1VTX1NDUkVFTl9OQU1FX0tFWSA9ICdmaXJlYmFzZV9wcmV2aW91c19zY3JlZW4nO1xuY29uc3QgRklSRUJBU0VfU0NSRUVOX0NMQVNTX0tFWSA9ICdmaXJlYmFzZV9zY3JlZW5fY2xhc3MnO1xuY29uc3QgRklSRUJBU0VfU0NSRUVOX0lOU1RBTkNFX0lEX0tFWSA9ICdmaXJlYmFzZV9zY3JlZW5faWQnO1xuY29uc3QgRklSRUJBU0VfU0NSRUVOX05BTUVfS0VZID0gJ2ZpcmViYXNlX3NjcmVlbic7XG5jb25zdCBPVVRMRVRfS0VZID0gJ291dGxldCc7XG5jb25zdCBQQUdFX1BBVEhfS0VZID0gJ3BhZ2VfcGF0aCc7XG5jb25zdCBQQUdFX1RJVExFX0tFWSA9ICdwYWdlX3RpdGxlJztcbmNvbnN0IFNDUkVFTl9DTEFTU19LRVkgPSAnc2NyZWVuX2NsYXNzJztcbmNvbnN0IFNDUkVFTl9OQU1FX0tFWSA9ICdzY3JlZW5fbmFtZSc7XG5cbmNvbnN0IFNDUkVFTl9WSUVXX0VWRU5UID0gJ3NjcmVlbl92aWV3JztcbmNvbnN0IEVWRU5UX09SSUdJTl9BVVRPID0gJ2F1dG8nO1xuY29uc3QgREVGQVVMVF9TQ1JFRU5fQ0xBU1MgPSAnPz8/JztcbmNvbnN0IE5HX1BSSU1BUllfT1VUTEVUID0gJ3ByaW1hcnknO1xuY29uc3QgU0NSRUVOX0lOU1RBTkNFX0RFTElNSVRFUiA9ICcjJztcblxuY29uc3QgQU5OT1RBVElPTlMgPSAnX19hbm5vdGF0aW9uc19fJztcblxuXG4vLyB0aGlzIGlzIGFuIElOVDY0IGluIGlPUy9BbmRyb2lkIGJ1dCB1c2UgSU5UMzIgY2F1c2UgamF2YXNjcmlwdFxubGV0IG5leHRTY3JlZW5JbnN0YW5jZUlEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDIgKiogMzIgLSAxKSkgLSAyICoqIDMxO1xuXG5jb25zdCBrbm93blNjcmVlbkluc3RhbmNlSURzOiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9ID0ge307XG5cbmNvbnN0IGdldFNjcmVlbkluc3RhbmNlSUQgPSAocGFyYW1zOiB7IFtrZXk6IHN0cmluZ106IGFueSB9KSA9PiB7XG4gIC8vIHVuaXF1ZSB0aGUgc2NyZWVuIGNsYXNzIGFnYWluc3QgdGhlIG91dGxldCBuYW1lXG4gIGNvbnN0IHNjcmVlbkluc3RhbmNlS2V5ID0gW1xuICAgIHBhcmFtc1tTQ1JFRU5fQ0xBU1NfS0VZXSxcbiAgICBwYXJhbXNbT1VUTEVUX0tFWV1cbiAgXS5qb2luKFNDUkVFTl9JTlNUQU5DRV9ERUxJTUlURVIpO1xuICBpZiAoa25vd25TY3JlZW5JbnN0YW5jZUlEcy5oYXNPd25Qcm9wZXJ0eShzY3JlZW5JbnN0YW5jZUtleSkpIHtcbiAgICByZXR1cm4ga25vd25TY3JlZW5JbnN0YW5jZUlEc1tzY3JlZW5JbnN0YW5jZUtleV07XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcmV0ID0gbmV4dFNjcmVlbkluc3RhbmNlSUQrKztcbiAgICBrbm93blNjcmVlbkluc3RhbmNlSURzW3NjcmVlbkluc3RhbmNlS2V5XSA9IHJldDtcbiAgICByZXR1cm4gcmV0O1xuICB9XG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2NyZWVuVHJhY2tpbmdTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBwcml2YXRlIGRpc3Bvc2FibGU6IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBhbmFseXRpY3M6IEFuZ3VsYXJGaXJlQW5hbHl0aWNzLFxuICAgIEBPcHRpb25hbCgpIHJvdXRlcjogUm91dGVyLFxuICAgIEBPcHRpb25hbCgpIHRpdGxlOiBUaXRsZSxcbiAgICBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoREVCVUdfTU9ERSkgZGVidWdNb2RlRW5hYmxlZDogYm9vbGVhbiB8IG51bGwsXG4gICAgem9uZTogTmdab25lLFxuICAgIGluamVjdG9yOiBJbmplY3RvclxuICApIHtcbiAgICBpZiAoIXJvdXRlciB8fCAhaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGl2YXRpb25FbmRFdmVudHMgPSByb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyPEFjdGl2YXRpb25FbmQ+KGUgPT4gZSBpbnN0YW5jZW9mIEFjdGl2YXRpb25FbmQpKTtcbiAgICAgIGNvbnN0IG5hdmlnYXRpb25FbmRFdmVudHMgPSByb3V0ZXIuZXZlbnRzLnBpcGUoZmlsdGVyPE5hdmlnYXRpb25FbmQ+KGUgPT4gZSBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKTtcbiAgICAgIHRoaXMuZGlzcG9zYWJsZSA9IG5hdmlnYXRpb25FbmRFdmVudHMucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20oYWN0aXZhdGlvbkVuZEV2ZW50cyksXG4gICAgICAgIHN3aXRjaE1hcCgoW25hdmlnYXRpb25FbmQsIGFjdGl2YXRpb25FbmRdKSA9PiB7XG4gICAgICAgICAgLy8gU0VNVkVSOiBzdGFydCB1c2luZyBvcHRpb25hbCBjaGFpbnMgYW5kIG51bGxpc2ggY29hbGVzY2luZyBvbmNlIHdlIHN1cHBvcnQgbmV3ZXIgdHlwZXNjcmlwdFxuICAgICAgICAgIGNvbnN0IHBhZ2VQYXRoID0gbmF2aWdhdGlvbkVuZC51cmw7XG4gICAgICAgICAgY29uc3Qgc2NyZWVuTmFtZSA9IGFjdGl2YXRpb25FbmQuc25hcHNob3Qucm91dGVDb25maWcgJiYgYWN0aXZhdGlvbkVuZC5zbmFwc2hvdC5yb3V0ZUNvbmZpZy5wYXRoIHx8IHBhZ2VQYXRoO1xuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgIFtTQ1JFRU5fTkFNRV9LRVldOiBzY3JlZW5OYW1lLFxuICAgICAgICAgICAgW1BBR0VfUEFUSF9LRVldOiBwYWdlUGF0aCxcbiAgICAgICAgICAgIFtGSVJFQkFTRV9FVkVOVF9PUklHSU5fS0VZXTogRVZFTlRfT1JJR0lOX0FVVE8sXG4gICAgICAgICAgICBbRklSRUJBU0VfU0NSRUVOX05BTUVfS0VZXTogc2NyZWVuTmFtZSxcbiAgICAgICAgICAgIFtPVVRMRVRfS0VZXTogYWN0aXZhdGlvbkVuZC5zbmFwc2hvdC5vdXRsZXRcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmICh0aXRsZSkge1xuICAgICAgICAgICAgcGFyYW1zW1BBR0VfVElUTEVfS0VZXSA9IHRpdGxlLmdldFRpdGxlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGFjdGl2YXRpb25FbmQuc25hcHNob3QuY29tcG9uZW50O1xuICAgICAgICAgIGNvbnN0IHJvdXRlQ29uZmlnID0gYWN0aXZhdGlvbkVuZC5zbmFwc2hvdC5yb3V0ZUNvbmZpZztcbiAgICAgICAgICBjb25zdCBsb2FkQ2hpbGRyZW4gPSByb3V0ZUNvbmZpZyAmJiByb3V0ZUNvbmZpZy5sb2FkQ2hpbGRyZW47XG4gICAgICAgICAgLy8gVE9ETyBmaWd1cmUgb3V0IGhvdyB0byBoYW5kbGUgbWluaWZpY2F0aW9uXG4gICAgICAgICAgaWYgKHR5cGVvZiBsb2FkQ2hpbGRyZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyBTRU1WRVI6IHRoaXMgaXMgdGhlIG9sZGVyIGxhenkgbG9hZCBzdHlsZSBcIi4vcGF0aCNDbGFzc05hbWVcIiwgZHJvcCB0aGlzIHdoZW4gd2UgZHJvcCBvbGQgbmdcbiAgICAgICAgICAgIC8vIFRPRE8gaXMgaXQgd29ydGggc2VlaW5nIGlmIEkgY2FuIGxvb2sgdXAgdGhlIGNvbXBvbmVudCBmYWN0b3J5IHNlbGVjdG9yIGZyb20gdGhlIG1vZHVsZSBuYW1lP1xuICAgICAgICAgICAgLy8gaXQncyBsYXp5IHNvIGl0J3Mgbm90IHJlZ2lzdGVyZWQgd2l0aCBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIgeWV0Li4uIHNlZW1zIGEgcGFpbiBmb3IgYSBkZXByZWNpYXRlZCBzdHlsZVxuICAgICAgICAgICAgcmV0dXJuIG9mKHsgLi4ucGFyYW1zLCBbU0NSRUVOX0NMQVNTX0tFWV06IGxvYWRDaGlsZHJlbi5zcGxpdCgnIycpWzFdIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBvZih7IC4uLnBhcmFtcywgW1NDUkVFTl9DTEFTU19LRVldOiBjb21wb25lbnQgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjb21wb25lbnQpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICAgICAgICAgIHJldHVybiBvZih7IC4uLnBhcmFtcywgW1NDUkVFTl9DTEFTU19LRVldOiBjb21wb25lbnRGYWN0b3J5LnNlbGVjdG9yIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAobG9hZENoaWxkcmVuKSB7XG4gICAgICAgICAgICBjb25zdCBsb2FkZWRDaGlsZHJlbiA9IGxvYWRDaGlsZHJlbigpO1xuICAgICAgICAgICAgY29uc3QgbG9hZGVkQ2hpbGRyZW4kOiBPYnNlcnZhYmxlPGFueT4gPSAobG9hZGVkQ2hpbGRyZW4gaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSA/XG4gICAgICAgICAgICAgIGxvYWRlZENoaWxkcmVuIDpcbiAgICAgICAgICAgICAgZnJvbShQcm9taXNlLnJlc29sdmUobG9hZGVkQ2hpbGRyZW4pKTtcbiAgICAgICAgICAgIHJldHVybiBsb2FkZWRDaGlsZHJlbiQucGlwZShcbiAgICAgICAgICAgICAgbWFwKGxhenlNb2R1bGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsYXp5TW9kdWxlIGluc3RhbmNlb2YgTmdNb2R1bGVGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgICAvLyBBT1QgY3JlYXRlIGFuIGluamVjdG9yXG4gICAgICAgICAgICAgICAgICBjb25zdCBtb2R1bGVSZWYgPSBsYXp5TW9kdWxlLmNyZWF0ZShpbmplY3Rvcik7XG4gICAgICAgICAgICAgICAgICAvLyBJTlZFU1RJR0FURSBpcyB0aGlzIHRoZSByaWdodCB3YXkgdG8gZ2V0IGF0IHRoZSBtYXRjaGluZyByb3V0ZT9cbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJvdXRlcyA9IG1vZHVsZVJlZi5pbmplY3Rvci5nZXQoUk9VVEVTKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHJvdXRlc1swXVswXS5jb21wb25lbnQ7IC8vIHNob3VsZCBpIGp1c3QgYmUgZ3JhYmJpbmcgMC0wIGhlcmU/XG4gICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gbW9kdWxlUmVmLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShjb21wb25lbnQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5wYXJhbXMsIFtTQ1JFRU5fQ0xBU1NfS0VZXTogY29tcG9uZW50RmFjdG9yeS5zZWxlY3RvciB9O1xuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5wYXJhbXMsIFtTQ1JFRU5fQ0xBU1NfS0VZXTogREVGQVVMVF9TQ1JFRU5fQ0xBU1MgfTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gSklUIGxvb2sgYXQgdGhlIGFubm90YXRpb25zXG4gICAgICAgICAgICAgICAgICAvLyBJTlZFU1RJR0FURSBhcmUgdGhlcmUgcHVibGljIEFQSXMgZm9yIHRoaXMgc3R1ZmY/XG4gICAgICAgICAgICAgICAgICBjb25zdCBkZWNsYXJhdGlvbnMgPSBbXS5jb25jYXQuYXBwbHkoW10sIChsYXp5TW9kdWxlW0FOTk9UQVRJT05TXSB8fCBbXSkubWFwKChmOiBhbnkpID0+IGYuZGVjbGFyYXRpb25zKSk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RvcnMgPSBbXS5jb25jYXQuYXBwbHkoW10sIGRlY2xhcmF0aW9ucy5tYXAoKGM6IGFueSkgPT4gKGNbQU5OT1RBVElPTlNdIHx8IFtdKS5tYXAoKGY6IGFueSkgPT4gZi5zZWxlY3RvcikpKTtcbiAgICAgICAgICAgICAgICAgIC8vIHNob3VsZCBJIGp1c3QgYmUgZ3JhYmJpbmcgdGhlIHNlbGVjdG9yIGxpa2UgdGhpcyBvciBzaG91bGQgaSBtYXRjaCBhZ2FpbnN0IHRoZSByb3V0ZSBjb21wb25lbnQ/XG4gICAgICAgICAgICAgICAgICAvLyAgIGNvbnN0IHJvdXRlck1vZHVsZSA9IGxhenlNb2R1bGUubmdJbmplY3RvckRlZi5pbXBvcnRzLmZpbmQoaSA9PiBpLm5nTW9kdWxlICYmIC4uLi4pO1xuICAgICAgICAgICAgICAgICAgLy8gICBjb25zdCByb3V0ZSA9IHJvdXRlck1vZHVsZS5wcm92aWRlcnNbMF0uZmluZChwID0+IHAucHJvdmlkZSA9PSBST1VURVMpLnVzZVZhbHVlWzBdO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgLi4ucGFyYW1zLCBbU0NSRUVOX0NMQVNTX0tFWV06IHNlbGVjdG9yc1swXSB8fCBERUZBVUxUX1NDUkVFTl9DTEFTUyB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZih7IC4uLnBhcmFtcywgW1NDUkVFTl9DTEFTU19LRVldOiBERUZBVUxUX1NDUkVFTl9DTEFTUyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAocGFyYW1zID0+ICh7XG4gICAgICAgICAgW0ZJUkVCQVNFX1NDUkVFTl9DTEFTU19LRVldOiBwYXJhbXNbU0NSRUVOX0NMQVNTX0tFWV0sXG4gICAgICAgICAgW0ZJUkVCQVNFX1NDUkVFTl9JTlNUQU5DRV9JRF9LRVldOiBnZXRTY3JlZW5JbnN0YW5jZUlEKHBhcmFtcyksXG4gICAgICAgICAgLi4ucGFyYW1zXG4gICAgICAgIH0pKSxcbiAgICAgICAgdGFwKHBhcmFtcyA9PiB7XG4gICAgICAgICAgLy8gVE9ETyBwZXJoYXBzIEkgY2FuIGJlIHNtYXJ0ZXIgYWJvdXQgdGhpcywgYnViYmxlIGV2ZW50cyB1cCB0byB0aGUgbmVhcmVzdCBvdXRsZXQ/XG4gICAgICAgICAgaWYgKHBhcmFtc1tPVVRMRVRfS0VZXSA9PT0gTkdfUFJJTUFSWV9PVVRMRVQpIHtcbiAgICAgICAgICAgIGFuYWx5dGljcy5zZXRDdXJyZW50U2NyZWVuKHBhcmFtc1tTQ1JFRU5fTkFNRV9LRVldKTtcbiAgICAgICAgICAgIGFuYWx5dGljcy51cGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICBbUEFHRV9QQVRIX0tFWV06IHBhcmFtc1tQQUdFX1BBVEhfS0VZXSxcbiAgICAgICAgICAgICAgW1NDUkVFTl9DTEFTU19LRVldOiBwYXJhbXNbU0NSRUVOX0NMQVNTX0tFWV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHRpdGxlKSB7XG4gICAgICAgICAgICAgIGFuYWx5dGljcy51cGRhdGVDb25maWcoeyBbUEFHRV9USVRMRV9LRVldOiBwYXJhbXNbUEFHRV9USVRMRV9LRVldIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGdyb3VwQnkocGFyYW1zID0+IHBhcmFtc1tPVVRMRVRfS0VZXSksXG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICBtZXJnZU1hcChncm91cCA9PiBncm91cC5waXBlKHN0YXJ0V2l0aCh1bmRlZmluZWQpLCBwYWlyd2lzZSgpKSksXG4gICAgICAgIG1hcCgoW3ByaW9yLCBjdXJyZW50XSkgPT4gcHJpb3IgPyB7XG4gICAgICAgICAgW0ZJUkVCQVNFX1BSRVZJT1VTX1NDUkVFTl9DTEFTU19LRVldOiBwcmlvcltTQ1JFRU5fQ0xBU1NfS0VZXSxcbiAgICAgICAgICBbRklSRUJBU0VfUFJFVklPVVNfU0NSRUVOX05BTUVfS0VZXTogcHJpb3JbU0NSRUVOX05BTUVfS0VZXSxcbiAgICAgICAgICBbRklSRUJBU0VfUFJFVklPVVNfU0NSRUVOX0lOU1RBTkNFX0lEX0tFWV06IHByaW9yW0ZJUkVCQVNFX1NDUkVFTl9JTlNUQU5DRV9JRF9LRVldLFxuICAgICAgICAgIC4uLmN1cnJlbnRcbiAgICAgICAgfSA6IGN1cnJlbnQpLFxuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuICAgICAgICB0YXAocGFyYW1zID0+IGRlYnVnTW9kZUVuYWJsZWQgJiYgY29uc29sZS5pbmZvKFNDUkVFTl9WSUVXX0VWRU5ULCBwYXJhbXMpKSxcbiAgICAgICAgdGFwKHBhcmFtcyA9PiB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IGFuYWx5dGljcy5sb2dFdmVudChTQ1JFRU5fVklFV19FVkVOVCwgcGFyYW1zKSkpXG4gICAgICApLnN1YnNjcmliZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuZGlzcG9zYWJsZSkge1xuICAgICAgdGhpcy5kaXNwb3NhYmxlLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFVzZXJUcmFja2luZ1NlcnZpY2UgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIHByaXZhdGUgZGlzcG9zYWJsZTogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gIC8vIFRPRE8gYSB1c2VyIHByb3BlcnRpZXMgaW5qZWN0b3JcbiAgY29uc3RydWN0b3IoXG4gICAgYW5hbHl0aWNzOiBBbmd1bGFyRmlyZUFuYWx5dGljcyxcbiAgICB6b25lOiBOZ1pvbmUsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdFxuICApIHtcbiAgICBjb25zdCBzY2hlZHVsZXJzID0gbmV3IMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzKHpvbmUpO1xuXG4gICAgaWYgKCFpc1BsYXRmb3JtU2VydmVyKHBsYXRmb3JtSWQpKSB7XG4gICAgICB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSB6YXAgdGhlIGltcG9ydCBpbiB0aGUgVU1EXG4gICAgICAgIHRoaXMuZGlzcG9zYWJsZSA9IGZyb20oaW1wb3J0KCdmaXJlYmFzZS9hdXRoJykpLnBpcGUoXG4gICAgICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiBhbmFseXRpY3MuYXBwKSxcbiAgICAgICAgICBtYXAoYXBwID0+IGFwcC5hdXRoKCkpLFxuICAgICAgICAgIHN3aXRjaE1hcChhdXRoID0+IG5ldyBPYnNlcnZhYmxlPGZpcmViYXNlLlVzZXIgfCBudWxsPihhdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZC5iaW5kKGF1dGgpKSksXG4gICAgICAgICAgc3dpdGNoTWFwKHVzZXIgPT4gYW5hbHl0aWNzLnNldFVzZXJJZCh1c2VyID8gdXNlci51aWQgOiBudWxsKSlcbiAgICAgICAgKS5zdWJzY3JpYmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmRpc3Bvc2FibGUpIHtcbiAgICAgIHRoaXMuZGlzcG9zYWJsZS51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19