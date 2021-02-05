import { Community } from '../../Models/Community';
import { Post } from '../../Models/Post';
import { User } from '../../Models/User';
import { CommunitiesService } from '../shared/communities-shared.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostTag } from '../../Models/PostTag';


@Component({
  selector: 'feed-component',
  templateUrl: './feed.component.html',
  providers: []
})

export class FeedComponent implements OnInit{

  selectedCommunity = new Community();
  allCommunities: Community[];
  allPosts: Post[];
  allPostTags: PostTag[];
  communityId: number;

  usePostTag: boolean;
  loggedIn: boolean;
  public postForm: FormGroup;


  postValidation = {
    textPost: [
      null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZæøåÆØÅ., \-\s\S]{20,1000}$")])
    ],
    postTagField: [
      { value: '', disabled: true }, Validators.compose([Validators.required])
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
    this.communitiesService.getPostTags();
    this.communitiesService.allPostTagsCurrent.subscribe(postTag => this.allPostTags = postTag);

    this.communitiesService.selectedCommunityCurrent.subscribe(community => this.selectedCommunity = community);
    this.communitiesService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
  }

  //If user wants to add a tag, we include it in validation
  postTagToggle() {
    if (this.usePostTag) {
      this.postForm.controls['postTagField'].enable();
    } else {
      this.postForm.controls['postTagField'].disable();
    }
    
  }

  sendPost(post: Post) {
    if (this.communitiesService.checkLogin()) {
      var post = new Post()
      post.text = this.postForm.value.textPost;
      post.community = this.selectedCommunity;
      post.date = new Date().toJSON();
      post.userID = sessionStorage.getItem("tempID");

      if (this.usePostTag) {
        post.postTag = this.postForm.value.postTagField;
      }
      console.log(post.postTag.title);


      if (this.communitiesService.sendPost(post)) {
        this.postForm.patchValue({ textPost: "" });
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

  seePostTag() {
    console.log(this.allPostTags);
  }

}
