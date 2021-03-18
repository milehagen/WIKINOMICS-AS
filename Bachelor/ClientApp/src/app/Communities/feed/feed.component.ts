import { Community } from '../../Models/Communities/Community';
import { Post } from '../../Models/Communities/Post';
import { User } from '../../Models/User/User';
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostTag } from '../../Models/Communities/PostTag';
import { UserPostVote } from '../../Models/Communities/UserPostVote';
import { CommentsService } from '../shared/comments/comments.service';
import { PostsService } from '../shared/posts/posts.service';
import { SharedService } from '../shared/shared.service';
import { CommunitiesService } from '../shared/communities/communities.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'feed-component',
  templateUrl: './feed.component.html',
  styleUrls: ['../CommunitiesStyle.css'],
  providers: []
})

export class FeedComponent implements OnInit{

  selectedCommunity = new Community();
  selectedCommunitySub: Subscription;
  allCommunities: Community[];
  allCommunitiesSub: Subscription;
  allPosts: Post[];
  allPostsSub: Subscription;
  allPostTags: PostTag[];
  allPostTagsSub: Subscription;
  user: User;
  userSub: Subscription;

  communityId: number;

  public postForm: FormGroup;

  showPublishSectionToggle: boolean;
  usePostTag: boolean;
  postAnonymously: boolean;
  loggedIn: boolean;
  subscribed: number;
  orderByValue: string;


  postValidation = {
    textPost: [
      null, Validators.compose([Validators.required, Validators.pattern("[a-zA-ZæøåÆØÅ., \-\s\S]{20,1000}$")])
    ],
    postTagField: [
      { value: '', disabled: true }, Validators.compose([Validators.required])
    ]
  }


  constructor(
    private sharedService: SharedService,
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
    this.userSub = this.sharedService.userCurrent.subscribe(user => this.user = user);
    this.selectedCommunitySub = this.communitiesService.selectedCommunityCurrent.subscribe(community => this.selectedCommunity = community);
    this.allCommunitiesSub = this.communitiesService.allCommunitiesCurrent.subscribe(communities => this.allCommunities = communities);
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
      if (this.allPostTags.length <= 0) {
        this.postsService.getPostTags();
      }

      //this.postsService.getPostsForCommunity(this.communityId);
      this.subscriptionCheck();
      this.postsService.paginateFromCommunity(this.selectedCommunity, this.sharedService.feedPagination);

    });
  }

  ngOnDestroy() {
    this.allCommunitiesSub.unsubscribe();
    this.allPostsSub.unsubscribe();
    this.allPostTagsSub.unsubscribe();
    this.selectedCommunitySub.unsubscribe();
    this.userSub.unsubscribe();
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
        console.log("User is subscribed to " + this.selectedCommunity.title);
      } else {
        console.log("User is not subscribed to " + this.selectedCommunity.title);
        this.subscribed = 0;
      }

    } else {
      this.subscribed = -1;
    }
  }

  //If user wants to add a tag, we include it in validation
  postTagToggle() {
    if (this.usePostTag) {
      this.postForm.controls['postTagField'].enable();
    } else {
      this.postForm.controls['postTagField'].disable();
    }
  }

  showPublishSection() {
    if (this.user) {
      this.showPublishSectionToggle = !this.showPublishSectionToggle;
    } else {
      console.log("Not logged in");
    }
  }
 
  sendPost(post: Post) {
    if (this.sharedService.checkLogin()) {
      var post = new Post();
      post.text = this.postForm.value.textPost;
      post.community = this.selectedCommunity;
      post.date = new Date().toJSON();
      post.user = this.user;

      if (this.usePostTag) {
        post.postTag = this.postForm.value.postTagField;
      }

      if (this.postAnonymously) {
        post.anonymous = true;
      } else { post.anonymous = false; }

      //If its a success
      if (this.postsService.sendPost(post)) {
        this.showPublishSectionToggle = false;
        this.postForm.patchValue({ textPost: "" });
      }
    }
  }

  //Primitive "scroll to load more"
  /*
  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20) {
      this.loadMorePosts();
    }
  }
*/

  loadMorePosts() {
    this.sharedService.feedPagination += 2;

    this.postsService.paginateFromCommunity(this.selectedCommunity, this.sharedService.feedPagination);
    console.log(this.sharedService.feedPagination);
  }

}
