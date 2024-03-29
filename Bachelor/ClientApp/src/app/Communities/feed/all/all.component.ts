import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
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
    private router: Router
  ) {
  }


  ngOnInit() {
    this.userSub = this.userService.userCurrent.subscribe(user => this.user = user);
    this.allPostsSub = this.postsService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
    this.allCommunitiesSub = this.communitiesService.allCommunitiesCurrent.subscribe(communitites => this.allCommunities = communitites);
    this.allPostTagsSub = this.postsService.allPostTagsCurrent.subscribe(tags => this.allPostTags = tags);

    if (this.allPosts.length <= 0) {
      this.postsService.paginatePosts(this.sharedService.feedPagination);
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.allPostsSub.unsubscribe();
    this.allCommunitiesSub.unsubscribe();
    this.allPostTagsSub.unsubscribe();
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

  noRouting(e) {
    e.stopPropagation();
  }
}
