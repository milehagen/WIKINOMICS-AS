import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Industry } from '../../Models/Users/industry';
import { Community } from '../../Models/Communities/Community';
import { FeedComponent } from '../../Communities/feed/feed.component';
import { Post } from '../../Models/Communities/Post';


@Component({
  selector: 'trending-posts',
  templateUrl: './trending.component.html',
  styleUrls: [ './trending.component.css' ],
})

export class TrendingComponent {
  public allIndustries: Array<Industry>;
  public allCommunities: Array<Community>;
  public trendingPosts: Array<Post>;
  

  @ViewChild('widgetsContent', {static: false}) widgetsContent: ElementRef;
  
  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this.listIndustries();
    this.getTrendingPosts();
  }

  listIndustries() {
    this._http.get<Industry[]>("api/User/GetAllIndustries").subscribe(data => {
      this.allIndustries = data;
    },
      error => console.log(error)
    );
  }


  getTrendingPosts() {
    this._http.get<Post[]>("api/Post/GetTrending").subscribe(data => {
      this.trendingPosts = data;
    },
      error => console.log(error)
    )
  }

  noRouting(e) {
    e.stopPropagation();
  }

  
}
