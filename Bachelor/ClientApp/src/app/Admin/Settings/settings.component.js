"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsComponent = void 0;
var core_1 = require("@angular/core");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(settingsService, _formBuilder) {
        this.settingsService = settingsService;
        this._formBuilder = _formBuilder;
        this.settingsForm = this._formBuilder.group({
            settingsArray: this._formBuilder.array([])
        });
    }
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsSub = this.settingsService.settingsCurrent.subscribe(function (settings) { return _this.settings = settings; });
        this.settingsService.getSettings();
    };
    SettingsComponent.prototype.ngOnDestroy = function () {
        this.settingsSub.unsubscribe();
    };
    SettingsComponent.prototype.updateSettings = function () {
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'settings-component',
            templateUrl: './settings.component.html',
            styleUrls: ['../AdminStyle.css'],
            providers: []
        })
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map