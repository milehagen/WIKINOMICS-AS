import { Component,OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarService } from './navbar.service';
import { Subscription } from 'rxjs';
import { element } from 'protractor';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent {
  public loggedIn: boolean;
  subscription: Subscription;

  constructor(private http: HttpClient, private navbarService: NavbarService, private router: Router) {
    this.loggedIn = navbarService.loggedIn;
  }

  ngOnInit() {
    this.subscription = this.navbarService.loggedInObserveable.subscribe(value => this.loggedIn = value);
  }

  logOut() {
    console.log("logger ut");
    this.navbarService.logOut();
  }

  // When clicking on communities you're navigated to the all page
  // This is because [routerLink]="['communities/all']" wont activate nav-link when url doesnt include '/all'
  goToAll() {
    this.router.navigateByUrl("/communities/all");
  }


}
