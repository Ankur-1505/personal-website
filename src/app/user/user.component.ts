import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  path : any;
  userRef : Observable<any>;
  articlesObservable : Observable<any>;
  showSpinner : boolean =  true;

  constructor(private route: ActivatedRoute, private db : AngularFireDatabase) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if(params['id']){
        this.path = params['id'];
        this.userRef = this.db.object('/users/' + this.path).valueChanges();
        this.articlesObservable = this.getArticles('/articles');
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
