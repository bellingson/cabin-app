
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class RouterMock  {

  called = false;

  navigateByUrl(url: string): Promise<boolean> {

    this.called = true;

    return undefined;
  }

}

export class ActivatedRouteMock {

  params: Observable<Params> = new ReplaySubject<Params>();
  queryParams: Observable<Params> = new ReplaySubject<Params>();




}
