import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../Models/Users/User';
import { Industry } from '../../Models/Users/Industry';
import { StudentSubject } from '../../Models/Users/StudentSubject';
import { FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { Experience } from '../../Models/Users/Experience';
import { execArgv } from 'process';
import { Subscription } from 'rxjs';
import { NavbarService } from '../../navbar/navbar.service';
import { LiteralArrayExpr } from '@angular/compiler';
import { UserService } from '../users.service';
import { isThisTypeNode } from 'typescript';
import { SharedService } from 'src/app/Communities/shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './signup.component.html',
  styleUrls: ['../usersStyles.css']
})

export class SignUpComponent {
  private passString = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
  public showIndustry: boolean;
  public showAdditionalInput: boolean;
  public showExtraIndustryInput : boolean; 
  public AdditionalIndustry : Industry;
  public AdditionalData : string;
  public showSubjects: boolean;
  public allIndustries: Array<Industry>;
  public allSubjects: Array<StudentSubject>;
  //public ArrayExp : Array<Experience>;
  public selIndustry: Industry
  public selSubject: StudentSubject;
  public loggedIn = false;
  public showDateInput:boolean = false;
  subscription: Subscription;

  constructor(
    private http: HttpClient,
     private formBuilder: FormBuilder,
      private router: Router,
      private navbarService: NavbarService,
      private userService : UserService,
      private sharedService : SharedService,

      ) {
    this.signUpForm = formBuilder.group(this.formValidation);
  }

  Occupations: Array<Object> = [
    { id: 0, occupation: "Student" },
    { id: 1, occupation: "Full-time employee" },
    { id: 2, occupation: "Business owner" },
    { id: 3, occupation: "Entrepreneur" },
    { id: 4, occupation: "None of the above" }
  ]
  Gender: Array<Object> = [
    { id: 0, gender: "Woman" },
    { id: 1, gender: "Man"},
    { id: 2, gender: "Transgender" },
    { id: 3, gender: "Rather not say" }
  ]
  

  signUpForm = this.formBuilder.group({
    firstname: '',
    lastname: '',
    age: '',
    email: '',
    password: '',
    occupation: '',
    gender: '',
    subjects: {},
    industry: {},
    startDate:'',
    endDate:'',
    uniqueID: '',
    AdditionalData : '',
    AdditionalIndustry : {},
  });


  formValidation = {
    firstname: [
      null, Validators.compose([Validators.required, Validators.pattern('[a-zA-ZæøåÆØÅ_., ]{2,35}')])
    ],
    lastname: [
      null, Validators.compose([Validators.required, Validators.pattern('[a-zA-ZæøåÆØÅ_., ]{2,35}')])
    ],
    age: [
      null, Validators.compose([Validators.required, Validators.min(13), Validators.max(120), Validators.pattern('^[0-9]{2,3}')])
    ],
    email: [
      null, Validators.compose([Validators.required, Validators.email])
    ],
    password: [
      null, Validators.compose([Validators.required, Validators.pattern(this.passString)])
    ],
    occupation: [
      null, Validators.required
    ],
    gender: [
      null, Validators.required
    ],
    industry: [],
    subjects: [],
    startDate: [],
    endDate: [],
    AdditionalData : [],
    AdditionalIndustry : [],
  }

  

  ngOnInit() {
    this.checkLoginCookie();
    this.subscription = this.navbarService.loggedInObserveable.subscribe(value => this.loggedIn = value);
    this.userService.GetIndustries().then(response => {this.allIndustries = response});
    this.userService.GetStudentSubjects().then(response => {this.allSubjects = response});
    this.selIndustry = this.signUpForm.controls.industry.value;
    this.selSubject = this.signUpForm.controls.subjects.value;
  }

  checkLoginCookie() {
    this.userService.GetCookieContent("LoggedIn").then(value => {
      if(value === 1) {
        this.navbarService.changeLoggedIn(true);
      }
    }).catch(error => {
      console.log(error);
      this.navbarService.changeLoggedIn(false);
    })
  }

  onSubmit() {
    this.addUser()
  }


  async addUser() {
    const arrayExp = Array<Experience>();
    const experience = new Experience();
    experience.occupation = this.signUpForm.controls.occupation.value.occupation;
    this.AdditionalData = this.signUpForm.controls.AdditionalData.value || null;
    this.AdditionalIndustry = this.signUpForm.controls.AdditionalIndustry.value || null;
    // If the value is empty set the object to be empty aswell
    if(this.selSubject === null) {
      experience.studentSubject = {} as StudentSubject;
    }else {
      experience.studentSubject = this.selSubject;
    }
    
    if(this.AdditionalIndustry != null) {
      experience.industry = this.AdditionalIndustry;
    } else if(this.selIndustry === null) {
      experience.industry = {} as Industry;
    }else {
      experience.industry = this.selIndustry;
    }
    

    experience.startDate = this.signUpForm.controls.startDate.value || null;
    experience.endDate = this.signUpForm.controls.endDate.value || null;
    experience.business = this.AdditionalData;

    if(experience.startDate > experience.endDate){
      return window.alert("Feil i datoinput, vennligst sjekk igjen");
    } 
    


    const user = new User();
    user.firstname = this.signUpForm.controls.firstname.value;
    user.lastname = this.signUpForm.controls.lastname.value;
    user.age = this.signUpForm.controls.age.value;
    user.email = this.signUpForm.controls.email.value;
    user.password = this.signUpForm.controls.password.value;
    user.gender = this.signUpForm.controls.gender.value.gender;
    arrayExp.push(experience);
    user.experience = arrayExp;

    Promise.all([
      await this.userService.addUser(user),
      await this.userService.GetToken(user.email),
      await this.userService.CreateLoggedInCookie(1)
    ]).then((values) => {
      this.navbarService.changeLoggedIn(true);
      this.sharedService.changeUser(user);
      this.signUpForm.reset();
      this.router.navigate(['/erfaring']);
     console.log(values);
    }).catch((errors) => {
      console.log(errors);
    });
  }

  async browseAnonymously() {
    await this.userService.CreateAnonymousCookie().then(response => {
      console.log(response);
      this.router.navigate(['/home']);
    });
  }

  test() {
    let i = this.signUpForm.controls.AdditionalIndustry.value || null;
    //let d = this.signUpForm.controls.AdditionalData.value || "Ingenting her heller";

    if(this.signUpForm.controls.AdditionalIndustry.value != null) {
      console.log(i);
    }
    console.log("Industri " + i);
    console.log("Data ");
  }

  updateOccupationStatus() {
    const val = this.signUpForm.controls.occupation.value.occupation;
    if (val === "Full-time employee") {
      this.showIndustry = true;
      this.showSubjects = false;
      this.selSubject = null;
      this.showAdditionalInput = false;
      this.showExtraIndustryInput = false;
      this.AdditionalData = null;
    } else if (val == "Student") {
      this.showIndustry = false;
      this.showSubjects = true;
      this.selIndustry = null;
      this.showAdditionalInput = false;
      this.AdditionalData = null;
    } else if(val == "Entrepreneur" || val == "Business owner") {
      this.showSubjects = false;
      this.showIndustry = false;
      this.selIndustry = null;
      this.selSubject = null;
      this.showAdditionalInput = true;
      this.showExtraIndustryInput = false;
    }else {
      this.showSubjects = false;
      this.showIndustry = false;
      this.selIndustry = null;
      this.selSubject = null;
      this.showAdditionalInput = false;
      this.showExtraIndustryInput = false;
      this.AdditionalData = null;
    }

    if(val != "None of the above") {
      this.showDateInput = true;
    } else {
      this.showDateInput = false;
    }
  }


  updateIndustryStatus() {
    if (this.signUpForm.controls.industry.value.title == "Annet") {
      this.showExtraIndustryInput = true;
      this.selIndustry === null;
    } else {
      this.showExtraIndustryInput = false;
      this.AdditionalIndustry = null;
      this.selIndustry = this.signUpForm.controls.industry.value;
    }
    
  }

  updateSubjectStatus() {
    this.selSubject = this.signUpForm.controls.subjects.value;
  }

  DateCheckbox(event : any) {
    console.log(event.currentTarget.checked);
    if(event.currentTarget.checked) {
      (document.getElementById("endDate") as any).disabled = true;
    } else { 
      (document.getElementById("endDate") as any).disabled = false;
    }
  }

  seePassword() {
    var password = document.getElementById("password");
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
  }
} // End class
