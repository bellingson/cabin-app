import { Routes, RouterModule } from '@angular/router';
import {ChartComponent} from "./chart.component";

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'chart', component: ChartComponent }
];


export const resultsRouting = RouterModule.forChild(routes);
