import { Routes, RouterModule } from '@angular/router';
import {TestSessionListComponent} from "./test-session-list.component";
import {AdminBaseComponent} from "./admin-base.component";
import {TestSessionDetailComponent} from "./test-session-detail.component";
import {ParticipantListComponent} from "./participant-list.component";
import {AdminGuard} from "./admin.guard";
import {AdminSettingsComponent} from "./admin-settings.component";

const routes: Routes = [

  { path: '', component: AdminBaseComponent, canActivate: [ AdminGuard ], children: [
    { path: '', redirectTo: 'list', pathMatch: 'full'},
    { path: 'list', component: TestSessionListComponent },
    { path: 'detail/:id', component: TestSessionDetailComponent },
    { path: 'participant-list', component: ParticipantListComponent },
    { path: 'options', component: AdminSettingsComponent }
  ]}
];

export const adminRouting = RouterModule.forChild(routes);
