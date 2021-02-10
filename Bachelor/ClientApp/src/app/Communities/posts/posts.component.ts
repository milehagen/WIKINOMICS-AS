import { Community } from '../../Models/Community';
import { Post } from '../../Models/Post';
import { CommunitiesService } from '../shared/communities/communities.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Comment } from '../../Models/Comment';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PostsService } from '../shared/posts/posts.service';
import { CommentsService } from '../shared/comments/comments.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'post-component',
  templateUrl: './posts.component.html',
  providers: []
})

export class PostsComponent implements OnInit {
  postId: number;
  selectedPost = new Post();
  communityId: number;
  selectedCommunity = new Community();
  public commentForm: FormGroup;

  commentValidation = {
    textComment: [
      null, Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(500)])
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
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postId = +params.get('postId');
      this.communityId = +params.get('communityId');
      this.communitiesService.getCommunity(this.communityId);
      this.postsService.getPost(this.postId);
     }
    )
    this.communitiesService.selectedCommunityCurrent.subscribe(community => this.selectedCommunity = community);
    this.postsService.selectedPostCurrent.subscribe(post => this.selectedPost = post);
  }

  //Sends upvote to service.
  //Note: While the object is updated on backend, a new one is not fetched
  //Just a visual update here on the frontend
  upvotePost(post: Post) {
    if (this.sharedService.checkLogin()) {
      let votedPost = new Post();
      votedPost.upvotes = 1;

      this.postsService.votePost(post.id, votedPost);
      post.upvotes += 1;
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
      post.downvotes += 1;
    }
  }



  //Patches comment to the specified post
  sendComment(postId: number) {
    if (this.sharedService.checkLogin()) {
      let comment = new Comment();
      comment.post = this.selectedPost;
      comment.text = this.commentForm.value.textComment;
      comment.userID = sessionStorage.getItem("tempID");
      comment.date = new Date().toJSON();
      comment.upvotes = 0;
      comment.downvotes = 0;

      if (this.commentsService.sendComment(postId, comment)) {
        this.commentForm.patchValue({ textComment: "" });
      }
    }
  }

  //Sends upvote to service.
  //Note: While the object is updated on backend, a new one is not fetched
  //Just a visual update here on the frontend
  upvoteComment(comment: Comment) {
    if (this.sharedService.checkLogin()) {
      let votedComment = new Comment();
      votedComment.upvotes = 1;

      this.commentsService.voteComment(comment.id, votedComment);
      comment.upvotes++;
    }
  }

  //Sends downvote to service
  //Note: A new comment object is not retrived from DB after vote is cast
  //Just a visual update here on the frontend
  downvoteComment(comment: Comment) {
    if (this.sharedService.checkLogin()) {
      let votedComment = new Comment();
      votedComment.downvotes = -1;

      this.commentsService.voteComment(comment.id, votedComment);
      comment.downvotes++;
    }
  }

  seePost() {
    console.log(this.selectedPost.date);
  }

  seeCommentText() {
    console.log(this.commentForm.value.textComment);
  }

  //Sends you back to last page
  goBack() {
    this._location.back();
  }

}
