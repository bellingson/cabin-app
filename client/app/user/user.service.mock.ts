
import { ReplaySubject } from 'rxjs/ReplaySubject';

import * as _ from 'lodash';

export class UserServiceMock {

  user = new ReplaySubject<any>(1);

  constructor() {
    this.createTestPatient();
  }


  createTestPatient() {

    let _user = { patientId: 1, startTime: Date.now(), level: 1 };
    let userJson = JSON.stringify(_user);
    localStorage.setItem('patient', userJson);

    this.user.next(_user);
  }

  createPatient(patientId: number) {
     this.createTestPatient();
  }

  setLevel(level: number) {

    let user;
    this.user.subscribe(_user => user = _user);

    if(user.level === level) {
      return;
    }

    user = _.clone(user);
    user.level = level;

    this.user.next(user);
  }

}
