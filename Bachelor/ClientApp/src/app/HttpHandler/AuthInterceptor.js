"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthInterceptor = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var AuthInterceptor = /** @class */ (function () {
    function AuthInterceptor(router, ErrorDialogService) {
        this.router = router;
        this.ErrorDialogService = ErrorDialogService;
    }
    AuthInterceptor.prototype.intercept = function (req, next) {
        var _this = this;
        var idToken = localStorage.getItem("token");
        if (idToken) {
            var cloned = req.clone({
                headers: req.headers.set("Authorization", idToken)
            });
            return next.handle(cloned).pipe(operators_1.catchError(function (error) {
                var data = {};
                if (error.status == 400) {
                    data = {
                        reason: "Our server could not handle your request, please try agian later.",
                        status: error.status
                    };
                    _this.ErrorDialogService.openDialog(data);
                }
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                _this.ErrorDialogService.openDialog(data);
                return rxjs_1.throwError(error);
            }));
        }
        else {
            return next.handle(req);
        }
    };
    AuthInterceptor = __decorate([
        core_1.Injectable()
    ], AuthInterceptor);
    return AuthInterceptor;
}());
exports.AuthInterceptor = AuthInterceptor;
//# sourceMappingURL=AuthInterceptor.js.map