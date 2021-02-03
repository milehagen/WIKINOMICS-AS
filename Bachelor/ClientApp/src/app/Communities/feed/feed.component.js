"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedComponent = void 0;
var Community_1 = require("../../Models/Community");
var Post_1 = require("../../Models/Post");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FeedComponent = /** @class */ (function () {
    function FeedComponent(communitiesService, route, router, fb) {
        this.communitiesService = communitiesService;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.selectedCommunity = new Community_1.Community();
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
            _this.communitiesService.getCommunity(_this.communityId);
            _this.communitiesService.getPostsForCommunity(_this.communityId);
        });
        this.communitiesService.selectedCommunityCurrent.subscribe(function (community) { return _this.selectedCommunity = community; });
        this.communitiesService.allPostsCurrent.subscribe(function (posts) { return _this.allPosts = posts; });
    };
    FeedComponent.prototype.sendPost = function (post) {
        if (this.communitiesService.checkLogin()) {
            var post = new Post_1.Post();
            post.text = this.postForm.value.textPost;
            post.community = this.selectedCommunity;
            post.date = new Date().toJSON();
            post.userID = sessionStorage.getItem("tempID");
            if (this.communitiesService.sendPost(post)) {
                console.log("Its true");
                this.postForm.patchValue({ textPost: "" });
            }
            else {
                console.log("Its false");
            }
        }
    };
    //Sends upvote to service.
    //Note: While the object is updated on backend, a new one is not fetched
    //Just a visual update here on the frontend
    FeedComponent.prototype.upvotePost = function (post) {
        if (this.communitiesService.checkLogin()) {
            var votedPost = new Post_1.Post();
            votedPost.upvotes = 1;
            this.communitiesService.votePost(post.id, votedPost);
            post.upvotes += 1;
        }
    };
    //Sends downvote to service.
    //Note: While the object is updated on backend, a new one is not fetched
    //Just a visual update here on the frontend
    FeedComponent.prototype.downvotePost = function (post) {
        if (this.communitiesService.checkLogin()) {
            var votedPost = new Post_1.Post();
            votedPost.downvotes = 1;
            this.communitiesService.votePost(post.id, votedPost);
            post.downvotes += 1;
        }
    };
    FeedComponent.prototype.showSelectedCommunity = function () {
        console.log(this.selectedCommunity);
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