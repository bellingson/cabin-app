import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {TestSession} from "./test-session.model";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {CURRENT_SESSION_KEY, OPTIONS_KEY, TestService} from "./test.service";

@Injectable()
export class TestDataService {

  constructor(private http: HttpClient, private testService: TestService) { }

  fetchSummaries() : Observable<Array<TestSession>> {

    let url = '/api/face-test/session-summary';

    return this.http.get<Array<TestSession>>(url);

  }


  uploadResults(session?: TestSession) : Observable<boolean> {

    session = session ? session : this.testService.lastSession();

    let response = new ReplaySubject<boolean>(1);

    let url = '/api/face-test';
    this.http.post(url, session )
      .subscribe(r => {

        localStorage.removeItem(CURRENT_SESSION_KEY);

        this.fetchSummaries().subscribe(sessionSummaries => {

          this.testService.testSessions.next(sessionSummaries);
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

  fetchOptions() : Observable<boolean> {

    let response = new Subject<boolean>();

    let url = '/api/face-test/options';
    this.http.get(url).subscribe(options => {

      let _options = JSON.stringify(options);
      localStorage.setItem(OPTIONS_KEY, _options);
      this.testService.options.next(options);
      response.next(true);
      response.complete();
    }, err => {
      response.error(err);
      response.complete();
    });

    return response;
  }

}
