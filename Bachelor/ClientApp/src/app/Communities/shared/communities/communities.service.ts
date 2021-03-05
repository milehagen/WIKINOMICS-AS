import { Community } from "../../../Models/Communities/Community";
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { CommentsService } from "../comments/comments.service";
import { SharedService } from "../shared.service";
import { Injectable } from "@angular/core";
import { User } from "../../../Models/User";

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
    private sharedService: SharedService) {
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

  subscribe(community: Community, user: User) {
    this._http.patch<User>("api/User/Subscribe/" + user.id, community)
      .subscribe(response => {
        //Get the user so the object is updated with new community subscription
        this.sharedService.getUser(user.id);
        this.sharedService.openSnackBarMessage("Subscribed to " + community.title, "Ok");
      });
  }

  unsubscribe(community: Community, user: User) {
    this._http.patch<User>("api/User/Unsubscribe/" + user.id, community)
      .subscribe(response => {
        //Get the user so the object is updated with new community subscription
        this.sharedService.getUser(user.id);
        this.sharedService.openSnackBarMessage("Unsubscribed from " + community.title, "Ok");
      });
  }

}
