import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {User} from "./user.model";
import {UserService} from "./user.service";
import {TestService} from "../face-test/test.service";

@Component({
  selector: 'app-pre-test',
  templateUrl: './pre-test.component.html',
  styleUrls: ['./pre-test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PreTestComponent implements OnInit {

  user: User;

  constructor(userService: UserService,
              private testService: TestService) {
     userService.user.subscribe(user => this.user = user);
  }

  ngOnInit() {

    this.fetchSummaries();

  }

  fetchSummaries() {

    this.testService.fetchSummaries()
      .subscribe(summaries => {
        this.testService.testSessions.next(summaries);
      });

  }


}
