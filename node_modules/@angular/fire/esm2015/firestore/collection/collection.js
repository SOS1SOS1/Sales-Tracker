/**
 * @fileoverview added by tsickle
 * Generated from: collection/collection.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { from } from 'rxjs';
import { fromCollectionRef } from '../observable/fromRef';
import { filter, map, observeOn, scan } from 'rxjs/operators';
import { docChanges, sortedChanges } from './changes';
import { AngularFirestoreDocument } from '../document/document';
/**
 * @param {?=} events
 * @return {?}
 */
export function validateEventsArray(events) {
    if (!events || events.length === 0) {
        events = ['added', 'removed', 'modified'];
    }
    return events;
}
/**
 * AngularFirestoreCollection service
 *
 * This class creates a reference to a Firestore Collection. A reference and a query are provided in
 * in the constructor. The query can be the unqueried reference if no query is desired.The class
 * is generic which gives you type safety for data update methods and data streaming.
 *
 * This class uses Symbol.observable to transform into Observable using Observable.from().
 *
 * This class is rarely used directly and should be created from the AngularFirestore service.
 *
 * Example:
 *
 * const collectionRef = firebase.firestore.collection('stocks');
 * const query = collectionRef.where('price', '>', '0.01');
 * const fakeStock = new AngularFirestoreCollection<Stock>(collectionRef, query);
 *
 * // NOTE!: the updates are performed on the reference not the query
 * await fakeStock.add({ name: 'FAKE', price: 0.01 });
 *
 * // Subscribe to changes as snapshots. This provides you data updates as well as delta updates.
 * fakeStock.valueChanges().subscribe(value => console.log(value));
 * @template T
 */
export class AngularFirestoreCollection {
    /**
     * The constructor takes in a CollectionReference and Query to provide wrapper methods
     * for data operations and data streaming.
     *
     * Note: Data operation methods are done on the reference not the query. This means
     * when you update data it is not updating data to the window of your query unless
     * the data fits the criteria of the query. See the AssociatedRefence type for details
     * on this implication.
     * @param {?} ref
     * @param {?} query
     * @param {?} afs
     */
    constructor(ref, query, afs) {
        this.ref = ref;
        this.query = query;
        this.afs = afs;
    }
    /**
     * Listen to the latest change in the stream. This method returns changes
     * as they occur and they are not sorted by query order. This allows you to construct
     * your own data structure.
     * @param {?=} events
     * @return {?}
     */
    stateChanges(events) {
        if (!events || events.length === 0) {
            return docChanges(this.query, this.afs.schedulers.outsideAngular).pipe(this.afs.keepUnstableUntilFirst);
        }
        return docChanges(this.query, this.afs.schedulers.outsideAngular).pipe(map((/**
         * @param {?} actions
         * @return {?}
         */
        actions => actions.filter((/**
         * @param {?} change
         * @return {?}
         */
        change => events.indexOf(change.type) > -1)))), filter((/**
         * @param {?} changes
         * @return {?}
         */
        changes => changes.length > 0)), this.afs.keepUnstableUntilFirst);
    }
    /**
     * Create a stream of changes as they occur it time. This method is similar to stateChanges()
     * but it collects each event in an array over time.
     * @param {?=} events
     * @return {?}
     */
    auditTrail(events) {
        return this.stateChanges(events).pipe(scan((/**
         * @param {?} current
         * @param {?} action
         * @return {?}
         */
        (current, action) => [...current, ...action]), []));
    }
    /**
     * Create a stream of synchronized changes. This method keeps the local array in sorted
     * query order.
     * @param {?=} events
     * @return {?}
     */
    snapshotChanges(events) {
        /** @type {?} */
        const validatedEvents = validateEventsArray(events);
        /** @type {?} */
        const scheduledSortedChanges$ = sortedChanges(this.query, validatedEvents, this.afs.schedulers.outsideAngular);
        return scheduledSortedChanges$.pipe(this.afs.keepUnstableUntilFirst);
    }
    /**
     * @template K
     * @param {?=} options
     * @return {?}
     */
    valueChanges(options = {}) {
        return fromCollectionRef(this.query, this.afs.schedulers.outsideAngular)
            .pipe(map((/**
         * @param {?} actions
         * @return {?}
         */
        actions => actions.payload.docs.map((/**
         * @param {?} a
         * @return {?}
         */
        a => {
            if (options.idField) {
                return (/** @type {?} */ (Object.assign(Object.assign({}, (/** @type {?} */ (a.data()))), { [options.idField]: a.id })));
            }
            else {
                return a.data();
            }
        })))), this.afs.keepUnstableUntilFirst);
    }
    /**
     * Retrieve the results of the query once.
     * @param {?=} options
     * @return {?}
     */
    get(options) {
        return from(this.query.get(options)).pipe(observeOn(this.afs.schedulers.insideAngular));
    }
    /**
     * Add data to a collection reference.
     *
     * Note: Data operation methods are done on the reference not the query. This means
     * when you update data it is not updating data to the window of your query unless
     * the data fits the criteria of the query.
     * @param {?} data
     * @return {?}
     */
    add(data) {
        return this.ref.add(data);
    }
    /**
     * Create a reference to a single document in a collection.
     * @template T
     * @param {?=} path
     * @return {?}
     */
    doc(path) {
        return new AngularFirestoreDocument(this.ref.doc(path), this.afs);
    }
}
if (false) {
    /** @type {?} */
    AngularFirestoreCollection.prototype.ref;
    /**
     * @type {?}
     * @private
     */
    AngularFirestoreCollection.prototype.query;
    /**
     * @type {?}
     * @private
     */
    AngularFirestoreCollection.prototype.afs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvd29ya3NwYWNlL3NyYy9maXJlc3RvcmUvIiwic291cmNlcyI6WyJjb2xsZWN0aW9uL2NvbGxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk5RCxPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN0RCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFHaEUsTUFBTSxVQUFVLG1CQUFtQixDQUFDLE1BQTZCO0lBQy9ELElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDbEMsTUFBTSxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUMzQztJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QkQsTUFBTSxPQUFPLDBCQUEwQjs7Ozs7Ozs7Ozs7OztJQVVyQyxZQUNrQixHQUF3QixFQUN2QixLQUFZLEVBQ1osR0FBcUI7UUFGdEIsUUFBRyxHQUFILEdBQUcsQ0FBcUI7UUFDdkIsVUFBSyxHQUFMLEtBQUssQ0FBTztRQUNaLFFBQUcsR0FBSCxHQUFHLENBQWtCO0lBQUksQ0FBQzs7Ozs7Ozs7SUFPN0MsWUFBWSxDQUFDLE1BQTZCO1FBQ3hDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbEMsT0FBTyxVQUFVLENBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxJ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Q0FBQztJQUN2RSxDQUFDO0NBQ0Y7OztJQS9GRyx5Q0FBd0M7Ozs7O0lBQ3hDLDJDQUE2Qjs7Ozs7SUFDN0IseUNBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZnJvbSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZnJvbUNvbGxlY3Rpb25SZWYgfSBmcm9tICcuLi9vYnNlcnZhYmxlL2Zyb21SZWYnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIG9ic2VydmVPbiwgc2NhbiB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9hcHAnO1xuXG5pbXBvcnQgeyBDb2xsZWN0aW9uUmVmZXJlbmNlLCBEb2N1bWVudENoYW5nZUFjdGlvbiwgRG9jdW1lbnRDaGFuZ2VUeXBlLCBEb2N1bWVudERhdGEsIERvY3VtZW50UmVmZXJlbmNlLCBRdWVyeSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgZG9jQ2hhbmdlcywgc29ydGVkQ2hhbmdlcyB9IGZyb20gJy4vY2hhbmdlcyc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQgfSBmcm9tICcuLi9kb2N1bWVudC9kb2N1bWVudCc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlIH0gZnJvbSAnLi4vZmlyZXN0b3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRXZlbnRzQXJyYXkoZXZlbnRzPzogRG9jdW1lbnRDaGFuZ2VUeXBlW10pIHtcbiAgaWYgKCFldmVudHMgfHwgZXZlbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIGV2ZW50cyA9IFsnYWRkZWQnLCAncmVtb3ZlZCcsICdtb2RpZmllZCddO1xuICB9XG4gIHJldHVybiBldmVudHM7XG59XG5cbi8qKlxuICogQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb24gc2VydmljZVxuICpcbiAqIFRoaXMgY2xhc3MgY3JlYXRlcyBhIHJlZmVyZW5jZSB0byBhIEZpcmVzdG9yZSBDb2xsZWN0aW9uLiBBIHJlZmVyZW5jZSBhbmQgYSBxdWVyeSBhcmUgcHJvdmlkZWQgaW5cbiAqIGluIHRoZSBjb25zdHJ1Y3Rvci4gVGhlIHF1ZXJ5IGNhbiBiZSB0aGUgdW5xdWVyaWVkIHJlZmVyZW5jZSBpZiBubyBxdWVyeSBpcyBkZXNpcmVkLlRoZSBjbGFzc1xuICogaXMgZ2VuZXJpYyB3aGljaCBnaXZlcyB5b3UgdHlwZSBzYWZldHkgZm9yIGRhdGEgdXBkYXRlIG1ldGhvZHMgYW5kIGRhdGEgc3RyZWFtaW5nLlxuICpcbiAqIFRoaXMgY2xhc3MgdXNlcyBTeW1ib2wub2JzZXJ2YWJsZSB0byB0cmFuc2Zvcm0gaW50byBPYnNlcnZhYmxlIHVzaW5nIE9ic2VydmFibGUuZnJvbSgpLlxuICpcbiAqIFRoaXMgY2xhc3MgaXMgcmFyZWx5IHVzZWQgZGlyZWN0bHkgYW5kIHNob3VsZCBiZSBjcmVhdGVkIGZyb20gdGhlIEFuZ3VsYXJGaXJlc3RvcmUgc2VydmljZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGNvbnN0IGNvbGxlY3Rpb25SZWYgPSBmaXJlYmFzZS5maXJlc3RvcmUuY29sbGVjdGlvbignc3RvY2tzJyk7XG4gKiBjb25zdCBxdWVyeSA9IGNvbGxlY3Rpb25SZWYud2hlcmUoJ3ByaWNlJywgJz4nLCAnMC4wMScpO1xuICogY29uc3QgZmFrZVN0b2NrID0gbmV3IEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uPFN0b2NrPihjb2xsZWN0aW9uUmVmLCBxdWVyeSk7XG4gKlxuICogLy8gTk9URSE6IHRoZSB1cGRhdGVzIGFyZSBwZXJmb3JtZWQgb24gdGhlIHJlZmVyZW5jZSBub3QgdGhlIHF1ZXJ5XG4gKiBhd2FpdCBmYWtlU3RvY2suYWRkKHsgbmFtZTogJ0ZBS0UnLCBwcmljZTogMC4wMSB9KTtcbiAqXG4gKiAvLyBTdWJzY3JpYmUgdG8gY2hhbmdlcyBhcyBzbmFwc2hvdHMuIFRoaXMgcHJvdmlkZXMgeW91IGRhdGEgdXBkYXRlcyBhcyB3ZWxsIGFzIGRlbHRhIHVwZGF0ZXMuXG4gKiBmYWtlU3RvY2sudmFsdWVDaGFuZ2VzKCkuc3Vic2NyaWJlKHZhbHVlID0+IGNvbnNvbGUubG9nKHZhbHVlKSk7XG4gKi9cbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbjxUPSBEb2N1bWVudERhdGE+IHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciB0YWtlcyBpbiBhIENvbGxlY3Rpb25SZWZlcmVuY2UgYW5kIFF1ZXJ5IHRvIHByb3ZpZGUgd3JhcHBlciBtZXRob2RzXG4gICAqIGZvciBkYXRhIG9wZXJhdGlvbnMgYW5kIGRhdGEgc3RyZWFtaW5nLlxuICAgKlxuICAgKiBOb3RlOiBEYXRhIG9wZXJhdGlvbiBtZXRob2RzIGFyZSBkb25lIG9uIHRoZSByZWZlcmVuY2Ugbm90IHRoZSBxdWVyeS4gVGhpcyBtZWFuc1xuICAgKiB3aGVuIHlvdSB1cGRhdGUgZGF0YSBpdCBpcyBub3QgdXBkYXRpbmcgZGF0YSB0byB0aGUgd2luZG93IG9mIHlvdXIgcXVlcnkgdW5sZXNzXG4gICAqIHRoZSBkYXRhIGZpdHMgdGhlIGNyaXRlcmlhIG9mIHRoZSBxdWVyeS4gU2VlIHRoZSBBc3NvY2lhdGVkUmVmZW5jZSB0eXBlIGZvciBkZXRhaWxzXG4gICAqIG9uIHRoaXMgaW1wbGljYXRpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmVhZG9ubHkgcmVmOiBDb2xsZWN0aW9uUmVmZXJlbmNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcXVlcnk6IFF1ZXJ5LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYWZzOiBBbmd1bGFyRmlyZXN0b3JlKSB7IH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIHRoZSBsYXRlc3QgY2hhbmdlIGluIHRoZSBzdHJlYW0uIFRoaXMgbWV0aG9kIHJldHVybnMgY2hhbmdlc1xuICAgKiBhcyB0aGV5IG9jY3VyIGFuZCB0aGV5IGFyZSBub3Qgc29ydGVkIGJ5IHF1ZXJ5IG9yZGVyLiBUaGlzIGFsbG93cyB5b3UgdG8gY29uc3RydWN0XG4gICAqIHlvdXIgb3duIGRhdGEgc3RydWN0dXJlLlxuICAgKi9cbiAgc3RhdGVDaGFuZ2VzKGV2ZW50cz86IERvY3VtZW50Q2hhbmdlVHlwZVtdKTogT2JzZXJ2YWJsZTxEb2N1bWVudENoYW5nZUFjdGlvbjxUPltdPiB7XG4gICAgaWYgKCFldmVudHMgfHwgZXZlbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGRvY0NoYW5nZXM8VD4odGhpcy5xdWVyeSwgdGhpcy5hZnMuc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhcikucGlwZShcbiAgICAgICAgdGhpcy5hZnMua2VlcFVuc3RhYmxlVW50aWxGaXJzdFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGRvY0NoYW5nZXM8VD4odGhpcy5xdWVyeSwgdGhpcy5hZnMuc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhcikucGlwZShcbiAgICAgIG1hcChhY3Rpb25zID0+IGFjdGlvbnMuZmlsdGVyKGNoYW5nZSA9PiBldmVudHMuaW5kZXhPZihjaGFuZ2UudHlwZSkgPiAtMSkpLFxuICAgICAgZmlsdGVyKGNoYW5nZXMgPT4gIGNoYW5nZXMubGVuZ3RoID4gMCksXG4gICAgICB0aGlzLmFmcy5rZWVwVW5zdGFibGVVbnRpbEZpcnN0XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBzdHJlYW0gb2YgY2hhbmdlcyBhcyB0aGV5IG9jY3VyIGl0IHRpbWUuIFRoaXMgbWV0aG9kIGlzIHNpbWlsYXIgdG8gc3RhdGVDaGFuZ2VzKClcbiAgICogYnV0IGl0IGNvbGxlY3RzIGVhY2ggZXZlbnQgaW4gYW4gYXJyYXkgb3ZlciB0aW1lLlxuICAgKi9cbiAgYXVkaXRUcmFpbChldmVudHM/OiBEb2N1bWVudENoYW5nZVR5cGVbXSk6IE9ic2VydmFibGU8RG9jdW1lbnRDaGFuZ2VBY3Rpb248VD5bXT4ge1xuICAgIHJldHVybiB0aGlzLnN0YXRlQ2hhbmdlcyhldmVudHMpLnBpcGUoc2NhbigoY3VycmVudCwgYWN0aW9uKSA9PiBbLi4uY3VycmVudCwgLi4uYWN0aW9uXSwgW10pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBzdHJlYW0gb2Ygc3luY2hyb25pemVkIGNoYW5nZXMuIFRoaXMgbWV0aG9kIGtlZXBzIHRoZSBsb2NhbCBhcnJheSBpbiBzb3J0ZWRcbiAgICogcXVlcnkgb3JkZXIuXG4gICAqL1xuICBzbmFwc2hvdENoYW5nZXMoZXZlbnRzPzogRG9jdW1lbnRDaGFuZ2VUeXBlW10pOiBPYnNlcnZhYmxlPERvY3VtZW50Q2hhbmdlQWN0aW9uPFQ+W10+IHtcbiAgICBjb25zdCB2YWxpZGF0ZWRFdmVudHMgPSB2YWxpZGF0ZUV2ZW50c0FycmF5KGV2ZW50cyk7XG4gICAgY29uc3Qgc2NoZWR1bGVkU29ydGVkQ2hhbmdlcyQgPSBzb3J0ZWRDaGFuZ2VzPFQ+KHRoaXMucXVlcnksIHZhbGlkYXRlZEV2ZW50cywgdGhpcy5hZnMuc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhcik7XG4gICAgcmV0dXJuIHNjaGVkdWxlZFNvcnRlZENoYW5nZXMkLnBpcGUoXG4gICAgICB0aGlzLmFmcy5rZWVwVW5zdGFibGVVbnRpbEZpcnN0XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gYWxsIGRvY3VtZW50cyBpbiB0aGUgY29sbGVjdGlvbiBhbmQgaXRzIHBvc3NpYmxlIHF1ZXJ5IGFzIGFuIE9ic2VydmFibGUuXG4gICAqXG4gICAqIElmIHRoZSBgaWRGaWVsZGAgb3B0aW9uIGlzIHByb3ZpZGVkLCBkb2N1bWVudCBJRHMgYXJlIGluY2x1ZGVkIGFuZCBtYXBwZWQgdG8gdGhlXG4gICAqIHByb3ZpZGVkIGBpZEZpZWxkYCBwcm9wZXJ0eSBuYW1lLlxuICAgKi9cbiAgdmFsdWVDaGFuZ2VzKCk6IE9ic2VydmFibGU8VFtdPjtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnVuaWZpZWQtc2lnbmF0dXJlc1xuICB2YWx1ZUNoYW5nZXMoe30pOiBPYnNlcnZhYmxlPFRbXT47XG4gIHZhbHVlQ2hhbmdlczxLIGV4dGVuZHMgc3RyaW5nPihvcHRpb25zOiB7aWRGaWVsZDogS30pOiBPYnNlcnZhYmxlPChUICYgeyBbVCBpbiBLXTogc3RyaW5nIH0pW10+O1xuICB2YWx1ZUNoYW5nZXM8SyBleHRlbmRzIHN0cmluZz4ob3B0aW9uczoge2lkRmllbGQ/OiBLfSA9IHt9KTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICByZXR1cm4gZnJvbUNvbGxlY3Rpb25SZWY8VD4odGhpcy5xdWVyeSwgdGhpcy5hZnMuc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhcilcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoYWN0aW9ucyA9PiBhY3Rpb25zLnBheWxvYWQuZG9jcy5tYXAoYSA9PiB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMuaWRGaWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uYS5kYXRhKCkgYXMge30sXG4gICAgICAgICAgICAgIC4uLnsgW29wdGlvbnMuaWRGaWVsZF06IGEuaWQgfVxuICAgICAgICAgICAgfSBhcyBUICYgeyBbVCBpbiBLXTogc3RyaW5nIH07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhLmRhdGEoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKSxcbiAgICAgICAgdGhpcy5hZnMua2VlcFVuc3RhYmxlVW50aWxGaXJzdFxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgcmVzdWx0cyBvZiB0aGUgcXVlcnkgb25jZS5cbiAgICovXG4gIGdldChvcHRpb25zPzogZmlyZWJhc2UuZmlyZXN0b3JlLkdldE9wdGlvbnMpIHtcbiAgICByZXR1cm4gZnJvbSh0aGlzLnF1ZXJ5LmdldChvcHRpb25zKSkucGlwZShcbiAgICAgIG9ic2VydmVPbih0aGlzLmFmcy5zY2hlZHVsZXJzLmluc2lkZUFuZ3VsYXIpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGRhdGEgdG8gYSBjb2xsZWN0aW9uIHJlZmVyZW5jZS5cbiAgICpcbiAgICogTm90ZTogRGF0YSBvcGVyYXRpb24gbWV0aG9kcyBhcmUgZG9uZSBvbiB0aGUgcmVmZXJlbmNlIG5vdCB0aGUgcXVlcnkuIFRoaXMgbWVhbnNcbiAgICogd2hlbiB5b3UgdXBkYXRlIGRhdGEgaXQgaXMgbm90IHVwZGF0aW5nIGRhdGEgdG8gdGhlIHdpbmRvdyBvZiB5b3VyIHF1ZXJ5IHVubGVzc1xuICAgKiB0aGUgZGF0YSBmaXRzIHRoZSBjcml0ZXJpYSBvZiB0aGUgcXVlcnkuXG4gICAqL1xuICBhZGQoZGF0YTogVCk6IFByb21pc2U8RG9jdW1lbnRSZWZlcmVuY2U+IHtcbiAgICByZXR1cm4gdGhpcy5yZWYuYWRkKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHJlZmVyZW5jZSB0byBhIHNpbmdsZSBkb2N1bWVudCBpbiBhIGNvbGxlY3Rpb24uXG4gICAqL1xuICBkb2M8VD4ocGF0aD86IHN0cmluZyk6IEFuZ3VsYXJGaXJlc3RvcmVEb2N1bWVudDxUPiB7XG4gICAgcmV0dXJuIG5ldyBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQ8VD4odGhpcy5yZWYuZG9jKHBhdGgpLCB0aGlzLmFmcyk7XG4gIH1cbn1cbiJdfQ==