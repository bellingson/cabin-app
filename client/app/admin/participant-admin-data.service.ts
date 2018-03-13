import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {TestSession} from "../testing/face-test/test-session.model";

@Injectable()
export class ParticipantAdminDataService {

  constructor(private http: HttpClient) { }

  query() : Observable<Array<any>> {
    const url = '/api/admin/participant';
    return this.http.get<Array<any>>(url);
  }

  get(_id: string) : Observable<any> {
    const url = `/api/admin/participant/${_id}`;
    return this.http.get<any>(url);
  }

  sessions(participantId: string) : Observable<Array<TestSession>> {

    const url = `/api/admin/face-test/participant/${participantId}`;
    return this.http.get<Array<TestSession>>(url);
  }

  updateStartTime(participantId: string, startTime: number) : Observable<any> {

    const url = `/api/admin/face-test/participant/${participantId}/start_time`;

    return this.http.put(url,{startTime: startTime });

  }


}
