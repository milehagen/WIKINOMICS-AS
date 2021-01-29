import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommunitiesService } from './communities-shared.service';
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
  providers: [CommunitiesService],
  exports: [
    CommonModule,
    FormsModule,
    CommunitiesComponent,
    PostsComponent,
    FeedComponent
  ]
})
export class SharedModule { }
