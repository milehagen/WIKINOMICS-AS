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
var CommunitiesService = /** @class */ (function () {
    function CommunitiesService(_http, _snackBar) {
        //this.allCommunities = new Array<Community>();
        //this.observableAllCommunities = <BehaviorSubject<Community[]>>new BehaviorSubject([]);
        this._http = _http;
        this._snackBar = _snackBar;
        this.allCommunitiesSource = new rxjs_1.BehaviorSubject([]); //List of all communities
        this.allCommunitiesCurrent = this.allCommunitiesSource.asObservable();
        this.topCommunitiesSource = new rxjs_1.BehaviorSubject([]); //Current top communities shown on the side
        this.topCommunitiesCurrent = this.topCommunitiesSource.asObservable();
        this.selectedCommunitySource = new rxjs_1.BehaviorSubject(new Community_1.Community()); //The community the user currently has selected
        this.selectedCommunityCurrent = this.selectedCommunitySource.asObservable();
        this.allPostsSource = new rxjs_1.BehaviorSubject([]); //Posts from selected community
        this.allPostsCurrent = this.allPostsSource.asObservable();
        this.messageSource = new rxjs_1.BehaviorSubject("Default Message");
        this.currentMessage = this.messageSource.asObservable();
        //this.topCommunities = new Array<Community>();
        //this.observableTopCommunities = <BehaviorSubject<Community[]>>new BehaviorSubject([]);
        //this.selectedCommunity = new Community();
        //this.observableSelectedCommunity = <BehaviorSubject<Community>>new BehaviorSubject(new Community());
        //this.communityPosts = new Array<Post>();
        //this.observableCommunityPosts = <BehaviorSubject<Post[]>>new BehaviorSubject([]);
    }
    CommunitiesService.prototype.changeMessage = function (message) {
        this.messageSource.next(message);
        console.log(this.currentMessage);
    };
    CommunitiesService.prototype.changeAllCommunities = function (communities) {
        this.allCommunitiesSource.next(communities);
    };
    CommunitiesService.prototype.changeTopCommunities = function (communities) {
        this.topCommunitiesSource.next(communities);
    };
    CommunitiesService.prototype.changeSelectedCommunity = function (community) {
        this.selectedCommunitySource.next(community);
    };
    CommunitiesService.prototype.changeAllPosts = function (post) {
        this.allPostsSource.next(post);
    };
    /*
    getPostsObservable(community: Community) {
      this.allPostsObservable = this._http.get<Post[]>("api/Community/GetPostsFromCommunity/" + community.id)
    }*/
    CommunitiesService.prototype.getCommunities = function () {
        var _this = this;
        this._http.get("api/Community/GetAllCommunities")
            .subscribe(function (data) {
            _this.changeAllCommunities(data);
            _this.changeTopCommunities(data);
            _this.changeSelectedCommunity(_this.selectedCommunityCurrent[0]);
            _this.changeAllPosts(_this.selectedCommunityCurrent[0]);
            //this.allCommunities = data;
            //this.topCommunities = data;
            //this.selectedCommunity = this.allCommunities[0];
            //this.getPostsForCommunity(this.selectedCommunity);
            //this.getPostsObservable(this.selectedCommunity);
        }, function (error) { return console.log(error); });
    };
    CommunitiesService.prototype.getPostsForCommunity = function (community) {
        var _this = this;
        this._http.get("api/Community/GetPostsFromCommunity/" + community.id)
            .subscribe(function (data) {
            _this.changeAllPosts(data);
            //this.communityPosts = data;
        }, function (error) { return console.log(error); });
    };
    CommunitiesService.prototype.selectCommunity = function (community) {
        this.changeSelectedCommunity(community);
        this.getPostsForCommunity(community);
    };
    CommunitiesService.prototype.sendPost = function (post) {
        var _this = this;
        this._http.post("api/Community/Publish", post, { responseType: 'text' })
            .subscribe(function (response) {
            if (response == "Post published") {
                //this.getPostsForCommunity(this.selectedCommunity);
                _this.openSnackBarMessage("Post was published in " + post.community.title, "Ok");
            }
        });
    };
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