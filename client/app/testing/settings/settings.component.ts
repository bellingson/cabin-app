import { Component, OnInit } from '@angular/core';
import {UserService} from "../user/user.service";
import {User} from "../user/user.model";

import * as moment from 'moment';

import * as _clone from 'lodash/clone';
import {TestService} from "../face-test/test.service";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: User;

  startTime: string;

  message: string;

  sampleCount: number;
  extraSampleCount: number;

  constructor(private userService: UserService,
              private testService: TestService) {

  }

  ngOnInit() {

    this.testService.sampleCount.subscribe(_sampleCount => this.sampleCount = _sampleCount);
    this.testService.extraSampleCount.subscribe(_extraSampleCount => this.extraSampleCount = _extraSampleCount);

    this.userService.user.subscribe(user => {
      this.user = _clone(user);
      // console.log(user);

      this.displayStartTime();

    });

  }

  updateSettings() {

      if(this.user.level == null || this.user.level < 1) {
         alert('Level must be greater than 0');
         return;
      }

      let weeks = this.user.level - 1;
      let days = weeks * 7 * -1;

      let startTime = moment().add(days, 'days');
      startTime.hour(7);
      startTime.minute(0);

      let _startTime = startTime.clone();
      startTime.day('Monday');
      if(_startTime.isBefore(startTime)) {
        startTime.add(-7,'days');
      }

      this.user.startTime = startTime.toDate().getTime();
      this.userService.updateUser(this.user);

      // console.log(this.user);

      this.testService.updateSampleCount(this.sampleCount, this.extraSampleCount);

      this.message = 'Update complete';

  }

  displayStartTime() {
    this.startTime = moment(this.user.startTime).format('YYYY-MM-DD HH:mm');
  }

}
