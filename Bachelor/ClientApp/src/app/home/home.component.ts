import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Industry } from '../Models/Industry';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.css' ],
})

export class HomeComponent {
  loggedIn: boolean;
  public allIndustries: Array<Industry>;

  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this.listIndustries();
  }

  listIndustries() {
    this._http.get<Industry[]>("api/User/GetAllIndustries").subscribe(data => {
      this.allIndustries = data;
    },
      error => console.log(error)
    );
  }

}