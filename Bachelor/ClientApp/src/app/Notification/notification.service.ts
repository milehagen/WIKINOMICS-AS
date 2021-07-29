import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { consoleTestResultHandler } from "tslint/lib/test";
import { Post } from "../Models/Communities/Post";
import { Notification } from "../Models/Notification/Notification";
import { User } from "../Models/Users/User";


@Injectable()
export class NotificationService {

  //All notifications for a user
  public notificationsSource = new BehaviorSubject<Notification[]>([]);
  public notificationsCurrent = this.notificationsSource.asObservable();

  //Number of new notifications
  public numberOfNotificationsSource = new BehaviorSubject<number>(0);
  public numberOfNotificationsCurrent = this.numberOfNotificationsSource.asObservable();

  //If user is subscribed for notifications for current post
  public isSubscribedSource = new BehaviorSubject<boolean>(null);
  public isSubscribedCurrent = this.isSubscribedSource.asObservable();


  constructor(private _http: HttpClient) {}

  changeNotifications(notifications: Notification[]) {
    this.notificationsSource.next(notifications);
  }

  changeNumberOfNotifications(value: number) {
    this.numberOfNotificationsSource.next(value);
  }


  changeIsSubscribed(value: boolean) {
    this.isSubscribedSource.next(value);
  }


  //Checks if a user is subscribed to a post for notification
  //If they are, the notification object is retrived
  findSubscription = (userId: number, postId: number): Promise<Notification> => {
    return new Promise((resolve, reject) => {
      this._http.get<Notification>("api/Notification/FindSubscription/" + userId + "/" + postId)
        .subscribe(response => {
          if (response != null) {
            this.changeIsSubscribed(true);
          }
          else { this.changeIsSubscribed(false); }
          resolve(response);
        }, error => {
          console.log(error);
          this.changeIsSubscribed(false);
          resolve(null);
        })
    })
  }

  subscribe = (notification: Notification): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this._http.post<boolean>("api/Notification/Subscribe", notification)
        .subscribe(response => {
          if (response) {
            this.changeIsSubscribed(true);
          }

          resolve(response);
        }, error => {
          console.log(error);
          resolve(false);
        });
    });
  }

  unsubscribe = (notificationId: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this._http.delete<boolean>("api/Notification/Unsubscribe/" + notificationId)
        .subscribe(response => {
          if (response) {
            this.changeIsSubscribed(false);
          }
          resolve(response);
        }, error => {
          console.log(error);
          resolve(false);
        })
    })
  }

  sendNotification = (postId: number, userCreatingNotiId: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this._http.get<boolean>("api/Notification/SendNotification/" + postId + "/" + userCreatingNotiId)
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.log(error);
          resolve(false);
        });
    });
  }

  //Gets all notifications for a user
  getNotifications(userId: number) {
    this._http.get<Notification[]>("api/Notification/GetNotifications/" + userId)
      .subscribe(data => {
        this.changeNotifications(data);
        this.changeNumberOfNotifications(data.length);
      },
        error => {
          this.changeNotifications(null);
          console.log(error)
        });
  }

  //Only finds the number of notifications for a user
  getNumberOfNotifications(userId: number) {
    this._http.get<number>("api/Notification/GetNumberOfNotifications/" + userId)
      .subscribe(data => {
        this.changeNumberOfNotifications(data);
      },
        error => {
          this.changeNumberOfNotifications(0);
          console.log(error)
        });
  }

  //Subscription method for subscribing with only user and post object
  subscribeWithUserPost(user: User, post: Post) {
    let notification = new Notification();
    notification.user = user;
    notification.post = post;
    notification.notify = false;

    this._http.post<boolean>("api/Notification/Subscribe", notification)
      .subscribe(data => {
        if (data) {
          this.changeIsSubscribed(true);
        }
      }, error => {
        console.log(error);
      })
  }

  toggleEmailNotifications= (user: User): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this._http.get<boolean>("api/Notification/ToggleMailNotifications/" + user.id)
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.log(error);
          resolve(false);
        });
    });
  }

  setNotificationsToViewed(user: User) {
    this._http.get<boolean>("api/Notification/setNotificationsToViewed/" + user.id)
      .subscribe(data => {
        this.changeNumberOfNotifications(0);
        this.changeNotifications(null);
      }, error => {
        console.log(error);
      })
  }

  sendMail(post: Post, user: User) {
    this._http.get<boolean>("api/Notification/SendMail/" + post.id + "/" + user.id)
      .subscribe(data => {

      }, error => {
        console.log(error);
      });
  }

}
