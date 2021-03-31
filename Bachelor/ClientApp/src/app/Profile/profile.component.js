"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileComponent = void 0;
var core_1 = require("@angular/core");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(http) {
        this.http = http;
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
        this.getIndustries();
        this.getSubjects();
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
        })
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map