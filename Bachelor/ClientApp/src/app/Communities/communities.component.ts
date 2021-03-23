import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Community } from '../Models/Communities/Community';
import { Post } from '../Models/Communities/Post';
import { User } from '../Models/User/User';
import { CommentsService } from './shared/comments/comments.service';
import { PostsService } from './shared/posts/posts.service';
import { SharedService } from './shared/shared.service';
import { CommunitiesService } from './shared/communities/communities.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './communities.component.html',
  styleUrls: ['./CommunitiesStyle.css'],
  providers: [SharedService, CommentsService, CommunitiesService, PostsService]
})

export class CommunitiesComponent {
  allCommunities: Community[];
  topCommunities: Community[];
  selectedCommunity: Community;

  public postForm: FormGroup;
  public loggedIn: boolean;
  public user: User;
  public userId: string;
  public test: Promise<string>;


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
    private router: Router
  ) {
    this.postForm = fb.group(this.postValidation);
  }


  ngOnInit() {
    this.sharedService.userCurrent.subscribe(user => this.user = user);
    this.communitiesService.allCommunitiesCurrent.subscribe(communities => this.allCommunities = communities);
    this.communitiesService.topCommunitiesCurrent.subscribe(communities => this.topCommunities = communities);
    this.communitiesService.selectedCommunityCurrent.subscribe(community => this.selectedCommunity = community);
    this.communitiesService.getCommunities();
    this.callGetUserIdCookie();
  
  }

  async callGetUserIdCookie() {
    let userIdToken = await this.sharedService.getTokenCookie();
    if (userIdToken) {
      let userId = await this.sharedService.getUserIdFromToken(userIdToken);

      if (userId) {
        this.sharedService.getUser(userId);
      }
    }
  }

  

  changeSelectedCommunity(community: Community) {
    let emptyPosts = Array<Post>();


    this.communitiesService.changeSelectedCommunity(community);
    this.sharedService.feedPagination = 0;
    this.postsService.changeAllPosts(emptyPosts);

    if (this.loggedIn) {
      console.log("sup");
    }
  }

  goToAll() {
    let emptyPosts = Array<Post>();

    this.sharedService.feedPagination = 0;
    this.postsService.changeAllPosts(emptyPosts);
  }


  checkUser() {
    console.log(this.userId);
  }

  checkLoggedIn() {
    console.log(this.test);
  }

}


