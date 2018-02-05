import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from "./user.model";
import {UserService} from "./user.service";
import {TestService} from "../face-test/test.service";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

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

  constructor(userService: UserService,
              private testService: TestService) {
     userService.user.subscribe(user => this.user = user);
  }

  ngOnInit() {

    this.fetchSummariesAndOptions();

  }

  fetchSummariesAndOptions() {

    this.error = null;
    this.loading = true;

    Observable.forkJoin(
        this.testService.fetchOptions(),
        this.testService.fetchSummaries()
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
