"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationService = void 0;
var core_1 = require("@angular/core");
var VerificationService = /** @class */ (function () {
    function VerificationService(_http) {
        var _this = this;
        this._http = _http;
        //Checks whether a domain is in our list and therefor can be verified
        this.checkMail = function (address) {
            return new Promise((function (resolve) {
                _this._http.get("api/Verification/CheckMail/" + address)
                    .subscribe(function (response) {
                    resolve(true);
                }, function (error) {
                    resolve(false);
                });
            }));
        };
        //Sends verification mail
        this.sendVerification = function (experience, address) {
            return new Promise((function (resolve) {
                _this._http.get("api/Verification/SendVerification/" + experience.id + "/" + address)
                    .subscribe(function (response) {
                    resolve(true);
                }, function (error) {
                    resolve(false);
                });
            }));
        };
        //Verifies experience on backend
        this.verifyExperience = function (experienceId) {
            return new Promise((function (resolve) {
                _this._http.patch("api/Verification/Verify/" + experienceId, true)
                    .subscribe(function (response) {
                    resolve(true);
                }, function (error) {
                    resolve(false);
                });
            }));
        };
    }
    VerificationService = __decorate([
        core_1.Injectable()
    ], VerificationService);
    return VerificationService;
}());
exports.VerificationService = VerificationService;
//# sourceMappingURL=verification.service.js.map