import { Component,OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarService } from './navbar.service';
import { Subscription } from 'rxjs';
import { element } from 'protractor';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NotificationService } from '../Notification/notification.service';
import { UserService } from '../Users/users.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent {

  public numberOfNotifications: number;
  public notificationsSub: Subscription;

  userId: number;
  userIdSub: Subscription;

  loggedIn: boolean;
  loggedInSub: Subscription;

  constructor(private http: HttpClient,
    private userService: UserService,
    private navbarService: NavbarService,
    private notificationService: NotificationService,
    private router: Router) {
  }

  ngOnInit() {
    this.callGetUserIdCookie();
    this.userIdSub = this.userService.userIdCurrent.subscribe(userId => this.userId = userId);
    this.loggedInSub = this.userService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.notificationsSub = this.notificationService.numberOfNotificationsCurrent.subscribe(noti => this.numberOfNotifications = noti);
  }

  ngOnDestroy() {
    this.loggedInSub.unsubscribe();
    this.userIdSub.unsubscribe();
    this.notificationsSub.unsubscribe();
  }

  logOut() {
    this.userService.logOut();
  }

  async callGetUserIdCookie() {
    let userIdToken = await this.userService.GetCookieContent("userid");

    if (userIdToken) {
      let userId = await this.userService.DecodeToken(userIdToken);
      if (userId) {
        await this.userService.GetUser(userId);
        this.getNotificationsCount();
      }
    }
  }


  getNotificationsCount() {
    this.notificationService.getNumberOfNotifications(this.userId);
  }

  // When clicking on communities you're navigated to the all page
  // This is because [routerLink]="['communities/all']" wont activate nav-link when url doesnt include '/all'
  goToAll() {
    this.router.navigateByUrl("/communities/all");
  }
}
