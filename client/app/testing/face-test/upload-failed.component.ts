import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {TestService} from "./test.service";
import {TestDataService} from "./test-data.service";

@Component({
  selector: 'app-upload-failed',
  templateUrl: './upload-failed.component.html',
  styleUrls: ['./upload-failed.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadFailedComponent implements OnInit {

  message: string;

  constructor(private testDataService: TestDataService) { }

  ngOnInit() {
  }

    retry() {

      this.message = null;

      this.testDataService.uploadResults()
          .subscribe(() => {

              // complete

          }, err => {
            this.message = 'Uploaded failed again...';

          });

    }

}
