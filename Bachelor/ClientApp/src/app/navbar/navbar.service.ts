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

  constructor(private http: HttpClient) {
    this.loggedIn = false;
  }

  updateNav() {
    console.log("Bruker logget inn, setter loggetIn");
    this.loggedIn = true;
  }

  changeLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }

  logOut() {
    this.http.get("api/Cookie/CreateLoggedInCookie/" + 0).toPromise();
    this.changeLoggedIn(false);
  }
}