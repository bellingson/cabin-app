import { Injectable } from '@angular/core';
import {TestService} from "../face-test/test.service";
import {TestSession} from "../face-test/test-session.model";

import * as _map from 'lodash/map';

@Injectable()
export class ChartService {

  constructor(private testService: TestService) { }

  lineChartData() {

    let testSessions: Array<TestSession>;
    this.testService.testSessions.subscribe(_testSessions => testSessions = _testSessions);

    const percentCorrect =  _map(testSessions, 'percentCorrect');
    const averageResponseMilli =  _map(testSessions, 'averageResponseMilli');

    return { percentCorrect: percentCorrect, averageResponseMilli: averageResponseMilli };
  }

  percentCorrectData() {

    let testSessions: Array<TestSession>;
    this.testService.testSessions.subscribe(_testSessions => testSessions = _testSessions);

    return  _map(testSessions, 'percentCorrect');
  }



}
