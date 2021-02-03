import { Community } from '../../Models/Community';
import { Post } from '../../Models/Post';
import { User } from '../../Models/User';
import { CommunitiesService } from '../shared/communities-shared.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'feed-component',
  templateUrl: './feed.component.html',
  providers: []
})

export class FeedComponent implements OnInit{

  selectedCommunity = new Community();
  allCommunities: Community[];
  allPosts: Post[];
  communityId: number;
  loggedIn: boolean;
  public postForm: FormGroup;
  public date: Date;
  public dateString: string;
  public newDateObj: Date;

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
      this.communitiesService.getCommunity(this.communityId);
      this.communitiesService.getPostsForCommunity(this.communityId);
      }
    )

    this.communitiesService.selectedCommunityCurrent.subscribe(community => this.selectedCommunity = community);
    this.communitiesService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
  }

  sendPost(post: Post) {
    if (this.communitiesService.checkLogin()) {
      var post = new Post()
      post.text = this.postForm.value.textPost;
      post.community = this.selectedCommunity;
      post.date = new Date().toJSON();
      post.userID = sessionStorage.getItem("tempID");

      if (this.communitiesService.sendPost(post)) {
        console.log("Its true");
        this.postForm.patchValue({ textPost: "" });
      } else {
        console.log("Its false");
      }
    }
  }

  //Sends upvote to service.
  //Note: While the object is updated on backend, a new one is not fetched
  //Just a visual update here on the frontend
  upvotePost(post: Post) {
    if (this.communitiesService.checkLogin()) {
      let votedPost = new Post();
      votedPost.upvotes = 1;

      this.communitiesService.votePost(post.id, votedPost);
      post.upvotes += 1;
    }
  }


  //Sends downvote to service.
  //Note: While the object is updated on backend, a new one is not fetched
  //Just a visual update here on the frontend
  downvotePost(post: Post) {
    if (this.communitiesService.checkLogin()) {
      let votedPost = new Post();
      votedPost.downvotes = 1;

      this.communitiesService.votePost(post.id, votedPost);
      post.downvotes += 1;
    }
  }

  showSelectedCommunity() {
    console.log(this.selectedCommunity);
  }

}
