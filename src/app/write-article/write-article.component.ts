import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AuthServiceService } from '../auth-service.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-write-article',
  templateUrl: './write-article.component.html',
  styleUrls: ['./write-article.component.scss']
})
export class WriteArticleComponent implements OnInit {

  articleForm : FormGroup;
  article : any;
  articleObservable : Observable<any>;
  articleheading : String;
  user : any;
  authorName : string;
  file : File;
  selectedFiles : FileList;
  imgsrc : Observable<string>;
  imghttp : string; 
  articleUpdate : boolean = false;
  articleContent = '';

  cat: string[] = [
    'Technology',
    'Lifestyle',
    'Travel',
    'Code',
    'Miscellaneous'
  ]

  constructor(private db : AngularFireDatabase,private route: ActivatedRoute, private router: Router, private auth : AngularFireAuth, public authService : AuthServiceService, private afStorage: AngularFireStorage) 
  {
    if(!(this.authService.user)){
      this.router.navigate(['/login']);
    }
  }
 
  publishArticle(value: any){
    console.log(value);
  }

  ngOnInit() {
    this.articleForm = new FormGroup({
      title : new FormControl(),
      description : new FormControl(),
      category: new FormControl(),
      body: new FormControl()
    });
    this.auth.authState.subscribe(auth => {
      this.user = auth;
      console.log("success");
    });
    this.route.params.subscribe((params)=> {
      //check lead Id here
      if(params['id']){
        console.log(params['id']);
        let id : string = params['id'];
        this.Article(id);
        this.articleUpdate = true;
      } else {
        console.log('id not found in params')
      }
    });
  }

  public onFormSubmit(){
    this.article = this.articleForm.value;
    this.article.createdAt = firebase.database.ServerValue.TIMESTAMP;
    this.articleheading = this.article.title.replace(/[\s,.#$\[\[]/g,'-');
    console.log(this.articleheading);
    this.db.database.ref('/articles/' + this.articleheading).set({
      title: this.article.title,
      description : this.article.description,
      body : this.article.body,
      category : this.article.category,
      createdAt : this.article.createdAt,
      authorName : this.auth.auth.currentUser.displayName,
      authorUID : this.auth.auth.currentUser.uid,
      id: this.articleheading,
      articleImage : this.imghttp
    });

    this.router.navigate(['/blog']);
  } 

  

  selectImage(event) {
    this.selectedFiles = event.target.files;
    let uid = this.auth.auth.currentUser.uid;
    if(this.selectedFiles.item(0)){
      let file = this.selectedFiles.item(0);
    const uploadTask = this.afStorage.upload('/users/' + uid + '/' + this.articleheading + '/' + 'article-image' ,file);
    this.imgsrc = uploadTask.downloadURL();
    console.log(this.imgsrc);
    const uploadFirebase = this.imgsrc.subscribe(src => {
      this.imghttp = src;
    })
    
  }
}

  Article(id : string){
    this.articleObservable = this.db.object('/articles/' + id).valueChanges();
    console.log(this.articleObservable);
    this.articleObservable.subscribe(ref=> {
      this.articleContent = ref.body;
      this.imghttp = ref.articleImage;
    }) 
  } 

  updateArticle() {
    this.article = this.articleForm.value;
    this.article.createdAt = firebase.database.ServerValue.TIMESTAMP;
    this.route.params.subscribe((params)=> {
      this.articleheading = params['id'];
    });
    console.log(this.articleheading);
    this.db.database.ref('/articles/' + this.articleheading).set({
      title: this.article.title,
      description : this.article.description,
      body : this.article.body,
      category : this.article.category,
      createdAt : this.article.createdAt,
      authorName : this.auth.auth.currentUser.displayName,
      authorUID : this.auth.auth.currentUser.uid,
      id: this.articleheading,
      articleImage : this.imghttp
    });

    this.router.navigate(['/blog']);
    
  }

}
