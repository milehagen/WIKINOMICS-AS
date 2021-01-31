"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedComponent = void 0;
var Post_1 = require("../../Models/Post");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FeedComponent = /** @class */ (function () {
    function FeedComponent(communitiesService, route, router, fb) {
        this.communitiesService = communitiesService;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.postValidation = {
            textPost: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(20), forms_1.Validators.maxLength(1000)])
            ]
        };
        this.postForm = fb.group(this.postValidation);
    }
    //Start up
    FeedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            _this.communityId = +params.get('communityId');
            //this.communitiesService.changeSelectedCommunity(this.allCommunities[this.communityId]);
            _this.communitiesService.getPostsForCommunityId(_this.communityId);
        });
        this.communitiesService.selectedCommunityCurrent.subscribe(function (community) { return _this.selectedCommunity = community; });
        this.communitiesService.allPostsCurrent.subscribe(function (posts) { return _this.allPosts = posts; });
    };
    FeedComponent.prototype.showCommunityID = function () {
        console.log(this.communityId);
    };
    FeedComponent.prototype.getPosts = function () {
        console.log(this.allPosts);
    };
    FeedComponent.prototype.getCommunity = function () {
        console.log(this.selectedCommunity);
    };
    FeedComponent.prototype.sendPost = function (post) {
        if (this.communitiesService.checkLogin()) {
            var post = new Post_1.Post();
            post.text = this.postForm.value.textPost;
            post.community = this.selectedCommunity;
            post.date = new Date();
            post.userID = sessionStorage.getItem("tempID");
            this.communitiesService.sendPost(post);
        }
    };
    FeedComponent = __decorate([
        core_1.Component({
            selector: 'feed-component',
            templateUrl: './feed.component.html',
            providers: []
        })
    ], FeedComponent);
    return FeedComponent;
}());
exports.FeedComponent = FeedComponent;
//# sourceMappingURL=feed.component.js.map