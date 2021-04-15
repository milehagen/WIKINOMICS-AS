import { Component } from "@angular/core";
import { DomainsService } from "./Domains/domains.service";
import { ReportsService } from "./Reports/reports.service";
import { SettingsService } from "./Settings/settings.service";

@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./AdminStyle.css'],
  providers: [ReportsService, SettingsService, DomainsService]
})

export class AdminComponent {

}
