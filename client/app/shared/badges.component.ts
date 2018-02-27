import { Component, OnInit } from '@angular/core';
import {UserService} from "../testing/user/user.service";
import {User} from "../testing/user/user.model";
import {TestService} from "../testing/face-test/test.service";
import {TestSession} from "../testing/face-test/test-session.model";

import * as _filter from 'lodash/filter';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.scss']
})
export class BadgesComponent implements OnInit {

  user: User;

  badge: number;

  testSessions: Array<TestSession>;

  constructor(private userService: UserService,
              private testService: TestService) { }

  ngOnInit() {

    this.userService.user.subscribe(user => this.user = user);



    this.testService.testSessions.subscribe(testSessions => {
      this.testSessions = testSessions;
      this.badge = this.testService.highestBadge(testSessions);
    });

  }

  hasBadge(level: number) : boolean {

    let sessions = _filter(this.testSessions, { level: level });
    return sessions.length >= 6;
  }



}
