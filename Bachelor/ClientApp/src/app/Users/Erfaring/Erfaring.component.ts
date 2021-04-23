import { HttpClient } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Communities/shared/shared.service';
import { Industry } from 'src/app/Models/Users/industry';
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
    public addNewExp : boolean = false;
    private token : any;
    private userid : any;
    private user : User;
    public allIndustries: Array<Industry>;
    public allSubjects: Array<StudentSubject>;
    public subject : String;
    public industry : Industry;
    public studentSubject : StudentSubject;

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
                null, Validators.compose([Validators.required,Validators.pattern('[a-zA-ZæøåÆØÅ_., ]{2,150}')])
            ],
            questionBest : [
                null, Validators.compose([Validators.required,Validators.pattern('[a-zA-ZæøåÆØÅ_., ]{2,150}')])
            ],
            questionChallenging : [
                null, Validators.compose([Validators.required,Validators.pattern('[a-zA-ZæøåÆØÅ_., ]{2,150}')])
            ],
            questionAdvice : [
                null, Validators.compose([Validators.required,Validators.pattern('[a-zA-ZæøåÆØÅ_., ]{2,150}')])
            ],
        }

    async ngOnInit() {
        this.sharedService.userCurrent.subscribe(user => this.user = user);
        this.userService.GetIndustries();
        this.userService.GetStudentSubjects();
        this.navbarService.loggedInObserveable.subscribe(value => this.loggedIn = value);
        if(!this.loggedIn) {
            window.alert("Du er ikke logget inn");
            this.router.navigate(['/logIn']);
        }

       this.userService.getUserInit().then((res) => {
           this.sharedService.changeUser(res);
           console.log(res.firstname);
       });
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
            this.router.navigate(['/home']);
       }).catch((error) => {
           console.log(error);
       })
       
    }

    addMore() {
        if(this.addMoreExp) {
            this.addMoreExp = false;
        } else {
            this.addMoreExp = true;
        }
    }

    switchDivs(hide : string, show : string) {
        document.getElementById(hide).style.display = "none";
        document.getElementById(show).style.display = "block";
    }
}
