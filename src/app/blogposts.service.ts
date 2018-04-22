import { empty } from 'rxjs/observable/empty';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/take';

export interface QueryConfig {
  path: string;
  field: string;
  limit: number;
  category : string;
  reverse: boolean;
  prepend: boolean;
  // direction: string;
  }

@Injectable()
export class BlogpostsService {

  // Source data
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  private _data = new BehaviorSubject([]);

  private query: QueryConfig;

  // Observable data
  data: Observable<any>;
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();
  newData : boolean;
  usercollection  : any;
  user : any;


  constructor(private afs: AngularFirestore) { }

  // Initial query sets options and defines the Observable
  // passing opts will override the defaults
  init(newData : boolean, path: string, field: string, category : string, opts?: any) {
    this.query  = { 
      path,
      field,
      category,
      limit: 2,
      reverse: false,
      prepend: false,
      ...opts
    }
    
    this.newData = newData;
    if(this.newData = true){
      this._data.next([]);
      this._loading.next(false);
      this._done.next(false);
    }

    const first = this.afs.collection(this.query.path, ref => {
      if(this.query.category) {
      return ref
              .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
              .where('category' , '==', this.query.category)
              .limit(this.query.limit)
      }
      else {
        return ref
              .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
              .limit(this.query.limit)
      }
    })

    this.mapAndUpdate(first)

    // Create the observable array for consumption in components
    this.data = this._data.asObservable()
        .scan( (acc, val) => { 
          return this.query.prepend ? val.concat(acc) : acc.concat(val)
        })
  }

 
  // Retrieves additional data from firestore
  more() {
    const cursor = this.getCursor()

    const more = this.afs.collection(this.query.path, ref => {
      if(this.query.category) {
      return ref
              .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
              .where('category','==',this.query.category)
              .limit(this.query.limit)
              .startAfter(cursor)
      }
      else {
        return ref
              .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
              .limit(this.query.limit)
              .startAfter(cursor)
      }
    })
    this.mapAndUpdate(more)
  }

  clear(){
    this._data.next([]);
      this._loading.next(false);
      this._done.next(false);
  }

  // Determines the doc snapshot to paginate query 
  private getCursor() {
    const current = this._data.value
    if (current.length) {
      return this.query.prepend ? current[0].doc : current[current.length - 1].doc 
    }
    return null
  }


  // Maps the snapshot to usable format the updates source
  private mapAndUpdate(col: AngularFirestoreCollection<any>) {

    if(this.newData = true){
      this._data.next([]);
      this._loading.next(false);
      this._done.next(false);
    }

    if (this._done.value || this._loading.value) { return };

    // loading
    this._loading.next(true)

    // Map snapshot with doc ref (needed for cursor)
    return col.snapshotChanges()
      .do(arr => {
        let values = arr.map(snap => {
          const data = snap.payload.doc.data()
          const doc = snap.payload.doc
          return { ...data, doc }
        })
  
        // If prepending, reverse the batch order
        values = this.query.prepend ? values.reverse() : values

        // update source with new values, done loading
        this._data.next(values)
        this._loading.next(false)

        // no more values, mark done
        if (!values.length) {
          this._done.next(true)
        }
    })
    .take(1)
    .subscribe()

  }

  getUser(id : string){
    this.usercollection = this.afs.collection<any>('users');
    this.user = this.usercollection.doc(id).valuechanges();
    return this.user.displayName;    
  }

}