import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {cabinRoutes} from "./app.router";

import { AppComponent } from './app.component';
import { FaceTestComponent } from './face-test/face-test.component';
import {UserService} from "./user/user.service";
import { UserInitComponent } from './user/user-init.component';
import { PreTestComponent } from './user/pre-test.component';
import { AppInitComponent } from './user/app-init.component';

import { AboutComponent } from './about/about.component';
import { TestCompleteComponent } from './face-test/test-complete.component';
import {TestService} from "./face-test/test.service";
import { UploadFailedComponent } from './face-test/upload-failed.component';
import { MoodButtonsComponent } from './face-test/mood-buttons.component';
import { PortraitMessageComponent } from './face-test/portrait-message.component';
import { ClearComponent } from './user/clear.component';
import { SettingsComponent } from './settings/settings.component';
import {AdminGuard} from "./admin/admin.guard";
import { MoodComponent } from './face-test/mood.component';
import { FaceComponent } from './face-test/face.component';
import {AuthInterceptor} from "./user/auth.interceptor";
import {AuthService} from "./user/auth.service";


@NgModule({
  declarations: [
    AppComponent,
    FaceTestComponent,
    UserInitComponent,
    PreTestComponent,
    AppInitComponent,
    AboutComponent,
    TestCompleteComponent,
    UploadFailedComponent,
    MoodButtonsComponent,
    PortraitMessageComponent,
    ClearComponent,
    SettingsComponent,
    MoodComponent,
    FaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    cabinRoutes
  ],
  providers: [UserService,
              AuthService,
              TestService,
              { provide: LocationStrategy, useClass: HashLocationStrategy },
              AdminGuard,
              { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
