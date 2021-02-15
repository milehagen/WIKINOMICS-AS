"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedSettings = void 0;
var core_1 = require("@angular/core");
var FeedSettings = /** @class */ (function () {
    function FeedSettings(postsService) {
        this.postsService = postsService;
        this.orderByValueEmitter = new core_1.EventEmitter();
        //this.scoredAllPost = this.allPosts.map(post => {
        //const scoreDifference = (post.upvotes - post.downvotes);
        //return scoreDifference
        //});
    }
    FeedSettings.prototype.ngOnInit = function () {
        this.orderByValue = "-date";
        this.emitChange();
        //this.postsService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
        //this.findPostScoreDifference();
    };
    FeedSettings.prototype.orderByDate = function () {
        if (this.orderByValue == "-date") {
            this.orderByValue = "date";
        }
        else {
            this.orderByValue = "-date";
        }
        this.emitChange();
    };
    FeedSettings.prototype.orderByScore = function () {
        var diff = "['-downvotes', 'upvotes']";
        if (this.orderByValue == "'-downvotes', 'upvotes'") {
            this.orderByValue = "'-upvotes', 'downvotes'";
        }
        else {
            this.orderByValue = "'-downvotes', 'upvotes'";
        }
        //this.orderByValue = diff;
        this.emitChange();
    };
    FeedSettings.prototype.orderByComments = function () {
        if (this.orderByValue == "-comments.date") {
            this.orderByValue = "comments.date";
        }
        else {
            this.orderByValue = "-comments.date";
        }
        this.emitChange();
    };
    FeedSettings.prototype.changeValue = function () {
        this.orderByValue = "Different Value";
        this.emitChange();
    };
    FeedSettings.prototype.emitChange = function () {
        this.orderByValueEmitter.emit(this.orderByValue);
    };
    __decorate([
        core_1.Output()
    ], FeedSettings.prototype, "orderByValueEmitter", void 0);
    FeedSettings = __decorate([
        core_1.Component({
            selector: 'feed-settings',
            template: "<b>These buttons don't work atm</b><br />\n    Order by:\n    <button (click)=\"orderByDate()\">Date</button>\n    <button (click)=\"orderByComments()\">Comments</button>\n    <button (click)=\"orderByScore()\">Score</button><br />\n    {{orderByValue}}",
            providers: []
        })
    ], FeedSettings);
    return FeedSettings;
}());
exports.FeedSettings = FeedSettings;
//# sourceMappingURL=feedSettings.component.js.map