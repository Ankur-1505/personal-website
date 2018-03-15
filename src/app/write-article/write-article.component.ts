import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-write-article',
  templateUrl: './write-article.component.html',
  styleUrls: ['./write-article.component.scss']
})
export class WriteArticleComponent implements OnInit {

  articleForm : FormGroup;
  article : any;

  cat: string[] = [
    'Travel',
    'Lifestyle',
    'Tech',
    'Code'
  ]

  constructor(private db : AngularFireDatabase) 
  {
    

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
    console.log(this.article);
  }

}
