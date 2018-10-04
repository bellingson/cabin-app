import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

declare var __dirname;
declare var process;

console.log('cabin app server: ' + __dirname);

import * as faceTestApi from './api/face-test.routes';
import * as faceTestAdminApi from './api/admin.routes';

import {adminVerification} from "./service/auth-verification";

export const app = express();

app.set('views', path.join(__dirname, '../server/views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'client')));

app.use('/api/admin', adminVerification, faceTestAdminApi.router);
app.use('/api/face-test', faceTestApi.router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let port = process.env.PORT || 3000;

app.listen(port);

