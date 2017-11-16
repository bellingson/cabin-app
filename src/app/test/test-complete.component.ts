import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {TestService} from "./test.service";
import {TestSession} from "../test-session.model";

@Component({
  selector: 'app-test-complete',
  templateUrl: './test-complete.component.html',
  styleUrls: ['./test-complete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestCompleteComponent implements OnInit {

  session: TestSession;

  constructor(private testService: TestService) { }

  ngOnInit() {

      this.session = this.testService.lastSession();

  }

}
