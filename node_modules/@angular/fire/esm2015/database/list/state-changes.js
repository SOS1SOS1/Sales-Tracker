/**
 * @fileoverview added by tsickle
 * Generated from: list/state-changes.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { fromRef } from '../observable/fromRef';
import { validateEventsArray } from './utils';
import { merge } from 'rxjs';
/**
 * @template T
 * @param {?} query
 * @param {?=} events
 * @param {?=} scheduler
 * @return {?}
 */
export function stateChanges(query, events, scheduler) {
    events = validateEventsArray(events);
    /** @type {?} */
    const childEvent$ = events.map((/**
     * @param {?} event
     * @return {?}
     */
    event => fromRef(query, event, 'on', scheduler)));
    return merge(...childEvent$);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUtY2hhbmdlcy5qcyIsInNvdXJjZVJvb3QiOiIvd29ya3NwYWNlL3NyYy9kYXRhYmFzZS8iLCJzb3VyY2VzIjpbImxpc3Qvc3RhdGUtY2hhbmdlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNoRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDOUMsT0FBTyxFQUFFLEtBQUssRUFBaUIsTUFBTSxNQUFNLENBQUM7Ozs7Ozs7O0FBRTVDLE1BQU0sVUFBVSxZQUFZLENBQUksS0FBb0IsRUFBRSxNQUFxQixFQUFFLFNBQXlCO0lBQ3BHLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7VUFDL0IsV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHOzs7O0lBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUksS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQUM7SUFDbEYsT0FBTyxLQUFLLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQztBQUMvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hpbGRFdmVudCwgRGF0YWJhc2VRdWVyeSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgZnJvbVJlZiB9IGZyb20gJy4uL29ic2VydmFibGUvZnJvbVJlZic7XG5pbXBvcnQgeyB2YWxpZGF0ZUV2ZW50c0FycmF5IH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBtZXJnZSwgU2NoZWR1bGVyTGlrZSB9IGZyb20gJ3J4anMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc3RhdGVDaGFuZ2VzPFQ+KHF1ZXJ5OiBEYXRhYmFzZVF1ZXJ5LCBldmVudHM/OiBDaGlsZEV2ZW50W10sIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpIHtcbiAgZXZlbnRzID0gdmFsaWRhdGVFdmVudHNBcnJheShldmVudHMpO1xuICBjb25zdCBjaGlsZEV2ZW50JCA9IGV2ZW50cy5tYXAoZXZlbnQgPT4gZnJvbVJlZjxUPihxdWVyeSwgZXZlbnQsICdvbicsIHNjaGVkdWxlcikpO1xuICByZXR1cm4gbWVyZ2UoLi4uY2hpbGRFdmVudCQpO1xufVxuIl19