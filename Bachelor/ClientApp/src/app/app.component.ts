import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "./User";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
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
