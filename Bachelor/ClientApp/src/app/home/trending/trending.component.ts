import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Industry } from '../../Models/Users/industry';
import { Community } from '../../Models/Communities/Community';
import { FeedPageComponent } from '../../Communities/feed/feedPage.component';
import { Post } from '../../Models/Communities/Post';
import { SharedService } from '../../Communities/shared/shared.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostsService } from 'src/app/Communities/shared/posts/posts.service';
import { User } from 'src/app/Models/Users/User';
import { Subscription } from 'rxjs';


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


  constructor(private _http: HttpClient, private sharedService: SharedService, private postsService: PostsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userSub = this.sharedService.userCurrent.subscribe(user => this.user = user);
    this.loggedInSub = this.sharedService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.selectedPostSub = this.postsService.selectedPostCurrent.subscribe(post => this.selectedPost = post);
    this.allPostsSub = this.postsService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
    this.listIndustries();
    this.getTrendingPosts();
    this.callGetUserIdCookie();

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postId = +params.get('postId');
      this.communityId = +params.get('communityId');
      this.postsService.getPost(this.postId);

      // if (this.allCommunities.length > 0) {
      //   this.communitiesService.changeSelectedCommunity(this.allCommunities.find(c => c.id === this.communityId));
      // } else {
      //   this.communitiesService.getCommunity(this.communityId);
      // }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.loggedInSub.unsubscribe();
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

  // Gets list of communities
  listIndustries() {
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
    this.postsService.upvotePost(post, user)
  }

  //Calls to service
  downvotePost(post: Post, user: User) {
    this.postsService.downvotePost(post, user)
  }

  // Clicking on voting buttons won't route to the post
  noRouting(e) {
    e.stopPropagation();
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
  
}
