"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(500)])
            ],
            identityField: [
                null, forms_1.Validators.compose([forms_1.Validators.required])
            ],
            experienceField: [
                null, forms_1.Validators.compose([forms_1.Validators.required])
            ]
        };
        this.commentForm = fb.group(this.commentValidation);
    }
    //Subscribes to URL parameter and what post is currently selected
    PostsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSub = this.sharedService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.selectedCommunitySub = this.communitiesService.selectedCommunityCurrent.subscribe(function (community) { return _this.selectedCommunity = community; });
        this.allCommunitiesSub = this.communitiesService.allCommunitiesCurrent.subscribe(function (communities) { return _this.allCommunities = communities; });
        this.selectedPostSub = this.postsService.selectedPostCurrent.subscribe(function (post) { return _this.selectedPost = post; });
        this.allPostsSub = this.postsService.allPostsCurrent.subscribe(function (posts) { return _this.allPosts = posts; });
        this.route.paramMap.subscribe(function (params) {
            _this.postId = +params.get('postId');
            _this.communityId = +params.get('communityId');
            _this.postsService.getPost(_this.postId);
            if (_this.allCommunities.length > 0) {
                _this.communitiesService.changeSelectedCommunity(_this.allCommunities.find(function (c) { return c.id === _this.communityId; }));
            }
            else {
                _this.communitiesService.getCommunity(_this.communityId);
            }
        });
    };
    PostsComponent.prototype.ngOnDestroy = function () {
        this.allCommunitiesSub.unsubscribe();
        this.allPostsSub.unsubscribe();
        this.selectedCommunitySub.unsubscribe();
        this.selectedPostSub.unsubscribe();
        this.userSub.unsubscribe();
    };
    //Calls to service
    PostsComponent.prototype.reportPost = function (post) {
        this.postsService.reportPost(post);
    };
    //Calls to service
    PostsComponent.prototype.upvotePost = function (post, user) {
        this.postsService.upvotePost(post, user);
    };
    //Calls to service
    PostsComponent.prototype.downvotePost = function (post, user) {
        this.postsService.downvotePost(post, user);
    };
    //Calls to service
    PostsComponent.prototype.reportComment = function (comment) {
        this.commentsService.reportComment(comment);
    };
    //Calls to service
    PostsComponent.prototype.upvoteComment = function (comment, user) {
        this.commentsService.upvoteComment(comment, user);
    };
    //Calls to service
    PostsComponent.prototype.downvoteComment = function (comment, user) {
        this.commentsService.downvoteComment(comment, user);
    };
    //Patches comment to the specified post
    PostsComponent.prototype.sendComment = function (postId) {
        return __awaiter(this, void 0, void 0, function () {
            var comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.checkLogin()];
                    case 1:
                        if (_a.sent()) {
                            comment = new Comment_1.Comment();
                            comment.post = this.selectedPost;
                            comment.text = this.commentForm.value.textComment;
                            comment.user = this.user;
                            comment.date = new Date().toJSON();
                            comment.upvotes = 0;
                            comment.downvotes = 0;
                            if (this.respondToCommentIndex) {
                                comment.responsTo = this.respondToCommentIndex;
                            }
                            if (this.commentForm.value.identityField === "null") {
                                comment.anonymous = true;
                            }
                            else {
                                comment.anonymous = false;
                            }
                            if (this.commentForm.value.experienceField !== "null") {
                                comment.experience = this.commentForm.value.experienceField;
                            }
                            if (this.commentsService.sendComment(postId, comment)) {
                                this.commentForm.patchValue({ textComment: "" });
                                this.respondToCommentIndex = 0;
                            }
                        }
                        else {
                            this.sharedService.openSnackBarMessage("Must be logged in to comment", "Ok");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //Called if user clicks to respond to specific comment in thread
    //Sets the index
    PostsComponent.prototype.respondToComment = function (index) {
        this.respondToCommentIndex = index + 1;
        this.commentForm.patchValue({ textComment: "@" + this.respondToCommentIndex + " " });
    };
    //Called if user doesn't want to respond after all
    //Removes the comment index from variabel
    PostsComponent.prototype.cancelRespons = function () {
        this.respondToCommentIndex = 0;
    };
    //When a user clicks on the "Reply to comment #x" on a comment that is a respons
    //it highlights that comment
    PostsComponent.prototype.highlightComment = function (index) {
        this.highligtedIndex = index;
    };
    //Sends you back to last page
    PostsComponent.prototype.goBack = function () {
        this._location.back();
    };
    PostsComponent.prototype.noRouting = function (e) {
        e.stopPropagation();
    };
    PostsComponent = __decorate([
        core_1.Component({
            selector: 'post-component',
            templateUrl: './posts.component.html',
            styleUrls: ['../CommunitiesStyle.css'],
            providers: []
        })
    ], PostsComponent);
    return PostsComponent;
}());
exports.PostsComponent = PostsComponent;
//# sourceMappingURL=posts.component.js.map