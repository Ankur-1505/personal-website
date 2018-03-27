import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-write-article',
  templateUrl: './write-article.component.html',
  styleUrls: ['./write-article.component.scss']
})
export class WriteArticleComponent implements OnInit {

  articleForm : FormGroup;
  article : any;
  articleheading : String;

  cat: string[] = [
    'Travel',
    'Lifestyle',
    'Tech',
    'Code'
  ]

  constructor(private db : AngularFireDatabase,private router: Router, private auth : AngularFireAuth, public authService : AuthServiceService) 
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
  }

  public onFormSubmit(){
    this.article = this.articleForm.value;
    this.article.createdAt = firebase.database.ServerValue.TIMESTAMP;
    this.articleheading = this.article.title.replace(/\s/g,'-');
    console.log(this.articleheading);
    this.db.database.ref('/articles/' + this.articleheading).set({
      title: this.article.title,
      description : this.article.description,
      body : this.article.body,
      category : this.article.category,
      createdAt : this.article.createdAt,
      id: this.articleheading
    });

    console.log(this.article);
  }

}
