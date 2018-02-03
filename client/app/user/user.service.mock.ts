
import { ReplaySubject } from 'rxjs/ReplaySubject';

import * as _clone from 'lodash/clone';
import {User} from "./user.model";

export const testUser = { participantId: 'ab123', startTime: Date.now(), level: 1, pin: '1234', controlVersion: false, admin: false, token: 'foo' } as User;

export class UserServiceMock {

  user = new ReplaySubject<any>(1);

  constructor() {
    this.createTestPatient();
  }


  createTestPatient() {


    let userJson = JSON.stringify(testUser);
    localStorage.setItem('participant', userJson);

    this.user.next(testUser);
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
