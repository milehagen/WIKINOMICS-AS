import { HttpClient } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/Communities/shared/shared.service';
import { Industry } from 'src/app/Models/Users/Industry';
import { StudentSubject } from 'src/app/Models/Users/StudentSubject';
import { User } from 'src/app/Models/Users/User';
import { consoleTestResultHandler } from 'tslint/lib/test';
import { Experience } from '../../Models/Users/Experience';
import { NavbarService } from '../../navbar/navbar.service';
import { UserService } from '../users.service';

@Component ({
    selector: 'app-home',
    templateUrl: './Erfaring.component.html',
    styleUrls: ['../usersStyles.css']
})
export class ErfaringComponent {
    private loggedIn : boolean;
    public allExperiences : Array<Experience>;
    public addMoreExp : boolean = false;
    public intro : boolean = true;
    private token : any;
    private userid : any;
    private user : User;
    public allIndustries: Array<Industry>;
    public allSubjects: Array<StudentSubject>;
    public subject : String;
    public industry : Industry;
    public studentSubject : StudentSubject;
    subscription: Subscription;
    private questionRegEx = "[a-zA-ZæøåÆØÅ0-9_.,&!?()% ]{2,150}";

    // the variables connecting to the select menus
    public selOccupation : string;
    public selIndustry : Industry;
    public selStudentSubject : StudentSubject;
    public showSelIndustry : boolean = false;
    public showSelStudentSubjects : boolean = false;
    
    constructor(
        private http : HttpClient,
        private navbarService : NavbarService,
        private userService : UserService,
        private router : Router,
        private formBuilder : FormBuilder,
        private sharedService : SharedService,
        ) { 
            this.formAddExpInfo = formBuilder.group(this.formValidation);
        }

        formAddExpInfo = this.formBuilder.group({
            questionRole : [''],
            questionBest : [''],
            questionChallenging : [''],
            questionAdvice : ['']
        });


        formValidation = {
            questionRole : [
                null, Validators.compose([Validators.required,Validators.pattern(this.questionRegEx)])
            ],
            questionBest : [
                null, Validators.compose([Validators.required,Validators.pattern(this.questionRegEx)])
            ],
            questionChallenging : [
                null, Validators.compose([Validators.required,Validators.pattern(this.questionRegEx)])
            ],
            questionAdvice : [
                null, Validators.compose([Validators.required,Validators.pattern(this.questionRegEx)])
            ],
        }

        get questionRole() {
            return this.formAddExpInfo.get("questionRole");
        }

        get questionBest() {
            return this.formAddExpInfo.get("questionBest");
        }

        get questionChallenging() {
            return this.formAddExpInfo.get("questionChallenging");
        }

        get questionAdvice() {
            return this.formAddExpInfo.get("questionAdvice");
        }

    async ngOnInit() {
        this.sharedService.userCurrent.subscribe(user => this.user = user);
        this.userService.GetIndustries();
        this.userService.GetStudentSubjects();
        this.subscription = this.userService.loggedInCurrent.subscribe(value => this.loggedIn = value);
        console.log(this.loggedIn);
        /*if(!this.loggedIn) {
            window.alert("Du er ikke logget inn");
            this.router.navigate(['/logIn']);
        }
        */

       this.userService.getUserInit().then((res) => {
           this.sharedService.changeUser(res);
           console.log(res.firstname);
       });
       console.log(this.user.experience);
    }

    // This is the submit function for the first form
    submit() {
       const newExp = new Experience();
       
       newExp.questionRole = this.formAddExpInfo.controls.questionRole.value || null;
       newExp.questionBest = this.formAddExpInfo.controls.questionBest.value || null;
       newExp.questionChallenging = this.formAddExpInfo.controls.questionChallenging.value || null;
       newExp.questionAdvice = this.formAddExpInfo.controls.questionAdvice.value || null;
       newExp.user = this.user;
      
       this.userService.PostExpInfo(newExp).then(() => {
            this.formAddExpInfo.reset();
            this.router.navigate(['/profile']);
       }).catch((error) => {
           console.log(error);
       })
       
    }

    addMore() {
            this.addMoreExp = true;
            this.intro = false;
    }

    switchDivs(hide : string, show : string) {
        document.getElementById(hide).style.display = "none";
        document.getElementById(show).style.display = "block";
    }
}
