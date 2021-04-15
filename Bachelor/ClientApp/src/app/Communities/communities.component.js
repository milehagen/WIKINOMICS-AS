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
exports.CommunitiesComponent = void 0;
var core_1 = require("@angular/core");
var comments_service_1 = require("./shared/comments/comments.service");
var posts_service_1 = require("./shared/posts/posts.service");
var shared_service_1 = require("./shared/shared.service");
var communities_service_1 = require("./shared/communities/communities.service");
var CommunitiesComponent = /** @class */ (function () {
    function CommunitiesComponent(_http, fb, sharedService, communitiesService, commentsService, postsService, router) {
        this._http = _http;
        this.fb = fb;
        this.sharedService = sharedService;
        this.communitiesService = communitiesService;
        this.commentsService = commentsService;
        this.postsService = postsService;
        this.router = router;
    }
    CommunitiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSub = this.sharedService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.loggedInSub = this.sharedService.loggedInCurrent.subscribe(function (loggedIn) { return _this.loggedIn = loggedIn; });
        this.rootCommunitiesSub = this.communitiesService.rootCommunitiesCurrent.subscribe(function (communities) { return _this.rootCommunities = communities; });
        this.allCommunitiesSub = this.communitiesService.allCommunitiesCurrent.subscribe(function (communities) { return _this.allCommunities = communities; });
        this.selectedCommunitySub = this.communitiesService.selectedCommunityCurrent.subscribe(function (community) { return _this.selectedCommunity = community; });
        this.communitiesService.getRootCommunities(0);
        this.callGetUserIdCookie();
    };
    CommunitiesComponent.prototype.ngOnDestroy = function () {
        this.userSub.unsubscribe();
        this.loggedInSub.unsubscribe();
        this.rootCommunitiesSub.unsubscribe();
        this.allCommunitiesSub.unsubscribe();
        this.selectedCommunitySub.unsubscribe();
    };
    //Gets the token for userID cookie, then gets the ID from the token, and lastly using the ID to get the user. 
    CommunitiesComponent.prototype.callGetUserIdCookie = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userIdToken, userId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.getTokenCookie()];
                    case 1:
                        userIdToken = _a.sent();
                        if (!userIdToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sharedService.getUserIdFromToken(userIdToken)];
                    case 2:
                        userId = _a.sent();
                        if (userId) {
                            this.sharedService.getUser(userId);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CommunitiesComponent.prototype.changeSelectedCommunity = function (community) {
        //Only reseting if you coming from a different community
        //Or from the all feed
        if (this.selectedCommunity == undefined || this.selectedCommunity.id != community.id || this.router.url === "/communities/all") {
            var emptyPosts = Array();
            this.sharedService.feedPagination = 0;
            this.postsService.changeAllPosts(emptyPosts);
        }
        //Changing selected community no matter what
        this.communitiesService.changeSelectedCommunity(community);
    };
    CommunitiesComponent.prototype.goToYour = function () {
        if (this.router.url !== "/communities/your") {
            var emptyPosts = Array();
            this.sharedService.feedPagination = 0;
            this.postsService.changeAllPosts(emptyPosts);
        }
    };
    CommunitiesComponent.prototype.goToAll = function () {
        if (this.router.url !== "/communities/all") {
            var emptyPosts = Array();
            this.sharedService.feedPagination = 0;
            this.postsService.changeAllPosts(emptyPosts);
        }
    };
    CommunitiesComponent.prototype.checkUser = function () {
        console.log(this.userId);
    };
    CommunitiesComponent.prototype.checkLoggedIn = function () {
        console.log(this.test);
    };
    // Clicking on voting buttons won't route to the post
    CommunitiesComponent.prototype.noRouting = function (e) {
        e.stopPropagation();
    };
    CommunitiesComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './communities.component.html',
            styleUrls: ['./CommunitiesStyle.css'],
            providers: [shared_service_1.SharedService, comments_service_1.CommentsService, communities_service_1.CommunitiesService, posts_service_1.PostsService]
        })
    ], CommunitiesComponent);
    return CommunitiesComponent;
}());
exports.CommunitiesComponent = CommunitiesComponent;
//# sourceMappingURL=communities.component.js.map