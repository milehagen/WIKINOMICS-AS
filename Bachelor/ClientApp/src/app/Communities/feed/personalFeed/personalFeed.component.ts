import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
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
  allPosts: Post[];
  allPostsSub: Subscription;
  user: User;
  userSub: Subscription;



  constructor(
    private sharedService: SharedService,
    private communitiesService: CommunitiesService,
    private commentsService: CommentsService,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit() {
    this.userSub = this.sharedService.userCurrent.subscribe(user => this.user = user);
    this.allPostsSub = this.postsService.allPostsCurrent.subscribe(posts => this.allPosts = posts);

    if (this.sharedService.loggedIn) {
      console.log("Am logged in");
    } else {
      console.log("Whyyyy dude");
    }

    console.log(this.sharedService.user);

  }

  getPosts() {
    if (this.allPosts.length == 0) {
      console.log(this.user);
      console.log(this.sharedService.feedPagination);
      this.postsService.paginateForUser(this.user, this.sharedService.feedPagination);
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.allPostsSub.unsubscribe();
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

  loadMorePosts() {
    this.sharedService.feedPagination += 2;

    this.postsService.paginatePosts(this.sharedService.feedPagination);
  }
}
