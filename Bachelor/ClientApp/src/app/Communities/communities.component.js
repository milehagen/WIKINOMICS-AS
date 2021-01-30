"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunitiesComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Post_1 = require("../Models/Post");
var communities_shared_service_1 = require("./shared/communities-shared.service");
var CommunitiesComponent = /** @class */ (function () {
    function CommunitiesComponent(_http, fb, communitiesService) {
        this._http = _http;
        this.fb = fb;
        this.communitiesService = communitiesService;
        this.commentFieldToggle = [];
        this.postValidation = {
            textPost: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(20), forms_1.Validators.maxLength(1000)])
            ]
        };
        this.postForm = fb.group(this.postValidation);
    }
    CommunitiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.communitiesService.allCommunitiesCurrent.subscribe(function (communities) { return _this.allCommunities = communities; });
        this.communitiesService.topCommunitiesCurrent.subscribe(function (communities) { return _this.topCommunities = communities; });
        this.communitiesService.selectedCommunityCurrent.subscribe(function (community) { return _this.selectedCommunity = community; });
        this.communitiesService.allPostsCurrent.subscribe(function (posts) { return _this.allPosts = posts; });
        this.getCommunities();
        this.checkLogin();
        this.currentTime = new Date();
    };
    CommunitiesComponent.prototype.getCommunities = function () {
        this.communitiesService.getCommunities();
        console.log(this.allCommunities);
    };
    //checks if you logged in or already have a tempID, if not a temporary ID is generated.
    //This ID is used to keep track of you in threads and posts
    CommunitiesComponent.prototype.checkLogin = function () {
        this.loggedIn = false;
        var tempID = sessionStorage.getItem("tempID");
        if (tempID == null) {
            this.generateTempID();
        }
        return true;
    };
    //This ID is used to keep track of you in threads and posts
    CommunitiesComponent.prototype.generateTempID = function () {
        var tempID = "Anon";
        var date = Date.now();
        var randomNumberLarge = Math.floor(Math.random() * 1000) + 1;
        var randomNumberSmall = Math.floor(Math.random() * 9) + 1;
        var randomID = (date * randomNumberLarge) - randomNumberSmall * randomNumberLarge;
        tempID += randomID;
        sessionStorage.setItem("tempID", tempID);
        return true;
    };
    CommunitiesComponent.prototype.sendPost = function () {
        if (this.checkLogin()) {
            var post = new Post_1.Post();
            post.text = this.postForm.value.textPost;
            //post.community = this.communitiesService.selectedCommunity;
            post.date = new Date();
            if (!this.loggedIn) {
                post.userID = sessionStorage.getItem("tempID");
            }
            //Just temp, change later
            else {
                post.userID = this.user.firstname;
            }
            this.communitiesService.sendPost(post);
            /*
            this._http.post("api/Community/Publish", post, { responseType: 'text' })
              .subscribe(response => {
                if (response == "Post published") {
                  this.getPostsForCommunity(this.selectedCommunity);
                  this.openSnackBarMessage("Post was published in " + post.community.title, "Ok");
                }
              });
              */
        }
    };
    //Shows comment textarea and adds it to FormArray for validation
    CommunitiesComponent.prototype.createCommentField = function () {
        console.log("test");
    };
    CommunitiesComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './communities.component.html',
            providers: [communities_shared_service_1.CommunitiesService]
        })
    ], CommunitiesComponent);
    return CommunitiesComponent;
}());
exports.CommunitiesComponent = CommunitiesComponent;
//# sourceMappingURL=communities.component.js.map