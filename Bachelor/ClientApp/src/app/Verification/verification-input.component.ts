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
  public feedbackStatus: boolean;
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
    this.mailVerifyForm.controls['experienceField'].setValue('');
  }

  ngOnInit() {
    this.checkForExperienceToVerify();
  }

  sendOutFeedback(feedback: string, feedbackStatus: boolean) {
    this.feedback = feedback;
    this.feedbackStatus = feedbackStatus;
  }


  check() {
    console.log(this.mailVerifyForm.value.experienceField);
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
      var feedback = "Woops! Sorry, we're pretty new at this. " +
                     "And, it seems like our robot, Robert, doesn't recognize your domain. " +
                     "Could you help Robert the robot out, by adding your domain?";
      this.sendOutFeedback(feedback, false);
      this.sendToReviewButton = true;
    }
  }

  //
  async askForReview() {
    var domain = new Domain();
    domain.name = this.mailVerifyForm.value.mailVerify;
    var feedback = "";

    var sentReview = await this.verificationSerivce.sendDomainToReview(domain);

    if (sentReview) {
      feedback = "Awesome! Thanks a mill for helping Robert the robot out! He'll review it shortly.";
      this.sendOutFeedback(feedback, false);
    }
    else {
      feedback = "Something went wrong, please try again later...";
      this.sendOutFeedback(feedback, false);
    }
  }

  //Sends verification e-mail
  async sendVerification(experience: Experience, address: string) {
    var sentMail = await this.verificationSerivce.sendVerification(experience, address);
    var feedback = "";

    if (sentMail) {
      feedback = "Verification mail sent!";
      this.sendOutFeedback(feedback, true);
    }
    else {
      this.sendMailButton = false;
      feedback = "Verification mail could not be sent at this moment, please try again later";
      this.sendOutFeedback(feedback, false);
    }
  }
}
