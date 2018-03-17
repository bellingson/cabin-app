import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

import {TestAdminService} from "./test-admin.service";
import {TestSession} from "../testing/face-test/test-session.model";
import {AuthService} from "../testing/user/auth.service";

declare var jQuery;

@Component({
  selector: 'app-test-session-list',
  templateUrl: './test-session-list.component.html',
  styleUrls: ['./test-session-list.component.scss']
})
export class TestSessionListComponent implements OnInit {

  testSessions: Array<any>;

  findText = new FormControl();

  selectedSession:TestSession;

  token: string;

  constructor(private testAdminService: TestAdminService,
              private authService: AuthService) { }

  ngOnInit() {

    this.authService.token.subscribe(token => this.token = token);

    this.findText.valueChanges
      .debounceTime(500)
      .subscribe(value => {
       this.fetchTestSessions(value);
    });


    this.fetchTestSessions();
  }

  fetchTestSessions(findText?: string) {
     this.testAdminService.query(findText)
              .subscribe(sessions => this.testSessions = sessions);
  }

  deleteTest(test: TestSession) {

      if(!confirm("Are you sure you want to delete this?"))
        return;

      this.testAdminService.delete(test)
        .subscribe(r => {
          this.fetchTestSessions(this.findText.value);
        });

  }

}
