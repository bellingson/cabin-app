
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

export class RouterMock  {


  navigateByUrl(url: string): Promise<boolean> {
    return undefined;
  }

}

export class ActivatedRouteMock{

  params: Observable<Params> = new ReplaySubject<Params>();
  queryParams: Observable<Params> = new ReplaySubject<Params>();




}
