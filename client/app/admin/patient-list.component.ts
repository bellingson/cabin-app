import { Component, OnInit } from '@angular/core';
import {TestAdminService} from "./test-admin.service";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

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
