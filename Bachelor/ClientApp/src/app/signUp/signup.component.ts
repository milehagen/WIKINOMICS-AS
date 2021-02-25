import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './signup.component.html',
})

export class SignUpComponent {
  private passString = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
  private showIndustry: boolean;
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
  Industry: Array<Object> = [
    { id: 0, industry: "Landbruk" },
    { id: 1, industry: "Metalproduksjon" },
    { id: 2, industry: "Kjemisk industri" },
    { id: 3, industry: "Butikkvirksomhet" },
    { id: 4, industry: "Anleggsarbeid" },
    { id: 5, industry: "Utdanning" },
    { id: 7, industry: "Finans" },
    { id: 8, industry: "Mat / drikke industri" },
    { id: 9, industry: "Skogbruk" },
    { id: 10, industry: "Helsevesen" },
    { id: 11, industry: "Hotellvirksomhet" },
    { id: 12, industry: "Mineralvirksomhet" },
    { id: 13, industry: "Mekanisk / elekto ingeniør" },
    { id: 14, industry: "Media" },
    { id: 15, industry: "Olje og gass" },
    { id: 16, industry: "Post / telekommunikason" },
    { id: 17, industry: "Offentlig tjeneste" },
    { id: 18, industry: "Frakt" },
    { id: 19, industry: "Tekstilindustri" },
    { id: 20, industry: "Transport" },
    { id: 21, industry: "næringsindustri (vann, gass, strøm)" },
    { id: 22, industry: "Teknologi" }
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

  onSubmit() {
    this.addUser()
  }

// EDIT - use https://miro.com/app/board/o9J_lVNWOIg=/ for information about what to add
  /*
   * name
   * email
   * gender
   * current occupation
   *  - (if student) -> choose school and field of study
   *  - full-time employee
   *  - business owner
   *  - entrepreneur
   * Industry of occupation
   */

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

  test() {
    console.log(this.signUpForm.controls.industry.value.industry);
  }
} // End class
