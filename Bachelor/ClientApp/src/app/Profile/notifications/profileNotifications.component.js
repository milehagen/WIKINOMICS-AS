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
exports.ProfileNotificationsComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ProfileNotificationsComponent = /** @class */ (function () {
    function ProfileNotificationsComponent(userService, notificationService, sharedService) {
        this.userService = userService;
        this.notificationService = notificationService;
        this.sharedService = sharedService;
        this.disableSlider = false;
    }
    ProfileNotificationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSub = this.userService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.loggedInSub = this.userService.loggedInCurrent.subscribe(function (loggedIn) { return _this.loggedIn = loggedIn; });
        this.notificationsSub = this.notificationService.notificationsCurrent.subscribe(function (noti) { return _this.notifications = noti; });
    };
    //Checking every x milisecond if the user obj is ready to be used
    ProfileNotificationsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //I'm so sorry for this
        this.loopSub = rxjs_1.interval(250).subscribe((function (x) {
            _this.checkUserIsDefined();
        }));
    };
    ProfileNotificationsComponent.prototype.ngOnDestroy = function () {
        this.loopSub.unsubscribe();
        this.userSub.unsubscribe();
        this.loggedInSub.unsubscribe();
        this.notificationsSub.unsubscribe();
    };
    //Checks if a user is ready to be used for fetching 
    ProfileNotificationsComponent.prototype.checkUserIsDefined = function () {
        if (this.user.id) {
            this.getNotifications(this.user);
            this.setNotificationsToViewed(this.user);
            this.loopSub.unsubscribe();
        }
    };
    ProfileNotificationsComponent.prototype.emailNotificationToggler = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var ok;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('toggle', event.checked);
                        this.disableSlider = true;
                        return [4 /*yield*/, this.notificationService.toggleEmailNotifications(this.user)];
                    case 1:
                        ok = _a.sent();
                        if (ok) {
                            this.userService.getUserInit();
                            this.disableSlider = false;
                            this.sharedService.openSnackBarMessage("Email notification settings changed", "Ok");
                        }
                        else {
                            this.disableSlider = false;
                            //Changing front-end toggler to show it didn't work
                            this.user.emailUpdates = !this.user.emailUpdates;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //Makes call to service to get notifications for user
    ProfileNotificationsComponent.prototype.getNotifications = function (user) {
        this.notificationService.getNotifications(user.id);
    };
    //Sets notifications to viewed, so they don't spam you with the same notifications
    //This happens automatically when loading this page
    ProfileNotificationsComponent.prototype.setNotificationsToViewed = function (user) {
        this.notificationService.setNotificationsToViewed(user);
    };
    ProfileNotificationsComponent = __decorate([
        core_1.Component({
            selector: "app-home",
            templateUrl: './profileNotifications.component.html',
            styleUrls: ['../profile.component.css'],
            providers: []
        })
    ], ProfileNotificationsComponent);
    return ProfileNotificationsComponent;
}());
exports.ProfileNotificationsComponent = ProfileNotificationsComponent;
//# sourceMappingURL=profileNotifications.component.js.map