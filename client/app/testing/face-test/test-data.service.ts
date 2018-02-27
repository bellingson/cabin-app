import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {TestSession} from "./test-session.model";

import {CURRENT_SESSION_KEY, OPTIONS_KEY, TestService} from "./test.service";
import {rxErrorHandler} from "../../shared/helper.fn";

@Injectable()
export class TestDataService {

  constructor(private http: HttpClient, private testService: TestService) { }

  fetchSummaries() : Observable<Array<TestSession>> {

    const url = '/api/face-test/session-summary';

    return this.http.get<Array<TestSession>>(url);

  }


  uploadResults(session: TestSession) : Observable<boolean> {

    const response = new Subject<boolean>();

    const handleError = rxErrorHandler(response);

    const url = '/api/face-test';
    this.http.post(url, session )
      .subscribe(r => {

        session.uploadComplete = true;
        this.testService.currentSession.next(null);

        localStorage.removeItem(CURRENT_SESSION_KEY);

        this.fetchSummaries().subscribe(sessionSummaries => {

          this.testService.testSessions.next(sessionSummaries);
          this.testService.countStats();
          response.next(true);
          response.complete();

        }, handleError);

      }, handleError);

    return response;

  }

  fetchOptions() : Observable<boolean> {

    const response = new Subject<boolean>();
    const handleError = rxErrorHandler(response);

    const url = '/api/face-test/options';
    this.http.get(url).subscribe(options => {

      let _options = JSON.stringify(options);
      localStorage.setItem(OPTIONS_KEY, _options);
      this.testService.options.next(options);
      response.next(true);
      response.complete();

    }, handleError);

    return response;
  }

}
