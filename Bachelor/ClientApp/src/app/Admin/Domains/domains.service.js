"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainsService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var DomainsService = /** @class */ (function () {
    function DomainsService(_http) {
        var _this = this;
        this._http = _http;
        //Verified domains
        this.verifiedDomainsSource = new rxjs_1.BehaviorSubject([]);
        this.verifiedDomainsCurrent = this.verifiedDomainsSource.asObservable();
        //Unverified domains
        this.unverifiedDomainsSource = new rxjs_1.BehaviorSubject([]);
        this.unverifiedDomainsCurrent = this.unverifiedDomainsSource.asObservable();
        //Adds a domain, or verifies one that is in the DB but not yet verified
        this.addDomain = function (domain) {
            return new Promise((function (resolve) {
                _this._http.post("api/Verification/Add", domain)
                    .subscribe(function (respose) {
                    resolve(true);
                }, function (error) {
                    resolve(false);
                });
            }));
        };
        //Deletes a domain
        this.deleteDomain = function (domain) {
            return new Promise((function (resolve) {
                _this._http.delete("api/Verification/Delete/" + domain.name)
                    .subscribe(function (response) {
                    resolve(true);
                }, function (error) {
                    resolve(false);
                });
            }));
        };
    }
    DomainsService.prototype.changeVerifiedDomains = function (domains) {
        this.verifiedDomainsSource.next(domains);
    };
    DomainsService.prototype.changeUnverifiedDomains = function (domains) {
        this.unverifiedDomainsSource.next(domains);
    };
    //Gets only the domains that are verified
    DomainsService.prototype.getVerifiedDomains = function () {
        var _this = this;
        this._http.get("api/Verification/GetVerified")
            .subscribe(function (data) {
            _this.changeVerifiedDomains(data);
        });
    };
    //Gets only the domains that are unverified
    DomainsService.prototype.getUnverifiedDomains = function () {
        var _this = this;
        this._http.get("api/Verification/GetUnverified")
            .subscribe(function (data) {
            _this.changeUnverifiedDomains(data);
        });
    };
    DomainsService = __decorate([
        core_1.Injectable()
    ], DomainsService);
    return DomainsService;
}());
exports.DomainsService = DomainsService;
//# sourceMappingURL=domains.service.js.map