import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "../../Models/Users/User";
import { UserService } from "../../Users/users.service";

@Component({
  selector: "app-home",
  templateUrl: "./profileHome.component.html",
  styleUrls: ['../profile.component.css'],
  providers: []
})

export class ProfileHomeComponent implements OnInit {

  public user: User;
  public userSub: Subscription;

  public loggedIn: boolean;
  public loggedInSub: Subscription;

  public showInfoBox: boolean;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.userSub = this.userService.userCurrent.subscribe(user => this.user = user);
    this.loggedInSub = this.userService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.loggedInSub.unsubscribe();
  }
}
