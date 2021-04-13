import { Community } from '../../Models/Communities/Community';
import { Post } from '../../Models/Communities/Post';
import { Comment } from '../../Models/Communities/Comment';
import { User } from '../../Models/Users/User';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CommunitiesService } from '../shared/communities/communities.service';
import { PostsService } from '../shared/posts/posts.service';
import { CommentsService } from '../shared/comments/comments.service';
import { SharedService } from '../shared/shared.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'post-component',
  templateUrl: './posts.component.html',
  styleUrls: ['../CommunitiesStyle.css'],
  providers: []
})

export class PostsComponent implements OnInit {
  selectedPost = new Post();
  selectedPostSub: Subscription;
  selectedCommunity = new Community();
  selectedCommunitySub: Subscription;
  allPosts: Post[];
  allPostsSub: Subscription;
  allCommunities: Community[];
  allCommunitiesSub: Subscription;
  user: User;
  userSub: Subscription;


  postId: number;
  communityId: number;
  public commentForm: FormGroup;
  commentAnonymously: boolean;
  respondToCommentIndex: number;  //Index of comment you wish to respond to
  highligtedIndex: number; //Index of comment that should be highlighted

  commentValidation = {
    textComment: [
      null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])
    ],
    identityField: [
      null, Validators.compose([Validators.required])
    ],
    experienceField: [
      null, Validators.compose([Validators.required])
    ]
  }


  constructor(
    private sharedService: SharedService,
    private communitiesService: CommunitiesService,
    private commentsService: CommentsService,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _location: Location)
  {
    this.commentForm = fb.group(this.commentValidation);
  }

  //Subscribes to URL parameter and what post is currently selected
  ngOnInit() {
    this.userSub = this.sharedService.userCurrent.subscribe(user => this.user = user);
    this.selectedCommunitySub = this.communitiesService.selectedCommunityCurrent.subscribe(community => this.selectedCommunity = community);
    this.allCommunitiesSub = this.communitiesService.allCommunitiesCurrent.subscribe(communities => this.allCommunities = communities);
    this.selectedPostSub = this.postsService.selectedPostCurrent.subscribe(post => this.selectedPost = post);
    this.allPostsSub = this.postsService.allPostsCurrent.subscribe(posts => this.allPosts = posts);


    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postId = +params.get('postId');
      this.communityId = +params.get('communityId');
      this.postsService.getPost(this.postId);

      if (this.allCommunities.length > 0) {
        this.communitiesService.changeSelectedCommunity(this.allCommunities.find(c => c.id === this.communityId));
      } else {
        this.communitiesService.getCommunity(this.communityId);
      }
    });
  }

  ngOnDestroy() {
    this.allCommunitiesSub.unsubscribe();
    this.allPostsSub.unsubscribe();
    this.selectedCommunitySub.unsubscribe();
    this.selectedPostSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  //Calls to service
  reportPost(post: Post) {
    this.postsService.reportPost(post);
  }

  //Calls to service
  upvotePost(post: Post, user: User) {
    this.postsService.upvotePost(post, user)
  }

  //Calls to service
  downvotePost(post: Post, user: User) {
    this.postsService.downvotePost(post, user)
  }

  //Calls to service
  reportComment(comment: Comment) {
    this.commentsService.reportComment(comment);
  }

  //Calls to service
  upvoteComment(comment: Comment, user: User) {
    this.commentsService.upvoteComment(comment, user)
  }

  //Calls to service
  downvoteComment(comment: Comment, user: User) {
    this.commentsService.downvoteComment(comment, user)
  }


  //Patches comment to the specified post
  async sendComment(postId: number) {
    if (await this.sharedService.checkLogin()) {
      let comment = new Comment();
      comment.post = this.selectedPost;
      comment.text = this.commentForm.value.textComment;
      comment.user = this.user;
      comment.date = new Date().toJSON();
      comment.upvotes = 0;
      comment.downvotes = 0;

      if (this.respondToCommentIndex) {
        comment.responsTo = this.respondToCommentIndex;
      }

      if (this.commentForm.value.identityField === "null") {
        comment.anonymous = true;
      } else { comment.anonymous = false; }

      if (this.commentForm.value.experienceField !== "null") {
        comment.experience = this.commentForm.value.experienceField;
      }

      if (this.commentsService.sendComment(postId, comment)) {
        this.commentForm.patchValue({ textComment: "" });
        this.respondToCommentIndex = 0;
      }
    }
    else {
      this.sharedService.openSnackBarMessage("Must be logged in to comment", "Ok");
    }
  }


  //Called if user clicks to respond to specific comment in thread
  //Sets the index
  respondToComment(index: number) {
    this.respondToCommentIndex = index + 1;
    this.commentForm.patchValue({ textComment: "@" + this.respondToCommentIndex + " " });
  }

  //Called if user doesn't want to respond after all
  //Removes the comment index from variabel
  cancelRespons() {
    this.respondToCommentIndex = 0;
  }

  //When a user clicks on the "Reply to comment #x" on a comment that is a respons
  //it highlights that comment
  highlightComment(index: number) {
    this.highligtedIndex = index;
  }

  //Sends you back to last page
  goBack() {
    this._location.back();
  }

  noRouting(e) {
    e.stopPropagation();
  }

}
