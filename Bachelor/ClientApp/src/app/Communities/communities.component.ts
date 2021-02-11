import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Community } from '../Models/Communities/Community';
import { Post } from '../Models/Communities/Post';
import { User } from '../Models/User';
import { CommentsService } from './shared/comments/comments.service';
import { PostsService } from './shared/posts/posts.service';
import { SharedService } from './shared/shared.service';
import { CommunitiesService } from './shared/communities/communities.service';


@Component({
  selector: 'app-home',
  templateUrl: './communities.component.html',
  providers: [SharedService, CommentsService, CommunitiesService, PostsService]
})

export class CommunitiesComponent {
  allCommunities: Community[];
  topCommunities: Community[];
  selectedCommunity: Community;

  public postForm: FormGroup;
  public loggedIn: boolean;
  public user: User;


  postValidation = {
    textPost: [
      null, Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(1000)])
    ]
  }


  constructor(
    private _http: HttpClient,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private communitiesService: CommunitiesService,
    private commentsService: CommentsService,
    private postsService: PostsService,
  ) {
    this.postForm = fb.group(this.postValidation);
  }


  ngOnInit() {
    this.communitiesService.allCommunitiesCurrent.subscribe(communities => this.allCommunities = communities);
    this.communitiesService.topCommunitiesCurrent.subscribe(communities => this.topCommunities = communities);
    this.communitiesService.selectedCommunityCurrent.subscribe(community => this.selectedCommunity = community);
    
    this.communitiesService.getCommunities();

    this.sharedService.checkLogin();
  }


  changeSelectedCommunity(community: Community) {
    this.communitiesService.changeSelectedCommunity(community);
  }
}


