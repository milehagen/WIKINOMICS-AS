"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllComponent = void 0;
var core_1 = require("@angular/core");
var AllComponent = /** @class */ (function () {
    function AllComponent(sharedService, userService, communitiesService, commentsService, postsService, route, router) {
        this.sharedService = sharedService;
        this.userService = userService;
        this.communitiesService = communitiesService;
        this.commentsService = commentsService;
        this.postsService = postsService;
        this.route = route;
        this.router = router;
    }
    AllComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSub = this.userService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.allPostsSub = this.postsService.allPostsCurrent.subscribe(function (posts) { return _this.allPosts = posts; });
        this.allCommunitiesSub = this.communitiesService.allCommunitiesCurrent.subscribe(function (communitites) { return _this.allCommunities = communitites; });
        this.allPostTagsSub = this.postsService.allPostTagsCurrent.subscribe(function (tags) { return _this.allPostTags = tags; });
        if (this.allPosts.length <= 0) {
            this.postsService.paginatePosts(this.sharedService.feedPagination);
        }
    };
    AllComponent.prototype.ngOnDestroy = function () {
        this.userSub.unsubscribe();
        this.allPostsSub.unsubscribe();
        this.allCommunitiesSub.unsubscribe();
        this.allPostTagsSub.unsubscribe();
    };
    //Calls to service
    AllComponent.prototype.reportPost = function (post) {
        this.postsService.reportPost(post);
    };
    //Calls to service
    AllComponent.prototype.upvotePost = function (post, user) {
        this.postsService.upvotePost(post, user);
    };
    //Calls to service
    AllComponent.prototype.downvotePost = function (post, user) {
        this.postsService.downvotePost(post, user);
    };
    AllComponent.prototype.checkPosts = function () {
        console.log(this.allPosts);
    };
    AllComponent.prototype.changeSelectedPost = function (post) {
        this.postsService.changeSelectedPost(post);
    };
    AllComponent.prototype.loadMorePosts = function () {
        this.sharedService.feedPagination += 2;
        this.postsService.paginatePosts(this.sharedService.feedPagination);
    };
    AllComponent.prototype.noRouting = function (e) {
        e.stopPropagation();
    };
    AllComponent = __decorate([
        core_1.Component({
            selector: 'all-component',
            templateUrl: './all.component.html',
            styleUrls: ['../../CommunitiesStyle.css'],
            providers: []
        })
    ], AllComponent);
    return AllComponent;
}());
exports.AllComponent = AllComponent;
//# sourceMappingURL=all.component.js.map