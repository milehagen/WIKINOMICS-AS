import { Community } from '../../Models/Community';
import { Post } from '../../Models/Post';
import { User } from '../../Models/User';
import { CommunitiesService } from '../shared/communities-shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'post-component',
  templateUrl: './posts.component.html',
  providers: []
})

export class PostsComponent implements OnInit {
  message: string;
  selectedPost: Post;
  postId: number;

  constructor(private communitiesService: CommunitiesService, private route: ActivatedRoute, private router: Router) {}

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

  checkMessage() {
    console.log(this.message);
  }
}
