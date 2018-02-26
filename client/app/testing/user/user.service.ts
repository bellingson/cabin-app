import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import * as moment from 'moment';

import * as _clone from 'lodash/clone';

import {Observable} from "rxjs/Observable";
import {User} from "./user.model";
import {AuthService} from "./auth.service";

const USER_KEY = 'participant';

@Injectable()
export class UserService {


  user = new ReplaySubject<User>(1);

  constructor(private http: HttpClient,
              private authService: AuthService) {
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
         this.updateLevel(user);
         let json = JSON.stringify(user);
         localStorage.setItem(USER_KEY, json);
      } else {
        localStorage.removeItem(USER_KEY);
      }

    });

  }

  createParticipant(participantId: string, pin: string) : Observable<boolean> {

      const response = new ReplaySubject<boolean>(1);

      let url = `/api/face-test/verify-pin`;
      this.http.post(url, { participantId:participantId, pin: pin} )
        .subscribe((r : any) => {

          if(!r.token) {
             response.error("No pin token");
             response.complete();
             return;
          }

          const admin = participantId == '-1';

          const participantNumber: number = parseInt(participantId.replace(/\D/g, ''), 10);

          const controlVersion = participantNumber % 2 == 0;

          const _user: User = { participantId: participantId,
                                startTime: Date.now(),
                                level: 1,
                                controlVersion: controlVersion,
                                restrictSessions: true,
                                admin: admin
                              } as User;

          // console.log(_user);

          this.authService.setToken(r.token);

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

    user = _clone(user);
    user.level = level;

    this.user.next(user);
  }

  updateUserLevel() {
      let user;
      this.user.subscribe(_user => user = _user);

      const level = this.calculateLevel(user);
      if(user.level != level) {
         user = _clone(user);
         this.user.next(user); // will set level
      }

  }

  private updateLevel(user: User) {

    user.level = this.calculateLevel(user);

  }

  private calculateLevel(user: User) : number {
      return moment().diff(moment(user.startTime),'weeks') + 1;

  }

  updateUser(user: User) {
    this.user.next(user);
  }




}
