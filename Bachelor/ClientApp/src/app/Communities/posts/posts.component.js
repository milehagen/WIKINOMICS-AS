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
var forms_1 = require("@angular/forms");
var PostsComponent = /** @class */ (function () {
    function PostsComponent(communitiesService, route, router, fb, _location) {
        this.communitiesService = communitiesService;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this._location = _location;
        this.commentValidation = {
            textComment: [
                null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(20), forms_1.Validators.maxLength(500)])
            ]
        };
        this.commentForm = fb.group(this.commentValidation);
    }
    //Subscribes to URL parameter and what post is currently selected
    PostsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            _this.postId = +params.get('postId');
            _this.communitiesService.getPost(_this.postId);
        });
        this.communitiesService.selectedPostCurrent.subscribe(function (post) { return _this.selectedPost = post; });
    };
    PostsComponent.prototype.seePost = function () {
        console.log("Post ID: " + this.postId);
        console.log(this.selectedPost);
    };
    PostsComponent.prototype.seeCommentText = function () {
        console.log(this.commentForm.value.textComment);
    };
    //Sends you back to last page
    PostsComponent.prototype.goBack = function () {
        this._location.back();
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