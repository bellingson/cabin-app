import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {TestAdminService} from "./test-admin.service";
import {adminRouting} from "./admin.routing";

import {TestSessionListComponent} from "./test-session-list.component";
import { AdminBaseComponent } from './admin-base.component';
import { TestSessionDetailComponent } from './test-session-detail.component';
import { PatientListComponent } from './patient-list.component';
import { AdminLinksComponent } from './admin-links.component';
import {AdminGuard} from "./admin.guard";
import { AdminSettingsComponent } from './admin-settings.component';

@NgModule({
  declarations: [ TestSessionListComponent, AdminBaseComponent, TestSessionDetailComponent, PatientListComponent, AdminLinksComponent, AdminSettingsComponent ],
  imports: [ CommonModule,
              FormsModule,
              ReactiveFormsModule,
              HttpClientModule,
              adminRouting],
  providers: [ TestAdminService, AdminGuard ]
})

export class AdminModule {

}
