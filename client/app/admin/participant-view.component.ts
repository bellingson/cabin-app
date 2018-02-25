import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router} from '@angular/router';

import {ParticipantAdminService} from "./participant-admin.service";
import {TestAdminService} from "./test-admin.service";


import * as _find from 'lodash/find';
import * as _reverse from 'lodash/reverse';

import {TestSession} from "../testing/face-test/test-session.model";
import {ParticipantAdminDataService} from "./participant-admin-data.service";

@Component({
  selector: 'app-participant-view',
  templateUrl: './participant-view.component.html',
  styleUrls: ['./participant-view.component.scss']
})
export class ParticipantViewComponent implements OnInit {

  participant: any;
  sessions: Array<TestSession>;

  constructor(private participantService: ParticipantAdminService,
              private participantDataService: ParticipantAdminDataService,
              private testAdminService: TestAdminService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
       let id = params.id;
       this.fetchData(id);
    });

  }

  fetchData(id: string) {

    this.participantDataService.get(id)
        .subscribe(participant => {
        this.participantDataService.sessions(participant.participantId)
          .subscribe(sessions => {
               this.formatData(participant, sessions);
          });
    });


  }

  private formatData(participant: any, sessions: Array<TestSession>) {

    participant.daysLeft = this.participantService.daysLeft(participant);

    const level = _find(participant.levels, level => this.participantService.isCurrent(level));
    if(level) {
      participant.currentLevel = level;
    } else if(Date.now() < participant.startTime) {
      participant.currentLevel = participant.levels[0];
    }

    this.participant = participant;
    this.sessions = _reverse(sessions);

  }

  updateStats() {

    this.testAdminService.updateParticipantStats(this.participant)
      .subscribe(r => {
        this.fetchData(this.participant._id);
      });

  }

  levelClass(level: any) {

    let now = Date.now();
    if(now >= level.startTime && now <= level.endTime) {
      return 'current';
    }

    if(now > level.endTime) {
      return 'past';
    }

    if(now < level.startTime) {
      return 'future';
    }

    return '';
  }

  deleteTest(test: TestSession) {

    if(!confirm("Are you sure you want to delete this?"))
      return;

    this.testAdminService.delete(test)
      .subscribe(r => {
        this.fetchData(this.participant._id);
      });

  }






}
