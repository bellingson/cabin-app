
import { ReplaySubject } from 'rxjs/ReplaySubject';

import * as _clone from 'lodash/clone';

export class UserServiceMock {

  user = new ReplaySubject<any>(1);

  constructor() {
    this.createTestPatient();
  }


  createTestPatient() {

    let _user = { participantId: 1, startTime: Date.now(), level: 1 };
    let userJson = JSON.stringify(_user);
    localStorage.setItem('participant', userJson);

    this.user.next(_user);
  }

  createParticipant(participantId: number) {
     this.createTestPatient();
  }

  setLevel(level: number) {

    let user;
    this.user.subscribe(_user => user = _user);

    if(user.level === level) {
      return;
    }

    user = _clone(user);
    user.level = level;

    this.user.next(user);
  }

}
