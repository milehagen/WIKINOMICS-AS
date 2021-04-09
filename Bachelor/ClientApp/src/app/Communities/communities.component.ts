import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Community } from '../Models/Communities/Community';
import { Post } from '../Models/Communities/Post';
import { User } from '../Models/Users/User';
import { CommentsService } from './shared/comments/comments.service';
import { PostsService } from './shared/posts/posts.service';
import { SharedService } from './shared/shared.service';
import { CommunitiesService } from './shared/communities/communities.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './communities.component.html',
  styleUrls: ['./CommunitiesStyle.css'],
  providers: [SharedService, CommentsService, CommunitiesService, PostsService]
})

export class CommunitiesComponent {
  allCommunities: Community[];
  allCommunitiesSub: Subscription;

  rootCommunities: Community[];
  rootCommunitiesSub: Subscription;

  selectedCommunity: Community;
  selectedCommunitySub: Subscription;

  user: User;
  userSub: Subscription;

  loggedIn: boolean;
  loggedInSub: Subscription;

  public postForm: FormGroup;
  
  public userId: string;
  public test: Promise<string>;


  constructor(
    private _http: HttpClient,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private communitiesService: CommunitiesService,
    private commentsService: CommentsService,
    private postsService: PostsService,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.userSub = this.sharedService.userCurrent.subscribe(user => this.user = user);
    this.loggedInSub = this.sharedService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.rootCommunitiesSub = this.communitiesService.rootCommunitiesCurrent.subscribe(communities => this.rootCommunities = communities);
    this.allCommunitiesSub = this.communitiesService.allCommunitiesCurrent.subscribe(communities => this.allCommunities = communities);
    this.selectedCommunitySub = this.communitiesService.selectedCommunityCurrent.subscribe(community => this.selectedCommunity = community);
    this.communitiesService.getRootCommunities(0);
    this.callGetUserIdCookie();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.loggedInSub.unsubscribe();
    this.rootCommunitiesSub.unsubscribe();
    this.allCommunitiesSub.unsubscribe();
    this.selectedCommunitySub.unsubscribe();
  }

  //Gets the token for userID cookie, then gets the ID from the token, and lastly using the ID to get the user. 
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
    //Only reseting if you coming from a different community
    //Or from the all feed
    if (this.selectedCommunity == undefined || this.selectedCommunity.id != community.id || this.router.url === "/communities/all") {
      let emptyPosts = Array<Post>();

      this.sharedService.feedPagination = 0;
      this.postsService.changeAllPosts(emptyPosts);
    }
    //Changing selected community no matter what
    this.communitiesService.changeSelectedCommunity(community);
  }

  goToYour() {
    if (this.router.url !== "/communities/your") {
      let emptyPosts = Array<Post>();

      this.sharedService.feedPagination = 0;
      this.postsService.changeAllPosts(emptyPosts);
    }
  }



  goToAll() {
    if (this.router.url !== "/communities/all") {
      let emptyPosts = Array<Post>();

      this.sharedService.feedPagination = 0;
      this.postsService.changeAllPosts(emptyPosts);
    }
  }


  checkUser() {
    console.log(this.userId);
  }

  checkLoggedIn() {
    console.log(this.test);
  }

  // Clicking on voting buttons won't route to the post
  noRouting(e) {
    e.stopPropagation();
  }

}


