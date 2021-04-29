import { Component,OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { SharedService } from "src/app/Communities/shared/shared.service";
import { Experience } from "src/app/Models/Users/Experience";
import { Industry } from "src/app/Models/Users/industry";
import { StudentSubject } from "src/app/Models/Users/StudentSubject";
import { User } from "src/app/Models/Users/User";
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
    public user : User;
    

    constructor(private route : ActivatedRoute,
        private router : Router,
        private userService : UserService,
        private formBuilder : FormBuilder,
        private sharedService : SharedService,
        ) {

    }

    get occupation() {
        return this.formPatchExperience.get("occupation");
    }

    get subject() {
        return this.formPatchExperience.get("subjects");
    }

    get industry() {
        return this.formPatchExperience.get("industry");
    }

    get business() {
        return this.formPatchExperience.get("business");
    }

    get startDate() {
        return this.formPatchExperience.get("startDate");
    }

    get endDate() {
        return this.formPatchExperience.get("endDate");
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
        this.sharedService.userCurrent.subscribe(user => this.user = user);
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

    async submit() {
        //First check if any of the values have changed
        const updateExperience = new Experience();
        updateExperience.id = this.experience.id;
        updateExperience.user = this.experience.user;
        updateExperience.verified = this.experience.verified;

        if(this.occupation.dirty == true && this.occupation.value.occupation != this.experience.occupation) {
            updateExperience.occupation = this.occupation.value.occupation;
        } else { updateExperience.occupation = this.experience.occupation; }

        if(this.subject.dirty == true && this.subject.value.title != this.experience.studentSubject.title) {
            updateExperience.studentSubject = this.subject.value.title;
        } else { updateExperience.studentSubject = this.experience.studentSubject; }

        if(this.industry.dirty == true && this.industry.value.title != this.experience.industry.title) {
            updateExperience.industry = this.industry.value.title;
        } else { updateExperience.industry = this.experience.industry; }

        if(this.business.dirty == true && this.business.value != this.experience.business) {
            updateExperience.business = this.business.value;
        } else { updateExperience.business = this.experience.business; }

        if(this.startDate.dirty == true && this.startDate.value != this.experience.startDate) {
            updateExperience.startDate = this.startDate.value;
        } else { updateExperience.startDate = this.experience.startDate; }

        if(this.endDate.dirty == true && this.endDate.value != this.experience.endDate) {
            updateExperience.endDate = this.endDate.value;
        } else { updateExperience.endDate = this.experience.endDate; }


        console.log(updateExperience);
        await this.userService.patchExperience(updateExperience).then(res => {
            if(res) {
                this.sharedService.openSnackBarMessage("Erfaring redigert", "Ok");
                this.userService.GetUser(this.user.id).then(updatedUser => {
                this.sharedService.changeUser(updatedUser);
               });
            } else {
                console.log("Fikk false");
            }
        }).then(() => {
            this.router.navigate(['/profile/experience']);
        })
    }

    resetForm() {
        this.formPatchExperience.reset();
    }
}