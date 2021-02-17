"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpComponent = void 0;
var core_1 = require("@angular/core");
var User_1 = require("../Models/User");
var forms_1 = require("@angular/forms");
var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(http, formBuilder, router) {
        this.http = http;
        this.formBuilder = formBuilder;
        this.router = router;
        this.passString = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
        this.signUpForm = this.formBuilder.group({
            firstname: '',
            lastname: '',
            age: '',
            email: '',
            password: '',
            uniqueID: ''
        });
        this.formValidation = {
            firstname: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[a-zA-ZæøåÆØÅ]{2,35}')])
            ],
            lastname: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('[a-zA-ZæøåÆØÅ]{2,35}')])
            ],
            age: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.min(13), forms_1.Validators.max(120), forms_1.Validators.pattern('^[0-9]{2,3}')])
            ],
            email: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])
            ],
            password: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern(this.passString)])
            ]
        };
        this.signUpForm = formBuilder.group(this.formValidation);
    }
    SignUpComponent.prototype.onSubmit = function () {
        this.addUser();
    };
    SignUpComponent.prototype.addUser = function () {
        var _this = this;
        var user = new User_1.User();
        user.firstname = this.signUpForm.controls.firstname.value;
        user.lastname = this.signUpForm.controls.lastname.value;
        user.age = this.signUpForm.controls.age.value;
        user.email = this.signUpForm.controls.email.value;
        user.password = this.signUpForm.controls.password.value;
        this.http.post('api/User/addUser', user).subscribe(function (retur) {
            window.alert("Registrering vellykket");
            _this.http.get('api/User/GetToken/' + user.email, { responseType: 'text' }).subscribe(function (response) {
                console.log(response);
            }, function (error) { return console.log(error); });
            _this.signUpForm.reset();
            _this.router.navigate(['/home']);
        }, function (error) { return console.log(error); });
    };
    SignUpComponent.prototype.browseAnonymously = function () {
        console.log("hei");
        this.http.get('api/User/CreateAnonymousCookie').subscribe(function (data) {
            console.log("funket");
        }, function (error) { return console.log(error); });
    };
    SignUpComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './signup.component.html',
        })
    ], SignUpComponent);
    return SignUpComponent;
}()); // End class
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=signup.component.js.map