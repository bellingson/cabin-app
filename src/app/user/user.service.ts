import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class UserService {


    user = new ReplaySubject<any>(1);

  constructor() {
      this.initialize();
  }

  initialize() {

      let userJson = localStorage.getItem('patient');
      let _user;
      if(userJson) {
          _user = JSON.parse(userJson);
      }

      this.user.next(_user);
  }

  createPatient(patientNumber: number) {

      let _user = { patientNumber: patientNumber, startTime: Date.now() };
      let userJson = JSON.stringify(_user);
      localStorage.setItem('patient', userJson);

      this.user.next(_user);
  }

}
