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
exports.ProfileComponent = void 0;
var core_1 = require("@angular/core");
var shared_service_1 = require("../Communities/shared/shared.service");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(http, router, sharedService) {
        this.http = http;
        this.router = router;
        this.sharedService = sharedService;
        this.expNumber = 1;
        this.occupationArray = ["Student", "Full-time employee", "Business owner", "Entrepreneur", "None of the above"];
        this.Occupations = [
            { id: 0, occupation: "Student" },
            { id: 1, occupation: "Full-time employee" },
            { id: 2, occupation: "Busineess owner" },
            { id: 3, occupation: "Entrepreneur" },
            { id: 4, occupation: "None of the above" }
        ];
    }
    ProfileComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.sharedService.userCurrent.subscribe(function (user) { return _this.user = user; });
                this.sharedService.loggedInCurrent.subscribe(function (loggedIn) { return _this.loggedIn = loggedIn; });
                this.getIndustries();
                this.getSubjects();
                this.callGetUserIdCookie();
                return [2 /*return*/];
            });
        });
    };
    ProfileComponent.prototype.callGetUserIdCookie = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userIdToken, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.getTokenCookie()];
                    case 1:
                        userIdToken = _a.sent();
                        if (!userIdToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sharedService.getUserIdFromToken(userIdToken)];
                    case 2:
                        userId = _a.sent();
                        if (userId) {
                            this.sharedService.getUser(userId);
                            this.userCommunities = this.user.communities;
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /*  STUFF TO DO
     * 1. CHECK IF THE USER IS LOGGED IN --> IF NOT SEND THEM BACK TO THE LOG IN PAGE / SIGN UP
     * 2. IF THE USER IS LOGGED IN CHECK AND VERIFY THE JWT TOKEN, IF ITS NOT VERIFIED THEN MAKE THE USER LOG IN AGAIN TO REFRESH THE TOKEN
     * 3. DISPLAY THE USERS NAME AND CURRENT OCCUPATION
     * 4. DISPLAY A DESCREPTION MADE BY THE USER, THIS SHOULD BE POSSIBLE TO EDIT
     */
    ProfileComponent.prototype.addExp = function () {
        var currentExpNumber = String(this.expNumber);
        var tableBody = document.getElementById("tableExpBody");
        var tr = document.createElement("tr");
        var tdNumber = document.createElement("td");
        var tdArea = document.createElement("td");
        var tdProf = document.createElement("td");
        var tdTimeFrom = document.createElement("td");
        var tdTimeTo = document.createElement("td");
        //Set number of column
        tdNumber.append(currentExpNumber);
        //Add the Occupation dropdown
        var selOccupation = document.createElement("select");
        for (var _i = 0, _a = this.occupationArray; _i < _a.length; _i++) {
            var value = _a[_i];
            var opt = document.createElement("option");
            opt.innerHTML = value;
            selOccupation.append(opt);
        }
        tdArea.append(selOccupation);
        //Add the industry dropwdown
        var selIndustry = document.createElement("select");
        for (var _b = 0, _c = this.allIndustries; _b < _c.length; _b++) {
            var value = _c[_b];
            var opt = document.createElement("option");
            opt.innerHTML = value.title;
            selIndustry.append(opt);
        }
        tdProf.append(selIndustry);
        //Add time interval
        var tdYearFrom = document.createElement("td");
        var inpYearFrom = document.createElement("input");
        inpYearFrom.placeholder = "Year";
        tdYearFrom.append(inpYearFrom);
        var tdMonthFrom = document.createElement("td");
        var inpMonthFrom = document.createElement("input");
        inpMonthFrom.placeholder = "Month";
        tdMonthFrom.append(inpMonthFrom);
        tdTimeFrom.append(tdYearFrom, tdMonthFrom);
        var tdYearTo = document.createElement("td");
        var inpYearTo = document.createElement("input");
        inpYearTo.placeholder = "Year";
        tdYearTo.append(inpYearTo);
        var tdMonthTo = document.createElement("td");
        var inpMonthTo = document.createElement("input");
        inpMonthTo.placeholder = "Month";
        tdMonthTo.append(inpMonthTo);
        tdTimeTo.append(tdYearTo, tdMonthTo);
        tr.append(tdNumber, tdArea, tdProf, tdTimeFrom, tdTimeTo);
        tableBody.append(tr);
        this.expNumber += 1;
    };
    ProfileComponent.prototype.getIndustries = function () {
        var _this = this;
        this.http.get("api/User/GetAllIndustries").subscribe(function (data) {
            _this.allIndustries = data;
        }, function (error) { return console.log(error); });
    };
    ProfileComponent.prototype.getSubjects = function () {
        var _this = this;
        this.http.get("api/User/GetAllStudentSubjects").subscribe(function (data) {
            _this.allSubjects = data;
        }, function (error) { return console.log(error); });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: "app-home",
            templateUrl: "./profile.component.html",
            styleUrls: ['./profile.component.css'],
            providers: [shared_service_1.SharedService]
        })
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map