import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';




@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  email : string;
  user : any;
  name : string;
  authorName : string;
  displayImage : File;
  uid : any;
  description : any;
  file : File;
  selectedFiles : FileList;
  imgsrc : Observable<string>;
  imghttp : string;
  database: any;
  authorDescription :  Observable<any>;
  constructor(private router: Router, private auth : AngularFireAuth, public authService : AuthServiceService, private afStorage: AngularFireStorage, private db : AngularFireDatabase) {
    if(!(this.authService.user)){
      this.router.navigate(['/login']);
    }
    this.user = this.auth.authState.subscribe(auth => {
      this.user = auth;
      this.email = this.user.email;
      this.authorName = this.user.displayName;
      this.uid = this.user.uid;
      this.imghttp = this.user.photoURL;
      this.authorDescription = this.db.object('/users/' + this.uid ).valueChanges();
      console.log(this.authorDescription);
    this.authorDescription.subscribe(ref => {
      this.description = ref.description;
    })
    });
      
  }


  ngOnInit() {
    
  }

  //Update User-Account name
  updateName(name : string) {
    this.authorName = name;
    console.log(this.auth.auth.currentUser);
    this.updateAccount();
  }

  updateDescription(description) {
    this.authorDescription =  description;
    this.updateAccount();
  }

  //Triggered when an image is selected
  selectImage(event) {
    this.selectedFiles = event.target.files;
    if(this.selectedFiles.item(0)){
      let file = this.selectedFiles.item(0);
    const uploadTask = this.afStorage.upload('/users/' + this.uid + '/' + 'display',file);
    this.imgsrc = uploadTask.downloadURL();
    console.log(this.imgsrc);
    const uploadFirebase = this.imgsrc.subscribe(src => {
      this.uploadImage(src);
    })
  }
}


  //Upload Image changes
  uploadImage(imgsource) {
    this.imghttp = imgsource;
    this.updateAccount();
    }


    //Update User acount 
    updateAccount() {
      this.auth.auth.currentUser.updateProfile({
        displayName : this.authorName,
        photoURL : this.imghttp
      }).then(function(){
        console.log("success");
      });
        this.db.database.ref('/users/' + this.auth.auth.currentUser.uid).set({
          displayName : this.authorName,
          photoURL : this.imghttp,
          description : this.authorDescription
        }).then(success => {
          console.log(success);
        }) 
      console.log(this.auth.auth.currentUser.email);
      console.log(this.auth.auth.currentUser.displayName);   
    }
  }
  
