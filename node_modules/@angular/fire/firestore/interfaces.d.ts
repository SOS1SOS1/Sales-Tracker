import { Subscriber } from 'rxjs';
import firebase from 'firebase/app';
export declare type Settings = firebase.firestore.Settings;
export declare type CollectionReference = firebase.firestore.CollectionReference;
export declare type DocumentReference = firebase.firestore.DocumentReference;
export declare type PersistenceSettings = firebase.firestore.PersistenceSettings;
export declare type DocumentChangeType = firebase.firestore.DocumentChangeType;
export declare type SnapshotOptions = firebase.firestore.SnapshotOptions;
export declare type FieldPath = firebase.firestore.FieldPath;
export declare type Query = firebase.firestore.Query;
export declare type SetOptions = firebase.firestore.SetOptions;
export declare type DocumentData = firebase.firestore.DocumentData;
export interface DocumentSnapshotExists<T> extends firebase.firestore.DocumentSnapshot {
    readonly exists: true;
    data(options?: SnapshotOptions): T;
}
export interface DocumentSnapshotDoesNotExist extends firebase.firestore.DocumentSnapshot {
    readonly exists: false;
    data(options?: SnapshotOptions): undefined;
    get(fieldPath: string | FieldPath, options?: SnapshotOptions): undefined;
}
export declare type DocumentSnapshot<T> = DocumentSnapshotExists<T> | DocumentSnapshotDoesNotExist;
export interface QueryDocumentSnapshot<T> extends firebase.firestore.QueryDocumentSnapshot {
    data(options?: SnapshotOptions): T;
}
export interface QuerySnapshot<T> extends firebase.firestore.QuerySnapshot {
    readonly docs: QueryDocumentSnapshot<T>[];
}
export interface DocumentChange<T> extends firebase.firestore.DocumentChange {
    readonly doc: QueryDocumentSnapshot<T>;
}
export interface DocumentChangeAction<T> {
    type: DocumentChangeType;
    payload: DocumentChange<T>;
}
export interface Action<T> {
    type: string;
    payload: T;
}
export interface Reference<T> {
    onSnapshot: (sub: Subscriber<any>) => any;
}
export declare type QueryFn = (ref: CollectionReference) => Query;
export declare type QueryGroupFn = (query: Query) => Query;
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
 */
export interface AssociatedReference {
    ref: CollectionReference;
    query: Query;
}
