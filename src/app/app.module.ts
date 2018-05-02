import { SeoService } from './seo.service';
import { BlogpostsService } from './blogposts.service';
import { AuthServiceService } from './auth-service.service';
import { environment } from './../environments/environment';


//Bootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';

//AngularFire2
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';

//Angular Modules
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { NgModule , NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

//Material Design Module 
import { MaterialModule } from './material.module';

var config = {
  apiKey: "AIzaSyDCztfnvayy-O1jL0Ykl6OLg-tMjxCIOt8",
    authDomain: "website-8590d.firebaseapp.com",
    databaseURL: "https://website-8590d.firebaseio.com",
    projectId: "website-8590d",
    storageBucket: "website-8590d.appspot.com",
    messagingSenderId: "299873560388"
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireStorageModule,
    MaterialModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ AuthServiceService, BlogpostsService, SeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
