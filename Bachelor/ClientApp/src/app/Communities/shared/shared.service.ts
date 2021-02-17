import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../Models/User';

@Injectable()
export class SharedService {

  //User that is logged in
  public userSource = new BehaviorSubject<User>(new User());
  public userCurrent = this.userSource.asObservable();

  loggedIn: boolean;


  constructor(private _http: HttpClient, public _snackBar: MatSnackBar) {
  }

  changeUser(user: User) {
    this.userSource.next(user);
  }

  //Gets a user
  getUser(userId: number) {
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


  //Generates a semi random ID for guest users, stored in session
  generateTempID() {
    let tempID: string = "Anon";
    let date = Date.now();
    let randomNumberLarge = Math.floor(Math.random() * 1000) + 1;
    let randomNumberSmall = Math.floor(Math.random() * 9) + 1;

    let randomID = (date * randomNumberLarge) - randomNumberSmall * randomNumberLarge;
    tempID += randomID;

    sessionStorage.setItem("tempID", tempID);

    return true;
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




  //checks if you logged in or already have a tempID, if not a temporary ID is generated.
  //This ID is used to keep track of you in threads and posts
  async checkLoginTempUser(): Promise<boolean> {
    this.loggedIn = false;
    var tempID = sessionStorage.getItem("tempID");

    if (tempID == null) {
      this.generateTempID();
    }
    return true;
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

