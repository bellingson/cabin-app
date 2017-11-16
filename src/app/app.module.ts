import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {cabinRoutes} from "./app.router";


import { AppComponent } from './app.component';
import { FaceTestComponent } from './test/face-test.component';
import {UserService} from "./user/user.service";
import { UserInitComponent } from './user/user-init.component';
import { PreTestComponent } from './user/pre-test.component';
import { AppInitComponent } from './user/app-init.component';
import { ResultsListComponent } from './results/results-list.component';
import { AboutComponent } from './about/about.component';
import { TestCompleteComponent } from './test/test-complete.component';
import {TestService} from "./test/test.service";
import { UploadFailedComponent } from './test/upload-failed.component';

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
    UploadFailedComponent
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
