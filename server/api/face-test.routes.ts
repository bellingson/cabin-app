import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as jwt from 'jsonwebtoken';

import * as _ from 'lodash';

import { authVerification } from '../service/auth-verification';

import {FaceTestDao} from "../service/face-test-dao.service";
import {ParticipantDao} from "../service/participant-dao.service";
import {Participant} from "../model/participant.model";

export const router = express.Router();

var jsonParser = bodyParser.json({ type: 'application/*+json'});

export const OK = { message: 'ok'};

const faceTestDao = new FaceTestDao();
const participantDao = new ParticipantDao();

let settings;
faceTestDao.settings().subscribe(_settings => settings = _settings);

/* GET. */
router.get('/', (req, res, next) => {

  // res.render('index', { title: 'foo' });

  res.send('hi');

});

/* POST verify-pin */

router.post('/verify-pin', jsonParser, (req, res, next) => {

  if(isPinValid(req)) {

    const participantId = _.trim(req.body.participantId);

    participantDao.findByParticipantId(participantId)
      .subscribe(participant => {

        if(participant) {
          const _participant = _.omit(participant,['levels']);
          const token = jwt.sign(_participant, settings.jwtSecret);
          res.send({token: token, participant: participant });
          return;
        }

        participant = participantDao.create(participantId);
        participantDao.save(participant)
          .subscribe(success => {

            participantDao.findByParticipantId(participantId)
              .subscribe(participant => {
                const _participant = _.omit(participant,['levels']);
                let token = jwt.sign(_participant, settings.jwtSecret);
                res.send({token: token, participant: participant });

              });

          });

      });

    return;
  }

  res.status(401).send('Invalid PIN');

});

function verifyPinResponse(participantId: string, participant: Participant, res) {

  participantDao.save(participant)
    .subscribe(success => {

      participantDao.findByParticipantId(participantId)
        .subscribe(participant => {

          let token = jwt.sign(participant, settings.jwtSecret);
          res.send({token: token});

        });

    });


}


function isPinValid(req) : boolean {

  const _pin = req.body.pin;
  const participantId = _.trim(req.body.participantId);

  const validPin = participantId == -1 ? settings.adminPin : settings.pin;
  return _pin == validPin;
}

/* POST save session */

router.post('/', authVerification, jsonParser, (req, res, next) => {

  let testSession = req.body;
  testSession.ip = req.ip;
  testSession.userAgent = req.get('User-Agent');

  if(req.token.participantId != testSession.participantId) {
     res.status(401).send({error: 'Access denied'});
     return;
  }

  // console.log('do save: ' + testSession);

  faceTestDao.saveTestSession(testSession)
    .subscribe(r => {
       // console.log('saved test session');

        participantDao.updateParticipantStats(testSession.participantId)
          .subscribe(r => {
            res.send(OK);
          }, err => {
            // console.log('update participant error');
            console.log(err);
            res.status(500).send({error: 'Failed to save test'});
          });

    }, err => {
      console.log('save face test error');
        console.log(err);
        res.status(500).send({error: 'Failed to save test'});
    });

});

router.post('/participant', authVerification, jsonParser, (req, res, next) => {

  let participant = req.body;

  console.log(participant);

});

router.get('/stats', authVerification, jsonParser, (req, res, next) => {

  let participantId = req.token.participantId;

  faceTestDao.stats(participantId).subscribe(r => {
      res.send(r);
  }, err => {
      res.status(500).send({error: 'Failed to get stats'});
  });

});

router.get('/session-summary', authVerification, jsonParser, (req, res, next) => {

  let participantId = req.token.participantId;

  faceTestDao.sessionSummary(participantId).subscribe(r => {
    res.send(r);
  }, err => {
    res.status(500).send({error: 'Failed to get summaries'});
  });

});

router.get('/options', authVerification, jsonParser, (req, res, next) => {

    faceTestDao.options().subscribe(options => {
        res.send(options);
    }, err => {
      res.status(500).send({error: 'Failed to get options'});
    });

});


router.get('/participant', authVerification, jsonParser, (req, res, next) => {

  const participantId = req.token.participantId

  console.log('participantId: ' + participantId);

  participantDao.findByParticipantId(participantId)
    .subscribe(participant => {

      res.send(participant);

    }, err => {
      res.status(500).send({error: 'Failed to get participant'});
    });

});

