import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './Users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private http: HttpClient, private userService : UserService) {
    
  }

  ngOnInit() {
    if(localStorage.getItem("loggedIn")) {
      this.userService.changeLoggedIn(true);
    } else {
      this.userService.changeLoggedIn(false);
    }
  }
}
