"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedComponent = void 0;
var core_1 = require("@angular/core");
var FeedComponent = /** @class */ (function () {
    function FeedComponent(communitiesService) {
        this.communitiesService = communitiesService;
    }
    //Start up
    FeedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.communitiesService.currentMessage.subscribe(function (message) { return _this.message = message; });
        this.communitiesService.allCommunitiesCurrent.subscribe(function (communities) { return _this.allCommunities = communities; });
        this.communitiesService.allPostsCurrent.subscribe(function (posts) { return _this.allPosts = posts; });
    };
    //After Start up
    FeedComponent.prototype.ngAfterViewInit = function () {
        console.log(this.allCommunities);
        //this.communitiesService.getPostsForCommunity(this.allCommunities[0]);
    };
    FeedComponent.prototype.newMessage = function () {
        this.communitiesService.changeMessage("Hello from Feed");
    };
    FeedComponent.prototype.getCommunities = function () {
        this.communitiesService.getCommunities();
        console.log(this.allCommunities);
    };
    FeedComponent.prototype.checkMessage = function () {
        console.log(this.message);
    };
    FeedComponent = __decorate([
        core_1.Component({
            selector: 'feed-component',
            templateUrl: './feed.component.html',
            providers: []
        })
    ], FeedComponent);
    return FeedComponent;
}());
exports.FeedComponent = FeedComponent;
//# sourceMappingURL=feed.component.js.map