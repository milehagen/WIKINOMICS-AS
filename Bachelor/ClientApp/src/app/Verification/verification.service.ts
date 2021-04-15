import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Domain } from "../Models/Users/Domain";
import { Experience } from "../Models/Users/Experience";

@Injectable()
export class VerificationService {

  constructor(private _http: HttpClient) { }


  //Checks whether a domain is in our list and therefor can be verified
  checkMail = (address: string): Promise<boolean> => {
    return new Promise((resolve => {
      this._http.get("api/Verification/CheckMail/" + address)
        .subscribe(response => {
          resolve(true);
        }, error => {
          resolve(false);
        })
    }))
  }

  //Sends verification mail
  sendVerification = (experience: Experience, address: string): Promise<boolean> => {
    return new Promise((resolve => {
      this._http.get("api/Verification/SendVerification/" + experience.id + "/" + address)
        .subscribe(response => {
          resolve(true);
        }, error => {
          resolve(false);
        })
    }))
  }

  //Verifies experience on backend
  verifyExperience = (experienceId: number): Promise<boolean> => {
    return new Promise((resolve => {
      this._http.patch("api/Verification/Verify/" + experienceId, true)
        .subscribe(response => {
          resolve(true);
        }, error => {
          resolve(false);
        })
    }))
  }

  //Adds a domain not in our list for review to be added on a permanent basis
  sendDomainToReview = (domain: Domain): Promise<boolean> => {
    return new Promise((resolve => {
      this._http.post("api/Verification/AddToReview", domain)
        .subscribe(response => {
          resolve(true);
        }, error => {
          resolve(false);
        })
    }))
  }
}
