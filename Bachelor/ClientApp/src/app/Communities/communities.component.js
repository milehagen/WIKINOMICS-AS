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
var comments_service_1 = require("./shared/comments/comments.service");
var posts_service_1 = require("./shared/posts/posts.service");
var shared_service_1 = require("./shared/shared.service");
var communities_service_1 = require("./shared/communities/communities.service");
var CommunitiesComponent = /** @class */ (function () {
    function CommunitiesComponent(_http, fb, sharedService, communitiesService, commentsService, postsService) {
        this._http = _http;
        this.fb = fb;
        this.sharedService = sharedService;
        this.communitiesService = communitiesService;
        this.commentsService = commentsService;
        this.postsService = postsService;
        this.postValidation = {
            textPost: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(20), forms_1.Validators.maxLength(1000)])
            ]
        };
        this.postForm = fb.group(this.postValidation);
    }
    CommunitiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sharedService.userCurrent.subscribe(function (user) { return _this.user = user; });
        this.communitiesService.allCommunitiesCurrent.subscribe(function (communities) { return _this.allCommunities = communities; });
        this.communitiesService.topCommunitiesCurrent.subscribe(function (communities) { return _this.topCommunities = communities; });
        this.communitiesService.selectedCommunityCurrent.subscribe(function (community) { return _this.selectedCommunity = community; });
        this.communitiesService.getCommunities();
        this.sharedService.getUser(5);
        this.sharedService.checkLogin();
    };
    CommunitiesComponent.prototype.changeSelectedCommunity = function (community) {
        this.communitiesService.changeSelectedCommunity(community);
        if (this.loggedIn) {
            console.log("sup");
        }
    };
    CommunitiesComponent.prototype.checkUser = function () {
        console.log(this.user);
    };
    CommunitiesComponent.prototype.checkToken = function () {
    };
    CommunitiesComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './communities.component.html',
            styleUrls: ['./CommunitiesStyle.css'],
            providers: [shared_service_1.SharedService, comments_service_1.CommentsService, communities_service_1.CommunitiesService, posts_service_1.PostsService]
        })
    ], CommunitiesComponent);
    return CommunitiesComponent;
}());
exports.CommunitiesComponent = CommunitiesComponent;
//# sourceMappingURL=communities.component.js.map