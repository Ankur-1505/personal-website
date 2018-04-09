import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articlesObservable : Observable<any>;
  showSpinner : boolean =  true;

  constructor(private auth : AngularFireAuth, public authService : AuthServiceService, private db : AngularFireDatabase) { }

  ngOnInit() {
    this.articlesObservable = this.getArticles('/articles');
        this.articlesObservable.subscribe(ref => {
          this.showSpinner = false;
        })
  }
  logout() {
    this.authService.logout();
  }
  getArticles(listPath) : Observable<any> {
    
    return this.db.list('/articles', ref => ref.orderByChild('createdAt').limitToLast(3)).valueChanges().map(articles => {
      return articles.reverse();
    })

  }
}
