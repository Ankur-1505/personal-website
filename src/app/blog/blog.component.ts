import { BlogpostsService } from './../blogposts.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';




@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  id: any;
  articles : any;
  showSpinner : boolean =  true;
  articlesObservable : Observable<any>;
  start = 0 ;
  end : any;
  size = 0;


  constructor(private db : AngularFireDatabase) {

  }

  ngOnInit() {
    console.log('true');
    this.articles = this.db.list('/articles', ref => ref.orderByChild('createdAt'));
    this.articlesObservable = this.getArticles('/articles');
    console.log("works");
    console.log(this.articlesObservable);
    this.articlesObservable.subscribe(() => {
      this.showSpinner = false;
      console.log('false')
    })
  }
  onScroll(){

  }
  getArticles(listPath) : Observable<any> {
    
    return this.db.list('/articles', ref => ref.orderByChild('createdAt')).valueChanges().map(articles => {
      return articles.reverse();
    })

  }
}
