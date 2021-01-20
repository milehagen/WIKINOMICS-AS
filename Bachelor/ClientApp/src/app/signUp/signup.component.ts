import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './signup.component.html',
})

export class SignUpComponent {
  public allUsers: Array<User>;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    console.log("Start");
    this.getAllUsers();
  }

  getAllUsers() {
    this.http.get<User[]>("api/User").
      subscribe(data => {
        this.allUsers = data;
        console.log(data);
      },
        error => console.log("Kunne ikke hente fra DB")
      );
  }
}