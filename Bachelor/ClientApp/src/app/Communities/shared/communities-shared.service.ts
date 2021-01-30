import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Community } from '../../Models/Community';
import { Post } from '../../Models/Post';

@Injectable()
export class CommunitiesService {


  public allCommunitiesSource = new BehaviorSubject<Community[]>([]);  //List of all communities
  public allCommunitiesCurrent = this.allCommunitiesSource.asObservable();

  public topCommunitiesSource = new BehaviorSubject<Community[]>([]); //Current top communities shown on the side
  public topCommunitiesCurrent = this.topCommunitiesSource.asObservable();

  public selectedCommunitySource = new BehaviorSubject<Community>(new Community());     //The community the user currently has selected
  public selectedCommunityCurrent = this.selectedCommunitySource.asObservable();

  public allPostsSource = new BehaviorSubject<Post[]>([]);     //Posts from selected community
  public allPostsCurrent = this.allPostsSource.asObservable();


  private messageSource = new BehaviorSubject<string>("Default Message");

  currentMessage = this.messageSource.asObservable();


  constructor(private _http: HttpClient, public _snackBar: MatSnackBar) {
    //this.allCommunities = new Array<Community>();
    //this.observableAllCommunities = <BehaviorSubject<Community[]>>new BehaviorSubject([]);

    //this.topCommunities = new Array<Community>();
    //this.observableTopCommunities = <BehaviorSubject<Community[]>>new BehaviorSubject([]);

    //this.selectedCommunity = new Community();
    //this.observableSelectedCommunity = <BehaviorSubject<Community>>new BehaviorSubject(new Community());

    //this.communityPosts = new Array<Post>();
    //this.observableCommunityPosts = <BehaviorSubject<Post[]>>new BehaviorSubject([]);
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
    console.log(this.currentMessage);
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

  changeAllPosts(post: Post[]) {
    this.allPostsSource.next(post);
  }

  /*
  getPostsObservable(community: Community) {
    this.allPostsObservable = this._http.get<Post[]>("api/Community/GetPostsFromCommunity/" + community.id)
  }*/

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

  getPostsForCommunity(community: Community) {
    this._http.get<Post[]>("api/Community/GetPostsFromCommunity/" + community.id)
      .subscribe(data => {
        this.changeAllPosts(data);
      },
        error => console.log(error)
    );
  }

  getPostsForCommunityId(Id: number) {
    this._http.get<Post[]>("api/Community/GetPostsFromCommunity/" + Id)
      .subscribe(data => {
        this.changeAllPosts(data);
      },
        error => console.log(error)
      );
  }

  selectCommunity(community: Community) {
    this.changeSelectedCommunity(community);
    this.getPostsForCommunity(community);
  }


  sendPost(post: Post) {
    this._http.post("api/Community/Publish", post, { responseType: 'text' })
      .subscribe(response => {
        if (response == "Post published") {
          //this.getPostsForCommunity(this.selectedCommunity);
          this.openSnackBarMessage("Post was published in " + post.community.title, "Ok");
        }
      });
  }

  openSnackBarMessage(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.horizontalPosition = "center";
    config.verticalPosition = "bottom";
    config.duration = 6000;

    this._snackBar.open(message, action, config);
  }
}

