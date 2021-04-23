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
exports.NotificationSubscriberComponent = void 0;
var core_1 = require("@angular/core");
var Notification_1 = require("../Models/Notification/Notification");
var NotificationSubscriberComponent = /** @class */ (function () {
    function NotificationSubscriberComponent(notificationService) {
        this.notificationService = notificationService;
    }
    NotificationSubscriberComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkSubscription(this.user, this.post);
        this.isSubscribedSub = this.notificationService.isSubscribedCurrent.subscribe(function (isSubbed) { return _this.isSubscribed = isSubbed; });
    };
    NotificationSubscriberComponent.prototype.ngOnDestroy = function () {
        this.isSubscribedSub.unsubscribe();
    };
    //Checks if the given user is subscribed to the entity this component is attached to
    //View should not be loaded until after check is complete
    NotificationSubscriberComponent.prototype.checkSubscription = function (user, post) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.notificationService.findSubscription(user.id, post.id)];
                    case 1:
                        _a.notification = _b.sent();
                        this.subscriptionChecked = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    //Subscribe for notifications
    NotificationSubscriberComponent.prototype.subscribe = function (user, post) {
        return __awaiter(this, void 0, void 0, function () {
            var notification, ok;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        notification = new Notification_1.Notification();
                        notification.user = user;
                        notification.post = post;
                        notification.notify = false;
                        return [4 /*yield*/, this.notificationService.subscribe(notification)];
                    case 1:
                        ok = _a.sent();
                        if (ok) {
                            this.checkSubscription(user, post);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //Unsubscribe from notifications
    NotificationSubscriberComponent.prototype.unsubscribe = function (notification) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.notificationService.unsubscribe(notification.id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        core_1.Input()
    ], NotificationSubscriberComponent.prototype, "user", void 0);
    __decorate([
        core_1.Input()
    ], NotificationSubscriberComponent.prototype, "post", void 0);
    NotificationSubscriberComponent = __decorate([
        core_1.Component({
            selector: 'notificationSubscriber-component',
            template: "<ng-container *ngIf=\"subscriptionChecked\">\n                <ng-container *ngIf=\"isSubscribed\"><button class=\"btn btn-sm btn-warning\" (click)=\"unsubscribe(notification)\">Unsubscribe from notifications</button></ng-container>\n                <ng-container *ngIf=\"!isSubscribed\"><button class=\"btn btn-sm btn-success\" (click)=\"subscribe(user, post)\">Subscribe for notifications</button></ng-container>\n                <br />\n             </ng-container>",
            providers: []
        })
    ], NotificationSubscriberComponent);
    return NotificationSubscriberComponent;
}());
exports.NotificationSubscriberComponent = NotificationSubscriberComponent;
//# sourceMappingURL=notificationSubscriber.component.js.map