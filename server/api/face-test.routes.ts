import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as jwt from 'jsonwebtoken';

import { authVerification } from '../service/auth-verification';

import {FaceTestDao} from "../service/face-test-dao.service";

export const router = express.Router();

var jsonParser = bodyParser.json({ type: 'application/*+json'});

export const OK = { message: 'ok'};

const faceTestDao = new FaceTestDao();

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

    let token = jwt.sign({participantId: req.body.participantId}, settings.jwtSecret);
    res.send({token: token});
    return;
  }

  res.status(401).send('Invalid PIN');

});

function isPinValid(req) : boolean {

  const _pin = req.body.pin;
  const participantId = req.body.participantId;

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

  faceTestDao.saveTestSession(testSession)
    .subscribe(r => {
       console.log('saved test session');
        res.send(OK);
    }, err => {
      console.log('save face test error');
        console.log(err);
        res.status(500).send({error: 'Failed to save test'});
    });

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


