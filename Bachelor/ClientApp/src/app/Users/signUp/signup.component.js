"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpComponent = void 0;
var core_1 = require("@angular/core");
var User_1 = require("../../Models/Users/User");
var forms_1 = require("@angular/forms");
var Experience_1 = require("../../Models/Users/Experience");
var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(http, formBuilder, router, navbarService, userService) {
        this.http = http;
        this.formBuilder = formBuilder;
        this.router = router;
        this.navbarService = navbarService;
        this.userService = userService;
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
        this.userService.GetCookieContent("LoggedIn").then(function (value) {
            if (value === 1) {
                _this.navbarService.changeLoggedIn(true);
            }
        }).catch(function (error) {
            console.log(error);
            _this.navbarService.changeLoggedIn(false);
        });
    };
    SignUpComponent.prototype.onSubmit = function () {
        this.addUser();
    };
    SignUpComponent.prototype.addUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var arrayExp, experience, user, _a, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        arrayExp = Array();
                        experience = new Experience_1.Experience();
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
                        experience.startDate = this.signUpForm.controls.startDate.value || null;
                        experience.endDate = this.signUpForm.controls.endDate.value || null;
                        if (experience.startDate > experience.endDate) {
                            return [2 /*return*/, window.alert("Feil i datoinput, vennligst sjekk igjen")];
                        }
                        user = new User_1.User();
                        user.firstname = this.signUpForm.controls.firstname.value;
                        user.lastname = this.signUpForm.controls.lastname.value;
                        user.age = this.signUpForm.controls.age.value;
                        user.email = this.signUpForm.controls.email.value;
                        user.password = this.signUpForm.controls.password.value;
                        user.gender = this.signUpForm.controls.gender.value.gender;
                        arrayExp.push(experience);
                        user.experience = arrayExp;
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, this.userService.addUser(user)];
                    case 1:
                        _c = [
                            _d.sent()
                        ];
                        return [4 /*yield*/, this.userService.GetToken(user.email)];
                    case 2:
                        _c = _c.concat([
                            _d.sent()
                        ]);
                        return [4 /*yield*/, this.userService.CreateLoggedInCookie(1)];
                    case 3:
                        _b.apply(_a, [_c.concat([
                                _d.sent()
                            ])]).then(function (values) {
                            _this.navbarService.changeLoggedIn(true);
                            _this.signUpForm.reset();
                            _this.router.navigate(['/erfaring']);
                            console.log(values);
                        }).catch(function (errors) {
                            console.log(errors);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SignUpComponent.prototype.browseAnonymously = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.CreateAnonymousCookie().then(function (response) {
                            console.log(response);
                            _this.router.navigate(['/home']);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SignUpComponent.prototype.test = function () {
        console.log("ingenting");
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
        this.userService.GetIndustries().then(function (response) {
            _this.allIndustries = response;
        }).catch(function (error) {
            console.log(error);
        });
    };
    SignUpComponent.prototype.getSubjects = function () {
        var _this = this;
        this.userService.GetStudentSubjects().then(function (response) {
            _this.allSubjects = response;
        }).catch(function (error) {
            console.log(error);
        });
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