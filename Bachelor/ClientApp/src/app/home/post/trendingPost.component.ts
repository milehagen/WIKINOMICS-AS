import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Industry } from '../../Models/Users/industry';
import { Community } from '../../Models/Communities/Community';
import { FeedComponent } from '../../Communities/feed/feed.component';
import { Post } from '../../Models/Communities/Post';


@Component({
  selector: 'trending-trendingPosts',
  templateUrl: './trendingPost.component.html',
  styleUrls: [ './trendingPost.component.css' ],
})

export class TrendingPostsComponent {
  public trendingPosts: Array<Post>;
  public selectedPost = new Post();

  constructor(private _http: HttpClient) {}

  ngOnInit() {
    console.log(this.selectedPost);
  }



}
