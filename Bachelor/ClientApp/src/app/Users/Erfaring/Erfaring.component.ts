import { HttpClient } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    subscription : Subscription
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
        private formBuilder : FormBuilder)
        {this.formAddExpInfo = formBuilder.group(this.formValidation),
         this.formAddNewExp = formBuilder.group(this.formValidationforAddingNewExp)
        }

        formAddExpInfo = this.formBuilder.group({
            preExp : [''],
            badWithExp : [''],
            goodWithExp : [''],
        });

        formAddNewExp = this.formBuilder.group({
            newPreExp : [''],
            newBadWithExp : [''],
            newGoodWithExp : [''],
            occupation : [''],
            subjects : [''],
            industry : [''],
            startDate : [''],
            endDate : [''],
        });

        formValidation = {
            preExp : [
                null, Validators.compose([Validators.required,Validators.pattern('[a-zA-ZæøåÆØÅ_., ]{2,150}')])
            ],
            badWithExp : [
                null, Validators.compose([Validators.required,Validators.pattern('[a-zA-ZæøåÆØÅ_., ]{2,150}')])
            ],
            goodWithExp : [
                null, Validators.compose([Validators.required,Validators.pattern('[a-zA-ZæøåÆØÅ_., ]{2,150}')])
            ],
        }

        formValidationforAddingNewExp = {
            newPreExp : [
                null, Validators.compose([Validators.required,Validators.pattern('[a-zA-ZæøåÆØÅ_., ]{2,150}')])
            ],
            newBadWithExp : [
                null, Validators.compose([Validators.required,Validators.pattern('[a-zA-ZæøåÆØÅ_., ]{2,150}')])
            ],
            newGoodWithExp : [
                null, Validators.compose([Validators.required,Validators.pattern('[a-zA-ZæøåÆØÅ_., ]{2,150}')])
            ],
            industry : [],
            subjects : [],
            occupation : [null, Validators.required],
            startDate : [],
            endDate : [],
        }

        

        Occupations: Array<Object> = [
            { id: 0, occupation: "Student" },
            { id: 1, occupation: "Full-time employee" },
            { id: 2, occupation: "Busineess owner" },
            { id: 3, occupation: "Entrepreneur" },
            { id: 4, occupation: "None of the above" }
          ]

    async ngOnInit() {
        this.userService.GetIndustries();
        this.userService.GetStudentSubjects();
        this.subscription = this.navbarService.loggedInObserveable.subscribe(value => this.loggedIn = value);
        if(!this.loggedIn) {
            window.alert("Du er ikke logget inn");
            this.router.navigate(['/logIn']);
        }

       let CookieContent = await this.userService.GetCookieContent("userid");
       let ValidatedToken = await this.userService.ValidateToken(CookieContent);
       if(!ValidatedToken) {
           window.alert("Token ikke valid");
           this.router.navigate(['/home']);
       }
       let DecodedToken = await this.userService.DecodeToken(CookieContent);
       let User = await this.userService.GetUser(DecodedToken);
        Promise.all([
            CookieContent,
            ValidatedToken,
            DecodedToken,
            User
        ]).then(() => {
            this.user = User
        }).catch(errors => {
            console.log(errors);
        });
        console.log(CookieContent, ValidatedToken, DecodedToken, User);

       /* LAG OBSERVEABLE
        if((this.user.experience.industry === null) && (this.user.experience.studentSubject === null)) {
           this.subject = this.user.experience.occupation
       } else if(this.user.experience.studentSubject === null) {
        this.subject = this.user.experience.industry.title;
       } else {
           this.subject = this.user.experience.studentSubject.title;
       }
       */
       
    }

    // This is the submit function for the first form
    submit() {
       const newExp = new Experience();
       
       newExp.preExp = this.formAddExpInfo.controls.preExp.value;
       newExp.badWithExp = this.formAddExpInfo.controls.badWithExp.value;
       newExp.goodWithExp = this.formAddExpInfo.controls.goodWithExp.value;
       newExp.user = this.user;
        this.http.post("api/User/PostExpInfo", newExp).subscribe(response => {
        console.log("Oppdatert");
        this.formAddExpInfo.reset();
        this.router.navigate(['/home']);
       });
    }

    addMore() {
        if(this.addMoreExp) {
            this.addMoreExp = false;
        } else {
            this.addMoreExp = true;
        }
    }

      OnOccupationChange() {
          this.selOccupation = this.formAddNewExp.controls.occupation.value.occupation;
          if(this.selOccupation == "Student") {
              this.showSelStudentSubjects = true;
              this.showSelIndustry = false;
              this.selIndustry = null;
          } else if(this.selOccupation == "Full-time employee") {
              this.showSelStudentSubjects = false;
              this.selStudentSubject = null;
              this.showSelIndustry = true;
          } else {
              this.showSelIndustry = false;
              this.selStudentSubject = null;
              this.showSelStudentSubjects = false;
              this.selIndustry = null;
          }
      }

      OnSubjectChange() {
          this.selStudentSubject = this.formAddNewExp.controls.subjects.value;
      }

      OnIndustryChange() {
          this.selIndustry = this.formAddNewExp.controls.industry.value;
      }
}
