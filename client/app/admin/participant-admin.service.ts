import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs/Observable";

import * as moment from 'moment';
import * as _find from 'lodash/find';

import {TestSession} from "../testing/face-test/test-session.model";

@Injectable()
export class ParticipantAdminService {

  constructor() { }

  isPast(level: any) : boolean {

    let now = Date.now();
    return level.endTime < now;
  }

  isCurrent(level: any) : boolean {

    let now = Date.now();
    return now >= level.startTime && now <= level.endTime
  }

  isFuture(level: any) : boolean {

    let now = Date.now();
    return level.startTime > now;
  }

  daysLeft(participant: any) {

    const now = Date.now();

    if(participant.endTime < now)
      return 0;

    return moment(participant.endTime).diff(moment(),'days');
  }

  currentLevel(participant: any) {

    const now = Date.now();
    if(now > participant.endTime) {
      return null;
    }

    if(now < participant.startTime) {
      return participant.levels[0];
    }

    return _find(participant.levels, level => {
      return this.isCurrent(level);
    });

  }



}
