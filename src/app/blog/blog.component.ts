import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  articlesObservable : Observable<any>;
  constructor(private db : AngularFireDatabase) {
  }

  ngOnInit() {
    this.articlesObservable = this.getArticles('/articles');
    console.log("works");
  }
  getArticles(listPath) : Observable<any> {
    return this.db.list(listPath).valueChanges();
  }

}
