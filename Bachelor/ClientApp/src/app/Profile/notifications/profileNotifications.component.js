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
var ProfileNotificationsComponent = /** @class */ (function () {
    function ProfileNotificationsComponent(sharedService, notificationService) {
        this.sharedService = sharedService;
        this.notificationService = notificationService;
    }
    ProfileNotificationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSub = this.sharedService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.loggedInSub = this.sharedService.loggedInCurrent.subscribe(function (loggedIn) { return _this.loggedIn = loggedIn; });
        this.notificationsSub = this.notificationService.notificationsCurrent.subscribe(function (noti) { return _this.notifications = noti; });
        this.getNotifications(this.user);
    };
    ProfileNotificationsComponent.prototype.ngOnDestroy = function () {
        this.userSub.unsubscribe();
        this.loggedInSub.unsubscribe();
        this.notificationsSub.unsubscribe();
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