import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Industry } from '../Models/Users/industry';
import { Community } from '../Models/Communities/Community';
import { FeedPageComponent } from '../Communities/feed/feedPage.component';
import { Post } from '../Models/Communities/Post';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ],
})

export class HomeComponent {}
