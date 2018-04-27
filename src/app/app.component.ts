import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  name : string = "";
  user : any;
  image : string;
  userUID : any;

  messaging = firebase.messaging();

  cat: string[] = [
    'All',
    'Technology',
    'Lifestyle',
    'Travel',
    'Code',
    'Miscellaneous'
  ]
  constructor(private router: Router, private auth : AngularFireAuth,  public authService : AuthServiceService, private afs : AngularFirestore, private http : HttpClient) 
  { 
    this.messaging.usePublicVapidKey("BDey1pUU_jCAL8HR-062WocoKVO7J0V21lA28dUlISub4I5zEH-uOiOif3_4_AFCTGgTrFNEyk6_hvtgBMNQ3v0");

    if(authService.user){
      this.user = this.auth.authState.subscribe(auth => {
        this.user = auth;
        if(this.user != null) {
        this.name = this.user.displayName;
        this.image = this.user.photoURL;
        console.log('user')
        } else {
          console.log('no user')
          authService.anonymous();
          console.log(authService.user);
         // this.enableNotifications(); 
        }
        
      }) 
    }
     /*

    this.auth.auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        this.userUID = user.uid;
        console.log(this.userUID)
        // ...)
      }
    });
     */
  }
  setUID(uid){
    this.userUID = uid;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
  updateToken(userid,token){
    this.auth.authState.take(1).subscribe(user => {
      if (!user) return;
   
    const data = { [user.uid] : token };
    this.afs.collection<any>('fcmTokens/').add(data);
  })
  }
  enableNotifications(){
    this.messaging.requestPermission().then(() => {
      console.log('Permission Granted');
      return this.messaging.getToken();
    }).then(token => {
      console.log(token);
      this.updateToken(this.userUID, token)
    }).catch((err) => {
      console.log(err);
    })
    }
  }

