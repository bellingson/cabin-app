import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as csvWriter from 'csv-write-stream';

import * as _ from 'lodash';

import * as moment from 'moment';

import {FaceTestDao} from "../service/face-test-dao.service";
import {OK} from "./face-test.routes";
import {ParticipantDao} from "../service/participant-dao.service";
import {  forkJoin } from 'rxjs';

export const router = express.Router();

var jsonParser = bodyParser.json({ type: 'application/*+json'});


const faceTestDao = new FaceTestDao();
const participantDao = new ParticipantDao();

const moodCategory = [
  'Active',
  'Determined',
  'Attentive',
  'Inspired',
  'Alert',
  'Afraid',
  'Nervous',
  'Upset',
  'Hostile',
  'Ashamed'
];

router.get('/face-test-summary.csv', (req, res, next) => {


   faceTestDao.getTestSessions(req.query.findText).subscribe(testSessions => {

         let headers = ['Test ID','Participant #','Control Group', 'Test #', 'Week', 'Start Time', 'Stimuli', 'Correct #','In-Correct #', '% Correct', 'Avg Resp ms'];
         _.each(moodCategory, moodName => {
           headers.push(moodName);
         });


         let writer = csvWriter({headers: headers});
         writer.pipe(res);

         _.each(testSessions, session => {

              let controlVersion = session.controlVersion;
              if(controlVersion == null) {
                const participantNumber: number = parseInt(session.participantId.replace(/\D/g, ''), 10);
                controlVersion = participantNumber % 2 == 0;
              }

              let s = [session._id,
                       session.participantId,
                       controlVersion,
                       session.testNumber,
                       session.level,
                       moment(session.startTime).format('YYYY-MM-DD HH:mm:ss'),
                       session.stimuli,
                       session.correctCount,
                       session.incorrectCount,
                       session.percentCorrect,
                       session.averageResponseMilli
                    ];

             _.each(session.moods, mood => {
               s.push(mood.value);
             });

              writer.write(s);
          });



         writer.end();

   });
});

router.get('/face-test-samples.csv', (req, res, next) => {


  faceTestDao.getTestSessions(req.query.findText).subscribe(testSessions => {

    let writer = csvWriter({headers: ['Test ID','Participant #', 'Test #', 'Start Time', 'Stimuli', 'Sample #','Neutral', 'Correct','Time']});

    writer.pipe(res);

    _.each(testSessions, session => {

      _.each(session.samples, sample => {
        let s = [session._id,
          session.participantId,
          session.testNumber,
          moment(session.startTime).format('YYYY-DD-MM HH:mm:ss'),
          session.stimuli,
          sample.ordinal,
          sample.showDotOnNeutralFace,
          sample.correct,
          sample.time
        ];
        writer.write(s);
      });

    });

    writer.end();

  });




});



/* GET. */
router.get('/face-test', jsonParser, (req, res, next) => {

  // console.log('fd1: ' + req.query.findText);

  faceTestDao.getTestSessions(req.query.findText).subscribe(testSessions => {
      res.send(testSessions);
  });

});

router.get('/face-test/:id', jsonParser, (req, res, next) => {

  const id = req.params.id;

  faceTestDao.getTestSession(id).subscribe(testSession => {
    console.log('got session');
    console.log(testSession);
    res.send(testSession);
  }, err => {
    console.log(err);
    res.status(500).send({error: 'server error'});
  });

});

router.get('/participant', jsonParser, (req, res, next) => {

  participantDao.query()
    .subscribe(participants => {
        res.send(participants)
    }, err => {
      console.log(err);
      res.status(500).send({error: 'server errro'});
    })

});

router.get('/participant/:id', jsonParser, (req, res, next) => {

  const id = req.params.id;

  participantDao.get(id)
    .subscribe(participant => {
      res.send(participant)
    }, err => {
      console.log(err);
      res.status(500).send({error: 'server error'});
    })

});

router.delete('/participant/:id', jsonParser, (req, res, next) => {

  const id = req.params.id;

  participantDao.delete(id)
    .subscribe(r => {
      res.send(OK)
    }, err => {
      console.log(err);
      res.status(500).send({error: 'server error'});
    })

});

router.delete('/face-test/:id', jsonParser, (req, res, next) => {

  const id = req.params.id;

  const handleError = err => {
    console.log(err);
    res.status(500).send({error: 'server error'});
  };

  faceTestDao.getTestSession(id)
    .subscribe(session => {

      const participantId = session.participantId;

      faceTestDao.delete(id).subscribe(r => {
        participantDao.updateParticipantStats(participantId).subscribe(r => {

          res.send(OK);

        }, handleError);

      },handleError);

    }, handleError);

});

router.get('/settings', jsonParser, (req, res, next) => {

  faceTestDao.settings().subscribe(settings => {

      res.send(settings);

  }, err => {
      console.log(err);
      res.status(500).send({error: 'Failed to fetch settings'});
  });

});

router.put('/options', jsonParser, (req, res, next) => {

  let options = req.body;

  faceTestDao.saveOptions(options)
              .subscribe(r => {
                 res.send(OK);
              }, err => {
                console.log(err);
                res.status(500).send({error: 'Failed to save options'});
              });


})

router.post('/participant/:id/stats', jsonParser, (req, res, next) => {


  const id = req.params.id;

  console.log(id);

  let testP = participantDao.create(id);

  console.log(testP);

  participantDao.updateParticipantStats(id)
    .subscribe(r => {
       res.send(OK);
    }, err => {
      console.log(err);
      res.status(500).send({error: 'Failed to save options'});
    })

});

router.post('/participant/stats', jsonParser, (req, res, next) => {

  faceTestDao.patients()
    .subscribe(participant => {

      let obsA = _.map(participant, participant => {
                     return participantDao.updateParticipantStats(participant.participantId);
                  });

      forkJoin(obsA)
        .subscribe(r => {
            res.send(OK);
        });

    }, err => {
      console.log(err);
      res.status(500).send({error: 'server errro'});
    });

});

router.get('/face-test/participant/:participantId', jsonParser, (req, res, next) => {

  const participantId = req.params.participantId;

  faceTestDao.sessionSummary(participantId).subscribe(r => {
    res.send(r);
  }, err => {
    res.status(500).send({error: 'Failed to get summaries'});
  });


});

router.put('/face-test/participant/:participantId/start_time', jsonParser, (req, res, next) => {

  const participantId = req.params.participantId;
  const startTime = req.body.startTime;

  const handleError = err => {
    res.status(500).send({error: 'Server Error'});
  };

  participantDao.findByParticipantId(participantId)
    .subscribe(participant => {

      participant.startTime = startTime;
      participant.endTime = participantDao.calculateEndTime(startTime).toDate().getTime();
      participant.levels = participantDao.formatLevels(startTime);

      participantDao.save(participant)
        .subscribe(r => {

          participantDao.updateParticipantStats(participant.participantId).subscribe(r => {
            res.send(OK);

          }, handleError);
        }, handleError);
    }, handleError);

});

