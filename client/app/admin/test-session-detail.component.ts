import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import {TestAdminService} from "./test-admin.service";

import {TestSession} from "../testing/face-test/test-session.model";
import {moodDescription} from "../testing/face-test/mood";

@Component({
  selector: 'app-test-session-detail',
  templateUrl: './test-session-detail.component.html',
  styleUrls: ['./test-session-detail.component.scss']
})
export class TestSessionDetailComponent implements OnInit {

  testSession: TestSession;

  error: string;

  constructor(private testAdminService: TestAdminService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
        let id = params.id;
        this.fetchSession(id);
    });

  }

  fetchSession(id: string) {

    this.testAdminService.get(id)
      .subscribe(session => {

        if(session == null) {
          this.error = "Did not find session: " + id;
        }

        this.testSession = session;
      });

  }

  moodDescription(value: number) : string {
    return moodDescription(value);
  }

}
