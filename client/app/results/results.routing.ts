import { Routes, RouterModule } from '@angular/router';
import {ResultsListComponent} from "./results-list.component";
import {ChartComponent} from "./chart.component";

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ResultsListComponent },
  { path: 'chart', component: ChartComponent }
];


export const resultsRouting = RouterModule.forChild(routes);
