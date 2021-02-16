import { Community } from '../../Models/Communities/Community';
import { Post } from '../../Models/Communities/Post';
import { Comment } from '../../Models/Communities/Comment';
import { User } from '../../Models/User';

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
  allPosts: Post[];
  allCommunities: Community[];
  user: User;

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
    this.sharedService.userCurrent.subscribe(user => this.user = user);
    this.communitiesService.selectedCommunityCurrent.subscribe(community => this.selectedCommunity = community);
    this.communitiesService.allCommunitiesCurrent.subscribe(communities => this.allCommunities = communities);
    this.postsService.selectedPostCurrent.subscribe(post => this.selectedPost = post);
    this.postsService.allPostsCurrent.subscribe(posts => this.allPosts = posts);


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

  //Patches comment to the specified post
  sendComment(postId: number) {
    if (this.sharedService.checkLogin()) {
      let comment = new Comment();
      comment.post = this.selectedPost;
      comment.text = this.commentForm.value.textComment;
      comment.user = this.user;
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
