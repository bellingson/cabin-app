import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {TestService} from "../test/test.service";

import {TestSession} from "../test-session.model";

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResultsListComponent implements OnInit {

  sessions: Array<TestSession>;

  constructor(private testService: TestService) { }

  ngOnInit() {

      this.testService.testSessions.subscribe(sessions => this.sessions = sessions);

      console.log(this.sessions);



  }

}
