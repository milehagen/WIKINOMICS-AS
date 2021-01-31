import { Community } from '../../Models/Community';
import { Post } from '../../Models/Post';
import { User } from '../../Models/User';
import { CommunitiesService } from '../shared/communities-shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'post-component',
  templateUrl: './posts.component.html',
  providers: []
})

export class PostsComponent implements OnInit {
  message: string;
  selectedPost: Post;
  postId: number;
  public commentForm: FormGroup;

  commentValidation = {
    textComment: [
      null, Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(500)])
    ]
  }


  constructor(private communitiesService: CommunitiesService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private _location: Location) {
    this.commentForm = fb.group(this.commentValidation);
  }

  //Subscribes to URL parameter and what post is currently selected
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postId = +params.get('postId');
      this.communitiesService.getPost(this.postId);
     }
    )
    this.communitiesService.selectedPostCurrent.subscribe(post => this.selectedPost = post);
  }


  seePost() {
    console.log("Post ID: " + this.postId);
    console.log(this.selectedPost);
  }

  seeCommentText() {
    console.log(this.commentForm.value.textComment);
  }

  //Sends you back to last page
  goBack() {
    this._location.back();
  }

  checkMessage() {
    console.log(this.message);
  }
}
