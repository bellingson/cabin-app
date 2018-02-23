
import {ParticipantDao} from "./service/participant-dao.service";

import * as _ from 'lodash';

declare var process: any;

import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/forkJoin';

const participantDao = new ParticipantDao()

participantDao.query()
  .subscribe(participants => {

    const obs = _.map(participants, participant => {

            console.log('update stats: ' + participant.participantId);
            return participantDao.updateParticipantStats(participant.participantId);
          });

    Observable.forkJoin(obs)
              .subscribe(r => {
                console.log('update stats complete');
                process.exit();
              }, err => {
                  console.log(err);
                });


  });
