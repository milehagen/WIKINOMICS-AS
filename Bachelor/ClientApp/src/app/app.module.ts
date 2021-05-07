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
import { FeedPageComponent } from './Communities/feed/feedPage.component';
import { FeedComponent } from './Communities/feed/feed.component';
import { AdminComponent } from './Admin/admin.component';
import { ReportsComponent } from './Admin/Reports/reports.component';
import { DomainsComponent } from './Admin/Domains/domains.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettingsComponent } from './Admin/Settings/settings.component';
import { LogInComponent } from './Users/logIn/logIn.component';
import { ProfileComponent } from './Profile/profile.component';
import { ProfileHomeComponent } from './Profile/home/profileHome.component';
import { ProfileCommunitiesComponent } from './Profile/communities/profileCommunities.component';
import { ProfileExperienceComponent } from './Profile/experience/profileExperience.component';
import { ProfileNotificationsComponent } from './Profile/notifications/profileNotifications.component';
import { ProfileEditComponent } from './Profile/edit/profileEdit.component';
import { ErfaringComponent } from './Users/Erfaring/Erfaring.component';
import { FeedSettings } from './Communities/shared/feedSettings/feedSettings.component';
import { TrendingPostsComponent } from './home/post/trendingPost.component';
import { AllComponent } from './Communities/feed/all/all.component';
import { PersonalFeedComponent } from './Communities/feed/personalFeed/personalFeed.component';
import { CommunitiesModule } from './Communities/shared/communities-shared.module';
import { VerificationInputComponent } from './Verification/verification-input.component';
import { VerificationReceiverComponent } from './Verification/verification-receiver.component';
import { NotificationSubscriberComponent } from './Notification/notificationSubscriber.component';
import { AuthInterceptor } from './HttpHandler/AuthInterceptor';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


import { SharedService } from './Communities/shared/shared.service';
import { CommentsService } from './Communities/shared/comments/comments.service';
import { PostsService } from './Communities/shared/posts/posts.service';
import { CommunitiesService } from './Communities/shared/communities/communities.service';
import { UserService } from './Users/users.service';
import { VerificationService } from './Verification/verification.service';
import { NotificationService } from './Notification/notification.service';
import { ErrorDialogComponent } from './HttpHandler/ErrorDialog.component';
import { ErrorDialogService } from './HttpHandler/ErrorDialog.service';


@NgModule({
  declarations: [
    SignUpComponent,
    AppComponent,
    HomeComponent,
    TrendingComponent,
    TrendingPostsComponent,
    PostsComponent,
    FeedPageComponent,
    FeedComponent,
    CommunitiesComponent,
    FeedSettings,
    LogInComponent,
    AdminComponent,
    ReportsComponent,
    DomainsComponent,
    NavbarComponent,
    SettingsComponent,
    DateAgoPipe,
    ProfileComponent,
    ProfileCommunitiesComponent,
    ProfileExperienceComponent,
    ProfileEditComponent,
    ProfileNotificationsComponent,
    ProfileHomeComponent,
    AllComponent,
    PersonalFeedComponent,
    ErfaringComponent,
    VerificationInputComponent,
    VerificationReceiverComponent,
    NotificationSubscriberComponent,
    ErrorDialogComponent,
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
    MatSlideToggleModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDialogModule,
    //CommunitiesModule
  ],
  providers: [
      SharedService,
      CommentsService,
      CommunitiesService,
      PostsService,
      UserService,
      VerificationService,
      NotificationService,
      { provide : MatDialogRef, useValue : {} },
      { provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true },
      ErrorDialogService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
