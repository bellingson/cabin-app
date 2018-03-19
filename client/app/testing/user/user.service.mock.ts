
import { ReplaySubject } from 'rxjs/ReplaySubject';

import * as _clone from 'lodash/clone';
import {User} from "./user.model";
import {UserService} from "./user.service";

export const testUser = { participantId: 'ab123',
                          startTime: Date.now(),
                          level: 1,
                          controlVersion: false,
                          restrictSessions: false,
                          admin: false } as User;

export class UserServiceMock {

  initialize(): void {

  }

  updateUser(user: User): void {
    this.user.next(user);
  }

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
