import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Post } from "../../../Models/Communities/Post";
import { User } from "../../../Models/User";
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
    console.log("init");

    this.postsService.paginatePosts(this.sharedService.feedPagination);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.allPostsSub.unsubscribe();
  }

  loadMorePosts() {
    this.sharedService.feedPagination += 2;

    this.postsService.paginatePosts(this.sharedService.feedPagination);
    console.log(this.sharedService.feedPagination);
  }
}
