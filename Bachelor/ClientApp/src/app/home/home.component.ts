import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Industry } from '../Models/Users/industry';
import { Community } from '../Models/Communities/Community';
import { FeedPageComponent } from '../Communities/feed/feedPage.component';
import { Post } from '../Models/Communities/Post';
import { SharedService } from '../Communities/shared/shared.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../Models/Users/User';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ],
})

export class HomeComponent {
  
}
