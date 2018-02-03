import { Routes, RouterModule } from '@angular/router';
import {UserInitComponent} from "./user/user-init.component";
import {PreTestComponent} from "./user/pre-test.component";
import {FaceTestComponent} from "./face-test/face-test.component";
import {AppInitComponent} from "./user/app-init.component";

import {AboutComponent} from "./about/about.component";
import {TestCompleteComponent} from "./face-test/test-complete.component";
import {UploadFailedComponent} from "./face-test/upload-failed.component";
import {ClearComponent} from "./user/clear.component";
import {SettingsComponent} from "./settings/settings.component";
import {AdminGuard} from "./admin/admin.guard";
import {MoodComponent} from "./face-test/mood.component";

const routes: Routes = [
    { path: '', redirectTo: 'init', pathMatch: 'full' },
    { path: 'init', component: AppInitComponent },
    { path: 'user-init', component: UserInitComponent },
    { path: 'pre-test', component: PreTestComponent },
    { path: 'mood', component: MoodComponent },
    { path: 'test', component: FaceTestComponent },
    { path: 'test-complete', component: TestCompleteComponent },
    { path: 'upload-failed', component: UploadFailedComponent },
    { path: 'results', loadChildren: 'app/results/results.module#ResultsModule' },
    { path: 'about', component: AboutComponent },
    { path: 'clear', component: ClearComponent },
    { path: 'settings', component: SettingsComponent, canActivate: [ AdminGuard ] },
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' }
];

export const cabinRoutes = RouterModule.forRoot(routes);
