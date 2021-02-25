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
        this.Industry = [
            { id: 0, industry: "Landbruk" },
            { id: 1, industry: "Metalproduksjon" },
            { id: 2, industry: "Kjemisk industri" },
            { id: 3, industry: "Butikkvirksomhet" },
            { id: 4, industry: "Anleggsarbeid" },
            { id: 5, industry: "Utdanning" },
            { id: 7, industry: "Finans" },
            { id: 8, industry: "Mat / drikke industri" },
            { id: 9, industry: "Skogbruk" },
            { id: 10, industry: "Helsevesen" },
            { id: 11, industry: "Hotellvirksomhet" },
            { id: 12, industry: "Mineralvirksomhet" },
            { id: 13, industry: "Mekanisk / elekto ingeniør" },
            { id: 14, industry: "Media" },
            { id: 15, industry: "Olje og gass" },
            { id: 16, industry: "Post / telekommunikason" },
            { id: 17, industry: "Offentlig tjeneste" },
            { id: 18, industry: "Frakt" },
            { id: 19, industry: "Tekstilindustri" },
            { id: 20, industry: "Transport" },
            { id: 21, industry: "næringsindustri (vann, gass, strøm)" },
            { id: 22, industry: "Teknologi" }
        ];
        this.signUpForm = this.formBuilder.group({
            firstname: '',
            lastname: '',
            age: '',
            email: '',
            password: '',
            occupation: '',
            gender: '',
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
            industry: [
                null, forms_1.Validators.required
            ]
        };
        this.signUpForm = formBuilder.group(this.formValidation);
    }
    SignUpComponent.prototype.onSubmit = function () {
        this.addUser();
    };
    // EDIT - use https://miro.com/app/board/o9J_lVNWOIg=/ for information about what to add
    /*
     * name
     * email
     * gender
     * current occupation
     *  - (if student) -> choose school and field of study
     *  - full-time employee
     *  - business owner
     *  - entrepreneur
     * Industry of occupation
     */
    SignUpComponent.prototype.addUser = function () {
        var _this = this;
        var user = new User_1.User();
        user.firstname = this.signUpForm.controls.firstname.value;
        user.lastname = this.signUpForm.controls.lastname.value;
        user.age = this.signUpForm.controls.age.value;
        user.email = this.signUpForm.controls.email.value;
        user.password = this.signUpForm.controls.password.value;
        user.occupation = this.signUpForm.controls.occupation.value.occupation;
        user.gender = this.signUpForm.controls.gender.value.gender;
        user.industry = this.signUpForm.controls.industry.value.industry || '';
        if (user.occupation === "Student" && user.industry != null) {
            window.alert("Feil i input");
            this.signUpForm.reset();
        }
        else {
            this.http.post('api/User/addUser', user).subscribe(function (retur) {
                window.alert("Registrering vellykket");
                _this.http.get('api/User/GetToken/' + user.email, { responseType: 'text' }).subscribe(function (response) {
                    console.log(response);
                }, function (error) { return console.log(error); });
                _this.signUpForm.reset();
                _this.router.navigate(['/home']);
            }, function (error) { return console.log(error); });
        }
    };
    SignUpComponent.prototype.browseAnonymously = function () {
        var _this = this;
        this.http.get('api/User/CreateAnonymousCookie').subscribe(function (data) {
            _this.router.navigate(['/home']);
        }, function (error) { return console.log(error); });
    };
    SignUpComponent.prototype.updateOccupationStatus = function () {
        if ((this.signUpForm.controls.occupation.value.occupation) === "Full-time employee") {
            this.showIndustry = true;
        }
        else {
            this.showIndustry = false;
        }
    };
    SignUpComponent.prototype.test = function () {
        console.log(this.signUpForm.controls.industry.value.industry);
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