import express from 'express';
import bodyParser from 'body-parser'
import logger from 'morgan'
import { MongoClient } from 'mongodb'
import dbConfig from './config/database.config.js'
import mongoose from 'mongoose'
import questionRouter from './routes/questions'


mongoose.Promise = global.Promise;
let app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.url)
.then(() => {
  console.log("Successfully connected to the database")
}).catch(err => {
  console.log('Couldn not connect to the .database. Exiting now...')
  process.exit()
})

app.use('/api/questions', questionRouter)


app.get("/", (req, res) => {
  
  console.log("i got called! GET", req.query)
  res.send({ status: "hahaha" })
})

app.post("/", (req, res) => {
  console.log("i got called! POST", req.body)
})

module.exports = app;
