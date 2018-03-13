import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TestAdminService} from "./test-admin.service";
import {adminRouting} from "./admin.routing";

import {TestSessionListComponent} from "./test-session-list.component";
import { AdminBaseComponent } from './admin-base.component';
import { TestSessionDetailComponent } from './test-session-detail.component';
import { ParticipantListComponent } from './participant-list.component';
import { AdminLinksComponent } from './admin-links.component';
import {AdminGuard} from "./admin.guard";
import { AdminSettingsComponent } from './admin-settings.component';
import {AuthInterceptor} from "../testing/user/auth.interceptor";
import { ParticipantViewComponent } from './participant-view.component';
import {ParticipantAdminService} from "./participant-admin.service";
import { TestSessionTableComponent } from './test-session-table.component';
import {TestDataService} from "../testing/face-test/test-data.service";
import {ParticipantAdminDataService} from "./participant-admin-data.service";
import { StartDateEditComponent } from './start-date-edit.component';


@NgModule({
  declarations: [ TestSessionListComponent, AdminBaseComponent, TestSessionDetailComponent, ParticipantListComponent, AdminLinksComponent, AdminSettingsComponent, ParticipantViewComponent, TestSessionTableComponent, StartDateEditComponent ],
  imports: [ CommonModule,
              FormsModule,
              ReactiveFormsModule,
              HttpClientModule,
              adminRouting],
  providers: [
    TestAdminService, TestDataService, ParticipantAdminService, ParticipantAdminDataService, AdminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, }
  ]
})

export class AdminModule {

}
