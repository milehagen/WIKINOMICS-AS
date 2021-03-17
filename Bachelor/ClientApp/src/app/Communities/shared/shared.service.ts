import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../Models/User/User';

@Injectable()
export class SharedService {

  //User that is logged in
  public userSource = new BehaviorSubject<User>(new User());
  public userCurrent = this.userSource.asObservable();

  public userIdSource = new BehaviorSubject<string>(null);
  public userIdCurrent = this.userSource.asObservable();

  loggedIn: boolean;
  public feedPagination = 0;
  userIdTest: string;


  constructor(private _http: HttpClient, public _snackBar: MatSnackBar) {
  }

  changeUser(user: User) {
    this.userSource.next(user);
  }

  changeUserId(userId: string) {
    this.userIdSource.next(userId);
  }

  //Gets a user
  getUser(userId: string) {
    this._http.get<User>("api/User/GetUser/" + userId)
      .subscribe(data => {
        this.changeUser(data);
        this.loggedIn = true;
      }),
      error => {
        console.log(error);
        this.loggedIn = false;
      }
  }

  /*
  checkLoginCookie = (): Promise<string> => {
    return new Promise((resolve => {
      this._http.get<string>("api/Cookie/GetCookieContent/LoggedIn")
        .subscribe(response => {
          var ok = response;
          resolve(ok);
        })
    }))
  }
  */

  /*
  getUserIdCookie() {
    this._http.get<string>("api/Cookie/GetCookieContent/userid")
      .subscribe(data => {
        this.loggedIn = true;
      }),
      error => {
        this.loggedIn = false;
      }
  }*/


  getUserIdCookie = (): Promise<string> => {
    return new Promise((resolve => {
      this._http.get<string>("api/Cookie/GetCookieContent/userid")
        .subscribe(response => {
          this.changeUserId(response);
          var ok = response;
          resolve(ok);
        })
    }))
  }


  async checkLogin(): Promise<boolean> {

    if (this.loggedIn) {
      console.log("Logged in");
      return true;
    }
    else {
      console.log("Not logged in");
      return false;
    }
  }


  //Opens a notification at the bottom of the page
  openSnackBarMessage(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.horizontalPosition = "center";
    config.verticalPosition = "bottom";
    config.duration = 6000;

    this._snackBar.open(message, action, config);
  }
}

