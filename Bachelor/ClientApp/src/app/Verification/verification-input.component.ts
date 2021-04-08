import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Experience } from "../Models/Users/Experience";
import { VerificationService } from "./verification.service";


@Component({
  selector: 'app-home',
  template: `<form [formGroup]="mailVerifyForm">

             <div class="form-group">
             <label for="verifyMail">Email to verify</label>
             <input type="text" placeholder="Mail" id="verifyMail" class="form-control" /> <br />
             </div>

             <div class="form-group">
             <button class="btn submit-btn" id="verifyButton" type="submit" [disabled]="!mailVerifyForm.valid && !buttonDisabled" (click)="checkMail()">Submit</button>
             </div>

             <ng-container *ngIf="feedback !== undefined">{{feedback}}</ng-container>
             </form>`,
  providers: [VerificationService]
})

export class VerificationInputComponent {
  public mailVerifyForm: FormGroup;
  public feedback: string;
  public experience: Experience;
  public buttonDisabled: boolean;

  mailVerifyValidation = {
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

    //Checks if given mail address contains a domain we recognize
    var foundDomain = await this.verificationSerivce.checkMail(mail)

    if (foundDomain) {
      this.buttonDisabled = true;
      this.sendVerification(mail);
      console.log("Domain found and mail should be sent");

    } else {
      this.feedback = "Sorry your domain is not recognized by us.";
    }
  }

  //Sends verification e-mail
  async sendVerification(address: string) {
    var sentMail = await this.verificationSerivce.sendVerification(this.experience, address);

    if (sentMail) {
      this.feedback = "Verification mail sent!";
    }
    else {
      this.buttonDisabled = false;
      this.feedback = "Verification mail could not be sent at this moment, please try again later";
    }
  }
}
