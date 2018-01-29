import { Component, OnInit } from '@angular/core';
import {TestAdminService} from "./test-admin.service";

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {

  patients: Array<any>;

  constructor(private testAdminService: TestAdminService) { }

  ngOnInit() {
    this.fetchPatients();
  }

  fetchPatients() {
    this.testAdminService.patients()
      .subscribe(patients => this.patients = patients)
  }


}
