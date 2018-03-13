import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as moment from 'moment';
import {ParticipantAdminDataService} from "./participant-admin-data.service";

declare var jQuery: any;

@Component({
  selector: 'app-start-date-edit',
  templateUrl: './start-date-edit.component.html',
  styleUrls: ['./start-date-edit.component.scss']
})
export class StartDateEditComponent implements OnInit {

  @Input() participant;

  @Output() updateComplete = new EventEmitter<boolean>();

  startDate: string;

  constructor(private participantDataService: ParticipantAdminDataService) { }

  ngOnInit() {

    const date = new Date(this.participant.startTime);



    this.startDate = date.toLocaleDateString();
    // this.startDate = date.toUTCString();

  }

  updateStartDate() {

    // console.log(this.startDate);

    if(!confirm("Are you sure you want to change this?"))
      return;

    // Mon, 12 Mar 2018 22:27:37 GMT

    const sd = moment(this.startDate,'MM/DD/YYYY');

    console.log(sd);

    this.participantDataService.updateStartTime(this.participant.participantId, sd.toDate().getTime())
                                .subscribe(r => {

                                  console.log('update complete');
                                  this.updateComplete.next(true);

                                  jQuery('.modal').modal('hide');

                                });

  }


}
