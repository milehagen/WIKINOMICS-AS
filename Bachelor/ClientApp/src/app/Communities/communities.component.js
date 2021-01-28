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
var snack_bar_1 = require("@angular/material/snack-bar");
var Post_1 = require("../Models/Post");
var CommunitiesComponent = /** @class */ (function () {
    /*
    commentValidation = {
      textComments: this.fb.array([
        this.fb.control('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(250)]))
      ])
    }*/
    function CommunitiesComponent(_http, fb, _snackBar) {
        this._http = _http;
        this.fb = fb;
        this._snackBar = _snackBar;
        this.commentFieldToggle = [];
        this.commentForm = new forms_1.FormGroup({
            textComments: new forms_1.FormArray([
                new forms_1.FormControl(''),
                new forms_1.FormControl(''),
                new forms_1.FormControl(''),
                new forms_1.FormControl(''),
            ])
        });
        this.postValidation = {
            textPost: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(20), forms_1.Validators.maxLength(1000)])
            ]
        };
        this.postForm = fb.group(this.postValidation);
        //this.commentForm = this.fb.group(this.commentValidation);
    }
    Object.defineProperty(CommunitiesComponent.prototype, "textComments", {
        get: function () {
            return this.commentForm.get('textComments');
        },
        enumerable: false,
        configurable: true
    });
    CommunitiesComponent.prototype.ngOnInit = function () {
        this.getCommunities();
        this.checkLogin();
        this.currentTime = new Date();
    };
    //Adds new form checking for comments under posts
    CommunitiesComponent.prototype.addCommentForm = function (index) {
        console.log("Index: " + index);
        this.textComments.insert(2, new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(8), forms_1.Validators.maxLength(250)])));
        console.log(this.textComments);
        this.commentFieldToggle[index] = true;
    };
    //Gets all communities from backend
    CommunitiesComponent.prototype.getCommunities = function () {
        var _this = this;
        this._http.get("api/Community/GetAllCommunities")
            .subscribe(function (data) {
            _this.allCommunities = data;
            _this.topCommunities = data;
            _this.selectedCommunity = _this.allCommunities[0];
            _this.getPostsForCommunity(_this.selectedCommunity);
        }, function (error) { return console.log(error); });
    };
    //When user selects new community
    CommunitiesComponent.prototype.selectCommunity = function (community) {
        this.selectedCommunity = community;
        this.getPostsForCommunity(community);
    };
    CommunitiesComponent.prototype.expandPost = function (post) {
        console.log("Post with ID " + post.id);
    };
    //Gets posts for selected community
    CommunitiesComponent.prototype.getPostsForCommunity = function (community) {
        var _this = this;
        this._http.get("api/Community/GetPostsFromCommunity/" + community.id)
            .subscribe(function (data) {
            _this.communityPosts = data;
            _this.makeCommentFormArray(_this.communityPosts.length);
        }, function (error) { return console.log(error); });
    };
    CommunitiesComponent.prototype.makeCommentFormArray = function (length) {
        for (var i = 0; i < length; i++) {
            this.commentFieldToggle.push(false);
        }
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
        var _this = this;
        if (this.checkLogin()) {
            var post = new Post_1.Post();
            post.text = this.postForm.value.textPost;
            post.community = this.selectedCommunity;
            post.date = new Date();
            if (!this.loggedIn) {
                post.userID = sessionStorage.getItem("tempID");
            }
            //Just temp, change later
            else {
                post.userID = this.user.firstname;
            }
            this._http.post("api/Community/Publish", post, { responseType: 'text' })
                .subscribe(function (response) {
                if (response == "Post published") {
                    _this.getPostsForCommunity(_this.selectedCommunity);
                    _this.openSnackBarMessage("Post was published in " + post.community.title, "Ok");
                }
            });
        }
    };
    //Shows comment textarea and adds it to FormArray for validation
    CommunitiesComponent.prototype.createCommentField = function () {
        console.log("test");
    };
    //Opens a little dialog
    CommunitiesComponent.prototype.openSnackBarMessage = function (message, action) {
        var config = new snack_bar_1.MatSnackBarConfig();
        config.horizontalPosition = "center";
        config.verticalPosition = "bottom";
        config.duration = 6000;
        this._snackBar.open(message, action, config);
    };
    CommunitiesComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './communities.component.html',
        })
    ], CommunitiesComponent);
    return CommunitiesComponent;
}());
exports.CommunitiesComponent = CommunitiesComponent;
//# sourceMappingURL=communities.component.js.map