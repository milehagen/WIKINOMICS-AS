import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Domain } from "../../Models/Users/Domain";

@Injectable()
export class DomainsService {
  //Verified domains
  public verifiedDomainsSource = new BehaviorSubject<Domain[]>([]);
  public verifiedDomainsCurrent = this.verifiedDomainsSource.asObservable();

  //Unverified domains
  public unverifiedDomainsSource = new BehaviorSubject<Domain[]>([]);
  public unverifiedDomainsCurrent = this.unverifiedDomainsSource.asObservable();


  constructor(private _http: HttpClient) { }

  changeVerifiedDomains(domains: Domain[]) {
    this.verifiedDomainsSource.next(domains);
  }

  changeUnverifiedDomains(domains: Domain[]) {
    this.unverifiedDomainsSource.next(domains);
  }


  //Gets only the domains that are verified
  getVerifiedDomains() {
    this._http.get<Domain[]>("api/Verification/GetVerified")
      .subscribe(data => {
        this.changeVerifiedDomains(data);
      })
  }

  //Gets only the domains that are unverified
  getUnverifiedDomains() {
    this._http.get<Domain[]>("api/Verification/GetUnverified")
      .subscribe(data => {
        this.changeUnverifiedDomains(data);
      })
  }

  //Adds a domain, or verifies one that is in the DB but not yet verified
  addDomain = (domain: Domain): Promise<boolean> => {
    return new Promise((resolve => {
      this._http.post("api/Verification/Add", domain)
        .subscribe(respose => {
          resolve(true);
        }, error => {
          resolve(false);
        })
    }))
  }

  //Deletes a domain
  deleteDomain = (domain: Domain): Promise<boolean> => {
    return new Promise((resolve => {
      this._http.delete("api/Verification/Delete/" + domain.name)
        .subscribe(response => {
          resolve(true);
        }, error => {
          resolve(false);
        })
    }))
  }
}
