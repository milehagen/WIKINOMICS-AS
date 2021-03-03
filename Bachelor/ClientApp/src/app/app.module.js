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
var signup_component_1 = require("./signUp/signup.component");
var home_component_1 = require("./home/home.component");
var app_routing_module_1 = require("./app-routing.module");
var communities_component_1 = require("./Communities/communities.component");
var posts_component_1 = require("./Communities/posts/posts.component");
var feed_component_1 = require("./Communities/feed/feed.component");
var admin_component_1 = require("./Admin/admin.component");
var reports_component_1 = require("./Admin/Reports/reports.component");
var navbar_component_1 = require("./navbar/navbar.component");
var settings_component_1 = require("./Admin/Settings/settings.component");
var expansion_1 = require("@angular/material/expansion");
var snack_bar_1 = require("@angular/material/snack-bar");
var menu_1 = require("@angular/material/menu");
var icon_1 = require("@angular/material/icon");
var button_1 = require("@angular/material/button");
var logIn_component_1 = require("./logIn/logIn.component");
var feedSettings_component_1 = require("./Communities/shared/feedSettings/feedSettings.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                signup_component_1.SignUpComponent,
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                communities_component_1.CommunitiesComponent,
                posts_component_1.PostsComponent,
                feed_component_1.FeedComponent,
                communities_component_1.CommunitiesComponent,
                feedSettings_component_1.FeedSettings,
                logIn_component_1.LogInComponent,
                admin_component_1.AdminComponent,
                reports_component_1.ReportsComponent,
                navbar_component_1.NavbarComponent,
                settings_component_1.SettingsComponent,
                date_ago_pipe_1.DateAgoPipe
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
                ngx_pipes_1.NgPipesModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map