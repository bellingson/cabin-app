import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import {ResultsListComponent} from "./results-list.component";

import {resultsRouting} from "./results.routing";

import { ChartComponent } from './chart.component';
import {ChartService} from "./chart.service";

@NgModule({
  declarations: [ ResultsListComponent, ChartComponent ],
  imports: [ CommonModule,
              ChartsModule,
              resultsRouting ],
  providers: [ ChartService ]
})


export class ResultsModule {}
