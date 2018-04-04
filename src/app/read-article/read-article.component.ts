import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Location} from '@angular/common';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';


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
  authorName : any;
  nightMode : boolean = false;
  showSpinner : boolean =  true;
  constructor(private db : AngularFireDatabase, private route: ActivatedRoute, public authService : AuthServiceService, private auth : AngularFireAuth, private location: Location) { 
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      //console.log(this.id);
   });
   let path = '/articles/' + this.id;
   //console.log('path : ' + path);
   this.article = this.db.object(path).valueChanges();
   if((this.authService.user)){
    this.user = this.auth.authState.subscribe(auth => {
      this.user = auth;
      this.authorid = this.user.uid;
    })
  }
  this.article.subscribe(ref => {
    this.articleid = ref.id;
    this.authorName = 'By ' + ref.authorName;
    this.showSpinner = false;
    console.log(this.articleid);
  })
  }
  
  deleteArticle(){
    this.db.object('/articles/' + this.id).remove().then(ref => {
      console.log(ref);
      this.location.back();
    })
    
  }

  editArticle() {
    this.location.back();
  }

  toggleNightMode(){
    this.nightMode = !this.nightMode;
  }
   

 

  
  }

  

