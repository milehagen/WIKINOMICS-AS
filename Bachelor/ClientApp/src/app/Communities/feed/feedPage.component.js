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
exports.FeedPageComponent = void 0;
var Community_1 = require("../../Models/Communities/Community");
var Post_1 = require("../../Models/Communities/Post");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FeedPageComponent = /** @class */ (function () {
    function FeedPageComponent(sharedService, userService, communitiesService, commentsService, postsService, route, router, fb) {
        this.sharedService = sharedService;
        this.userService = userService;
        this.communitiesService = communitiesService;
        this.commentsService = commentsService;
        this.postsService = postsService;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.selectedCommunity = new Community_1.Community();
        this.postValidation = {
            textPost: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[a-zA-ZæøåÆØÅ., \-\s\S]{3,1000}$")])
            ],
            postTagField: [
                { value: '', disabled: true }, forms_1.Validators.compose([forms_1.Validators.required])
            ],
            identityField: [
                null, forms_1.Validators.compose([forms_1.Validators.required])
            ],
            experienceField: [
                null, forms_1.Validators.compose([forms_1.Validators.required])
            ]
        };
        this.postForm = fb.group(this.postValidation);
        this.postForm.controls['identityField'].setValue('');
        this.postForm.controls['experienceField'].setValue('');
    }
    //Start up
    FeedPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Subscribe to things we need from services
        this.userSub = this.userService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.loggedInSub = this.userService.loggedInCurrent.subscribe(function (loggedIn) { return _this.loggedIn = loggedIn; });
        this.selectedCommunitySub = this.communitiesService.selectedCommunityCurrent.subscribe(function (community) { return _this.selectedCommunity = community; });
        this.allCommunitiesSub = this.communitiesService.allCommunitiesCurrent.subscribe(function (communities) { return _this.allCommunities = communities; });
        this.rootCommunitiesSub = this.communitiesService.rootCommunitiesCurrent.subscribe(function (communities) { return _this.rootCommunities = communities; });
        this.allPostTagsSub = this.postsService.allPostTagsCurrent.subscribe(function (postTag) { return _this.allPostTags = postTag; });
        this.allPostsSub = this.postsService.allPostsCurrent.subscribe(function (posts) { return _this.allPosts = posts; });
        //Gets param from URL.
        //Called whenever URL changes
        this.route.paramMap.subscribe(function (params) {
            _this.communityId = +params.get('communityId');
            //If the array of all Communities is already gotten, we don't bother backend
            if (_this.allCommunities.length > 0) {
                _this.communitiesService.changeSelectedCommunity(_this.allCommunities.find(function (c) { return c.id === _this.communityId; }));
            }
            else {
                _this.communitiesService.getCommunity(_this.communityId);
            }
            //If there currently are no tags, we get them
            if (_this.allPostTags == null || _this.allPostTags.length == 0) {
                _this.postsService.getPostTags();
            }
            //Checking if user is subbed to community
            _this.subscriptionCheck();
            //If posts for this community is already loaded we don't do it again
            //This to prevent duplicate loads when going in and out of posts
            if (_this.allPosts.length < 1) {
                _this.postsService.paginateFromCommunity(_this.communityId, _this.sharedService.feedPagination);
            }
        });
    };
    FeedPageComponent.prototype.ngOnDestroy = function () {
        this.allCommunitiesSub.unsubscribe();
        this.rootCommunitiesSub.unsubscribe();
        this.allPostsSub.unsubscribe();
        this.allPostTagsSub.unsubscribe();
        this.selectedCommunitySub.unsubscribe();
        this.userSub.unsubscribe();
        this.loggedInSub.unsubscribe();
    };
    FeedPageComponent.prototype.changeOrderByValue = function ($event) {
        this.orderByValue = $event;
    };
    FeedPageComponent.prototype.changeSelectedPost = function (post) {
        this.postsService.changeSelectedPost(post);
    };
    //Checks if a logged in user is subscribed to the community or not
    FeedPageComponent.prototype.subscriptionCheck = function () {
        var _this = this;
        if (this.user.communities) {
            if (this.user.communities.find(function (_a) {
                var id = _a.id;
                return id === _this.selectedCommunity.id;
            })) {
                this.subscribed = 1;
            }
            else {
                this.subscribed = 0;
            }
        }
        else {
            this.subscribed = -1;
        }
    };
    //Calls service function for subscribing
    FeedPageComponent.prototype.subscribe = function (community, user) {
        return __awaiter(this, void 0, void 0, function () {
            var okSub, okUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.communitiesService.subscribe(community, user)];
                    case 1:
                        okSub = _a.sent();
                        if (!okSub) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userService.GetUser(user.id)];
                    case 2:
                        okUser = _a.sent();
                        this.sharedService.openSnackBarMessage("Subscribed to " + community.title, "Ok");
                        if (okUser != null) {
                            this.subscriptionCheck();
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //Calls service function for unsubscribing
    FeedPageComponent.prototype.unsubscribe = function (community, user) {
        return __awaiter(this, void 0, void 0, function () {
            var okUnsub, okUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.communitiesService.unsubscribe(community, user)];
                    case 1:
                        okUnsub = _a.sent();
                        if (!okUnsub) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.userService.GetUser(user.id)];
                    case 2:
                        okUser = _a.sent();
                        ;
                        this.sharedService.openSnackBarMessage("Unsubscribed from " + community.title, "Ok");
                        if (okUser != null) {
                            this.subscriptionCheck();
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FeedPageComponent.prototype.reportPost = function (post) {
        this.postsService.reportPost(post);
    };
    FeedPageComponent.prototype.upvotePost = function (post, user) {
        this.postsService.upvotePost(post, user);
    };
    FeedPageComponent.prototype.downvotePost = function (post, user) {
        this.postsService.downvotePost(post, user);
    };
    //If you click one of the subcommunities
    FeedPageComponent.prototype.changeSelectedCommunity = function (community) {
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
    //If user wants to add a tag, we include it in validation
    FeedPageComponent.prototype.postTagToggle = function () {
        if (this.usePostTag) {
            this.postForm.controls['postTagField'].enable();
        }
        else {
            this.postForm.controls['postTagField'].disable();
        }
    };
    //Wheter to show the publish section or not
    FeedPageComponent.prototype.showPublishSection = function () {
        if (this.loggedIn) {
            this.showPublishSectionToggle = !this.showPublishSectionToggle;
            this.postForm.patchValue({ textPost: "" });
        }
        else {
            this.sharedService.openSnackBarMessage("You have to be logged in to post!", "Ok");
        }
    };
    //Setting up to publish a post, gets sent to Post Service
    FeedPageComponent.prototype.sendPost = function (post) {
        var post;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.loggedIn) return [3 /*break*/, 2];
                        post = new Post_1.Post();
                        post.text = this.postForm.value.textPost;
                        post.community = this.selectedCommunity;
                        post.date = new Date().toJSON();
                        post.user = this.user;
                        if (this.usePostTag) {
                            post.postTag = this.postForm.value.postTagField;
                        }
                        if (this.postForm.value.identityField === "null") {
                            post.anonymous = true;
                        }
                        else {
                            post.anonymous = false;
                        }
                        //Add experience to Post
                        if (this.postForm.value.experienceField !== "null") {
                            post.experience = this.postForm.value.experienceField;
                        }
                        return [4 /*yield*/, this.postsService.sendPost(post)];
                    case 1:
                        if (_a.sent()) {
                            this.showPublishSectionToggle = false;
                            this.postForm.patchValue({ textPost: "" });
                        }
                        else {
                            console.log("Else in posting");
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    FeedPageComponent.prototype.noRouting = function (e) {
        e.stopPropagation();
    };
    FeedPageComponent.prototype.loadMorePosts = function () {
        this.sharedService.feedPagination += 2;
        this.postsService.paginateFromCommunity(this.communityId, this.sharedService.feedPagination);
    };
    FeedPageComponent = __decorate([
        core_1.Component({
            selector: 'feedPage-component',
            templateUrl: './feedPage.component.html',
            styleUrls: ['../CommunitiesStyle.css'],
            providers: []
        })
    ], FeedPageComponent);
    return FeedPageComponent;
}());
exports.FeedPageComponent = FeedPageComponent;
//# sourceMappingURL=feedPage.component.js.map