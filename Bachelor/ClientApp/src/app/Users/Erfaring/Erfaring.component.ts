import { HttpClient } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Experience } from 'src/app/Models/User/Experience';
import { NavbarService } from 'src/app/navbar/navbar.service';

@Component ({
    selector: 'app-home',
    templateUrl: './Erfaring.component.html'
})
export class ErfaringComponent {
    subscription : Subscription
    private loggedIn : boolean;
    public allExperiences : Array<Experience>;
    constructor(
        private http : HttpClient,
        private navbarService : NavbarService,
        private router : Router)
        {}

    ngOnInit() {
        this.subscription = this.navbarService.loggedInObserveable.subscribe(value => this.loggedIn = value);
        if(!this.loggedIn) {
            console.warn("Du er ikke logget inn");
           // this.router.navigate(['/home']);
        }
        this.http.get("api/Cookie/GetCookieContent/" + "userid", { responseType: 'text'}).subscribe(t => {
            let token = t;
            this.http.get("api/JwtToken/DecodeToken/" + token).subscribe(id => { 
                console.log(id);
            },
              error => console.log(error)
            );
          },
            error => console.log(error)
          );
    }

}