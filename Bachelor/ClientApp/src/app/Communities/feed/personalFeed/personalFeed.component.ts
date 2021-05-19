import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { interval, Subscription } from "rxjs";
import { Community } from "../../../Models/Communities/Community";
import { Post } from "../../../Models/Communities/Post";
import { PostTag } from "../../../Models/Communities/PostTag";
import { User } from "../../../Models/Users/User";
import { UserService } from "../../../Users/users.service";
import { CommentsService } from "../../shared/comments/comments.service";
import { CommunitiesService } from "../../shared/communities/communities.service";
import { PostsService } from "../../shared/posts/posts.service";
import { SharedService } from "../../shared/shared.service";



@Component({
  selector: 'personalFeed-component',
  templateUrl: './personalFeed.component.html',
  styleUrls: ['../../CommunitiesStyle.css'],
  providers: []
})


export class PersonalFeedComponent implements OnInit {
  public allPosts: Post[];
  public allPostsSub: Subscription;

  user: User;
  userSub: Subscription;

  loggedIn: boolean;
  loggedInSub: Subscription;

  userId: number;
  userIdSub: Subscription;

  loopSub: Subscription;

  allCommunities: Community[];
  allCommunitiesSub: Subscription;

  allPostTags: PostTag[];
  allPostTagsSub: Subscription;

  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private communitiesService: CommunitiesService,
    private commentsService: CommentsService,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router) {
  }


  ngOnInit() {
    this.userIdSub = this.userService.userIdCurrent.subscribe(userId => this.userId = userId);
    this.allPostsSub = this.postsService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
    this.userSub = this.userService.userCurrent.subscribe(user => this.user = user);
    this.loggedInSub = this.userService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.allCommunitiesSub = this.communitiesService.allCommunitiesCurrent.subscribe(communitites => this.allCommunities = communitites);
    this.allPostTagsSub = this.postsService.allPostTagsCurrent.subscribe(tags => this.allPostTags = tags);
  }

  ngAfterViewInit() {
    //I'm so sorry for this
    this.loopSub = interval(250).subscribe((x => {
      this.checkUserIsDefined();
    }));
  }

  ngOnDestroy() {
    this.loopSub.unsubscribe();
    this.allPostsSub.unsubscribe();
    this.userSub.unsubscribe();
    this.loggedInSub.unsubscribe();
    this.userIdSub.unsubscribe();
    this.allCommunitiesSub.unsubscribe();
    this.allPostTagsSub.unsubscribe();
  }

  //Checks if a user is ready to be used for fetching 
  checkUserIsDefined() {
    if (this.user.id) {
      this.getPosts();
      this.loopSub.unsubscribe();
    }
  }

  //Gets the initial posts, is only called on startup of page.
  //feed component makes all subsequent calls
  getPosts() {
    if (this.allPosts.length == 0) {
      this.postsService.paginateForUser(this.user, this.sharedService.feedPagination);
    }
  }




  //Calls to service
  reportPost(post: Post) {
    this.postsService.reportPost(post);
  }

  //Calls to service
  upvotePost(post: Post, user: User) {
    this.postsService.upvotePost(post, user)
  }

  //Calls to service
  downvotePost(post: Post, user: User) {
    this.postsService.downvotePost(post, user)
  }

  checkPosts() {
    console.log(this.allPosts);
  }

  checkUser() {
    console.log(this.user);
  }

  changeSelectedPost(post: Post) {
    this.postsService.changeSelectedPost(post);
  }

}
