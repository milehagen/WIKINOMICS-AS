import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get("api/Cookie/CreateLoggedInCookie/" + "0").subscribe(res => { });
  }
  
}
