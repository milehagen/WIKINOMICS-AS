import { Community } from '../../Models/Community';
import { Post } from '../../Models/Post';
import { User } from '../../Models/User';
import { CommunitiesService } from '../shared/communities-shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'post-component',
  templateUrl: './posts.component.html',
  providers: []
})

export class PostsComponent implements OnInit {
  message: string;

  constructor(private communitiesService: CommunitiesService) {}

  ngOnInit() {
    this.communitiesService.currentMessage.subscribe(message => this.message = message);
  }

  newMessage() {
    this.communitiesService.changeMessage("Hello from Post");
  }

  checkMessage() {
    console.log(this.message);
  }
}
