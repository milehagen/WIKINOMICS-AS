import { Community } from "../../../Models/Communities/Community";
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { CommentsService } from "../comments/comments.service";
import { SharedService } from "../shared.service";
import { PostsService } from "../posts/posts.service";
import { Injectable } from "@angular/core";

@Injectable()
export class CommunitiesService {
  //List of all communities
  public allCommunitiesSource = new BehaviorSubject<Community[]>([]);
  public allCommunitiesCurrent = this.allCommunitiesSource.asObservable();

  //Current top communities shown on the side
  public topCommunitiesSource = new BehaviorSubject<Community[]>([]);
  public topCommunitiesCurrent = this.topCommunitiesSource.asObservable();

  //The community the user currently has selected
  public selectedCommunitySource = new BehaviorSubject<Community>(new Community());
  public selectedCommunityCurrent = this.selectedCommunitySource.asObservable();

  constructor(
    private _http: HttpClient,
    private postsService: PostsService) {
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

  //Gets all communites and adds data to correct variabels
  getCommunities() {
    this._http.get<Community[]>("api/Community/GetAllCommunities")
      .subscribe(data => {
        this.changeAllCommunities(data);
        this.changeTopCommunities(data);
        this.changeSelectedCommunity(this.selectedCommunityCurrent[0]);
        this.postsService.changeAllPosts(this.selectedCommunityCurrent[0]);
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
}
