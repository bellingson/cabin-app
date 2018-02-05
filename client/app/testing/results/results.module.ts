import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import {resultsRouting} from "./results.routing";

import { ChartComponent } from './chart.component';

import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [ ChartComponent ],
  imports: [ CommonModule,
              ChartsModule,
              SharedModule,
              resultsRouting ],
  providers: [ ]
})


export class ResultsModule {}
