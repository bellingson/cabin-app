import { Injectable } from '@angular/core';



import { Observable } from 'rxjs/Observable';

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

export const CURRENT_SESSION_KEY = 'current_session';

const SESSIONS_KEY = 'sessions';
const STATS_KEY = 'stats';
export const OPTIONS_KEY = 'options';

export const DEFAULT_SAMPLE_COUNT = 200;
export const SAMPLE_COUNT_KEY = 'sample_count';

export const DEFAULT_EXTRA_SAMPLE_COUNT = 30;
export const EXTRA_SAMPLE_COUNT_KEY = 'extra_sample_count';

export const STIMULI_WORDS = 'words';
export const STIMULI_FACES = 'faces';

@Injectable()
export class TestService {

  samples = new ReplaySubject<Array<TestSample>>(1);

  testSessions = new ReplaySubject<Array<TestSession>>(1);

  currentSession = new ReplaySubject<TestSession>(1);

  stats = new ReplaySubject<TestStats>(1);

  user: User;

  sampleCount = new ReplaySubject<number>(1);
  extraSampleCount = new ReplaySubject<number>(1);

  options = new ReplaySubject<any>(1);

  constructor(private userService: UserService) {
      this.initialize();
  }

  initialize() {

    this.userService.user.subscribe(user => {
      this.user = user;
    });

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

     let extraSampleCount = DEFAULT_EXTRA_SAMPLE_COUNT;
     const _extraSampleSize = localStorage.getItem(EXTRA_SAMPLE_COUNT_KEY);
     if(_extraSampleSize) {
        extraSampleCount = parseInt(_extraSampleSize, 10);
     }
     this.extraSampleCount.next(extraSampleCount);
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

  saveSession(samples: Array<TestSample>) {

    let session;
    this.currentSession.subscribe(_session => session = _session);

    if(session == null) {
       session = this.createSession();
    }
    session.samples = samples;

    const _session = JSON.stringify(session);

    localStorage.setItem(CURRENT_SESSION_KEY, _session);

  }

  formatSessionStats(session: TestSession, samples: Array<TestSample>) : TestSession {

      let totalTime = _sum(_map(samples,'time'));

      session.sampleCount = _size(samples);
      session.correctCount = _size(_filter(samples, sample => sample.correct));
      session.incorrectCount = _size(_filter(samples, sample => sample.correct == false));
      session.percentCorrect = ((session.correctCount / session.sampleCount) * 100).toFixed(0);
      session.samples = samples;
      session.testNumber = this.nextTestNumber();

      // console.log('complete: ' + totalTime + ' : ' + session.sampleCount);

      session.averageResponseMilli = totalTime / session.sampleCount;
      session.averageResponseSeconds = ( (totalTime / 1000) / session.sampleCount).toFixed(1);

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

  resumeSession(testSession: TestSession) {

    this.currentSession.next(testSession);
  }

  startSession() {


    const session = this.createSession();
    this.currentSession.next(session);

  }

  createSession() : TestSession {

    const session = { } as TestSession;
    session.clientId = Date.now();
    session.uploadComplete = false;
    session.participantId = this.user.participantId;

    session.startTime = Date.now();
    session.level = this.user.level;

    session.stimuli = this.selectStimuliType(session.level);

    return session;

  }

  private selectStimuliType(level: number) : string {
    if(level == 1) {
      return STIMULI_FACES;
    } else {
      // how to choose

      let ordinal = 1;
      this.testSessions.subscribe(sessions => {
                                      ordinal = _size(sessions) + 1;
                                  });

      return ordinal % 2 == 0 ? STIMULI_FACES : STIMULI_WORDS;
    }

  }


  setMoods(moods: Array<any>) {

    let session;
    this.currentSession.subscribe(_session => session = _session);

    let newSession = _clone(session);
    newSession.moods = moods;

    this.currentSession.next(newSession);

  }

  countStats() : TestStats {

      let user;
      this.userService.user.subscribe(_user => user = _user);

      if(user == null) {
         return;
      }

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

    let today = moment().format('MM/DD/YYYY');

    let testSessions;
    this.testSessions.subscribe(_testSessions => {
      testSessions = _.filter(_testSessions, testSession => {
         return moment(testSession.startTime).format('MM/DD/YYYY') == today;
        // return moment(testSession.startTime).diff(today, 'days') == 0;
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


  updateSampleCount(_sampleCount: number, _extraSampleCount: number) {

    if(_sampleCount == DEFAULT_SAMPLE_COUNT) {
        localStorage.removeItem(SAMPLE_COUNT_KEY);
    } else {
        localStorage.setItem(SAMPLE_COUNT_KEY, _sampleCount.toString());
    }

    this.sampleCount.next(_sampleCount);

    if(_extraSampleCount == DEFAULT_EXTRA_SAMPLE_COUNT) {
       localStorage.removeItem(EXTRA_SAMPLE_COUNT_KEY);
    } else {
       localStorage.setItem(EXTRA_SAMPLE_COUNT_KEY, _extraSampleCount.toString());
    }

    this.extraSampleCount.next(_extraSampleCount);
  }

  highestBadge(sessions: Array<TestSession>) : number | null {

    for(let i = 6;i>0;i--) {

      let _sessionsForLevel = _filter(sessions, { level: i })
      if(_sessionsForLevel.length >= 6) {
        return i;
      }

    }

    return null;
  }




}
