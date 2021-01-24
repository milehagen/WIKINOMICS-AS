import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/Models/User';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './signup.component.html',
})

export class SignUpComponent {
  public allUsers: Array<User>;

    signUpForm = this.formBuilder.group({
        firstname: '',
        lastname: '',
        age: '',
        email: '',
        password:'',
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
      null, Validators.compose([Validators.required, Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')])
    ]
  }

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.signUpForm = formBuilder.group(this.formValidation);
  }

  ngOnInit() {
    this.getAllUsers();
    }
   
  onSubmit() {
    this.addUser()
    }

  getAllUsers() {
    this.http.get<User[]>("api/User").
      subscribe(data => {
        this.allUsers = data;
      },
        error => console.log("Kunne ikke hente fra DB")
      );
  }

  addUser() {
    const user = new User();
    user.firstname = this.signUpForm.controls.firstname.value;
    user.lastname = this.signUpForm.controls.lastname.value;
    user.age = parseInt(this.signUpForm.controls.age.value);
    user.password = this.signUpForm.controls.password.value;
    user.email = this.signUpForm.controls.email.value;

    this.http.post("api/User", user).subscribe(retur => {
      console.log("Vellykket");
    },
      error => console.log(error)
    );
  }
}
