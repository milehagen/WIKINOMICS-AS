"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var Notification_1 = require("../Models/Notification/Notification");
var NotificationService = /** @class */ (function () {
    function NotificationService(_http) {
        var _this = this;
        this._http = _http;
        //All notifications for a user
        this.notificationsSource = new rxjs_1.BehaviorSubject([]);
        this.notificationsCurrent = this.notificationsSource.asObservable();
        //Number of new notifications
        this.numberOfNotificationsSource = new rxjs_1.BehaviorSubject(0);
        this.numberOfNotificationsCurrent = this.numberOfNotificationsSource.asObservable();
        //If user is subscribed for notifications for current post
        this.isSubscribedSource = new rxjs_1.BehaviorSubject(null);
        this.isSubscribedCurrent = this.isSubscribedSource.asObservable();
        //Checks if a user is subscribed to a post for notification
        //If they are, the notification object is retrived
        this.findSubscription = function (userId, postId) {
            return new Promise(function (resolve, reject) {
                _this._http.get("api/Notification/FindSubscription/" + userId + "/" + postId)
                    .subscribe(function (response) {
                    if (response != null) {
                        _this.changeIsSubscribed(true);
                    }
                    else {
                        _this.changeIsSubscribed(false);
                    }
                    resolve(response);
                }, function (error) {
                    console.log(error);
                    _this.changeIsSubscribed(false);
                    resolve(null);
                });
            });
        };
        this.subscribe = function (notification) {
            return new Promise(function (resolve, reject) {
                _this._http.post("api/Notification/Subscribe", notification)
                    .subscribe(function (response) {
                    if (response) {
                        _this.changeIsSubscribed(true);
                    }
                    resolve(response);
                }, function (error) {
                    console.log(error);
                    resolve(false);
                });
            });
        };
        this.unsubscribe = function (notificationId) {
            return new Promise(function (resolve, reject) {
                _this._http.delete("api/Notification/Unsubscribe/" + notificationId)
                    .subscribe(function (response) {
                    if (response) {
                        _this.changeIsSubscribed(false);
                    }
                    resolve(response);
                }, function (error) {
                    console.log(error);
                    resolve(false);
                });
            });
        };
        this.sendNotification = function (postId, userCreatingNotiId) {
            return new Promise(function (resolve, reject) {
                _this._http.get("api/Notification/SendNotification/" + postId + "/" + userCreatingNotiId)
                    .subscribe(function (response) {
                    resolve(response);
                }, function (error) {
                    console.log(error);
                    resolve(false);
                });
            });
        };
    }
    NotificationService.prototype.changeNotifications = function (notifications) {
        this.notificationsSource.next(notifications);
    };
    NotificationService.prototype.changeNumberOfNotifications = function (value) {
        this.numberOfNotificationsSource.next(value);
    };
    NotificationService.prototype.changeIsSubscribed = function (value) {
        this.isSubscribedSource.next(value);
    };
    //Gets all notifications for a user
    NotificationService.prototype.getNotifications = function (userId) {
        var _this = this;
        this._http.get("api/Notification/GetNotifications/" + userId)
            .subscribe(function (data) {
            _this.changeNotifications(data);
            _this.changeNumberOfNotifications(data.length);
        }, function (error) {
            _this.changeNotifications(null);
            console.log(error);
        });
    };
    //Only finds the number of notifications for a user
    NotificationService.prototype.getNumberOfNotifications = function (userId) {
        var _this = this;
        this._http.get("api/Notification/GetNumberOfNotifications/" + userId)
            .subscribe(function (data) {
            _this.changeNumberOfNotifications(data);
        }, function (error) {
            _this.changeNumberOfNotifications(0);
            console.log(error);
        });
    };
    //Subscription method for subscribing with only user and post object
    NotificationService.prototype.subscribeWithUserPost = function (user, post) {
        var _this = this;
        var notification = new Notification_1.Notification();
        notification.user = user;
        notification.post = post;
        notification.notify = false;
        this._http.post("api/Notification/Subscribe", notification)
            .subscribe(function (data) {
            if (data) {
                _this.changeIsSubscribed(true);
            }
        }, function (error) {
            console.log(error);
        });
    };
    NotificationService = __decorate([
        core_1.Injectable()
    ], NotificationService);
    return NotificationService;
}());
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map