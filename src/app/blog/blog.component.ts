import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
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

  postsCollection : AngularFirestoreCollection<any>;
  id: any;
  articles : any;
  showSpinner : boolean =  true;
  articlesObservable : Observable<any>;
  start = 0 ;
  end : any;
  size = 0;

  cat: string[] = [
    'Technology',
    'Lifestyle',
    'Travel',
    'Code',
    'Miscellaneous'
  ]


  constructor(private afs : AngularFirestore) {

  }

  ngOnInit() {
    console.log('true');
    
    this.getPosts();
    this.articlesObservable.subscribe(() => {
      this.showSpinner = false;
    })
    console.log(this.articlesObservable)
  }
  onScroll(){

  }
  getPosts() {
    this.postsCollection = this.afs.collection('articles', ref=> ref.orderBy('createdAt', 'desc'));
    this.articlesObservable = this.postsCollection.valueChanges();
    
  }
  sort(category : string){
    this.showSpinner = true;
    this.postsCollection = this.afs.collection('articles', ref=> ref.orderBy('createdAt', 'desc').where('category', '==', category));
    this.articlesObservable = this.postsCollection.valueChanges();
    this.articlesObservable.subscribe(() => {
      this.showSpinner = false;
    })
  }
 
}
