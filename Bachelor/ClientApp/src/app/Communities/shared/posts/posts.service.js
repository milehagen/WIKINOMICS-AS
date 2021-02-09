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
var Post_1 = require("../../../Models/Post");
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
        this.allPostTagsSource = new rxjs_1.BehaviorSubject([]);
        this.allPostTagsCurrent = this.allPostTagsSource.asObservable();
        //Checks if a user can vote.
        this.checkIfCanVote = function (voteCheck) {
            console.log("5");
            return new Promise((function (resolve) {
                _this._http.post("api/Community/CheckVotePost/", voteCheck)
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
        this._http.get("api/Community/GetPostsFromCommunity/" + communityId)
            .subscribe(function (data) {
            _this.changeAllPosts(data);
        }, function (error) { return console.log(error); });
    };
    PostsService.prototype.getPost = function (Id) {
        var _this = this;
        this._http.get("api/Community/GetPost/" + Id)
            .subscribe(function (data) {
            _this.changeSelectedPost(data);
        }, function (error) { return console.log(error); });
    };
    PostsService.prototype.getPostTags = function () {
        var _this = this;
        this._http.get("api/Community/GetPostTags")
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
                    case 0: return [4 /*yield*/, this._http.post("api/Community/Publish", post, { responseType: 'text' })
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
    PostsService.prototype.logVote = function (voteRecord) {
        this._http.post("api/Community/LogVotePost/", voteRecord, { responseType: 'text' })
            .subscribe(function (response) {
            console.log(response);
        });
    };
    PostsService.prototype.votePost = function (postId, votedPost) {
        this._http.patch("api/Community/VotePost/" + postId, votedPost, { responseType: 'text' })
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