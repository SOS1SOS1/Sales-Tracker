/**
 * @fileoverview added by tsickle
 * Generated from: interfaces.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 * @template T
 */
export function DocumentSnapshotExists() { }
if (false) {
    /** @type {?} */
    DocumentSnapshotExists.prototype.exists;
    /**
     * @param {?=} options
     * @return {?}
     */
    DocumentSnapshotExists.prototype.data = function (options) { };
}
/**
 * @record
 */
export function DocumentSnapshotDoesNotExist() { }
if (false) {
    /** @type {?} */
    DocumentSnapshotDoesNotExist.prototype.exists;
    /**
     * @param {?=} options
     * @return {?}
     */
    DocumentSnapshotDoesNotExist.prototype.data = function (options) { };
    /**
     * @param {?} fieldPath
     * @param {?=} options
     * @return {?}
     */
    DocumentSnapshotDoesNotExist.prototype.get = function (fieldPath, options) { };
}
/**
 * @record
 * @template T
 */
export function QueryDocumentSnapshot() { }
if (false) {
    /**
     * @param {?=} options
     * @return {?}
     */
    QueryDocumentSnapshot.prototype.data = function (options) { };
}
/**
 * @record
 * @template T
 */
export function QuerySnapshot() { }
if (false) {
    /** @type {?} */
    QuerySnapshot.prototype.docs;
}
/**
 * @record
 * @template T
 */
export function DocumentChange() { }
if (false) {
    /** @type {?} */
    DocumentChange.prototype.doc;
}
/**
 * @record
 * @template T
 */
export function DocumentChangeAction() { }
if (false) {
    /** @type {?} */
    DocumentChangeAction.prototype.type;
    /** @type {?} */
    DocumentChangeAction.prototype.payload;
}
/**
 * @record
 * @template T
 */
export function Action() { }
if (false) {
    /** @type {?} */
    Action.prototype.type;
    /** @type {?} */
    Action.prototype.payload;
}
/**
 * @record
 * @template T
 */
export function Reference() { }
if (false) {
    /** @type {?} */
    Reference.prototype.onSnapshot;
}
/**
 * A structure that provides an association between a reference
 * and a query on that reference. Note: Performing operations
 * on the reference can lead to confusing results with complicated
 * queries.
 *
 * Example:
 *
 * const query = ref.where('type', '==', 'Book').
 *                  .where('price', '>' 18.00)
 *                  .where('price', '<' 100.00)
 *                  .where('category', '==', 'Fiction')
 *                  .where('publisher', '==', 'BigPublisher')
 *
 * // This addition would not be a result of the query above
 * ref.add({
 *  type: 'Magazine',
 *  price: 4.99,
 *  category: 'Sports',
 *  publisher: 'SportsPublisher'
 * });
 * @record
 */
export function AssociatedReference() { }
if (false) {
    /** @type {?} */
    AssociatedReference.prototype.ref;
    /** @type {?} */
    AssociatedReference.prototype.query;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiIvd29ya3NwYWNlL3NyYy9maXJlc3RvcmUvIiwic291cmNlcyI6WyJpbnRlcmZhY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQWVBLDRDQUdDOzs7SUFGQyx3Q0FBc0I7Ozs7O0lBQ3RCLCtEQUFtQzs7Ozs7QUFHckMsa0RBSUM7OztJQUhDLDhDQUF1Qjs7Ozs7SUFDdkIscUVBQTJDOzs7Ozs7SUFDM0MsK0VBQXlFOzs7Ozs7QUFLM0UsMkNBRUM7Ozs7OztJQURDLDhEQUFtQzs7Ozs7O0FBR3JDLG1DQUVDOzs7SUFEQyw2QkFBMEM7Ozs7OztBQUc1QyxvQ0FFQzs7O0lBREMsNkJBQXVDOzs7Ozs7QUFHekMsMENBR0M7OztJQUZDLG9DQUF5Qjs7SUFDekIsdUNBQTJCOzs7Ozs7QUFHN0IsNEJBR0M7OztJQUZDLHNCQUFhOztJQUNiLHlCQUFXOzs7Ozs7QUFHYiwrQkFFQzs7O0lBREMsK0JBQTBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0I1Qyx5Q0FHQzs7O0lBRkMsa0NBQXlCOztJQUN6QixvQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuXG5leHBvcnQgdHlwZSBTZXR0aW5ncyA9ICBmaXJlYmFzZS5maXJlc3RvcmUuU2V0dGluZ3M7XG5leHBvcnQgdHlwZSBDb2xsZWN0aW9uUmVmZXJlbmNlID0gZmlyZWJhc2UuZmlyZXN0b3JlLkNvbGxlY3Rpb25SZWZlcmVuY2U7XG5leHBvcnQgdHlwZSBEb2N1bWVudFJlZmVyZW5jZSA9IGZpcmViYXNlLmZpcmVzdG9yZS5Eb2N1bWVudFJlZmVyZW5jZTtcbmV4cG9ydCB0eXBlIFBlcnNpc3RlbmNlU2V0dGluZ3MgPSBmaXJlYmFzZS5maXJlc3RvcmUuUGVyc2lzdGVuY2VTZXR0aW5ncztcbmV4cG9ydCB0eXBlIERvY3VtZW50Q2hhbmdlVHlwZSA9IGZpcmViYXNlLmZpcmVzdG9yZS5Eb2N1bWVudENoYW5nZVR5cGU7XG5leHBvcnQgdHlwZSBTbmFwc2hvdE9wdGlvbnMgPSBmaXJlYmFzZS5maXJlc3RvcmUuU25hcHNob3RPcHRpb25zO1xuZXhwb3J0IHR5cGUgRmllbGRQYXRoID0gZmlyZWJhc2UuZmlyZXN0b3JlLkZpZWxkUGF0aDtcbmV4cG9ydCB0eXBlIFF1ZXJ5ID0gZmlyZWJhc2UuZmlyZXN0b3JlLlF1ZXJ5O1xuXG5leHBvcnQgdHlwZSBTZXRPcHRpb25zID0gZmlyZWJhc2UuZmlyZXN0b3JlLlNldE9wdGlvbnM7XG5leHBvcnQgdHlwZSBEb2N1bWVudERhdGEgPSBmaXJlYmFzZS5maXJlc3RvcmUuRG9jdW1lbnREYXRhO1xuXG5leHBvcnQgaW50ZXJmYWNlIERvY3VtZW50U25hcHNob3RFeGlzdHM8VD4gZXh0ZW5kcyBmaXJlYmFzZS5maXJlc3RvcmUuRG9jdW1lbnRTbmFwc2hvdCB7XG4gIHJlYWRvbmx5IGV4aXN0czogdHJ1ZTtcbiAgZGF0YShvcHRpb25zPzogU25hcHNob3RPcHRpb25zKTogVDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEb2N1bWVudFNuYXBzaG90RG9lc05vdEV4aXN0IGV4dGVuZHMgZmlyZWJhc2UuZmlyZXN0b3JlLkRvY3VtZW50U25hcHNob3Qge1xuICByZWFkb25seSBleGlzdHM6IGZhbHNlO1xuICBkYXRhKG9wdGlvbnM/OiBTbmFwc2hvdE9wdGlvbnMpOiB1bmRlZmluZWQ7XG4gIGdldChmaWVsZFBhdGg6IHN0cmluZyB8IEZpZWxkUGF0aCwgb3B0aW9ucz86IFNuYXBzaG90T3B0aW9ucyk6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IHR5cGUgRG9jdW1lbnRTbmFwc2hvdDxUPiA9IERvY3VtZW50U25hcHNob3RFeGlzdHM8VD4gfCBEb2N1bWVudFNuYXBzaG90RG9lc05vdEV4aXN0O1xuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5RG9jdW1lbnRTbmFwc2hvdDxUPiBleHRlbmRzIGZpcmViYXNlLmZpcmVzdG9yZS5RdWVyeURvY3VtZW50U25hcHNob3Qge1xuICBkYXRhKG9wdGlvbnM/OiBTbmFwc2hvdE9wdGlvbnMpOiBUO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5U25hcHNob3Q8VD4gZXh0ZW5kcyBmaXJlYmFzZS5maXJlc3RvcmUuUXVlcnlTbmFwc2hvdCB7XG4gIHJlYWRvbmx5IGRvY3M6IFF1ZXJ5RG9jdW1lbnRTbmFwc2hvdDxUPltdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERvY3VtZW50Q2hhbmdlPFQ+IGV4dGVuZHMgZmlyZWJhc2UuZmlyZXN0b3JlLkRvY3VtZW50Q2hhbmdlIHtcbiAgcmVhZG9ubHkgZG9jOiBRdWVyeURvY3VtZW50U25hcHNob3Q8VD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9jdW1lbnRDaGFuZ2VBY3Rpb248VD4ge1xuICB0eXBlOiBEb2N1bWVudENoYW5nZVR5cGU7XG4gIHBheWxvYWQ6IERvY3VtZW50Q2hhbmdlPFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFjdGlvbjxUPiB7XG4gIHR5cGU6IHN0cmluZztcbiAgcGF5bG9hZDogVDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWZlcmVuY2U8VD4ge1xuICBvblNuYXBzaG90OiAoc3ViOiBTdWJzY3JpYmVyPGFueT4pID0+IGFueTtcbn1cblxuLy8gQSBjb252aWVuY2UgdHlwZSBmb3IgbWFraW5nIGEgcXVlcnkuXG4vLyBFeGFtcGxlOiBjb25zdCBxdWVyeSA9IChyZWYpID0+IHJlZi53aGVyZSgnbmFtZScsID09ICdkYXZpZCcpO1xuZXhwb3J0IHR5cGUgUXVlcnlGbiA9IChyZWY6IENvbGxlY3Rpb25SZWZlcmVuY2UpID0+IFF1ZXJ5O1xuXG5leHBvcnQgdHlwZSBRdWVyeUdyb3VwRm4gPSAocXVlcnk6IFF1ZXJ5KSA9PiBRdWVyeTtcblxuLyoqXG4gKiBBIHN0cnVjdHVyZSB0aGF0IHByb3ZpZGVzIGFuIGFzc29jaWF0aW9uIGJldHdlZW4gYSByZWZlcmVuY2VcbiAqIGFuZCBhIHF1ZXJ5IG9uIHRoYXQgcmVmZXJlbmNlLiBOb3RlOiBQZXJmb3JtaW5nIG9wZXJhdGlvbnNcbiAqIG9uIHRoZSByZWZlcmVuY2UgY2FuIGxlYWQgdG8gY29uZnVzaW5nIHJlc3VsdHMgd2l0aCBjb21wbGljYXRlZFxuICogcXVlcmllcy5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGNvbnN0IHF1ZXJ5ID0gcmVmLndoZXJlKCd0eXBlJywgJz09JywgJ0Jvb2snKS5cbiAqICAgICAgICAgICAgICAgICAgLndoZXJlKCdwcmljZScsICc+JyAxOC4wMClcbiAqICAgICAgICAgICAgICAgICAgLndoZXJlKCdwcmljZScsICc8JyAxMDAuMDApXG4gKiAgICAgICAgICAgICAgICAgIC53aGVyZSgnY2F0ZWdvcnknLCAnPT0nLCAnRmljdGlvbicpXG4gKiAgICAgICAgICAgICAgICAgIC53aGVyZSgncHVibGlzaGVyJywgJz09JywgJ0JpZ1B1Ymxpc2hlcicpXG4gKlxuICogLy8gVGhpcyBhZGRpdGlvbiB3b3VsZCBub3QgYmUgYSByZXN1bHQgb2YgdGhlIHF1ZXJ5IGFib3ZlXG4gKiByZWYuYWRkKHtcbiAqICB0eXBlOiAnTWFnYXppbmUnLFxuICogIHByaWNlOiA0Ljk5LFxuICogIGNhdGVnb3J5OiAnU3BvcnRzJyxcbiAqICBwdWJsaXNoZXI6ICdTcG9ydHNQdWJsaXNoZXInXG4gKiB9KTtcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBc3NvY2lhdGVkUmVmZXJlbmNlIHtcbiAgcmVmOiBDb2xsZWN0aW9uUmVmZXJlbmNlO1xuICBxdWVyeTogUXVlcnk7XG59XG4iXX0=