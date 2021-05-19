"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var animations_1 = require("@angular/platform-browser/animations");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var ngx_pipes_1 = require("ngx-pipes");
var date_ago_pipe_1 = require("./pipes/date-ago.pipe");
var app_component_1 = require("./app.component");
var signup_component_1 = require("./Users/signUp/signup.component");
var home_component_1 = require("./home/home.component");
var trending_component_1 = require("./home/trending/trending.component");
var app_routing_module_1 = require("./app-routing.module");
var communities_component_1 = require("./Communities/communities.component");
var posts_component_1 = require("./Communities/posts/posts.component");
var feedPage_component_1 = require("./Communities/feed/feedPage.component");
var feed_component_1 = require("./Communities/feed/feed.component");
var admin_component_1 = require("./Admin/admin.component");
var reports_component_1 = require("./Admin/Reports/reports.component");
var domains_component_1 = require("./Admin/Domains/domains.component");
var navbar_component_1 = require("./navbar/navbar.component");
var settings_component_1 = require("./Admin/Settings/settings.component");
var logIn_component_1 = require("./Users/logIn/logIn.component");
var profile_component_1 = require("./Profile/profile.component");
var profileHome_component_1 = require("./Profile/home/profileHome.component");
var profileCommunities_component_1 = require("./Profile/communities/profileCommunities.component");
var profileExperience_component_1 = require("./Profile/experience/profileExperience.component");
var profileNotifications_component_1 = require("./Profile/notifications/profileNotifications.component");
var profileEdit_component_1 = require("./Profile/edit/profileEdit.component");
var Erfaring_component_1 = require("./Users/Erfaring/Erfaring.component");
var feedSettings_component_1 = require("./Communities/shared/feedSettings/feedSettings.component");
var trendingPost_component_1 = require("./home/post/trendingPost.component");
var all_component_1 = require("./Communities/feed/all/all.component");
var personalFeed_component_1 = require("./Communities/feed/personalFeed/personalFeed.component");
var verification_input_component_1 = require("./Verification/verification-input.component");
var verification_receiver_component_1 = require("./Verification/verification-receiver.component");
var notificationSubscriber_component_1 = require("./Notification/notificationSubscriber.component");
var AuthInterceptor_1 = require("./HttpHandler/AuthInterceptor");
var expansion_1 = require("@angular/material/expansion");
var snack_bar_1 = require("@angular/material/snack-bar");
var menu_1 = require("@angular/material/menu");
var icon_1 = require("@angular/material/icon");
var button_1 = require("@angular/material/button");
var grid_list_1 = require("@angular/material/grid-list");
var sidenav_1 = require("@angular/material/sidenav");
var select_1 = require("@angular/material/select");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var badge_1 = require("@angular/material/badge");
var tooltip_1 = require("@angular/material/tooltip");
var material_1 = require("@angular/material");
var shared_service_1 = require("./Communities/shared/shared.service");
var comments_service_1 = require("./Communities/shared/comments/comments.service");
var posts_service_1 = require("./Communities/shared/posts/posts.service");
var communities_service_1 = require("./Communities/shared/communities/communities.service");
var users_service_1 = require("./Users/users.service");
var verification_service_1 = require("./Verification/verification.service");
var notification_service_1 = require("./Notification/notification.service");
var ErrorDialog_component_1 = require("./HttpHandler/ErrorDialog.component");
var ErrorDialog_service_1 = require("./HttpHandler/ErrorDialog.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                signup_component_1.SignUpComponent,
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                trending_component_1.TrendingComponent,
                trendingPost_component_1.TrendingPostsComponent,
                posts_component_1.PostsComponent,
                feedPage_component_1.FeedPageComponent,
                feed_component_1.FeedComponent,
                communities_component_1.CommunitiesComponent,
                feedSettings_component_1.FeedSettings,
                logIn_component_1.LogInComponent,
                admin_component_1.AdminComponent,
                reports_component_1.ReportsComponent,
                domains_component_1.DomainsComponent,
                navbar_component_1.NavbarComponent,
                settings_component_1.SettingsComponent,
                date_ago_pipe_1.DateAgoPipe,
                profile_component_1.ProfileComponent,
                profileCommunities_component_1.ProfileCommunitiesComponent,
                profileExperience_component_1.ProfileExperienceComponent,
                profileEdit_component_1.ProfileEditComponent,
                profileNotifications_component_1.ProfileNotificationsComponent,
                profileHome_component_1.ProfileHomeComponent,
                all_component_1.AllComponent,
                personalFeed_component_1.PersonalFeedComponent,
                Erfaring_component_1.ErfaringComponent,
                verification_input_component_1.VerificationInputComponent,
                verification_receiver_component_1.VerificationReceiverComponent,
                notificationSubscriber_component_1.NotificationSubscriberComponent,
                ErrorDialog_component_1.ErrorDialogComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                animations_1.BrowserAnimationsModule,
                app_routing_module_1.AppRoutingModule,
                expansion_1.MatExpansionModule,
                snack_bar_1.MatSnackBarModule,
                menu_1.MatMenuModule,
                icon_1.MatIconModule,
                button_1.MatButtonModule,
                ngx_pipes_1.NgPipesModule,
                grid_list_1.MatGridListModule,
                sidenav_1.MatSidenavModule,
                select_1.MatSelectModule,
                slide_toggle_1.MatSlideToggleModule,
                badge_1.MatBadgeModule,
                tooltip_1.MatTooltipModule,
                material_1.MatDialogModule,
                //CommunitiesModule
            ],
            providers: [
                shared_service_1.SharedService,
                comments_service_1.CommentsService,
                communities_service_1.CommunitiesService,
                posts_service_1.PostsService,
                users_service_1.UserService,
                verification_service_1.VerificationService,
                notification_service_1.NotificationService,
                { provide: material_1.MatDialogRef, useValue: {} },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: AuthInterceptor_1.AuthInterceptor, multi: true },
                ErrorDialog_service_1.ErrorDialogService,
            ],
            entryComponents: [ErrorDialog_component_1.ErrorDialogComponent],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map