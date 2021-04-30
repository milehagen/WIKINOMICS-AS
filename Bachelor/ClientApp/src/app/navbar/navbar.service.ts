import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { isThisTypeNode } from 'typescript';


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

  changeLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }

  logOut() {
    this.http.get("api/Cookie/CreateLoggedInCookie/" + 0).toPromise();
    this.changeLoggedIn(false);
    localStorage.removeItem("loggedIn");
  }

  async checkLoginCookie() {
    return new Promise((resolve, reject) => {
      this.http.get("api/Cookie/GetCookieContent/" + "loggedIn", { responseType : 'text'}).subscribe(response => {
        if(response === "1") {
          resolve(true);
        } else { reject(false); }
      })
    })
  }
}
