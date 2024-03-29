import { Community } from '../../Models/Communities/Community';
import { Post } from '../../Models/Communities/Post';
import { User } from '../../Models/Users/User';
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostTag } from '../../Models/Communities/PostTag';
import { UserPostVote } from '../../Models/Communities/UserPostVote';
import { CommentsService } from '../shared/comments/comments.service';
import { PostsService } from '../shared/posts/posts.service';
import { SharedService } from '../shared/shared.service';
import { CommunitiesService } from '../shared/communities/communities.service';
import { Observable, Subscription } from 'rxjs';
import { Experience } from '../../Models/Users/Experience';
import { UserService } from '../../Users/users.service';

@Component({
  selector: 'feed-component',
  templateUrl: './feed.component.html',
  styleUrls: ['../CommunitiesStyle.css'],
  providers: []
})

export class FeedComponent implements OnInit {

  selectedCommunity = new Community();
  selectedCommunitySub: Subscription;

  allCommunities: Community[];

  rootCommunities: Community[];
  rootCommunitiesSub: Subscription;

  @Input() public allPosts: Post[];

  user: User;
  userSub: Subscription;

  loggedIn: boolean;
  loggedInSub: Subscription;

  loadingPosts: boolean;
  loadingPostsSub: Subscription;

  communityId: number;
  public postForm: FormGroup;
  showPublishSectionToggle: boolean;
  usePostTag: boolean;
  postAnonymously: boolean;
  subscribed: number;
  orderByValue: string;


  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private communitiesService: CommunitiesService,
    private commentsService: CommentsService,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  //Start up
  ngOnInit() {
    //Subscribe to things we need from services
    this.userSub = this.userService.userCurrent.subscribe(user => this.user = user);
    this.loggedInSub = this.userService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.selectedCommunitySub = this.communitiesService.selectedCommunityCurrent.subscribe(community => this.selectedCommunity = community);
    this.rootCommunitiesSub = this.communitiesService.rootCommunitiesCurrent.subscribe(communities => this.rootCommunities = communities);
    
    //Gets param from URL.
    //Called whenever URL changes
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.communityId = +params.get('communityId');
    });

    console.log(JSON.stringify(this.user.experience));
  }

  ngOnDestroy() {
    this.rootCommunitiesSub.unsubscribe();
    this.selectedCommunitySub.unsubscribe();
    this.userSub.unsubscribe();
    this.loggedInSub.unsubscribe();
  }


  changeOrderByValue($event) {
    this.orderByValue = $event;
  }

  changeSelectedPost(post: Post) {
    this.postsService.changeSelectedPost(post);
  }

  reportPost(post: Post) {
    this.postsService.reportPost(post);
  }

  upvotePost(post: Post, user: User) {
    var up = document.getElementById("thumb_up");
    var down = document.getElementById("thumb_down");
    if(up.style.color === "rgb(0, 0, 0)") { up.style.color = "rgb(0, 145, 255)"; } else { up.style.color = "rgb(0, 0, 0)"; }
    down.style.color = "rgb(0, 0, 0)";
    this.postsService.upvotePost(post, user)
  }

  downvotePost(post: Post, user: User) {
    var up = document.getElementById("thumb_up");
    var down = document.getElementById("thumb_down");
    if(down.style.color === "rgb(0, 0, 0)") { down.style.color = "rgb(0, 145, 255)"; } else { down.style.color = "rgb(0, 0, 0)"; }
    up.style.color = "rgb(0, 0, 0)";
    this.postsService.downvotePost(post, user)
  }

  //If you click one of the subcommunities
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

  noRouting(e) {
    e.stopPropagation();
  }

  //Copies the absolute URL to clipboard
  copyURLOfPost(post: Post) {
    if (this.postsService.copyURLToClipboard(post)) {
      this.sharedService.openSnackBarMessage("Link copied to clipboard", "Ok");
    }
  }


  loadMorePosts() {
    this.sharedService.feedPagination += 2;

    //If it's the all feed
    if (this.router.url === "/communities/all") {
      this.postsService.paginatePosts(this.sharedService.feedPagination);
    }
    //Personal feed
    else if (this.router.url === "/communities/your") {
      this.postsService.paginateForUser(this.user, this.sharedService.feedPagination);
    }
    //Normal community feed
    else {
      this.postsService.paginateFromCommunity(this.communityId, this.sharedService.feedPagination);
    }

  }

  getColor(tag) {
    switch(tag) {
      case 'Sharing advice':
        return 'green';
      case 'Seeking advice':
        return 'red';
      case 'Question':
        return 'blue';
    }
  }
}
