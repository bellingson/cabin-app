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


@NgModule({
  declarations: [ TestSessionListComponent, AdminBaseComponent, TestSessionDetailComponent, ParticipantListComponent, AdminLinksComponent, AdminSettingsComponent ],
  imports: [ CommonModule,
              FormsModule,
              ReactiveFormsModule,
              HttpClientModule,
              adminRouting],
  providers: [
    TestAdminService, AdminGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, }
  ]
})

export class AdminModule {

}
