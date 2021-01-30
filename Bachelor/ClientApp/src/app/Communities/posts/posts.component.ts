import { Community } from '../../Models/Community';
import { Post } from '../../Models/Post';
import { User } from '../../Models/User';
import { CommunitiesService } from '../shared/communities-shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'post-component',
  templateUrl: './posts.component.html',
  providers: []
})

export class PostsComponent implements OnInit {
  message: string;
  allPosts: Post[];

  constructor(private communitiesService: CommunitiesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.communitiesService.currentMessage.subscribe(message => this.message = message);
    this.communitiesService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
  }

  newMessage() {
    this.communitiesService.changeMessage("Hello from Post");
  }

  checkMessage() {
    console.log(this.message);
  }
}
