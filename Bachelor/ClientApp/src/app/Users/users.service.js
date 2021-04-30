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
exports.UserService = void 0;
var core_1 = require("@angular/core");
var User_1 = require("../Models/Users/User");
var rxjs_1 = require("rxjs");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        //User that is logged in
        this.userSource = new rxjs_1.BehaviorSubject(new User_1.User());
        this.userCurrent = this.userSource.asObservable();
        //Id of logged in user
        this.userIdSource = new rxjs_1.BehaviorSubject(null);
        this.userIdCurrent = this.userIdSource.asObservable();
        //Whether a user is logged in or not
        this.loggedInSource = new rxjs_1.BehaviorSubject(null);
        this.loggedInCurrent = this.loggedInSource.asObservable();
    }
    UserService.prototype.changeUser = function (user) {
        this.userSource.next(user);
    };
    UserService.prototype.changeUserId = function (userId) {
        this.userIdSource.next(userId);
    };
    UserService.prototype.changeLoggedIn = function (value) {
        this.loggedInSource.next(value);
    };
    //Users
    UserService.prototype.getUserInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.http.get("api/User/GetUserInit").subscribe(function (user) {
                            if (user) {
                                resolve(user);
                            }
                            else {
                                reject("Couldn't get user");
                            }
                        });
                    })];
            });
        });
    };
    //ADD User
    UserService.prototype.addUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.http.post('api/User/addUser', user, { responseType: 'text' }).subscribe(function (response) {
                            if (response) {
                                resolve("Bruker lagt til");
                            }
                            else {
                                reject("Bruker kunne ikke legges til");
                            }
                        });
                    })];
            });
        });
    };
    //Get user
    UserService.prototype.GetUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.http.get("api/User/GetUser/" + id).subscribe(function (user) {
                            _this.user = user;
                            _this.changeUser(user);
                            _this.changeUserId(user.id);
                            _this.changeLoggedIn(true);
                            resolve(user);
                        }, function (error) {
                            console.log(error);
                            _this.changeLoggedIn(false);
                            resolve(null);
                        });
                    })];
            });
        });
    };
    //Log in
    UserService.prototype.LogIn = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.http.post("api/User/LogIn", user).subscribe(function (response) {
                            if (response) {
                                _this.changeLoggedIn(true);
                                resolve("Logger inn");
                            }
                            else {
                                _this.changeLoggedIn(false);
                                reject("Kunne ikke logge inn");
                            }
                        });
                    })];
            });
        });
    };
    //Log out
    UserService.prototype.logOut = function () {
        this.http.get("api/Cookie/CreateLoggedInCookie/" + 0).toPromise();
        this.changeLoggedIn(false);
        this.changeUser(null);
        this.changeUserId(0);
    };
    UserService.prototype.AddExperience = function (exp, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.http.post("api/User/AddExperience/" + userId, exp).subscribe(function (response) {
                            if (response) {
                                resolve("Erfaring ble lagt til");
                            }
                            else {
                                reject("Noe gikk galt, prøv igjen senere");
                            }
                        });
                    })];
            });
        });
    };
    UserService.prototype.PostExpInfo = function (experience) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.http.post("api/User/PostExpInfo", experience).subscribe(function (res) {
                            if (res) {
                                resolve(true);
                            }
                            else {
                                reject("Kunne ikke oppdatere informasjonen");
                            }
                        });
                    })];
            });
        });
    };
    UserService.prototype.GetExperience = function (expId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.http.get("api/User/GetExperience/" + expId).subscribe(function (experience) {
                            if (experience != null) {
                                resolve(experience);
                            }
                            else {
                                reject(null);
                            }
                        });
                    })];
            });
        });
    };
    //Storage
    // Get Cookiecontent
    UserService.prototype.GetCookieContent = function (CookieName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.http.get("api/Cookie/GetCookieContent/" + CookieName, { responseType: 'text' }).subscribe(function (response) {
                            if (response != null) {
                                resolve(response);
                            }
                            else {
                                reject(null);
                            }
                        });
                    })];
            });
        });
    };
    //Validate token
    UserService.prototype.ValidateToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.http.get("api/JwtToken/ValidateToken/" + token, { responseType: 'text' }).subscribe(function (value) {
                            if (value) {
                                resolve("Token er valid");
                            }
                            else {
                                reject("Token er ikke valid");
                            }
                        });
                    })];
            });
        });
    };
    // Decode token
    UserService.prototype.DecodeToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.http.get("api/JwtToken/DecodeToken/" + token).subscribe(function (response) {
                            if (response != null) {
                                resolve(response);
                            }
                            else {
                                reject("Kunne ikke dekode token");
                            }
                        });
                    })];
            });
        });
    };
    UserService.prototype.GetToken = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.http.get("api/User/GetToken/" + email, { responseType: 'text' }).subscribe(function (gotToken) {
                            if (gotToken) {
                                resolve("Token er hentet");
                            }
                            else {
                                reject("Token kunne ikke hentes");
                            }
                        });
                    })];
            });
        });
    };
    UserService.prototype.CreateLoggedInCookie = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.http.get("api/Cookie/CreateLoggedInCookie/" + value).subscribe(function (CookieCreated) {
                            if (CookieCreated) {
                                resolve("Cookie ble laget");
                            }
                            else {
                                reject("Cookie kunne ikke lages");
                            }
                        });
                    })];
            });
        });
    };
    UserService.prototype.CreateAnonymousCookie = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.http.get("api/Cookie/CreateAnonymousCookie").subscribe(function (response) {
                            resolve(response);
                        });
                    })];
            });
        });
    };
    //Random
    UserService.prototype.GetIndustries = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get("api/User/GetAllIndustries").subscribe(function (data) {
                if (data != null) {
                    resolve(data);
                }
                else {
                    reject("Couldn't fetch industries");
                }
            });
        });
    };
    UserService.prototype.GetStudentSubjects = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get("api/User/GetAllStudentSubjects").subscribe(function (data) {
                if (data != null) {
                    resolve(data);
                }
                else {
                    reject("Couldn't fetch student subjects");
                }
            });
        });
    };
    UserService.prototype.GetExperiences = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.http.get("api/User/GetExperiences/" + user, { responseType: 'json' }).subscribe(function (data) {
                            if (data != null) {
                                resolve(data);
                            }
                            else {
                                reject(null);
                            }
                        });
                    })];
            });
        });
    };
    UserService.prototype.test = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.http.get("api/User/GetUser/" + "4").toPromise().then(function (response) {
                    return response;
                });
                return [2 /*return*/];
            });
        });
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root',
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=users.service.js.map