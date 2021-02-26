import { Component } from "@angular/core";
import { ReportsService } from "./Reports/reports.service";
import { SettingsService } from "./Settings/settings.service";

@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./AdminStyle.css'],
  providers: [ReportsService, SettingsService]
})

export class AdminComponent {

}
