import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm : FormGroup;
  user : any;

  constructor(private router: Router, private auth : AngularFireAuth, private location: Location) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email : new FormControl(),
      password : new FormControl()
    });
  }

  onFormSubmit(){
    this.user = this.loginForm.value;
    this.auth.auth.signInWithEmailAndPassword(this.user.email,this.user.password).then(success => {
      console.log(success, 'success');
      console.log(this.auth.auth.currentUser.email);
      this.location.back();
    }
    ).catch(err => {
      console.log('error');
    })
  }

}
