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
exports.TrendingComponent = void 0;
var core_1 = require("@angular/core");
var Post_1 = require("../../Models/Communities/Post");
var shared_service_1 = require("../../Communities/shared/shared.service");
var posts_service_1 = require("../../Communities/shared/posts/posts.service");
var TrendingComponent = /** @class */ (function () {
    function TrendingComponent(_http, userService, postsService, router, route) {
        this._http = _http;
        this.userService = userService;
        this.postsService = postsService;
        this.router = router;
        this.route = route;
        this.selectedPost = new Post_1.Post();
    }
    TrendingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSub = this.userService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.loggedInSub = this.userService.loggedInCurrent.subscribe(function (loggedIn) { return _this.loggedIn = loggedIn; });
        this.selectedPostSub = this.postsService.selectedPostCurrent.subscribe(function (post) { return _this.selectedPost = post; });
        this.allPostsSub = this.postsService.allPostsCurrent.subscribe(function (posts) { return _this.allPosts = posts; });
        this.listIndustries();
        this.getTrendingPosts();
    };
    TrendingComponent.prototype.ngOnDestroy = function () {
        this.userSub.unsubscribe();
        this.loggedInSub.unsubscribe();
    };
    // Gets list of communities
    TrendingComponent.prototype.listIndustries = function () {
        var _this = this;
        this._http.get("api/Community/GetAllCommunities").subscribe(function (data) {
            _this.allCommunities = data;
        }, function (error) { return console.log(error); });
    };
    // Gets trending posts
    TrendingComponent.prototype.getTrendingPosts = function () {
        var _this = this;
        this._http.get("api/Post/GetTrending").subscribe(function (data) {
            _this.trendingPosts = data;
        }, function (error) { return console.log(error); });
    };
    //Calls to service
    TrendingComponent.prototype.reportPost = function (post) {
        this.postsService.reportPost(post);
    };
    //Calls to service
    TrendingComponent.prototype.upvotePost = function (post, user) {
        this.postsService.upvotePost(post, user);
    };
    //Calls to service
    TrendingComponent.prototype.downvotePost = function (post, user) {
        this.postsService.downvotePost(post, user);
    };
    TrendingComponent.prototype.test = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.userService.checkLoggedIn()) {
                    console.log("yes");
                }
                else {
                    console.log("not");
                }
                return [2 /*return*/];
            });
        });
    };
    // Clicking on voting buttons won't route to the post
    TrendingComponent.prototype.noRouting = function (e) {
        e.stopPropagation();
    };
    // Navigates to community
    TrendingComponent.prototype.navigateToCommunity = function (value) {
        var _this = this;
        this._http.get("api/Community/GetAllCommunities").subscribe(function (data) {
            _this.allCommunities = data;
        }, function (error) { return console.log(error); });
        var findCommunity = this.allCommunities.find(function (_a) {
            var title = _a.title;
            return title === value;
        });
        var selectedCommunityId = findCommunity.id;
        this.router.navigateByUrl("/communities/" + selectedCommunityId);
    };
    TrendingComponent = __decorate([
        core_1.Component({
            selector: 'trending-posts',
            templateUrl: './trending.component.html',
            styleUrls: ['./trending.component.css'],
            providers: [shared_service_1.SharedService, posts_service_1.PostsService]
        })
    ], TrendingComponent);
    return TrendingComponent;
}());
exports.TrendingComponent = TrendingComponent;
//# sourceMappingURL=trending.component.js.map