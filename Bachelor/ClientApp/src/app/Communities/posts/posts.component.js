"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsComponent = void 0;
var Community_1 = require("../../Models/Community");
var Post_1 = require("../../Models/Post");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Comment_1 = require("../../Models/Comment");
var PostsComponent = /** @class */ (function () {
    function PostsComponent(communitiesService, route, router, fb, _location) {
        this.communitiesService = communitiesService;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this._location = _location;
        this.selectedPost = new Post_1.Post();
        this.selectedCommunity = new Community_1.Community();
        this.commentValidation = {
            textComment: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(20), forms_1.Validators.maxLength(500)])
            ]
        };
        this.commentForm = fb.group(this.commentValidation);
    }
    //Subscribes to URL parameter and what post is currently selected
    PostsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            _this.postId = +params.get('postId');
            _this.communityId = +params.get('communityId');
            _this.communitiesService.getCommunity(_this.communityId);
            _this.communitiesService.getPost(_this.postId);
        });
        this.communitiesService.selectedCommunityCurrent.subscribe(function (community) { return _this.selectedCommunity = community; });
        this.communitiesService.selectedPostCurrent.subscribe(function (post) { return _this.selectedPost = post; });
    };
    //Sends upvote to service.
    //Note: While the object is updated on backend, a new one is not fetched
    //Just a visual update here on the frontend
    PostsComponent.prototype.upvotePost = function (post) {
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
    PostsComponent.prototype.downvotePost = function (post) {
        if (this.communitiesService.checkLogin()) {
            var votedPost = new Post_1.Post();
            votedPost.downvotes = 1;
            this.communitiesService.votePost(post.id, votedPost);
            post.downvotes += 1;
        }
    };
    //Patches comment to the specified post
    PostsComponent.prototype.sendComment = function (postId) {
        if (this.communitiesService.checkLogin()) {
            var comment = new Comment_1.Comment();
            comment.post = this.selectedPost;
            comment.text = this.commentForm.value.textComment;
            comment.userID = sessionStorage.getItem("tempID");
            comment.date = new Date();
            comment.upvotes = 0;
            comment.downvotes = 0;
            this.communitiesService.sendComment(postId, comment);
        }
    };
    //Sends upvote to service.
    //Note: While the object is updated on backend, a new one is not fetched
    //Just a visual update here on the frontend
    PostsComponent.prototype.upvoteComment = function (comment) {
        if (this.communitiesService.checkLogin()) {
            var votedComment = new Comment_1.Comment();
            votedComment.upvotes = 1;
            this.communitiesService.voteComment(comment.id, votedComment);
            comment.upvotes += 1;
        }
    };
    //Sends downvote to service
    //Note: A new comment object is not retrived from DB after vote is cast
    //Just a visual update here on the frontend
    PostsComponent.prototype.downvoteComment = function (comment) {
        if (this.communitiesService.checkLogin()) {
            var votedComment = new Comment_1.Comment();
            votedComment.downvotes = -1;
            this.communitiesService.voteComment(comment.id, votedComment);
            comment.downvotes += 1;
        }
    };
    PostsComponent.prototype.seePost = function () {
        console.log(this.selectedPost);
    };
    PostsComponent.prototype.seeCommentText = function () {
        console.log(this.commentForm.value.textComment);
    };
    //Sends you back to last page
    PostsComponent.prototype.goBack = function () {
        this._location.back();
    };
    PostsComponent = __decorate([
        core_1.Component({
            selector: 'post-component',
            templateUrl: './posts.component.html',
            providers: []
        })
    ], PostsComponent);
    return PostsComponent;
}());
exports.PostsComponent = PostsComponent;
//# sourceMappingURL=posts.component.js.map