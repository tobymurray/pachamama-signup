"use strict";

import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
const KnexSessionStore = require('connect-session-knex')(session);

import { HttpError } from './models/http_error'
import { router as submitRouter } from './routes/submit';
import { router as signInRouter } from './routes/sign_in';

import { Database } from './database/db_config';
(<any>global).knex = Database.get();

import { KnexUtils } from './utils/knexUtils';
KnexUtils.logVersion()

console.log("Starting in " + process.env.NODE_ENV + " environment");


export default class App {
  public app: express.Application;

  constructor() {
    const store = new KnexSessionStore({
      knex: (<any>global).knex,
    });

    this.app = express();

    this.app.use(session({
      secret: process.env.SESSION_SECRET,
      store: store
    }));
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, 'public')));

    this.app.use('/submit', submitRouter);
    this.app.use('/sign-in', signInRouter);

    // catch 404 and forward to error handler
    this.app.use(function (req, res, next) {
      var err = new HttpError('Not Found', 404);
      next(err);
    });

    // error handler
    this.app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.sendFile('error.html', {
        root: (<any>global).appRoot + '/public/'
      });
    });
  }
}
