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
exports.CommentsService = void 0;
var core_1 = require("@angular/core");
var CommentReport_1 = require("../../../Models/Admin/CommentReport");
var Comment_1 = require("../../../Models/Communities/Comment");
var UserCommentVote_1 = require("../../../Models/Communities/UserCommentVote");
var CommentsService = /** @class */ (function () {
    function CommentsService(_http, sharedService, communitiesService, postsService) {
        var _this = this;
        this._http = _http;
        this.sharedService = sharedService;
        this.communitiesService = communitiesService;
        this.postsService = postsService;
        //Checks if a user can vote.
        //Returns a code based on if the user has previously voted or not
        //Code 0 - User has never voted
        //Code 1 - User has upvoted, an upvote then should annul the vote, downvote should annul the upvote and increase downvote
        //Code 2 - User has downvoted, a downvote then should annul the vote, upvote should annul the downvote and increase upvote
        this.checkIfCanVote = function (voteCheck) {
            return new Promise((function (resolve) {
                _this._http.post("api/Comment/CheckVoteComment/", voteCheck)
                    .subscribe(function (response) {
                    var ok = response;
                    resolve(ok);
                });
            }));
        };
    }
    //Patches comment to the specified Post
    CommentsService.prototype.sendComment = function (postId, comment) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this._http.patch("api/Comment/PostComment/" + postId, comment)
                    .subscribe(function (response) {
                    _this.postsService.getPost(postId);
                    _this.sharedService.openSnackBarMessage("Comment added to Post", "Ok");
                    return true;
                }, function (error) {
                    console.log(error);
                    return false;
                });
                return [2 /*return*/, false];
            });
        });
    };
    //Sends upvote to service.
    //Note: While the object is updated on backend, a new one is not fetched
    //Just a visual update here on the frontend
    CommentsService.prototype.upvoteComment = function (comment, user) {
        return __awaiter(this, void 0, void 0, function () {
            var voteRecord, voteCode, votedComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.checkLogin()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        voteRecord = new UserCommentVote_1.UserCommentVote();
                        voteRecord.CommentId = comment.id;
                        voteRecord.Voted = 1;
                        voteRecord.UserId = user.id;
                        return [4 /*yield*/, this.checkIfCanVote(voteRecord)];
                    case 2:
                        voteCode = _a.sent();
                        if (voteCode >= 0) {
                            votedComment = new Comment_1.Comment();
                            //Fresh vote
                            if (voteCode == 0) {
                                votedComment.upvotes = 1;
                                comment.upvotes++;
                            }
                            //Annuling upvote
                            else if (voteCode == 1) {
                                votedComment.upvotes = -1;
                                voteRecord.Voted = 0;
                                comment.upvotes--;
                            }
                            //Changing downvote to upvote
                            else if (voteCode == 2) {
                                votedComment.upvotes = 1;
                                votedComment.downvotes = -1;
                                voteRecord.Voted = 1;
                                comment.upvotes++;
                                comment.downvotes--;
                            }
                            this.voteComment(comment.id, votedComment);
                            this.logVote(voteRecord);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        this.sharedService.openSnackBarMessage("Must be logged in to vote", "Ok");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //Sends downvote to service.
    //Note: While the object is updated on backend, a new one is not fetched
    //Just a visual update here on the frontend
    CommentsService.prototype.downvoteComment = function (comment, user) {
        return __awaiter(this, void 0, void 0, function () {
            var voteRecord, voteCode, votedComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sharedService.checkLogin()];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 3];
                        voteRecord = new UserCommentVote_1.UserCommentVote();
                        voteRecord.CommentId = comment.id;
                        voteRecord.Voted = -1;
                        voteRecord.UserId = user.id;
                        return [4 /*yield*/, this.checkIfCanVote(voteRecord)];
                    case 2:
                        voteCode = _a.sent();
                        if (voteCode >= 0) {
                            votedComment = new Comment_1.Comment();
                            //Fresh vote
                            if (voteCode == 0) {
                                votedComment.downvotes = 1;
                                comment.downvotes++;
                            }
                            //changing upvote to downvote
                            else if (voteCode == 1) {
                                votedComment.upvotes = -1;
                                votedComment.downvotes = 1;
                                comment.upvotes--;
                                comment.downvotes++;
                                voteRecord.Voted = -1;
                            }
                            //Annuling downvote
                            else if (voteCode == 2) {
                                votedComment.downvotes = -1;
                                comment.downvotes--;
                                voteRecord.Voted = 0;
                            }
                            this.voteComment(comment.id, votedComment);
                            this.logVote(voteRecord);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        this.sharedService.openSnackBarMessage("Must be logged in to vote", "Ok");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //Logs the vote so a user can't vote the same direction twice
    CommentsService.prototype.logVote = function (voteRecord) {
        this._http.post("api/Comment/LogVoteComment/", voteRecord)
            .subscribe(function (response) {
            console.log(response);
        });
    };
    //Votes on a comment, commentId is the comment being voted on. votedComment contains the change in vote
    CommentsService.prototype.voteComment = function (commentId, votedComment) {
        this._http.patch("api/Comment/VoteComment/" + commentId, votedComment)
            .subscribe(function (response) {
        });
    };
    CommentsService.prototype.reportComment = function (comment) {
        var commentReport = new CommentReport_1.CommentReport;
        commentReport.comment = comment;
        commentReport.lastReportDate = new Date().toJSON();
        commentReport.numberOfReports = 1;
        this.sendReport(commentReport);
    };
    CommentsService.prototype.sendReport = function (commentReport) {
        var _this = this;
        this._http.post("api/Comment/Report", commentReport)
            .subscribe(function (response) {
            _this.sharedService.openSnackBarMessage("Comment reported", "Ok");
        }, function (error) {
            console.log(error);
        });
    };
    CommentsService = __decorate([
        core_1.Injectable()
    ], CommentsService);
    return CommentsService;
}());
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map