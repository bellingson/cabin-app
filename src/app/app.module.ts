import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {cabinRoutes} from "./app.router";

import { AppComponent } from './app.component';
import { FaceTestComponent } from './face-test/face-test.component';
import {UserService} from "./user/user.service";
import { UserInitComponent } from './user/user-init.component';
import { PreTestComponent } from './user/pre-test.component';
import { AppInitComponent } from './user/app-init.component';
import { ResultsListComponent } from './results/results-list.component';
import { AboutComponent } from './about/about.component';
import { TestCompleteComponent } from './face-test/test-complete.component';
import {TestService} from "./face-test/test.service";
import { UploadFailedComponent } from './face-test/upload-failed.component';
import { MoodActiveComponent } from './face-test/mood-active.component';
import { MoodAfraidComponent } from './face-test/mood-afraid.component';
import { MoodButtonsComponent } from './face-test/mood-buttons.component';
import { PortraitMessageComponent } from './face-test/portrait-message.component';

@NgModule({
  declarations: [
    AppComponent,
    FaceTestComponent,
    UserInitComponent,
    PreTestComponent,
    AppInitComponent,
    ResultsListComponent,
    AboutComponent,
    TestCompleteComponent,
    UploadFailedComponent,
    MoodActiveComponent,
    MoodAfraidComponent,
    MoodButtonsComponent,
    PortraitMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    cabinRoutes
  ],
  providers: [UserService,
              TestService,
            { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
