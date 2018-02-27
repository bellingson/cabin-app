import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';

import {TestDataService} from "./test-data.service";
import {TestService} from "./test.service";
import {TestSession} from "./test-session.model";

@Component({
  selector: 'app-upload-failed',
  templateUrl: './upload-failed.component.html',
  styleUrls: ['./upload-failed.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadFailedComponent implements OnInit {

  message: string;

  retryCount = 0;

  testSession: TestSession;

  constructor(private testService: TestService,
              private testDataService: TestDataService,
              private router: Router) { }

  ngOnInit() {

    this.testService.currentSession.subscribe(testSession => this.testSession = testSession);

  }

    retry() {

      this.message = null;

      this.retryCount++;

      if(this.testSession == null || this.testSession.uploadComplete) {
        this.router.navigateByUrl('/t/test-complete');
        return;
      }

      this.testDataService.uploadResults(this.testSession)
          .subscribe(() => {

              // complete
            this.router.navigateByUrl('/t/test-complete');

          }, err => {
            this.message = 'Uploaded failed again...';

          });

    }

    back() {

      this.router.navigateByUrl('/t/pre-test');

    }

}
