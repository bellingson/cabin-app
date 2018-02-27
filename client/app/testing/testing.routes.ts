import { Routes, RouterModule } from '@angular/router';
import {UserInitComponent} from "./user/user-init.component";
import {PreTestComponent} from "./user/pre-test.component";
import {FaceTestComponent} from "./face-test/face-test.component";
import {AppInitComponent} from "./user/app-init.component";

import {AboutComponent} from "./about/about.component";
import {TestCompleteComponent} from "./face-test/test-complete.component";
import {UploadFailedComponent} from "./face-test/upload-failed.component";

import {SettingsComponent} from "./settings/settings.component";

import {MoodComponent} from "./face-test/mood.component";
import {AdminGuard} from "../admin/admin.guard";

import {TestingBaseComponent} from "./testing-base.component";
import {StartComponent} from "./user/start.component";
import {PrepareComponent} from "./face-test/prepare.component";
import {FocusComponent} from "./face-test/focus.component";
import {TryYourBestComponent} from "./face-test/try-your-best.component";

const routes: Routes = [

  { path: '', component: TestingBaseComponent, children: [

    { path: '', redirectTo: 'start', pathMatch: 'full' },
    { path: 'start', component: StartComponent },
    { path: 'init', component: AppInitComponent },
    { path: 'user-init', component: UserInitComponent },
    { path: 'pre-test', component: PreTestComponent },
    { path: 'prepare', component: PrepareComponent },
    { path: 'try-your-best', component: TryYourBestComponent },
    { path: 'focus', component: FocusComponent },
    { path: 'mood', component: MoodComponent },
    { path: 'test', component: FaceTestComponent },
    { path: 'test-complete', component: TestCompleteComponent },
    { path: 'upload-failed', component: UploadFailedComponent },
    { path: 'results', loadChildren: 'app/testing/results/results.module#ResultsModule' },
    { path: 'about', component: AboutComponent },
    { path: 'settings', component: SettingsComponent, canActivate: [ AdminGuard ] },

  ] }

];

export const testingRoutes = RouterModule.forChild(routes);
