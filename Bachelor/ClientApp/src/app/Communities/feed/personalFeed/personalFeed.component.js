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
var rxjs_1 = require("rxjs");
var PersonalFeedComponent = /** @class */ (function () {
    function PersonalFeedComponent(sharedService, userService, communitiesService, commentsService, postsService, route, router) {
        this.sharedService = sharedService;
        this.userService = userService;
        this.communitiesService = communitiesService;
        this.commentsService = commentsService;
        this.postsService = postsService;
        this.route = route;
        this.router = router;
    }
    PersonalFeedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userIdSub = this.userService.userIdCurrent.subscribe(function (userId) { return _this.userId = userId; });
        this.allPostsSub = this.postsService.allPostsCurrent.subscribe(function (posts) { return _this.allPosts = posts; });
        this.userSub = this.userService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.loggedInSub = this.userService.loggedInCurrent.subscribe(function (loggedIn) { return _this.loggedIn = loggedIn; });
    };
    PersonalFeedComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //I'm so sorry for this
        this.loopSub = rxjs_1.interval(250).subscribe((function (x) {
            _this.checkUserIsDefined();
        }));
    };
    PersonalFeedComponent.prototype.ngOnDestroy = function () {
        this.loopSub.unsubscribe();
        this.allPostsSub.unsubscribe();
        this.userSub.unsubscribe();
        this.loggedInSub.unsubscribe();
        this.userIdSub.unsubscribe();
    };
    //Checks if a user is ready to be used for fetching 
    PersonalFeedComponent.prototype.checkUserIsDefined = function () {
        if (this.loggedIn) {
            this.getPosts();
            this.loopSub.unsubscribe();
        }
        console.log("Not logged in yet");
    };
    //Gets the initial posts, is only called on startup of page.
    //feed component makes all subsequent calls
    PersonalFeedComponent.prototype.getPosts = function () {
        if (this.allPosts.length == 0) {
            this.postsService.paginateForUser(this.user, this.sharedService.feedPagination);
        }
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