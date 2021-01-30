import { Community } from '../../Models/Community';
import { Post } from '../../Models/Post';
import { User } from '../../Models/User';
import { CommunitiesService } from '../shared/communities-shared.service';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
  selector: 'feed-component',
  templateUrl: './feed.component.html',
  providers: []
})

export class FeedComponent implements OnInit{
  message: string;
  allCommunities: Community[];
  allPosts: Post[];
  public viewPost: boolean;
  communityId: number;

  constructor(private communitiesService: CommunitiesService, private route: ActivatedRoute, private router: Router) {
  }

  //Start up
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.communityId = +params.get('communityId');
      this.communitiesService.getPostsForCommunityId(this.communityId);
      }
    )

    this.communitiesService.allCommunitiesCurrent.subscribe(communities => this.allCommunities = communities);
    this.communitiesService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
  }

  showCommunityID() {
    console.log(this.communityId);
  }

  getPosts() {
    console.log(this.allPosts);
  }

  checkMessage() {
    console.log(this.message);
  }

}
