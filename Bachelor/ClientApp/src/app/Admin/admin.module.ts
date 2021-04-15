import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { ReportsComponent } from './Reports/reports.component';
import { ReportsService } from './Reports/reports.service';
import { SettingsService } from './Settings/settings.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomainsService } from './Domains/domains.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
  ],
  providers: [ReportsService, SettingsService, DomainsService],
  exports: [
    CommonModule,
    FormsModule,
  ]
})
export class AdminModule { }
