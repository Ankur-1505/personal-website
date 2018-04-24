import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Location} from '@angular/common';
import { ShareButtons } from '@ngx-share/core';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { Meta , Title} from '@angular/platform-browser';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';


@Component({
  selector: 'app-read-article',
  templateUrl: './read-article.component.html',
  styleUrls: ['./read-article.component.scss']
})
export class ReadArticleComponent implements OnInit {
  private sub : Subscription;
  article : Observable<any>;
  id : any;
  category : string;
  authorid : string = "";
  user : any;
  articleid : any;
  date;
  authorName : any;
  authorUID;
  articledescription : string;
  articletitle : string; 
  nightMode : boolean = false;
  showSpinner : boolean =  true;
  constructor(private db : AngularFireDatabase, private afs : AngularFirestore , private route: ActivatedRoute, public authService : AuthServiceService, public store : AngularFireStorage, private auth : AngularFireAuth, private location: Location, private meta : Meta, public share: ShareButtons) { 
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      //console.log(this.id);
   });

   let path = 'articles/' + this.id;
   //console.log('path : ' + path);
   /*this.article = this.db.object(path).valueChanges();*/
   if((this.authService.user)){
    this.user = this.auth.authState.subscribe(auth => {
      this.user = auth;
      this.authorid = this.user.uid;
    })
  }
  this.article = this.afs.doc<any>(path).valueChanges();
  this.article.subscribe(ref => {
    this.articleid = ref.id;
    this.authorUID = ref.authorUID;
    this.authorName = 'By ' + ref.authorName;
    this.showSpinner = false;
    this.articledescription = ref.description;
    this.articletitle = ref.title;
    this.category = ref.category;
    this.date = ref.createdAt;
    this.updateTags();
    console.log(this.articleid);
  })
  }
  
  updateTags() {
    this.meta.updateTag({name : 'twitter:card', content : 'summary'})
    this.meta.updateTag({name : 'og:title', content : this.articletitle});
    this.meta.updateTag({name : 'og:description', content : this.articledescription});
    this.meta.updateTag({name : 'og:image', content : 'https://d30y9cdsu7xlg0.cloudfront.net/png/44220-200.png'});
    this.meta.updateTag({name : 'og:url', content : 'https://websiteproject-sanketnaik99.firebaseapp.com/read-article/' + this.articleid});
    this.meta.updateTag({name : 'og:type', content : 'website'});
  }

  deleteArticle(){
    var storageRef = this.store.storage.ref('users/' + this.authorUID + '/' + this.articleid + '/');
    storageRef.child('article-image').delete().then(error => {
      console.log(error);
    })
    storageRef.delete();
    this.afs.doc<any>('articles/' + this.id).delete().then(ref => {
      console.log(ref);
      this.location.back();
    })
    
  }

  onDestroy(){
    this.article.subscribe(res => {
      return Observable.empty();
    })
  }

  editArticle() {
    this.location.back();
  }

  toggleNightMode(){
    this.nightMode = !this.nightMode;
  }
   

 

  
  }

  

