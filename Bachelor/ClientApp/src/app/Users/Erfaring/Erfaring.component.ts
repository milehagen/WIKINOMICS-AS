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
        this.getIndustries();
        this.getSubjects();
        this.subscription = this.navbarService.loggedInObserveable.subscribe(value => this.loggedIn = value);
        if(!this.loggedIn) {
            window.alert("Du er ikke logget inn");
            this.router.navigate(['/logIn']);
        }

       await this.getcalls();
       console.log(this.user);
        if((this.user.experience.industry === null) && (this.user.experience.studentSubject === null)) {
           this.subject = this.user.experience.occupation
       } else if(this.user.experience.studentSubject === null) {
        this.subject = this.user.experience.industry.title;
       } else {
           this.subject = this.user.experience.studentSubject.title;
       }
       
    }

    // This is the submit function for the first form
    submit() {
       const newExp = new Experience();
       newExp.id = this.user.experience.id;
       newExp.preExp = this.formAddExpInfo.controls.preExp.value;
       newExp.badWithExp = this.formAddExpInfo.controls.badWithExp.value;
       newExp.goodWithExp = this.formAddExpInfo.controls.goodWithExp.value;
       this.http.post("api/User/PostExpInfo", newExp).subscribe(response => {
           console.log("Oppdatert");
           this.formAddExpInfo.reset();
           this.router.navigate(['/home']);
       });
    }

    //This is the submit function for the second form, here we add a new experience
    submitAddNewExp() {
        const newExperience = new Experience();
        newExperience.occupation = this.formAddNewExp.controls.occupation.value.occupation;

        //If idustry is empty set the value to an empty industry object
       if(this.selIndustry === null) {
           newExperience.industry = {} as Industry;
       } else {
           newExperience.industry = this.selIndustry;
       }

       //Same with studentsubject
       if(this.selStudentSubject === null) {
           newExperience.studentSubject = {} as StudentSubject;
       } else {
           newExperience.studentSubject = this.selStudentSubject;
       }

       newExperience.startDate = this.formAddNewExp.controls.startDate.value;
       newExperience.endDate = this.formAddNewExp.controls.endDate.value;

    if(newExperience.startDate > newExperience.endDate) return window.alert("Feil i datoinput, vennligst sjekk igjen");

       newExperience.preExp = this.formAddNewExp.controls.newPreExp.value;
       newExperience.badWithExp = this.formAddNewExp.controls.newBadWithExp.value;
       newExperience.goodWithExp = this.formAddNewExp.controls.newGoodWithExp.value;
       newExperience.userid = this.userid;
       console.log(newExperience);

       this.http.post("api/User/AddExperience", newExperience).subscribe(response => {
           console.log(response);
       },
       error => console.log(error)
       );


    }

    async PostExpInfo(user : User) {
        return new Promise(resolve => {
            this.http.post("api/User/PostExpInfo/", user).subscribe(response => {
                resolve(response);
            })
        })
    }

    async getcalls() {
        await this.GetCookieContent();
        const validated = await this.ValidateToken(this.token);
        if(!validated) {
            window.alert("Token not valid, please log in agian");
            this.router.navigate(['/logIn']);
        }
        await this.DecodeToken(this.token);
        await this.GetUser(this.userid);
    }

    async GetCookieContent() {
       return new Promise(resolve => {
        this.http.get("api/Cookie/GetCookieContent/" + "userid", { responseType : 'text' }).subscribe(response => {
            this.token = response;
            resolve(response);
        });
       });
    }

    async ValidateToken(token : any) {
        return new Promise(resolve => {
            this.http.get("api/JwtToken/ValidateToken/" + token, { responseType : 'text' }).subscribe(value => {
                resolve(value);
            })
        })
    }

    async DecodeToken(token : any) {
        return new Promise(resolve => {
            this.http.get("api/JwtToken/DecodeToken/" + token).subscribe(id => { 
                this.userid = id;
                resolve(id);
            });
          });
    }

    async GetUser(id : any) {
        return new Promise(resolve => {
            this.http.get<User>("api/User/GetUser/" + id).subscribe(user => {
                this.user = user;
                resolve(user);
            })
        })
    }

    addMore() {
        if(this.addMoreExp) {
            this.addMoreExp = false;
        } else {
            this.addMoreExp = true;
        }
    }

    addMoree() {
        this.addNewExp = true;
    }

    getIndustries() {
        this.http.get<Industry[]>("api/User/GetAllIndustries").subscribe(data => {
          this.allIndustries = data;
        },
          error => console.log(error)
        );
      }
    
      getSubjects() {
        this.http.get<StudentSubject[]>("api/User/GetAllStudentSubjects").subscribe(data => {
          this.allSubjects = data;
        },
          error => console.log(error)
        );
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
