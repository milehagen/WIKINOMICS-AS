"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileNotificationsComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ProfileNotificationsComponent = /** @class */ (function () {
    function ProfileNotificationsComponent(userService, notificationService) {
        this.userService = userService;
        this.notificationService = notificationService;
    }
    ProfileNotificationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSub = this.userService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.loggedInSub = this.userService.loggedInCurrent.subscribe(function (loggedIn) { return _this.loggedIn = loggedIn; });
        this.notificationsSub = this.notificationService.notificationsCurrent.subscribe(function (noti) { return _this.notifications = noti; });
    };
    //Checking every x milisecond if the user obj is ready to be used
    ProfileNotificationsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //I'm so sorry for this
        this.loopSub = rxjs_1.interval(250).subscribe((function (x) {
            _this.checkUserIsDefined();
        }));
    };
    ProfileNotificationsComponent.prototype.ngOnDestroy = function () {
        this.loopSub.unsubscribe();
        this.userSub.unsubscribe();
        this.loggedInSub.unsubscribe();
        this.notificationsSub.unsubscribe();
    };
    //Checks if a user is ready to be used for fetching 
    ProfileNotificationsComponent.prototype.checkUserIsDefined = function () {
        if (this.user.id) {
            this.getNotifications(this.user);
            this.loopSub.unsubscribe();
        }
    };
    //Makes call to service to get notifications for user
    ProfileNotificationsComponent.prototype.getNotifications = function (user) {
        this.notificationService.getNotifications(user.id);
    };
    ProfileNotificationsComponent = __decorate([
        core_1.Component({
            selector: "app-home",
            templateUrl: './profileNotifications.component.html',
            styleUrls: ['../profile.component.css'],
            providers: []
        })
    ], ProfileNotificationsComponent);
    return ProfileNotificationsComponent;
}());
exports.ProfileNotificationsComponent = ProfileNotificationsComponent;
//# sourceMappingURL=profileNotifications.component.js.map