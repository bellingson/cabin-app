import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";

import { FaceTestComponent } from './face-test/face-test.component';

import { UserInitComponent } from './user/user-init.component';
import { PreTestComponent } from './user/pre-test.component';
import { AppInitComponent } from './user/app-init.component';

import { AboutComponent } from './about/about.component';
import { TestCompleteComponent } from './face-test/test-complete.component';

import { UploadFailedComponent } from './face-test/upload-failed.component';
import { MoodButtonsComponent } from './face-test/mood-buttons.component';

import { SettingsComponent } from './settings/settings.component';

import { MoodComponent } from './face-test/mood.component';
import { FaceComponent } from './face-test/face.component';
import {testingRoutes} from "./testing.routes";
import {TestingBaseComponent} from "./testing-base.component";
import {StartComponent} from "./user/start.component";
import { PrepareComponent } from './face-test/prepare.component';
import { FocusComponent } from './face-test/focus.component';


@NgModule({
   declarations: [
     TestingBaseComponent,
     FaceTestComponent,
     UserInitComponent,
     PreTestComponent,
     AppInitComponent,
     AboutComponent,
     TestCompleteComponent,
     UploadFailedComponent,
     MoodButtonsComponent,

     StartComponent,

     SettingsComponent,
     MoodComponent,
     FaceComponent,
     PrepareComponent,
     FocusComponent
   ],
   imports: [
     CommonModule,
     FormsModule,
     HttpClientModule,
     SharedModule,
     testingRoutes
   ],
   providers: [ ]
})

export class TestingModule {

}
