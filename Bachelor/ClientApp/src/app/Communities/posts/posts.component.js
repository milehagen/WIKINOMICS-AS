"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsComponent = void 0;
var Community_1 = require("../../Models/Communities/Community");
var Post_1 = require("../../Models/Communities/Post");
var Comment_1 = require("../../Models/Communities/Comment");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var PostsComponent = /** @class */ (function () {
    function PostsComponent(sharedService, communitiesService, commentsService, postsService, route, router, fb, _location) {
        this.sharedService = sharedService;
        this.communitiesService = communitiesService;
        this.commentsService = commentsService;
        this.postsService = postsService;
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
            _this.postsService.getPost(_this.postId);
        });
        this.communitiesService.selectedCommunityCurrent.subscribe(function (community) { return _this.selectedCommunity = community; });
        this.postsService.selectedPostCurrent.subscribe(function (post) { return _this.selectedPost = post; });
    };
    //Patches comment to the specified post
    PostsComponent.prototype.sendComment = function (postId) {
        if (this.sharedService.checkLogin()) {
            var comment = new Comment_1.Comment();
            comment.post = this.selectedPost;
            comment.text = this.commentForm.value.textComment;
            comment.userID = sessionStorage.getItem("tempID");
            comment.date = new Date().toJSON();
            comment.upvotes = 0;
            comment.downvotes = 0;
            if (this.commentsService.sendComment(postId, comment)) {
                this.commentForm.patchValue({ textComment: "" });
            }
        }
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