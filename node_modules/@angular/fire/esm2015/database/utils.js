/**
 * @fileoverview added by tsickle
 * Generated from: utils.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
export function isString(value) {
    return typeof value === 'string';
}
/**
 * @param {?} value
 * @return {?}
 */
export function isFirebaseDataSnapshot(value) {
    return typeof value.exportVal === 'function';
}
/**
 * @param {?} obj
 * @return {?}
 */
export function isNil(obj) {
    return obj === undefined || obj === null;
}
/**
 * @param {?} value
 * @return {?}
 */
export function isFirebaseRef(value) {
    return typeof value.set === 'function';
}
/**
 * Returns a database reference given a Firebase App and an
 * absolute or relative path.
 * @param {?} database - Firebase Database
 * @param {?} pathRef - Database path, relative or absolute
 * @return {?}
 */
export function getRef(database, pathRef) {
    // if a db ref was passed in, just return it
    return isFirebaseRef(pathRef) ? (/** @type {?} */ (pathRef))
        : database.ref((/** @type {?} */ (pathRef)));
}
/**
 * @param {?} item
 * @param {?} cases
 * @return {?}
 */
export function checkOperationCases(item, cases) {
    if (isString(item)) {
        return cases.stringCase();
    }
    else if (isFirebaseRef(item)) {
        return cases.firebaseCase();
    }
    else if (isFirebaseDataSnapshot(item)) {
        return cases.snapshotCase();
    }
    throw new Error(`Expects a string, snapshot, or reference. Got: ${typeof item}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiL3dvcmtzcGFjZS9zcmMvZGF0YWJhc2UvIiwic291cmNlcyI6WyJ1dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQSxNQUFNLFVBQVUsUUFBUSxDQUFDLEtBQVU7SUFDakMsT0FBTyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUM7QUFDbkMsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsS0FBVTtJQUMvQyxPQUFPLE9BQU8sS0FBSyxDQUFDLFNBQVMsS0FBSyxVQUFVLENBQUM7QUFDL0MsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsS0FBSyxDQUFDLEdBQVE7SUFDNUIsT0FBTyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxJQUFJLENBQUM7QUFDM0MsQ0FBQzs7Ozs7QUFFRCxNQUFNLFVBQVUsYUFBYSxDQUFDLEtBQVU7SUFDdEMsT0FBTyxPQUFPLEtBQUssQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDO0FBQ3pDLENBQUM7Ozs7Ozs7O0FBUUQsTUFBTSxVQUFVLE1BQU0sQ0FBQyxRQUFvQyxFQUFFLE9BQXNCO0lBQ2pGLDRDQUE0QztJQUM1QyxPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsbUJBQUEsT0FBTyxFQUFxQjtRQUMxRCxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBQSxPQUFPLEVBQVUsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxJQUF1QixFQUFFLEtBQTZCO0lBQ3hGLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2xCLE9BQU8sS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQzNCO1NBQU0sSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDOUIsT0FBTyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7S0FDN0I7U0FBTSxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZDLE9BQU8sS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQzdCO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ25GLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRhYmFzZVJlZmVyZW5jZSwgRmlyZWJhc2VPcGVyYXRpb24sIEZpcmViYXNlT3BlcmF0aW9uQ2FzZXMsIFBhdGhSZWZlcmVuY2UgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGaXJlYmFzZURhdGFTbmFwc2hvdCh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUuZXhwb3J0VmFsID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOaWwob2JqOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRmlyZWJhc2VSZWYodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlLnNldCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZGF0YWJhc2UgcmVmZXJlbmNlIGdpdmVuIGEgRmlyZWJhc2UgQXBwIGFuZCBhblxuICogYWJzb2x1dGUgb3IgcmVsYXRpdmUgcGF0aC5cbiAqIEBwYXJhbSBkYXRhYmFzZSAtIEZpcmViYXNlIERhdGFiYXNlXG4gKiBAcGFyYW0gcGF0aFJlZiAtIERhdGFiYXNlIHBhdGgsIHJlbGF0aXZlIG9yIGFic29sdXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWYoZGF0YWJhc2U6IGZpcmViYXNlLmRhdGFiYXNlLkRhdGFiYXNlLCBwYXRoUmVmOiBQYXRoUmVmZXJlbmNlKTogRGF0YWJhc2VSZWZlcmVuY2Uge1xuICAvLyBpZiBhIGRiIHJlZiB3YXMgcGFzc2VkIGluLCBqdXN0IHJldHVybiBpdFxuICByZXR1cm4gaXNGaXJlYmFzZVJlZihwYXRoUmVmKSA/IHBhdGhSZWYgYXMgRGF0YWJhc2VSZWZlcmVuY2VcbiAgICA6IGRhdGFiYXNlLnJlZihwYXRoUmVmIGFzIHN0cmluZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja09wZXJhdGlvbkNhc2VzKGl0ZW06IEZpcmViYXNlT3BlcmF0aW9uLCBjYXNlczogRmlyZWJhc2VPcGVyYXRpb25DYXNlcyk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoaXNTdHJpbmcoaXRlbSkpIHtcbiAgICByZXR1cm4gY2FzZXMuc3RyaW5nQ2FzZSgpO1xuICB9IGVsc2UgaWYgKGlzRmlyZWJhc2VSZWYoaXRlbSkpIHtcbiAgICByZXR1cm4gY2FzZXMuZmlyZWJhc2VDYXNlKCk7XG4gIH0gZWxzZSBpZiAoaXNGaXJlYmFzZURhdGFTbmFwc2hvdChpdGVtKSkge1xuICAgIHJldHVybiBjYXNlcy5zbmFwc2hvdENhc2UoKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdHMgYSBzdHJpbmcsIHNuYXBzaG90LCBvciByZWZlcmVuY2UuIEdvdDogJHt0eXBlb2YgaXRlbX1gKTtcbn1cbiJdfQ==