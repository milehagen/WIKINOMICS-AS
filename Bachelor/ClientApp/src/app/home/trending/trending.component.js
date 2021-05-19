"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrendingComponent = void 0;
var core_1 = require("@angular/core");
var Post_1 = require("../../Models/Communities/Post");
var shared_service_1 = require("../../Communities/shared/shared.service");
var posts_service_1 = require("../../Communities/shared/posts/posts.service");
var TrendingComponent = /** @class */ (function () {
    function TrendingComponent(_http, userService, postsService, sharedService, router, route) {
        this._http = _http;
        this.userService = userService;
        this.postsService = postsService;
        this.sharedService = sharedService;
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
        this.getCommunitites();
        this.getTrendingPosts();
    };
    TrendingComponent.prototype.ngOnDestroy = function () {
        this.userSub.unsubscribe();
        this.loggedInSub.unsubscribe();
    };
    // Gets list of communities
    TrendingComponent.prototype.getCommunitites = function () {
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
    // Clicking on voting buttons won't route to the post
    TrendingComponent.prototype.noRouting = function (e) {
        e.stopPropagation();
    };
    //Copies URL for a post to clipboard
    TrendingComponent.prototype.copyURLOfPost = function (post) {
        if (this.postsService.copyURLToClipboard(post)) {
            this.sharedService.openSnackBarMessage("Link copied to clipboard", "Ok");
        }
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
    TrendingComponent.prototype.getColor = function (tag) {
        switch (tag) {
            case 'Sharing advice':
                return 'green';
            case 'Seeking advice':
                return 'red';
            case 'Question':
                return 'blue';
        }
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