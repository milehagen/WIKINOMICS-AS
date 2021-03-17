import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../Models/User/User';
import { Industry } from '../../Models/User/industry';
import { studentSubject } from '../../Models/User/studentSubject';
import { FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { Experience } from 'src/app/Models/User/Experience';
import { execArgv } from 'process';

@Component({
  selector: 'app-home',
  templateUrl: './signup.component.html',
})

export class SignUpComponent {
  private passString = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
  private showIndustry: boolean;
  private showIndustryInput: boolean;
  private showSubjects: boolean;
  public allIndustries: Array<Industry>;
  public allSubjects: Array<studentSubject>;
  public selIndustry: Industry;
  public selSubject: studentSubject;
  public loggedIn = false;


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
    subjects: []

  }

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router,) {
    this.signUpForm = formBuilder.group(this.formValidation);
  }

  ngOnInit() {
    this.checkLoginCookie();

    this.getIndustries();
    this.getSubjects();
    this.selIndustry = this.signUpForm.controls.industry.value;
    this.selSubject = this.signUpForm.controls.subjects.value;
  }

  checkLoginCookie() {
    this.http.get("api/Cookie/GetCookieContent/" + "LoggedIn").subscribe(res => {
      if (res === 1) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  onSubmit() {
    this.addUser()
  }


  addUser() {
    
    const experience = new Experience();
    experience.occupation = this.signUpForm.controls.occupation.value.occupation;
    // If the value is empty set the object to be empty aswell
    if(this.selSubject === null) {
      experience.studentSubject = {} as studentSubject;
    }else {
      experience.studentSubject = this.selSubject;
    }
    if(this.selIndustry === null) {
      experience.industry = {} as Industry;
    }else {
      experience.industry = this.selIndustry;
    }
    

    const user = new User();
    user.firstname = this.signUpForm.controls.firstname.value;
    user.lastname = this.signUpForm.controls.lastname.value;
    user.age = this.signUpForm.controls.age.value;
    user.email = this.signUpForm.controls.email.value;
    user.password = this.signUpForm.controls.password.value;
    user.gender = this.signUpForm.controls.gender.value.gender;
    user.experience = experience;

      this.http.post('api/User/addUser', user, { responseType: 'text' }).subscribe(retur => {
        window.alert("Registrering vellykket");

        this.http.get('api/User/GetToken/' + user.email, { responseType: 'text' }).subscribe(response => {
          console.log(response);
        },
          error => console.log(error)
        );
        this.signUpForm.reset();
        this.router.navigate(['/home']);
      },
        error => console.log(error)
      );
  }

  browseAnonymously() {
    this.http.get('api/Cookie/CreateAnonymousCookie').subscribe(data => {
      this.router.navigate(['/home']);
    },
      error => console.log(error)
    );
  }

  test() {
    /*
     * FIRST GET CALL = GET COOKIE CONTENT
     *  SECOND GET CALL = DECODE JWT FROM COOKIE
    this.http.get("api/Cookie/GetCookieContent/" + "userid", { responseType: 'text'}).subscribe(response => {
      let token = response;

      this.http.get("api/JwtToken/DecodeToken/" + token).subscribe(res => {
      },
        error => console.log(error)
      );


    },
      error => console.log(error)
    );
    */
    
    /* CREATE LOGGED IN COOKIE
     * Value represents whether or not the user is logged in, 0 is for not logged in, 1 is for logged in
     */
   /* var value = "0";
    this.http.get("api/Cookie/CreateLoggedInCookie/" + value).subscribe(response => {

    },
      error => console.log(error)
    );
    */
    console.log(this.selIndustry);
    console.log(this.selSubject);
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
    this.http.get<Industry[]>("api/User/GetAllIndustries").subscribe(data => {
      this.allIndustries = data;
    },
      error => console.log(error)
    );
  }

  getSubjects() {
    this.http.get<studentSubject[]>("api/User/GetAllStudentSubjects").subscribe(data => {
      this.allSubjects = data;
    },
      error => console.log(error)
    );
  }
} // End class
