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
exports.LogInComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var User_1 = require("../../Models/Users/User");
var LogInComponent = /** @class */ (function () {
    function LogInComponent(http, formBuilder, router, navbarService, UserService) {
        this.http = http;
        this.formBuilder = formBuilder;
        this.router = router;
        this.navbarService = navbarService;
        this.UserService = UserService;
        this.passString = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
        this.formValidation = {
            email: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])
            ],
            password: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern(this.passString)])
            ]
        };
        this.logInForm = this.formBuilder.group({
            email: '',
            password: ''
        });
        this.logInForm = this.formBuilder.group(this.formValidation);
    }
    LogInComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.navbarService.loggedInObserveable.subscribe(function (value) { return _this.loggedIn = value; });
        this.checkLogin();
    };
    LogInComponent.prototype.checkLogin = function () {
        if (this.loggedIn) {
            window.alert("Du er allerede logget inn");
            this.router.navigate(['/home']);
        }
    };
    LogInComponent.prototype.onSubmit = function () {
        this.logIn();
    };
    // Main log in function, authenticates the user and creates a JWT for later use
    LogInComponent.prototype.logIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        user = new User_1.User();
                        user.email = this.logInForm.controls.email.value;
                        user.password = this.logInForm.controls.password.value;
                        /*
                        this.http.post("api/User/LogIn", user).subscribe(response => {
                          this.http.get("api/Cookie/CreateLoggedInCookie/" + 1).toPromise();
                          this.navbarService.changeLoggedIn(true);
                            // Need to specify the response type since the deafult is set to recieving JSON
                            this.http.get("api/User/GetToken/" + user.email, { responseType: 'text' }).subscribe(data => {
                              console.log(data);
                            },
                              error => console.log(error)
                            ); // End GET-call
                            
                            
                             this.router.navigate(['/home']);
                          },
                            error => console.log("nei")
                          );
                          */
                        _b = (_a = Promise).all;
                        return [4 /*yield*/, this.UserService.LogIn(user)];
                    case 1:
                        _c = [
                            _d.sent()
                        ];
                        return [4 /*yield*/, this.UserService.CreateLoggedInCookie(1)];
                    case 2:
                        _c = _c.concat([
                            _d.sent()
                        ]);
                        return [4 /*yield*/, this.UserService.GetToken(user.email)];
                    case 3:
                        /*
                        this.http.post("api/User/LogIn", user).subscribe(response => {
                          this.http.get("api/Cookie/CreateLoggedInCookie/" + 1).toPromise();
                          this.navbarService.changeLoggedIn(true);
                            // Need to specify the response type since the deafult is set to recieving JSON
                            this.http.get("api/User/GetToken/" + user.email, { responseType: 'text' }).subscribe(data => {
                              console.log(data);
                            },
                              error => console.log(error)
                            ); // End GET-call
                            
                            
                             this.router.navigate(['/home']);
                          },
                            error => console.log("nei")
                          );
                          */
                        _b.apply(_a, [_c.concat([
                                _d.sent(),
                                this.navbarService.changeLoggedIn(true),
                                this.router.navigate(['/home'])
                            ])]).catch(function (errors) {
                            console.log(errors);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    LogInComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './logIn.component.html',
            styleUrls: ['../usersStyles.css']
        })
    ], LogInComponent);
    return LogInComponent;
}());
exports.LogInComponent = LogInComponent;
//# sourceMappingURL=logIn.component.js.map