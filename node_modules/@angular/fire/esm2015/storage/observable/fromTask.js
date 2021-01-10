/**
 * @fileoverview added by tsickle
 * Generated from: observable/fromTask.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Observable } from 'rxjs';
/**
 * @param {?} task
 * @return {?}
 */
export function fromTask(task) {
    return new Observable((/**
     * @param {?} subscriber
     * @return {?}
     */
    subscriber => {
        /** @type {?} */
        const progress = (/**
         * @param {?} snap
         * @return {?}
         */
        (snap) => subscriber.next(snap));
        /** @type {?} */
        const error = (/**
         * @param {?} e
         * @return {?}
         */
        e => subscriber.error(e));
        /** @type {?} */
        const complete = (/**
         * @return {?}
         */
        () => subscriber.complete());
        task.on('state_changed', progress, error, (/**
         * @return {?}
         */
        () => {
            progress(task.snapshot);
            complete();
        }));
        return (/**
         * @return {?}
         */
        () => task.cancel());
    }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVRhc2suanMiLCJzb3VyY2VSb290IjoiL3dvcmtzcGFjZS9zcmMvc3RvcmFnZS8iLCJzb3VyY2VzIjpbIm9ic2VydmFibGUvZnJvbVRhc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDOzs7OztBQUdsQyxNQUFNLFVBQVUsUUFBUSxDQUFDLElBQWdCO0lBQ3ZDLE9BQU8sSUFBSSxVQUFVOzs7O0lBQXFCLFVBQVUsQ0FBQyxFQUFFOztjQUMvQyxRQUFROzs7O1FBQUcsQ0FBQyxJQUF3QixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBOztjQUM5RCxLQUFLOzs7O1FBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBOztjQUNoQyxRQUFROzs7UUFBRyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDNUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLEtBQUs7OztRQUFFLEdBQUcsRUFBRTtZQUM3QyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hCLFFBQVEsRUFBRSxDQUFDO1FBQ2IsQ0FBQyxFQUFDLENBQUM7UUFDSDs7O1FBQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDO0lBQzdCLENBQUMsRUFBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFVwbG9hZFRhc2ssIFVwbG9hZFRhc2tTbmFwc2hvdCB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVRhc2sodGFzazogVXBsb2FkVGFzaykge1xuICByZXR1cm4gbmV3IE9ic2VydmFibGU8VXBsb2FkVGFza1NuYXBzaG90PihzdWJzY3JpYmVyID0+IHtcbiAgICBjb25zdCBwcm9ncmVzcyA9IChzbmFwOiBVcGxvYWRUYXNrU25hcHNob3QpID0+IHN1YnNjcmliZXIubmV4dChzbmFwKTtcbiAgICBjb25zdCBlcnJvciA9IGUgPT4gc3Vic2NyaWJlci5lcnJvcihlKTtcbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICB0YXNrLm9uKCdzdGF0ZV9jaGFuZ2VkJywgcHJvZ3Jlc3MsIGVycm9yLCAoKSA9PiB7XG4gICAgICBwcm9ncmVzcyh0YXNrLnNuYXBzaG90KTtcbiAgICAgIGNvbXBsZXRlKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHRhc2suY2FuY2VsKCk7XG4gIH0pO1xufVxuIl19