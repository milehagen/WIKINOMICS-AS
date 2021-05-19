"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedComponent = void 0;
var Community_1 = require("../../Models/Communities/Community");
var core_1 = require("@angular/core");
var FeedComponent = /** @class */ (function () {
    function FeedComponent(sharedService, userService, communitiesService, commentsService, postsService, route, router) {
        this.sharedService = sharedService;
        this.userService = userService;
        this.communitiesService = communitiesService;
        this.commentsService = commentsService;
        this.postsService = postsService;
        this.route = route;
        this.router = router;
        this.selectedCommunity = new Community_1.Community();
    }
    //Start up
    FeedComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Subscribe to things we need from services
        this.userSub = this.userService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.loggedInSub = this.userService.loggedInCurrent.subscribe(function (loggedIn) { return _this.loggedIn = loggedIn; });
        this.selectedCommunitySub = this.communitiesService.selectedCommunityCurrent.subscribe(function (community) { return _this.selectedCommunity = community; });
        this.rootCommunitiesSub = this.communitiesService.rootCommunitiesCurrent.subscribe(function (communities) { return _this.rootCommunities = communities; });
        //Gets param from URL.
        //Called whenever URL changes
        this.route.paramMap.subscribe(function (params) {
            _this.communityId = +params.get('communityId');
        });
    };
    FeedComponent.prototype.ngOnDestroy = function () {
        this.rootCommunitiesSub.unsubscribe();
        this.selectedCommunitySub.unsubscribe();
        this.userSub.unsubscribe();
        this.loggedInSub.unsubscribe();
    };
    FeedComponent.prototype.changeOrderByValue = function ($event) {
        this.orderByValue = $event;
    };
    FeedComponent.prototype.changeSelectedPost = function (post) {
        this.postsService.changeSelectedPost(post);
    };
    FeedComponent.prototype.reportPost = function (post) {
        this.postsService.reportPost(post);
    };
    FeedComponent.prototype.upvotePost = function (post, user) {
        this.postsService.upvotePost(post, user);
    };
    FeedComponent.prototype.downvotePost = function (post, user) {
        this.postsService.downvotePost(post, user);
    };
    //If you click one of the subcommunities
    FeedComponent.prototype.changeSelectedCommunity = function (community) {
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
    FeedComponent.prototype.noRouting = function (e) {
        e.stopPropagation();
    };
    //Copies the absolute URL to clipboard
    FeedComponent.prototype.copyURLOfPost = function (post) {
        if (this.postsService.copyURLToClipboard(post)) {
            this.sharedService.openSnackBarMessage("Link copied to clipboard", "Ok");
        }
    };
    FeedComponent.prototype.loadMorePosts = function () {
        this.sharedService.feedPagination += 2;
        //If it's the all feed
        if (this.router.url === "/communities/all") {
            this.postsService.paginatePosts(this.sharedService.feedPagination);
        }
        //Personal feed
        else if (this.router.url === "/communities/your") {
            this.postsService.paginateForUser(this.user, this.sharedService.feedPagination);
        }
        //Normal community feed
        else {
            this.postsService.paginateFromCommunity(this.communityId, this.sharedService.feedPagination);
        }
    };
    FeedComponent.prototype.getColor = function (tag) {
        switch (tag) {
            case 'Sharing advice':
                return 'green';
            case 'Seeking advice':
                return 'red';
            case 'Question':
                return 'blue';
        }
    };
    __decorate([
        core_1.Input()
    ], FeedComponent.prototype, "allPosts", void 0);
    FeedComponent = __decorate([
        core_1.Component({
            selector: 'feed-component',
            templateUrl: './feed.component.html',
            styleUrls: ['../CommunitiesStyle.css'],
            providers: []
        })
    ], FeedComponent);
    return FeedComponent;
}());
exports.FeedComponent = FeedComponent;
//# sourceMappingURL=feed.component.js.map