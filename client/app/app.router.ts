import { Routes, RouterModule } from '@angular/router';
import {ClearComponent} from "./clear.component";

const routes: Routes = [
    { path: '', redirectTo: 't', pathMatch: 'full' },
    { path: 'clear', component: ClearComponent },
    { path: 't', loadChildren: 'app/testing/testing.module#TestingModule' },

    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' }
];

export const cabinRoutes = RouterModule.forRoot(routes);
