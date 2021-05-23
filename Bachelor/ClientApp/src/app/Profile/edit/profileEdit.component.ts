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
    styleUrls: ['../profile.component.css'],
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

    //new
    private EditOccupation : boolean = false;
    private EditIndustry : boolean = false;
    private EditSubject : boolean = false;
    private EditBusiness : boolean = false;
    private EditStartDate : boolean = false;
    private EditEndDate : boolean = false;

    private showOccupationBusinessName : boolean = false;
    private showSelectSubject : boolean = false;
    private showSelectIndustry : boolean = false;

    private occupationBusniessInput;
    private selectedOccupation;
    private selectedIndustry;
    private selectedSubject;
    private inputBusiness;
    private inputStartDate;
    private inputEndDate;

    //
    

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

    Occupations : Array<Object>= [
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

        this.userService.userCurrent.subscribe(user => this.user = user);
        this.route.paramMap.subscribe((param : ParamMap) => {
            this.experienceId = +param.get('experienceId');
        });

        await this.userService.GetIndustries().then(response => { this.allIndustries = response});
        await this.userService.GetStudentSubjects().then(response => { this.allSubjects = response;}); 

        await this.userService.GetExperience(this.experienceId).then(res => {
            this.experience = res;
            this.startDateConverted = this.experience.startDate.toString().split('T')[0];
            if(this.experience.endDate != null) { this.endDateConverted = this.experience.endDate.toString().split('T')[0];}
        }).catch(error => {
            console.log(error);
        });
    }

   /* async submit() {
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
                this.experience.user = updatedUser;
               });
            } else {
                console.log("Fikk false");
            }
        }).then(() => {
            this.router.navigate(['/profile/experience']);
        })
    }
    */

    resetForm() {
        this.formPatchExperience.reset();
    }

    async updateOccupation() {
        if(this.selectedOccupation === undefined && typeof this.selectedOccupation == 'undefined') {
            this.sharedService.openSnackBarMessage("You have to choose something in the menu", "Ok");
            return;
        }
        const updatedExperience = this.experience;
        updatedExperience.occupation = this.selectedOccupation.occupation;

        if(updatedExperience.occupation === "Business owner") {
            updatedExperience.business = this.occupationBusniessInput;
        } else { updatedExperience.business = null; }

        this.update(updatedExperience);
        this.hideDivs();
    }

    openOccupationEdit() {
        this.hideDivs();
        this.EditOccupation = true;
    }

    onOccupationChange() {
        if(this.selectedOccupation.occupation === 'Business owner') {
            this.showOccupationBusinessName = true;
        } else  { this.showOccupationBusinessName = false; }
    }

    async updateIndustry() {
        if(this.selectedIndustry === undefined && typeof this.selectedIndustry == 'undefined') {
            this.sharedService.openSnackBarMessage("You have to choose something in the menu", "Ok");
            return;
        }

        const updatedExperience = this.experience;
        updatedExperience.industry = this.selectedIndustry;
        await this.update(updatedExperience);
        this.selectedIndustry = undefined;
        this.hideDivs(); 
    }

    openIndustryEdit() {
        this.hideDivs();
        this.EditIndustry = true;
        console.log(this.experience);
    }

    async updateSubject() {
        if(this.selectedSubject === undefined && typeof this.selectedSubject == 'undefined') {
            this.sharedService.openSnackBarMessage("You have to choose something in the menu", "Ok");
            return;
        }

        const updatedExperience = this.experience;
        updatedExperience.studentSubject = this.selectedSubject;
        await this.update(updatedExperience);
        this.hideDivs();
    }

    openSubjectEdit() {
        this.hideDivs();
        this.EditSubject = true;
    }

    async updateBusiness() {
        if(this.inputBusiness === undefined && typeof this.inputBusiness == 'undefined') {
            this.sharedService.openSnackBarMessage("You have to choose something in the menu", "Ok");
            return;
        }

        const updatedExperience = this.experience;
        updatedExperience.business = this.inputBusiness;
        await this.update(updatedExperience);
        this.hideDivs();
    }

    openBusinessEdit()  {
        this.hideDivs();
        this.EditBusiness = true;
    }

    async updateStartDate() {
        if(this.inputStartDate === undefined && typeof this.inputStartDate == 'undefined') {
            this.sharedService.openSnackBarMessage("You have to choose something in the menu", "Ok");
            return;
        }

        const updatedExperience = this.experience;
        console.log(this.inputStartDate);
        updatedExperience.startDate = this.inputStartDate;
        await this.update(updatedExperience);
        this.hideDivs();
    }

    async updateEndDate() {
        if(this.inputEndDate === undefined && typeof this.inputEndDate == 'undefined') {
            this.sharedService.openSnackBarMessage("You have to choose something in the menu", "Ok");
            return;
        }

        const updatedExperience = this.experience;
        updatedExperience.endDate = this.inputEndDate;
        await this.update(updatedExperience);
        this.hideDivs();
    }

    openDateEdit(value : number) {
        this.hideDivs();
        if(value === 0) {
            this.EditStartDate = true;
        } else {
            this.EditEndDate = true;
        }
    }


    //TODO
    // FIKS REDIGERING AV TID OG FIKS EKSTRA OPPDATERING RUNDT OCCUPATION
    //
    hideDivs() {
        this.EditBusiness = false;
        this.EditEndDate = false;
        this.EditIndustry = false;
        this.EditOccupation = false;
        this.EditStartDate = false;
        this.EditSubject = false;
    }

    async update(exp : Experience) {
        console.log(exp);
        await this.userService.patchExperience(exp).then(res => {
            if(res) {
                this.sharedService.openSnackBarMessage("Erfaring redigert", "Ok");
                this.userService.GetUser(this.user.id).then(updatedUser => {
                this.sharedService.changeUser(updatedUser);
                this.experience.user = updatedUser;
               });
            } else {
                console.log("Fikk false");
            }
        });
    }

}