import express from 'express';
import bodyParser from 'body-parser'
import logger from 'morgan'

import questionsRouter from './routes/questions'

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/questions", questionsRouter)

app.get("/", (req, res) => { 
  res.send("Welcome")
})

module.exports = app;
