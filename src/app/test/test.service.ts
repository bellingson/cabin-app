import { Injectable } from '@angular/core';
import {UserService} from "../user/user.service";
import {TestSample} from "../test-sample.model";

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/observable/of';

@Injectable()
export class TestService {

  samples = new ReplaySubject<Array<TestSample>>(1);

  constructor(private userService: UserService) { }

  uploadSamples() : Observable<boolean> {



      let response = new ReplaySubject<boolean>(1);

      let _samples;
      this.samples.subscribe(samples => _samples = samples);

      console.log('save test');
      console.log(_samples);

      response.error('failed..');

       return response;

  }

}
