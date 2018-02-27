import { Component, OnInit } from '@angular/core';

import {TestService} from "./test.service";
import {TestSession} from "./test-session.model";
import {TestStats} from "./test-stats.model";

@Component({
  selector: 'app-test-complete',
  templateUrl: './test-complete.component.html',
  styleUrls: ['./test-complete.component.scss']
})
export class TestCompleteComponent implements OnInit {

  session: TestSession;

  stats: TestStats;

  constructor(private testService: TestService) { }

  ngOnInit() {

      this.session = this.testService.lastSession();

      this.testService.stats.subscribe(stats => this.stats = stats);

  }

}
