"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(http, userService, navbarService, notificationService, router) {
        this.http = http;
        this.userService = userService;
        this.navbarService = navbarService;
        this.notificationService = notificationService;
        this.router = router;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSub = this.userService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.userIdSub = this.userService.userIdCurrent.subscribe(function (userId) { return _this.userId = userId; });
        this.loggedInSub = this.userService.loggedInCurrent.subscribe(function (loggedIn) { return _this.loggedIn = loggedIn; });
        this.notificationsSub = this.notificationService.numberOfNotificationsCurrent.subscribe(function (noti) { return _this.numberOfNotifications = noti; });
    };
    //Checking every x milisecond if the user obj is ready to be used
    NavbarComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //I'm so sorry for this
        this.loopSub = rxjs_1.interval(250).subscribe((function (x) {
            _this.checkUserIsDefined();
        }));
    };
    NavbarComponent.prototype.ngOnDestroy = function () {
        this.userSub.unsubscribe();
        this.loggedInSub.unsubscribe();
        this.userIdSub.unsubscribe();
        this.notificationsSub.unsubscribe();
    };
    //Checks if a user is ready to be used for fetching 
    NavbarComponent.prototype.checkUserIsDefined = function () {
        if (this.user.id) {
            this.getNotificationsCount(this.user);
            this.loopSub.unsubscribe();
        }
    };
    NavbarComponent.prototype.logOut = function () {
        this.userService.logOut();
    };
    //Gets the number of notifications
    //This number is displayed in the red dot on profile button
    NavbarComponent.prototype.getNotificationsCount = function (user) {
        this.notificationService.getNumberOfNotifications(user.id);
    };
    // When clicking on communities you're navigated to the all page
    // This is because [routerLink]="['communities/all']" wont activate nav-link when url doesnt include '/all'
    NavbarComponent.prototype.goToAll = function () {
        this.router.navigateByUrl("/communities/all");
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.css'],
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map