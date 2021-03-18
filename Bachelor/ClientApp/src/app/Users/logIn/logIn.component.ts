import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { User } from '../../Models/User/User';
import { NavbarService } from '../../navbar/navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './logIn.component.html',
  styleUrls: ['../usersStyles.css']
})

export class LogInComponent {
  private passString = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/);
  private loggedIn: boolean;
  subscription: Subscription;

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
  ) {
    this.logInForm = this.formBuilder.group(this.formValidation);
  }

  ngOnInit() {
    this.subscription = this.navbarService.loggedInObserveable.subscribe(value => this.loggedIn = value);
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

  updateNav(): void {
    this.navbarService.updateNav();
  }

  test() {
    this.navbarService.updateNav();
  }


  // Main log in function, authenticates the user and creates a JWT for later use
  logIn() {
    const user = new User();
    user.email = this.logInForm.controls.email.value;
    user.password = this.logInForm.controls.password.value;

    this.http.post("api/User/LogIn", user).subscribe(response => {
      this.http.get("api/Cookie/CreateLoggedInCookie/" + 1).toPromise();
      this.navbarService.changeLoggedIn(true);
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
