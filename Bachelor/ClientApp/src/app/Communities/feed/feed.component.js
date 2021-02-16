"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedComponent = void 0;
var Community_1 = require("../../Models/Communities/Community");
var Post_1 = require("../../Models/Communities/Post");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
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
        //Subscribe to things we need from services
        this.sharedService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.communitiesService.selectedCommunityCurrent.subscribe(function (community) { return _this.selectedCommunity = community; });
        this.communitiesService.allCommunitiesCurrent.subscribe(function (communities) { return _this.allCommunities = communities; });
        this.postsService.allPostTagsCurrent.subscribe(function (postTag) { return _this.allPostTags = postTag; });
        this.postsService.allPostsCurrent.subscribe(function (posts) { return _this.allPosts = posts; });
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
            if (_this.allPostTags.length <= 0) {
                _this.postsService.getPostTags();
            }
            _this.postsService.getPostsForCommunity(_this.communityId);
        });
    };
    FeedComponent.prototype.changeOrderByValue = function ($event) {
        this.orderByValue = $event;
    };
    FeedComponent.prototype.changeSelectedPost = function (post) {
        this.postsService.changeSelectedPost(post);
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
            post.user = this.user;
            if (this.usePostTag) {
                post.postTag = this.postForm.value.postTagField;
            }
            //If its a success
            if (this.postsService.sendPost(post)) {
                this.postForm.patchValue({ textPost: "" });
            }
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