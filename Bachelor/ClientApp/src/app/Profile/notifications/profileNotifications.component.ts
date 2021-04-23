import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { SharedService } from "../../Communities/shared/shared.service";
import { Notification } from "../../Models/Notification/Notification";
import { User } from "../../Models/Users/User";
import { NotificationService } from "../../Notification/notification.service";

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


  constructor(private sharedService: SharedService, private notificationService: NotificationService) { }


  ngOnInit() {
    this.userSub = this.sharedService.userCurrent.subscribe(user => this.user = user);
    this.loggedInSub = this.sharedService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.notificationsSub = this.notificationService.notificationsCurrent.subscribe(noti => this.notifications = noti);
    this.getNotifications(this.user);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.loggedInSub.unsubscribe();
    this.notificationsSub.unsubscribe();
  }

  //Makes call to service to get notifications for user
  getNotifications(user: User) {
    this.notificationService.getNotifications(user.id);
  }
}
