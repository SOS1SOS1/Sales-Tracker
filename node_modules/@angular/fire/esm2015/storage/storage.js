/**
 * @fileoverview added by tsickle
 * Generated from: storage.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, InjectionToken, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { createStorageRef } from './ref';
import { FIREBASE_APP_NAME, FIREBASE_OPTIONS, ɵAngularFireSchedulers, ɵfirebaseAppFactory, ɵkeepUnstableUntilFirstFactory } from '@angular/fire';
import 'firebase/storage';
import firebase from 'firebase/app';
import { registerStorage } from '@firebase/storage';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
/** @type {?} */
export const BUCKET = new InjectionToken('angularfire2.storageBucket');
/**
 * AngularFireStorage Service
 *
 * This service is the main entry point for this feature module. It provides
 * an API for uploading and downloading binary files from Cloud Storage for
 * Firebase.
 */
export class AngularFireStorage {
    /**
     * @param {?} options
     * @param {?} nameOrConfig
     * @param {?} storageBucket
     * @param {?} platformId
     * @param {?} zone
     */
    constructor(options, nameOrConfig, storageBucket, 
    // tslint:disable-next-line:ban-types
    platformId, zone) {
        this.schedulers = new ɵAngularFireSchedulers(zone);
        this.keepUnstableUntilFirst = ɵkeepUnstableUntilFirstFactory(this.schedulers);
        this.storage = zone.runOutsideAngular((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const app = ɵfirebaseAppFactory(options, zone, nameOrConfig);
            if (registerStorage) {
                registerStorage((/** @type {?} */ (firebase)));
            }
            return app.storage(storageBucket || undefined);
        }));
    }
    /**
     * @param {?} path
     * @return {?}
     */
    ref(path) {
        return createStorageRef(this.storage.ref(path), this.schedulers, this.keepUnstableUntilFirst);
    }
    /**
     * @param {?} path
     * @param {?} data
     * @param {?=} metadata
     * @return {?}
     */
    upload(path, data, metadata) {
        /** @type {?} */
        const storageRef = this.storage.ref(path);
        /** @type {?} */
        const ref = createStorageRef(storageRef, this.schedulers, this.keepUnstableUntilFirst);
        return ref.put(data, metadata);
    }
}
AngularFireStorage.decorators = [
    { type: Injectable, args: [{
                providedIn: 'any'
            },] }
];
/** @nocollapse */
AngularFireStorage.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [FIREBASE_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [FIREBASE_APP_NAME,] }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [BUCKET,] }] },
    { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] },
    { type: NgZone }
];
/** @nocollapse */ AngularFireStorage.ɵprov = i0.ɵɵdefineInjectable({ factory: function AngularFireStorage_Factory() { return new AngularFireStorage(i0.ɵɵinject(i1.FIREBASE_OPTIONS), i0.ɵɵinject(i1.FIREBASE_APP_NAME, 8), i0.ɵɵinject(BUCKET, 8), i0.ɵɵinject(i0.PLATFORM_ID), i0.ɵɵinject(i0.NgZone)); }, token: AngularFireStorage, providedIn: "any" });
if (false) {
    /** @type {?} */
    AngularFireStorage.prototype.storage;
    /** @type {?} */
    AngularFireStorage.prototype.keepUnstableUntilFirst;
    /** @type {?} */
    AngularFireStorage.prototype.schedulers;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIvd29ya3NwYWNlL3NyYy9zdG9yYWdlLyIsInNvdXJjZXMiOlsic3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFFekMsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFHaEIsc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQiw4QkFBOEIsRUFDL0IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxrQkFBa0IsQ0FBQztBQUMxQixPQUFPLFFBQVEsTUFBTSxjQUFjLENBQUM7QUFDcEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7O0FBRXBELE1BQU0sT0FBTyxNQUFNLEdBQUcsSUFBSSxjQUFjLENBQVMsNEJBQTRCLENBQUM7Ozs7Ozs7O0FBWTlFLE1BQU0sT0FBTyxrQkFBa0I7Ozs7Ozs7O0lBTTdCLFlBQzRCLE9BQXdCLEVBQ1gsWUFBMkQsRUFDdEUsYUFBNEI7SUFDeEQscUNBQXFDO0lBQ2hCLFVBQWtCLEVBQ3ZDLElBQVk7UUFFWixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLHNCQUFzQixHQUFHLDhCQUE4QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU5RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUI7OztRQUFDLEdBQUcsRUFBRTs7a0JBQ25DLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQztZQUM1RCxJQUFJLGVBQWUsRUFBRTtnQkFDbkIsZUFBZSxDQUFDLG1CQUFBLFFBQVEsRUFBTyxDQUFDLENBQUM7YUFDbEM7WUFDRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsYUFBYSxJQUFJLFNBQVMsQ0FBQyxDQUFDO1FBQ2pELENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxHQUFHLENBQUMsSUFBWTtRQUNkLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUNoRyxDQUFDOzs7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQVksRUFBRSxJQUFTLEVBQUUsUUFBeUI7O2NBQ2pELFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7O2NBQ25DLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsc0JBQXNCLENBQUM7UUFDdEYsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7WUFyQ0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxLQUFLO2FBQ2xCOzs7OzRDQVFJLE1BQU0sU0FBQyxnQkFBZ0I7NENBQ3ZCLFFBQVEsWUFBSSxNQUFNLFNBQUMsaUJBQWlCOzRDQUNwQyxRQUFRLFlBQUksTUFBTSxTQUFDLE1BQU07WUFFTyxNQUFNLHVCQUF0QyxNQUFNLFNBQUMsV0FBVztZQXhDc0IsTUFBTTs7Ozs7SUE4QmpELHFDQUFrRDs7SUFFbEQsb0RBQWlGOztJQUNqRix3Q0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmFnZVJlZiB9IGZyb20gJy4vcmVmJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIEZJUkVCQVNFX0FQUF9OQU1FLFxuICBGSVJFQkFTRV9PUFRJT05TLFxuICBGaXJlYmFzZUFwcENvbmZpZyxcbiAgRmlyZWJhc2VPcHRpb25zLFxuICDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyxcbiAgybVmaXJlYmFzZUFwcEZhY3RvcnksXG4gIMm1a2VlcFVuc3RhYmxlVW50aWxGaXJzdEZhY3Rvcnlcbn0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBVcGxvYWRNZXRhZGF0YSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgJ2ZpcmViYXNlL3N0b3JhZ2UnO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyByZWdpc3RlclN0b3JhZ2UgfSBmcm9tICdAZmlyZWJhc2Uvc3RvcmFnZSc7XG5cbmV4cG9ydCBjb25zdCBCVUNLRVQgPSBuZXcgSW5qZWN0aW9uVG9rZW48c3RyaW5nPignYW5ndWxhcmZpcmUyLnN0b3JhZ2VCdWNrZXQnKTtcblxuLyoqXG4gKiBBbmd1bGFyRmlyZVN0b3JhZ2UgU2VydmljZVxuICpcbiAqIFRoaXMgc2VydmljZSBpcyB0aGUgbWFpbiBlbnRyeSBwb2ludCBmb3IgdGhpcyBmZWF0dXJlIG1vZHVsZS4gSXQgcHJvdmlkZXNcbiAqIGFuIEFQSSBmb3IgdXBsb2FkaW5nIGFuZCBkb3dubG9hZGluZyBiaW5hcnkgZmlsZXMgZnJvbSBDbG91ZCBTdG9yYWdlIGZvclxuICogRmlyZWJhc2UuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ2FueSdcbn0pXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpcmVTdG9yYWdlIHtcbiAgcHVibGljIHJlYWRvbmx5IHN0b3JhZ2U6IGZpcmViYXNlLnN0b3JhZ2UuU3RvcmFnZTtcblxuICBwdWJsaWMgcmVhZG9ubHkga2VlcFVuc3RhYmxlVW50aWxGaXJzdDogPFQ+KG9iczogT2JzZXJ2YWJsZTxUPikgPT4gT2JzZXJ2YWJsZTxUPjtcbiAgcHVibGljIHJlYWRvbmx5IHNjaGVkdWxlcnM6IMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRklSRUJBU0VfT1BUSU9OUykgb3B0aW9uczogRmlyZWJhc2VPcHRpb25zLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoRklSRUJBU0VfQVBQX05BTUUpIG5hbWVPckNvbmZpZzogc3RyaW5nIHwgRmlyZWJhc2VBcHBDb25maWcgfCBudWxsIHwgdW5kZWZpbmVkLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoQlVDS0VUKSBzdG9yYWdlQnVja2V0OiBzdHJpbmcgfCBudWxsLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcbiAgICBASW5qZWN0KFBMQVRGT1JNX0lEKSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgem9uZTogTmdab25lXG4gICkge1xuICAgIHRoaXMuc2NoZWR1bGVycyA9IG5ldyDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyh6b25lKTtcbiAgICB0aGlzLmtlZXBVbnN0YWJsZVVudGlsRmlyc3QgPSDJtWtlZXBVbnN0YWJsZVVudGlsRmlyc3RGYWN0b3J5KHRoaXMuc2NoZWR1bGVycyk7XG5cbiAgICB0aGlzLnN0b3JhZ2UgPSB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGNvbnN0IGFwcCA9IMm1ZmlyZWJhc2VBcHBGYWN0b3J5KG9wdGlvbnMsIHpvbmUsIG5hbWVPckNvbmZpZyk7XG4gICAgICBpZiAocmVnaXN0ZXJTdG9yYWdlKSB7XG4gICAgICAgIHJlZ2lzdGVyU3RvcmFnZShmaXJlYmFzZSBhcyBhbnkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFwcC5zdG9yYWdlKHN0b3JhZ2VCdWNrZXQgfHwgdW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlZihwYXRoOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gY3JlYXRlU3RvcmFnZVJlZih0aGlzLnN0b3JhZ2UucmVmKHBhdGgpLCB0aGlzLnNjaGVkdWxlcnMsIHRoaXMua2VlcFVuc3RhYmxlVW50aWxGaXJzdCk7XG4gIH1cblxuICB1cGxvYWQocGF0aDogc3RyaW5nLCBkYXRhOiBhbnksIG1ldGFkYXRhPzogVXBsb2FkTWV0YWRhdGEpIHtcbiAgICBjb25zdCBzdG9yYWdlUmVmID0gdGhpcy5zdG9yYWdlLnJlZihwYXRoKTtcbiAgICBjb25zdCByZWYgPSBjcmVhdGVTdG9yYWdlUmVmKHN0b3JhZ2VSZWYsIHRoaXMuc2NoZWR1bGVycywgdGhpcy5rZWVwVW5zdGFibGVVbnRpbEZpcnN0KTtcbiAgICByZXR1cm4gcmVmLnB1dChkYXRhLCBtZXRhZGF0YSk7XG4gIH1cblxufVxuIl19