import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Industry } from '../../Models/Users/industry';
import { Community } from '../../Models/Communities/Community';
import { FeedPageComponent } from '../../Communities/feed/feedPage.component';
import { Post } from '../../Models/Communities/Post';
import { SharedService } from '../../Communities/shared/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'trending-posts',
  templateUrl: './trending.component.html',
  styleUrls: [ './trending.component.css' ],
})

export class TrendingComponent {
  public allIndustries: Array<Industry>;
  public allCommunities: Array<Community>;
  public trendingPosts: Array<Post>;

  loggedIn: boolean;

  

  @ViewChild('widgetsContent', {static: false}) widgetsContent: ElementRef;

  constructor(private _http: HttpClient, private sharedService: SharedService, private router: Router) { }

  ngOnInit() {
    this.sharedService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);

    this.listIndustries();
    this.getTrendingPosts();
  }

  // Gets list of communities
  listIndustries() {
    this._http.get<Community[]>("api/Community/GetAllCommunities").subscribe(data => {
      this.allCommunities = data;
    },
      error => console.log(error)
    );
  }


  // Gets trending posts
  getTrendingPosts() {
    this._http.get<Post[]>("api/Post/GetTrending").subscribe(data => {
      this.trendingPosts = data;
    },
      error => console.log(error)
    )
  }

  // Clicking on voting buttons won't route to the post
  noRouting(e) {
    e.stopPropagation();
  }

  // Navigates to community
  navigateToCommunity(value) {
    this._http.get<Community[]>("api/Community/GetAllCommunities").subscribe(data => {
      this.allCommunities = data;
    }, 
      error => console.log(error)
    )


    let findCommunity = this.allCommunities.find( ({title}) => title === value);
    const selectedCommunityId = findCommunity.id;

    this.router.navigateByUrl("/communities/" + selectedCommunityId);
  }
  
}
