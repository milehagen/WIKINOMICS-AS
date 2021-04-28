import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../Models/Users/User';

@Injectable()
export class SharedService {

  //User that is logged in
  public userSource = new BehaviorSubject<User>(new User());
  public userCurrent = this.userSource.asObservable();

  public userIdSource = new BehaviorSubject<string>(null);
  public userIdCurrent = this.userIdSource.asObservable();

  public loggedInSource = new BehaviorSubject<boolean>(null);
  public loggedInCurrent = this.loggedInSource.asObservable();


  loggedIn: boolean;
  public feedPagination = 0;
  public user: User;


  constructor(private _http: HttpClient, public _snackBar: MatSnackBar) {
  }

  changeUser(user: User) {
    this.userSource.next(user);
  }

  changeUserId(userId: string) {
    this.userIdSource.next(userId);
  }

  changeLoggedIn(value: boolean) {
    this.loggedInSource.next(value);
  }

  //Gets user with awaitable response
  getUser = (userId: string): Promise<boolean> => {
    return new Promise((resolve => {
      this._http.get<User>("api/User/GetUser/" + userId)
        .subscribe(data => {
          this.changeUser(data);
          this.changeLoggedIn(true);
          this.loggedIn = true;
          resolve(true);
        }, error => {
          console.log(error);
          this.loggedIn = false;
          resolve(false);
        })
    }))
  }


  getTokenCookie = (): Promise<string> => {
    return new Promise(((resolve, reject) => {
      this._http.get("api/Cookie/GetCookieContent/userid", { responseType: "text" })
        .subscribe(response => {
          var ok = response;
          resolve(ok);
        })
    }))
  }

  getUserIdFromToken = (token: string): Promise<string> => {
    return new Promise((resolve => {
      this._http.get("api/JwtToken/DecodeToken/" + token, { responseType: "text" })
        .subscribe(response => {
          this.changeUserId(response);
          var ok = response;
          resolve(ok);
        })
    }))
  }

  async checkLogin(): Promise<boolean> {
    if (this.loggedIn) {
      return true;
    }
    else {
      return false;
    }
  }

  //Opens a notification at the bottom of the page
  openSnackBarMessage(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.horizontalPosition = "center";
    config.verticalPosition = "bottom";
    config.duration = 8000;

    this._snackBar.open(message, action, config);
  }
}

