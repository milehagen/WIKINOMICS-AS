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
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(http, navbarService) {
        this.http = http;
        this.navbarService = navbarService;
        this.loggedIn = navbarService.loggedIn;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.navbarService.loggedInObserveable.subscribe(function (value) { return _this.loggedIn = value; });
    };
    NavbarComponent.prototype.updateNav = function () {
        // this.navbarService.getCookieValue();
        //this.loggedIn = this.navbarService.getLoggedIn();
        console.log(this.loggedIn);
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['/navbar.component.css'],
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map