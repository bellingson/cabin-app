import { Component, OnInit } from '@angular/core';
import {TestAdminService} from "./test-admin.service";
import {TestService} from "../testing/face-test/test.service";
import {TestDataService} from "../testing/face-test/test-data.service";

import * as _range from 'lodash/range';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {

  options: any;

  message: string;

  levels: Array<any>;

  constructor(private testAdminService: TestAdminService,
              private testService: TestService,
              private testDataService: TestDataService) {
  }

  ngOnInit() {

    this.testService.options.subscribe(options => {
      this.options = options;

      const d = options.display;

      console.log(d);

      this.levels = [d.level1, d.level2, d.level3, d.level4, d.level5, d.level6 ];

    });

    this.testDataService.fetchOptions();

  }

  updateOptions() {

    this.message = null;

    this.testAdminService.updateOptions(this.options)
      .subscribe(r => {
          this.testDataService.fetchOptions();
          this.message = 'Update complete';
      }, err => {
          this.message = 'Update failed';
      });


  }

}
