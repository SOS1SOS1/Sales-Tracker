/**
 * @fileoverview added by tsickle
 * Generated from: collection-group/collection-group.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { from } from 'rxjs';
import { fromCollectionRef } from '../observable/fromRef';
import { filter, map, observeOn, scan } from 'rxjs/operators';
import { validateEventsArray } from '../collection/collection';
import { docChanges, sortedChanges } from '../collection/changes';
/**
 * AngularFirestoreCollectionGroup service
 *
 * This class holds a reference to a Firestore Collection Group Query.
 *
 * This class uses Symbol.observable to transform into Observable using Observable.from().
 *
 * This class is rarely used directly and should be created from the AngularFirestore service.
 *
 * Example:
 *
 * const collectionGroup = firebase.firestore.collectionGroup('stocks');
 * const query = collectionRef.where('price', '>', '0.01');
 * const fakeStock = new AngularFirestoreCollectionGroup<Stock>(query, afs);
 *
 * // Subscribe to changes as snapshots. This provides you data updates as well as delta updates.
 * fakeStock.valueChanges().subscribe(value => console.log(value));
 * @template T
 */
export class AngularFirestoreCollectionGroup {
    /**
     * The constructor takes in a CollectionGroupQuery to provide wrapper methods
     * for data operations and data streaming.
     * @param {?} query
     * @param {?} afs
     */
    constructor(query, afs) {
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
        return docChanges(this.query, this.afs.schedulers.outsideAngular)
            .pipe(map((/**
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
     * Listen to all documents in the collection and its possible query as an Observable.
     * @return {?}
     */
    valueChanges() {
        /** @type {?} */
        const fromCollectionRefScheduled$ = fromCollectionRef(this.query, this.afs.schedulers.outsideAngular);
        return fromCollectionRefScheduled$
            .pipe(map((/**
         * @param {?} actions
         * @return {?}
         */
        actions => actions.payload.docs.map((/**
         * @param {?} a
         * @return {?}
         */
        a => a.data())))), this.afs.keepUnstableUntilFirst);
    }
    /**
     * Retrieve the results of the query once.
     * @param {?=} options
     * @return {?}
     */
    get(options) {
        return from(this.query.get(options)).pipe(observeOn(this.afs.schedulers.insideAngular));
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    AngularFirestoreCollectionGroup.prototype.query;
    /**
     * @type {?}
     * @private
     */
    AngularFirestoreCollectionGroup.prototype.afs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi1ncm91cC5qcyIsInNvdXJjZVJvb3QiOiIvd29ya3NwYWNlL3NyYy9maXJlc3RvcmUvIiwic291cmNlcyI6WyJjb2xsZWN0aW9uLWdyb3VwL2NvbGxlY3Rpb24tZ3JvdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ3hDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUk5RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFCbEUsTUFBTSxPQUFPLCtCQUErQjs7Ozs7OztJQUsxQyxZQUNtQixLQUFZLEVBQ1osR0FBcUI7UUFEckIsVUFBSyxHQUFMLEtBQUssQ0FBTztRQUNaLFFBQUcsR0FBSCxHQUFHLENBQWtCO0lBQUksQ0FBQzs7Ozs7Ozs7SUFPN0MsWUFBWSxDQUFDLE1BQTZCO1FBQ3hDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbEMsT0FBTyxVQUFVLENBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQ3ZFLElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQ2hDLENBQUM7U0FDSDtRQUNELE9BQU8sVUFBVSxDQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDO2FBQ2pFLElBQUksQ0FDSCxHQUFHOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTTs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsRUFBQyxFQUMxRSxNQUFNOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBRSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBQyxFQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUNoQyxDQUFDO0lBQ04sQ0FBQzs7Ozs7OztJQU1ELFVBQVUsQ0FBQyxNQUE2QjtRQUN0QyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUk7Ozs7O1FBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRyxDQUFDOzs7Ozs7O0lBTUQsZUFBZSxDQUFDLE1BQTZCOztjQUNyQyxlQUFlLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxDQUFDOztjQUM3Qyx1QkFBdUIsR0FBRyxhQUFhLENBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDO1FBQ2pILE9BQU8sdUJBQXVCLENBQUMsSUFBSSxDQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUNoQyxDQUFDO0lBQ0osQ0FBQzs7Ozs7SUFLRCxZQUFZOztjQUNKLDJCQUEyQixHQUFHLGlCQUFpQixDQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDO1FBQ3hHLE9BQU8sMkJBQTJCO2FBQy9CLElBQUksQ0FDSCxHQUFHOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUMsRUFBQyxFQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUNoQyxDQUFDO0lBQ04sQ0FBQzs7Ozs7O0lBS0QsR0FBRyxDQUFDLE9BQXVDO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUN2QyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQzdDLENBQUM7SUFDSixDQUFDO0NBRUY7Ozs7OztJQS9ERyxnREFBNkI7Ozs7O0lBQzdCLDhDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZyb21Db2xsZWN0aW9uUmVmIH0gZnJvbSAnLi4vb2JzZXJ2YWJsZS9mcm9tUmVmJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBvYnNlcnZlT24sIHNjYW4gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSAnZmlyZWJhc2UvYXBwJztcblxuaW1wb3J0IHsgRG9jdW1lbnRDaGFuZ2VBY3Rpb24sIERvY3VtZW50Q2hhbmdlVHlwZSwgRG9jdW1lbnREYXRhLCBRdWVyeSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgdmFsaWRhdGVFdmVudHNBcnJheSB9IGZyb20gJy4uL2NvbGxlY3Rpb24vY29sbGVjdGlvbic7XG5pbXBvcnQgeyBkb2NDaGFuZ2VzLCBzb3J0ZWRDaGFuZ2VzIH0gZnJvbSAnLi4vY29sbGVjdGlvbi9jaGFuZ2VzJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlc3RvcmUgfSBmcm9tICcuLi9maXJlc3RvcmUnO1xuXG4vKipcbiAqIEFuZ3VsYXJGaXJlc3RvcmVDb2xsZWN0aW9uR3JvdXAgc2VydmljZVxuICpcbiAqIFRoaXMgY2xhc3MgaG9sZHMgYSByZWZlcmVuY2UgdG8gYSBGaXJlc3RvcmUgQ29sbGVjdGlvbiBHcm91cCBRdWVyeS5cbiAqXG4gKiBUaGlzIGNsYXNzIHVzZXMgU3ltYm9sLm9ic2VydmFibGUgdG8gdHJhbnNmb3JtIGludG8gT2JzZXJ2YWJsZSB1c2luZyBPYnNlcnZhYmxlLmZyb20oKS5cbiAqXG4gKiBUaGlzIGNsYXNzIGlzIHJhcmVseSB1c2VkIGRpcmVjdGx5IGFuZCBzaG91bGQgYmUgY3JlYXRlZCBmcm9tIHRoZSBBbmd1bGFyRmlyZXN0b3JlIHNlcnZpY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBjb25zdCBjb2xsZWN0aW9uR3JvdXAgPSBmaXJlYmFzZS5maXJlc3RvcmUuY29sbGVjdGlvbkdyb3VwKCdzdG9ja3MnKTtcbiAqIGNvbnN0IHF1ZXJ5ID0gY29sbGVjdGlvblJlZi53aGVyZSgncHJpY2UnLCAnPicsICcwLjAxJyk7XG4gKiBjb25zdCBmYWtlU3RvY2sgPSBuZXcgQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb25Hcm91cDxTdG9jaz4ocXVlcnksIGFmcyk7XG4gKlxuICogLy8gU3Vic2NyaWJlIHRvIGNoYW5nZXMgYXMgc25hcHNob3RzLiBUaGlzIHByb3ZpZGVzIHlvdSBkYXRhIHVwZGF0ZXMgYXMgd2VsbCBhcyBkZWx0YSB1cGRhdGVzLlxuICogZmFrZVN0b2NrLnZhbHVlQ2hhbmdlcygpLnN1YnNjcmliZSh2YWx1ZSA9PiBjb25zb2xlLmxvZyh2YWx1ZSkpO1xuICovXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb25Hcm91cDxUPSBEb2N1bWVudERhdGE+IHtcbiAgLyoqXG4gICAqIFRoZSBjb25zdHJ1Y3RvciB0YWtlcyBpbiBhIENvbGxlY3Rpb25Hcm91cFF1ZXJ5IHRvIHByb3ZpZGUgd3JhcHBlciBtZXRob2RzXG4gICAqIGZvciBkYXRhIG9wZXJhdGlvbnMgYW5kIGRhdGEgc3RyZWFtaW5nLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBxdWVyeTogUXVlcnksXG4gICAgcHJpdmF0ZSByZWFkb25seSBhZnM6IEFuZ3VsYXJGaXJlc3RvcmUpIHsgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gdGhlIGxhdGVzdCBjaGFuZ2UgaW4gdGhlIHN0cmVhbS4gVGhpcyBtZXRob2QgcmV0dXJucyBjaGFuZ2VzXG4gICAqIGFzIHRoZXkgb2NjdXIgYW5kIHRoZXkgYXJlIG5vdCBzb3J0ZWQgYnkgcXVlcnkgb3JkZXIuIFRoaXMgYWxsb3dzIHlvdSB0byBjb25zdHJ1Y3RcbiAgICogeW91ciBvd24gZGF0YSBzdHJ1Y3R1cmUuXG4gICAqL1xuICBzdGF0ZUNoYW5nZXMoZXZlbnRzPzogRG9jdW1lbnRDaGFuZ2VUeXBlW10pOiBPYnNlcnZhYmxlPERvY3VtZW50Q2hhbmdlQWN0aW9uPFQ+W10+IHtcbiAgICBpZiAoIWV2ZW50cyB8fCBldmVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZG9jQ2hhbmdlczxUPih0aGlzLnF1ZXJ5LCB0aGlzLmFmcy5zY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKS5waXBlKFxuICAgICAgICB0aGlzLmFmcy5rZWVwVW5zdGFibGVVbnRpbEZpcnN0XG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZG9jQ2hhbmdlczxUPih0aGlzLnF1ZXJ5LCB0aGlzLmFmcy5zY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChhY3Rpb25zID0+IGFjdGlvbnMuZmlsdGVyKGNoYW5nZSA9PiBldmVudHMuaW5kZXhPZihjaGFuZ2UudHlwZSkgPiAtMSkpLFxuICAgICAgICBmaWx0ZXIoY2hhbmdlcyA9PiAgY2hhbmdlcy5sZW5ndGggPiAwKSxcbiAgICAgICAgdGhpcy5hZnMua2VlcFVuc3RhYmxlVW50aWxGaXJzdFxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBzdHJlYW0gb2YgY2hhbmdlcyBhcyB0aGV5IG9jY3VyIGl0IHRpbWUuIFRoaXMgbWV0aG9kIGlzIHNpbWlsYXIgdG8gc3RhdGVDaGFuZ2VzKClcbiAgICogYnV0IGl0IGNvbGxlY3RzIGVhY2ggZXZlbnQgaW4gYW4gYXJyYXkgb3ZlciB0aW1lLlxuICAgKi9cbiAgYXVkaXRUcmFpbChldmVudHM/OiBEb2N1bWVudENoYW5nZVR5cGVbXSk6IE9ic2VydmFibGU8RG9jdW1lbnRDaGFuZ2VBY3Rpb248VD5bXT4ge1xuICAgIHJldHVybiB0aGlzLnN0YXRlQ2hhbmdlcyhldmVudHMpLnBpcGUoc2NhbigoY3VycmVudCwgYWN0aW9uKSA9PiBbLi4uY3VycmVudCwgLi4uYWN0aW9uXSwgW10pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBzdHJlYW0gb2Ygc3luY2hyb25pemVkIGNoYW5nZXMuIFRoaXMgbWV0aG9kIGtlZXBzIHRoZSBsb2NhbCBhcnJheSBpbiBzb3J0ZWRcbiAgICogcXVlcnkgb3JkZXIuXG4gICAqL1xuICBzbmFwc2hvdENoYW5nZXMoZXZlbnRzPzogRG9jdW1lbnRDaGFuZ2VUeXBlW10pOiBPYnNlcnZhYmxlPERvY3VtZW50Q2hhbmdlQWN0aW9uPFQ+W10+IHtcbiAgICBjb25zdCB2YWxpZGF0ZWRFdmVudHMgPSB2YWxpZGF0ZUV2ZW50c0FycmF5KGV2ZW50cyk7XG4gICAgY29uc3Qgc2NoZWR1bGVkU29ydGVkQ2hhbmdlcyQgPSBzb3J0ZWRDaGFuZ2VzPFQ+KHRoaXMucXVlcnksIHZhbGlkYXRlZEV2ZW50cywgdGhpcy5hZnMuc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhcik7XG4gICAgcmV0dXJuIHNjaGVkdWxlZFNvcnRlZENoYW5nZXMkLnBpcGUoXG4gICAgICB0aGlzLmFmcy5rZWVwVW5zdGFibGVVbnRpbEZpcnN0XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW4gdG8gYWxsIGRvY3VtZW50cyBpbiB0aGUgY29sbGVjdGlvbiBhbmQgaXRzIHBvc3NpYmxlIHF1ZXJ5IGFzIGFuIE9ic2VydmFibGUuXG4gICAqL1xuICB2YWx1ZUNoYW5nZXMoKTogT2JzZXJ2YWJsZTxUW10+IHtcbiAgICBjb25zdCBmcm9tQ29sbGVjdGlvblJlZlNjaGVkdWxlZCQgPSBmcm9tQ29sbGVjdGlvblJlZjxUPih0aGlzLnF1ZXJ5LCB0aGlzLmFmcy5zY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKTtcbiAgICByZXR1cm4gZnJvbUNvbGxlY3Rpb25SZWZTY2hlZHVsZWQkXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKGFjdGlvbnMgPT4gYWN0aW9ucy5wYXlsb2FkLmRvY3MubWFwKGEgPT4gYS5kYXRhKCkpKSxcbiAgICAgICAgdGhpcy5hZnMua2VlcFVuc3RhYmxlVW50aWxGaXJzdFxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSB0aGUgcmVzdWx0cyBvZiB0aGUgcXVlcnkgb25jZS5cbiAgICovXG4gIGdldChvcHRpb25zPzogZmlyZWJhc2UuZmlyZXN0b3JlLkdldE9wdGlvbnMpIHtcbiAgICByZXR1cm4gZnJvbSh0aGlzLnF1ZXJ5LmdldChvcHRpb25zKSkucGlwZShcbiAgICAgIG9ic2VydmVPbih0aGlzLmFmcy5zY2hlZHVsZXJzLmluc2lkZUFuZ3VsYXIpXG4gICAgKTtcbiAgfVxuXG59XG4iXX0=