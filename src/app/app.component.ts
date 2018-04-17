import { AuthServiceService } from './auth-service.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';


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

  cat: string[] = [
    'All',
    'Technology',
    'Lifestyle',
    'Travel',
    'Code',
    'Miscellaneous'
  ]
  constructor(private router: Router, private auth : AngularFireAuth,  public authService : AuthServiceService) 
  { 
    if(authService.user){
      this.user = this.auth.authState.subscribe(auth => {
        this.user = auth;
        if(this.user != null) {
        this.name = this.user.displayName;
        this.image = this.user.photoURL;
        }
      })
    }
    
  }
  logout() {
    this.authService.logout();
  }
}
