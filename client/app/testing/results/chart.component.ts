import { Component, OnInit } from '@angular/core';



import * as _range from 'lodash/range';
import * as _map from 'lodash/map';
import * as _reverse from 'lodash/reverse';

import {TestService} from "../face-test/test.service";
import {TestSession} from "../face-test/test-session.model";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  testSessions: Array<TestSession>;
  testSessionsReversed: Array<TestSession>;

  lineChartData:Array<any>;
  lineChartLabels:Array<any>;

  public lineChartOptions:any = {
    responsive: false
  };

  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


  displayData = false;

  ngOnInit() {

    this.testService.testSessions.subscribe(_testSessions => {
      this.testSessions = _testSessions;
      this.testSessionsReversed = _reverse(_testSessions);
    });

    this.showResponseTime();

  }

  constructor(private testService: TestService) { }

  showResponseTime() {

    const responseTime = _map(this.testSessions,'averageResponseMilli');

    this.lineChartData = [
      { data: responseTime, label: 'Response Time' }
    ];
    this.lineChartLabels = _range(1, responseTime.length + 1);
    this.displayData = false;

  }

  showPercentCorrect() {

    const percentCorrect = _map(this.testSessions, 'percentCorrect');

    this.lineChartData = [
      { data: percentCorrect, label: '% Correct' }
    ];

    this.lineChartLabels = _range(1, percentCorrect.length + 1);
    this.displayData = false;

  }

  showData() {
      this.lineChartData = null;
      this.displayData = true;
  }


}
