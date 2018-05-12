import express from 'express';
import bodyParser from 'body-parser'
import logger from 'morgan'
import indexRouter from './routes/index'
import usersRouter from './routes/users'
import questionsRouter from './routes/questions'
import answersRouter from './routes/answers'
import dbConfig from './config/database.config'
import {MongoClient} from 'mongodb'

const app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db
MongoClient.connect(dbConfig.url, (err, client) => {
  if (err){
    return console.log(err)
  }
  db = client.db('quora') 

  app.use('/', indexRouter(db))
  app.use("/api/questions", questionsRouter(db))
  app.use('/api/users', usersRouter(db))
  app.use("/api/answers", answersRouter(db))
})

module.exports = app
