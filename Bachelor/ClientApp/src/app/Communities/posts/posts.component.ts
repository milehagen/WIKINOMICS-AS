import { Community } from '../../Models/Community';
import { Post } from '../../Models/Post';
import { CommunitiesService } from '../shared/communities-shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Comment } from '../../Models/Comment';
//import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'post-component',
  templateUrl: './posts.component.html',
  providers: []
})

export class PostsComponent implements OnInit {
  selectedPost = new Post();
  fillerCommunity = new Community();
  postId: number;
  public commentForm: FormGroup;

  commentValidation = {
    textComment: [
      null, Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(500)])
    ]
  }


  constructor(
    private communitiesService: CommunitiesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _location: Location)
  {
    this.commentForm = fb.group(this.commentValidation);
  }

  //Subscribes to URL parameter and what post is currently selected
  ngOnInit() {
    this.selectedPost.community = this.fillerCommunity;

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postId = +params.get('postId');
      this.communitiesService.getPost(this.postId);
     }
    )
    this.communitiesService.selectedPostCurrent.subscribe(post => this.selectedPost = post);
  }

  //Patches comment to the specified post
  sendComment(postId: number) {
    if (this.communitiesService.checkLogin()) {
      let comment = new Comment();
      comment.post = this.selectedPost;
      comment.text = this.commentForm.value.textComment;
      comment.userID = sessionStorage.getItem("tempID");
      comment.date = new Date();
      comment.upvotes = 0;
      comment.downvotes = 0;

      this.communitiesService.sendComment(postId, comment);
    }


  }

  seePost() {
    console.log(this.selectedPost.community);
  }

  seeCommentText() {
    console.log(this.commentForm.value.textComment);
  }

  //Sends you back to last page
  goBack() {
    this._location.back();
  }

}
