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
        var _this = this;
        if (this.checkIfEmailExists(this.signUpForm.controls.email.value)) {
            window.alert("E-Posten er allerede registrert");
            this.signUpForm.reset();
        }
        else {
            var user_1 = new User_1.User();
            user_1.firstname = this.signUpForm.controls.firstname.value;
            user_1.lastname = this.signUpForm.controls.lastname.value;
            user_1.age = this.signUpForm.controls.age.value;
            user_1.email = this.signUpForm.controls.email.value;
            user_1.password = this.signUpForm.controls.password.value;
            this.http.post('api/User/addUser', user_1).subscribe(function (retur) {
                window.alert("Registrering vellykket");
                console.log(user_1);
                _this.signUpForm.reset();
            }, function (error) { return console.log(error); });
        }
    };
    SignUpComponent.prototype.getAllUsers = function () {
        var _this = this;
        this.http.get("api/User/GetAllUsers").
            subscribe(function (data) {
            _this.allUsers = data;
            console.log(_this.allUsers);
        }, function (error) { return console.log("Kunne ikke hente fra DB"); });
    };
    // Takes in the email from the user to check if it's already registered in the DB
    // Returns true if it exsts, returns false otherwise
    SignUpComponent.prototype.checkIfEmailExists = function (email) {
        for (var _i = 0, _a = this.allUsers; _i < _a.length; _i++) {
            var value = _a[_i];
            if (email === value.email) {
                return true;
            }
            else {
                return false;
            }
        }
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