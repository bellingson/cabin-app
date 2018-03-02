import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {TestSession} from "../face-test/test-session.model";
import {CURRENT_SESSION_KEY, TestService} from "../face-test/test.service";

import * as moment from 'moment';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  previousSession: TestSession;

  constructor(private testService: TestService,
              private router: Router) { }

  ngOnInit() {

    // alert(window.screen.width + ' ' + window.screen.height);

    let _session = localStorage.getItem(CURRENT_SESSION_KEY)
    if(_session) {
       this.previousSession = JSON.parse(_session);

       const hours = moment().diff(moment(this.previousSession.startTime),'hours');
       // console.log('hours: ' + hours);
       if(hours >= 24) {
         localStorage.removeItem(CURRENT_SESSION_KEY);
         this.previousSession = null;
       }
       // console.log(this.previousSession);

    }

  }

  start() {

    localStorage.removeItem(CURRENT_SESSION_KEY);

    this.router.navigateByUrl('/t/init');

  }

  resume() {

    this.testService.resumeSession(this.previousSession);

    this.router.navigateByUrl('/t/test?resume=true');

  }



}
