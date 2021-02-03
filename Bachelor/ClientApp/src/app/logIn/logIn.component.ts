import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { User } from '../Models/User';
@Component({
  selector: 'app-home',
  templateUrl: './logIn.component.html',
})

export class LogInComponent {
  private allUsers: Array<User>;
  private userEmail: string;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit() {
    this.getAllUsers();
  }

  logInForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  onSubmit() {
    this.logIn();

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

  checkIfEmailExists(email : string) {
    for (let value of this.allUsers) {
      if (email === value.email) {
        return value.id;
      } else {
        return null;
      }
    }
  }

  logIn() {
    const user = new User();
    user.email = this.logInForm.controls.email.value;
    user.password = this.logInForm.controls.password.value;
    user.id = this.checkIfEmailExists(user.email);
    if (user.id != null) {
      this.http.post("api/User/LogIn", user).subscribe(response => {
        console.log("ferdig");
        // this.router.navigate(['/home']);
      },
        error => console.log(error)
      );
    } else {
      window.alert("Kunne ikke finne bruker");
    }
  }

}
