import { Component,OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarService } from './navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['/navbar.component.css'],
})

export class NavbarComponent {
  public loggedIn: boolean;
  subscription: Subscription;

  constructor(private http: HttpClient, private navbarService: NavbarService) {
    this.loggedIn = navbarService.loggedIn;
  }

  ngOnInit() {
    this.subscription = this.navbarService.loggedInObserveable.subscribe(value => this.loggedIn = value);
  }


  updateNav() {
   // this.navbarService.getCookieValue();
    //this.loggedIn = this.navbarService.getLoggedIn();
    console.log(this.loggedIn);
  }
}
