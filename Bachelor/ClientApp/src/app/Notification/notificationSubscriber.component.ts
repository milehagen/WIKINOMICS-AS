import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../Models/Communities/Post";
import { Notification } from "../Models/Notification/Notification";
import { User } from "../Models/Users/User";
import { NotificationService } from './notification.service';


@Component({
  selector: 'notificationSubscriber-component',
  template: `<ng-container *ngIf="subscriptionChecked">
                <ng-container *ngIf="isSubscribed"><button class="btn btn-sm btn-warning" (click)="unsubscribe(notification)">Unsubscribe from notifications</button></ng-container>
                <ng-container *ngIf="!isSubscribed"><button class="btn btn-sm btn-success" (click)="subscribe(user, post)">Subscribe for notifications</button></ng-container>
                <br />
             </ng-container>`,
  providers: []
})


export class NotificationSubscriberComponent implements OnInit {
  @Input() public user: User;
  @Input() public post: Post;

  notification: Notification;

  subscriptionChecked: boolean; //Whether users subscription to a thread has been checked, no matter the outcome

  isSubscribed: boolean;
  isSubscribedSub: Subscription;


  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.checkSubscription(this.user, this.post);
    this.isSubscribedSub = this.notificationService.isSubscribedCurrent.subscribe(isSubbed => this.isSubscribed = isSubbed);
  }

  ngOnDestroy() {
    this.isSubscribedSub.unsubscribe();
  }


  //Checks if the given user is subscribed to the entity this component is attached to
  //View should not be loaded until after check is complete
  async checkSubscription(user: User, post: Post) {
    this.notification = await this.notificationService.findSubscription(user.id, post.id);

    this.subscriptionChecked = true;
  }

  //Subscribe for notifications
  async subscribe(user: User, post: Post) {
    let notification = new Notification();
    notification.user = user;
    notification.post = post;
    notification.notify = false;


    let ok = await this.notificationService.subscribe(notification);

    if (ok) {
      this.checkSubscription(user, post);
    }
  }


  //Unsubscribe from notifications
  async unsubscribe(notification: Notification) {
    await this.notificationService.unsubscribe(notification.id);
  }

}
