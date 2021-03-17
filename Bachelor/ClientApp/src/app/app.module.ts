import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';
import { DateAgoPipe } from './pipes/date-ago.pipe';

import { AppComponent } from './app.component';
import { SignUpComponent } from './Users/signUp/signup.component';
import { HomeComponent } from './home/home.component';
import { TrendingComponent } from './home/trending/trending.component';
import { AppRoutingModule } from './app-routing.module';
import { CommunitiesComponent } from './Communities/communities.component';
import { PostsComponent } from './Communities/posts/posts.component';
import { FeedComponent } from './Communities/feed/feed.component';
import { AdminComponent } from './Admin/admin.component';
import { ReportsComponent } from './Admin/Reports/reports.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './Admin/Settings/settings.component';
import { LogInComponent } from './Users/logIn/logIn.component';
import { ProfileComponent } from './Profile/profile.component';
import { ErfaringComponent } from './Users/Erfaring/Erfaring.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { FeedSettings } from './Communities/shared/feedSettings/feedSettings.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TrendingPostsComponent } from './home/post/trendingPost.component';

@NgModule({
  declarations: [
    SignUpComponent,
    AppComponent,
    HomeComponent,
    TrendingComponent,
    TrendingPostsComponent,
    CommunitiesComponent,
    PostsComponent,
    FeedComponent,
    CommunitiesComponent,
    FeedSettings,
    LogInComponent,
    AdminComponent,
    ReportsComponent,
    NavbarComponent,
    SettingsComponent,
    DateAgoPipe,
    ProfileComponent,
    ErfaringComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    NgPipesModule,
    MatGridListModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
