import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SiteSetting } from "../../Models/Admin/SiteSetting";



@Injectable()
export class SettingsService {

  //Settings
  public settingsSource = new BehaviorSubject<SiteSetting[]>([]);
  public settingsCurrent = this.settingsSource.asObservable();


  constructor(private _http: HttpClient) {
  }


  changeSettings(settings: SiteSetting[]) {
    this.settingsSource.next(settings);
  }


  getSettings() {
    this._http.get<SiteSetting[]>("api/admin/SiteSetting/GetAll")
      .subscribe(data => {
        this.changeSettings(data);
      })
  }

  updateSettings(settings: SiteSetting[]) {
    this._http.post("api/admin/settings/Change", settings)
      .subscribe(response => {

      })
  }



}
