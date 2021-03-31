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
  selector: 'all-component',
  templateUrl: './all.component.html',
  styleUrls: ['../../CommunitiesStyle.css'],
  providers: []
})


export class AllComponent implements OnInit {
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
  ) {}


  ngOnInit() {
    this.userSub = this.sharedService.userCurrent.subscribe(user => this.user = user);
    this.allPostsSub = this.postsService.allPostsCurrent.subscribe(posts => this.allPosts = posts);

    if (this.allPosts.length <= 0) {
      this.postsService.paginatePosts(this.sharedService.feedPagination);
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.allPostsSub.unsubscribe();
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

  changeSelectedPost(post: Post) {
    this.postsService.changeSelectedPost(post);
  }

  loadMorePosts() {
    this.sharedService.feedPagination += 2;

    this.postsService.paginatePosts(this.sharedService.feedPagination);
  }
}
