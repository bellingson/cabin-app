import { Routes, RouterModule } from '@angular/router';
import {TestSessionListComponent} from "./test-session-list.component";
import {AdminBaseComponent} from "./admin-base.component";
import {TestSessionDetailComponent} from "./test-session-detail.component";
import {PatientListComponent} from "./patient-list.component";
import {AdminGuard} from "./admin.guard";

const routes: Routes = [

  { path: '', component: AdminBaseComponent, canActivate: [ AdminGuard ], children: [
    { path: '', redirectTo: 'list', pathMatch: 'full'},
    { path: 'list', component: TestSessionListComponent },
    { path: 'detail/:id', component: TestSessionDetailComponent },
    { path: 'patient-list', component: PatientListComponent }
  ]}
];

export const adminRouting = RouterModule.forChild(routes);
