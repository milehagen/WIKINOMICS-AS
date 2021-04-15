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
exports.SharedService = void 0;
var core_1 = require("@angular/core");
var snack_bar_1 = require("@angular/material/snack-bar");
var rxjs_1 = require("rxjs");
var User_1 = require("../../Models/Users/User");
var SharedService = /** @class */ (function () {
    function SharedService(_http, _snackBar) {
        var _this = this;
        this._http = _http;
        this._snackBar = _snackBar;
        //User that is logged in
        this.userSource = new rxjs_1.BehaviorSubject(new User_1.User());
        this.userCurrent = this.userSource.asObservable();
        this.userIdSource = new rxjs_1.BehaviorSubject(null);
        this.userIdCurrent = this.userSource.asObservable();
        this.loggedInSource = new rxjs_1.BehaviorSubject(null);
        this.loggedInCurrent = this.loggedInSource.asObservable();
        this.feedPagination = 0;
        this.getTokenCookie = function () {
            return new Promise((function (resolve, reject) {
                _this._http.get("api/Cookie/GetCookieContent/userid", { responseType: "text" })
                    .subscribe(function (response) {
                    var ok = response;
                    resolve(ok);
                });
            }));
        };
        this.getUserIdFromToken = function (token) {
            return new Promise((function (resolve) {
                _this._http.get("api/JwtToken/DecodeToken/" + token, { responseType: "text" })
                    .subscribe(function (response) {
                    _this.changeUserId(response);
                    var ok = response;
                    resolve(ok);
                });
            }));
        };
    }
    SharedService.prototype.changeUser = function (user) {
        this.userSource.next(user);
    };
    SharedService.prototype.changeUserId = function (userId) {
        this.userIdSource.next(userId);
    };
    SharedService.prototype.changeLoggedIn = function (value) {
        this.loggedInSource.next(value);
    };
    //Gets a user
    SharedService.prototype.getUser = function (userId) {
        var _this = this;
        this._http.get("api/User/GetUser/" + userId)
            .subscribe(function (data) {
            _this.changeUser(data);
            _this.changeLoggedIn(true);
            _this.loggedIn = true;
            _this.user = data;
        }),
            function (error) {
                console.log(error);
                _this.loggedIn = false;
            };
    };
    SharedService.prototype.checkLogin = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.loggedIn) {
                    return [2 /*return*/, true];
                }
                else {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    //Opens a notification at the bottom of the page
    SharedService.prototype.openSnackBarMessage = function (message, action) {
        var config = new snack_bar_1.MatSnackBarConfig();
        config.horizontalPosition = "center";
        config.verticalPosition = "bottom";
        config.duration = 6000;
        this._snackBar.open(message, action, config);
    };
    SharedService = __decorate([
        core_1.Injectable()
    ], SharedService);
    return SharedService;
}());
exports.SharedService = SharedService;
//# sourceMappingURL=shared.service.js.map