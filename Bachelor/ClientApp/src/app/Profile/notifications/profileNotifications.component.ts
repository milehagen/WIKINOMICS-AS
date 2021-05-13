import { Component, EventEmitter, Output } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/typings/esm5/slide-toggle";
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

  disableSlider = false;

  constructor(private userService: UserService, private notificationService: NotificationService, private sharedService: SharedService) { }


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
      this.setNotificationsToViewed(this.user);
      this.loopSub.unsubscribe();
    }
  }

  async emailNotificationToggler(event: MatSlideToggleChange) {
    console.log('toggle', event.checked);
    this.disableSlider = true;
    let ok = await this.notificationService.toggleEmailNotifications(this.user);

    if (ok) {
      this.userService.getUserInit();
      this.disableSlider = false;
      this.sharedService.openSnackBarMessage("Email notification settings changed", "Ok");
    }
    else {
      this.disableSlider = false;
      //Changing front-end toggler to show it didn't work
      this.user.emailUpdates = !this.user.emailUpdates;
    }

  }

  //Makes call to service to get notifications for user
  getNotifications(user: User) {
    this.notificationService.getNotifications(user.id);
  }

  //Sets notifications to viewed, so they don't spam you with the same notifications
  //This happens automatically when loading this page
  setNotificationsToViewed(user: User) {
    this.notificationService.setNotificationsToViewed(user);
  }
}
