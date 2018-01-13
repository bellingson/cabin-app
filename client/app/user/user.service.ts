import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import * as _ from 'lodash';
import {Observable} from "rxjs/Observable";
import {User} from "./user.model";

const USER_KEY = 'patient';

@Injectable()
export class UserService {


    user = new ReplaySubject<User>(1);

  constructor(private http: HttpClient) {
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

  createPatient(patientId: string, pin: string) : Observable<boolean> {

      const response = new ReplaySubject<boolean>(1);

      let url = `/api/face-test/verify-pin`;
      this.http.post(url, { patientId:patientId, pin: pin} )
        .subscribe(r => {

          const admin = patientId == '-1';

          const _user: User = { patientId: patientId,
                                startTime: Date.now(),
                                level: 1,
                                pin: pin,
                                 admin: admin,
                              } as User;


          // console.log(_user);

          this.user.next(_user);

          response.next(true);
          response.complete();

        }, err => {

          console.log(err);

          response.error(err);
          response.complete();
        });

        return response;

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
