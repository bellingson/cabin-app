import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import {UserService} from "../user/user.service";
import {TestSample} from "./test-sample.model";
import {TestSession} from "./test-session.model";

import * as _ from 'lodash';
import * as moment from 'moment';

import * as _assign from 'lodash/assign';
import * as _clone from 'lodash/clone';
import * as _compact from 'lodash/compact';
import * as _map from 'lodash/map';
import * as _max from 'lodash/max';
import * as _sum from 'lodash/sum';
import * as _filter from 'lodash/filter';
import * as _size from 'lodash/size';
import * as _last from 'lodash/last';

import {TestStats} from "./test-stats.model";
import {User} from "../user/user.model";

const SESSIONS_KEY = 'sessions';
const STATS_KEY = 'stats';
const OPTIONS_KEY = 'options';

export const DEFAULT_SAMPLE_COUNT = 200;
export const SAMPLE_COUNT_KEY = 'sample_count';

@Injectable()
export class TestService {

  samples = new ReplaySubject<Array<TestSample>>(1);

  testSessions = new ReplaySubject<Array<TestSession>>(1);

  private currentSession = new ReplaySubject<TestSession>(1);

  stats = new ReplaySubject<TestStats>(1);

  user: User;

  sampleCount = new ReplaySubject<number>(1);

  options = new ReplaySubject<any>(1);

  constructor(private userService: UserService,
              private http: HttpClient) {
      this.initialize();
  }

  initialize() {

    this.userService.user.subscribe(user => this.user = user);

    this.initializeOptions()

    this.initializeSampleCount();

    this.initializeSessions();
    this.initializeStats();
  }

  initializeOptions() {

     const _options = localStorage.getItem(OPTIONS_KEY);
     if(_options) {
        const options = JSON.parse(_options);
        this.options.next(options);
     }

  }

  initializeSampleCount() {

     let sampleCount = DEFAULT_SAMPLE_COUNT;
     const _sampleSize = localStorage.getItem(SAMPLE_COUNT_KEY);
     if(_sampleSize) {
        sampleCount = parseInt(_sampleSize, 10)
     }

     this.sampleCount.next(sampleCount);

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


  uploadResults(session?: TestSession) : Observable<boolean> {

      session = session ? session : this.lastSession();

      let response = new ReplaySubject<boolean>(1);

      let url = '/api/face-test';
      this.http.post(url, session )
        .subscribe(r => {

          this.fetchSummaries().subscribe(sessionSummaries => {

            this.testSessions.next(sessionSummaries);
            response.next(true);
            response.complete();

          }, err => {
              response.error(err);
              response.complete();
          });

        }, er => {
          response.error(er);
          response.complete();
        });

       return response;

  }

  testComplete(samples: Array<TestSample>) : TestSession {

      let totalTime = _sum(_map(samples,'time'));

      let session;
      this.currentSession.subscribe(_session => session = _clone(_session));

      if(session == null) {
         session = this.createSession();
      }

      session.sampleCount = _size(samples);
      session.correctCount = _size(_filter(samples, sample => sample.correct));
      session.incorrectCount = _size(_filter(samples, sample => sample.correct == false));
      session.percentCorrect = ((session.correctCount / session.sampleCount) * 100).toFixed(0);
      session.samples = samples;
      session.testNumber = this.nextTestNumber();

      console.log('complete: ' + totalTime + ' : ' + session.sampleCount);

      session.averageResponseMilli = totalTime / session.sampleCount;
      session.averageResponseSeconds = ( (totalTime / 1000) / session.sampleCount).toFixed(1);

      let sessions;
      this.testSessions.subscribe(_sessions => sessions = _sessions);

      sessions.push(session);


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

    const maxNumber =  _max(_compact(_map(sessions, 'testNumber')));
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
    session.participantId = this.user.participantId;

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

      let stats = new TestStats();
      stats.totalWeeks = 6;
      stats.currentWeek = user.level;
      stats.sessionsThisWeek = 0;
      stats.sessionsToDo = 6;

      this.testSessions.subscribe(_sessions => {
          stats.sessionsThisWeek = _size(_filter(_sessions,{level: user.level }));
          stats.sessionsToDo = stats.sessionsThisWeek >= 6 ? 0 : 6 - stats.sessionsThisWeek;
      });

      this.stats.next(stats);

      return stats;
  }

  canTakeTest() : boolean {

    if(this.user.restrictSessions == false) {
      return true;
    }

    // console.log(moment(this.user.startTime).format('YYYY-MM-DD'));
    //
    // console.log(this.sessionsThisWeek().length);
    // console.log(this.sessionsToday().length);

    if(_.size(this.sessionsThisWeek()) >= 6) {
      return false;
    }

    if(_.size(this.sessionsToday()) >= 3) {
      return false;
    }

    return true;
  }

  sessionsToday() : Array<TestSession> {

    let today = moment();

    let testSessions;
    this.testSessions.subscribe(_testSessions => {
      testSessions = _.filter(_testSessions, testSession => {
        return moment(testSession.startTime).diff(today, 'days') == 0;
      });
    });

    return testSessions;


  }

  sessionsThisWeek() : Array<TestSession> {

    let testSessions;
    this.testSessions.subscribe(_testSessions => {
        testSessions = _.filter(_testSessions, { level: this.user.level });
    });

    return testSessions;
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

  fetchSummaries() : Observable<Array<TestSession>> {

    let url = '/api/face-test/session-summary';

    return this.http.get<Array<TestSession>>(url);

  }

  updateSampleCount(_sampleCount: number) {

    if(_sampleCount == DEFAULT_SAMPLE_COUNT) {
        localStorage.removeItem(SAMPLE_COUNT_KEY);
    } else {
        localStorage.setItem(SAMPLE_COUNT_KEY, _sampleCount.toString());
    }

    this.sampleCount.next(_sampleCount);
  }

  fetchOptions() : Observable<boolean> {

    let response = new Subject<boolean>();

    let url = '/api/face-test/options';
    this.http.get(url).subscribe(options => {

      let _options = JSON.stringify(options);
      localStorage.setItem(OPTIONS_KEY, _options);
      this.options.next(options);
      response.next(true);
      response.complete();
    }, err => {
       response.error(err);
       response.complete();
    });

    return response;
  }


}
