import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';



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

  constructor(private router: Router, private auth : AngularFireAuth, public authService : AuthServiceService) {
    if(!(this.authService.user)){
      this.router.navigate(['/login']);
    }
    this.user = this.auth.authState.subscribe(auth => {
      this.user = auth;
      this.email = this.user.email;
      this.authorName = this.user.displayName;
    })
   }

  ngOnInit() {
    
  }
  updateName(name : string) {
    this.authorName = name;
    console.log(this.auth.auth.currentUser);
    this.auth.auth.currentUser.updateProfile({
      displayName : name,
      photoURL : ""
    }).then(function(){
      console.log("success");
    }); 
    console.log(this.auth.auth.currentUser.email);
    console.log(this.auth.auth.currentUser.displayName);   
  }

}
