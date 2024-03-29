import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Industry } from '../Models/Users/Industry';
import { Community } from '../Models/Communities/Community';
import { FeedPageComponent } from '../Communities/feed/feedPage.component';
import { Post } from '../Models/Communities/Post';
import { SharedService } from '../Communities/shared/shared.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../Models/Users/User';
import { UserService } from '../Users/users.service';
import { NotificationService } from '../Notification/notification.service';
import { interval } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ],
})

export class HomeComponent implements OnInit {
  public user: User;
  public userSub: Subscription;

  loopSub: Subscription;

  constructor(private userService: UserService, private NotificationService: NotificationService) {}

  async ngOnInit() {
   this.userSub = this.userService.userCurrent.subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
