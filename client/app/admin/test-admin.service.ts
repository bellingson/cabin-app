import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {TestSession} from "../face-test/test-session.model";

@Injectable()
export class TestAdminService {

  constructor(private http: HttpClient) { }

  get(id: string) : Observable<TestSession> {
    let url = `/api/admin/face-test/${id}`;
    return this.http.get<TestSession>(url);
  }

  query(findText?: string) : Observable<Array<TestSession>> {
    let url = '/api/admin/face-test';
    if(findText) {
       url += `?findText=${encodeURI(findText)}`;
    }
    return this.http.get<Array<any>>(url);
  }

  delete(testSession: TestSession) : Observable<any> {
    let url = `/api/admin/face-test/${testSession._id}`;
    return this.http.delete(url);
  }

  patients() : Observable<Array<any>> {

    let url = '/api/admin/patients';
    return this.http.get<Array<any>>(url);
  }


}