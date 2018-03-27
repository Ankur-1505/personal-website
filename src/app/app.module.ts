import { AuthServiceService } from './auth-service.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from './../environments/environment';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule , NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgxEditorModule } from 'ngx-editor';


import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BlogComponent } from './blog/blog.component';
import { WriteArticleComponent } from './write-article/write-article.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ReadArticleComponent } from './read-article/read-article.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserAccountComponent } from './user-account/user-account.component';



var config = {
  apiKey: "AIzaSyCG-WPcL2b3jPE7CJU8ihCyvkBm8iraC-4",
  authDomain: "websiteproject-sanketnaik99.firebaseapp.com",
  databaseURL: "https://websiteproject-sanketnaik99.firebaseio.com",
  projectId: "websiteproject-sanketnaik99",
  storageBucket: "websiteproject-sanketnaik99.appspot.com",
  messagingSenderId: "624648720335"
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    BlogComponent,
    WriteArticleComponent,    
    ReadArticleComponent, LoginComponent, UserAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ReactiveFormsModule,
    NgxEditorModule,
    FormsModule,
    HttpClientModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ AuthServiceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
