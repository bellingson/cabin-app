import * as jwt from 'jsonwebtoken';

import {FaceTestDao} from "../service/face-test-dao.service";

const faceTestDao = new FaceTestDao();

let settings;
faceTestDao.settings().subscribe(_settings => settings = _settings);


export function authVerification(req, res, next) {

  let token = req.get('Authorization');
  if(token == null) {
    res.status(401).send('Authorization failed');
    return;
  }

  try {

    req.token = jwt.verify(token, settings.jwtSecret);

    // console.log(decoded);

    // console.log(settings.jwtSecret) ;
    // console.log('auth verification: ' + token);

    next();

  } catch (e) {
    res.status(401)
        .send('Authorization failed');
  }

}

export function adminVerification(req, res, next) {

  console.log('admin verification');

  let token = req.get('Authorization');
  if(token == null) {
    res.status(401).send('Authorization failed');
    return;
  }

  try {

    req.token = jwt.verify(token, settings.jwtSecret);

    if(req.token == null || req.token.patientId != -1) {
      res.status(401).send('Authorization failed');
      return;
    }

    next();

  } catch (e) {
    res.status(401)
      .send('Authorization failed');
  }

}
