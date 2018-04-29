import express from 'express';
import bodyParser from 'body-parser'
import logger from 'morgan'

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  
  console.log("i got called! GET", req.query)
  res.send({ status: "hahaha" })
})

app.post("/", (req, res) => {
  console.log("i got called! POST", req.body)

  const { userName, password } = req.body
  console.log("i got called! POST", userName, password)
  // login
  res.send({ status: "hahaha" })
})

module.exports = app;
