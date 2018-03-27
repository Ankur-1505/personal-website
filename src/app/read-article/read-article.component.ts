import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-read-article',
  templateUrl: './read-article.component.html',
  styleUrls: ['./read-article.component.scss']
})
export class ReadArticleComponent implements OnInit {
  private sub : Subscription;
  article : Observable<any>;
  id : any;

  constructor(private db : AngularFireDatabase, private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
   });
   let path = '/articles/' + this.id;
   console.log('path : ' + path);
   this.article = this.db.object(path).valueChanges();
   console.log(this.article);
   
   }

   ngOnDestroy() {
    this.sub.unsubscribe();
  }

  
  }

  

