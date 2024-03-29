"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunitiesService = void 0;
var Community_1 = require("../../../Models/Communities/Community");
var rxjs_1 = require("rxjs");
var core_1 = require("@angular/core");
var CommunitiesService = /** @class */ (function () {
    function CommunitiesService(_http, sharedService) {
        var _this = this;
        this._http = _http;
        this.sharedService = sharedService;
        //List of all communities
        this.allCommunitiesSource = new rxjs_1.BehaviorSubject([]);
        this.allCommunitiesCurrent = this.allCommunitiesSource.asObservable();
        this.rootCommunitiesSource = new rxjs_1.BehaviorSubject([]);
        this.rootCommunitiesCurrent = this.rootCommunitiesSource.asObservable();
        //Current top communities shown on the side
        this.topCommunitiesSource = new rxjs_1.BehaviorSubject([]);
        this.topCommunitiesCurrent = this.topCommunitiesSource.asObservable();
        //The community the user currently has selected
        this.selectedCommunitySource = new rxjs_1.BehaviorSubject(new Community_1.Community());
        this.selectedCommunityCurrent = this.selectedCommunitySource.asObservable();
        this.subscribe = function (community, user) {
            return new Promise((function (resolve) {
                _this._http.patch("api/User/Subscribe/" + user.id, community)
                    .subscribe(function (response) {
                    resolve(true);
                }, function (error) {
                    resolve(false);
                });
            }));
        };
        this.unsubscribe = function (community, user) {
            return new Promise((function (resolve) {
                _this._http.patch("api/User/Unsubscribe/" + user.id, community)
                    .subscribe(function (response) {
                    resolve(true);
                }, function (error) {
                    resolve(false);
                });
            }));
        };
    }
    CommunitiesService.prototype.changeAllCommunities = function (communities) {
        this.allCommunitiesSource.next(communities);
    };
    CommunitiesService.prototype.changeRootCommunities = function (communities) {
        this.rootCommunitiesSource.next(communities);
    };
    CommunitiesService.prototype.changeTopCommunities = function (communities) {
        this.topCommunitiesSource.next(communities);
    };
    CommunitiesService.prototype.changeSelectedCommunity = function (community) {
        this.selectedCommunitySource.next(community);
    };
    //Gets all communites and adds data to correct variabels
    CommunitiesService.prototype.getCommunities = function () {
        var _this = this;
        this._http.get("api/Community/GetAllCommunities")
            .subscribe(function (data) {
            _this.changeAllCommunities(data);
            _this.changeTopCommunities(data);
            _this.changeSelectedCommunity(_this.selectedCommunityCurrent[0]);
        }, function (error) { return console.log(error); });
    };
    //Get communities by a spesific "level"
    //Root communities has a level = 0, sub-communities of a root has level = 1, and so on...
    CommunitiesService.prototype.getRootCommunities = function (level) {
        var _this = this;
        this._http.get("api/Community/GetCommunitiesByLevel/" + level)
            .subscribe(function (data) {
            _this.changeRootCommunities(data);
        }, function (error) { return console.log(error); });
    };
    CommunitiesService.prototype.getCommunity = function (communityId) {
        var _this = this;
        this._http.get("api/Community/GetCommunity/" + communityId)
            .subscribe(function (data) {
            _this.changeSelectedCommunity(data);
        }, function (error) { return console.log(error); });
    };
    CommunitiesService = __decorate([
        core_1.Injectable()
    ], CommunitiesService);
    return CommunitiesService;
}());
exports.CommunitiesService = CommunitiesService;
//# sourceMappingURL=communities.service.js.map