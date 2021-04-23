import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { interval, Subscription } from "rxjs";
import { Post } from "../../../Models/Communities/Post";
import { User } from "../../../Models/Users/User";
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

  userId: string;
  userIdSub: Subscription;

  loopSub: Subscription;



  constructor(
    private sharedService: SharedService,
    private communitiesService: CommunitiesService,
    private commentsService: CommentsService,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router) {
  }


  ngOnInit() {
    this.userIdSub = this.sharedService.userIdCurrent.subscribe(userId => this.userId = userId);
    this.allPostsSub = this.postsService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
    this.userSub = this.sharedService.userCurrent.subscribe(user => this.user = user);
    this.loggedInSub = this.sharedService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
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
  }

  //Checks if a user is ready to be used for fetching 
  checkUserIsDefined() {
    if (this.loggedIn) {
      this.getPosts();
      this.loopSub.unsubscribe();
    }
    console.log("Not logged in yet");
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
