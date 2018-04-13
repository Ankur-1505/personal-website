import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import { AuthServiceService } from '../auth-service.service';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articlesObservable : Observable<any>;
  showSpinner : boolean =  true;
  postsCollection : AngularFirestoreCollection<any>;

  constructor(private auth : AngularFireAuth, public authService : AuthServiceService, private afs : AngularFirestore) { }

  ngOnInit() {
    this.postsCollection = this.afs.collection('articles',ref=> ref.orderBy('createdAt', 'desc').limit(3));
    this.articlesObservable = this.postsCollection.valueChanges();
    this.articlesObservable.subscribe(()=> this.showSpinner = false)
    console.log(this.articlesObservable)
  }
  logout() {
    this.authService.logout();
  }
  
}
