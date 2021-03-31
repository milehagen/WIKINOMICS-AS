import { Component,OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Industry } from '../Models/Users/Industry';
import { StudentSubject } from '../Models/Users/StudentSubject';
import { User } from "../Models/Users/User";
import { Router } from "@angular/router";
import { SharedService } from "../Communities/shared/shared.service";
import { Community } from "../Models/Communities/Community";


@Component({
  selector: "app-home",
  templateUrl: "./profile.component.html",
  styleUrls: ['./profile.component.css'],
  providers: [SharedService]
})

export class ProfileComponent {

  constructor(private http: HttpClient, private router: Router, private sharedService: SharedService) {

  }

  public expNumber: number = 1;
  public allCommunities: Array<Community>;
  public allIndustries: Array<Industry>;
  public allSubjects: Array<StudentSubject>;
  public userCommunities: Array<Community>;
  public userId : string;
  public user: User;
  public loggedIn: boolean;
  public occupationArray = ["Student","Full-time employee","Business owner","Entrepreneur","None of the above"];

  Occupations: Array<Object> = [
    { id: 0, occupation: "Student" },
    { id: 1, occupation: "Full-time employee" },
    { id: 2, occupation: "Busineess owner" },
    { id: 3, occupation: "Entrepreneur" },
    { id: 4, occupation: "None of the above" }
  ]

  async ngOnInit() {

    this.sharedService.userCurrent.subscribe(user => this.user = user);
    this.sharedService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.getIndustries();
    this.getSubjects();
    this.callGetUserIdCookie();
  }

  async callGetUserIdCookie() {
    let userIdToken = await this.sharedService.getTokenCookie();
    if (userIdToken) {
      let userId = await this.sharedService.getUserIdFromToken(userIdToken);

      if (userId) {
        this.sharedService.getUser(userId);
        this.userCommunities = this.user.communities;
      }
    }
  }



  /*  STUFF TO DO
   * 1. CHECK IF THE USER IS LOGGED IN --> IF NOT SEND THEM BACK TO THE LOG IN PAGE / SIGN UP
   * 2. IF THE USER IS LOGGED IN CHECK AND VERIFY THE JWT TOKEN, IF ITS NOT VERIFIED THEN MAKE THE USER LOG IN AGAIN TO REFRESH THE TOKEN
   * 3. DISPLAY THE USERS NAME AND CURRENT OCCUPATION
   * 4. DISPLAY A DESCREPTION MADE BY THE USER, THIS SHOULD BE POSSIBLE TO EDIT
   */

  addExp() {
    let currentExpNumber = String(this.expNumber);
    const tableBody = document.getElementById("tableExpBody");
    const tr = document.createElement("tr");
    const tdNumber = document.createElement("td");
    const tdArea = document.createElement("td");
    const tdProf = document.createElement("td");
    const tdTimeFrom = document.createElement("td");
    const tdTimeTo = document.createElement("td");

    //Set number of column
    tdNumber.append(currentExpNumber);

    //Add the Occupation dropdown
    let selOccupation = document.createElement("select");
    for(let value of this.occupationArray) {
      let opt = document.createElement("option");
      opt.innerHTML = value;
      selOccupation.append(opt);
    }
    tdArea.append(selOccupation);

    //Add the industry dropwdown
    let selIndustry = document.createElement("select");
    for(let value of this.allIndustries) {
      let opt = document.createElement("option");
      opt.innerHTML = value.title;
      selIndustry.append(opt);
    }
    tdProf.append(selIndustry);

    //Add time interval
    const tdYearFrom = document.createElement("td");
    let inpYearFrom = document.createElement("input");
    inpYearFrom.placeholder = "Year"
    tdYearFrom.append(inpYearFrom);

    const tdMonthFrom = document.createElement("td");
    let inpMonthFrom = document.createElement("input");
    inpMonthFrom.placeholder = "Month"
    tdMonthFrom.append(inpMonthFrom);
    tdTimeFrom.append(tdYearFrom,tdMonthFrom);

    const tdYearTo = document.createElement("td");
    let inpYearTo = document.createElement("input");
    inpYearTo.placeholder = "Year"
    tdYearTo.append(inpYearTo);

    const tdMonthTo = document.createElement("td");
    let inpMonthTo = document.createElement("input");
    inpMonthTo.placeholder = "Month"
    tdMonthTo.append(inpMonthTo);
    tdTimeTo.append(tdYearTo,tdMonthTo);






    tr.append(tdNumber,tdArea,tdProf,tdTimeFrom,tdTimeTo);
    tableBody.append(tr);

    this.expNumber += 1;
    
  }

  getIndustries() {
    this.http.get<Industry[]>("api/User/GetAllIndustries").subscribe(data => {
      this.allIndustries = data;
    },
      error => console.log(error)
    );
  }

  getSubjects() {
    this.http.get<StudentSubject[]>("api/User/GetAllStudentSubjects").subscribe(data => {
      this.allSubjects = data;
    },
      error => console.log(error)
    );
  }
}
