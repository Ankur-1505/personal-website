import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthServiceService {

  private authState : any;
  user: any;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.auth.currentUser;
    console.log(this.user)
   }

   login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        console.log(firebase.auth().currentUser);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
      this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }
  anonymous(){
    console.log('anonymous')
    this.afAuth.auth.signInAnonymously()
    .catch(err => {
      console.log('Something went wrong:',err.message);
    });
    this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }


  logout() {
    this.afAuth.auth.signOut();
  }

}
