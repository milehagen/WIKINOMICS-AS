import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Community } from '../Models/Community';
import { Post } from '../Models/Post';
import { User } from '../Models/User';

@Component({
  selector: 'app-home',
  templateUrl: './communities.component.html',
})

export class CommunitiesComponent {
  public allCommunities: Array<Community>;
  public selectedCommunity: Community;
  public communityPosts: Array<Post>;

  public postForm: FormGroup;
  public loggedIn: boolean;
  public user: User;


  formValidation = {
    textPost: [
      null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1000)])
    ]
  }

  constructor(private _http: HttpClient, private fb: FormBuilder) {
    this.postForm = fb.group(this.formValidation)
  }


  ngOnInit() {
    this.getCommunities();
    this.checkLogin();

  }

  //Gets all communities from backend
  getCommunities() {
    this._http.get<Community[]>("api/Community/GetAllCommunities")
      .subscribe(data => {
        this.allCommunities = data;
        this.selectedCommunity = this.allCommunities[0];
        this.getPostsForCommunity(this.selectedCommunity);
      },
        error => console.log(error)
      );
  }

  //When user selects new community
  selectCommunity(community: Community) {
    this.getPostsForCommunity(community);
  }

  //Gets posts for selected community
  //TODO: Fix on backend
  getPostsForCommunity(community: Community) {
    this._http.get<Post[]>("api/Community/GetPostsFromCommunity/" + community.id)
      .subscribe(data => {
        this.communityPosts = data;
      },
        error => console.log(error)
      );
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

  //Does some checking to see if a post can be published
  //Not used right now
  postChecks() {
    if (this.checkLogin()) {

    }
  }

  sendPost() {
    if (this.checkLogin()) {
      var post = new Post();
      post.text = this.postForm.value.textPost;
      post.community = this.selectedCommunity;
      post.date = new Date();

      console.log("Time: " + post.date);

      if (!this.loggedIn) {
        post.userID = sessionStorage.getItem("tempID");
      }
      //Just temp, change later
      else {
        post.userID = this.user.firstname;
      }

      this._http.post("api/Community/Publish", post, { responseType: 'text' })
        .subscribe(response => {
          if (response == "Post published") {
            this.getPostsForCommunity(this.selectedCommunity);
          }
        });
    }
  }
}
