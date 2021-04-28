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
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(http, userService, navbarService, notificationService, router) {
        this.http = http;
        this.userService = userService;
        this.navbarService = navbarService;
        this.notificationService = notificationService;
        this.router = router;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.callGetUserIdCookie();
        this.userIdSub = this.userService.userIdCurrent.subscribe(function (userId) { return _this.userId = userId; });
        this.loggedInSub = this.userService.loggedInCurrent.subscribe(function (loggedIn) { return _this.loggedIn = loggedIn; });
        this.notificationsSub = this.notificationService.numberOfNotificationsCurrent.subscribe(function (noti) { return _this.numberOfNotifications = noti; });
    };
    NavbarComponent.prototype.ngOnDestroy = function () {
        this.loggedInSub.unsubscribe();
        this.userIdSub.unsubscribe();
        this.notificationsSub.unsubscribe();
    };
    NavbarComponent.prototype.logOut = function () {
        this.userService.logOut();
    };
    NavbarComponent.prototype.callGetUserIdCookie = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userIdToken, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userService.GetCookieContent("userid")];
                    case 1:
                        userIdToken = _a.sent();
                        if (!userIdToken) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userService.DecodeToken(userIdToken)];
                    case 2:
                        userId = _a.sent();
                        if (!userId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.userService.GetUser(userId)];
                    case 3:
                        _a.sent();
                        this.getNotificationsCount();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    NavbarComponent.prototype.getNotificationsCount = function () {
        this.notificationService.getNumberOfNotifications(this.userId);
    };
    // When clicking on communities you're navigated to the all page
    // This is because [routerLink]="['communities/all']" wont activate nav-link when url doesnt include '/all'
    NavbarComponent.prototype.goToAll = function () {
        this.router.navigateByUrl("/communities/all");
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'navbar',
            templateUrl: './navbar.component.html',
            styleUrls: ['./navbar.component.css'],
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map