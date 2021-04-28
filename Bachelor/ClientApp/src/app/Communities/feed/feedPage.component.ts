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
  selector: 'feedPage-component',
  templateUrl: './feedPage.component.html',
  styleUrls: ['../CommunitiesStyle.css'],
  providers: []
})

export class FeedPageComponent implements OnInit{

  selectedCommunity = new Community();
  selectedCommunitySub: Subscription;

  allCommunities: Community[];
  allCommunitiesSub: Subscription;

  rootCommunities: Community[];
  rootCommunitiesSub: Subscription;

  allPosts: Post[];
  allPostsSub: Subscription;
  allPostsObs: Observable<Post[]>;

  allPostTags: PostTag[];
  allPostTagsSub: Subscription;

  user: User;
  userSub: Subscription;

  loggedIn: boolean;
  loggedInSub: Subscription;

  communityId: number;
  public postForm: FormGroup;
  showPublishSectionToggle: boolean;
  usePostTag: boolean;
  postAnonymously: boolean;
  subscribed: number;
  orderByValue: string;


  postValidation = {
    textPost: [
      null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZæøåÆØÅ., \-\s\S]{3,1000}$")])
    ],
    postTagField: [
      { value: '', disabled: true }, Validators.compose([Validators.required])
    ],
    identityField: [
      null, Validators.compose([Validators.required])
    ],
    experienceField: [
      null, Validators.compose([Validators.required])
    ]
  }


  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private communitiesService: CommunitiesService,
    private commentsService: CommentsService,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.postForm = fb.group(this.postValidation);
  }

  //Start up
  ngOnInit() {
    //Subscribe to things we need from services
    this.userSub = this.userService.userCurrent.subscribe(user => this.user = user);
    this.loggedInSub = this.userService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.selectedCommunitySub = this.communitiesService.selectedCommunityCurrent.subscribe(community => this.selectedCommunity = community);
    this.allCommunitiesSub = this.communitiesService.allCommunitiesCurrent.subscribe(communities => this.allCommunities = communities);
    this.rootCommunitiesSub = this.communitiesService.rootCommunitiesCurrent.subscribe(communities => this.rootCommunities = communities);
    this.allPostTagsSub = this.postsService.allPostTagsCurrent.subscribe(postTag => this.allPostTags = postTag);
    this.allPostsSub = this.postsService.allPostsCurrent.subscribe(posts => this.allPosts = posts);

    //Gets param from URL.
    //Called whenever URL changes
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.communityId = +params.get('communityId');

      //If the array of all Communities is already gotten, we don't bother backend
      if (this.allCommunities.length > 0) {
        this.communitiesService.changeSelectedCommunity(this.allCommunities.find(c => c.id === this.communityId));
      } else {
        this.communitiesService.getCommunity(this.communityId);
      }

      //If there currently are no tags, we get them
      if (this.allPostTags == null || this.allPostTags.length == 0) {
        this.postsService.getPostTags();
      }

      //Checking if user is subbed to community
      this.subscriptionCheck();

      //If posts for this community is already loaded we don't do it again
      //This to prevent duplicate loads when going in and out of posts
      if (this.allPosts.length < 1) {
        this.postsService.paginateFromCommunity(this.communityId, this.sharedService.feedPagination);
      }
    });
  }

  ngOnDestroy() {
    this.allCommunitiesSub.unsubscribe();
    this.rootCommunitiesSub.unsubscribe();
    this.allPostsSub.unsubscribe();
    this.allPostTagsSub.unsubscribe();
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

  //Checks if a logged in user is subscribed to the community or not
  subscriptionCheck() {
    if (this.user.communities) {
      if (this.user.communities.find(({ id }) => id === this.selectedCommunity.id)) {
        this.subscribed = 1;
      } else {
        this.subscribed = 0;
      }

    } else {
      this.subscribed = -1;
    }
  }

  //Calls service function for subscribing
  async subscribe(community: Community, user: User) {
    var okSub = await this.communitiesService.subscribe(community, user);

    if (okSub) {
      var okUser = await this.sharedService.getUser(user.id + "");
      this.sharedService.openSnackBarMessage("Subscribed to " + community.title, "Ok");

      if (okUser) {
        this.subscriptionCheck();
      }
    }
  }

  //Calls service function for unsubscribing
  async unsubscribe(community: Community, user: User) {
    var okUnsub = await this.communitiesService.unsubscribe(community, user);

    if (okUnsub) {
      var okUser = await this.sharedService.getUser(user.id + "");
      this.sharedService.openSnackBarMessage("Unsubscribed from " + community.title, "Ok");

      if (okUser) {
        this.subscriptionCheck();
      }
    }
  }

  reportPost(post: Post) {
    this.postsService.reportPost(post);
  }

  upvotePost(post: Post, user: User) {
    this.postsService.upvotePost(post, user)
  }

  downvotePost(post: Post, user: User) {
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


  //If user wants to add a tag, we include it in validation
  postTagToggle() {
    if (this.usePostTag) {
      this.postForm.controls['postTagField'].enable();
    } else {
      this.postForm.controls['postTagField'].disable();
    }
  }

  //Wheter to show the publish section or not
  showPublishSection() {
    if (this.loggedIn) {
      this.showPublishSectionToggle = !this.showPublishSectionToggle;
      this.postForm.patchValue({ textPost: "" });
    } else {
      this.sharedService.openSnackBarMessage("You have to be logged in to post!", "Ok");
    }
  }

  //Setting up to publish a post, gets sent to Post Service
  async sendPost(post: Post) {
    if (this.loggedIn) {
      var post = new Post();
      post.text = this.postForm.value.textPost;
      post.community = this.selectedCommunity;
      post.date = new Date().toJSON();
      post.user = this.user;

      if (this.usePostTag) {
        post.postTag = this.postForm.value.postTagField;
      }


      if (this.postForm.value.identityField === "null") {
        post.anonymous = true;
      } else { post.anonymous = false; }

      //Add experience to Post
      if (this.postForm.value.experienceField !== "null") {
        post.experience = this.postForm.value.experienceField;
      }

      if (await this.postsService.sendPost(post)) {
        this.showPublishSectionToggle = false;
        this.postForm.patchValue({ textPost: "" });
      } else {
        console.log("Else in posting");
      }
    }
  }

  noRouting(e) {
    e.stopPropagation();
  }

  loadMorePosts() {
    this.sharedService.feedPagination += 2;

    this.postsService.paginateFromCommunity(this.communityId, this.sharedService.feedPagination);
  }
}
