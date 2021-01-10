/**
 * @fileoverview added by tsickle
 * Generated from: database.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { getRef } from './utils';
import { createListReference } from './list/create-reference';
import { createObjectReference } from './object/create-reference';
import { FIREBASE_APP_NAME, FIREBASE_OPTIONS, ɵAngularFireSchedulers, ɵfirebaseAppFactory, ɵkeepUnstableUntilFirstFactory } from '@angular/fire';
import 'firebase/database';
import { registerDatabase } from '@firebase/database';
import firebase from 'firebase/app';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
/** @type {?} */
export const URL = new InjectionToken('angularfire2.realtimeDatabaseURL');
export class AngularFireDatabase {
    /**
     * @param {?} options
     * @param {?} nameOrConfig
     * @param {?} databaseURL
     * @param {?} platformId
     * @param {?} zone
     */
    constructor(options, nameOrConfig, databaseURL, 
    // tslint:disable-next-line:ban-types
    platformId, zone) {
        this.schedulers = new ɵAngularFireSchedulers(zone);
        this.keepUnstableUntilFirst = ɵkeepUnstableUntilFirstFactory(this.schedulers);
        this.database = zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const app = ɵfirebaseAppFactory(options, zone, nameOrConfig);
            if (registerDatabase) {
                registerDatabase((/** @type {?} */ (firebase)));
            }
            return app.database(databaseURL || undefined);
        }));
    }
    /**
     * @template T
     * @param {?} pathOrRef
     * @param {?=} queryFn
     * @return {?}
     */
    list(pathOrRef, queryFn) {
        /** @type {?} */
        const ref = getRef(this.database, pathOrRef);
        /** @type {?} */
        let query = ref;
        if (queryFn) {
            query = queryFn(ref);
        }
        return createListReference(query, this);
    }
    /**
     * @template T
     * @param {?} pathOrRef
     * @return {?}
     */
    object(pathOrRef) {
        /** @type {?} */
        const ref = getRef(this.database, pathOrRef);
        return createObjectReference(ref, this);
    }
    /**
     * @return {?}
     */
    createPushId() {
        return this.database.ref().push().key;
    }
}
AngularFireDatabase.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireDatabase.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [URL,] }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone }
];
/** @nocollapse */ AngularFireDatabase.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireDatabase_Factory() { return new AngularFireDatabase(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(URL, 8), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i0.NgZone)); }, token: AngularFireDatabase, providedIn: "any" });
if (false) {
    /** @type {?} */
    AngularFireDatabase.prototype.database;
    /** @type {?} */
    AngularFireDatabase.prototype.schedulers;
    /** @type {?} */
    AngularFireDatabase.prototype.keepUnstableUntilFirst;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiL3dvcmtzcGFjZS9zcmMvZGF0YWJhc2UvIiwic291cmNlcyI6WyJkYXRhYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBR2hCLHNCQUFzQixFQUN0QixtQkFBbUIsRUFDbkIsOEJBQThCLEVBQy9CLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdEQsT0FBTyxRQUFRLE1BQU0sY0FBYyxDQUFDOzs7O0FBRXBDLE1BQU0sT0FBTyxHQUFHLEdBQUcsSUFBSSxjQUFjLENBQVMsa0NBQWtDLENBQUM7QUFLakYsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7Ozs7SUFNOUIsWUFDNEIsT0FBd0IsRUFDWCxZQUEyRCxFQUN6RSxXQUEwQjtJQUNuRCxxQ0FBcUM7SUFDaEIsVUFBa0IsRUFDdkMsSUFBWTtRQUVaLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcsOEJBQThCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTlFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQjs7O1FBQUMsR0FBRyxFQUFFOztrQkFDcEMsR0FBRyxHQUFHLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsWUFBWSxDQUFDO1lBQzVELElBQUksZ0JBQWdCLEVBQUU7Z0JBQ3BCLGdCQUFnQixDQUFDLG1CQUFBLFFBQVEsRUFBTyxDQUFDLENBQUM7YUFDbkM7WUFDRCxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxJQUFJLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQUVELElBQUksQ0FBSSxTQUF3QixFQUFFLE9BQWlCOztjQUMzQyxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDOztZQUN4QyxLQUFLLEdBQWtCLEdBQUc7UUFDOUIsSUFBSSxPQUFPLEVBQUU7WUFDWCxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsT0FBTyxtQkFBbUIsQ0FBSSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFJLFNBQXdCOztjQUMxQixHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO1FBQzVDLE9BQU8scUJBQXFCLENBQUksR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUN4QyxDQUFDOzs7WUE3Q0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxLQUFLO2FBQ2xCOzs7OzRDQVFJLE1BQU0sU0FBQyxnQkFBZ0I7NENBQ3ZCLFFBQVEsWUFBSSxNQUFNLFNBQUMsaUJBQWlCOzRDQUNwQyxRQUFRLFlBQUksTUFBTSxTQUFDLEdBQUc7WUFFVSxNQUFNLHVCQUF0QyxNQUFNLFNBQUMsV0FBVztZQW5Dc0IsTUFBTTs7Ozs7SUF5QmpELHVDQUFxRDs7SUFFckQseUNBQW1EOztJQUNuRCxxREFBa0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQW5ndWxhckZpcmVMaXN0LCBBbmd1bGFyRmlyZU9iamVjdCwgRGF0YWJhc2VRdWVyeSwgUGF0aFJlZmVyZW5jZSwgUXVlcnlGbiB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBnZXRSZWYgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGNyZWF0ZUxpc3RSZWZlcmVuY2UgfSBmcm9tICcuL2xpc3QvY3JlYXRlLXJlZmVyZW5jZSc7XG5pbXBvcnQgeyBjcmVhdGVPYmplY3RSZWZlcmVuY2UgfSBmcm9tICcuL29iamVjdC9jcmVhdGUtcmVmZXJlbmNlJztcbmltcG9ydCB7XG4gIEZJUkVCQVNFX0FQUF9OQU1FLFxuICBGSVJFQkFTRV9PUFRJT05TLFxuICBGaXJlYmFzZUFwcENvbmZpZyxcbiAgRmlyZWJhc2VPcHRpb25zLFxuICDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyxcbiAgybVmaXJlYmFzZUFwcEZhY3RvcnksXG4gIMm1a2VlcFVuc3RhYmxlVW50aWxGaXJzdEZhY3Rvcnlcbn0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgJ2ZpcmViYXNlL2RhdGFiYXNlJztcbmltcG9ydCB7IHJlZ2lzdGVyRGF0YWJhc2UgfSBmcm9tICdAZmlyZWJhc2UvZGF0YWJhc2UnO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5cbmV4cG9ydCBjb25zdCBVUkwgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignYW5ndWxhcmZpcmUyLnJlYWx0aW1lRGF0YWJhc2VVUkwnKTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAnYW55J1xufSlcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZURhdGFiYXNlIHtcbiAgcHVibGljIHJlYWRvbmx5IGRhdGFiYXNlOiBmaXJlYmFzZS5kYXRhYmFzZS5EYXRhYmFzZTtcblxuICBwdWJsaWMgcmVhZG9ubHkgc2NoZWR1bGVyczogybVBbmd1bGFyRmlyZVNjaGVkdWxlcnM7XG4gIHB1YmxpYyByZWFkb25seSBrZWVwVW5zdGFibGVVbnRpbEZpcnN0OiA8VD4ob2JzJDogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEZJUkVCQVNFX09QVElPTlMpIG9wdGlvbnM6IEZpcmViYXNlT3B0aW9ucyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEZJUkVCQVNFX0FQUF9OQU1FKSBuYW1lT3JDb25maWc6IHN0cmluZyB8IEZpcmViYXNlQXBwQ29uZmlnIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFVSTCkgZGF0YWJhc2VVUkw6IHN0cmluZyB8IG51bGwsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmJhbi10eXBlc1xuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IE9iamVjdCxcbiAgICB6b25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgdGhpcy5zY2hlZHVsZXJzID0gbmV3IMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzKHpvbmUpO1xuICAgIHRoaXMua2VlcFVuc3RhYmxlVW50aWxGaXJzdCA9IMm1a2VlcFVuc3RhYmxlVW50aWxGaXJzdEZhY3RvcnkodGhpcy5zY2hlZHVsZXJzKTtcblxuICAgIHRoaXMuZGF0YWJhc2UgPSB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGNvbnN0IGFwcCA9IMm1ZmlyZWJhc2VBcHBGYWN0b3J5KG9wdGlvbnMsIHpvbmUsIG5hbWVPckNvbmZpZyk7XG4gICAgICBpZiAocmVnaXN0ZXJEYXRhYmFzZSkge1xuICAgICAgICByZWdpc3RlckRhdGFiYXNlKGZpcmViYXNlIGFzIGFueSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXBwLmRhdGFiYXNlKGRhdGFiYXNlVVJMIHx8IHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH1cblxuICBsaXN0PFQ+KHBhdGhPclJlZjogUGF0aFJlZmVyZW5jZSwgcXVlcnlGbj86IFF1ZXJ5Rm4pOiBBbmd1bGFyRmlyZUxpc3Q8VD4ge1xuICAgIGNvbnN0IHJlZiA9IGdldFJlZih0aGlzLmRhdGFiYXNlLCBwYXRoT3JSZWYpO1xuICAgIGxldCBxdWVyeTogRGF0YWJhc2VRdWVyeSA9IHJlZjtcbiAgICBpZiAocXVlcnlGbikge1xuICAgICAgcXVlcnkgPSBxdWVyeUZuKHJlZik7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVMaXN0UmVmZXJlbmNlPFQ+KHF1ZXJ5LCB0aGlzKTtcbiAgfVxuXG4gIG9iamVjdDxUPihwYXRoT3JSZWY6IFBhdGhSZWZlcmVuY2UpOiBBbmd1bGFyRmlyZU9iamVjdDxUPiB7XG4gICAgY29uc3QgcmVmID0gZ2V0UmVmKHRoaXMuZGF0YWJhc2UsIHBhdGhPclJlZik7XG4gICAgcmV0dXJuIGNyZWF0ZU9iamVjdFJlZmVyZW5jZTxUPihyZWYsIHRoaXMpO1xuICB9XG5cbiAgY3JlYXRlUHVzaElkKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFiYXNlLnJlZigpLnB1c2goKS5rZXk7XG4gIH1cblxufVxuXG5leHBvcnQge1xuICBQYXRoUmVmZXJlbmNlLFxuICBEYXRhYmFzZVNuYXBzaG90LFxuICBDaGlsZEV2ZW50LFxuICBMaXN0ZW5FdmVudCxcbiAgUXVlcnlGbixcbiAgQW5ndWxhckZpcmVMaXN0LFxuICBBbmd1bGFyRmlyZU9iamVjdCxcbiAgQW5ndWxhckZpcmVBY3Rpb24sXG4gIEFjdGlvbixcbiAgU25hcHNob3RBY3Rpb25cbn0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbiJdfQ==