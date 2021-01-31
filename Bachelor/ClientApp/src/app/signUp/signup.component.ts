import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/User';
import { FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './signup.component.html',
})

export class SignUpComponent {
  private allUsers: Array<User>;

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

  addUser() {

    if (this.checkIfEmailExists(this.signUpForm.controls.email.value)) {
      window.alert("E-Posten er allerede registrert");
      this.signUpForm.reset();
    } else {
      const user = new User();
      user.firstname = this.signUpForm.controls.firstname.value;
      user.lastname = this.signUpForm.controls.lastname.value;
      user.age = this.signUpForm.controls.age.value;
      user.email = this.signUpForm.controls.email.value;
      user.password = this.signUpForm.controls.password.value;

      this.http.post('api/User/addUser', user).subscribe(retur => {
        window.alert("Registrering vellykket");
        console.log(user);
        this.signUpForm.reset();
      },
        error => console.log(error)
      );
    }
  }

  getAllUsers() {
    this.http.get<User[]>("api/User/GetAllUsers").
      subscribe(data => {
        this.allUsers = data;
        console.log(this.allUsers);
      },
        error => console.log("Kunne ikke hente fra DB")
      );
  }

  // Takes in the email from the user to check if it's already registered in the DB
  // Returns true if it exsts, returns false otherwise
  checkIfEmailExists(email : string) {
    for (let value of this.allUsers) {
      if (email === value.email) {
        
        return true;
      } else {
        return false
      }
    }
  }


}
