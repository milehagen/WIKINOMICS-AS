import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { SignUpComponent } from './signUp/signup.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { CommunitiesComponent } from './Communities/communities.component';
import { PostsComponent } from './Communities/posts/posts.component';
import { FeedComponent } from './Communities/feed/feed.component';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LogInComponent } from './logIn/logIn.component';

@NgModule({
  declarations: [
    SignUpComponent,
    AppComponent,
    HomeComponent,
    CommunitiesComponent,
    PostsComponent,
    FeedComponent
    CommunitiesComponent,
    LogInComponent
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
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
