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

  constructor(private router: Router, private auth : AngularFireAuth, public authService : AuthServiceService) {
    if(!(this.authService.user)){
      this.router.navigate(['/login']);
    }
    this.user = this.auth.authState.subscribe(auth => {
      console.log(auth);
      this.user = auth;
      this.email = this.user.email;
      console.log(this.email);
    })
   }

  ngOnInit() {
    
  }

}
