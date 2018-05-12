import express from 'express';
import bodyParser from 'body-parser'
import logger from 'morgan'
import indexRouter from './routes/index'
import usersRouter from './routes/users'
import questionsRouter from './routes/questions'
import answersRouter from './routes/answers'
import dbConfig from './config/database.config'
import mongoose from 'mongoose'

const app = express();

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db
MongoClient.connect(dbConfig.url, (err, client) => {
  if (err) 
    return console.log(err)
  db = client.db('quora') 
})

module.exports = app
