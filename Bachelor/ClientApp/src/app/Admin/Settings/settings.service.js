"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var SettingsService = /** @class */ (function () {
    function SettingsService(_http) {
        this._http = _http;
        //Settings
        this.settingsSource = new rxjs_1.BehaviorSubject([]);
        this.settingsCurrent = this.settingsSource.asObservable();
    }
    SettingsService.prototype.changeSettings = function (settings) {
        this.settingsSource.next(settings);
    };
    SettingsService.prototype.getSettings = function () {
        var _this = this;
        this._http.get("api/admin/SiteSetting/GetAll")
            .subscribe(function (data) {
            _this.changeSettings(data);
        });
    };
    SettingsService.prototype.updateSettings = function (settings) {
        this._http.post("api/admin/settings/Change", settings)
            .subscribe(function (response) {
        });
    };
    SettingsService = __decorate([
        core_1.Injectable()
    ], SettingsService);
    return SettingsService;
}());
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map