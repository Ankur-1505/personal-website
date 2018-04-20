import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth }     from 'angularfire2/auth';
import * as firebase from 'firebase';

import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class MessagingService {

  messaging = firebase.messaging()
  currentMessage = new BehaviorSubject(null)

  constructor(private afs : AngularFirestore, private afAuth: AngularFireAuth) { }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
     console.log("Message received. ", payload);
     this.currentMessage.next(payload)
   });

 }
}
