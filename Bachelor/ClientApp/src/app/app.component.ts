import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './Users/users.service';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './Notification/notification.service';
import { SharedService } from './Communities/shared/shared.service';
import { User } from './Models/Users/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private userService : UserService) {}

  ngOnInit() {
    if (localStorage.getItem("loggedIn")) {
      this.userService.changeLoggedIn(true);
      this.userService.getUserInit();
    } else {
      this.userService.changeLoggedIn(false);
    }
  }
}
