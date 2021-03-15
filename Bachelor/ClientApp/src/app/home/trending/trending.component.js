"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrendingComponent = void 0;
var core_1 = require("@angular/core");
var TrendingComponent = /** @class */ (function () {
    function TrendingComponent(_http) {
        this._http = _http;
    }
    TrendingComponent.prototype.ngOnInit = function () {
        this.listIndustries();
        this.getCommunity();
        this.getTrendingPosts();
    };
    TrendingComponent.prototype.listIndustries = function () {
        var _this = this;
        this._http.get("api/User/GetAllIndustries").subscribe(function (data) {
            _this.allIndustries = data;
        }, function (error) { return console.log(error); });
    };
    TrendingComponent.prototype.getCommunity = function () {
        var _this = this;
        this._http.get("api/Community/GetAllCommunities").subscribe(function (data) {
            _this.allCommunities = data;
        }, function (error) { return console.log(error); });
    };
    TrendingComponent.prototype.getRandomColor = function () {
        var green = "rgb(35,121,120)";
        var blue = "rgb(86,172,246)";
        var red = "rgb(214,0,0)";
        var orange = "rgb(252,119,80)";
        var yellow = "rgb(249,220,74)";
        var colors = [green, blue, red, orange, yellow];
        var randomColor = colors[Math.floor(Math.random() * colors.length)];
        return randomColor;
    };
    TrendingComponent.prototype.getAllPosts = function (allCommunities) {
    };
    TrendingComponent.prototype.scrollLeft = function () {
        this.widgetsContent.nativeElement.scrollLeft -= 750;
    };
    TrendingComponent.prototype.scrollRight = function () {
        this.widgetsContent.nativeElement.scrollLeft += 750;
    };
    TrendingComponent.prototype.getTrendingPosts = function () {
        var _this = this;
        this._http.get("api/Post/GetTrending").subscribe(function (data) {
            _this.trendingPosts = data;
        }, function (error) { return console.log(error); });
    };
    __decorate([
        core_1.ViewChild('widgetsContent', { static: false })
    ], TrendingComponent.prototype, "widgetsContent", void 0);
    TrendingComponent = __decorate([
        core_1.Component({
            selector: 'trending-posts',
            templateUrl: './trending.component.html',
            styleUrls: ['./trending.component.css'],
        })
    ], TrendingComponent);
    return TrendingComponent;
}());
exports.TrendingComponent = TrendingComponent;
//# sourceMappingURL=trending.component.js.map