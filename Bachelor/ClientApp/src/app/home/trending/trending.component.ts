import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Industry } from '../../Models/User/industry';
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
    this.getCommunity();
    this.getTrendingPosts();
  }

  listIndustries() {
    this._http.get<Industry[]>("api/User/GetAllIndustries").subscribe(data => {
      this.allIndustries = data;
    },
      error => console.log(error)
    );
  }

  getCommunity() {
    this._http.get<Community[]>("api/Community/GetAllCommunities").subscribe(data => {
      this.allCommunities = data;
    },
      error => console.log(error)
    );
  }

  getRandomColor() {
    const green = "rgb(35,121,120)";
    const blue = "rgb(86,172,246)";
    const red = "rgb(214,0,0)";
    const orange = "rgb(252,119,80)";
    const yellow = "rgb(249,220,74)";

    const colors = [green, blue, red, orange, yellow];

    let randomColor = colors[Math.floor(Math.random() * colors.length)];

    return randomColor;
  }

  getAllPosts(allCommunities) {
    
  }

  scrollLeft() {
    let boxes = document.querySelectorAll("#box");
    console.log(boxes.length);
    
    this.widgetsContent.nativeElement.scrollLeft -= 750;
  }

  scrollRight() {
    this.widgetsContent.nativeElement.scrollLeft += 750;
    console.log(this.widgetsContent.nativeElement.scrollLeft);

    
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