import { Component, EventEmitter, Output } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { SharedService } from "../../Communities/shared/shared.service";
import { Notification } from "../../Models/Notification/Notification";
import { User } from "../../Models/Users/User";
import { NotificationService } from "../../Notification/notification.service";
import { UserService } from "../../Users/users.service";

@Component({
  selector: "app-home",
  templateUrl: './profileNotifications.component.html',
  styleUrls: ['../profile.component.css'],
  providers: []
})

export class ProfileNotificationsComponent {
  public user: User;
  public userSub: Subscription;

  public loggedIn: boolean;
  public loggedInSub: Subscription;

  notifications: Notification[];
  notificationsSub: Subscription;

  loopSub: Subscription;

  constructor(private userService: UserService, private notificationService: NotificationService) { }


  ngOnInit() {
    this.userSub = this.userService.userCurrent.subscribe(user => this.user = user);
    this.loggedInSub = this.userService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.notificationsSub = this.notificationService.notificationsCurrent.subscribe(noti => this.notifications = noti);
  }


  //Checking every x milisecond if the user obj is ready to be used
  ngAfterViewInit() {
    //I'm so sorry for this
    this.loopSub = interval(250).subscribe((x => {
      this.checkUserIsDefined();
    }));
  }


  ngOnDestroy() {
    this.loopSub.unsubscribe();
    this.userSub.unsubscribe();
    this.loggedInSub.unsubscribe();
    this.notificationsSub.unsubscribe();
  }

  //Checks if a user is ready to be used for fetching 
  checkUserIsDefined() {
    if (this.user.id) {
      this.getNotifications(this.user);
      this.loopSub.unsubscribe();
    }
  }


  //Makes call to service to get notifications for user
  getNotifications(user: User) {
    this.notificationService.getNotifications(user.id);
  }
}
