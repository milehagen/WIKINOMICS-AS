"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogInComponent = void 0;
var core_1 = require("@angular/core");
var User_1 = require("../Models/User");
var LogInComponent = /** @class */ (function () {
    function LogInComponent(http, formBuilder, router) {
        this.http = http;
        this.formBuilder = formBuilder;
        this.router = router;
        this.logInForm = this.formBuilder.group({
            email: '',
            password: ''
        });
    }
    LogInComponent.prototype.ngOnInit = function () {
        this.getAllUsers();
    };
    LogInComponent.prototype.onSubmit = function () {
        this.logIn();
    };
    LogInComponent.prototype.getAllUsers = function () {
        var _this = this;
        this.http.get("api/User/GetAllUsers").
            subscribe(function (data) {
            _this.allUsers = data;
            console.log(_this.allUsers);
        }, function (error) { return console.log("Kunne ikke hente fra DB"); });
    };
    LogInComponent.prototype.checkIfEmailExists = function (email) {
        for (var _i = 0, _a = this.allUsers; _i < _a.length; _i++) {
            var value = _a[_i];
            if (email === value.email) {
                return value.id;
            }
            else {
                return null;
            }
        }
    };
    LogInComponent.prototype.logIn = function () {
        var _this = this;
        var user = new User_1.User();
        user.email = this.logInForm.controls.email.value;
        user.password = this.logInForm.controls.password.value;
        user.id = this.checkIfEmailExists(user.email);
        if (user.id != null) {
            this.http.post("api/User/LogIn", user).subscribe(function (response) {
                _this.router.navigate(['/home']);
            }, function (error) { return console.log(error); });
        }
        else {
            window.alert("Kunne ikke finne bruker");
        }
    };
    LogInComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './logIn.component.html',
        })
    ], LogInComponent);
    return LogInComponent;
}());
exports.LogInComponent = LogInComponent;
//# sourceMappingURL=logIn.component.js.map