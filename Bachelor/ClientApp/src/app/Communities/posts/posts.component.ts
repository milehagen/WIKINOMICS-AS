import { Community } from '../../Models/Communities/Community';
import { Post } from '../../Models/Communities/Post';
import { Comment } from '../../Models/Communities/Comment';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CommunitiesService } from '../shared/communities/communities.service';
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

  //Sends you back to last page
  goBack() {
    this._location.back();
  }

}
