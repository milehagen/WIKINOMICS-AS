import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './Users/signUp/signup.component';
import { HomeComponent } from './home/home.component';
import { CommunitiesComponent } from './Communities/communities.component';
import { LogInComponent } from './Users/logIn/logIn.component';
import { FeedComponent } from './Communities/feed/feed.component';
import { PostsComponent } from './Communities/posts/posts.component';
import { AdminComponent } from './Admin/admin.component';
import { ReportsComponent } from './Admin/Reports/reports.component';
import { SettingsComponent } from './Admin/Settings/settings.component';
import { ProfileComponent } from './Profile/profile.component';
import { TrendingPostsComponent } from './home/post/trendingPost.component';
import { TrendingComponent } from './home/trending/trending.component';
import { AllComponent } from './Communities/feed/all/all.component';
import { ErfaringComponent } from './Users/Erfaring/Erfaring.component';
import { PersonalFeedComponent } from './Communities/feed/personalFeed/personalFeed.component';
import { VerificationReceiverComponent } from './Verification/verification-receiver.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: AppComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: TrendingComponent},
      { path: 'post/:postId', component: TrendingPostsComponent}
    ]
  },
  {
    path: 'communities',
    component: CommunitiesComponent,
    children: [
      { path: 'all', component: AllComponent },
      { path: 'your', component: PersonalFeedComponent },
      { path: ':communityId', component: FeedComponent },
      { path: ':communityId/post/:postId', component: PostsComponent }
    ]
  },
  {
    path: 'logIn',
    component: LogInComponent
  },
  {
    path: 'erfaring',
    component: ErfaringComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'verify',
    component: VerificationReceiverComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'reports', component: ReportsComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
