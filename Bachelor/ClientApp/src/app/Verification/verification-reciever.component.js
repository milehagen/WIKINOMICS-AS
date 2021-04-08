"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
    }
    VerificationReceiverComponent.prototype.ngOnInit = function () {
        this.experienceIDEncoded = this.route.snapshot.queryParamMap.get("Exp");
        this.verify(this.experienceIDEncoded);
    };
    //Calls for verification of user
    VerificationReceiverComponent.prototype.verify = function (userIdEncoded) {
        var experienceID = Number(this.Base64Decode(userIdEncoded));
        this.verificationSerivce.verifyExperience(experienceID);
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
            template: "<b>Hello</b>\n             ",
            providers: [verification_service_1.VerificationService]
        })
    ], VerificationReceiverComponent);
    return VerificationReceiverComponent;
}());
exports.VerificationReceiverComponent = VerificationReceiverComponent;
//# sourceMappingURL=verification-reciever.component.js.map