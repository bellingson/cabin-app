import { Routes, RouterModule } from '@angular/router';
import {UserInitComponent} from "./user/user-init.component";
import {PreTestComponent} from "./user/pre-test.component";
import {FaceTestComponent} from "./test/face-test.component";
import {AppInitComponent} from "./user/app-init.component";
import {ResultsListComponent} from "./results/results-list.component";
import {AboutComponent} from "./about/about.component";
import {TestCompleteComponent} from "./test/test-complete.component";
import {UploadFailedComponent} from "./test/upload-failed.component";

const routes: Routes = [
    { path: '', redirectTo: 'init', pathMatch: 'full' },
    { path: 'init', component: AppInitComponent },
    { path: 'user-init', component: UserInitComponent },
    { path: 'pre-test', component: PreTestComponent },
    { path: 'test', component: FaceTestComponent },
    { path: 'test-complete', component: TestCompleteComponent },
    { path: 'upload-failed', component: UploadFailedComponent },
    { path: 'results-list', component: ResultsListComponent },
    { path: 'about', component: AboutComponent }
];

export const cabinRoutes = RouterModule.forRoot(routes);