import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Domain } from "../Models/Users/Domain";
import { Experience } from "../Models/Users/Experience";

@Injectable()
export class VerificationService {

  constructor(private _http: HttpClient) { }


  //Checks whether a domain is in our list and therefor can be verified
  checkMail = (address: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this._http.get<boolean>("api/Verification/CheckMail/" + address)
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.log(error);
          resolve(false);
        })
    })
  }

  //Sends verification mail
  sendVerification = (experience: Experience, address: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this._http.get<boolean>("api/Verification/SendVerification/" + experience.id + "/" + address)
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.log(error);
          resolve(false);
        })
    })
  }

  //Verifies experience on backend
  verifyExperience = (experienceId: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this._http.patch<boolean>("api/Verification/Verify/" + experienceId, true)
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.log(error);
          resolve(false);
        })
    })
  }

  //Adds a domain not in our list for review to be added on a permanent basis
  sendDomainToReview = (domain: Domain): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this._http.post<boolean>("api/Verification/AddToReview", domain)
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.log(error);
          resolve(false);
        })
    })
  }
}
