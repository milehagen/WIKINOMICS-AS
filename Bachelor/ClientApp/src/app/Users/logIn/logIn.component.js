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
var forms_1 = require("@angular/forms");
var User_1 = require("../../Models/User");
var LogInComponent = /** @class */ (function () {
    function LogInComponent(http, formBuilder, router) {
        this.http = http;
        this.formBuilder = formBuilder;
        this.router = router;
        this.passString = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
        this.formValidation = {
            email: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])
            ],
            password: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern(this.passString)])
            ]
        };
        this.logInForm = this.formBuilder.group({
            email: '',
            password: ''
        });
        this.logInForm = this.formBuilder.group(this.formValidation);
    }
    LogInComponent.prototype.onSubmit = function () {
        this.logIn();
    };
    // Main log in function, authenticates the user and creates a JWT for later use
    LogInComponent.prototype.logIn = function () {
        var _this = this;
        var user = new User_1.User();
        user.email = this.logInForm.controls.email.value;
        user.password = this.logInForm.controls.password.value;
        this.http.post("api/User/LogIn", user).subscribe(function (response) {
            // Need to specify the response type since the deafult is set to recieving JSON
            _this.http.get("api/User/GetToken/" + user.email, { responseType: 'text' }).subscribe(function (data) {
            }, function (error) { return console.log(error); }); // End GET-call
            _this.router.navigate(['/home']);
        }, function (error) { return console.log("nei"); });
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