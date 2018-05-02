import express from 'express';
import bodyParser from 'body-parser'
import logger from 'morgan'
import indexRouter from './routes/index'
import usersRouter from './routes/users'
import questionsRouter from './routes/questions'
import answersRouter from './routes/answers'
const MongoClient = require('mongodb').MongoClient

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var db
MongoClient.connect('mongodb://test:777@ds211440.mlab.com:11440/quora', (err, client) => {
  if (err) 
    return console.log(err)
  db = client.db('quora') 
})

app.post('/', (req, res) => {
  db.collection('quora').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
  })
})

// app.post('/', (req,res) => {
//   console.log("I got called! POST", req.body)
//   if (!req.body) return res.sendStatus(400)
//   res.send('welcome, ' + req.body.username)

//   // const {username, password} = req.body
//   // console.log("I got called! POST", username, password)
// })

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use("/api/questions", questionsRouter)
app.use("/api/answers", answersRouter)

module.exports = {
  app,
  db
}
