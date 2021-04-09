"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalFeedComponent = void 0;
var core_1 = require("@angular/core");
var PersonalFeedComponent = /** @class */ (function () {
    function PersonalFeedComponent(sharedService, communitiesService, commentsService, postsService, route, router) {
        this.sharedService = sharedService;
        this.communitiesService = communitiesService;
        this.commentsService = commentsService;
        this.postsService = postsService;
        this.route = route;
        this.router = router;
    }
    PersonalFeedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSub = this.sharedService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.allPostsSub = this.postsService.allPostsCurrent.subscribe(function (posts) { return _this.allPosts = posts; });
        if (this.sharedService.loggedIn) {
            console.log("Am logged in");
        }
        else {
            console.log("Whyyyy dude");
        }
        this.getPosts();
    };
    PersonalFeedComponent.prototype.getPosts = function () {
        if (this.allPosts.length == 0) {
            console.log(this.user);
            console.log(this.sharedService.feedPagination);
            this.postsService.paginateForUser(this.user, this.sharedService.feedPagination);
        }
    };
    PersonalFeedComponent.prototype.ngOnDestroy = function () {
        this.userSub.unsubscribe();
        this.allPostsSub.unsubscribe();
    };
    //Calls to service
    PersonalFeedComponent.prototype.reportPost = function (post) {
        this.postsService.reportPost(post);
    };
    //Calls to service
    PersonalFeedComponent.prototype.upvotePost = function (post, user) {
        this.postsService.upvotePost(post, user);
    };
    //Calls to service
    PersonalFeedComponent.prototype.downvotePost = function (post, user) {
        this.postsService.downvotePost(post, user);
    };
    PersonalFeedComponent.prototype.checkPosts = function () {
        console.log(this.allPosts);
    };
    PersonalFeedComponent.prototype.checkUser = function () {
        console.log(this.user);
    };
    PersonalFeedComponent.prototype.changeSelectedPost = function (post) {
        this.postsService.changeSelectedPost(post);
    };
    PersonalFeedComponent.prototype.loadMorePosts = function () {
        this.sharedService.feedPagination += 2;
        this.postsService.paginatePosts(this.sharedService.feedPagination);
    };
    PersonalFeedComponent = __decorate([
        core_1.Component({
            selector: 'personalFeed-component',
            templateUrl: './personalFeed.component.html',
            styleUrls: ['../../CommunitiesStyle.css'],
            providers: []
        })
    ], PersonalFeedComponent);
    return PersonalFeedComponent;
}());
exports.PersonalFeedComponent = PersonalFeedComponent;
//# sourceMappingURL=personalFeed.component.js.map