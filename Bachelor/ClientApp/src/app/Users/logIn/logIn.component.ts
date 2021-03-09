import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { User } from '../../Models/User';
@Component({
  selector: 'app-home',
  templateUrl: './logIn.component.html',
})

export class LogInComponent {
  private passString = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

  formValidation = {
    email: [
      null, Validators.compose([Validators.required, Validators.email])
    ],
    password: [
      null, Validators.compose([Validators.required, Validators.pattern(this.passString)])
    ]
  }

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private router: Router) {
    this.logInForm = this.formBuilder.group(this.formValidation);
  }

  logInForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  onSubmit() {
    this.logIn();
  }


  // Main log in function, authenticates the user and creates a JWT for later use
  logIn() {
    const user = new User();
    user.email = this.logInForm.controls.email.value;
    user.password = this.logInForm.controls.password.value;

      this.http.post("api/User/LogIn", user).subscribe(response => {

        // Need to specify the response type since the deafult is set to recieving JSON
        this.http.get("api/User/GetToken/" + user.email, { responseType: 'text' }).subscribe(data => {
          console.log(data);
        }, 
          error => console.log(error)
        ); // End GET-call
         this.router.navigate(['/home']);
      }, 
        error => console.log("nei")
      ); 
  }
}
