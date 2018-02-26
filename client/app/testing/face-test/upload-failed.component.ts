import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';

import {TestDataService} from "./test-data.service";

@Component({
  selector: 'app-upload-failed',
  templateUrl: './upload-failed.component.html',
  styleUrls: ['./upload-failed.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadFailedComponent implements OnInit {

  message: string;

  retryCount = 0;

  constructor(private testDataService: TestDataService,
              private router: Router) { }

  ngOnInit() {
  }

    retry() {

      this.message = null;

      this.retryCount++;

      this.testDataService.uploadResults()
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
