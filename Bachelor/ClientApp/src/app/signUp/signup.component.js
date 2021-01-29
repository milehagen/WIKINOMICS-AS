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
    function SignUpComponent(http, formBuilder) {
        this.http = http;
        this.formBuilder = formBuilder;
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
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])
            ]
        };
        this.signUpForm = formBuilder.group(this.formValidation);
    }
    SignUpComponent.prototype.ngOnInit = function () {
        this.getAllUsers();
    };
    SignUpComponent.prototype.onSubmit = function () {
        this.addUser();
    };
    SignUpComponent.prototype.addUser = function () {
        var user = new User_1.User();
        user.firstname = this.signUpForm.controls.firstname.value;
        user.lastname = this.signUpForm.controls.lastname.value;
        user.age = this.signUpForm.controls.age.value;
        user.email = this.signUpForm.controls.email.value;
        user.password = this.signUpForm.controls.password.value;
        console.log(user);
        // DB brukes til comminty, fjern kommentar etterhvert
        /*
        this.http.post('api/User', user).subscribe(retur => {
          window.alert("Registrering vellykket");
          console.log(user);
          this.signUpForm.reset();
        },
          error => console.log(error)
        );
        */
    };
    SignUpComponent.prototype.getAllUsers = function () {
        var _this = this;
        this.http.get("api/User").
            subscribe(function (data) {
            _this.allUsers = data;
        }, function (error) { return console.log("Kunne ikke hente fra DB"); });
    };
    SignUpComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './signup.component.html',
        })
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=signup.component.js.map