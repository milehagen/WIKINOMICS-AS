import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedService } from './shared.service';
import { CommentsService } from './comments/comments.service';
import { CommunitiesService } from './communities/communities.service';
import { PostsService } from './Posts/Posts.service';
import { CommunitiesComponent } from '../communities.component';
import { PostsComponent } from '../posts/posts.component';
import { FeedComponent } from '../feed/feed.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    CommunitiesComponent,
    PostsComponent,
    FeedComponent
  ],
  providers: [SharedService, CommentsService, CommunitiesService, PostsService],
  exports: [
    CommonModule,
    FormsModule,
    CommunitiesComponent,
    PostsComponent,
    FeedComponent
  ]
})
export class SharedModule { }
