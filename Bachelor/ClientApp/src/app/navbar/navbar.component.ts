import { Component,OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarService } from './navbar.service';
import { interval, Subscription } from 'rxjs';
import { element } from 'protractor';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NotificationService } from '../Notification/notification.service';
import { UserService } from '../Users/users.service';
import { User } from '../Models/Users/User';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent {

  public numberOfNotifications: number;
  public notificationsSub: Subscription;

  user: User;
  userSub: Subscription;

  userId: number;
  userIdSub: Subscription;

  loggedIn: boolean;
  loggedInSub: Subscription;

  loopSub: Subscription;

  constructor(private http: HttpClient,
    private userService: UserService,
    private navbarService: NavbarService,
    private notificationService: NotificationService,
    private router: Router) {
  }

  ngOnInit() {
    this.userSub = this.userService.userCurrent.subscribe(user => this.user = user);
    this.userIdSub = this.userService.userIdCurrent.subscribe(userId => this.userId = userId);
    this.loggedInSub = this.userService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.notificationsSub = this.notificationService.numberOfNotificationsCurrent.subscribe(noti => this.numberOfNotifications = noti);
    
  }

  //Checking every x milisecond if the user obj is ready to be used
  ngAfterViewInit() {
    //I'm so sorry for this
    this.loopSub = interval(250).subscribe((x => {
      this.checkUserIsDefined();
    }));
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.loggedInSub.unsubscribe();
    this.userIdSub.unsubscribe();
    this.notificationsSub.unsubscribe();
  }

  //Checks if a user is ready to be used for fetching 
  checkUserIsDefined() {
    if (this.user.id) {
      this.getNotificationsCount(this.user);
      this.loopSub.unsubscribe();
    }
  }


  logOut() {
    this.userService.logOut();
  }

  //Gets the number of notifications
  //This number is displayed in the red dot on profile button
  getNotificationsCount(user: User) {
    this.notificationService.getNumberOfNotifications(user.id);
  }

  // When clicking on communities you're navigated to the all page
  // This is because [routerLink]="['communities/all']" wont activate nav-link when url doesnt include '/all'
  goToAll() {
    this.router.navigateByUrl("/communities/all");
    console.log(this.numberOfNotifications);
  }
}
