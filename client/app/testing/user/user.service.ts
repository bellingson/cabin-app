import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import * as moment from 'moment';

import * as _clone from 'lodash/clone';

import {Observable} from "rxjs/Observable";
import {User} from "./user.model";
import {AuthService} from "./auth.service";
import {Subject} from "rxjs/Subject";

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

          const _participant = r.participant;

          const _user: User = { _id: _participant._id,
                                participantId: _participant.participantId,
                                startTime: _participant.startTime,
                                endTime: _participant.endTime,
                                level: _participant.level,
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

  fetchAndUpdateParticipant() : Observable<boolean> {

    let response = new Subject<boolean>();

    let _user;
    this.user.subscribe(user => _user = user);

    this.fetchParticipant().subscribe(_participant => {

        _user.startTime = _participant.startTime;
        _user.endTime = _participant.endTime;
        _user.level = _participant.level;

        this.user.next(_user);

        response.next(true);
        response.complete();
    }, err => {
        response.error(err);
        response.complete();
    });

    return response;

  }


  fetchParticipant() : Observable<any> {

    const url = `/api/face-test/participant`;

    return this.http.get(url);
  }

  updateUser(user: User) {
    this.user.next(user);
  }




}
