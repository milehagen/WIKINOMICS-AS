import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { Community } from '../Models/Community';
import { Post } from '../Models/Post';
import { User } from '../Models/User';


@Component({
  selector: 'app-home',
  templateUrl: './communities.component.html',
})

export class CommunitiesComponent {
  public allCommunities: Array<Community>; //List of all communities
  public topCommunities: Array<Community>; //Current top communities shown on the side
  public selectedCommunity: Community;     //The community the user currently has selected
  public communityPosts: Array<Post>;      //Posts from selected community

  public postForm: FormGroup;
  public loggedIn: boolean;
  public commentFieldToggle: Array<boolean> = [];
  public user: User;
  public currentTime: Date;

  public commentForm = new FormGroup({
    textComments: new FormArray([
      new FormControl(''),
      new FormControl(''),
      new FormControl(''),
      new FormControl(''),
    ])
  });

  get textComments() {
    return this.commentForm.get('textComments') as FormArray;
  }

  postValidation = {
    textPost: [
      null, Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(1000)])
    ]
  }

  /*
  commentValidation = {
    textComments: this.fb.array([
      this.fb.control('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(250)]))
    ])
  }*/

  constructor(private _http: HttpClient, private fb: FormBuilder, public _snackBar: MatSnackBar) {
    this.postForm = fb.group(this.postValidation);
    //this.commentForm = this.fb.group(this.commentValidation);
  }


  ngOnInit() {
    this.getCommunities();
    this.checkLogin();
    this.currentTime = new Date();
  }

  //Adds new form checking for comments under posts
  addCommentForm(index: number) {
    console.log("Index: " + index);
    this.textComments.insert(2, new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(250)])));
    console.log(this.textComments);

    this.commentFieldToggle[index] = true;
  }

  //Gets all communities from backend
  getCommunities() {
    this._http.get<Community[]>("api/Community/GetAllCommunities")
      .subscribe(data => {

        this.allCommunities = data;
        this.topCommunities = data;
        this.selectedCommunity = this.allCommunities[0];
        this.getPostsForCommunity(this.selectedCommunity);
      },
        error => console.log(error)
      );
  }

  //When user selects new community
  selectCommunity(community: Community) {
    this.selectedCommunity = community;
    this.getPostsForCommunity(community);

  }

  expandPost(post: Post) {
    console.log("Post with ID " + post.id);
  }

  //Gets posts for selected community
  getPostsForCommunity(community: Community) {
    this._http.get<Post[]>("api/Community/GetPostsFromCommunity/" + community.id)
      .subscribe(data => {
        this.communityPosts = data;
        this.makeCommentFormArray(this.communityPosts.length)
      },
        error => console.log(error)
      );
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
      post.community = this.selectedCommunity;
      post.date = new Date();

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
            this.openSnackBarMessage("Post was published in " + post.community.title, "Ok");
          }
        });
    }
  }

  //Shows comment textarea and adds it to FormArray for validation
  createCommentField() {
    console.log("test");
  }

  //Opens a little dialog
  openSnackBarMessage(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.horizontalPosition = "center";
    config.verticalPosition = "bottom";
    config.duration = 6000;

    this._snackBar.open(message, action, config);
  }

}


