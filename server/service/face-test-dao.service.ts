
import { Observable, ReplaySubject, Subject } from 'rxjs';

import * as _ from 'lodash';

import {GenericDao} from "./generic-dao.service";

const testSessionCollection = 'testSession';
const settingsCollection = 'settings';
const optionsCollection = 'options';

export class FaceTestDao extends GenericDao {

  saveOptions(options: any) : Observable<boolean> {
    return super.save(optionsCollection, options);
  }

  getTestSession(id: string) : Observable<any> {
    return super.get(testSessionCollection, id);
  }

  saveTestSession(testSession: any) : Observable<boolean> {

    // console.log('save test session');

    return super.insertOne(testSessionCollection, testSession);
  }

  getTestSessions(findText?: string) : Observable<Array<any>> {

      if(findText) {
        return super.query(testSessionCollection, {participantId: findText}, { startTime: -1});
      } else {
        return super.query(testSessionCollection,{}, { startTime: -1});
      }

  }

  delete(id: string) : Observable<boolean> {
      return super.delete(testSessionCollection, id);
  }

  patients() : Observable<Array<any>> {

      let response = new ReplaySubject<Array<any>>(1);

      super.query(testSessionCollection)
        .subscribe(testSessions => {

              const r = this.formatPatientSummary(testSessions);

              response.next(r);

        });


      return response;
  }

  private formatPatientSummary(testSessions: Array<any>) : Array<any> {

    let r = [];

    let byId = _(testSessions)
      .groupBy('participantId')
      .valueOf();

    // console.log(byId);

    for(let id in byId) {
      // console.log(id);
      let _sessions = byId[id];

      let lastSession = _.maxBy(_sessions, 'startTime');

      let participant = { participantId: id, sessionCount: _sessions.length, lastTest: lastSession.startTime }
      r.push(participant);
    }

    return r;
  }


  settings() : Observable<any> {
     return this.getSingleton(settingsCollection);
  }

  options() : Observable<any> {
     return this.getSingleton(optionsCollection);
  }

  stats(participantId: string) : Observable<any> {

    const response = new Subject();

    const levels = { level1: {}, level2: {}, level3: {}, level4: {}, level5: {}, level6: {} };
    for(let level of _.keys(levels)) {
        levels[level].sessionCount = 0;
    }

    this.query(testSessionCollection, { participantId: participantId})
        .subscribe(r => {

          let byLevel = _.groupBy(r, 'level');

          for(let levelNum of _.keys(byLevel)) {
             let sessionsForLevel = byLevel[levelNum];
             let level = levels[`level${levelNum}`].sessionCount = _.size(sessionsForLevel);
          }

          response.next(levels);
    });

    return response;
  }

  sessionSummary(participantId: string) : Observable<any> {

    const response = new Subject();

    this.query(testSessionCollection, { participantId: participantId})
      .subscribe(testSessions => {

          let sessionSummaries = _.map(testSessions, testSession => {
                                    return _.omit(testSession,['samples','moods','userAgent','ip']);
                                 });

          response.next(sessionSummaries);
          response.complete();
      }, err => {
          console.log()
          response.error(err);
          response.complete();
      });

    return response;
  }

}
