import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { User } from '../../Models/Users/User';
import { NavbarService } from '../../navbar/navbar.service';
import { UserService } from '../users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './logIn.component.html',
  styleUrls: ['../usersStyles.css']
})

export class LogInComponent {
  private passString = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);

  private loggedIn: boolean;
  loggedInSubscription: Subscription;

  formValidation = {
    email: [
      null, Validators.compose([Validators.required, Validators.email])
    ],
    password: [
      null, Validators.compose([Validators.required, Validators.pattern(this.passString)])
    ]
  }

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private navbarService: NavbarService,
    private userService : UserService,
  ) {
    this.logInForm = this.formBuilder.group(this.formValidation);
  }

  ngOnInit() {
    this.loggedInSubscription = this.userService.loggedInCurrent.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.checkLogin();
  }

  checkLogin() {
    if (this.loggedIn) {
      window.alert("Du er allerede logget inn");
      this.router.navigate(['/home']);
    }
  }

  logInForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  onSubmit() {
    this.logIn();
  }

  // Main log in function, authenticates the user and creates a JWT for later use
  async logIn() {
    const user = new User();
    user.email = this.logInForm.controls.email.value;
    user.password = this.logInForm.controls.password.value;
    let token = await this.userService.GetToken(user.email);

     Promise.all([
      await this.userService.LogIn(user),
      await this.userService.CreateLoggedInCookie(1),
      await token,
     ]).then((res) => {
      this.userService.changeLoggedIn(true);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("token", JSON.stringify(token));
      this.router.navigate(['/home'])
     }).catch(errors => {
       console.log(errors);
     })
  }
}
