import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Experience } from "../Models/Users/Experience";
import { VerificationService } from "./verification.service";


@Component({
  selector: 'verification-input',
  template: `<ng-container *ngIf="feedback !== undefined">
                {{feedback}}
             </ng-container>

            <form [formGroup]="mailVerifyForm">
             <div class="form-group">
                <label for="experience">Experience to verify</label>
                <select class="form-control" formControlName="experienceField">
                    <option *ngFor="let exp of experiences" [ngValue]="exp">{{exp.occupation}} - {{exp.industry.title}} {{exp.studentSubject.title}}</option>
                </select>
             </div>
              
             <div class="form-group">
                <label for="verifyMail">Email for verification</label>
                <input type="text" placeholder="Mail" id="verifyMail" formControlName="mailVerify" class="form-control" /> <br />
             </div>

             <div class="form-group">
                <button class="btn btn-primary" id="verifyButton" type="submit" [disabled]="!mailVerifyForm.valid && !buttonDisabled" (click)="checkMail()">Submit</button>
             </div>
             </form>`,
  providers: [VerificationService]
})

export class VerificationInputComponent {
  public mailVerifyForm: FormGroup;
  public feedback: string;
  @Input() public experiences: Experience[];
  public buttonDisabled: boolean;
  public sendToReview: boolean;

  mailVerifyValidation = {
    experienceField: [
      null, Validators.compose([Validators.required])
    ],
    mailVerify: [
      null, Validators.compose([Validators.required, Validators.email])
    ]
  }

  constructor(private fb: FormBuilder, private verificationSerivce: VerificationService) {
    this.mailVerifyForm = fb.group(this.mailVerifyValidation);
  }

  //Checks if we can send a verification e-mail
  async checkMail() {
    var mail = this.mailVerifyForm.value.mailVerify;
    var experience = this.mailVerifyForm.value.experienceField;

    //Checks if given mail address contains a domain we recognize
    var foundDomain = await this.verificationSerivce.checkMail(mail)

    if (foundDomain) {
      this.buttonDisabled = true;
      this.sendVerification(experience, mail);
      console.log("Domain found and mail should be sent");

    } else {
      this.feedback = "Sorry your domain is not recognized by us.";
    }
  }

  askForReview() {

  }

  //Sends verification e-mail
  async sendVerification(experience: Experience, address: string) {
    var sentMail = await this.verificationSerivce.sendVerification(experience, address);

    if (sentMail) {
      this.feedback = "Verification mail sent!";
    }
    else {
      this.buttonDisabled = false;
      this.feedback = "Verification mail could not be sent at this moment, please try again later";
    }
  }
}
