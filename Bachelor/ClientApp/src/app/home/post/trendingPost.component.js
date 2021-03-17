"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrendingPostsComponent = void 0;
var core_1 = require("@angular/core");
var Post_1 = require("../../Models/Communities/Post");
var TrendingPostsComponent = /** @class */ (function () {
    function TrendingPostsComponent(_http) {
        this._http = _http;
        this.selectedPost = new Post_1.Post();
    }
    TrendingPostsComponent.prototype.ngOnInit = function () {
        this.getTrendingPosts();
    };
    TrendingPostsComponent.prototype.getTrendingPosts = function () {
        var _this = this;
        this._http.get("api/Post/GetTrending").subscribe(function (data) {
            _this.trendingPosts = data;
        }, function (error) { return console.log(error); });
    };
    TrendingPostsComponent = __decorate([
        core_1.Component({
            selector: 'trending-trendingPosts',
            templateUrl: './trendingPost.component.html',
            styleUrls: ['./trendingPost.component.css'],
        })
    ], TrendingPostsComponent);
    return TrendingPostsComponent;
}());
exports.TrendingPostsComponent = TrendingPostsComponent;
//# sourceMappingURL=trendingPost.component.js.map