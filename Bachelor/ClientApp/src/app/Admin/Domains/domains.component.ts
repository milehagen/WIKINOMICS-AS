import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Domain } from "../../Models/Users/Domain";
import { DomainsService } from "./domains.service";


@Component({
  selector: 'domains-component',
  templateUrl: './domains.component.html',
  providers: []
})

export class DomainsComponent {
  public domainVerifyForm: FormGroup;
  public manualFeedback: string;
  public reviewFeedback: string;
  public sendMailButton: boolean;
  public sendToReviewButton: boolean;

  verifiedDomains: Domain[];
  verifiedDomainsSub: Subscription;

  unverifiedDomains: Domain[];
  unverifiedDomainsSub: Subscription;

  domainPattern = RegExp(/^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/);

  domainVerifyValidation = {
    domainField: [
      null, Validators.compose([Validators.required, Validators.pattern(this.domainPattern)])
    ]
  }

  constructor(private fb: FormBuilder, private domainsService: DomainsService) {
    this.domainVerifyForm = fb.group(this.domainVerifyValidation);
  }

  ngOnInit() {
    this.verifiedDomainsSub = this.domainsService.verifiedDomainsCurrent.subscribe(domains => this.verifiedDomains = domains);
    this.unverifiedDomainsSub = this.domainsService.unverifiedDomainsCurrent.subscribe(domains => this.unverifiedDomains = domains);

    this.domainsService.getVerifiedDomains();
    this.domainsService.getUnverifiedDomains();
  }

  ngOnDestroy() {
    this.verifiedDomainsSub.unsubscribe();
    this.unverifiedDomainsSub.unsubscribe();
  }

  //When we write a domain at the top
  async addDomainManually() {
    var domain = new Domain();
    domain.name = this.domainVerifyForm.value.domainField;


    var ok = await this.domainsService.addDomain(domain);

    if (ok) {
      this.manualFeedback = "Domain " + domain.name + " was added.";
    } else {
      this.manualFeedback = "Domain " + domain.name + " could not be added.";
    }
  }

  //When we accept domains that are requested from users
  async addDomain(domain: Domain) {
    var ok = await this.domainsService.addDomain(domain);

    if (ok) {
      this.domainsService.getUnverifiedDomains();
    } else {
      this.reviewFeedback = "Domain " + domain.name + " could not be added.";
    }
  }

  //Removing a previously verified domain or one up for request
  async deleteDomain(domain: Domain) {
    var ok = await this.domainsService.deleteDomain(domain);

    if (ok) {
      this.domainsService.getUnverifiedDomains();
      console.log("delete returned with OK");
    }
  }

}
