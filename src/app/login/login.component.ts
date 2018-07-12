import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase';
import { WOW } from 'wowjs/dist/wow.min';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm : FormGroup;
  user : any;
  public authState : any

  constructor(private router: Router, private auth : AngularFireAuth, private location: Location, public authService : AuthServiceService) { }

  ngOnInit() {
    new WOW().init();
    this.loginForm = new FormGroup({
      email : new FormControl(),
      password : new FormControl()
    });
  }

  onFormSubmit(){
    this.user = this.loginForm.value;
    this.authService.login(this.user.email,this.user.password);
    this.router.navigate(['/home']);
  }

}
