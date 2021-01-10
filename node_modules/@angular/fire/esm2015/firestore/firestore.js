/**
 * @fileoverview added by tsickle
 * Generated from: firestore.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { from, of } from 'rxjs';
import { AngularFirestoreDocument } from './document/document';
import { AngularFirestoreCollection } from './collection/collection';
import { AngularFirestoreCollectionGroup } from './collection-group/collection-group';
import { FIREBASE_APP_NAME, FIREBASE_OPTIONS, ɵAngularFireSchedulers, ɵfirebaseAppFactory, ɵkeepUnstableUntilFirstFactory } from '@angular/fire';
import { isPlatformServer } from '@angular/common';
import 'firebase/firestore';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
/** @type {?} */
const atFirestore = require('@firebase/firestore');
import firebase from 'firebase/app';
/**
 * The value of this token determines whether or not the firestore will have persistance enabled
 * @type {?}
 */
export const ENABLE_PERSISTENCE = new InjectionToken('angularfire2.enableFirestorePersistence');
/** @type {?} */
export const PERSISTENCE_SETTINGS = new InjectionToken('angularfire2.firestore.persistenceSettings');
/** @type {?} */
export const SETTINGS = new InjectionToken('angularfire2.firestore.settings');
/**
 * A utility methods for associating a collection reference with
 * a query.
 *
 * @param {?} collectionRef - A collection reference to query
 * @param {?=} queryFn - The callback to create a query
 *
 * Example:
 * const { query, ref } = associateQuery(docRef.collection('items'), ref => {
 *  return ref.where('age', '<', 200);
 * });
 * @return {?}
 */
export function associateQuery(collectionRef, queryFn = (/**
 * @param {?} ref
 * @return {?}
 */
ref => ref)) {
    /** @type {?} */
    const query = queryFn(collectionRef);
    /** @type {?} */
    const ref = collectionRef;
    return { query, ref };
}
/**
 * AngularFirestore Service
 *
 * This service is the main entry point for this feature module. It provides
 * an API for creating Collection and Reference services. These services can
 * then be used to do data updates and observable streams of the data.
 *
 * Example:
 *
 * import { Component } from '\@angular/core';
 * import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '\@angular/fire/firestore';
 * import { Observable } from 'rxjs/Observable';
 * import { from } from 'rxjs/observable';
 *
 * \@Component({
 *   selector: 'app-my-component',
 *   template: `
 *    <h2>Items for {{ (profile | async)?.name }}
 *    <ul>
 *       <li *ngFor="let item of items | async">{{ item.name }}</li>
 *    </ul>
 *    <div class="control-input">
 *       <input type="text" #itemname />
 *       <button (click)="addItem(itemname.value)">Add Item</button>
 *    </div>
 *   `
 * })
 * export class MyComponent implements OnInit {
 *
 *   // services for data operations and data streaming
 *   private readonly itemsRef: AngularFirestoreCollection<Item>;
 *   private readonly profileRef: AngularFirestoreDocument<Profile>;
 *
 *   // observables for template
 *   items: Observable<Item[]>;
 *   profile: Observable<Profile>;
 *
 *   // inject main service
 *   constructor(private readonly afs: AngularFirestore) {}
 *
 *   ngOnInit() {
 *     this.itemsRef = afs.collection('items', ref => ref.where('user', '==', 'davideast').limit(10));
 *     this.items = this.itemsRef.valueChanges().map(snap => snap.docs.map(data => doc.data()));
 *     // this.items = from(this.itemsRef); // you can also do this with no mapping
 *
 *     this.profileRef = afs.doc('users/davideast');
 *     this.profile = this.profileRef.valueChanges();
 *   }
 *
 *   addItem(name: string) {
 *     const user = 'davideast';
 *     this.itemsRef.add({ name, user });
 *   }
 * }
 */
export class AngularFirestore {
    /**
     * Each Feature of AngularFire has a FirebaseApp injected. This way we
     * don't rely on the main Firebase App instance and we can create named
     * apps and use multiple apps.
     * @param {?} options
     * @param {?} nameOrConfig
     * @param {?} shouldEnablePersistence
     * @param {?} settings
     * @param {?} platformId
     * @param {?} zone
     * @param {?} persistenceSettings
     */
    constructor(options, nameOrConfig, shouldEnablePersistence, settings, 
    // tslint:disable-next-line:ban-types
    platformId, zone, persistenceSettings) {
        this.schedulers = new ɵAngularFireSchedulers(zone);
        this.keepUnstableUntilFirst = ɵkeepUnstableUntilFirstFactory(this.schedulers);
        this.firestore = zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const app = ɵfirebaseAppFactory(options, zone, nameOrConfig);
            // INVESTIGATE this seems to be required because in the browser build registerFirestore is an Object?
            //             seems like we're fighting ngcc. In the server firestore() isn't available, so I have to register
            //             in the browser registerFirestore is not a function... maybe this is an underlying firebase-js-sdk issue
            if ('registerFirestore' in atFirestore) {
                ((/** @type {?} */ (atFirestore))).registerFirestore((/** @type {?} */ (firebase)));
            }
            /** @type {?} */
            const firestore = app.firestore();
            if (settings) {
                firestore.settings(settings);
            }
            return firestore;
        }));
        if (shouldEnablePersistence && !isPlatformServer(platformId)) {
            // We need to try/catch here because not all enablePersistence() failures are caught
            // https://github.com/firebase/firebase-js-sdk/issues/608
            /** @type {?} */
            const enablePersistence = (/**
             * @return {?}
             */
            () => {
                try {
                    return from(this.firestore.enablePersistence(persistenceSettings || undefined).then((/**
                     * @return {?}
                     */
                    () => true), (/**
                     * @return {?}
                     */
                    () => false)));
                }
                catch (e) {
                    return of(false);
                }
            });
            this.persistenceEnabled$ = zone.runOutsideAngular(enablePersistence);
        }
        else {
            this.persistenceEnabled$ = of(false);
        }
    }
    /**
     * @template T
     * @param {?} pathOrRef
     * @param {?=} queryFn
     * @return {?}
     */
    collection(pathOrRef, queryFn) {
        /** @type {?} */
        let collectionRef;
        if (typeof pathOrRef === 'string') {
            collectionRef = this.firestore.collection(pathOrRef);
        }
        else {
            collectionRef = pathOrRef;
        }
        const { ref, query } = associateQuery(collectionRef, queryFn);
        /** @type {?} */
        const refInZone = this.schedulers.ngZone.run((/**
         * @return {?}
         */
        () => ref));
        return new AngularFirestoreCollection(refInZone, query, this);
    }
    /**
     * Create a reference to a Firestore Collection Group based on a collectionId
     * and an optional query function to narrow the result
     * set.
     * @template T
     * @param {?} collectionId
     * @param {?=} queryGroupFn
     * @return {?}
     */
    collectionGroup(collectionId, queryGroupFn) {
        /** @type {?} */
        const queryFn = queryGroupFn || ((/**
         * @param {?} ref
         * @return {?}
         */
        ref => ref));
        /** @type {?} */
        const collectionGroup = this.firestore.collectionGroup(collectionId);
        return new AngularFirestoreCollectionGroup(queryFn(collectionGroup), this);
    }
    /**
     * @template T
     * @param {?} pathOrRef
     * @return {?}
     */
    doc(pathOrRef) {
        /** @type {?} */
        let ref;
        if (typeof pathOrRef === 'string') {
            ref = this.firestore.doc(pathOrRef);
        }
        else {
            ref = pathOrRef;
        }
        /** @type {?} */
        const refInZone = this.schedulers.ngZone.run((/**
         * @return {?}
         */
        () => ref));
        return new AngularFirestoreDocument(refInZone, this);
    }
    /**
     * Returns a generated Firestore Document Id.
     * @return {?}
     */
    createId() {
        return this.firestore.collection('_').doc().id;
    }
}
AngularFirestore.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFirestore.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ENABLE_PERSISTENCE,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [SETTINGS,] }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [PERSISTENCE_SETTINGS,] }] }
];
/** @nocollapse */ AngularFirestore.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFirestore_Factory() { return new AngularFirestore(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(ENABLE_PERSISTENCE, 8), i0.ɵɵinject(SETTINGS, 8), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(PERSISTENCE_SETTINGS, 8)); }, token: AngularFirestore, providedIn: "any" });
if (false) {
    /** @type {?} */
    AngularFirestore.prototype.firestore;
    /** @type {?} */
    AngularFirestore.prototype.persistenceEnabled$;
    /** @type {?} */
    AngularFirestore.prototype.schedulers;
    /** @type {?} */
    AngularFirestore.prototype.keepUnstableUntilFirst;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZXN0b3JlLmpzIiwic291cmNlUm9vdCI6Ii93b3Jrc3BhY2Uvc3JjL2ZpcmVzdG9yZS8iLCJzb3VyY2VzIjpbImZpcmVzdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsSUFBSSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQVc1QyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUN0RixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUdoQixzQkFBc0IsRUFDdEIsbUJBQW1CLEVBQ25CLDhCQUE4QixFQUMvQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLG9CQUFvQixDQUFDOzs7O01BQ3RCLFdBQVcsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUM7QUFDbEQsT0FBTyxRQUFRLE1BQU0sY0FBYyxDQUFDOzs7OztBQUtwQyxNQUFNLE9BQU8sa0JBQWtCLEdBQUcsSUFBSSxjQUFjLENBQVUseUNBQXlDLENBQUM7O0FBQ3hHLE1BQU0sT0FBTyxvQkFBb0IsR0FBRyxJQUFJLGNBQWMsQ0FBa0MsNENBQTRDLENBQUM7O0FBQ3JJLE1BQU0sT0FBTyxRQUFRLEdBQUcsSUFBSSxjQUFjLENBQVcsaUNBQWlDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FBY3ZGLE1BQU0sVUFBVSxjQUFjLENBQUMsYUFBa0MsRUFBRSxPQUFPOzs7O0FBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFH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K0NBQXlEOztJQUN6RCxzQ0FBbUQ7O0lBQ25ELGtEQUFpRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSwgT3B0aW9uYWwsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgQXNzb2NpYXRlZFJlZmVyZW5jZSxcbiAgQ29sbGVjdGlvblJlZmVyZW5jZSxcbiAgRG9jdW1lbnRSZWZlcmVuY2UsXG4gIFBlcnNpc3RlbmNlU2V0dGluZ3MsXG4gIFF1ZXJ5LFxuICBRdWVyeUZuLFxuICBRdWVyeUdyb3VwRm4sXG4gIFNldHRpbmdzXG59IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQgfSBmcm9tICcuL2RvY3VtZW50L2RvY3VtZW50JztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uIH0gZnJvbSAnLi9jb2xsZWN0aW9uL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb25Hcm91cCB9IGZyb20gJy4vY29sbGVjdGlvbi1ncm91cC9jb2xsZWN0aW9uLWdyb3VwJztcbmltcG9ydCB7XG4gIEZJUkVCQVNFX0FQUF9OQU1FLFxuICBGSVJFQkFTRV9PUFRJT05TLFxuICBGaXJlYmFzZUFwcENvbmZpZyxcbiAgRmlyZWJhc2VPcHRpb25zLFxuICDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyxcbiAgybVmaXJlYmFzZUFwcEZhY3RvcnksXG4gIMm1a2VlcFVuc3RhYmxlVW50aWxGaXJzdEZhY3Rvcnlcbn0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCAnZmlyZWJhc2UvZmlyZXN0b3JlJztcbmNvbnN0IGF0RmlyZXN0b3JlID0gcmVxdWlyZSgnQGZpcmViYXNlL2ZpcmVzdG9yZScpO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5cbi8qKlxuICogVGhlIHZhbHVlIG9mIHRoaXMgdG9rZW4gZGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgZmlyZXN0b3JlIHdpbGwgaGF2ZSBwZXJzaXN0YW5jZSBlbmFibGVkXG4gKi9cbmV4cG9ydCBjb25zdCBFTkFCTEVfUEVSU0lTVEVOQ0UgPSBuZXcgSW5qZWN0aW9uVG9rZW48Ym9vbGVhbj4oJ2FuZ3VsYXJmaXJlMi5lbmFibGVGaXJlc3RvcmVQZXJzaXN0ZW5jZScpO1xuZXhwb3J0IGNvbnN0IFBFUlNJU1RFTkNFX1NFVFRJTkdTID0gbmV3IEluamVjdGlvblRva2VuPFBlcnNpc3RlbmNlU2V0dGluZ3MgfCB1bmRlZmluZWQ+KCdhbmd1bGFyZmlyZTIuZmlyZXN0b3JlLnBlcnNpc3RlbmNlU2V0dGluZ3MnKTtcbmV4cG9ydCBjb25zdCBTRVRUSU5HUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxTZXR0aW5ncz4oJ2FuZ3VsYXJmaXJlMi5maXJlc3RvcmUuc2V0dGluZ3MnKTtcblxuLyoqXG4gKiBBIHV0aWxpdHkgbWV0aG9kcyBmb3IgYXNzb2NpYXRpbmcgYSBjb2xsZWN0aW9uIHJlZmVyZW5jZSB3aXRoXG4gKiBhIHF1ZXJ5LlxuICpcbiAqIEBwYXJhbSBjb2xsZWN0aW9uUmVmIC0gQSBjb2xsZWN0aW9uIHJlZmVyZW5jZSB0byBxdWVyeVxuICogQHBhcmFtIHF1ZXJ5Rm4gLSBUaGUgY2FsbGJhY2sgdG8gY3JlYXRlIGEgcXVlcnlcbiAqXG4gKiBFeGFtcGxlOlxuICogY29uc3QgeyBxdWVyeSwgcmVmIH0gPSBhc3NvY2lhdGVRdWVyeShkb2NSZWYuY29sbGVjdGlvbignaXRlbXMnKSwgcmVmID0+IHtcbiAqICByZXR1cm4gcmVmLndoZXJlKCdhZ2UnLCAnPCcsIDIwMCk7XG4gKiB9KTtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFzc29jaWF0ZVF1ZXJ5KGNvbGxlY3Rpb25SZWY6IENvbGxlY3Rpb25SZWZlcmVuY2UsIHF1ZXJ5Rm4gPSByZWYgPT4gcmVmKTogQXNzb2NpYXRlZFJlZmVyZW5jZSB7XG4gIGNvbnN0IHF1ZXJ5ID0gcXVlcnlGbihjb2xsZWN0aW9uUmVmKTtcbiAgY29uc3QgcmVmID0gY29sbGVjdGlvblJlZjtcbiAgcmV0dXJuIHsgcXVlcnksIHJlZiB9O1xufVxuXG4vKipcbiAqIEFuZ3VsYXJGaXJlc3RvcmUgU2VydmljZVxuICpcbiAqIFRoaXMgc2VydmljZSBpcyB0aGUgbWFpbiBlbnRyeSBwb2ludCBmb3IgdGhpcyBmZWF0dXJlIG1vZHVsZS4gSXQgcHJvdmlkZXNcbiAqIGFuIEFQSSBmb3IgY3JlYXRpbmcgQ29sbGVjdGlvbiBhbmQgUmVmZXJlbmNlIHNlcnZpY2VzLiBUaGVzZSBzZXJ2aWNlcyBjYW5cbiAqIHRoZW4gYmUgdXNlZCB0byBkbyBkYXRhIHVwZGF0ZXMgYW5kIG9ic2VydmFibGUgc3RyZWFtcyBvZiB0aGUgZGF0YS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuICogaW1wb3J0IHsgQW5ndWxhckZpcmVzdG9yZSwgQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb24sIEFuZ3VsYXJGaXJlc3RvcmVEb2N1bWVudCB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvZmlyZXN0b3JlJztcbiAqIGltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuICogaW1wb3J0IHsgZnJvbSB9IGZyb20gJ3J4anMvb2JzZXJ2YWJsZSc7XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnYXBwLW15LWNvbXBvbmVudCcsXG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICA8aDI+SXRlbXMgZm9yIHt7IChwcm9maWxlIHwgYXN5bmMpPy5uYW1lIH19XG4gKiAgICA8dWw+XG4gKiAgICAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXMgfCBhc3luY1wiPnt7IGl0ZW0ubmFtZSB9fTwvbGk+XG4gKiAgICA8L3VsPlxuICogICAgPGRpdiBjbGFzcz1cImNvbnRyb2wtaW5wdXRcIj5cbiAqICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiICNpdGVtbmFtZSAvPlxuICogICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiYWRkSXRlbShpdGVtbmFtZS52YWx1ZSlcIj5BZGQgSXRlbTwvYnV0dG9uPlxuICogICAgPC9kaXY+XG4gKiAgIGBcbiAqIH0pXG4gKiBleHBvcnQgY2xhc3MgTXlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICpcbiAqICAgLy8gc2VydmljZXMgZm9yIGRhdGEgb3BlcmF0aW9ucyBhbmQgZGF0YSBzdHJlYW1pbmdcbiAqICAgcHJpdmF0ZSByZWFkb25seSBpdGVtc1JlZjogQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb248SXRlbT47XG4gKiAgIHByaXZhdGUgcmVhZG9ubHkgcHJvZmlsZVJlZjogQW5ndWxhckZpcmVzdG9yZURvY3VtZW50PFByb2ZpbGU+O1xuICpcbiAqICAgLy8gb2JzZXJ2YWJsZXMgZm9yIHRlbXBsYXRlXG4gKiAgIGl0ZW1zOiBPYnNlcnZhYmxlPEl0ZW1bXT47XG4gKiAgIHByb2ZpbGU6IE9ic2VydmFibGU8UHJvZmlsZT47XG4gKlxuICogICAvLyBpbmplY3QgbWFpbiBzZXJ2aWNlXG4gKiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgYWZzOiBBbmd1bGFyRmlyZXN0b3JlKSB7fVxuICpcbiAqICAgbmdPbkluaXQoKSB7XG4gKiAgICAgdGhpcy5pdGVtc1JlZiA9IGFmcy5jb2xsZWN0aW9uKCdpdGVtcycsIHJlZiA9PiByZWYud2hlcmUoJ3VzZXInLCAnPT0nLCAnZGF2aWRlYXN0JykubGltaXQoMTApKTtcbiAqICAgICB0aGlzLml0ZW1zID0gdGhpcy5pdGVtc1JlZi52YWx1ZUNoYW5nZXMoKS5tYXAoc25hcCA9PiBzbmFwLmRvY3MubWFwKGRhdGEgPT4gZG9jLmRhdGEoKSkpO1xuICogICAgIC8vIHRoaXMuaXRlbXMgPSBmcm9tKHRoaXMuaXRlbXNSZWYpOyAvLyB5b3UgY2FuIGFsc28gZG8gdGhpcyB3aXRoIG5vIG1hcHBpbmdcbiAqXG4gKiAgICAgdGhpcy5wcm9maWxlUmVmID0gYWZzLmRvYygndXNlcnMvZGF2aWRlYXN0Jyk7XG4gKiAgICAgdGhpcy5wcm9maWxlID0gdGhpcy5wcm9maWxlUmVmLnZhbHVlQ2hhbmdlcygpO1xuICogICB9XG4gKlxuICogICBhZGRJdGVtKG5hbWU6IHN0cmluZykge1xuICogICAgIGNvbnN0IHVzZXIgPSAnZGF2aWRlYXN0JztcbiAqICAgICB0aGlzLml0ZW1zUmVmLmFkZCh7IG5hbWUsIHVzZXIgfSk7XG4gKiAgIH1cbiAqIH1cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAnYW55J1xufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZXN0b3JlIHtcbiAgcHVibGljIHJlYWRvbmx5IGZpcmVzdG9yZTogZmlyZWJhc2UuZmlyZXN0b3JlLkZpcmVzdG9yZTtcbiAgcHVibGljIHJlYWRvbmx5IHBlcnNpc3RlbmNlRW5hYmxlZCQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHB1YmxpYyByZWFkb25seSBzY2hlZHVsZXJzOiDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycztcbiAgcHVibGljIHJlYWRvbmx5IGtlZXBVbnN0YWJsZVVudGlsRmlyc3Q6IDxUPihvYnM6IE9ic2VydmFibGU8VD4pID0+IE9ic2VydmFibGU8VD47XG5cbiAgLyoqXG4gICAqIEVhY2ggRmVhdHVyZSBvZiBBbmd1bGFyRmlyZSBoYXMgYSBGaXJlYmFzZUFwcCBpbmplY3RlZC4gVGhpcyB3YXkgd2VcbiAgICogZG9uJ3QgcmVseSBvbiB0aGUgbWFpbiBGaXJlYmFzZSBBcHAgaW5zdGFuY2UgYW5kIHdlIGNhbiBjcmVhdGUgbmFtZWRcbiAgICogYXBwcyBhbmQgdXNlIG11bHRpcGxlIGFwcHMuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEZJUkVCQVNFX09QVElPTlMpIG9wdGlvbnM6IEZpcmViYXNlT3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEZJUkVCQVNFX0FQUF9OQU1FKSBuYW1lT3JDb25maWc6IHN0cmluZyB8IEZpcmViYXNlQXBwQ29uZmlnIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEVOQUJMRV9QRVJTSVNURU5DRSkgc2hvdWxkRW5hYmxlUGVyc2lzdGVuY2U6IGJvb2xlYW4gfCBudWxsLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoU0VUVElOR1MpIHNldHRpbmdzOiBTZXR0aW5ncyB8IG51bGwsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICB6b25lOiBOZ1pvbmUsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChQRVJTSVNURU5DRV9TRVRUSU5HUykgcGVyc2lzdGVuY2VTZXR0aW5nczogUGVyc2lzdGVuY2VTZXR0aW5ncyB8IG51bGxcbiAgKSB7XG4gICAgdGhpcy5zY2hlZHVsZXJzID0gbmV3IMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzKHpvbmUpO1xuICAgIHRoaXMua2VlcFVuc3RhYmxlVW50aWxGaXJzdCA9IMm1a2VlcFVuc3RhYmxlVW50aWxGaXJzdEZhY3RvcnkodGhpcy5zY2hlZHVsZXJzKTtcblxuICAgIHRoaXMuZmlyZXN0b3JlID0gem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCBhcHAgPSDJtWZpcmViYXNlQXBwRmFjdG9yeShvcHRpb25zLCB6b25lLCBuYW1lT3JDb25maWcpO1xuICAgICAgLy8gSU5WRVNUSUdBVEUgdGhpcyBzZWVtcyB0byBiZSByZXF1aXJlZCBiZWNhdXNlIGluIHRoZSBicm93c2VyIGJ1aWxkIHJlZ2lzdGVyRmlyZXN0b3JlIGlzIGFuIE9iamVjdD9cbiAgICAgIC8vICAgICAgICAgICAgIHNlZW1zIGxpa2Ugd2UncmUgZmlnaHRpbmcgbmdjYy4gSW4gdGhlIHNlcnZlciBmaXJlc3RvcmUoKSBpc24ndCBhdmFpbGFibGUsIHNvIEkgaGF2ZSB0byByZWdpc3RlclxuICAgICAgLy8gICAgICAgICAgICAgaW4gdGhlIGJyb3dzZXIgcmVnaXN0ZXJGaXJlc3RvcmUgaXMgbm90IGEgZnVuY3Rpb24uLi4gbWF5YmUgdGhpcyBpcyBhbiB1bmRlcmx5aW5nIGZpcmViYXNlLWpzLXNkayBpc3N1ZVxuICAgICAgaWYgKCdyZWdpc3RlckZpcmVzdG9yZScgaW4gYXRGaXJlc3RvcmUpIHtcbiAgICAgICAgKGF0RmlyZXN0b3JlIGFzIGFueSkucmVnaXN0ZXJGaXJlc3RvcmUoZmlyZWJhc2UgYXMgYW55KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZpcmVzdG9yZSA9IGFwcC5maXJlc3RvcmUoKTtcbiAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICBmaXJlc3RvcmUuc2V0dGluZ3Moc2V0dGluZ3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZpcmVzdG9yZTtcbiAgICB9KTtcblxuICAgIGlmIChzaG91bGRFbmFibGVQZXJzaXN0ZW5jZSAmJiAhaXNQbGF0Zm9ybVNlcnZlcihwbGF0Zm9ybUlkKSkge1xuICAgICAgLy8gV2UgbmVlZCB0byB0cnkvY2F0Y2ggaGVyZSBiZWNhdXNlIG5vdCBhbGwgZW5hYmxlUGVyc2lzdGVuY2UoKSBmYWlsdXJlcyBhcmUgY2F1Z2h0XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmlyZWJhc2UvZmlyZWJhc2UtanMtc2RrL2lzc3Vlcy82MDhcbiAgICAgIGNvbnN0IGVuYWJsZVBlcnNpc3RlbmNlID0gKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBmcm9tKHRoaXMuZmlyZXN0b3JlLmVuYWJsZVBlcnNpc3RlbmNlKHBlcnNpc3RlbmNlU2V0dGluZ3MgfHwgdW5kZWZpbmVkKS50aGVuKCgpID0+IHRydWUsICgpID0+IGZhbHNlKSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXR1cm4gb2YoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdGhpcy5wZXJzaXN0ZW5jZUVuYWJsZWQkID0gem9uZS5ydW5PdXRzaWRlQW5ndWxhcihlbmFibGVQZXJzaXN0ZW5jZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGVyc2lzdGVuY2VFbmFibGVkJCA9IG9mKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgcmVmZXJlbmNlIHRvIGEgRmlyZXN0b3JlIENvbGxlY3Rpb24gYmFzZWQgb24gYSBwYXRoIG9yXG4gICAqIENvbGxlY3Rpb25SZWZlcmVuY2UgYW5kIGFuIG9wdGlvbmFsIHF1ZXJ5IGZ1bmN0aW9uIHRvIG5hcnJvdyB0aGUgcmVzdWx0XG4gICAqIHNldC5cbiAgICovXG4gIGNvbGxlY3Rpb248VD4ocGF0aDogc3RyaW5nLCBxdWVyeUZuPzogUXVlcnlGbik6IEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uPFQ+O1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dW5pZmllZC1zaWduYXR1cmVzXG4gIGNvbGxlY3Rpb248VD4ocmVmOiBDb2xsZWN0aW9uUmVmZXJlbmNlLCBxdWVyeUZuPzogUXVlcnlGbik6IEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uPFQ+O1xuICBjb2xsZWN0aW9uPFQ+KHBhdGhPclJlZjogc3RyaW5nIHwgQ29sbGVjdGlvblJlZmVyZW5jZSwgcXVlcnlGbj86IFF1ZXJ5Rm4pOiBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbjxUPiB7XG4gICAgbGV0IGNvbGxlY3Rpb25SZWY6IENvbGxlY3Rpb25SZWZlcmVuY2U7XG4gICAgaWYgKHR5cGVvZiBwYXRoT3JSZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb2xsZWN0aW9uUmVmID0gdGhpcy5maXJlc3RvcmUuY29sbGVjdGlvbihwYXRoT3JSZWYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb2xsZWN0aW9uUmVmID0gcGF0aE9yUmVmO1xuICAgIH1cbiAgICBjb25zdCB7IHJlZiwgcXVlcnkgfSA9IGFzc29jaWF0ZVF1ZXJ5KGNvbGxlY3Rpb25SZWYsIHF1ZXJ5Rm4pO1xuICAgIGNvbnN0IHJlZkluWm9uZSA9IHRoaXMuc2NoZWR1bGVycy5uZ1pvbmUucnVuKCgpID0+IHJlZik7XG4gICAgcmV0dXJuIG5ldyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbjxUPihyZWZJblpvbmUsIHF1ZXJ5LCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSByZWZlcmVuY2UgdG8gYSBGaXJlc3RvcmUgQ29sbGVjdGlvbiBHcm91cCBiYXNlZCBvbiBhIGNvbGxlY3Rpb25JZFxuICAgKiBhbmQgYW4gb3B0aW9uYWwgcXVlcnkgZnVuY3Rpb24gdG8gbmFycm93IHRoZSByZXN1bHRcbiAgICogc2V0LlxuICAgKi9cbiAgY29sbGVjdGlvbkdyb3VwPFQ+KGNvbGxlY3Rpb25JZDogc3RyaW5nLCBxdWVyeUdyb3VwRm4/OiBRdWVyeUdyb3VwRm4pOiBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbkdyb3VwPFQ+IHtcbiAgICBjb25zdCBxdWVyeUZuID0gcXVlcnlHcm91cEZuIHx8IChyZWYgPT4gcmVmKTtcbiAgICBjb25zdCBjb2xsZWN0aW9uR3JvdXA6IFF1ZXJ5ID0gdGhpcy5maXJlc3RvcmUuY29sbGVjdGlvbkdyb3VwKGNvbGxlY3Rpb25JZCk7XG4gICAgcmV0dXJuIG5ldyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbkdyb3VwPFQ+KHF1ZXJ5Rm4oY29sbGVjdGlvbkdyb3VwKSwgdGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgcmVmZXJlbmNlIHRvIGEgRmlyZXN0b3JlIERvY3VtZW50IGJhc2VkIG9uIGEgcGF0aCBvclxuICAgKiBEb2N1bWVudFJlZmVyZW5jZS4gTm90ZSB0aGF0IGRvY3VtZW50cyBhcmUgbm90IHF1ZXJ5YWJsZSBiZWNhdXNlIHRoZXkgYXJlXG4gICAqIHNpbXBseSBvYmplY3RzLiBIb3dldmVyLCBkb2N1bWVudHMgaGF2ZSBzdWItY29sbGVjdGlvbnMgdGhhdCByZXR1cm4gYVxuICAgKiBDb2xsZWN0aW9uIHJlZmVyZW5jZSBhbmQgY2FuIGJlIHF1ZXJpZWQuXG4gICAqL1xuICBkb2M8VD4ocGF0aDogc3RyaW5nKTogQW5ndWxhckZpcmVzdG9yZURvY3VtZW50PFQ+O1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dW5pZmllZC1zaWduYXR1cmVzXG4gIGRvYzxUPihyZWY6IERvY3VtZW50UmVmZXJlbmNlKTogQW5ndWxhckZpcmVzdG9yZURvY3VtZW50PFQ+O1xuICBkb2M8VD4ocGF0aE9yUmVmOiBzdHJpbmcgfCBEb2N1bWVudFJlZmVyZW5jZSk6IEFuZ3VsYXJGaXJlc3RvcmVEb2N1bWVudDxUPiB7XG4gICAgbGV0IHJlZjogRG9jdW1lbnRSZWZlcmVuY2U7XG4gICAgaWYgKHR5cGVvZiBwYXRoT3JSZWYgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZWYgPSB0aGlzLmZpcmVzdG9yZS5kb2MocGF0aE9yUmVmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVmID0gcGF0aE9yUmVmO1xuICAgIH1cbiAgICBjb25zdCByZWZJblpvbmUgPSB0aGlzLnNjaGVkdWxlcnMubmdab25lLnJ1bigoKSA9PiByZWYpO1xuICAgIHJldHVybiBuZXcgQW5ndWxhckZpcmVzdG9yZURvY3VtZW50PFQ+KHJlZkluWm9uZSwgdGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGdlbmVyYXRlZCBGaXJlc3RvcmUgRG9jdW1lbnQgSWQuXG4gICAqL1xuICBjcmVhdGVJZCgpIHtcbiAgICByZXR1cm4gdGhpcy5maXJlc3RvcmUuY29sbGVjdGlvbignXycpLmRvYygpLmlkO1xuICB9XG59XG4iXX0=