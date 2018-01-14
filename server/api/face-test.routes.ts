import * as express from 'express';
import * as bodyParser from 'body-parser';

import {FaceTestDao} from "../service/face-test-dao.service";

export const router = express.Router();

var jsonParser = bodyParser.json({ type: 'application/*+json'});

export const OK = { message: 'ok'};

// const PIN = '2828';
// const ADMIN_PIN = '1941';



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
    res.send(OK);
    return;
  }

  res.status(401).send('Invalid PIN');
  
});

function isPinValid(req) : boolean {

  const _pin = req.body.pin;
  const patientId = req.body.patientId;
  // const validPin = patientId == -1 ? ADMIN_PIN : PIN;

  const validPin = patientId == -1 ? settings.adminPin : settings.pin;

  return _pin == validPin;
}

/* POST save session */

router.post('/', jsonParser, (req, res, next) => {

  console.log('save face test');

  if(isPinValid(req) == false) {
    res.status(401).send({error: 'Invalid PIN'});
    return;
  }

  let testSession = req.body;
  testSession.ip = req.ip;
  testSession.userAgent = req.get('User-Agent');

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


