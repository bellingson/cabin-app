import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import * as _ from 'lodash';

const USER_KEY = 'patient';

@Injectable()
export class UserService {


    user = new ReplaySubject<any>(1);

  constructor() {
      this.initialize();
  }

  initialize() {

      let userJson = localStorage.getItem(USER_KEY);
      let _user;
      if(userJson) {
          _user = JSON.parse(userJson);
      }

      this.user.next(_user);

    this.user.subscribe(user => {

      if(user) {
         let json = JSON.stringify(user);
         localStorage.setItem(USER_KEY, json);
      } else {
        localStorage.removeItem(USER_KEY);
      }

    });

  }

  createPatient(patientNumber: number) {

      let _user = { patientNumber: patientNumber, startTime: Date.now(), level: 1 };
      this.user.next(_user);
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
