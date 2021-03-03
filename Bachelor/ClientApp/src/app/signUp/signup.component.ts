import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { Industry } from '../Models/Industry';
import { FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './signup.component.html',
})

export class SignUpComponent {
  private passString = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
  private showIndustry: boolean;
  private showIndustryInput: boolean;
  public allIndustries: Array<Industry>;

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
    industry: [
      null, Validators.required
    ]
  }

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {
    this.signUpForm = formBuilder.group(this.formValidation);
  }

  ngOnInit() {
    this.getOccupations();
    
  }

  onSubmit() {
    this.addUser()
  }

  addUser() {
      const user = new User();
      user.firstname = this.signUpForm.controls.firstname.value;
      user.lastname = this.signUpForm.controls.lastname.value;
      user.age = this.signUpForm.controls.age.value;
      user.email = this.signUpForm.controls.email.value;
    user.password = this.signUpForm.controls.password.value;
    user.occupation = this.signUpForm.controls.occupation.value.occupation;
    user.gender = this.signUpForm.controls.gender.value.gender;
    user.industry = this.signUpForm.controls.industry.value.industry || '';

    if (user.occupation === "Student" && user.industry != null) {
      window.alert("Feil i input");
      this.signUpForm.reset();
    } else {

      this.http.post('api/User/addUser', user).subscribe(retur => {
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
  }

  browseAnonymously() {
    this.http.get('api/User/CreateAnonymousCookie').subscribe(data => {
      this.router.navigate(['/home']);
    },
      error => console.log(error)
    );
  }

  updateOccupationStatus() {
    if ((this.signUpForm.controls.occupation.value.occupation) === "Full-time employee") {
      this.showIndustry = true;
    } else {
      this.showIndustry = false;
    }
  }

  updateIndustryStatus() {
    if (this.signUpForm.controls.industry.value.title === "Annet") {
      this.showIndustryInput = true;
    } else {
      this.showIndustryInput = false;
    }
  }

  test() {
    console.log(this.signUpForm.controls.industry.value.industry);
  }

  getOccupations() {
    this.http.get<Industry[]>("api/User/GetAllIndustries").subscribe(data => {
      this.allIndustries = data;
    },
      error => console.log(error)
    );
  }
} // End class
