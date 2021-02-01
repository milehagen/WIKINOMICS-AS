"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunitiesService = void 0;
var core_1 = require("@angular/core");
var snack_bar_1 = require("@angular/material/snack-bar");
var rxjs_1 = require("rxjs");
var Community_1 = require("../../Models/Community");
var Post_1 = require("../../Models/Post");
var CommunitiesService = /** @class */ (function () {
    function CommunitiesService(_http, _snackBar) {
        this._http = _http;
        this._snackBar = _snackBar;
        //List of all communities
        this.allCommunitiesSource = new rxjs_1.BehaviorSubject([]);
        this.allCommunitiesCurrent = this.allCommunitiesSource.asObservable();
        //Current top communities shown on the side
        this.topCommunitiesSource = new rxjs_1.BehaviorSubject([]);
        this.topCommunitiesCurrent = this.topCommunitiesSource.asObservable();
        //The community the user currently has selected
        this.selectedCommunitySource = new rxjs_1.BehaviorSubject(new Community_1.Community());
        this.selectedCommunityCurrent = this.selectedCommunitySource.asObservable();
        //Posts from selected community
        this.allPostsSource = new rxjs_1.BehaviorSubject([]);
        this.allPostsCurrent = this.allPostsSource.asObservable();
        //The post the user is viewing
        this.selectedPostSource = new rxjs_1.BehaviorSubject(new Post_1.Post());
        this.selectedPostCurrent = this.selectedPostSource.asObservable();
    }
    CommunitiesService.prototype.changeAllCommunities = function (communities) {
        this.allCommunitiesSource.next(communities);
    };
    CommunitiesService.prototype.changeTopCommunities = function (communities) {
        this.topCommunitiesSource.next(communities);
    };
    CommunitiesService.prototype.changeSelectedCommunity = function (community) {
        this.selectedCommunitySource.next(community);
    };
    CommunitiesService.prototype.changeAllPosts = function (posts) {
        this.allPostsSource.next(posts);
    };
    CommunitiesService.prototype.changeSelectedPost = function (post) {
        this.selectedPostSource.next(post);
    };
    CommunitiesService.prototype.getCommunities = function () {
        var _this = this;
        this._http.get("api/Community/GetAllCommunities")
            .subscribe(function (data) {
            _this.changeAllCommunities(data);
            _this.changeTopCommunities(data);
            _this.changeSelectedCommunity(_this.selectedCommunityCurrent[0]);
            _this.changeAllPosts(_this.selectedCommunityCurrent[0]);
        }, function (error) { return console.log(error); });
    };
    CommunitiesService.prototype.getPostsForCommunity = function (community) {
        var _this = this;
        this._http.get("api/Community/GetPostsFromCommunity/" + community.id)
            .subscribe(function (data) {
            _this.changeAllPosts(data);
        }, function (error) { return console.log(error); });
    };
    CommunitiesService.prototype.getPostsForCommunityId = function (Id) {
        var _this = this;
        this._http.get("api/Community/GetPostsFromCommunity/" + Id)
            .subscribe(function (data) {
            _this.changeAllPosts(data);
        }, function (error) { return console.log(error); });
    };
    CommunitiesService.prototype.getPost = function (Id) {
        var _this = this;
        this._http.get("api/Community/GetPost/" + Id)
            .subscribe(function (data) {
            _this.changeSelectedPost(data);
        }, function (error) { return console.log(error); });
    };
    //Posts post to Community
    //Updates post from community and shows a snackbar if succesful
    CommunitiesService.prototype.sendPost = function (post) {
        var _this = this;
        this._http.post("api/Community/Publish", post, { responseType: 'text' })
            .subscribe(function (response) {
            if (response == "Post published") {
                _this.getPostsForCommunity(post.community);
                _this.openSnackBarMessage("Post was published in " + post.community.title, "Ok");
            }
        });
    };
    //Patches comment to the specified Post
    CommunitiesService.prototype.sendComment = function (postId, comment) {
        var _this = this;
        this._http.patch("api/Community/PostComment/" + postId, comment, { responseType: 'text' })
            .subscribe(function (response) {
            _this.getPost(postId);
            _this.openSnackBarMessage("Comment added to Post #" + comment.post.id, "Ok");
        });
    };
    //Generates a semi random ID for guest users, stored in session
    CommunitiesService.prototype.generateTempID = function () {
        var tempID = "Anon";
        var date = Date.now();
        var randomNumberLarge = Math.floor(Math.random() * 1000) + 1;
        var randomNumberSmall = Math.floor(Math.random() * 9) + 1;
        var randomID = (date * randomNumberLarge) - randomNumberSmall * randomNumberLarge;
        tempID += randomID;
        sessionStorage.setItem("tempID", tempID);
        return true;
    };
    //checks if you logged in or already have a tempID, if not a temporary ID is generated.
    //This ID is used to keep track of you in threads and posts
    CommunitiesService.prototype.checkLogin = function () {
        this.loggedIn = false;
        var tempID = sessionStorage.getItem("tempID");
        if (tempID == null) {
            this.generateTempID();
        }
        return true;
    };
    //Opens a notification at the bottom of the page
    CommunitiesService.prototype.openSnackBarMessage = function (message, action) {
        var config = new snack_bar_1.MatSnackBarConfig();
        config.horizontalPosition = "center";
        config.verticalPosition = "bottom";
        config.duration = 6000;
        this._snackBar.open(message, action, config);
    };
    CommunitiesService = __decorate([
        core_1.Injectable()
    ], CommunitiesService);
    return CommunitiesService;
}());
exports.CommunitiesService = CommunitiesService;
//# sourceMappingURL=communities-shared.service.js.map