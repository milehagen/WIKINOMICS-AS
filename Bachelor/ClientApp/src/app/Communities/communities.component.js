"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunitiesComponent = void 0;
var core_1 = require("@angular/core");
var comments_service_1 = require("./shared/comments/comments.service");
var posts_service_1 = require("./shared/posts/posts.service");
var shared_service_1 = require("./shared/shared.service");
var communities_service_1 = require("./shared/communities/communities.service");
var CommunitiesComponent = /** @class */ (function () {
    function CommunitiesComponent(_http, fb, userService, sharedService, communitiesService, commentsService, postsService, router) {
        this._http = _http;
        this.fb = fb;
        this.userService = userService;
        this.sharedService = sharedService;
        this.communitiesService = communitiesService;
        this.commentsService = commentsService;
        this.postsService = postsService;
        this.router = router;
    }
    CommunitiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSub = this.userService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.rootCommunitiesSub = this.communitiesService.rootCommunitiesCurrent.subscribe(function (communities) { return _this.rootCommunities = communities; });
        this.allCommunitiesSub = this.communitiesService.allCommunitiesCurrent.subscribe(function (communities) { return _this.allCommunities = communities; });
        this.selectedCommunitySub = this.communitiesService.selectedCommunityCurrent.subscribe(function (community) { return _this.selectedCommunity = community; });
        this.loggedInSub = this.userService.loggedInCurrent.subscribe(function (loggedIn) { return _this.loggedIn = loggedIn; });
        this.communitiesService.getRootCommunities(0);
    };
    CommunitiesComponent.prototype.ngOnDestroy = function () {
        this.userSub.unsubscribe();
        this.loggedInSub.unsubscribe();
        this.rootCommunitiesSub.unsubscribe();
        this.allCommunitiesSub.unsubscribe();
        this.selectedCommunitySub.unsubscribe();
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