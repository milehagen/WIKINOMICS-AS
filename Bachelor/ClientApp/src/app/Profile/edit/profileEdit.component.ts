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
    private showOccupationSubject : boolean = false;
    private showOccupationIndustry : boolean = false;
    private showSelectSubject : boolean = false;
    private showSelectIndustry : boolean = false;

    private occupationBusniessInput;
    private selectedOccupation;
    private selectedOccupationSubject
    private selectedOccupationIndustry;
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

    Occupations : Array<Object>= [
        { id: 0, occupation: "Student" },
        { id: 1, occupation: "Full-time employee" },
        { id: 2, occupation: "Business owner" },
        { id: 3, occupation: "Entrepreneur" },
        { id: 4, occupation: "None of the above" }
      ]
    
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

    async updateOccupation() {
        if(this.selectedOccupation === undefined && typeof this.selectedOccupation == 'undefined') {
            this.sharedService.openSnackBarMessage("You have to choose something in the menu", "Ok");
            return;
        }
        const updatedExperience = this.experience;
        updatedExperience.occupation = this.selectedOccupation.occupation;

        if(updatedExperience.occupation === "Business owner") {
            updatedExperience.business = this.occupationBusniessInput;
            updatedExperience.studentSubject = null;
        } else { updatedExperience.business = null; }

        if(updatedExperience.occupation === "Student") {
            updatedExperience.studentSubject = this.selectedOccupationSubject;
            updatedExperience.business = null;
            updatedExperience.industry = null;
        } else { updatedExperience.studentSubject = null; }

        if(updatedExperience.occupation === "Full-time employee") {
            updatedExperience.industry = this.selectedOccupationIndustry;
            updatedExperience.studentSubject = null;
            updatedExperience.business = null;
        }

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

        if(this.selectedOccupation.occupation === 'Student') {
            this.showOccupationSubject = true;
        } else { this.showOccupationSubject = false; }

        if(this.selectedOccupation.occupation === 'Full-time employee' && this.experience.industry === null) {
            this.showOccupationIndustry = true;
        } else { this.showOccupationIndustry = false; }
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