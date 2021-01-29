import { Community } from '../../Models/Community';
import { Post } from '../../Models/Post';
import { User } from '../../Models/User';
import { CommunitiesService } from '../shared/communities-shared.service';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'feed-component',
  templateUrl: './feed.component.html',
  providers: []
})

export class FeedComponent implements OnInit, AfterViewInit{
  message: string;
  allCommunities: Community[];
  allPosts: Post[];

  constructor(private communitiesService: CommunitiesService) {
  }

  //Start up
  ngOnInit() {
    this.communitiesService.currentMessage.subscribe(message => this.message = message);

    this.communitiesService.allCommunitiesCurrent.subscribe(communities => this.allCommunities = communities);
    this.communitiesService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
  }

  //After Start up
  ngAfterViewInit() {
    console.log(this.allCommunities);
    //this.communitiesService.getPostsForCommunity(this.allCommunities[0]);
  }

  newMessage() {
    this.communitiesService.changeMessage("Hello from Feed");
  }

  getCommunities() {
    this.communitiesService.getCommunities();
    console.log(this.allCommunities);
  }

  checkMessage() {
    console.log(this.message);
  }

}
