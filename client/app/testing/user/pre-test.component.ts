import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';

import {User} from "./user.model";
import {UserService} from "./user.service";
import {TestService} from "../face-test/test.service";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {TestDataService} from "../face-test/test-data.service";

@Component({
  selector: 'app-pre-test',
  templateUrl: './pre-test.component.html',
  styleUrls: ['./pre-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreTestComponent implements OnInit {

  user: User;

  badge: number;

  loading = true;
  error: string;
  errorDetail: string;

  constructor(private userService: UserService,
              private testService: TestService,
              private testDataService: TestDataService,
              private router: Router) {


  }

  ngOnInit() {

    this.userService.user.subscribe(user => this.user = user);
    if(this.user == null) {
      this.router.navigateByUrl('/t/user-init');
      return;
    }

    this.testService.testSessions.subscribe(sessions => {
        this.badge = this.testService.highestBadge(sessions);
    });

    this.userService.updateUserLevel();

    this.fetchSummariesAndOptions();

  }

  fetchSummariesAndOptions() {

    this.error = null;
    this.errorDetail = null;

    this.loading = true;

    Observable.forkJoin(
        this.testDataService.fetchOptions(),
        this.testDataService.fetchSummaries()
    ).subscribe(data => {
        this.testService.testSessions.next(data[1]);
        this.loading = false;
    }, err => {
        this.loading = false;
        this.error = 'Initialization failed.  Check internet connection';

        console.log(err);
        this.errorDetail = err;

    });

  }


}
