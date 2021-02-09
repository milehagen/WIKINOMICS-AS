import { Community } from '../../Models/Community';
import { Post } from '../../Models/Post';
import { User } from '../../Models/User';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostTag } from '../../Models/PostTag';
import { UserPostVote } from '../../Models/UserPostVote';
import { CommentsService } from '../shared/comments/comments.service';
import { PostsService } from '../shared/posts/posts.service';
import { SharedService } from '../shared/shared.service';
import { CommunitiesService } from '../shared/communities/communities.service';

@Component({
  selector: 'feed-component',
  templateUrl: './feed.component.html',
  styleUrls: ['../CommunitiesStyle.css'],
  providers: []
})

export class FeedComponent implements OnInit{

  selectedCommunity = new Community();
  allCommunities: Community[];
  allPosts: Post[];
  allPostTags: PostTag[];
  communityId: number;

  showPublishSection: boolean;
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


  constructor(
    private sharedService: SharedService,
    private communitiesService: CommunitiesService,
    private commentsService: CommentsService,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.postForm = fb.group(this.postValidation);
  }

  //Start up
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.communityId = +params.get('communityId');
      this.communitiesService.getCommunity(this.communityId);
      this.postsService.getPostsForCommunity(this.communityId);
      }
    )
    this.postsService.getPostTags();
    this.postsService.allPostTagsCurrent.subscribe(postTag => this.allPostTags = postTag);

    this.communitiesService.selectedCommunityCurrent.subscribe(community => this.selectedCommunity = community);
    this.postsService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
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
    if (this.sharedService.checkLogin()) {
      var post = new Post()
      post.text = this.postForm.value.textPost;
      post.community = this.selectedCommunity;
      post.date = new Date().toJSON();
      post.userID = sessionStorage.getItem("tempID");

      if (this.usePostTag) {
        post.postTag = this.postForm.value.postTagField;
      }

      if (this.postsService.sendPost(post)) {
        this.postForm.patchValue({ textPost: "" });
      }
    }
  }

  //Sends upvote to service.
  //Note: While the object is updated on backend, a new one is not fetched
  //Just a visual update here on the frontend
  async upvotePost(post: Post) {
    console.log("First");

    if (await this.sharedService.checkLogin()) {
      console.log("waited loggin");
      //Checks if this user has ever upvoted this post before
      let voteCheck = new UserPostVote();
      voteCheck.PostId = post.id;
      voteCheck.Voted = 1;
      voteCheck.UserId = sessionStorage.getItem("tempID");

      let canVote = await this.postsService.checkIfCanVote(voteCheck);

      if (await canVote) {
        console.log("Hello??");
        let votedPost = new Post();
        votedPost.upvotes = 1;

        this.postsService.votePost(post.id, votedPost);
        this.postsService.logVote(voteCheck);
        post.upvotes++;
      }
    }
  }


  //Sends downvote to service.
  //Note: While the object is updated on backend, a new one is not fetched
  //Just a visual update here on the frontend
  downvotePost(post: Post) {
    if (this.sharedService.checkLogin()) {
      let votedPost = new Post();
      votedPost.downvotes = 1;

      this.postsService.votePost(post.id, votedPost);
      post.downvotes++;
    }
  }

  showSelectedCommunity() {
    console.log(this.selectedCommunity);
  }

  seePostTag() {
    console.log(this.allPostTags);
  }

}
