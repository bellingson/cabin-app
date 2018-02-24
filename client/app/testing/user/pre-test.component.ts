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

  loading = true;
  error: string;

  constructor(private userService: UserService,
              private testService: TestService,
              private testDataService: TestDataService,
              private router: Router) {
     userService.user.subscribe(user => this.user = user);

  }

  ngOnInit() {

    this.userService.updateUserLevel();

    if(this.user == null) {
      this.router.navigateByUrl('/t/user-init');
      return;
    }

    this.fetchSummariesAndOptions();

  }

  fetchSummariesAndOptions() {

    this.error = null;
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
    });

  }


}
