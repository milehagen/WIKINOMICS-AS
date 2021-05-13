import { Community } from '../../Models/Communities/Community';
import { Post } from '../../Models/Communities/Post';
import { Comment } from '../../Models/Communities/Comment';
import { User } from '../../Models/Users/User';

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CommunitiesService } from '../shared/communities/communities.service';
import { PostsService } from '../shared/posts/posts.service';
import { CommentsService } from '../shared/comments/comments.service';
import { SharedService } from '../shared/shared.service';
import { Observable, Subscription } from 'rxjs';
import { NotificationService } from '../../Notification/notification.service';
import { NotificationSubscriberComponent } from '../../Notification/notificationSubscriber.component';
import { UserService } from '../../Users/users.service';


@Component({
  selector: 'post-component',
  templateUrl: './posts.component.html',
  styleUrls: ['../CommunitiesStyle.css'],
  providers: []
})

export class PostsComponent implements OnInit {
  selectedPost = new Post();
  selectedPostSub: Subscription;

  selectedCommunity = new Community();
  selectedCommunitySub: Subscription;

  allPosts: Post[];
  allPostsSub: Subscription;

  allCommunities: Community[];
  allCommunitiesSub: Subscription;

  user: User;
  userSub: Subscription;

  loggedIn: boolean;
  loggedInSub: Subscription;

  subscribedForNotification: boolean;
  subscribedForNotificationSub: Subscription

  postId: number;
  communityId: number;
  public commentForm: FormGroup;
  commentAnonymously: boolean;
  respondTo: Comment;  //Comment user wish to respond to
  highligtedIndex: number; //Index of comment that should be highlighted

  commentValidation = {
    textComment: [
      null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])
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
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _location: Location)
  {
    this.commentForm = fb.group(this.commentValidation);
    this.commentForm.controls['identityField'].setValue('');
    this.commentForm.controls['experienceField'].setValue('');
  }

  //Subscribes to URL parameter and what post is currently selected
  ngOnInit() {
    this.userSub = this.userService.userCurrent.subscribe(user => this.user = user);
    this.selectedCommunitySub = this.communitiesService.selectedCommunityCurrent.subscribe(community => this.selectedCommunity = community);
    this.allCommunitiesSub = this.communitiesService.allCommunitiesCurrent.subscribe(communities => this.allCommunities = communities);
    this.selectedPostSub = this.postsService.selectedPostCurrent.subscribe(post => this.selectedPost = post);
    this.allPostsSub = this.postsService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
    this.loggedInSub = this.userService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.subscribedForNotificationSub = this.notificationService.isSubscribedCurrent.subscribe(isSubbed => this.subscribedForNotification = isSubbed);

    //Get params from url, in-case a person goes directly to URL
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postId = +params.get('postId');
      this.communityId = +params.get('communityId');
      this.postsService.getPost(this.postId);

      //Only get communities if we don't already have them
      if (this.allCommunities.length > 0) {
        this.communitiesService.changeSelectedCommunity(this.allCommunities.find(c => c.id === this.communityId));
      } else {
        this.communitiesService.getCommunity(this.communityId);
      }
    });
  }

  ngOnDestroy() {
    this.allCommunitiesSub.unsubscribe();
    this.allPostsSub.unsubscribe();
    this.selectedCommunitySub.unsubscribe();
    this.selectedPostSub.unsubscribe();
    this.userSub.unsubscribe();
    this.subscribedForNotificationSub.unsubscribe();
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

  //Calls to service
  reportComment(comment: Comment) {
    this.commentsService.reportComment(comment);
  }

  //Calls to service
  upvoteComment(comment: Comment, user: User) {
    this.commentsService.upvoteComment(comment, user)
  }

  //Calls to service
  downvoteComment(comment: Comment, user: User) {
    this.commentsService.downvoteComment(comment, user)
  }

  //Sends notifications to all users that are subscribed to this post
  //But NOT the user given as parameter. This is because it was that user
  //that triggered the notifications
  sendNotification(post: Post, user: User) {
    this.notificationService.sendNotification(post.id, user.id);
  }


  sendNotificationsMail(post: Post, user: User) {
    this.notificationService.sendMail(post, user);
  }


  //Patches comment to the specified post
  async sendComment(post: Post) {
    //Checks if you are logged in
    if (this.loggedIn) {
      let comment = new Comment();
      comment.post = post;
      comment.text = this.commentForm.value.textComment;
      comment.user = this.user;
      comment.date = new Date().toJSON();
      comment.upvotes = 0;
      comment.downvotes = 0;
      comment.orderInThread = post.comment.length + 1;

      //If responding to a comment
      if (this.respondTo) {
        comment.responsTo = this.respondTo;
      }

      //If an identity should be used
      if (this.commentForm.value.identityField === "null") {
        comment.anonymous = true;
      } else { comment.anonymous = false; }


      //Which experience to use
      if (this.commentForm.value.experienceField !== "null") {
        comment.experience = this.commentForm.value.experienceField;
      }

      //Send the comment to service
      let commentPosting = await this.commentsService.sendComment(post.id, comment);

      //If posting went well, reset fields and such
      //Get new post obj to update comment list
      if (commentPosting) {
        this.commentForm.patchValue({ textComment: "" });
        this.respondTo = null;

        this.postsService.getPost(post.id);
        this.sharedService.openSnackBarMessage("Comment added to Post", "Ok");

        //Sends notification to all users subscribed to the post
        //But not the user that made the comment it self!
        this.sendNotification(post, this.user);
        this.sendNotificationsMail(post, this.user);

        if (!this.subscribedForNotification) {
          this.notificationService.subscribeWithUserPost(this.user, post);
        }
      }
    }
    //Not logged in
    else {
      this.sharedService.openSnackBarMessage("Must be logged in to comment", "Ok");
    }
  }


  //Called if user clicks to respond to specific comment in thread
  //Sets the index
  respondToComment(comment: Comment) {
    this.respondTo = comment;
  }

  //Called if user doesn't want to respond after all
  //Removes the comment index from variabel
  cancelRespons() {
    this.respondTo = null;
  }

  //When a user clicks on the "Reply to comment #x" on a comment that is a respons
  //it highlights that comment
  highlightComment(comment: Comment) {
    this.highligtedIndex = comment.orderInThread;
    let element = document.getElementById("comment" + comment.orderInThread);
    element.scrollIntoView();
  }

  //Finds the index of a comment
  //Used when comments are sorted in various ways
  findIndexForComment(comment: Comment): number {
    var index = this.selectedPost.comment.findIndex(({ id }) => id === comment.id);

    return index + 1;
  }

  //Sends you back to last page
  goBack() {
    this._location.back();
  }

  //Copies URL for a post to clipboard
  copyURLOfPost(post: Post) {
    if (this.postsService.copyURLToClipboard(post)) {
      this.sharedService.openSnackBarMessage("Link copied to clipboard", "Ok");
    }
  }


  // Clicking on voting buttons won't route to the post
  noRouting(e) {
    e.stopPropagation();
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
