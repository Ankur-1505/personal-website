import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class BlogpostsService {

  query : any;

  constructor(private db: AngularFireDatabase) { }

  getPosts(batch, lastKey?) {
  
  this.query = {
    orderByKey : true,
    limitToFirst : batch
  }
  if (lastKey) this.query['startAt'] = lastKey

return this.db.list('/articles',ref => this.query)
}
}