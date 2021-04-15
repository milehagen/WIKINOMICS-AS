import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Domain } from "../Models/Users/Domain";
import { Experience } from "../Models/Users/Experience";
import { VerificationService } from "./verification.service";


@Component({
  selector: 'verification-input',
  templateUrl: './verification-input.component.html',
  providers: [VerificationService]
})

export class VerificationInputComponent implements OnInit{
  public mailVerifyForm: FormGroup;
  public feedback: string;
  @Input() public experiences: Experience[];
  public sendMailButton: boolean;
  public sendToReviewButton: boolean;
  public experienceToVerify: boolean;

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

  ngOnInit() {
    this.checkForExperienceToVerify();
  }


  //This checks if the experiences given to the component as input
  //have any experiences that aren't verified. If not then we don't render the HTML for component
  checkForExperienceToVerify() {
    for (let exp of this.experiences) {

      if (!exp.verified) {
        this.experienceToVerify = true;
        break;
      }
      else {
        this.experienceToVerify = false;
      }
    }
  }


  //Checks if we can send a verification e-mail
  async checkMail() {
    var mail = this.mailVerifyForm.value.mailVerify;
    var experience = this.mailVerifyForm.value.experienceField;

    //Checks if given mail address contains a domain we recognize
    var foundDomain = await this.verificationSerivce.checkMail(mail)

    if (foundDomain) {
      this.sendMailButton = true;
      this.sendVerification(experience, mail);
      console.log("Domain found and mail should be sent");

    } else {
      this.feedback = "Sorry your domain is not recognized by us. You can ask to have the domain added";
      this.sendToReviewButton = true;
    }
  }

  //
  async askForReview() {
    var domain = new Domain();
    domain.name = this.mailVerifyForm.value.mailVerify;


    var sentReview = await this.verificationSerivce.sendDomainToReview(domain);

    if (sentReview) {
      this.feedback = "Your domain has been added, and will be reviewed shortly!";
    }
    else {
      this.feedback = "Something went wrong, please try again later...";
    }
  }

  //Sends verification e-mail
  async sendVerification(experience: Experience, address: string) {
    var sentMail = await this.verificationSerivce.sendVerification(experience, address);

    if (sentMail) {
      this.feedback = "Verification mail sent!";
    }
    else {
      this.sendMailButton = false;
      this.feedback = "Verification mail could not be sent at this moment, please try again later";
    }
  }
}
