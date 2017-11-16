import { Injectable } from '@angular/core';
import {UserService} from "../user/user.service";
import {TestSample} from "../test-sample.model";

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/of';
import {TestSession} from "../test-session.model";

import * as _ from 'lodash';

@Injectable()
export class TestService {

  samples = new ReplaySubject<Array<TestSample>>(1);

  testSessions = new ReplaySubject<Array<any>>(1);

  constructor(private userService: UserService) {
      this.initialize();
  }

  initialize() {
      this.testSessions.next([]);
  }

  uploadResults(session?: TestSession) : Observable<boolean> {

      session = session ? session : this.lastSession();

      let response = new ReplaySubject<boolean>(1);


      console.log('save test');
      console.log(session.samples);

      // response.error('failed..');
      response.next(true);

       return response;

  }

  testComplete(samples: Array<TestSample>) : TestSession {

      let sample1 = samples[0];

      console.log('complete1: ' + samples.length);
      
      let totalTime = _(samples).map('time').sum();

      console.log(totalTime);

      let session = new TestSession();
      session.startTime = sample1.startTime;
      session.sampleCount = _.size(samples);
      session.correctCount = _(samples).filter(sample => sample.correct).size();
      session.incorrectCount = _(samples).filter(sample => sample.correct == false).size();
      session.percentCorrect = ((session.correctCount / session.sampleCount) * 100).toFixed(0);
      session.samples = samples;

      console.log('complete: ' + totalTime + ' : ' + session.sampleCount);

      session.averageResponseSeconds = ( (totalTime / 1000) / session.sampleCount).toFixed(1);

      console.log(session);

      let sessions;
      this.testSessions.subscribe(_sessions => sessions = _sessions);

      sessions.push(session);

      console.log('done: ' + sessions.length);

      this.testSessions.next(sessions);

      return session;
  }

  lastSession() : TestSession | null {

      let sessions;
      this.testSessions.subscribe(_sessions => sessions = _sessions);
      if(sessions == null || sessions.length == 0) {
          return null;
      }

      return _.last(sessions);
  }



}
