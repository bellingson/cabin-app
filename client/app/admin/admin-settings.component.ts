import { Component, OnInit } from '@angular/core';
import {TestAdminService} from "./test-admin.service";

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {

  settings: any;

  constructor(private testAdminService: TestAdminService) { }

  ngOnInit() {



  }

  fetchSettings() {
    this.testAdminService.settings()
          .subscribe(settings => this.settings = settings);

  }


}
