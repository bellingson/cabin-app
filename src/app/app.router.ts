import { Routes, RouterModule } from '@angular/router';
import {UserInitComponent} from "./user/user-init.component";
import {PreTestComponent} from "./user/pre-test.component";
import {FaceTestComponent} from "./face-test/face-test.component";
import {AppInitComponent} from "./user/app-init.component";
import {ResultsListComponent} from "./results/results-list.component";
import {AboutComponent} from "./about/about.component";
import {TestCompleteComponent} from "./face-test/test-complete.component";
import {UploadFailedComponent} from "./face-test/upload-failed.component";
import {MoodActiveComponent} from "./face-test/mood-active.component";
import {MoodAfraidComponent} from "./face-test/mood-afraid.component";

const routes: Routes = [
    { path: '', redirectTo: 'init', pathMatch: 'full' },
    { path: 'init', component: AppInitComponent },
    { path: 'user-init', component: UserInitComponent },
    { path: 'pre-test', component: PreTestComponent },
    { path: 'mood-active', component: MoodActiveComponent },
    { path: 'mood-afraid', component: MoodAfraidComponent },
    { path: 'test', component: FaceTestComponent },
    { path: 'test-complete', component: TestCompleteComponent },
    { path: 'upload-failed', component: UploadFailedComponent },
    { path: 'results-list', component: ResultsListComponent },
    { path: 'about', component: AboutComponent }
];

export const cabinRoutes = RouterModule.forRoot(routes);
