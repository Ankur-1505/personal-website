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
import { WOW } from 'wowjs/dist/wow.min';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

interface post {
  title : string,
  description : string,
  body : string,
  category : string,
  createdAt : any,
  authorUID : string,
  articleImage : any,
  id : string,
  authorName : any
}

@Component({
  selector: 'app-write-article',
  templateUrl: './write-article.component.html',
  styleUrls: ['./write-article.component.scss']
})
export class WriteArticleComponent implements OnInit {

  postsCollection : AngularFirestoreCollection<post>;
  posts : Observable<post>;
  articleForm : FormGroup;
  article : any;
  articleObservable : Observable<any>;
  articleheading : any;
  user : any;
  authorName : any;
  file : File;
  selectedFiles : FileList;
  imgsrc : Observable<string>;
  imghttp : string; 
  articleUpdate : boolean = false;
  articleContent = '';
  articleTitle = '';
  articleDescription = '';
  articleCategory = '';
  articleid : any;
  created_authUID : any;
  uploadPercent : Observable<number>;
  imgurl : any;
  uploadPercent2 : Observable<number>;

  cat: string[] = [
    'Technology',
    'Lifestyle',
    'Travel',
    'Code',
    'Miscellaneous'
  ]

  constructor(private afs : AngularFirestore, private route: ActivatedRoute, private router: Router, private auth : AngularFireAuth, public authService : AuthServiceService, private afStorage: AngularFireStorage) 
  {
    if(!(this.authService.user)){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    new WOW().init();
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
        this.articleid = id;
        this.Article(id);
        this.articleUpdate = true;
      } else {
        console.log('id not found in params')
      }
    });
  }

  public onFormSubmit(){
    this.article = this.articleForm.value;
    this.article.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    this.articleheading = this.article.title.replace(/[\s,.#$\[\[]/g,'-');
    this.articleid = this.articleheading;
    this.created_authUID = this.article.createdAt + this.auth.auth.currentUser.uid;
    console.log(this.articleheading);
    this.postsCollection = this.afs.collection<post>('articles');
    this.postsCollection.doc(this.articleid).set({
      title: this.article.title,
      description : this.article.description,
      body : this.article.body,
      category : this.article.category,
      createdAt : this.article.createdAt,
      authorName : this.auth.auth.currentUser.displayName,
      authorUID : this.auth.auth.currentUser.uid,
      id: this.articleheading,
      articleImage : this.imghttp
    })

    this.router.navigate(['/blog/posts/All']);
  } 

  imageURL(event) {
    this.selectedFiles = event.target.files;
    let uid = this.auth.auth.currentUser.uid;
    if(this.selectedFiles.item(0)){
      let file = this.selectedFiles.item(0);
      console.log(file);
    const uploadTask = this.afStorage.upload('/users/' + uid + '/' + this.articleTitle.replace(/[\s,.#$\[\[]/g,'-') + '/' + file.name ,file);
    this.imgurl = uploadTask.downloadURL();
    this.uploadPercent2 = uploadTask.percentageChanges(); 
    const uploadFirebase = this.imgurl.subscribe(src => {
      this.imgurl = src;
    })
  }
}
  

  selectImage(event) {
    this.selectedFiles = event.target.files;
    let uid = this.auth.auth.currentUser.uid;
    if(this.selectedFiles.item(0)){
      let file = this.selectedFiles.item(0);
    const uploadTask = this.afStorage.upload('/users/' + uid + '/' + this.articleTitle.replace(/[\s,.#$\[\[]/g,'-') + '/' + 'article-image' ,file);
    this.imgsrc = uploadTask.downloadURL();
    this.uploadPercent = uploadTask.percentageChanges();
    console.log(this.imgsrc);
    const uploadFirebase = this.imgsrc.subscribe(src => {
      this.imghttp = src;
    })
    
  }
}

  Article(id : string){
    this.articleObservable = this.afs.doc<any>('articles/' + id).valueChanges();
    console.log(this.articleObservable);
    this.articleObservable.subscribe(ref=> {
      this.articleContent = ref.body;
      this.imghttp = ref.articleImage;
      this.articleCategory = ref.category;
      this.articleTitle = ref.title;
      this.articleDescription = ref.description;
    }) 
  } 

  updateArticle() {
    this.article = this.articleForm.value;
    this.article.createdAt = firebase.firestore.FieldValue.serverTimestamp()
    this.created_authUID = this.article.createdAt + '_' + this.auth.auth.currentUser.uid;
    this.route.params.subscribe((params)=> {
      this.articleheading = params['id'];
    });
    console.log(this.articleheading);
    this.afs.doc<any>('articles/' + this.articleheading).update({
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
