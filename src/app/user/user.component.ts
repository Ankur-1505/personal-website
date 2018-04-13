import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  path : any;
  usersCollection : AngularFirestoreCollection<any>;
  userRef : Observable<any>;
  Collection : AngularFirestoreCollection<any>;
  articlesObservable : Observable<any>;
  showSpinner : boolean =  true;

  constructor(private route: ActivatedRoute, private afs : AngularFirestore, private db : AngularFireDatabase) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if(params['id']){
        this.path = params['id'];
        this.usersCollection = this.afs.collection('users');
        this.userRef = this.usersCollection.doc<any>(this.path).valueChanges();
        this.usersCollection = this.afs.collection('articles', ref=> ref.where('authorUID', '==', this.path).orderBy('createdAt','desc'));
        this.articlesObservable = this.usersCollection.valueChanges();
        this.articlesObservable.subscribe(ref => {
          this.showSpinner = false;
        })
      }
      
    })
  }

  getArticles(listPath) : Observable<any> {
    
    return this.db.list('/articles', ref => ref.orderByChild('authorUID').equalTo(this.path).limitToFirst(3)).valueChanges().map(articles => {
      return articles.reverse();
    })

  }

}
