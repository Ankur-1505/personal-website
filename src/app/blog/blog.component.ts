import { ScrollingDirective } from './../scrolling.directive';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { BlogpostsService } from './../blogposts.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { empty } from "rxjs/observable/empty";
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  postsCollection : AngularFirestoreCollection<any>;
  id: any;
  articles : any;
  showSpinner : boolean =  false;
  articlesObservable : Observable<any>;
  start = 0 ;
  end : any;
  size = 0;
  lastdata : any;
  category : any;
  newData : boolean = true;
  

  cat: string[] = [
    'All',
    'Technology',
    'Lifestyle',
    'Travel',
    'Code',
    'Miscellaneous'
  ]


  constructor(private afs : AngularFirestore, public post : BlogpostsService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      params['category'];
      this.category = params['category'];
      console.log(this.category);
      this.post.clear();
      this.newData = true;
      this.getPosts(this.category);
   });
   
  }

  ngOnInit() {
    
  }
  onScroll(){
    console.log("scrolled");
    this.post.more();
  }
  getPosts(category : string) {
    if(category=='All' || (!category)){
      this.post.init(this.newData, 'articles','createdAt', '',{ reverse: true, prepend: false });   
    }
    else {
      this.post.init(this.newData, 'articles','createdAt', category,{ reverse: true, prepend: false });   
    }
     
  }
  Posts(){
    
    this.postsCollection = this.afs.collection('articles', ref=> ref.orderBy('createdAt', 'desc'));
    this.articlesObservable = this.postsCollection.valueChanges().map(actions => {
      actions.map(a=> {
        this.lastdata = a.payload.doc.id;
        console.log(this.lastdata);
        this.showSpinner = false;
      })
    })
  } 
}
