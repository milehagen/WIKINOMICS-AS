import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  public loggedIn = false;
  public loggedInSubject = new BehaviorSubject(this.loggedIn);
  public loggedInObserveable = this.loggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { this.loggedIn = false; }

  updateNav() {
    console.log("Bruker logget inn, setter loggetIn");
    this.loggedIn = true;
  }


  getCookieValue() {
    this.http.get("api/Cookie/GetCookieContent/" + "LoggedIn").subscribe(value => {
      console.log(value);
      if (value === 1) {
        this.loggedIn = true;
      }
    },
      error => console.log(error)
    );
    console.log("ferdig med get call, returnerer: " + this.loggedIn);
  }

  changeLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }
}
