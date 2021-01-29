"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsComponent = void 0;
var core_1 = require("@angular/core");
var PostsComponent = /** @class */ (function () {
    function PostsComponent(communitiesService) {
        this.communitiesService = communitiesService;
    }
    PostsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.communitiesService.currentMessage.subscribe(function (message) { return _this.message = message; });
    };
    PostsComponent.prototype.newMessage = function () {
        this.communitiesService.changeMessage("Hello from Post");
    };
    PostsComponent.prototype.checkMessage = function () {
        console.log(this.message);
    };
    PostsComponent = __decorate([
        core_1.Component({
            selector: 'post-component',
            templateUrl: './posts.component.html',
            providers: []
        })
    ], PostsComponent);
    return PostsComponent;
}());
exports.PostsComponent = PostsComponent;
//# sourceMappingURL=posts.component.js.map