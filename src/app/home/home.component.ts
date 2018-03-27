import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth : AngularFireAuth, public authService : AuthServiceService) { }

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
  }
}
