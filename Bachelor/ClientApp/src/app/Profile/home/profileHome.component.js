"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileHomeComponent = void 0;
var core_1 = require("@angular/core");
var ProfileHomeComponent = /** @class */ (function () {
    function ProfileHomeComponent(router, userService) {
        this.router = router;
        this.userService = userService;
    }
    ProfileHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSub = this.userService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.loggedInSub = this.userService.loggedInCurrent.subscribe(function (loggedIn) { return _this.loggedIn = loggedIn; });
    };
    ProfileHomeComponent.prototype.ngOnDestroy = function () {
        this.userSub.unsubscribe();
        this.loggedInSub.unsubscribe();
    };
    ProfileHomeComponent = __decorate([
        core_1.Component({
            selector: "app-home",
            templateUrl: "./profileHome.component.html",
            styleUrls: ['../profile.component.css'],
            providers: []
        })
    ], ProfileHomeComponent);
    return ProfileHomeComponent;
}());
exports.ProfileHomeComponent = ProfileHomeComponent;
//# sourceMappingURL=profileHome.component.js.map