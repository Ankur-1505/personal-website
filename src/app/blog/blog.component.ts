import { ScrollingDirective } from './../scrolling.directive';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { BlogpostsService } from './../blogposts.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

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
  

  cat: string[] = [
    'Technology',
    'Lifestyle',
    'Travel',
    'Code',
    'Miscellaneous'
  ]


  constructor(private afs : AngularFirestore, private post : BlogpostsService) {

  }

  ngOnInit() {
    console.log('true');
    this.post.init('articles','createdAt', '',{ reverse: true, prepend: false });    
    /*this.getPosts();
    this.articlesObservable.subscribe(() => {
      this.showSpinner = false;
    })
    console.log(this.articlesObservable)*/
  }
  onScroll(){
    console.log("scrolled");
    this.post.more();
  }
  getPosts() {
    this.post.data;
    this.post.init('articles','createdAt', '',{ reverse: true, prepend: false });    
  }
  Posts(){
    
    this.postsCollection = this.afs.collection('articles', ref=> ref.orderBy('createdAt', 'desc'));
    this.articlesObservable = this.postsCollection.snapshotChanges().map(actions => {
      actions.map(a=> {
        this.lastdata = a.payload.doc.id;
        console.log(this.lastdata);
        this.showSpinner = false;
      })
    })
  }
  sort(category : string){
    this.post.data;
    this.post.init('articles','createdAt', category,{ reverse: true, prepend: false });    
  }
 
}
