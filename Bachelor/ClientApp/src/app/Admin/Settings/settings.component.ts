import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { Subscription } from "rxjs";
import { SiteSetting } from "../../Models/Admin/SiteSetting";
import { SettingsService } from "./settings.service";

@Component({
  selector: 'settings-component',
  templateUrl: './settings.component.html',
  styleUrls: ['../AdminStyle.css'],
  providers: []
})

export class SettingsComponent {
  settings: SiteSetting[];
  settingsSub: Subscription;


  settingsForm: FormGroup;



  constructor(
    private settingsService: SettingsService,
    private _formBuilder: FormBuilder) {
    this.settingsForm = this._formBuilder.group({
      settingsArray: this._formBuilder.array([])
    });
  }


  ngOnInit() {
    this.settingsSub = this.settingsService.settingsCurrent.subscribe(settings => this.settings = settings);

    this.settingsService.getSettings();
  }

  ngOnDestroy() {
    this.settingsSub.unsubscribe();
  }


  updateSettings() {

  }
}
