"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErfaringComponent = void 0;
var core_1 = require("@angular/core");
var ErfaringComponent = /** @class */ (function () {
    function ErfaringComponent(http, navbarService, router) {
        this.http = http;
        this.navbarService = navbarService;
        this.router = router;
    }
    ErfaringComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.navbarService.loggedInObserveable.subscribe(function (value) { return _this.loggedIn = value; });
        if (!this.loggedIn) {
            console.warn("Du er ikke logget inn");
            // this.router.navigate(['/home']);
        }
        this.http.get("api/Cookie/GetCookieContent/" + "userid", { responseType: 'text' }).subscribe(function (t) {
            var token = t;
            _this.http.get("api/JwtToken/DecodeToken/" + token).subscribe(function (id) {
                console.log(id);
            }, function (error) { return console.log(error); });
        }, function (error) { return console.log(error); });
    };
    ErfaringComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './Erfaring.component.html'
        })
    ], ErfaringComponent);
    return ErfaringComponent;
}());
exports.ErfaringComponent = ErfaringComponent;
//# sourceMappingURL=Erfaring.component.js.map