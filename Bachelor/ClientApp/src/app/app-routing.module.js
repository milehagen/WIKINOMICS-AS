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
var signup_component_1 = require("./Users/signUp/signup.component");
var home_component_1 = require("./home/home.component");
var communities_component_1 = require("./Communities/communities.component");
var logIn_component_1 = require("./Users/logIn/logIn.component");
var feedPage_component_1 = require("./Communities/feed/feedPage.component");
var posts_component_1 = require("./Communities/posts/posts.component");
var admin_component_1 = require("./Admin/admin.component");
var reports_component_1 = require("./Admin/Reports/reports.component");
var settings_component_1 = require("./Admin/Settings/settings.component");
var domains_component_1 = require("./Admin/Domains/domains.component");
var profile_component_1 = require("./Profile/profile.component");
var trendingPost_component_1 = require("./home/post/trendingPost.component");
var trending_component_1 = require("./home/trending/trending.component");
var all_component_1 = require("./Communities/feed/all/all.component");
var Erfaring_component_1 = require("./Users/Erfaring/Erfaring.component");
var personalFeed_component_1 = require("./Communities/feed/personalFeed/personalFeed.component");
var verification_receiver_component_1 = require("./Verification/verification-receiver.component");
var profileCommunities_component_1 = require("./Profile/communities/profileCommunities.component");
var profileExperience_component_1 = require("./Profile/experience/profileExperience.component");
var profileNotifications_component_1 = require("./Profile/notifications/profileNotifications.component");
var profileHome_component_1 = require("./Profile/home/profileHome.component");
var routes = [
    {
        path: '',
        redirectTo: 'home',
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
        component: home_component_1.HomeComponent,
        children: [
            { path: '', component: trending_component_1.TrendingComponent },
            { path: 'post/:postId', component: trendingPost_component_1.TrendingPostsComponent }
        ]
    },
    {
        path: 'communities',
        component: communities_component_1.CommunitiesComponent,
        children: [
            { path: 'all', component: all_component_1.AllComponent },
            { path: 'your', component: personalFeed_component_1.PersonalFeedComponent },
            { path: ':communityId', component: feedPage_component_1.FeedPageComponent },
            { path: ':communityId/post/:postId', component: posts_component_1.PostsComponent }
        ]
    },
    {
        path: 'logIn',
        component: logIn_component_1.LogInComponent
    },
    {
        path: 'logIn/signUp',
        component: signup_component_1.SignUpComponent
    },
    {
        path: 'erfaring',
        component: Erfaring_component_1.ErfaringComponent
    },
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: profileHome_component_1.ProfileHomeComponent },
            { path: 'communities', component: profileCommunities_component_1.ProfileCommunitiesComponent },
            { path: 'experience', component: profileExperience_component_1.ProfileExperienceComponent },
            { path: 'notifications', component: profileNotifications_component_1.ProfileNotificationsComponent }
        ]
    },
    {
        path: 'verify',
        component: verification_receiver_component_1.VerificationReceiverComponent
    },
    {
        path: 'admin',
        component: admin_component_1.AdminComponent,
        children: [
            { path: 'reports', component: reports_component_1.ReportsComponent },
            { path: 'settings', component: settings_component_1.SettingsComponent },
            { path: 'domains', component: domains_component_1.DomainsComponent }
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