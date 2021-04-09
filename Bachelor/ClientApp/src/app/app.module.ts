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
import { FeedSettings } from './Communities/shared/feedSettings/feedSettings.component';
import { TrendingPostsComponent } from './home/post/trendingPost.component';
import { AllComponent } from './Communities/feed/all/all.component';
import { PersonalFeedComponent } from './Communities/feed/personalFeed/personalFeed.component';
import { CommunitiesModule } from './Communities/shared/communities-shared.module';
import { VerificationInputComponent } from './Verification/verification-input.component';
import { VerificationReceiverComponent } from './Verification/verification-receiver.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';

import { SharedService } from './Communities/shared/shared.service';
import { CommentsService } from './Communities/shared/comments/comments.service';
import { PostsService } from './Communities/shared/posts/posts.service';
import { CommunitiesService } from './Communities/shared/communities/communities.service';
import { UserService } from './Users/users.service';
import { VerificationService } from './Verification/verification.service';

@NgModule({
  declarations: [
    SignUpComponent,
    AppComponent,
    HomeComponent,
    TrendingComponent,
    TrendingPostsComponent,
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
    AllComponent,
    PersonalFeedComponent,
    ErfaringComponent,
    VerificationInputComponent,
    VerificationReceiverComponent
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
    MatSidenavModule,
    MatSelectModule,
    //CommunitiesModule
  ],
  providers: [SharedService, CommentsService, CommunitiesService, PostsService, UserService, VerificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
