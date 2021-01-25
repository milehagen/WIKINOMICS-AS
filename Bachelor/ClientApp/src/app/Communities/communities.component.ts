import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Community } from '../Models/Community';

@Component({
  selector: 'app-home',
  templateUrl: './communities.component.html',
})

export class CommunitiesComponent {
  public selectedCommunity: Community;
  public allCommunities: Array<Community>;

  public postForm: FormGroup;


  formValidation = {
    textPost: [
      null, Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(1000)])
    ]
  }

  constructor(private _http: HttpClient, private fb: FormBuilder) {
    this.postForm = fb.group(this.formValidation)
  }


  ngOnInit() {
    this.getCommunities();
  }

  getCommunities() {
    this._http.get<Community[]>("api/Community/GetAll")
      .subscribe(data => {
        this.allCommunities = data;
      },
        error => console.log(error)
      );
  }




  sendPost() {

  }




}
