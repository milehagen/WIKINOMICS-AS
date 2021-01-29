import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { Community } from '../Models/Community';
import { Post } from '../Models/Post';
import { User } from '../Models/User';
import { CommunitiesService } from './shared/communities-shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './communities.component.html',
  providers: [CommunitiesService]
})

export class CommunitiesComponent {
  /*
  public allCommunities: Array<Community>; //List of all communities
  public topCommunities: Array<Community>; //Current top communities shown on the side
  public selectedCommunity: Community;     //The community the user currently has selected
  public communityPosts: Array<Post>;      //Posts from selected community
  */

  allCommunities: Community[];
  topCommunities: Community[];
  selectedCommunity: Community;
  allPosts: Post[];

  public postForm: FormGroup;
  public loggedIn: boolean;
  public commentFieldToggle: Array<boolean> = [];
  public user: User;
  public currentTime: Date;


  postValidation = {
    textPost: [
      null, Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(1000)])
    ]
  }


  constructor(private _http: HttpClient, private fb: FormBuilder, private communitiesService: CommunitiesService) {
    this.postForm = fb.group(this.postValidation);
  }


  ngOnInit() {
    this.communitiesService.allCommunitiesCurrent.subscribe(communities => this.allCommunities = communities);
    this.communitiesService.topCommunitiesCurrent.subscribe(communities => this.topCommunities = communities);
    this.communitiesService.selectedCommunityCurrent.subscribe(community => this.selectedCommunity = community);
    this.communitiesService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
    
    this.getCommunities();

    this.checkLogin();
    this.currentTime = new Date();
  }


  getCommunities() {
    this.communitiesService.getCommunities();
    console.log(this.allCommunities);
  }

  expandPost(post: Post) {
    console.log("Post with ID " + post.id);
  }



  makeCommentFormArray(length: number) {
    for (var i = 0; i < length; i++) {
      this.commentFieldToggle.push(false);
    }
  }


  //checks if you logged in or already have a tempID, if not a temporary ID is generated.
  //This ID is used to keep track of you in threads and posts
  checkLogin() {
    this.loggedIn = false;
    var tempID = sessionStorage.getItem("tempID");

    if (tempID == null) {
      this.generateTempID();
    }
    return true;
  }


  //This ID is used to keep track of you in threads and posts
  generateTempID() {
    let tempID: string = "Anon";
    let date = Date.now();
    let randomNumberLarge = Math.floor(Math.random() * 1000) + 1;
    let randomNumberSmall = Math.floor(Math.random() * 9) + 1;

    let randomID = (date * randomNumberLarge) - randomNumberSmall * randomNumberLarge;
    tempID += randomID;

    sessionStorage.setItem("tempID", tempID);

    return true;
  }

  sendPost() {
    if (this.checkLogin()) {
      var post = new Post();
      post.text = this.postForm.value.textPost;
      //post.community = this.communitiesService.selectedCommunity;
      post.date = new Date();

      if (!this.loggedIn) {
        post.userID = sessionStorage.getItem("tempID");
      }
      //Just temp, change later
      else {
        post.userID = this.user.firstname;
      }

      this.communitiesService.sendPost(post);

      /*
      this._http.post("api/Community/Publish", post, { responseType: 'text' })
        .subscribe(response => {
          if (response == "Post published") {
            this.getPostsForCommunity(this.selectedCommunity);
            this.openSnackBarMessage("Post was published in " + post.community.title, "Ok");
          }
        });
        */
    }
  }

  //Shows comment textarea and adds it to FormArray for validation
  createCommentField() {
    console.log("test");
  }

}


