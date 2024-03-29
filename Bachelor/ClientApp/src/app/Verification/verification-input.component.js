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
exports.VerificationInputComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Domain_1 = require("../Models/Users/Domain");
var verification_service_1 = require("./verification.service");
var VerificationInputComponent = /** @class */ (function () {
    function VerificationInputComponent(fb, verificationSerivce) {
        this.fb = fb;
        this.verificationSerivce = verificationSerivce;
        this.mailVerifyValidation = {
            experienceField: [
                null, forms_1.Validators.compose([forms_1.Validators.required])
            ],
            mailVerify: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email])
            ]
        };
        this.mailVerifyForm = fb.group(this.mailVerifyValidation);
        this.mailVerifyForm.controls['experienceField'].setValue('');
    }
    VerificationInputComponent.prototype.ngOnInit = function () {
        this.checkForExperienceToVerify();
    };
    VerificationInputComponent.prototype.sendOutFeedback = function (feedback, feedbackStatus) {
        this.feedback = feedback;
        this.feedbackStatus = feedbackStatus;
    };
    VerificationInputComponent.prototype.check = function () {
        console.log(this.mailVerifyForm.value.experienceField);
    };
    //This checks if the experiences given to the component as input
    //have any experiences that aren't verified. If not then we don't render the HTML for component
    VerificationInputComponent.prototype.checkForExperienceToVerify = function () {
        for (var _i = 0, _a = this.experiences; _i < _a.length; _i++) {
            var exp = _a[_i];
            if (!exp.verified) {
                this.experienceToVerify = true;
                break;
            }
            else {
                this.experienceToVerify = false;
            }
        }
    };
    //Checks if we can send a verification e-mail
    VerificationInputComponent.prototype.checkMail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mail, experience, foundDomain, feedback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mail = this.mailVerifyForm.value.mailVerify;
                        experience = this.mailVerifyForm.value.experienceField;
                        return [4 /*yield*/, this.verificationSerivce.checkMail(mail)];
                    case 1:
                        foundDomain = _a.sent();
                        if (foundDomain) {
                            this.sendMailButton = true;
                            this.sendVerification(experience, mail);
                            console.log("Domain found and mail should be sent");
                        }
                        else {
                            feedback = "Woops! Sorry, we're pretty new at this. " +
                                "And, it seems like our robot, Robert, doesn't recognize your domain. " +
                                "Could you help Robert the robot out, by adding your domain?";
                            this.sendOutFeedback(feedback, false);
                            this.sendToReviewButton = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    VerificationInputComponent.prototype.askForReview = function () {
        return __awaiter(this, void 0, void 0, function () {
            var domain, feedback, sentReview;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        domain = new Domain_1.Domain();
                        domain.name = this.mailVerifyForm.value.mailVerify;
                        feedback = "";
                        return [4 /*yield*/, this.verificationSerivce.sendDomainToReview(domain)];
                    case 1:
                        sentReview = _a.sent();
                        if (sentReview) {
                            feedback = "Awesome! Thanks a mill for helping Robert the robot out! He'll review it shortly.";
                            this.sendOutFeedback(feedback, false);
                        }
                        else {
                            feedback = "Something went wrong, please try again later...";
                            this.sendOutFeedback(feedback, false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //Sends verification e-mail
    VerificationInputComponent.prototype.sendVerification = function (experience, address) {
        return __awaiter(this, void 0, void 0, function () {
            var sentMail, feedback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.verificationSerivce.sendVerification(experience, address)];
                    case 1:
                        sentMail = _a.sent();
                        feedback = "";
                        if (sentMail) {
                            feedback = "Verification mail sent!";
                            this.sendOutFeedback(feedback, true);
                        }
                        else {
                            this.sendMailButton = false;
                            feedback = "Verification mail could not be sent at this moment, please try again later";
                            this.sendOutFeedback(feedback, false);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.Input()
    ], VerificationInputComponent.prototype, "experiences", void 0);
    VerificationInputComponent = __decorate([
        core_1.Component({
            selector: 'verification-input',
            templateUrl: './verification-input.component.html',
            providers: [verification_service_1.VerificationService]
        })
    ], VerificationInputComponent);
    return VerificationInputComponent;
}());
exports.VerificationInputComponent = VerificationInputComponent;
//# sourceMappingURL=verification-input.component.js.map