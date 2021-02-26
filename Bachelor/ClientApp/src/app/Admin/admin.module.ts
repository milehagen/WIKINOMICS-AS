import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { ReportsComponent } from './Reports/reports.component';
import { ReportsService } from './Reports/reports.service';
import { SettingsService } from './Settings/settings.service';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    AdminComponent,
    ReportsComponent,
  ],
  providers: [ReportsService, SettingsService],
  exports: [
    CommonModule,
    FormsModule,
    AdminComponent,
    ReportsComponent,
  ]
})
export class SharedModule { }
