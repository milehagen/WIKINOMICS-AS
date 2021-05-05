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
exports.ProfileExperienceComponent = void 0;
var core_1 = require("@angular/core");
var Experience_1 = require("../../Models/Users/Experience");
var ProfileExperienceComponent = /** @class */ (function () {
    function ProfileExperienceComponent(http, router, sharedService, userService, formBuilder) {
        this.http = http;
        this.router = router;
        this.sharedService = sharedService;
        this.userService = userService;
        this.formBuilder = formBuilder;
        this.expNumber = 1;
        this.showIndustry = false;
        this.showSubjects = false;
        this.showBusiness = false;
        this.showForm = true;
        this.ShowExperienceDiv = false;
        this.communities = true;
        this.Occupations = [
            { id: 0, occupation: "Student" },
            { id: 1, occupation: "Full-time employee" },
            { id: 2, occupation: "Business owner" },
            { id: 3, occupation: "Entrepreneur" },
            { id: 4, occupation: "None of the above" }
        ];
        this.formAddExperience = this.formBuilder.group({
            occupation: [],
            industry: [],
            subjects: [],
            startDate: [],
            endDate: [],
            business: [],
        });
    }
    ProfileExperienceComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.userSub = this.userService.userCurrent.subscribe(function (user) { return _this.user = user; });
                this.userIdSub = this.userService.userIdCurrent.subscribe(function (userId) { return _this.userId = userId; });
                this.loggedInSub = this.userService.loggedInCurrent.subscribe(function (loggedIn) { return _this.loggedIn = loggedIn; });
                this.userService.GetIndustries().then(function (response) { _this.allIndustries = response; });
                this.userService.GetStudentSubjects().then(function (response) { _this.allSubjects = response; });
                this.getLoggedInUser();
                return [2 /*return*/];
            });
        });
    };
    ProfileExperienceComponent.prototype.ngOnDestroy = function () {
        this.userSub.unsubscribe();
        this.loggedInSub.unsubscribe();
        this.userIdSub.unsubscribe();
    };
    ProfileExperienceComponent.prototype.getLoggedInUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.userService.userCurrent == null || this.userService.userCurrent == undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userService.getUserInit()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ProfileExperienceComponent.prototype.submit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var form, newExperience;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        form = this.formAddExperience.controls;
                        newExperience = new Experience_1.Experience();
                        newExperience.occupation = form.occupation.value.occupation || null;
                        newExperience.studentSubject = form.subjects.value || null;
                        newExperience.industry = form.industry.value || null;
                        newExperience.startDate = form.startDate.value || null;
                        newExperience.endDate = form.endDate.value || null;
                        newExperience.business = form.business.value || null;
                        return [4 /*yield*/, this.userService.AddExperience(newExperience, this.userId).then(function () {
                                _this.formAddExperience.reset();
                                _this.userService.GetUser(_this.userId).then(function (updatedUser) {
                                    _this.userService.changeUser(updatedUser);
                                });
                                _this.sharedService.openSnackBarMessage("Erfaring lagt til", "Ok");
                            }).catch(function (error) {
                                _this.sharedService.openSnackBarMessage("Kunne ikke legge til erfaring", "Ok");
                                console.log(error);
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ProfileExperienceComponent.prototype.showFormBlock = function () {
        this.showForm = true;
        this.ShowExperienceDiv = false;
    };
    ProfileExperienceComponent.prototype.ShowExperience = function () {
        this.showForm = false;
        this.ShowExperienceDiv = true;
    };
    ProfileExperienceComponent.prototype.updateOccupationStatus = function () {
        var value = this.formAddExperience.controls.occupation.value.occupation;
        if (value === "Student") {
            this.showSubjects = true;
            this.showIndustry = false;
            this.showBusiness = false;
        }
        else if (value === "Full-time employee") {
            this.showSubjects = false;
            this.showIndustry = true;
            this.showBusiness = false;
        }
        else if (value === "Business owner" || value === "Entrepreneur") {
            this.showBusiness = true;
            this.showIndustry = true;
            this.showSubjects = false;
        }
    };
    ProfileExperienceComponent.prototype.DateCheckbox = function (event) {
        console.log(event.currentTarget.checked);
        if (event.currentTarget.checked) {
            document.getElementById("endDate").disabled = true;
        }
        else {
            document.getElementById("endDate").disabled = false;
        }
    };
    ProfileExperienceComponent.prototype.test = function (t) {
        console.log(t);
    };
    ProfileExperienceComponent = __decorate([
        core_1.Component({
            selector: "profile-experience-component",
            templateUrl: "./profileExperience.component.html",
            styleUrls: ['../profile.component.css']
        })
    ], ProfileExperienceComponent);
    return ProfileExperienceComponent;
}());
exports.ProfileExperienceComponent = ProfileExperienceComponent;
//# sourceMappingURL=profileExperience.component.js.map