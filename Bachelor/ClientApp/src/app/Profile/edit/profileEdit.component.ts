import { Component,OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Experience } from "src/app/Models/Users/Experience";
import { Industry } from "src/app/Models/Users/industry";
import { StudentSubject } from "src/app/Models/Users/StudentSubject";
import { UserService } from "src/app/Users/users.service";

@Component({
    selector : 'profile-edit-component',
    templateUrl : './profileEdit.component.html',

})

export class ProfileEditComponent {
    public experienceId : number;
    public experience : Experience;
    public startDateConverted : string;
    public endDateConverted : string;
    experienceLoaded : Promise<boolean>;
    public allIndustries : Array<Industry>;
    public allSubjects : Array<StudentSubject>;
    

    constructor(private route : ActivatedRoute,
        private userService : UserService,
        private formBuilder : FormBuilder,
        ) {

    }

    Occupations: Array<Object> = [
        { id: 0, occupation: "Student" },
        { id: 1, occupation: "Full-time employee" },
        { id: 2, occupation: "Business owner" },
        { id: 3, occupation: "Entrepreneur" },
        { id: 4, occupation: "None of the above" }
      ]
    
    formPatchExperience = this.formBuilder.group({
        occupation : [],
        field : [],
        business : [],
        startDate : [],
        endDate : [],
        industry : [],
        subjects : [],
    });

    async ngOnInit() {
        this.route.paramMap.subscribe((param : ParamMap) => {
            this.experienceId = +param.get('experienceId');
        });
        await this.userService.GetIndustries().then(response => { this.allIndustries = response});
        await this.userService.GetStudentSubjects().then(response => { this.allSubjects = response;}); 

        await this.userService.GetExperience(this.experienceId).then(res => {
            this.experience = res;
            this.startDateConverted = this.experience.startDate.toString().split('T')[0];
            if(this.experience.endDate != null) { this.endDateConverted = this.experience.endDate.toString().split('T')[0];}
            //Setting a boolean promise so that the experience object
            //can finish loading meanwhile the template loads aswell
            console.log("resolved");
        }).catch(error => {
            console.log(error);
        });

        this.experienceLoaded = Promise.resolve(true);
    }
}