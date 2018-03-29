import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
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
  file : File;
  selectedFiles : FileList;
  imgsrc; 
  display: any;
  constructor(private router: Router, private auth : AngularFireAuth, public authService : AuthServiceService, private afStorage: AngularFireStorage) {
    if(!(this.authService.user)){
      this.router.navigate(['/login']);
    }
    this.user = this.auth.authState.subscribe(auth => {
      this.user = auth;
      this.email = this.user.email;
      this.authorName = this.user.displayName;
      this.uid = this.user.uid,
      this.display = this.user.photoURL
    })
    console.log(this.imgsrc);
   }

  ngOnInit() {
    
  }
  updateName(name : string) {
    this.authorName = name;
    console.log(this.auth.auth.currentUser);
    this.auth.auth.currentUser.updateProfile({
      displayName : this.authorName,
      photoURL : this.imgsrc
    }).then(function(){
      console.log("success");
    }); 
    console.log(this.auth.auth.currentUser.email);
    console.log(this.auth.auth.currentUser.displayName);   
  }

  selectImage(event) {
    this.selectedFiles = event.target.files;
    if(this.selectedFiles.item(0)){
      let file = this.selectedFiles.item(0);
    const uploadTask = this.afStorage.upload('/users/' + this.uid + '/' + 'display',file);
    this.imgsrc = uploadTask.downloadURL();
    console.log(this.imgsrc.value);
    this.uploadImage(this.imgsrc);
    
  }
}
  uploadImage(imgsource) {
    console.log(this.auth.auth.currentUser);
    console.log(imgsource.value);
    this.auth.auth.currentUser.updateProfile({
      displayName : this.authorName,
      photoURL: "https://firebasestorage.googleapis.com/v0/b/websiteproject-sanketnaik99.appspot.com/o/users%2FuWgdnPlr0CZe0IdyPzwOuNwybnz2%2Fdisplay?alt=media&token=277870c8-cdd4-4001-9e59-4386c9cdd1b6"
    }).then(function(){
      console.log("image Uploaded");
    });
    console.log(this.auth.auth.currentUser);
    }
  }
  
