import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
import dbConfig from './config/database.config.js'
import mongoose from 'mongoose'
import questionRouter from './routes/questions'
import userRouter from './routes/users'
import answerRouter from './routes/answers'

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
.then(() => {
  console.log("Successfully connected to the database")
}).catch(err => {
  console.log('Could not connect to the .database. Exiting now...')
  process.exit()
})

app.get("/", (req, res) => {
  console.log("i got called! GET", req.query)
  res.send({ status: "hahaha" })
})

app.post("/", (req, res) => {
  console.log("i got called! POST", req.body)
})

app.use('/api/questions', questionRouter)
app.use('/api/users', userRouter)
app.use('/api/answers', answerRouter)

module.exports = app;
