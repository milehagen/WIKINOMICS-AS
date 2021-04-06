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

@Component({
  selector: 'app-home',
  templateUrl: './signup.component.html',
  styleUrls: ['../usersStyles.css']
})

export class SignUpComponent {
  private passString = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
  public showIndustry: boolean;
  public showIndustryInput: boolean;
  public showSubjects: boolean;
  public allIndustries: Array<Industry>;
  public allSubjects: Array<StudentSubject>;
  //public ArrayExp : Array<Experience>;
  public selIndustry: Industry;
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
      ) {
    this.signUpForm = formBuilder.group(this.formValidation);
  }

  Occupations: Array<Object> = [
    { id: 0, occupation: "Student" },
    { id: 1, occupation: "Full-time employee" },
    { id: 2, occupation: "Busineess owner" },
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
    subjects: '',
    industry:'',
    startDate:'',
    endDate:'',
    uniqueID: ''
  });


  formValidation = {
    firstname: [
      null, Validators.compose([Validators.required, Validators.pattern('[a-zA-ZæøåÆØÅ]{2,35}')])
    ],
    lastname: [
      null, Validators.compose([Validators.required, Validators.pattern('[a-zA-ZæøåÆØÅ]{2,35}')])
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
  }

  

  ngOnInit() {
    this.checkLoginCookie();
    this.subscription = this.navbarService.loggedInObserveable.subscribe(value => this.loggedIn = value);
    this.getIndustries();
    this.getSubjects();
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
    // If the value is empty set the object to be empty aswell
    if(this.selSubject === null) {
      experience.studentSubject = {} as StudentSubject;
    }else {
      experience.studentSubject = this.selSubject;
    }
    if(this.selIndustry === null) {
      experience.industry = {} as Industry;
    }else {
      experience.industry = this.selIndustry;
    }
    experience.startDate = this.signUpForm.controls.startDate.value || null;
    experience.endDate = this.signUpForm.controls.endDate.value || null;

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
    console.log("ingenting");
  }

  updateOccupationStatus() {
    const val = this.signUpForm.controls.occupation.value.occupation;
    if (val === "Full-time employee") {
      this.showIndustry = true;
      this.showSubjects = false;
      this.selSubject = null;
    } else if (val == "Student") {
      this.showIndustry = false;
      this.showSubjects = true;
      this.selIndustry = null;
    } else {
      this.showSubjects = false;
      this.showIndustry = false;
      this.selIndustry = null;
      this.selSubject = null;
    }

    if(val != "None of the above") {
      this.showDateInput = true;
    } else {
      this.showDateInput = false;
    }
  }


  updateIndustryStatus() {
    if (this.signUpForm.controls.industry.value.title == "Annet") {
      this.showIndustryInput = true;
      this.selIndustry === null;
    } else {
      this.showIndustryInput = false;
      this.selIndustry = this.signUpForm.controls.industry.value;
    }
    
  }

  updateSubjectStatus() {
    this.selSubject = this.signUpForm.controls.subjects.value;
  }

  getIndustries() {
   this.userService.GetIndustries().then(response => {
     this.allIndustries = response;
   }).catch((error) => {
     console.log(error);
   })
  }

  getSubjects() {
   this.userService.GetStudentSubjects().then(response => {
     this.allSubjects = response;
   }).catch((error) => {
     console.log(error);
   })
  }
} // End class
