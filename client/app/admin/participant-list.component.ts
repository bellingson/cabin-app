import { Component, OnInit } from '@angular/core';
import {TestAdminService} from "./test-admin.service";

import * as _map from 'lodash/map';
import * as _find from 'lodash/find';
import {ParticipantAdminService} from "./participant-admin.service";

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.scss']
})
export class ParticipantListComponent implements OnInit {

  participants: Array<any>;

  _participant: any;

  constructor(private participantService: ParticipantAdminService,
              private testAdminService: TestAdminService) { }

  ngOnInit() {
    this.fetchParticipants();
  }

  fetchParticipants() {
    this.participantService.query()
      .subscribe(participants => {
        this.participants = this.formatParticipantData(participants);
      });
  }

  formatParticipantData(participants) : Array<any> {

      return _map(participants, participant => {

           participant.daysLeft = this.participantService.daysLeft(participant);
           participant.currentLevel = this.participantService.currentLevel(participant);

              return participant;
        });

  }



  updateStats(participant) {
     this.testAdminService.updateParticipantStats(participant)
       .subscribe(success => {
          this.fetchParticipants();
       });
  }

  updateAllParticipants() {
    this.testAdminService.updateAllParticipants()
      .subscribe(r => {
         this.fetchParticipants();
      });
  }

  participantDetail(p) {
    this._participant = p;
  }


}
