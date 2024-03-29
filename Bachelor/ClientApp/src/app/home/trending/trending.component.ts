import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Industry } from '../../Models/Users/Industry';
import { Community } from '../../Models/Communities/Community';
import { FeedPageComponent } from '../../Communities/feed/feedPage.component';
import { Post } from '../../Models/Communities/Post';
import { SharedService } from '../../Communities/shared/shared.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostsService } from '../../Communities/shared/posts/posts.service';
import { User } from '../../Models/Users/User';
import { Subscription } from 'rxjs';
import { UserService } from '../../Users/users.service';
import { PostTag } from '../../Models/Communities/PostTag';


@Component({
  selector: 'trending-posts',
  templateUrl: './trending.component.html',
  styleUrls: [ './trending.component.css' ],
  providers: [SharedService, PostsService]
})

export class TrendingComponent {
  public allIndustries: Array<Industry>;
  public allCommunities: Array<Community>;
  public trendingPosts: Array<Post>;

  allPosts: Post[];
  allPostsSub: Subscription;

  selectedPost = new Post();
  selectedPostSub: Subscription;

  user: User;
  userSub: Subscription;
  
  loggedIn: boolean;
  loggedInSub: Subscription;

  postId: number;
  communityId: number;


  constructor(
    private _http: HttpClient,
    private userService: UserService,
    private postsService: PostsService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userSub = this.userService.userCurrent.subscribe(user => this.user = user);
    this.loggedInSub = this.userService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.selectedPostSub = this.postsService.selectedPostCurrent.subscribe(post => this.selectedPost = post);
    this.allPostsSub = this.postsService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
    this.getCommunitites();
    this.getTrendingPosts();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.loggedInSub.unsubscribe();
  }

  // Gets list of communities
  getCommunitites() {
    this._http.get<Community[]>("api/Community/GetAllCommunities").subscribe(data => {
      this.allCommunities = data;
    },
      error => console.log(error)
    );
  }


  // Gets trending posts
  getTrendingPosts() {
    this._http.get<Post[]>("api/Post/GetTrending").subscribe(data => {
      this.trendingPosts = data;
    },
      error => console.log(error)
    )
  }

  //Calls to service
  reportPost(post: Post) {
    this.postsService.reportPost(post);
  }

  //Calls to service
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

  // Clicking on voting buttons won't route to the post
  noRouting(e) {
    e.stopPropagation();
  }

  //Copies URL for a post to clipboard
  copyURLOfPost(post: Post) {
    if (this.postsService.copyURLToClipboard(post)) {
      this.sharedService.openSnackBarMessage("Link copied to clipboard", "Ok");
    }
  }

  // Navigates to community
  navigateToCommunity(value) {
    this._http.get<Community[]>("api/Community/GetAllCommunities").subscribe(data => {
      this.allCommunities = data;
    }, 
      error => console.log(error)
    )


    let findCommunity = this.allCommunities.find( ({title}) => title === value);
    const selectedCommunityId = findCommunity.id;

    this.router.navigateByUrl("/communities/" + selectedCommunityId);
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
