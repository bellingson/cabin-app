import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {TestSession} from "../testing/face-test/test-session.model";
import {TestAdminService} from "./test-admin.service";

@Component({
  selector: 'app-test-session-table',
  templateUrl: './test-session-table.component.html',
  styleUrls: ['./test-session-table.component.scss']
})
export class TestSessionTableComponent implements OnInit {

  @Input() testSessions: Array<TestSession>;

  @Output() delete = new EventEmitter<TestSession>();

  constructor(private testAdminService: TestAdminService) { }

  ngOnInit() {
  }

  deleteTest(test: TestSession) {

    this.delete.emit(test);
  }

}
