import { Community } from '../../Models/Community';
import { Post } from '../../Models/Post';
import { User } from '../../Models/User';
import { CommunitiesService } from '../shared/communities-shared.service';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'feed-component',
  templateUrl: './feed.component.html',
  providers: []
})

export class FeedComponent implements OnInit{

  selectedCommunity: Community;
  allCommunities: Community[];
  allPosts: Post[];
  communityId: number;
  loggedIn: boolean;
  public postForm: FormGroup;

  postValidation = {
    textPost: [
      null, Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(1000)])
    ]
  }


  constructor(private communitiesService: CommunitiesService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.postForm = fb.group(this.postValidation);
  }

  //Start up
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.communityId = +params.get('communityId');
      //this.communitiesService.changeSelectedCommunity(this.allCommunities[this.communityId]);
      this.communitiesService.getPostsForCommunityId(this.communityId);
      }
    )
    this.communitiesService.selectedCommunityCurrent.subscribe(community => this.selectedCommunity = community);
    this.communitiesService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
  }

  showCommunityID() {
    console.log(this.communityId);
  }

  getPosts() {
    console.log(this.allPosts);
  }

  getCommunity() {
    console.log(this.selectedCommunity);
  }


  sendPost(post: Post) {
    if (this.communitiesService.checkLogin()) {
      var post = new Post()
      post.text = this.postForm.value.textPost;
      post.community = this.selectedCommunity;
      post.date = new Date();
      post.userID = sessionStorage.getItem("tempID");

      this.communitiesService.sendPost(post);
    }
  }

}
