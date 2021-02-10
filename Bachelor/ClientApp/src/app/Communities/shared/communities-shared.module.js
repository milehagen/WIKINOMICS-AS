"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var shared_service_1 = require("./shared.service");
var comments_service_1 = require("./comments/comments.service");
var communities_service_1 = require("./communities/communities.service");
var Posts_service_1 = require("./Posts/Posts.service");
var communities_component_1 = require("../communities.component");
var posts_component_1 = require("../posts/posts.component");
var feed_component_1 = require("../feed/feed.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule],
            declarations: [
                communities_component_1.CommunitiesComponent,
                posts_component_1.PostsComponent,
                feed_component_1.FeedComponent
            ],
            providers: [shared_service_1.SharedService, comments_service_1.CommentsService, communities_service_1.CommunitiesService, Posts_service_1.PostsService],
            exports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                communities_component_1.CommunitiesComponent,
                posts_component_1.PostsComponent,
                feed_component_1.FeedComponent
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
//# sourceMappingURL=communities-shared.module.js.map