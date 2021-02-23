"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var ReportsService = /** @class */ (function () {
    function ReportsService(_http) {
        var _this = this;
        this._http = _http;
        //Post Reports
        this.postReportsSource = new rxjs_1.BehaviorSubject([]);
        this.postReportsCurrent = this.postReportsSource.asObservable();
        //Comment Reports
        this.commentReportsSource = new rxjs_1.BehaviorSubject([]);
        this.commentReportsCurrent = this.commentReportsSource.asObservable();
        //THIS MAYBE SHOULD BE MOVED
        //Deletes posts
        this.deletePost = function (postId) {
            return new Promise((function (resolve) {
                _this._http.delete("api/post/delete/" + postId)
                    .subscribe(function (response) {
                    var ok = response;
                    resolve(ok);
                });
            }));
        };
        //Deletes posts
        this.deleteComment = function (commentId) {
            return new Promise((function (resolve) {
                _this._http.delete("api/comment/delete/" + commentId)
                    .subscribe(function (response) {
                    var ok = response;
                    resolve(ok);
                });
            }));
        };
    }
    ReportsService.prototype.changePostReports = function (reports) {
        this.postReportsSource.next(reports);
    };
    ReportsService.prototype.changeCommentReports = function (reports) {
        this.commentReportsSource.next(reports);
    };
    ReportsService.prototype.getPostReports = function () {
        var _this = this;
        this._http.get("api/admin/reports/PostReport/GetAll")
            .subscribe(function (data) {
            _this.changePostReports(data);
        });
    };
    ReportsService.prototype.deletePostReport = function (report) {
        this._http.delete("api/admin/reports/PostReport/Delete/" + report.id);
    };
    ReportsService.prototype.getCommentReports = function () {
        var _this = this;
        this._http.get("api/admin/reports/CommentReport/GetAll")
            .subscribe(function (data) {
            _this.changeCommentReports(data);
        });
    };
    ReportsService.prototype.deleteCommentReport = function (report) {
        this._http.delete("api/admin/reports/CommentReport/Delete/" + report.id);
    };
    ReportsService = __decorate([
        core_1.Injectable()
    ], ReportsService);
    return ReportsService;
}());
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map