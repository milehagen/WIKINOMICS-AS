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

  // Checks if input email is in array, if it is find the users ID
  /*
   * TODO
   * Should be converted to a get call on the backend for later so that all users dont get imported to the frontend
   */
  checkIfEmailExists(email : string) {
    for (let value of this.allUsers) {
      if (value.email === email) {
        return value.id;
      }
    }
  }

  // Main log in function, authenticates the user and creates a JWT for later use
  logIn() {
    const user = new User();
    user.email = this.logInForm.controls.email.value;
    user.password = this.logInForm.controls.password.value;
    user.id = this.checkIfEmailExists(user.email);

    if (user.id != null) {
      this.http.post("api/User/LogIn", user).subscribe(response => {

        // Need to specify the response type since the deafult is set to recieving JSON
        this.http.get("api/User/GetToken/" + user.id, { responseType: 'text' }).subscribe(data => {
          //TODO set a variable to contain the JWT text
          console.log(data);
        }, // End successfull get token call

          error => console.log(error)
        ); // End get token call

         this.router.navigate(['/home']);
      }, // End successfull log in post call

        error => console.log("nei")
      ); // End log in post call

    } else {
      window.alert("Kunne ikke finne bruker");
    }
  }

}
