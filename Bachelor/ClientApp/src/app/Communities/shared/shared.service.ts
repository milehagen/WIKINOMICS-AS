import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '../../Models/Communities/Comment';
import { Community } from '../../Models/Communities/Community';
import { Post } from '../../Models/Communities/Post';
import { PostTag } from '../../Models/Communities/PostTag';
import { UserPostVote } from '../../Models/Communities/UserPostVote';
import { User } from '../../Models/User';

@Injectable()
export class SharedService {

  //User that is logged in
  public userSource = new BehaviorSubject<User>(new User());
  public userCurrent = this.userSource.asObservable();

  //List of all communities
  public allCommunitiesSource = new BehaviorSubject<Community[]>([]);
  public allCommunitiesCurrent = this.allCommunitiesSource.asObservable();

  //Current top communities shown on the side
  public topCommunitiesSource = new BehaviorSubject<Community[]>([]);
  public topCommunitiesCurrent = this.topCommunitiesSource.asObservable();

  //The community the user currently has selected
  public selectedCommunitySource = new BehaviorSubject<Community>(new Community());
  public selectedCommunityCurrent = this.selectedCommunitySource.asObservable();

  //Posts from selected community
  public allPostsSource = new BehaviorSubject<Post[]>([]);
  public allPostsCurrent = this.allPostsSource.asObservable();

  //The post the user is viewing
  public selectedPostSource = new BehaviorSubject<Post>(new Post());
  public selectedPostCurrent = this.selectedPostSource.asObservable();

  //Tags that can be applied to new posts
  public allPostTagsSource = new BehaviorSubject<PostTag[]>([]);
  public allPostTagsCurrent = this.allPostTagsSource.asObservable();

  loggedIn: boolean;


  constructor(private _http: HttpClient, public _snackBar: MatSnackBar) {
  }

  changeUser(user: User) {
    this.userSource.next(user);
  }

  changeAllCommunities(communities: Community[]) {
    this.allCommunitiesSource.next(communities);
  }

  changeTopCommunities(communities: Community[]) {
    this.topCommunitiesSource.next(communities);
  }

  changeSelectedCommunity(community: Community) {
    this.selectedCommunitySource.next(community);
  }

  changeAllPosts(posts: Post[]) {
    this.allPostsSource.next(posts);
  }

  changeSelectedPost(post: Post) {
    this.selectedPostSource.next(post);
  }

  changeAllPostTags(postTags: PostTag[]) {
    this.allPostTagsSource.next(postTags);
  }

  //Gets a user
  getUser(userId: number) {
    this._http.get<User>("api/User/GetUser/" + userId)
      .subscribe(data => {
        this.changeUser(data);
      })
  }

  //Gets all communites and adds data to correct variabels
  getCommunities() {
    this._http.get<Community[]>("api/Community/GetAllCommunities")
      .subscribe(data => {
        this.changeAllCommunities(data);
        this.changeTopCommunities(data);
        this.changeSelectedCommunity(this.selectedCommunityCurrent[0]);
        this.changeAllPosts(this.selectedCommunityCurrent[0]);
      },
        error => console.log(error)
      );
  }

  getCommunity(communityId: number) {
    this._http.get<Community>("api/Community/GetCommunity/" + communityId)
      .subscribe(data => {
        this.changeSelectedCommunity(data);
      },
        error => console.log(error)
      );
  }

  getPostsForCommunity(communityId: number) {
    this._http.get<Post[]>("api/Community/GetPostsFromCommunity/" + communityId)
      .subscribe(data => {
        this.changeAllPosts(data);
      },
        error => console.log(error)
    );
  }

  getPost(Id: number) {
    this._http.get<Post>("api/Community/GetPost/" + Id)
      .subscribe(data => {
        this.changeSelectedPost(data);
      },
        error => console.log(error)
      );
  }

  getPostTags() {
    this._http.get<PostTag[]>("api/Community/GetPostTags")
      .subscribe(data => {
        this.changeAllPostTags(data);
      },
        error => console.log(error)
      );
  }

  //Generates a semi random ID for guest users, stored in session
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

  //checks if you logged in or already have a tempID, if not a temporary ID is generated.
  //This ID is used to keep track of you in threads and posts
  async checkLogin(): Promise<boolean> {
    this.loggedIn = false;
    var tempID = sessionStorage.getItem("tempID");

    if (tempID == null) {
      this.generateTempID();
    }
    return true;
  }

  //Opens a notification at the bottom of the page
  openSnackBarMessage(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.horizontalPosition = "center";
    config.verticalPosition = "bottom";
    config.duration = 6000;

    this._snackBar.open(message, action, config);
  }
}

