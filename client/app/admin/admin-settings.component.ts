import { Component, OnInit } from '@angular/core';
import {TestAdminService} from "./test-admin.service";
import {TestService} from "../testing/face-test/test.service";

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {

  options: any;

  message: string;

  constructor(private testAdminService: TestAdminService,
              private testService: TestService) { }

  ngOnInit() {

    this.testService.options.subscribe(options => this.options = options);

    this.testService.fetchOptions();


  }

  updateOptions() {

    this.message = null;

    this.testAdminService.updateOptions(this.options)
      .subscribe(r => {
          this.testService.fetchOptions();
          this.message = 'Update complete';
      }, err => {
          this.message = 'Update failed';
      });


  }


  // fetchSettings() {
  //   this.testAdminService.settings()
  //         .subscribe(settings => this.settings = settings);
  //
  // }


}
