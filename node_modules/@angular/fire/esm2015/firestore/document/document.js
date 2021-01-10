/**
 * @fileoverview added by tsickle
 * Generated from: document/document.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { from } from 'rxjs';
import { fromDocRef } from '../observable/fromRef';
import { map, observeOn } from 'rxjs/operators';
import { associateQuery } from '../firestore';
import { AngularFirestoreCollection } from '../collection/collection';
/**
 * AngularFirestoreDocument service
 *
 * This class creates a reference to a Firestore Document. A reference is provided in
 * in the constructor. The class is generic which gives you type safety for data update
 * methods and data streaming.
 *
 * This class uses Symbol.observable to transform into Observable using Observable.from().
 *
 * This class is rarely used directly and should be created from the AngularFirestore service.
 *
 * Example:
 *
 * const fakeStock = new AngularFirestoreDocument<Stock>(doc('stocks/FAKE'));
 * await fakeStock.set({ name: 'FAKE', price: 0.01 });
 * fakeStock.valueChanges().map(snap => {
 *   if(snap.exists) return snap.data();
 *   return null;
 * }).subscribe(value => console.log(value));
 * // OR! Transform using Observable.from() and the data is unwrapped for you
 * Observable.from(fakeStock).subscribe(value => console.log(value));
 * @template T
 */
export class AngularFirestoreDocument {
    /**
     * The contstuctor takes in a DocumentReference to provide wrapper methods
     * for data operations, data streaming, and Symbol.observable.
     * @param {?} ref
     * @param {?} afs
     */
    constructor(ref, afs) {
        this.ref = ref;
        this.afs = afs;
    }
    /**
     * Create or overwrite a single document.
     * @param {?} data
     * @param {?=} options
     * @return {?}
     */
    set(data, options) {
        return this.ref.set(data, options);
    }
    /**
     * Update some fields of a document without overwriting the entire document.
     * @param {?} data
     * @return {?}
     */
    update(data) {
        return this.ref.update(data);
    }
    /**
     * Delete a document.
     * @return {?}
     */
    delete() {
        return this.ref.delete();
    }
    /**
     * Create a reference to a sub-collection given a path and an optional query
     * function.
     * @template R
     * @param {?} path
     * @param {?=} queryFn
     * @return {?}
     */
    collection(path, queryFn) {
        /** @type {?} */
        const collectionRef = this.ref.collection(path);
        const { ref, query } = associateQuery(collectionRef, queryFn);
        return new AngularFirestoreCollection(ref, query, this.afs);
    }
    /**
     * Listen to snapshot updates from the document.
     * @return {?}
     */
    snapshotChanges() {
        /** @type {?} */
        const scheduledFromDocRef$ = fromDocRef(this.ref, this.afs.schedulers.outsideAngular);
        return scheduledFromDocRef$.pipe(this.afs.keepUnstableUntilFirst);
    }
    /**
     * Listen to unwrapped snapshot updates from the document.
     * @return {?}
     */
    valueChanges() {
        return this.snapshotChanges().pipe(map((/**
         * @param {?} action
         * @return {?}
         */
        action => {
            return action.payload.data();
        })));
    }
    /**
     * Retrieve the document once.
     * @param {?=} options
     * @return {?}
     */
    get(options) {
        return from(this.ref.get(options)).pipe(observeOn(this.afs.schedulers.insideAngular));
    }
}
if (false) {
    /** @type {?} */
    AngularFirestoreDocument.prototype.ref;
    /**
     * @type {?}
     * @private
     */
    AngularFirestoreDocument.prototype.afs;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VSb290IjoiL3dvcmtzcGFjZS9zcmMvZmlyZXN0b3JlLyIsInNvdXJjZXMiOlsiZG9jdW1lbnQvZG9jdW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRXhDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBb0IsY0FBYyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5QnRFLE1BQU0sT0FBTyx3QkFBd0I7Ozs7Ozs7SUFNbkMsWUFBbUIsR0FBc0IsRUFBVSxHQUFxQjtRQUFyRCxRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQWtCO0lBQUksQ0FBQzs7Ozs7OztJQUs3RSxHQUFHLENBQUMsSUFBTyxFQUFFLE9BQW9CO1FBQy9CLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7OztJQUtELE1BQU0sQ0FBQyxJQUFnQjtRQUNyQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7O0lBS0QsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7Ozs7Ozs7SUFNRCxVQUFVLENBQWtCLElBQVksRUFBRSxPQUFpQjs7Y0FDbkQsYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztjQUN6QyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxjQUFjLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQztRQUM3RCxPQUFPLElBQUksMEJBQTBCLENBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakUsQ0FBQzs7Ozs7SUFLRCxlQUFlOztjQUNQLG9CQUFvQixHQUFHLFVBQVUsQ0FBSSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQztRQUN4RixPQUFPLG9CQUFvQixDQUFDLElBQUksQ0FDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FDaEMsQ0FBQztJQUNKLENBQUM7Ozs7O0lBS0QsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FDaEMsR0FBRzs7OztRQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ1gsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQy9CLENBQUMsRUFBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7Ozs7SUFLRCxHQUFHLENBQUMsT0FBdUM7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3JDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FDN0MsQ0FBQztJQUNKLENBQUM7Q0FDRjs7O0lBOURhLHVDQUE2Qjs7Ozs7SUFBRSx1Q0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBBY3Rpb24sIERvY3VtZW50RGF0YSwgRG9jdW1lbnRSZWZlcmVuY2UsIERvY3VtZW50U25hcHNob3QsIFF1ZXJ5Rm4sIFNldE9wdGlvbnMgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IGZyb21Eb2NSZWYgfSBmcm9tICcuLi9vYnNlcnZhYmxlL2Zyb21SZWYnO1xuaW1wb3J0IHsgbWFwLCBvYnNlcnZlT24gfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlLCBhc3NvY2lhdGVRdWVyeSB9IGZyb20gJy4uL2ZpcmVzdG9yZSc7XG5pbXBvcnQgeyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbiB9IGZyb20gJy4uL2NvbGxlY3Rpb24vY29sbGVjdGlvbic7XG5pbXBvcnQgZmlyZWJhc2UgZnJvbSAnZmlyZWJhc2UvYXBwJztcblxuLyoqXG4gKiBBbmd1bGFyRmlyZXN0b3JlRG9jdW1lbnQgc2VydmljZVxuICpcbiAqIFRoaXMgY2xhc3MgY3JlYXRlcyBhIHJlZmVyZW5jZSB0byBhIEZpcmVzdG9yZSBEb2N1bWVudC4gQSByZWZlcmVuY2UgaXMgcHJvdmlkZWQgaW5cbiAqIGluIHRoZSBjb25zdHJ1Y3Rvci4gVGhlIGNsYXNzIGlzIGdlbmVyaWMgd2hpY2ggZ2l2ZXMgeW91IHR5cGUgc2FmZXR5IGZvciBkYXRhIHVwZGF0ZVxuICogbWV0aG9kcyBhbmQgZGF0YSBzdHJlYW1pbmcuXG4gKlxuICogVGhpcyBjbGFzcyB1c2VzIFN5bWJvbC5vYnNlcnZhYmxlIHRvIHRyYW5zZm9ybSBpbnRvIE9ic2VydmFibGUgdXNpbmcgT2JzZXJ2YWJsZS5mcm9tKCkuXG4gKlxuICogVGhpcyBjbGFzcyBpcyByYXJlbHkgdXNlZCBkaXJlY3RseSBhbmQgc2hvdWxkIGJlIGNyZWF0ZWQgZnJvbSB0aGUgQW5ndWxhckZpcmVzdG9yZSBzZXJ2aWNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogY29uc3QgZmFrZVN0b2NrID0gbmV3IEFuZ3VsYXJGaXJlc3RvcmVEb2N1bWVudDxTdG9jaz4oZG9jKCdzdG9ja3MvRkFLRScpKTtcbiAqIGF3YWl0IGZha2VTdG9jay5zZXQoeyBuYW1lOiAnRkFLRScsIHByaWNlOiAwLjAxIH0pO1xuICogZmFrZVN0b2NrLnZhbHVlQ2hhbmdlcygpLm1hcChzbmFwID0+IHtcbiAqICAgaWYoc25hcC5leGlzdHMpIHJldHVybiBzbmFwLmRhdGEoKTtcbiAqICAgcmV0dXJuIG51bGw7XG4gKiB9KS5zdWJzY3JpYmUodmFsdWUgPT4gY29uc29sZS5sb2codmFsdWUpKTtcbiAqIC8vIE9SISBUcmFuc2Zvcm0gdXNpbmcgT2JzZXJ2YWJsZS5mcm9tKCkgYW5kIHRoZSBkYXRhIGlzIHVud3JhcHBlZCBmb3IgeW91XG4gKiBPYnNlcnZhYmxlLmZyb20oZmFrZVN0b2NrKS5zdWJzY3JpYmUodmFsdWUgPT4gY29uc29sZS5sb2codmFsdWUpKTtcbiAqL1xuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlc3RvcmVEb2N1bWVudDxUPSBEb2N1bWVudERhdGE+IHtcblxuICAvKipcbiAgICogVGhlIGNvbnRzdHVjdG9yIHRha2VzIGluIGEgRG9jdW1lbnRSZWZlcmVuY2UgdG8gcHJvdmlkZSB3cmFwcGVyIG1ldGhvZHNcbiAgICogZm9yIGRhdGEgb3BlcmF0aW9ucywgZGF0YSBzdHJlYW1pbmcsIGFuZCBTeW1ib2wub2JzZXJ2YWJsZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWY6IERvY3VtZW50UmVmZXJlbmNlLCBwcml2YXRlIGFmczogQW5ndWxhckZpcmVzdG9yZSkgeyB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBvciBvdmVyd3JpdGUgYSBzaW5nbGUgZG9jdW1lbnQuXG4gICAqL1xuICBzZXQoZGF0YTogVCwgb3B0aW9ucz86IFNldE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZWYuc2V0KGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBzb21lIGZpZWxkcyBvZiBhIGRvY3VtZW50IHdpdGhvdXQgb3ZlcndyaXRpbmcgdGhlIGVudGlyZSBkb2N1bWVudC5cbiAgICovXG4gIHVwZGF0ZShkYXRhOiBQYXJ0aWFsPFQ+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMucmVmLnVwZGF0ZShkYXRhKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxldGUgYSBkb2N1bWVudC5cbiAgICovXG4gIGRlbGV0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZWYuZGVsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgcmVmZXJlbmNlIHRvIGEgc3ViLWNvbGxlY3Rpb24gZ2l2ZW4gYSBwYXRoIGFuZCBhbiBvcHRpb25hbCBxdWVyeVxuICAgKiBmdW5jdGlvbi5cbiAgICovXG4gIGNvbGxlY3Rpb248Uj0gRG9jdW1lbnREYXRhPihwYXRoOiBzdHJpbmcsIHF1ZXJ5Rm4/OiBRdWVyeUZuKTogQW5ndWxhckZpcmVzdG9yZUNvbGxlY3Rpb248Uj4ge1xuICAgIGNvbnN0IGNvbGxlY3Rpb25SZWYgPSB0aGlzLnJlZi5jb2xsZWN0aW9uKHBhdGgpO1xuICAgIGNvbnN0IHsgcmVmLCBxdWVyeSB9ID0gYXNzb2NpYXRlUXVlcnkoY29sbGVjdGlvblJlZiwgcXVlcnlGbik7XG4gICAgcmV0dXJuIG5ldyBBbmd1bGFyRmlyZXN0b3JlQ29sbGVjdGlvbjxSPihyZWYsIHF1ZXJ5LCB0aGlzLmFmcyk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIHNuYXBzaG90IHVwZGF0ZXMgZnJvbSB0aGUgZG9jdW1lbnQuXG4gICAqL1xuICBzbmFwc2hvdENoYW5nZXMoKTogT2JzZXJ2YWJsZTxBY3Rpb248RG9jdW1lbnRTbmFwc2hvdDxUPj4+IHtcbiAgICBjb25zdCBzY2hlZHVsZWRGcm9tRG9jUmVmJCA9IGZyb21Eb2NSZWY8VD4odGhpcy5yZWYsIHRoaXMuYWZzLnNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpO1xuICAgIHJldHVybiBzY2hlZHVsZWRGcm9tRG9jUmVmJC5waXBlKFxuICAgICAgdGhpcy5hZnMua2VlcFVuc3RhYmxlVW50aWxGaXJzdFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuIHRvIHVud3JhcHBlZCBzbmFwc2hvdCB1cGRhdGVzIGZyb20gdGhlIGRvY3VtZW50LlxuICAgKi9cbiAgdmFsdWVDaGFuZ2VzKCk6IE9ic2VydmFibGU8VHx1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5zbmFwc2hvdENoYW5nZXMoKS5waXBlKFxuICAgICAgbWFwKGFjdGlvbiA9PiB7XG4gICAgICAgIHJldHVybiBhY3Rpb24ucGF5bG9hZC5kYXRhKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmUgdGhlIGRvY3VtZW50IG9uY2UuXG4gICAqL1xuICBnZXQob3B0aW9ucz86IGZpcmViYXNlLmZpcmVzdG9yZS5HZXRPcHRpb25zKSB7XG4gICAgcmV0dXJuIGZyb20odGhpcy5yZWYuZ2V0KG9wdGlvbnMpKS5waXBlKFxuICAgICAgb2JzZXJ2ZU9uKHRoaXMuYWZzLnNjaGVkdWxlcnMuaW5zaWRlQW5ndWxhciksXG4gICAgKTtcbiAgfVxufVxuIl19