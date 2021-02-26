"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var signup_component_1 = require("./signUp/signup.component");
var home_component_1 = require("./home/home.component");
var communities_component_1 = require("./Communities/communities.component");
var logIn_component_1 = require("./logIn/logIn.component");
var feed_component_1 = require("./Communities/feed/feed.component");
var posts_component_1 = require("./Communities/posts/posts.component");
var admin_component_1 = require("./Admin/admin.component");
var reports_component_1 = require("./Admin/Reports/reports.component");
var settings_component_1 = require("./Admin/Settings/settings.component");
var routes = [
    {
        path: '',
        redirectTo: 'signUp',
        pathMatch: 'full'
    },
    {
        path: 'app',
        component: app_component_1.AppComponent
    },
    {
        path: 'signUp',
        component: signup_component_1.SignUpComponent
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent
    },
    {
        path: 'communities',
        component: communities_component_1.CommunitiesComponent,
        children: [
            { path: ':communityId', component: feed_component_1.FeedComponent },
            { path: ':communityId/post/:postId', component: posts_component_1.PostsComponent }
        ]
    },
    {
        path: 'logIn',
        component: logIn_component_1.LogInComponent
    },
    {
        path: 'admin',
        component: admin_component_1.AdminComponent,
        children: [
            { path: 'reports', component: reports_component_1.ReportsComponent },
            { path: 'settings', component: settings_component_1.SettingsComponent }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map