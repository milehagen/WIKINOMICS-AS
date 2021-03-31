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
var User_1 = require("../../Models/Users/User");
var forms_1 = require("@angular/forms");
var Experience_1 = require("../../Models/Users/Experience");
var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(http, formBuilder, router, navbarService) {
        this.http = http;
        this.formBuilder = formBuilder;
        this.router = router;
        this.navbarService = navbarService;
        this.passString = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
        this.loggedIn = false;
        this.showDateInput = false;
        this.Occupations = [
            { id: 0, occupation: "Student" },
            { id: 1, occupation: "Full-time employee" },
            { id: 2, occupation: "Busineess owner" },
            { id: 3, occupation: "Entrepreneur" },
            { id: 4, occupation: "None of the above" }
        ];
        this.Gender = [
            { id: 0, gender: "Woman" },
            { id: 1, gender: "Man" },
            { id: 2, gender: "Transgender" },
            { id: 3, gender: "Rather not say" }
        ];
        this.signUpForm = this.formBuilder.group({
            firstname: '',
            lastname: '',
            age: '',
            email: '',
            password: '',
            occupation: '',
            gender: '',
            subjects: '',
            industry: '',
            startDate: '',
            endDate: '',
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
            ],
            occupation: [
                null, forms_1.Validators.required
            ],
            gender: [
                null, forms_1.Validators.required
            ],
            industry: [],
            subjects: [],
            startDate: [],
            endDate: [],
        };
        this.signUpForm = formBuilder.group(this.formValidation);
    }
    SignUpComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkLoginCookie();
        this.subscription = this.navbarService.loggedInObserveable.subscribe(function (value) { return _this.loggedIn = value; });
        this.getIndustries();
        this.getSubjects();
        this.selIndustry = this.signUpForm.controls.industry.value;
        this.selSubject = this.signUpForm.controls.subjects.value;
    };
    SignUpComponent.prototype.checkLoginCookie = function () {
        var _this = this;
        this.http.get("api/Cookie/GetCookieContent/" + "LoggedIn").subscribe(function (res) {
            if (res === 1) {
                _this.loggedIn = true;
            }
            else {
                _this.loggedIn = false;
            }
        });
    };
    SignUpComponent.prototype.onSubmit = function () {
        this.addUser();
    };
    SignUpComponent.prototype.addUser = function () {
        var _this = this;
        var experience = new Experience_1.Experience();
        experience.occupation = this.signUpForm.controls.occupation.value.occupation;
        // If the value is empty set the object to be empty aswell
        if (this.selSubject === null) {
            experience.studentSubject = {};
        }
        else {
            experience.studentSubject = this.selSubject;
        }
        if (this.selIndustry === null) {
            experience.industry = {};
        }
        else {
            experience.industry = this.selIndustry;
        }
        experience.startDate = this.signUpForm.controls.startDate.value;
        experience.endDate = this.signUpForm.controls.endDate.value;
        if (experience.startDate > experience.endDate)
            return window.alert("Feil i datoinput, vennligst sjekk igjen");
        var user = new User_1.User();
        user.firstname = this.signUpForm.controls.firstname.value;
        user.lastname = this.signUpForm.controls.lastname.value;
        user.age = this.signUpForm.controls.age.value;
        user.email = this.signUpForm.controls.email.value;
        user.password = this.signUpForm.controls.password.value;
        user.gender = this.signUpForm.controls.gender.value.gender;
        user.experience = experience;
        this.http.post('api/User/addUser', user, { responseType: 'text' }).subscribe(function (retur) {
            window.alert("Registrering vellykket");
            console.log(user);
            _this.http.get('api/User/GetToken/' + user.email, { responseType: 'text' }).subscribe(function (response) {
                console.log(response);
            }, function (error) { return console.log(error); });
            _this.http.get("api/Cookie/CreateLoggedInCookie/" + 1).toPromise();
            _this.navbarService.changeLoggedIn(true);
            _this.signUpForm.reset();
            _this.router.navigate(['/home']);
        }, function (error) { return console.log(error); });
    };
    SignUpComponent.prototype.browseAnonymously = function () {
        var _this = this;
        this.http.get('api/Cookie/CreateAnonymousCookie').subscribe(function (data) {
            _this.router.navigate(['/home']);
        }, function (error) { return console.log(error); });
    };
    SignUpComponent.prototype.test = function () {
        /*
         * FIRST GET CALL = GET COOKIE CONTENT
         *  SECOND GET CALL = DECODE JWT FROM COOKIE
        this.http.get("api/Cookie/GetCookieContent/" + "userid", { responseType: 'text'}).subscribe(response => {
          let token = response;
    
          this.http.get("api/JwtToken/DecodeToken/" + token).subscribe(res => {
          },
            error => console.log(error)
          );
    
    
        },
          error => console.log(error)
        );
        */
        /* CREATE LOGGED IN COOKIE
         * Value represents whether or not the user is logged in, 0 is for not logged in, 1 is for logged in
         */
        /* var value = "0";
         this.http.get("api/Cookie/CreateLoggedInCookie/" + value).subscribe(response => {
     
         },
           error => console.log(error)
         );
         */
        console.log(this.signUpForm.controls.startDate.value < this.signUpForm.controls.endDate.value);
    };
    SignUpComponent.prototype.updateOccupationStatus = function () {
        var val = this.signUpForm.controls.occupation.value.occupation;
        if (val === "Full-time employee") {
            this.showIndustry = true;
            this.showSubjects = false;
            this.selSubject = null;
        }
        else if (val == "Student") {
            this.showIndustry = false;
            this.showSubjects = true;
            this.selIndustry = null;
        }
        else {
            this.showSubjects = false;
            this.showIndustry = false;
            this.selIndustry = null;
            this.selSubject = null;
        }
        if (val != "None of the above") {
            this.showDateInput = true;
        }
        else {
            this.showDateInput = false;
        }
    };
    SignUpComponent.prototype.updateIndustryStatus = function () {
        if (this.signUpForm.controls.industry.value.title == "Annet") {
            this.showIndustryInput = true;
            this.selIndustry === null;
        }
        else {
            this.showIndustryInput = false;
            this.selIndustry = this.signUpForm.controls.industry.value;
        }
    };
    SignUpComponent.prototype.updateSubjectStatus = function () {
        this.selSubject = this.signUpForm.controls.subjects.value;
    };
    SignUpComponent.prototype.getIndustries = function () {
        var _this = this;
        this.http.get("api/User/GetAllIndustries").subscribe(function (data) {
            _this.allIndustries = data;
        }, function (error) { return console.log(error); });
    };
    SignUpComponent.prototype.getSubjects = function () {
        var _this = this;
        this.http.get("api/User/GetAllStudentSubjects").subscribe(function (data) {
            _this.allSubjects = data;
        }, function (error) { return console.log(error); });
    };
    SignUpComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './signup.component.html',
            styleUrls: ['../usersStyles.css']
        })
    ], SignUpComponent);
    return SignUpComponent;
}()); // End class
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=signup.component.js.map