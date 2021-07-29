import { Component,OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Industry } from '../Models/Users/Industry';
import { StudentSubject } from '../Models/Users/StudentSubject';
import { User } from "../Models/Users/User";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { SharedService } from "../Communities/shared/shared.service";
import { Community } from "../Models/Communities/Community";
import { UserService } from "../Users/users.service";
import { FormBuilder } from "@angular/forms";
import { Experience } from "../Models/Users/Experience";
import { Subscription } from "rxjs";
import { NotificationService } from "../Notification/notification.service";


@Component({
  selector: "app-home",
  templateUrl: "./profile.component.html",
  styleUrls: ['./profile.component.css'],
  providers: [SharedService]
})

export class ProfileComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private userService : UserService,
    private formBuilder : FormBuilder,
    private notificationService : NotificationService,
    ) {
  }

  public expNumber: number = 1;
  public allCommunities: Array<Community>;
  public allIndustries: Array<Industry>;
  public allSubjects: Array<StudentSubject>;
  public userCommunities: Array<Community>;

  public userId: number;
  public userIdSub: Subscription;

  public user: User;
  public userSub: Subscription;

  public loggedIn: boolean;
  public loggedInSub: Subscription;

  public showIndustry : boolean = false;
  public showSubjects : boolean = false;
  public showBusiness : boolean = false;
  public showForm : boolean = true;
  public showFormButton : string = "Hide";
  public showExperienceButton : string = "Show experiences";
  public ShowExperienceDiv: boolean = false;
  public childComponentLoaded: boolean;

  public communities : boolean = true;

  public numberOfNotifications: number;
  public notificationsSub: Subscription;

  Occupations: Array<Object> = [
    { id: 0, occupation: "Student" },
    { id: 1, occupation: "Full-time employee" },
    { id: 2, occupation: "Business owner" },
    { id: 3, occupation: "Entrepreneur" },
    { id: 4, occupation: "None of the above" }
  ]

  formAddExperience = this.formBuilder.group({
    occupation : [],
    industry : [],
    subjects : [],
    startDate : [],
    endDate : [],
    business : [],

  })

  async ngOnInit() {
    this.userSub = this.userService.userCurrent.subscribe(user => this.user = user);
    this.loggedInSub = this.userService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.userIdSub = this.userService.userIdCurrent.subscribe(userId => this.userId = userId);
    this.userService.GetIndustries().then(response => { this.allIndustries = response});
    this.userService.GetStudentSubjects().then(response => { this.allSubjects = response;});
    this.notificationsSub = this.notificationService.numberOfNotificationsCurrent.subscribe(noti => this.numberOfNotifications = noti);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.loggedInSub.unsubscribe();
    this.userIdSub.unsubscribe();
  }

  async submit() {
    let form = this.formAddExperience.controls;
    const newExperience = new Experience();
    newExperience.occupation = form.occupation.value.occupation || null;
    newExperience.studentSubject = form.subjects.value || null;
    newExperience.industry = form.industry.value || null;
    newExperience.startDate = form.startDate.value || null;
    newExperience.endDate = form.endDate.value || null;
    newExperience.business = form.business.value || null;
    
    await this.userService.AddExperience(newExperience, this.userId).then(() => {
      this.formAddExperience.reset();
      this.userService.GetUser(this.userId).then(updatedUser => {
        this.sharedService.changeUser(updatedUser);
      });
      this.sharedService.openSnackBarMessage("Erfaring lagt til","Ok");
    }).catch((error) => {
      this.sharedService.openSnackBarMessage("Kunne ikke legge til erfaring", "Ok");
      console.log(error);
    })
  }

  showFormBlock() {
    if(this.showForm) {
      this.showForm = false;
      this.showFormButton = "Add experience";
      return;
    }
    this.showForm = true;
    this.showFormButton = "Hide";
    this.ShowExperienceDiv = false;
    this.showExperienceButton = "Show experiences";
  }

  ShowExperience() {
    if(this.ShowExperienceDiv) {
      this.ShowExperienceDiv = false;
    } else {
      this.showForm = false;
      this.showFormButton = "Add experience";
      this.ShowExperienceDiv = true;
      this.showExperienceButton = "Hide experiences";
    }
  }

  updateOccupationStatus() {
    let value = this.formAddExperience.controls.occupation.value.occupation
    if(value === "Student") {
      this.showSubjects = true;
      this.showIndustry = false;
      this.showBusiness = false;
    } else if(value === "Full-time employee") {
      this.showSubjects = false;
      this.showIndustry = true;
      this.showBusiness = false;
    } else if(value === "Business owner" || value === "Entrepreneur") {
      this.showBusiness = true;
      this.showIndustry = true;
      this.showSubjects = false;
    }
  }

  DateCheckbox(event : any) {
    console.log(event.currentTarget.checked);
    if(event.currentTarget.checked) {
      (document.getElementById("endDate") as any).disabled = true;
    } else { 
      (document.getElementById("endDate") as any).disabled = false;
    }
  }
}
