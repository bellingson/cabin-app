import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import {UserService} from "../user/user.service";
import {TestSample} from "./test-sample.model";
import {TestSession} from "./test-session.model";

import * as _ from 'lodash';

import * as _assign from 'lodash/assign';
import * as _clone from 'lodash/clone';
import * as _compact from 'lodash/compact';
import * as _map from 'lodash/map';
import * as _max from 'lodash/max';
import * as _sum from 'lodash/sum';
import * as _filter from 'lodash/filter';
import * as _size from 'lodash/size';
import * as _last from 'lodash/last';

import * as moment from 'moment';

import {TestStats} from "./test-stats.model";
import {User} from "../user/user.model";

const SESSIONS_KEY = 'sessions';
const STATS_KEY = 'stats';

@Injectable()
export class TestService {

  samples = new ReplaySubject<Array<TestSample>>(1);

  testSessions = new ReplaySubject<Array<any>>(1);

  private currentSession = new ReplaySubject<TestSession>(1);

  stats = new ReplaySubject<TestStats>(1);

  user: User;

  constructor(private userService: UserService,
              private http: HttpClient) {
      this.initialize();
  }

  initialize() {

    this.userService.user.subscribe(user => this.user = user);

    this.initializeSessions();
    this.initializeStats();
  }

  initializeStats() {

    let json = localStorage.getItem(STATS_KEY);
    if(json) {
       let _stats = JSON.parse(json);
       let stats = new TestStats();
       _assign(stats, _stats);
       this.stats.next(stats);
    } else {
       this.countStats();
    }

    this.stats.subscribe(stats => {
      json = JSON.stringify(stats);
      localStorage.setItem(STATS_KEY, json);
    });

  }

  initializeSessions() {

    let _sessions;
    let json = localStorage.getItem(SESSIONS_KEY);
    if(json) {
       _sessions = JSON.parse(json);
    } else {
      _sessions = [];
    }

    this.testSessions.subscribe(sessions => {

      if(sessions && sessions.length) {
        json = JSON.stringify(sessions);
        localStorage.setItem(SESSIONS_KEY, json);
      }
    });

    this.testSessions.next(_sessions);

  }

  private authHeader() {

    if(this.user) {
      return { headers: new HttpHeaders().set('Authorization', this.user.token) };
    } else {
      return { headers: new HttpHeaders() };
    }
  }

  uploadResults(session?: TestSession) : Observable<boolean> {

      session = session ? session : this.lastSession();

      let response = new ReplaySubject<boolean>(1);

      let url = '/api/face-test';
      this.http.post(url, session, this.authHeader() )
        .subscribe(r => {
          response.next(true);
          response.complete();
        }, er => {
          response.error(er);
          response.complete();
        });

       return response;

  }

  testComplete(samples: Array<TestSample>) : TestSession {

      let sample1 = samples[0];

      console.log('complete1: ' + samples.length);

    console.log(samples);
    console.log(_.map(samples,'time'));
    console.log(_map(samples,'time'));

      // let totalTime = _(samples).map('time').sum();
      let totalTime = _sum(_map(samples,'time'));

      console.log(totalTime);

      let session;
      this.currentSession.subscribe(_session => session = _clone(_session));

      if(session == null) {
         session = this.createSession();
      }

      session.sampleCount = _size(samples);
      // session.correctCount = _(samples).filter(sample => sample.correct).size();
      session.correctCount = _size(_filter(samples, sample => sample.correct));
      // session.incorrectCount = _(samples).filter(sample => sample.correct == false).size();
      session.incorrectCount = _size(_filter(samples, sample => sample.correct == false));
      session.percentCorrect = ((session.correctCount / session.sampleCount) * 100).toFixed(0);
      session.samples = samples;
      session.testNumber = this.nextTestNumber();

      console.log('complete: ' + totalTime + ' : ' + session.sampleCount);

      session.averageResponseMilli = totalTime / session.sampleCount;
      session.averageResponseSeconds = ( (totalTime / 1000) / session.sampleCount).toFixed(1);

      // console.log(session);

      let sessions;
      this.testSessions.subscribe(_sessions => sessions = _sessions);

      sessions.push(session);

      // console.log('done: ' + sessions.length);

      this.testSessions.next(sessions);
      this.currentSession.next(null);

      this.countStats();

      return session;
  }

  private nextTestNumber() : number {

    let sessions;
    this.testSessions.subscribe(_sessions => sessions = _sessions);

    if(sessions == null || sessions.length == 0) {
       return 1;
    }

    // const maxNumber =  _(sessions).map('testNumber').compact().max();
    const maxNumber =  _max(_compact(_map(sessions, 'testNumber')));
    console.log('max n: ' + maxNumber);
    if(maxNumber) {
       return maxNumber + 1;
    } else {
      return 1;
    }

  }

  lastSession() : TestSession | null {

      let sessions;
      this.testSessions.subscribe(_sessions => sessions = _sessions);
      if(sessions == null || sessions.length == 0) {
          return null;
      }

      return _last(sessions);
  }

  startSession() {

    const session = this.createSession();
    this.currentSession.next(session);

  }

  createSession() : TestSession {

    const session = { } as TestSession;
    session.clientId = Date.now();
    session.patientId = this.user.patientId;

    session.startTime = Date.now();
    session.level = this.user.level;
    return session

  }

  setMoods(moods: Array<any>) {

    let session;
    this.currentSession.subscribe(_session => session = _session);

    let newSession = _clone(session);
    newSession.moods = moods;

    this.currentSession.next(newSession);

  }

  checkTestLevel() : number {

    let user;
    this.userService.user.subscribe(_user => user = _user);

    let daysSinceStart = moment().diff(user.startTime,'days');

    let level = Math.floor(daysSinceStart / 7);
    this.userService.setLevel(level);

    console.log('days since start: ' + daysSinceStart + ' ' + level);

    return level;
  }

  countStats() : TestStats {

      let user;
      this.userService.user.subscribe(_user => user = _user);

      let userStart = moment(user.startTime);
      let weeks = moment().diff(userStart, 'weeks');

      // console.log('US: ' + userStart + ' : ' + weeks);

      let stats = new TestStats();
      stats.totalWeeks = 6;
      stats.currentWeek = weeks > 6 ? 6 : weeks;

      let startOfWeek = moment();
      startOfWeek.day(0);
      startOfWeek.hours(0);
      startOfWeek.minutes(0);
      startOfWeek.second(0);
      startOfWeek.millisecond(0);

      stats.startOfWeek = startOfWeek.valueOf();

      let dayOfWeek = startOfWeek.day();

      // console.log(startOfWeek.toDate() + ' : ' + dayOfWeek);

      let endOfWeek = moment();
      endOfWeek.day(6);
      endOfWeek.hours(23);
      endOfWeek.minutes(59);
      endOfWeek.second(59);
      endOfWeek.millisecond(999);

      stats.endOfWeek = endOfWeek.valueOf();

      // console.log('EOW: ' + endOfWeek.toDate());

      let sessions;
      this.testSessions.subscribe(_sessions => sessions = _sessions);

     // console.log('CS1: ' + sessions.length);

      stats.sessionsThisWeek = _filter(sessions, session => {

                                        // console.log('CS2: ' + new Date(session.startTime) + ' : ' + new Date(stats.startOfWeek) + ' : ' + new Date(stats.endOfWeek));

                                       return session.startTime >= stats.startOfWeek &&
                                              session.startTime <= stats.endOfWeek;
                                  }).length;

    // console.log('STW: ' + stats.sessionsThisWeek);

      stats.sessionsToDo = 6 - stats.sessionsThisWeek;

      this.stats.next(stats);

      return stats;
  }

  preloadImages() : Observable<boolean> {

      // console.log('preload start');

      return Observable.of(true);

      /*
      const response = new Subject<boolean>();

      const obs = _(FACES)
                  .map(faces => {
                  const f = `assets/faces/${faces.f}`;
                  const a = `assets/faces/${faces.n}`;

                  // const fo = this.http.get(f, { responseType: 'blob', headers: new HttpHeaders().set('Cache', 'my-auth-token') })
                  const fo = this.http.get(f, { responseType: 'blob' })
                  const ao = this.http.get(a, { responseType: 'blob' })

                  return [ fo, ao];
                }).flatten()
                  .valueOf();

      Observable.forkJoin(obs)
          .subscribe(r => {
            console.log('preload complete');
              response.next(true);
              response.complete();
          }, err => {
              response.error(err);
              response.complete();
          });

      return response;
      */

  }


}
