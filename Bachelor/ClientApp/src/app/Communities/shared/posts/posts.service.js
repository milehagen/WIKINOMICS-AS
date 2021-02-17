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
exports.PostsService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var Post_1 = require("../../../Models/Communities/Post");
var UserPostVote_1 = require("../../../Models/Communities/UserPostVote");
var PostsService = /** @class */ (function () {
    function PostsService(_http, sharedService) {
        var _this = this;
        this._http = _http;
        this.sharedService = sharedService;
        //Posts from selected community
        this.allPostsSource = new rxjs_1.BehaviorSubject([]);
        this.allPostsCurrent = this.allPostsSource.asObservable();
        //The post the user is viewing
        this.selectedPostSource = new rxjs_1.BehaviorSubject(new Post_1.Post());
        this.selectedPostCurrent = this.selectedPostSource.asObservable();
        //All Tags that can be put on posts
        this.allPostTagsSource = new rxjs_1.BehaviorSubject([]);
        this.allPostTagsCurrent = this.allPostTagsSource.asObservable();
        //Checks if a user can vote.
        //Returns a code based on if the user has previously voted or not
        //Code 0 - User has never voted
        //Code 1 - User has upvoted, an upvote then should annul the vote, downvote should annul the upvote and increase downvote
        //Code 2 - User has downvoted, a downvote then should annul the vote, upvote should annul the downvote and increase upvote
        this.checkIfCanVote = function (voteCheck) {
            return new Promise((function (resolve) {
                _this._http.post("api/Post/CheckVotePost/", voteCheck)
                    .subscribe(function (response) {
                    var ok = response;
                    resolve(ok);
                });
            }));
        };
    }
    PostsService.prototype.changeAllPosts = function (posts) {
        this.allPostsSource.next(posts);
    };
    PostsService.prototype.changeSelectedPost = function (post) {
        this.selectedPostSource.next(post);
    };
    PostsService.prototype.changeAllPostTags = function (postTags) {
        this.allPostTagsSource.next(postTags);
    };
    PostsService.prototype.getPostsForCommunity = function (communityId) {
        var _this = this;
        this._http.get("api/Post/GetPostsFromCommunity/" + communityId)
            .subscribe(function (data) {
            _this.changeAllPosts(data);
        }, function (error) { return console.log(error); });
    };
    PostsService.prototype.getPost = function (Id) {
        var _this = this;
        this._http.get("api/Post/GetPost/" + Id)
            .subscribe(function (data) {
            _this.changeSelectedPost(data);
        }, function (error) { return console.log(error); });
    };
    PostsService.prototype.getPostTags = function () {
        var _this = this;
        this._http.get("api/Post/GetPostTags")
            .subscribe(function (data) {
            _this.changeAllPostTags(data);
        }, function (error) { return console.log(error); });
    };
    //Posts post to Community
    //Updates post from community and shows a snackbar if succesful
    PostsService.prototype.sendPost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._http.post("api/Post/Publish", post, { responseType: 'text' })
                            .subscribe(function (response) {
                            if (response == "Post published") {
                                _this.getPostsForCommunity(post.community.id);
                                _this.sharedService.openSnackBarMessage("Post was published in " + post.community.title, "Ok");
                                return true;
                            }
                        }, function (error) {
                            console.log(error);
                            return false;
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, false];
                }
            });
        });
    };
    //Sends upvote to service.
    //Note: While the object is updated on backend, a new one is not fetched
    //Just a visual update here on the frontend
    PostsService.prototype.upvotePost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var voteRecord, voteCode, votedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.sharedService.checkLogin()) return [3 /*break*/, 2];
                        voteRecord = new UserPostVote_1.UserPostVote();
                        voteRecord.PostId = post.id;
                        voteRecord.Voted = 1;
                        voteRecord.UserId = sessionStorage.getItem("tempID");
                        return [4 /*yield*/, this.checkIfCanVote(voteRecord)];
                    case 1:
                        voteCode = _a.sent();
                        console.log("Voting code " + voteCode);
                        if (voteCode >= 0) {
                            votedPost = new Post_1.Post();
                            //Fresh vote
                            if (voteCode == 0) {
                                votedPost.upvotes = 1;
                                post.upvotes++;
                            }
                            //Annuling upvote
                            else if (voteCode == 1) {
                                votedPost.upvotes = -1;
                                voteRecord.Voted = 0;
                                post.upvotes--;
                            }
                            //Changing downvote to upvote
                            else if (voteCode == 2) {
                                votedPost.upvotes = 1;
                                votedPost.downvotes = -1;
                                voteRecord.Voted = 1;
                                post.upvotes++;
                                post.downvotes--;
                            }
                            this.votePost(post.id, votedPost);
                            this.logVote(voteRecord);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.sharedService.openSnackBarMessage("Must be logged in to vote", "Ok");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //Sends downvote to service.
    //Note: While the object is updated on backend, a new one is not fetched
    //Just a visual update here on the frontend
    PostsService.prototype.downvotePost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var voteRecord, voteCode, votedPost;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.sharedService.checkLogin()) return [3 /*break*/, 2];
                        voteRecord = new UserPostVote_1.UserPostVote();
                        voteRecord.PostId = post.id;
                        voteRecord.Voted = -1;
                        voteRecord.UserId = sessionStorage.getItem("tempID");
                        return [4 /*yield*/, this.checkIfCanVote(voteRecord)];
                    case 1:
                        voteCode = _a.sent();
                        if (voteCode >= 0) {
                            votedPost = new Post_1.Post();
                            //Fresh vote
                            if (voteCode == 0) {
                                votedPost.downvotes = 1;
                                post.downvotes++;
                            }
                            //changing upvote to downvote
                            else if (voteCode == 1) {
                                votedPost.upvotes = -1;
                                votedPost.downvotes = 1;
                                post.upvotes--;
                                post.downvotes++;
                                voteRecord.Voted = -1;
                            }
                            //Annuling downvote
                            else if (voteCode == 2) {
                                votedPost.downvotes = -1;
                                post.downvotes--;
                                voteRecord.Voted = 0;
                            }
                            this.votePost(post.id, votedPost);
                            this.logVote(voteRecord);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        this.sharedService.openSnackBarMessage("Must be logged in to vote", "Ok");
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    //Logs the vote so a user can't vote the same direction twice
    PostsService.prototype.logVote = function (voteRecord) {
        this._http.post("api/Post/LogVotePost/", voteRecord, { responseType: 'text' })
            .subscribe(function (response) {
            console.log(response);
        });
    };
    PostsService.prototype.votePost = function (postId, votedPost) {
        this._http.patch("api/Post/VotePost/" + postId, votedPost, { responseType: 'text' })
            .subscribe(function (response) {
        });
    };
    PostsService = __decorate([
        core_1.Injectable()
    ], PostsService);
    return PostsService;
}());
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map