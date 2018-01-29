
import { Observable, ReplaySubject } from 'rxjs';

import * as _ from 'lodash';

import {GenericDao} from "./generic-dao.service";

const testSessionCollection = 'testSession';
const settingsCollection = 'settings';

export class FaceTestDao extends GenericDao {

  getTestSession(id: string) : Observable<any> {
    return super.get(testSessionCollection, id);
  }

  saveTestSession(testSession: any) : Observable<boolean> {

    // console.log('save test session');

    return super.insertOne(testSessionCollection, testSession);
  }

  getTestSessions(findText?: string) : Observable<Array<any>> {

      if(findText) {
        return super.query(testSessionCollection, {patientId: findText}, { startTime: -1});
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

              let r = [];

              let byId = _(testSessions)
                        .groupBy('patientId')
                        .valueOf();

              // console.log(byId);

              for(let id in byId) {
                // console.log(id);
                  let _sessions = byId[id];

                  let lastSession = _.maxBy(_sessions, 'startTime');

                  let patient = { patientId: id, sessionCount: _sessions.length, lastTest: lastSession.startTime }
                  r.push(patient);
              }



              response.next(r);

        });


      return response;
  }

  settings() : Observable<any> {
     return this.getSingleton(settingsCollection);
  }




}
