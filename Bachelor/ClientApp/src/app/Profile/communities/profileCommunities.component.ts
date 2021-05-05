import { Component,OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Industry } from '../../Models/Users/Industry';
import { StudentSubject } from '../../Models/Users/StudentSubject';
import { User } from "../../Models/Users/User";
import { Router } from "@angular/router";
import { SharedService } from "../../Communities/shared/shared.service";
import { Community } from "../../Models/Communities/Community";
import { UserService } from "../../Users/users.service";
import { FormBuilder } from "@angular/forms";
import { Experience } from "../../Models/Users/Experience";
import { Subscription } from "rxjs";


@Component({
  selector: "profile-communities-component",
  templateUrl: "./profileCommunities.component.html",
  styleUrls: ['../profile.component.css']
})

export class ProfileCommunitiesComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService : UserService,
    private formBuilder : FormBuilder,
    ) {
  }
  public user: User;
  public userSub: Subscription;

  public loggedIn: boolean;
  public loggedInSub: Subscription;


  public communities : boolean = true;



  async ngOnInit() {
    this.userSub = this.userService.userCurrent.subscribe(user => this.user = user);
    this.loggedInSub = this.userService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.getLoggedInUser();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.loggedInSub.unsubscribe();
  }

  async getLoggedInUser() {
    if (this.userService.userCurrent == null || this.userService.userCurrent == undefined){
      await this.userService.getUserInit();
    }
  }

}
