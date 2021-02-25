import { Component } from "@angular/core";
import { ReportsService } from "./Reports/reports.service";

@Component({
  selector: 'admin-component',
  templateUrl: './admin.component.html',
  styleUrls: ['./AdminStyle.css'],
  providers: [ReportsService]
})

export class AdminComponent {

}
