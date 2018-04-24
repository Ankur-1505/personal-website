import { BlogpostsService } from './blogposts.service';
import { AuthServiceService } from './auth-service.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from './../environments/environment';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule , NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { NgxEditorModule } from 'ngx-editor';
import { AngularFirestoreModule } from 'angularfire2/firestore';


import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareButtonsModule } from '@ngx-share/buttons';

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
import { SpinnerComponent } from './ui/spinner/spinner.component';
import { UserComponent } from './user/user.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ClipboardModule } from 'ngx-clipboard';
import { ScrollingDirective } from './scrolling.directive';


var config = {
  apiKey: "AIzaSyCG-WPcL2b3jPE7CJU8ihCyvkBm8iraC-4",
  authDomain: "websiteproject-sanketnaik99.firebaseapp.com",
  databaseURL: "https://websiteproject-sanketnaik99.firebaseio.com",
  projectId: "websiteproject-sanketnaik99",
  storageBucket: "websiteproject-sanketnaik99.appspot.com",
  messagingSenderId: "624648720335",
  gcm_sender_id : "103953800507"
};


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    BlogComponent,
    WriteArticleComponent,    
    ReadArticleComponent, LoginComponent, UserAccountComponent, SpinnerComponent, UserComponent, ScrollingDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    NgxEditorModule,
    FormsModule,
    HttpClientModule,
    AngularFireStorageModule,
    InfiniteScrollModule,
    ClipboardModule,
    ShareButtonsModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ AuthServiceService, BlogpostsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
