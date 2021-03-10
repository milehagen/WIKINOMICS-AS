"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var NavbarService = /** @class */ (function () {
    function NavbarService(http) {
        this.http = http;
        this.loggedIn = false;
        this.loggedInSubject = new rxjs_1.BehaviorSubject(this.loggedIn);
        this.loggedInObserveable = this.loggedInSubject.asObservable();
        this.loggedIn = false;
    }
    NavbarService.prototype.updateNav = function () {
        console.log("Bruker logget inn, setter loggetIn");
        this.loggedIn = true;
    };
    NavbarService.prototype.getCookieValue = function () {
        var _this = this;
        this.http.get("api/Cookie/GetCookieContent/" + "LoggedIn").subscribe(function (value) {
            console.log(value);
            if (value === 1) {
                _this.loggedIn = true;
            }
        }, function (error) { return console.log(error); });
        console.log("ferdig med get call, returnerer: " + this.loggedIn);
    };
    NavbarService.prototype.changeLoggedIn = function (value) {
        this.loggedInSubject.next(value);
    };
    NavbarService = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], NavbarService);
    return NavbarService;
}());
exports.NavbarService = NavbarService;
//# sourceMappingURL=navbar.service.js.map