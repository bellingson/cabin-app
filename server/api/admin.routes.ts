import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as csvWriter from 'csv-write-stream';

import * as _ from 'lodash';

import {FaceTestDao} from "../service/face-test-dao.service";
import {OK} from "./face-test.routes";
import {DatePipe} from "@angular/common";

export const router = express.Router();

var jsonParser = bodyParser.json({ type: 'application/*+json'});


const faceTestDao = new FaceTestDao();

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

         let headers = ['Test ID','Patient #', 'Test #', 'Week', 'Start Time', 'Correct #','In-Correct #', '% Correct', 'Avg Resp ms'];
         _.each(moodCategory, moodName => {
           headers.push(moodName);
         });


         let writer = csvWriter({headers: headers});
         writer.pipe(res);

         let datePipe = new DatePipe('en-US');

         _.each(testSessions, session => {

              let s = [session._id,
                       session.patientId,
                       session.testNumber,
                       session.level,
                       datePipe.transform(session.startTime,'yyyy-MM-dd HH:mm'),
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

    let writer = csvWriter({headers: ['Test ID','Patient #', 'Test #', 'Start Time', 'Sample #','Neutral Face', 'Correct','Time']});

    writer.pipe(res);

    let datePipe = new DatePipe('en-US');

    _.each(testSessions, session => {

      _.each(session.samples, sample => {
        let s = [session._id,
          session.patientId,
          session.testNumber,
          datePipe.transform(session.startTime,'yyyy-MM-dd HH:mm'),
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
    res.send(testSession);
  });

});

router.get('/patients', jsonParser, (req, res, next) => {

  faceTestDao.patients()
      .subscribe(patients => {
          res.send(patients);
      }, err => {
          console.log(err);
          res.status(500).send({error: 'server errro'});
      });


});

router.delete('/face-test/:id', jsonParser, (req, res, next) => {

  const id = req.params.id;

  faceTestDao.delete(id).subscribe(r => {
      res.send(OK);
  }, err => {
      console.log(err);
      res.status(500).send({error: 'server error'});
  });


});
