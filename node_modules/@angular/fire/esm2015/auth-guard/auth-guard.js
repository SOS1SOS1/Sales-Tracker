/**
 * @fileoverview added by tsickle
 * Generated from: auth-guard.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, NgZone, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, pipe } from 'rxjs';
import { map, observeOn, shareReplay, switchMap, take } from 'rxjs/operators';
import { ɵAngularFireSchedulers, FIREBASE_OPTIONS, FIREBASE_APP_NAME, ɵfirebaseAppFactory, ɵkeepUnstableUntilFirstFactory } from '@angular/fire';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
import * as i2 from "@angular/router";
const ɵ0 = /**
 * @param {?} user
 * @return {?}
 */
user => !!user;
/** @type {?} */
export const loggedIn = map((ɵ0));
export class AngularFireAuthGuard {
    /**
     * @param {?} options
     * @param {?} nameOrConfig
     * @param {?} zone
     * @param {?} router
     */
    constructor(options, nameOrConfig, zone, router) {
        this.router = router;
        this.canActivate = (/**
         * @param {?} next
         * @param {?} state
         * @return {?}
         */
        (next, state) => {
            /** @type {?} */
            const authPipeFactory = (/** @type {?} */ (next.data.authGuardPipe)) || ((/**
             * @return {?}
             */
            () => loggedIn));
            return this.authState.pipe(take(1), authPipeFactory(next, state), map((/**
             * @param {?} can
             * @return {?}
             */
            can => typeof can === 'boolean' ? can : this.router.createUrlTree((/** @type {?} */ (can))))));
        });
        /** @type {?} */
        const schedulers = new ɵAngularFireSchedulers(zone);
        /** @type {?} */
        const keepUnstableUntilFirst = ɵkeepUnstableUntilFirstFactory(schedulers);
        /** @type {?} */
        const auth = of(undefined).pipe(observeOn(new ɵAngularFireSchedulers(zone).outsideAngular), switchMap((/**
         * @return {?}
         */
        () => zone.runOutsideAngular((/**
         * @return {?}
         */
        () => import('firebase/auth'))))), map((/**
         * @return {?}
         */
        () => ɵfirebaseAppFactory(options, zone, nameOrConfig))), map((/**
         * @param {?} app
         * @return {?}
         */
        app => zone.runOutsideAngular((/**
         * @return {?}
         */
        () => app.auth())))), shareReplay({ bufferSize: 1, refCount: false }));
        this.authState = auth.pipe(switchMap((/**
         * @param {?} auth
         * @return {?}
         */
        auth => new Observable(auth.onAuthStateChanged.bind(auth)))), keepUnstableUntilFirst);
    }
}
AngularFireAuthGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireAuthGuard.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: NgZone },
    { type: Router }
];
/** @nocollapse */ AngularFireAuthGuard.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireAuthGuard_Factory() { return new AngularFireAuthGuard(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i2.Router)); }, token: AngularFireAuthGuard, providedIn: "any" });
if (false) {
    /** @type {?} */
    AngularFireAuthGuard.prototype.authState;
    /** @type {?} */
    AngularFireAuthGuard.prototype.canActivate;
    /**
     * @type {?}
     * @private
     */
    AngularFireAuthGuard.prototype.router;
}
/** @type {?} */
export const canActivate = (/**
 * @param {?} pipe
 * @return {?}
 */
(pipe) => ({
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: pipe }
}));
const ɵ1 = /**
 * @param {?} user
 * @return {?}
 */
user => !!user && !user.isAnonymous;
/** @type {?} */
export const isNotAnonymous = map((ɵ1));
const ɵ2 = /**
 * @param {?} user
 * @return {?}
 */
(user) => user ? user.getIdTokenResult() : of(null);
/** @type {?} */
export const idTokenResult = switchMap((ɵ2));
const ɵ3 = /**
 * @param {?} user
 * @return {?}
 */
user => !!user && user.emailVerified;
/** @type {?} */
export const emailVerified = map((ɵ3));
const ɵ4 = /**
 * @param {?} idTokenResult
 * @return {?}
 */
idTokenResult => idTokenResult ? idTokenResult.claims : [];
/** @type {?} */
export const customClaims = pipe(idTokenResult, map((ɵ4)));
/** @type {?} */
export const hasCustomClaim = (/**
 * @param {?} claim
 * @return {?}
 */
(claim) => pipe(customClaims, map((/**
 * @param {?} claims
 * @return {?}
 */
claims => claims.hasOwnProperty(claim)))));
/** @type {?} */
export const redirectUnauthorizedTo = (/**
 * @param {?} redirect
 * @return {?}
 */
(redirect) => pipe(loggedIn, map((/**
 * @param {?} loggedIn
 * @return {?}
 */
loggedIn => loggedIn || redirect))));
/** @type {?} */
export const redirectLoggedInTo = (/**
 * @param {?} redirect
 * @return {?}
 */
(redirect) => pipe(loggedIn, map((/**
 * @param {?} loggedIn
 * @return {?}
 */
loggedIn => loggedIn && redirect || true))));
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIvd29ya3NwYWNlL3NyYy9hdXRoLWd1YXJkLyIsInNvdXJjZXMiOlsiYXV0aC1ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUF1QyxNQUFNLEVBQXVCLE1BQU0saUJBQWlCLENBQUM7QUFDbkcsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFpQixNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBTyxNQUFNLGdCQUFnQixDQUFDO0FBRW5GLE9BQU8sRUFDTCxzQkFBc0IsRUFHdEIsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixtQkFBbUIsRUFDbkIsOEJBQThCLEVBQy9CLE1BQU0sZUFBZSxDQUFDOzs7Ozs7OztBQUtlLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUk7O0FBQXBELE1BQU0sT0FBTyxRQUFRLEdBQWEsR0FBRyxNQUFnQjtBQUtyRCxNQUFNLE9BQU8sb0JBQW9COzs7Ozs7O0lBSS9CLFlBQzRCLE9BQXdCLEVBQ1gsWUFBcUQsRUFDNUYsSUFBWSxFQUNKLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBb0J4QixnQkFBVzs7Ozs7UUFBRyxDQUFDLElBQTRCLEVBQUUsS0FBMEIsRUFBRSxFQUFFOztrQkFDbkUsZUFBZSxHQUFHLG1CQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFxQixJQUFJOzs7WUFBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUM7WUFDeEYsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDeEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLGVBQWUsQ0FB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QUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHOzs7O0FBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBRSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUMsQ0FBQTs7QUFDN0UsTUFBTSxPQUFPLHNCQUFzQjs7OztBQUNqQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHOzs7O0FBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLElBQUksUUFBUSxFQUFDLENBQUMsQ0FBQTs7QUFDckUsTUFBTSxPQUFPLGtCQUFrQjs7OztBQUM3QixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHOzs7O0FBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLElBQUksUUFBUSxJQUFJLElBQUksRUFBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIENhbkFjdGl2YXRlLCBSb3V0ZXIsIFJvdXRlclN0YXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIHBpcGUsIFVuYXJ5RnVuY3Rpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgb2JzZXJ2ZU9uLCBzaGFyZVJlcGxheSwgc3dpdGNoTWFwLCB0YWtlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSAnZmlyZWJhc2UvYXBwJztcbmltcG9ydCB7XG4gIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLFxuICBGaXJlYmFzZU9wdGlvbnMsXG4gIEZpcmViYXNlQXBwQ29uZmlnLFxuICBGSVJFQkFTRV9PUFRJT05TLFxuICBGSVJFQkFTRV9BUFBfTkFNRSxcbiAgybVmaXJlYmFzZUFwcEZhY3RvcnksXG4gIMm1a2VlcFVuc3RhYmxlVW50aWxGaXJzdEZhY3Rvcnlcbn0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5cbmV4cG9ydCB0eXBlIEF1dGhQaXBlR2VuZXJhdG9yID0gKG5leHQ6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSA9PiBBdXRoUGlwZTtcbmV4cG9ydCB0eXBlIEF1dGhQaXBlID0gVW5hcnlGdW5jdGlvbjxPYnNlcnZhYmxlPGZpcmViYXNlLlVzZXJ8bnVsbD4sIE9ic2VydmFibGU8Ym9vbGVhbnxhbnlbXT4+O1xuXG5leHBvcnQgY29uc3QgbG9nZ2VkSW46IEF1dGhQaXBlID0gbWFwKHVzZXIgPT4gISF1c2VyKTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAnYW55J1xufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZUF1dGhHdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcblxuICBhdXRoU3RhdGU6IE9ic2VydmFibGU8ZmlyZWJhc2UuVXNlcnxudWxsPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEZJUkVCQVNFX09QVElPTlMpIG9wdGlvbnM6IEZpcmViYXNlT3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEZJUkVCQVNFX0FQUF9OQU1FKSBuYW1lT3JDb25maWc6IHN0cmluZ3xGaXJlYmFzZUFwcENvbmZpZ3xudWxsfHVuZGVmaW5lZCxcbiAgICB6b25lOiBOZ1pvbmUsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlclxuICApIHtcblxuICAgIGNvbnN0IHNjaGVkdWxlcnMgPSBuZXcgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMoem9uZSk7XG4gICAgY29uc3Qga2VlcFVuc3RhYmxlVW50aWxGaXJzdCA9IMm1a2VlcFVuc3RhYmxlVW50aWxGaXJzdEZhY3Rvcnkoc2NoZWR1bGVycyk7XG5cbiAgICBjb25zdCBhdXRoID0gb2YodW5kZWZpbmVkKS5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKG5ldyDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyh6b25lKS5vdXRzaWRlQW5ndWxhciksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiBpbXBvcnQoJ2ZpcmViYXNlL2F1dGgnKSkpLFxuICAgICAgbWFwKCgpID0+IMm1ZmlyZWJhc2VBcHBGYWN0b3J5KG9wdGlvbnMsIHpvbmUsIG5hbWVPckNvbmZpZykpLFxuICAgICAgbWFwKGFwcCA9PiB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IGFwcC5hdXRoKCkpKSxcbiAgICAgIHNoYXJlUmVwbGF5KHsgYnVmZmVyU2l6ZTogMSwgcmVmQ291bnQ6IGZhbHNlIH0pLFxuICAgICk7XG5cbiAgICB0aGlzLmF1dGhTdGF0ZSA9IGF1dGgucGlwZShcbiAgICAgIHN3aXRjaE1hcChhdXRoID0+IG5ldyBPYnNlcnZhYmxlPGZpcmViYXNlLlVzZXJ8bnVsbD4oYXV0aC5vbkF1dGhTdGF0ZUNoYW5nZWQuYmluZChhdXRoKSkpLFxuICAgICAga2VlcFVuc3RhYmxlVW50aWxGaXJzdFxuICAgICk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZSA9IChuZXh0OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCkgPT4ge1xuICAgIGNvbnN0IGF1dGhQaXBlRmFjdG9yeSA9IG5leHQuZGF0YS5hdXRoR3VhcmRQaXBlIGFzIEF1dGhQaXBlR2VuZXJhdG9yIHx8ICgoKSA9PiBsb2dnZWRJbik7XG4gICAgcmV0dXJuIHRoaXMuYXV0aFN0YXRlLnBpcGUoXG4gICAgICB0YWtlKDEpLFxuICAgICAgYXV0aFBpcGVGYWN0b3J5KG5leHQsIHN0YXRlKSxcbiAgICAgIG1hcChjYW4gPT4gdHlwZW9mIGNhbiA9PT0gJ2Jvb2xlYW4nID8gY2FuIDogdGhpcy5yb3V0ZXIuY3JlYXRlVXJsVHJlZShjYW4gYXMgYW55W10pKVxuICAgICk7XG4gIH1cblxufVxuXG5leHBvcnQgY29uc3QgY2FuQWN0aXZhdGUgPSAocGlwZTogQXV0aFBpcGVHZW5lcmF0b3IpID0+ICh7XG4gICAgY2FuQWN0aXZhdGU6IFsgQW5ndWxhckZpcmVBdXRoR3VhcmQgXSwgZGF0YTogeyBhdXRoR3VhcmRQaXBlOiBwaXBlIH1cbn0pO1xuXG5cbmV4cG9ydCBjb25zdCBpc05vdEFub255bW91czogQXV0aFBpcGUgPSBtYXAodXNlciA9PiAhIXVzZXIgJiYgIXVzZXIuaXNBbm9ueW1vdXMpO1xuZXhwb3J0IGNvbnN0IGlkVG9rZW5SZXN1bHQgPSBzd2l0Y2hNYXAoKHVzZXI6IGZpcmViYXNlLlVzZXJ8bnVsbCkgPT4gdXNlciA/IHVzZXIuZ2V0SWRUb2tlblJlc3VsdCgpIDogb2YobnVsbCkpO1xuZXhwb3J0IGNvbnN0IGVtYWlsVmVyaWZpZWQ6IEF1dGhQaXBlID0gbWFwKHVzZXIgPT4gISF1c2VyICYmIHVzZXIuZW1haWxWZXJpZmllZCk7XG5leHBvcnQgY29uc3QgY3VzdG9tQ2xhaW1zID0gcGlwZShpZFRva2VuUmVzdWx0LCBtYXAoaWRUb2tlblJlc3VsdCA9PiBpZFRva2VuUmVzdWx0ID8gaWRUb2tlblJlc3VsdC5jbGFpbXMgOiBbXSkpO1xuZXhwb3J0IGNvbnN0IGhhc0N1c3RvbUNsYWltOiAoY2xhaW06IHN0cmluZykgPT4gQXV0aFBpcGUgPVxuICAoY2xhaW0pID0+IHBpcGUoY3VzdG9tQ2xhaW1zLCBtYXAoY2xhaW1zID0+ICBjbGFpbXMuaGFzT3duUHJvcGVydHkoY2xhaW0pKSk7XG5leHBvcnQgY29uc3QgcmVkaXJlY3RVbmF1dGhvcml6ZWRUbzogKHJlZGlyZWN0OiBhbnlbXSkgPT4gQXV0aFBpcGUgPVxuICAocmVkaXJlY3QpID0+IHBpcGUobG9nZ2VkSW4sIG1hcChsb2dnZWRJbiA9PiBsb2dnZWRJbiB8fCByZWRpcmVjdCkpO1xuZXhwb3J0IGNvbnN0IHJlZGlyZWN0TG9nZ2VkSW5UbzogKHJlZGlyZWN0OiBhbnlbXSkgPT4gQXV0aFBpcGUgPVxuICAocmVkaXJlY3QpID0+IHBpcGUobG9nZ2VkSW4sIG1hcChsb2dnZWRJbiA9PiBsb2dnZWRJbiAmJiByZWRpcmVjdCB8fCB0cnVlKSk7XG4iXX0=