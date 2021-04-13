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
    function TrendingComponent(_http, sharedService, router) {
        this._http = _http;
        this.sharedService = sharedService;
        this.router = router;
    }
    TrendingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sharedService.loggedInCurrent.subscribe(function (loggedIn) { return _this.loggedIn = loggedIn; });
        this.listIndustries();
        this.getTrendingPosts();
    };
    TrendingComponent.prototype.listIndustries = function () {
        var _this = this;
        this._http.get("api/Community/GetAllCommunities").subscribe(function (data) {
            _this.allCommunities = data;
        }, function (error) { return console.log(error); });
    };
    TrendingComponent.prototype.getTrendingPosts = function () {
        var _this = this;
        this._http.get("api/Post/GetTrending").subscribe(function (data) {
            _this.trendingPosts = data;
        }, function (error) { return console.log(error); });
    };
    TrendingComponent.prototype.noRouting = function (e) {
        e.stopPropagation();
    };
    TrendingComponent.prototype.navigate = function (value) {
        var _this = this;
        console.log(value);
        this._http.get("api/Community/GetAllCommunities").subscribe(function (data) {
            _this.allCommunities = data;
        }, function (error) { return console.log(error); });
        var findCommunity = this.allCommunities.find(function (_a) {
            var title = _a.title;
            return title === value;
        });
        var selectedCommunityId = findCommunity.id;
        this.router.navigateByUrl("/communities/" + selectedCommunityId);
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