
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import {TestService} from "./test.service";
import {TestSession} from "./test-session.model";

import {TestSample} from "./test-sample.model";
import {Mood} from "./mood";

export class TestServiceMock {



  uploadResults(session?: TestSession): Observable<boolean> {
    return undefined;
  }

  testComplete(samples: Array<TestSample>): TestSession {
    return undefined;
  }

  lastSession(): TestSession | any {
    return undefined;
  }

  startSession(active: Mood): any {
    return undefined;
  }

  setAfraid(afraid: Mood): any {
    return undefined;
  }

  checkTestLevel(): number {
    return undefined;
  }




}
