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
exports.FeedComponent = void 0;
var Community_1 = require("../../Models/Community");
var Post_1 = require("../../Models/Post");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var UserPostVote_1 = require("../../Models/UserPostVote");
var FeedComponent = /** @class */ (function () {
    function FeedComponent(sharedService, communitiesService, commentsService, postsService, route, router, fb) {
        this.sharedService = sharedService;
        this.communitiesService = communitiesService;
        this.commentsService = commentsService;
        this.postsService = postsService;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.selectedCommunity = new Community_1.Community();
        this.postValidation = {
            textPost: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("[a-zA-ZæøåÆØÅ., \-\s\S]{20,1000}$")])
            ],
            postTagField: [
                { value: '', disabled: true }, forms_1.Validators.compose([forms_1.Validators.required])
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
            _this.postsService.getPostsForCommunity(_this.communityId);
        });
        this.postsService.getPostTags();
        this.postsService.allPostTagsCurrent.subscribe(function (postTag) { return _this.allPostTags = postTag; });
        this.communitiesService.selectedCommunityCurrent.subscribe(function (community) { return _this.selectedCommunity = community; });
        this.postsService.allPostsCurrent.subscribe(function (posts) { return _this.allPosts = posts; });
    };
    //If user wants to add a tag, we include it in validation
    FeedComponent.prototype.postTagToggle = function () {
        if (this.usePostTag) {
            this.postForm.controls['postTagField'].enable();
        }
        else {
            this.postForm.controls['postTagField'].disable();
        }
    };
    FeedComponent.prototype.sendPost = function (post) {
        if (this.sharedService.checkLogin()) {
            var post = new Post_1.Post();
            post.text = this.postForm.value.textPost;
            post.community = this.selectedCommunity;
            post.date = new Date().toJSON();
            post.userID = sessionStorage.getItem("tempID");
            if (this.usePostTag) {
                post.postTag = this.postForm.value.postTagField;
            }
            if (this.postsService.sendPost(post)) {
                this.postForm.patchValue({ textPost: "" });
            }
        }
    };
    //Sends upvote to service.
    //Note: While the object is updated on backend, a new one is not fetched
    //Just a visual update here on the frontend
    FeedComponent.prototype.upvotePost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var voteCheck, Ok, votedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.sharedService.checkLogin()) return [3 /*break*/, 2];
                        console.log("2");
                        voteCheck = new UserPostVote_1.UserPostVote();
                        voteCheck.PostId = post.id;
                        voteCheck.Voted = 1;
                        voteCheck.UserId = sessionStorage.getItem("tempID");
                        return [4 /*yield*/, this.postsService.checkIfCanVote(voteCheck)];
                    case 1:
                        Ok = _a.sent();
                        if (Ok) {
                            console.log("6");
                            votedPost = new Post_1.Post();
                            votedPost.upvotes = 1;
                            this.postsService.votePost(post.id, votedPost);
                            this.postsService.logVote(voteCheck);
                            post.upvotes++;
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    //Sends downvote to service.
    //Note: While the object is updated on backend, a new one is not fetched
    //Just a visual update here on the frontend
    FeedComponent.prototype.downvotePost = function (post) {
        if (this.sharedService.checkLogin()) {
            var votedPost = new Post_1.Post();
            votedPost.downvotes = 1;
            this.postsService.votePost(post.id, votedPost);
            post.downvotes++;
        }
    };
    FeedComponent.prototype.showSelectedCommunity = function () {
        console.log(this.selectedCommunity);
    };
    FeedComponent.prototype.seePostTag = function () {
        console.log(this.allPostTags);
    };
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