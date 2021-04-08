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
exports.VerificationReceiverComponent = void 0;
var core_1 = require("@angular/core");
var verification_service_1 = require("./verification.service");
var VerificationReceiverComponent = /** @class */ (function () {
    function VerificationReceiverComponent(router, route, verificationSerivce) {
        this.router = router;
        this.route = route;
        this.verificationSerivce = verificationSerivce;
        this.feedback = "checking...";
    }
    VerificationReceiverComponent.prototype.ngOnInit = function () {
        //Gets encoded ID from URL Param
        this.experienceIDEncoded = this.route.snapshot.queryParamMap.get("Exp");
        //If there is any URL Parameter to check
        if (this.experienceIDEncoded != null) {
            this.showPage = true;
            this.verify(this.experienceIDEncoded);
        }
    };
    //Calls for verification of user
    VerificationReceiverComponent.prototype.verify = function (userIdEncoded) {
        return __awaiter(this, void 0, void 0, function () {
            var experienceID, isVerified;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        experienceID = Number(this.Base64Decode(userIdEncoded));
                        return [4 /*yield*/, this.verificationSerivce.verifyExperience(experienceID)];
                    case 1:
                        isVerified = _a.sent();
                        if (isVerified) {
                            this.feedback = "CONFIRMED";
                        }
                        else {
                            this.feedback = "UNCONFIRMED";
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //Decodes Base64 string from url parameter
    VerificationReceiverComponent.prototype.Base64Decode = function (encoded) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        do {
            enc1 = keyStr.indexOf(encoded.charAt(i++));
            enc2 = keyStr.indexOf(encoded.charAt(i++));
            enc3 = keyStr.indexOf(encoded.charAt(i++));
            enc4 = keyStr.indexOf(encoded.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        } while (i < encoded.length);
        return output;
    };
    VerificationReceiverComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            template: "<ng-container *ngIf=\"showPage\">\n              <h1>Thank you!</h1>\n              <b>Your experience is now: {{feedback}}</b>\n             </ng-container>",
            providers: [verification_service_1.VerificationService]
        })
    ], VerificationReceiverComponent);
    return VerificationReceiverComponent;
}());
exports.VerificationReceiverComponent = VerificationReceiverComponent;
//# sourceMappingURL=verification-receiver.component.js.map