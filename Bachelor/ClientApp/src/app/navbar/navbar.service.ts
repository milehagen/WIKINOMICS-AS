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
}
